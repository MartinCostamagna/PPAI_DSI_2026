import { Empleado } from "../../entities/empleado.entity";
import { CambioEstadoDocumentacion } from "../entities/cambio-estado-documentacion.entity";
import { Documentacion } from "../entities/documentacion.entity";
import { EstadoDocumentacion } from "./estado-documentacion.abstract";
import { RecibidaYAceptada } from "./recibida-y-aceptada.state";
import { RecibidaYRechazada } from "./recibida-y-rechazada.state";
import { ParaRedirigir } from "./para-redirigir.state";

// Al aceptar, rechazar o redirigir, se cierra el estado anterior y se registra el nuevo.
export class EnBolsinEnviado extends EstadoDocumentacion {
    aceptar(documentacion: Documentacion, fechaYHoraActual: Date, cambiosEstado: CambioEstadoDocumentacion[], empleado: Empleado): void {
        const ceActual = cambiosEstado.find(c => c.sosActual());
        ceActual?.setFechaYHoraFin(fechaYHoraActual);

        const recibida = this.crearEstadoRecibidaYAceptada();
        const nuevo = this.crearCambioEstado(recibida, empleado, fechaYHoraActual);

        documentacion.agregarCambioEstado(nuevo);
        documentacion.setEstado(recibida);
    }

    redirigir(documentacion: Documentacion, fechaYHoraActual: Date, cambiosEstado: CambioEstadoDocumentacion[], empleado: Empleado): void {
        const ceActual = cambiosEstado.find(c => c.sosActual());
        ceActual?.setFechaYHoraFin(fechaYHoraActual);

        const paraRedirigir = this.crearEstadoParaRedirigir();
        const nuevo = this.crearCambioEstado(paraRedirigir, empleado, fechaYHoraActual);

        documentacion.agregarCambioEstado(nuevo);
        documentacion.setEstado(paraRedirigir);
    }

    rechazar(documentacion: Documentacion, fechaYHoraActual: Date, cambiosEstado: CambioEstadoDocumentacion[], empleado: Empleado): void {
        const ceActual = cambiosEstado.find(c => c.sosActual());
        ceActual?.setFechaYHoraFin(fechaYHoraActual);

        const rechazada = this.crearEstadoRecibidaYRechazada();
        const nuevo = this.crearCambioEstado(rechazada, empleado, fechaYHoraActual);
        
        documentacion.agregarCambioEstado(nuevo);
        documentacion.setEstado(rechazada);
    }

    private crearEstadoRecibidaYAceptada(): RecibidaYAceptada {
        return new RecibidaYAceptada();
    }

    private crearEstadoRecibidaYRechazada(): RecibidaYRechazada {
        return new RecibidaYRechazada();
    }

    private crearEstadoParaRedirigir(): ParaRedirigir {
        return new ParaRedirigir();
    }
}
