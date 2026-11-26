import { CambioEstadoDocumentacion } from "./cambio-estado-documentacion.entity";
import { Empleado } from "../../entities/empleado.entity";
import { EstadoDocumentacion } from "../state/estado-documentacion.abstract";
import { TipoDocumento } from "./tipo-documento.entity";

export class Documentacion {
    private tipoDocumento: TipoDocumento;
    private asunto: string;
    private cambiosEstadoDocumentacion: CambioEstadoDocumentacion[];
    private estadoActual: EstadoDocumentacion;
    constructor(tipoDocumento: TipoDocumento, asunto: string, cambioEstadoDocumentacion: CambioEstadoDocumentacion[], estado: EstadoDocumentacion) {
        this.tipoDocumento = tipoDocumento;
        this.asunto = asunto;
        this.cambiosEstadoDocumentacion = cambioEstadoDocumentacion;
        this.estadoActual = estado;
    }

    public mostrarTipoDocumento(): string {
        return this.tipoDocumento.getNombre()
    }

    public getAsunto(): string {
        return this.asunto;
    }

    public aceptar(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.aceptar(this, fechaYHoraActual, this.cambiosEstadoDocumentacion, empleado);
    }

    public redirigir(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.redirigir();
    }

    public rechazar(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.rechazar();
    }

    public agregarCambioEstado(cambioEstado: CambioEstadoDocumentacion): void {
        this.cambiosEstadoDocumentacion.push(cambioEstado);
    }

    public setEstado(estado: EstadoDocumentacion){
        this.estadoActual = estado;
    }

    public incluirABolsin(fechaYHoraActual: Date,  empleado: Empleado): void {
        this.estadoActual.incluirABolsin();
    }

    public enviar(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.enviar();
    }
    
    public eliminarDocumentacionBolsin(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.eliminarDocumentacionBolsin();
    }
    
    public cancelar(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.cancelar();
    }
    
    public marcarNoRecibida(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.marcarNoRecibida();
    }
    
    public reenviar(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.reenviar();
    }
    
    public darDeBaja(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.darDeBaja();
    }
    
    public agregarARemito(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.agregarARemito();
    }
}