import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FindOptionsRelations, Repository } from 'typeorm';
import { BolsinOrm } from '../persistence/orm-entities/bolsin.orm-entity';
import { SESION_REPOSITORY, type SesionRepository } from '../persistence/repository/sesion.repository';
import {
    BolsinDetalleDto,
    BolsinResumenDto,
    CambioEstadoDto,
    DocumentacionDetalleDto,
    RemitoDetalleDto,
} from './consulta-estados.types';

/** Token del repositorio ORM de bolsines (evita importar @nestjs/typeorm, ESM, en los tests de Jest). */
export const BOLSIN_ORM_REPOSITORY = Symbol('BOLSIN_ORM_REPOSITORY');

/** Consulta de solo lectura de los estados persistidos; no escribe en la base. */
@Injectable()
export class ConsultaEstadosService {
    private static readonly relaciones: FindOptionsRelations<BolsinOrm> = {
        cambiosEstado: { empleado: { comisionMedica: true } },
        comisionMedicaOrigen: true,
        comisionMedicaDestino: true,
        remitos: {
            detallesRemito: {
                documentacion: {
                    tipoDocumento: true,
                    cambiosEstadoDocumentacion: { empleado: { comisionMedica: true } },
                },
            },
        },
    };

    constructor(
        @Inject(BOLSIN_ORM_REPOSITORY)
        private readonly repo: Repository<BolsinOrm>,
        @Inject(SESION_REPOSITORY)
        private readonly sesionRepo: SesionRepository
    ) {}

    async listarBolsines(): Promise<BolsinResumenDto[]> {
        const bolsines = await this.bolsinesDeMiCM();
        return bolsines.map(b => this.aResumen(b));
    }

    async obtenerDetalle(numeroPrecinto: number): Promise<BolsinDetalleDto> {
        const bolsines = await this.bolsinesDeMiCM();
        const bolsin = bolsines.find(b => b.numeroPrecinto === numeroPrecinto);
        if (!bolsin) {
            throw new NotFoundException(`No existe el bolsín ${numeroPrecinto}`);
        }
        return {
            ...this.aResumen(bolsin),
            historial: this.aHistorial(
                (bolsin.cambiosEstado ?? []).map(c => ({
                    estado: c.estadoActual,
                    fechaYHoraInicio: c.fechaYHoraInicio,
                    fechaYHoraFin: c.fechaYHoraFin,
                    empleado: c.empleado?.nombre,
                }))
            ),
            remitos: [...(bolsin.remitos ?? [])]
                .sort((a, b) => a.numero - b.numero)
                .map(r => this.aRemito(r)),
        };
    }

    private async bolsinesDeMiCM(): Promise<BolsinOrm[]> {
        const sesion = await this.sesionRepo.buscarSesionActiva();
        if (!sesion) {
            throw new UnauthorizedException('No hay una sesión activa');
        }
        const miCM = sesion.obtenerEmpleadoLog().mostrarCM();
        const bolsines = await this.repo.find({ relations: ConsultaEstadosService.relaciones });
        return bolsines
            .filter(b => b.comisionMedicaOrigen?.nombre === miCM || b.comisionMedicaDestino?.nombre === miCM)
            .sort((a, b) => a.numeroPrecinto - b.numeroPrecinto);
    }

    private aResumen(b: BolsinOrm): BolsinResumenDto {
        return {
            numeroPrecinto: b.numeroPrecinto,
            cmOrigen: b.comisionMedicaOrigen?.nombre,
            cmDestino: b.comisionMedicaDestino?.nombre,
            estadoActual: b.estadoActual,
            cantidadRemitos: (b.remitos ?? []).length,
        };
    }

    private aRemito(r: BolsinOrm['remitos'][number]): RemitoDetalleDto {
        const documentaciones: DocumentacionDetalleDto[] = (r.detallesRemito ?? [])
            .map(d => d.documentacion)
            .sort((a, b) => a.id - b.id)
            .map(doc => ({
                tipoDocumento: doc.tipoDocumento?.nombre,
                asunto: doc.asunto,
                estadoActual: doc.estadoActual,
                historial: this.aHistorial(
                    (doc.cambiosEstadoDocumentacion ?? []).map(c => ({
                        estado: c.estado,
                        fechaYHoraInicio: c.fechaYHoraInicio,
                        fechaYHoraFin: c.fechaYHoraFin,
                        empleado: c.empleado?.nombre,
                    }))
                ),
            }));
        return { numero: r.numero, estadoActual: r.estadoActual, documentaciones };
    }

    private aHistorial(cambios: CambioEstadoDto[]): CambioEstadoDto[] {
        return [...cambios].sort((a, b) => a.fechaYHoraInicio.getTime() - b.fechaYHoraInicio.getTime());
    }
}
