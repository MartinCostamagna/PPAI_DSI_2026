import { Empleado } from "src/entities/empleado.entity";
import { CambioEstadoDocumentacion } from "../entities/cambio-estado-documentacion.entity";
import { Documentacion } from "../entities/documentacion.entity";
import { EstadoDocumentacion } from "./estado-documentacion.abstract";
import { RecibidaYAceptada } from "./recibida-y-aceptada.state";

export class EnBolsinEnviado extends EstadoDocumentacion{
    aceptar(documentacion: Documentacion, fechaYHoraActual: Date, cambiosEstado: CambioEstadoDocumentacion[], empleado: Empleado): void {
        const ceActual = cambiosEstado.find(c => c.sosActual());
        ceActual?.setFechaYHoraFin(fechaYHoraActual);
        const recibida = this.crearEstadoRecibidaYAceptada();
        const nuevo = this.crearCambioEstado(recibida, empleado, fechaYHoraActual);
        documentacion.agregarCambioEstado(nuevo);
        documentacion.setEstado(recibida);    
    }

    private crearEstadoRecibidaYAceptada(): RecibidaYAceptada{
        return new RecibidaYAceptada();
    }
}