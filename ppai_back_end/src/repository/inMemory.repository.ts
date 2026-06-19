import { OnModuleInit } from "@nestjs/common";
import { Bolsin } from "src/entities/bolsin.entity";
import { CambioEstadoBolsin } from "src/entities/cambio-estado-bolsin.entity";
import { CambioEstadoDocumentacion } from "src/entities/cambio-estado-documentacion.entity";
import { ComisionMedica } from "src/entities/comision-medica.entity";
import { DetalleRemito } from "src/entities/detalle-remito.entity";
import { Documentacion } from "src/entities/documentacion.entity";
import { Empleado } from "src/entities/empleado.entity";
import { Estado } from "src/entities/estado.entity";
import { Remito } from "src/entities/remito.entity";
import { Sesion } from "src/entities/sesion.entity";
import { TipoDocumento } from "src/entities/tipo-documento.entity";
import { Usuario } from "src/entities/usuario.entity";


export class InMemoryRepository implements OnModuleInit{
    private bolsines: Bolsin[] = [];
    private cambioEstadoBolsin: CambioEstadoBolsin[] = [];
    private cambioEstadoDocumentacion: CambioEstadoDocumentacion[] = [];
    private comisionMedica: ComisionMedica[] = [];
    private detalleRemito: DetalleRemito[] = [];
    private documentacion: Documentacion[] = [];
    private empleado: Empleado[] = [];
    private estado: Estado[] = [];
    private remito: Remito[] = [];
    private sesion!: Sesion;
    private tipoDocumento: TipoDocumento[] = [];
    private usuario: Usuario[] = [];

    onModuleInit() {
        this.cargarDatos();
    } 

    cargarDatos(){
        
    }
}