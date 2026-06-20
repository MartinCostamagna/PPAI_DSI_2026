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

    public actualizarEstadoDoc(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{
        this.cambioEstadoDocumentacion.find(cea => cea.sosActual())?.setFechaYHoraFin(fechaYHoraActual);
        const nuevo: CambioEstadoDocumentacion = new CambioEstadoDocumentacion (estado, empleado, fechaYHoraActual);
        this.cambioEstadoDocumentacion.push(nuevo);
    }
}