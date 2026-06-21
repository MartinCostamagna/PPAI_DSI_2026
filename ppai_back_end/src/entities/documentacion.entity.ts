import { CambioEstadoDocumentacion } from "./cambio-estado-documentacion.entity";
import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";
import { TipoDocumento } from "./tipo-documento.entity";



export class Documentacion  {
    private tipoDocumento: TipoDocumento;
    private asunto: string;
    private cambioEstadoDocumentacion: CambioEstadoDocumentacion[];
    
    constructor(tipoDocumento: TipoDocumento, asunto: string, cambioEstadoDocumentacion: CambioEstadoDocumentacion[]){
        this.tipoDocumento = tipoDocumento;
        this.asunto = asunto;
        this.cambioEstadoDocumentacion = cambioEstadoDocumentacion;
    }

    public mostrarTipoDocumento(): string{
        return this.tipoDocumento.getNombre()
    }

    public getAsunto(): string{
        return this.asunto;
    }

    public aceptar(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{
        this.cambioEstadoDocumentacion.find(cea => cea.sosActual())?.setFechaYHoraFin(fechaYHoraActual);
        const nuevo: CambioEstadoDocumentacion = new CambioEstadoDocumentacion (estado, empleado, fechaYHoraActual);
        this.cambioEstadoDocumentacion.push(nuevo);
    }

    public redirigir(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{
        this.cambioEstadoDocumentacion.find(cea => cea.sosActual())?.setFechaYHoraFin(fechaYHoraActual);
        const nuevo: CambioEstadoDocumentacion = new CambioEstadoDocumentacion (estado, empleado, fechaYHoraActual);
        this.cambioEstadoDocumentacion.push(nuevo);
    }

    public rechazar(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{
        this.cambioEstadoDocumentacion.find(cea => cea.sosActual())?.setFechaYHoraFin(fechaYHoraActual);
        const nuevo: CambioEstadoDocumentacion = new CambioEstadoDocumentacion (estado, empleado, fechaYHoraActual);
        this.cambioEstadoDocumentacion.push(nuevo);
    }

    public incluirABolsin(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}
    public enviar(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}
    public eliminarDocumentacionBolsin(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}
    public cancelar(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}
    public marcarNoRecibida(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}
    public reenviar(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}
    public darDeBaja(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}
    public agregarARemito(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{}    

}