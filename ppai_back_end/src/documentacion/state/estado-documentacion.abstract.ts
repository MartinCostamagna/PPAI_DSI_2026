import { Empleado } from "../../entities/empleado.entity";
import { CambioEstadoDocumentacion } from "../entities/cambio-estado-documentacion.entity";
import { Documentacion } from "../entities/documentacion.entity";

export abstract class EstadoDocumentacion {
    crearCambioEstado(estado: EstadoDocumentacion, empleado: Empleado, fechaYHoraActual: Date): CambioEstadoDocumentacion {
        return new CambioEstadoDocumentacion(estado, empleado, fechaYHoraActual);
    }
    agregarARemito(): void {
        throw new Error("Transición no válida");
    }
    incluirABolsin(): void {
        throw new Error("Transición no válida");
    }
    cancelar(): void {
        throw new Error("Transición no válida");
    }
    eliminarDocumentacionBolsin(): void {
        throw new Error("Transición no válida");
    }
    enviar(): void {
        throw new Error("Transición no válida");
    }
    marcarNoRecibida(): void {
        throw new Error("Transición no válida");
    }
    reenviar(): void {
        throw new Error("Transición no válida");
    }
    rechazar(documentacion: Documentacion, fechaYHoraActual: Date, cambiosEstado: CambioEstadoDocumentacion[], empleado: Empleado): void {
        throw new Error("Transición no válida");
    }
    redirigir(documentacion: Documentacion, fechaYHoraActual: Date, cambiosEstado: CambioEstadoDocumentacion[], empleado: Empleado): void {
        throw new Error("Transición no válida");
    }
    aceptar(documentacion: Documentacion, fechaYHoraActual: Date, cambiosEstado: CambioEstadoDocumentacion[], empleado: Empleado): void {
        throw new Error("Transición no válida");
    }
    darDeBaja(): void {
        throw new Error("Transición no válida");
    }
}
