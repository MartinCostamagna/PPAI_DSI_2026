import { Documentacion } from "./documentacion.entity";
import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";

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

    public actualizarEstadoDocARecibidaYAceptada(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void {
        this.documentacion.aceptar(fechaYHoraActual, estado, empleado);
    }

    public actualizarEstadoDocARecibidaYRechazada(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void {
        this.documentacion.rechazar(fechaYHoraActual, estado, empleado);
    }

    public actualizarEstadoDocAParaRedirigir(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void {
        this.documentacion.redirigir(fechaYHoraActual, estado, empleado);
    }
}