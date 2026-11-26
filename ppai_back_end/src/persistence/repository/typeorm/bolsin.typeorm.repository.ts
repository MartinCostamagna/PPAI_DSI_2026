import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";
import { Bolsin } from "../../../bolsin/entities/bolsin.entity";
import { BolsinOrm } from "../../orm-entities/bolsin.orm-entity";
import { BolsinMapper } from "../../mappers/bolsin.mapper";
import { BolsinRepository } from "../bolsin.repository";

@Injectable()
export class BolsinTypeOrmRepository implements BolsinRepository {
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
        @InjectRepository(BolsinOrm)
        private readonly repo: Repository<BolsinOrm>
    ) {}

    async buscarTodos(): Promise<Bolsin[]> {
        const orms = await this.repo.find({ relations: BolsinTypeOrmRepository.relaciones });
        return orms.map(orm => BolsinMapper.toDomain(orm));
    }

    async guardar(bolsin: Bolsin): Promise<void> {
        await this.repo.save(BolsinMapper.toOrm(bolsin));
    }
}
