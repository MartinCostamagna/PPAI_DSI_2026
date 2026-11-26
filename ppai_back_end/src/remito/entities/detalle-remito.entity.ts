import { Documentacion } from "../../documentacion/entities/documentacion.entity";
import { Empleado } from "../../entities/empleado.entity";
import { EstadoDocumentacion } from "../../documentacion/state/estado-documentacion.abstract";

export class DetalleRemito {
    private documentacion: Documentacion;

    constructor(documentacion: Documentacion) {
        this.documentacion = documentacion;
    }

    // Obtenemos únicamente el nombre del tipo de documento asociado a la documentación.
    public mostrarTipoDocumento(): string {
        return this.documentacion.mostrarTipoDocumento();
    }

    public mostrarAsuntoDoc(): string {
        return this.documentacion.getAsunto();
    }

    public aceptarDocumentacion(fechaYHoraActual: Date, empleado: Empleado): void {
        this.documentacion.aceptar(fechaYHoraActual, empleado);
    }

    public rechazarDocumentacion(fechaYHoraActual: Date, empleado: Empleado): void {
        this.documentacion.rechazar(fechaYHoraActual, empleado);
    }

    public redirigirDocumentacion(fechaYHoraActual: Date, empleado: Empleado): void {
        this.documentacion.redirigir(fechaYHoraActual, empleado);
    }

    public getDocumentacion(): Documentacion {
        return this.documentacion;
    }
}