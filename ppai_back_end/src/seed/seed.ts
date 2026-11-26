import { DataSource, DeepPartial } from "typeorm";
import { databaseConfig } from "../persistence/database.config";
import { BolsinOrm } from "../persistence/orm-entities/bolsin.orm-entity";
import { ComisionMedicaOrm } from "../persistence/orm-entities/comision-medica.orm-entity";
import { DetalleRemitoOrm } from "../persistence/orm-entities/detalle-remito.orm-entity";
import { EmpleadoOrm } from "../persistence/orm-entities/empleado.orm-entity";
import { RemitoOrm } from "../persistence/orm-entities/remito.orm-entity";
import { TipoDocumentoOrm } from "../persistence/orm-entities/tipo-documento.orm-entity";
import { UsuarioOrm } from "../persistence/orm-entities/usuario.orm-entity";
import { hashearContrasenia } from "../util/contrasenia.util";

const AHORA = Date.now(); // instante fijo para que los historiales de documentación y bolsín coincidan al milisegundo
const hace = (dias: number): Date => new Date(AHORA - dias * 24 * 60 * 60 * 1000);

async function seed(): Promise<void> {
    const dataSource = new DataSource(databaseConfig);
    await dataSource.initialize();
    await dataSource.synchronize(true);

    const cmRepo = dataSource.getRepository(ComisionMedicaOrm);
    const cmCordoba = await cmRepo.save({ nombre: 'CM Córdoba' });
    const cmRosario = await cmRepo.save({ nombre: 'CM Rosario' });
    const cmMendoza = await cmRepo.save({ nombre: 'CM Mendoza' });

    const empleadoRepo = dataSource.getRepository(EmpleadoOrm);
    const usuarioRepo = dataSource.getRepository(UsuarioOrm);
    const hashContrasenia = hashearContrasenia('1234');

    // Cada empleado tiene su usuario (contraseña 1234). No se crean sesiones: las genera el login.
    const crearEmpleado = async (nombre: string, nombreUsuario: string, comisionMedica: ComisionMedicaOrm): Promise<EmpleadoOrm> => {
        const empleado = await empleadoRepo.save({ nombre, comisionMedica });
        await usuarioRepo.save({ nombre: nombreUsuario, hashContrasenia, empleado });
        return empleado;
    };

    const empleadoCordoba = await crearEmpleado('Juan Pérez', 'jperez', cmCordoba);
    const empleadoCordoba2 = await crearEmpleado('Laura Díaz', 'ldiaz', cmCordoba);
    const empleadoRosario = await crearEmpleado('Ana Gómez', 'agomez', cmRosario);
    await crearEmpleado('Carlos Ruiz', 'cruiz', cmRosario);
    const empleadoMendoza = await crearEmpleado('Marta Silva', 'msilva', cmMendoza);
    await crearEmpleado('Pedro Luna', 'pluna', cmMendoza);

    const dictamen = await dataSource.getRepository(TipoDocumentoOrm).save({ nombre: 'Dictamen médico' });
    const certificado = await dataSource.getRepository(TipoDocumentoOrm).save({ nombre: 'Certificado' });
    const historia = await dataSource.getRepository(TipoDocumentoOrm).save({ nombre: 'Historia clínica' });

    const ESTADOS_DOCUMENTACION = ['Registrada', 'EnRemito', 'EnBolsinSaliente', 'EnBolsinEnviado'];
    const ESTADOS_BOLSIN = ['Creado', 'Cerrado', 'Enviado', 'RecibidoEnCMDestino'];

    // Arma el historial hasta el estado final indicado; solo el último queda abierto.
    // Los estados posteriores a EnBolsinEnviado (recepción) los registra el empleado de la CM destino.
    const detalle = (
        tipoDocumento: TipoDocumentoOrm,
        asunto: string,
        empleado: EmpleadoOrm,
        estadoFinal: string = 'EnBolsinEnviado',
        empleadoDestino: EmpleadoOrm = empleado
    ): DeepPartial<DetalleRemitoOrm> => {
        const indice = ESTADOS_DOCUMENTACION.indexOf(estadoFinal);
        const estados = indice >= 0 ? ESTADOS_DOCUMENTACION.slice(0, indice + 1) : [...ESTADOS_DOCUMENTACION, estadoFinal];
        return {
            documentacion: {
                tipoDocumento,
                asunto,
                estadoActual: estadoFinal,
                cambiosEstadoDocumentacion: estados.map((estado, i) => ({
                    estado,
                    empleado: i >= ESTADOS_DOCUMENTACION.length ? empleadoDestino : empleado,
                    fechaYHoraInicio: hace(5 - i),
                    fechaYHoraFin: i === estados.length - 1 ? null : hace(5 - (i + 1)),
                })),
            },
        };
    };

    const remito = (numero: number, estadoActual: string, detallesRemito: DeepPartial<DetalleRemitoOrm>[]): DeepPartial<RemitoOrm> => ({
        numero,
        estadoActual,
        detallesRemito,
    });

    // Historial: Creado (hace 3) → Cerrado (2.5) → Enviado (2) → RecibidoEnCMDestino (1), solo el último abierto.
    const bolsin = (
        numeroPrecinto: number,
        origen: ComisionMedicaOrm,
        destino: ComisionMedicaOrm,
        empleado: EmpleadoOrm,
        estadoFinal: string,
        remitos: DeepPartial<RemitoOrm>[],
        empleadoDestino: EmpleadoOrm = empleado
    ): DeepPartial<BolsinOrm> => {
        const estados = ESTADOS_BOLSIN.slice(0, ESTADOS_BOLSIN.indexOf(estadoFinal) + 1);
        const inicios = [3, 2.5, 2, 1];
        return {
            numeroPrecinto,
            comisionMedicaOrigen: origen,
            comisionMedicaDestino: destino,
            estadoActual: estadoFinal,
            cambiosEstado: estados.map((estadoActual, i) => ({
                estadoActual,
                empleado: estadoActual === 'RecibidoEnCMDestino' ? empleadoDestino : empleado,
                fechaYHoraInicio: hace(inicios[i]),
                fechaYHoraFin: i === estados.length - 1 ? null : hace(inicios[i + 1]),
            })),
            remitos,
        };
    };

    await dataSource.getRepository(BolsinOrm).save([
        bolsin(1001, cmRosario, cmCordoba, empleadoRosario, 'Enviado', [
            remito(501, 'EnBolsinEnviado', [
                detalle(dictamen, 'Dictamen de incapacidad - García', empleadoRosario),
                detalle(certificado, 'Certificado de discapacidad - López', empleadoRosario),
            ]),
            remito(502, 'EnBolsinEnviado', [
                detalle(historia, 'Historia clínica - Fernández', empleadoRosario),
            ]),
        ]),
        bolsin(1002, cmRosario, cmCordoba, empleadoRosario, 'Enviado', [
            remito(503, 'EnBolsinEnviado', [
                detalle(dictamen, 'Dictamen de reingreso - Martínez', empleadoRosario),
            ]),
        ]),
        bolsin(1003, cmRosario, cmCordoba, empleadoRosario, 'Cerrado', [
            remito(504, 'EnBolsinSaliente', []),
        ]),
        bolsin(1004, cmCordoba, cmRosario, empleadoCordoba, 'Enviado', [
            remito(505, 'EnBolsinEnviado', [
                detalle(certificado, 'Certificado médico - Sosa', empleadoCordoba),
            ]),
        ]),
        bolsin(1005, cmMendoza, cmCordoba, empleadoMendoza, 'Enviado', [
            remito(506, 'EnBolsinEnviado', [
                detalle(dictamen, 'Dictamen de aptitud - Romero', empleadoMendoza),
            ]),
            remito(507, 'EnBolsinEnviado', [
                detalle(certificado, 'Certificado de discapacidad - Torres', empleadoMendoza),
                detalle(historia, 'Historia clínica - Acosta', empleadoMendoza),
            ]),
        ]),
        bolsin(1006, cmRosario, cmCordoba, empleadoRosario, 'Enviado', [
            remito(508, 'EnBolsinEnviado', [
                detalle(dictamen, 'Dictamen de incapacidad - Benítez', empleadoRosario),
                detalle(historia, 'Historia clínica - Molina', empleadoRosario),
            ]),
        ]),
        bolsin(1007, cmMendoza, cmRosario, empleadoMendoza, 'Enviado', [
            remito(509, 'EnBolsinEnviado', [
                detalle(certificado, 'Certificado médico - Vega', empleadoMendoza),
            ]),
        ]),
        bolsin(1008, cmCordoba, cmMendoza, empleadoCordoba, 'Enviado', [
            remito(510, 'EnBolsinEnviado', [
                detalle(dictamen, 'Dictamen de reingreso - Herrera', empleadoCordoba),
                detalle(certificado, 'Certificado de discapacidad - Castro', empleadoCordoba),
            ]),
        ]),
        bolsin(1009, cmCordoba, cmMendoza, empleadoCordoba, 'Creado', [
            remito(511, 'Creado', [
                detalle(historia, 'Historia clínica - Ríos', empleadoCordoba, 'EnRemito'),
            ]),
        ]),
        bolsin(1010, cmRosario, cmCordoba, empleadoRosario, 'RecibidoEnCMDestino', [
            remito(512, 'RecibidoYAceptado', [
                detalle(dictamen, 'Dictamen de incapacidad - Paz', empleadoRosario, 'RecibidaYAceptada', empleadoCordoba2),
            ]),
        ], empleadoCordoba2),
        bolsin(1011, cmMendoza, cmCordoba, empleadoMendoza, 'RecibidoEnCMDestino', [
            remito(513, 'RecibidoYAceptado', [
                detalle(certificado, 'Certificado médico - Ibáñez', empleadoMendoza, 'RecibidaYRechazada', empleadoCordoba),
            ]),
        ], empleadoCordoba),
        bolsin(1012, cmCordoba, cmRosario, empleadoCordoba, 'RecibidoEnCMDestino', [
            remito(514, 'RecibidoYAceptado', [
                detalle(historia, 'Historia clínica - Domínguez', empleadoCordoba, 'ParaRedirigir', empleadoRosario),
            ]),
        ], empleadoRosario),
    ]);

    await dataSource.destroy();
    console.log('Seed completado.');
}

seed().catch(error => {
    console.error('Error al ejecutar el seed:', error);
    process.exit(1);
});
