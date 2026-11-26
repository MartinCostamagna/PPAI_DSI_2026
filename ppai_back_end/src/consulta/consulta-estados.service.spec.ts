import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConsultaEstadosService } from './consulta-estados.service';

describe('ConsultaEstadosService', () => {
    const cm = (nombre: string) => ({ id: 1, nombre }) as any;
    const empleado = (nombre: string) => ({ nombre }) as any;
    const fecha = (dia: number) => new Date(2026, 0, dia);

    const bolsinCordoba = {
        numeroPrecinto: 1,
        estadoActual: 'Recibido',
        comisionMedicaOrigen: cm('CM Rosario'),
        comisionMedicaDestino: cm('CM Córdoba'),
        cambiosEstado: [
            { estadoActual: 'Recibido', empleado: empleado('Ana'), fechaYHoraInicio: fecha(5), fechaYHoraFin: null },
            { estadoActual: 'Enviado', empleado: empleado('Beto'), fechaYHoraInicio: fecha(1), fechaYHoraFin: fecha(5) },
        ],
        remitos: [
            {
                numero: 20,
                estadoActual: 'Recibido',
                detallesRemito: [
                    {
                        documentacion: {
                            id: 2,
                            tipoDocumento: { nombre: 'Informe' },
                            asunto: 'B',
                            estadoActual: 'Recibida',
                            cambiosEstadoDocumentacion: [
                                { estado: 'Recibida', empleado: empleado('Ana'), fechaYHoraInicio: fecha(9), fechaYHoraFin: null },
                                { estado: 'Enviada', empleado: empleado('Beto'), fechaYHoraInicio: fecha(2), fechaYHoraFin: fecha(9) },
                            ],
                        },
                    },
                    {
                        documentacion: {
                            id: 1,
                            tipoDocumento: { nombre: 'Historia' },
                            asunto: 'A',
                            estadoActual: 'Enviada',
                            cambiosEstadoDocumentacion: [],
                        },
                    },
                ],
            },
            { numero: 10, estadoActual: 'Recibido', detallesRemito: [] },
        ],
    } as any;

    const bolsinMendoza = {
        numeroPrecinto: 2,
        estadoActual: 'Enviado',
        comisionMedicaOrigen: cm('CM Rosario'),
        comisionMedicaDestino: cm('CM Mendoza'),
        cambiosEstado: [],
        remitos: [],
    } as any;

    let repo: { find: jest.Mock };
    let sesionRepo: { buscarSesionActiva: jest.Mock };
    let servicio: ConsultaEstadosService;

    beforeEach(() => {
        repo = { find: jest.fn().mockResolvedValue([bolsinMendoza, bolsinCordoba]) };
        sesionRepo = {
            buscarSesionActiva: jest.fn().mockResolvedValue({
                obtenerEmpleadoLog: () => ({ mostrarCM: () => 'CM Córdoba' }),
            }),
        };
        servicio = new ConsultaEstadosService(repo as any, sesionRepo as any);
    });

    it('listarBolsines devuelve solo los de la CM del logueado', async () => {
        await expect(servicio.listarBolsines()).resolves.toEqual([
            {
                numeroPrecinto: 1,
                cmOrigen: 'CM Rosario',
                cmDestino: 'CM Córdoba',
                estadoActual: 'Recibido',
                cantidadRemitos: 2,
            },
        ]);
    });

    it('obtenerDetalle ordena historiales, remitos y documentaciones', async () => {
        const detalle = await servicio.obtenerDetalle(1);
        expect(detalle.historial.map(h => h.estado)).toEqual(['Enviado', 'Recibido']);
        expect(detalle.historial[0].empleado).toBe('Beto');
        expect(detalle.remitos.map(r => r.numero)).toEqual([10, 20]);
        const docs = detalle.remitos[1].documentaciones;
        expect(docs.map(d => d.asunto)).toEqual(['A', 'B']);
        expect(docs[1].tipoDocumento).toBe('Informe');
        expect(docs[1].historial.map(h => h.estado)).toEqual(['Enviada', 'Recibida']);
    });

    it('obtenerDetalle de un bolsín de otra CM lanza NotFoundException', async () => {
        await expect(servicio.obtenerDetalle(2)).rejects.toThrow(NotFoundException);
    });

    it('obtenerDetalle de un bolsín inexistente lanza NotFoundException', async () => {
        await expect(servicio.obtenerDetalle(99)).rejects.toThrow(NotFoundException);
    });

    it('sin sesión activa lanza UnauthorizedException', async () => {
        sesionRepo.buscarSesionActiva.mockResolvedValue(null);
        await expect(servicio.listarBolsines()).rejects.toThrow(UnauthorizedException);
        await expect(servicio.obtenerDetalle(1)).rejects.toThrow(UnauthorizedException);
    });
});
