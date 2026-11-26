import { DataSource, DeepPartial } from "typeorm";
import { databaseConfig } from "../persistence/database.config";
import { BolsinOrm } from "../persistence/orm-entities/bolsin.orm-entity";
import { ComisionMedicaOrm } from "../persistence/orm-entities/comision-medica.orm-entity";
import { DetalleRemitoOrm } from "../persistence/orm-entities/detalle-remito.orm-entity";
import { EmpleadoOrm } from "../persistence/orm-entities/empleado.orm-entity";
import { RemitoOrm } from "../persistence/orm-entities/remito.orm-entity";
import { SesionOrm } from "../persistence/orm-entities/sesion.orm-entity";
import { TipoDocumentoOrm } from "../persistence/orm-entities/tipo-documento.orm-entity";
import { UsuarioOrm } from "../persistence/orm-entities/usuario.orm-entity";

const hace = (dias: number): Date => new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

async function seed(): Promise<void> {
    const dataSource = new DataSource(databaseConfig);
    await dataSource.initialize();
    await dataSource.synchronize(true);

    const cmCordoba = await dataSource.getRepository(ComisionMedicaOrm).save({ nombre: 'CM Córdoba' });
    const cmRosario = await dataSource.getRepository(ComisionMedicaOrm).save({ nombre: 'CM Rosario' });

    const empleadoCordoba = await dataSource.getRepository(EmpleadoOrm).save({ nombre: 'Juan Pérez', comisionMedica: cmCordoba });
    const empleadoRosario = await dataSource.getRepository(EmpleadoOrm).save({ nombre: 'Ana Gómez', comisionMedica: cmRosario });

    const usuario = await dataSource.getRepository(UsuarioOrm).save({
        nombre: 'jperez',
        hashContrasenia: 'hash-ficticio',
        empleado: empleadoCordoba,
    });

    await dataSource.getRepository(SesionOrm).save({
        fechaYHoraInicio: new Date(),
        fechaYHoraFin: null,
        usuario,
    });

    const dictamen = await dataSource.getRepository(TipoDocumentoOrm).save({ nombre: 'Dictamen médico' });
    const certificado = await dataSource.getRepository(TipoDocumentoOrm).save({ nombre: 'Certificado' });
    const historia = await dataSource.getRepository(TipoDocumentoOrm).save({ nombre: 'Historia clínica' });

    const detalle = (tipoDocumento: TipoDocumentoOrm, asunto: string, empleado: EmpleadoOrm): DeepPartial<DetalleRemitoOrm> => ({
        documentacion: {
            tipoDocumento,
            asunto,
            estadoActual: 'EnBolsinEnviado',
            cambiosEstadoDocumentacion: [
                { estado: 'Registrada', empleado, fechaYHoraInicio: hace(5), fechaYHoraFin: hace(4) },
                { estado: 'EnRemito', empleado, fechaYHoraInicio: hace(4), fechaYHoraFin: hace(3) },
                { estado: 'EnBolsinSaliente', empleado, fechaYHoraInicio: hace(3), fechaYHoraFin: hace(2) },
                { estado: 'EnBolsinEnviado', empleado, fechaYHoraInicio: hace(2), fechaYHoraFin: null },
            ],
        },
    });

    const remito = (numero: number, estadoActual: string, detallesRemito: DeepPartial<DetalleRemitoOrm>[]): DeepPartial<RemitoOrm> => ({
        numero,
        estadoActual,
        detallesRemito,
    });

    const bolsin = (
        numeroPrecinto: number,
        origen: ComisionMedicaOrm,
        destino: ComisionMedicaOrm,
        empleado: EmpleadoOrm,
        enviado: boolean,
        remitos: DeepPartial<RemitoOrm>[]
    ): DeepPartial<BolsinOrm> => ({
        numeroPrecinto,
        comisionMedicaOrigen: origen,
        comisionMedicaDestino: destino,
        estadoActual: enviado ? 'Enviado' : 'Cerrado',
        cambiosEstado: [
            { estadoActual: 'Creado', empleado, fechaYHoraInicio: hace(3), fechaYHoraFin: hace(2.5) },
            { estadoActual: 'Cerrado', empleado, fechaYHoraInicio: hace(2.5), fechaYHoraFin: enviado ? hace(2) : null },
            ...(enviado ? [{ estadoActual: 'Enviado', empleado, fechaYHoraInicio: hace(2), fechaYHoraFin: null }] : []),
        ],
        remitos,
    });

    await dataSource.getRepository(BolsinOrm).save([
        bolsin(1001, cmRosario, cmCordoba, empleadoRosario, true, [
            remito(501, 'EnBolsinEnviado', [
                detalle(dictamen, 'Dictamen de incapacidad - García', empleadoRosario),
                detalle(certificado, 'Certificado de discapacidad - López', empleadoRosario),
            ]),
            remito(502, 'EnBolsinEnviado', [
                detalle(historia, 'Historia clínica - Fernández', empleadoRosario),
            ]),
        ]),
        bolsin(1002, cmRosario, cmCordoba, empleadoRosario, true, [
            remito(503, 'EnBolsinEnviado', [
                detalle(dictamen, 'Dictamen de reingreso - Martínez', empleadoRosario),
            ]),
        ]),
        bolsin(1003, cmRosario, cmCordoba, empleadoRosario, false, [
            remito(504, 'EnBolsinSaliente', []),
        ]),
        bolsin(1004, cmCordoba, cmRosario, empleadoCordoba, true, [
            remito(505, 'EnBolsinEnviado', [
                detalle(certificado, 'Certificado médico - Sosa', empleadoCordoba),
            ]),
        ]),
    ]);

    await dataSource.destroy();
    console.log('Seed completado.');
}

seed().catch(error => {
    console.error('Error al ejecutar el seed:', error);
    process.exit(1);
});
