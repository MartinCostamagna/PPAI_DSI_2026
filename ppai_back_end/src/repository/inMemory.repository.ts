import { Injectable, OnModuleInit } from '@nestjs/common';

import { Bolsin } from '../entities/bolsin.entity';
import { CambioEstadoBolsin } from '../entities/cambio-estado-bolsin.entity';
import { CambioEstadoDocumentacion } from '../entities/cambio-estado-documentacion.entity';
import { ComisionMedica } from '../entities/comision-medica.entity';
import { DetalleRemito } from '../entities/detalle-remito.entity';
import { Documentacion } from '../entities/documentacion.entity';
import { Empleado } from '../entities/empleado.entity';
import { Estado } from '../entities/estado.entity';
import { Remito } from '../entities/remito.entity';
import { Sesion } from '../entities/sesion.entity';
import { TipoDocumento } from '../entities/tipo-documento.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class InMemoryRepository implements OnModuleInit {
    private bolsines: Bolsin[] = [];
    private cambiosEstadoBolsin: CambioEstadoBolsin[] = [];
    private cambiosEstadoDocumentacion: CambioEstadoDocumentacion[] = [];
    private comisionesMedicas: ComisionMedica[] = [];
    private detallesRemito: DetalleRemito[] = [];
    private documentaciones: Documentacion[] = [];
    private empleados: Empleado[] = [];
    private estados: Estado[] = [];
    private remitos: Remito[] = [];
    private sesion!: Sesion;
    private tiposDocumento: TipoDocumento[] = [];
    private usuarios: Usuario[] = [];

    onModuleInit() {
        this.cargarDatos();
    }

    private cargarDatos(): void {
        /**
         * - Estados
         */
        // Ámbito Bolsín
        const estadoEnviadoBolsin = new Estado('Enviado', 'Bolsin');
        const estadoRecibidoEnCMDestino = new Estado('RecibidoEnCMDestino', 'Bolsin');
        // Ámbito Remito
        const estadoEnviadoRemito = new Estado('Enviado', 'Remito');
        const estadoRecibidoYAceptado = new Estado('RecibidoYAceptado', 'Remito');
        // Ámbito Documentación
        const estadoEnviadaDocumentacion = new Estado('Enviada', 'Documentacion');
        const estadoRecibidaYAceptada = new Estado('RecibidaYAceptada', 'Documentacion');
        const estadoParaRedirigir = new Estado('ParaRedirigir', 'Documentacion');
        const estadoRecibidaYRechazada = new Estado('RecibidaYRechazada', 'Documentacion');

        this.estados = [
            estadoEnviadoBolsin,
            estadoRecibidoEnCMDestino,
            estadoEnviadoRemito,
            estadoRecibidoYAceptado,
            estadoEnviadaDocumentacion,
            estadoRecibidaYAceptada,
            estadoParaRedirigir,
            estadoRecibidaYRechazada
        ];

        /**
         * - Tipos de documento
         */
        const tipoExpediente = new TipoDocumento('Expediente');
        const tipoDictamen = new TipoDocumento('Dictamen');
        const tipoEstudioMedico = new TipoDocumento('Estudio Médico');
        const tipoCartaDocumento = new TipoDocumento('Carta Documento');

        this.tiposDocumento = [
            tipoExpediente,
            tipoDictamen,
            tipoEstudioMedico,
            tipoCartaDocumento
        ];

        /**
         * - Comisiones médicas
         */
        const cmCordoba = new ComisionMedica('CM Córdoba');
        const cmBuenosAires = new ComisionMedica('CM Buenos Aires');
        const cmCentral = new ComisionMedica('CM Central');

        this.comisionesMedicas = [
            cmCordoba,
            cmBuenosAires,
            cmCentral
        ];
        
        /**
         * - Empleados
        */
        const empleadoEncargadoBolsinesBsAs = new Empleado('Laura Méndez', cmBuenosAires);
        const empleadoEncargadoDocCordoba = new Empleado('Carlos Gómez', cmCordoba);
        
        this.empleados = [
            empleadoEncargadoBolsinesBsAs,
            empleadoEncargadoDocCordoba
        ];

        /**
         * - Usuarios
         */
        const usuarioEncargadoBolsinesBsAs = new Usuario('ebBuenosAires', '1234', empleadoEncargadoBolsinesBsAs);
        const usuarioEncargadoDocCordoba = new Usuario('edCordoba', '5678', empleadoEncargadoDocCordoba);

        this.usuarios = [
            usuarioEncargadoBolsinesBsAs,
            usuarioEncargadoDocCordoba
        ];
        
        /**
         * - Cambios de estado de documentación
         */
        const ceDocExpediente1 = new CambioEstadoDocumentacion(estadoEnviadaDocumentacion, empleadoEncargadoDocCordoba, new Date('2025-06-10T08:00:00'));
        const ceDocDictamen1 = new CambioEstadoDocumentacion(estadoEnviadaDocumentacion, empleadoEncargadoDocCordoba, new Date('2025-06-10T08:00:00'));
        const ceDocEstudioMedico1 = new CambioEstadoDocumentacion(estadoEnviadaDocumentacion, empleadoEncargadoDocCordoba, new Date('2025-06-10T08:00:00'));

        this.cambiosEstadoDocumentacion = [
            ceDocExpediente1,
            ceDocDictamen1,
            ceDocEstudioMedico1
        ];

        /**
         * - Documentaciones
         */
        const docExpediente1 = new Documentacion(tipoExpediente, 'Expediente1', [ceDocExpediente1]);
        const docDictamen1 = new Documentacion(tipoDictamen, 'Dictamen1', [ceDocDictamen1]);
        const docEstudioMedico1 = new Documentacion(tipoEstudioMedico, 'EstudioMedico1', [ceDocEstudioMedico1]);

        this.documentaciones = [
            docExpediente1,
            docDictamen1,
            docEstudioMedico1
        ];


        /**
         * - Detalles de remito
         */
        const detalleExpediente1 = new DetalleRemito(docExpediente1);
        const detalleDictamen1 = new DetalleRemito(docDictamen1);
        const detalleEstudioMedico1 = new DetalleRemito(docEstudioMedico1);

        this.detallesRemito = [
            detalleExpediente1,
            detalleDictamen1,
            detalleEstudioMedico1
        ];

        /**
         * - Remitos
         */
        const remito1001 = new Remito(
            1001,
            [detalleExpediente1, detalleDictamen1],
            estadoEnviadoRemito
        );

        const remito1002 = new Remito(
            1002,
            [detalleEstudioMedico1],
            estadoEnviadoRemito
        );

        const remito1004 = new Remito(
            1004,
            [detalleDictamen1, detalleExpediente1],
            estadoEnviadoRemito
        );

        const remito1005 = new Remito(
            1005,
            [detalleEstudioMedico1],
            estadoEnviadoRemito
        );

        this.remitos = [remito1001, remito1002,remito1004, remito1005];

        /**
         * - Cambios de estado de bolsín
         */
        const ceBolsinEnviado = new CambioEstadoBolsin(
            estadoEnviadoBolsin,
            empleadoEncargadoBolsinesBsAs,
            new Date('2025-06-10T07:00:00'),
            // estado actual: sigue Enviado
        );

        const ceBolsinEnviado2 = new CambioEstadoBolsin(
            estadoEnviadoBolsin,
            empleadoEncargadoBolsinesBsAs,
            new Date('2025-06-11T07:30:00'),
        );

        const ceBolsinEnviado3 = new CambioEstadoBolsin(
            estadoEnviadoBolsin,
            empleadoEncargadoBolsinesBsAs,
            new Date('2025-06-11T07:30:00'),
        );

        this.cambiosEstadoBolsin = [
            ceBolsinEnviado,
            ceBolsinEnviado2,
            ceBolsinEnviado3
        ];

        /**
         * - Bolsines
         */
        const bolsinEnviadoABsAs = new Bolsin(
            [ceBolsinEnviado],
            cmCordoba, // origen
            cmBuenosAires, // destino (CM del usuario logueado)
            [remito1001],
            10010
        );

        const bolsinEnviado2ABsAs = new Bolsin(
            [ceBolsinEnviado2],
            cmCentral,      // origen: CM Central
            cmBuenosAires,  // destino
            [remito1002],
            12800
        );

        const bolsinEnviado3ABsAs = new Bolsin(
            [ceBolsinEnviado3],
            cmCentral,      // origen: CM Central
            cmBuenosAires,  // destino
            [remito1004, remito1005],
            12900
        );

        const bolsinEnviadoACba = new Bolsin(
            [ceBolsinEnviado],
            cmBuenosAires, // origen
            cmCordoba, // destino (CM del usuario logueado)
            [remito1001],
            11010
        );

        const bolsinEnviado2ACba = new Bolsin(
            [ceBolsinEnviado2],
            cmCentral,      // origen: CM Central
            cmCordoba,  // destino
            [remito1002],
            13800
        );

        const bolsinEnviado3ACba = new Bolsin(
            [ceBolsinEnviado3],
            cmCentral,      // origen: CM Central
            cmCordoba,  // destino
            [remito1004, remito1005],
            13900
        );

        this.bolsines = [bolsinEnviadoABsAs, bolsinEnviado2ABsAs, bolsinEnviado3ABsAs, bolsinEnviadoACba, bolsinEnviado2ACba, bolsinEnviado3ACba];

        /**
         * - Sesión activa
         */
        this.sesion = new Sesion(
            usuarioEncargadoBolsinesBsAs,
            new Date()
        );
    }

    getBolsines(): Bolsin[] {
        return this.bolsines;
    }

    getComisionesMedicas(): ComisionMedica[] {
        return this.comisionesMedicas;
    }

    getEmpleados(): Empleado[] {
        return this.empleados;
    }

    getRemitos(): Remito[] {
        return this.remitos;
    }

    getEstados(): Estado[] {
        return this.estados;
    }

    getSesion(): Sesion {
        return this.sesion;
    }

    getTiposDocumento(): TipoDocumento[] {
        return this.tiposDocumento;
    }

    getDocumentaciones(): Documentacion[] {
        return this.documentaciones;
    }

    getCambiosEstadoBolsin(): CambioEstadoBolsin[] {
        return this.cambiosEstadoBolsin;
    }

    getCambiosEstadoDocumentacion(): CambioEstadoDocumentacion[] {
        return this.cambiosEstadoDocumentacion;
    }

    getDetallesRemito(): DetalleRemito[] {
        return this.detallesRemito;
    }

    getUsuarios(): Usuario[] {
        return this.usuarios;
    }
}