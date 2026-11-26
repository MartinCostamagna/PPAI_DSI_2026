import { Empleado } from "../../entities/empleado.entity";
import { Bolsin } from "../entities/bolsin.entity";
import { CambioEstadoBolsin } from "../entities/cambio-estado-bolsin.entity";
import { EstadoBolsin } from "./estado-bolsin.abstract";
import { RecibidoEnCMDestino } from "./recibido-en-cm-destino.state";

export class Enviado extends EstadoBolsin {
    // Cierra el estado de envío y registra la recepción en la CM de destino.
    recibir(bolsin: Bolsin, fechaYHoraActual: Date, cambiosEstado: CambioEstadoBolsin[], empleado: Empleado): void {
        const ceActual = cambiosEstado.find(c => c.sosActual());
        ceActual?.setFechaYHoraFin(fechaYHoraActual);
        const recibido = this.crearEstadoRecibidoEnCMDestino();
        const nuevo = this.crearCambioEstado(recibido, empleado, fechaYHoraActual);
        bolsin.agregarCambioEstado(nuevo);
        bolsin.setEstado(recibido);
    }

    private crearEstadoRecibidoEnCMDestino(): RecibidoEnCMDestino {
        return new RecibidoEnCMDestino();
    }
}
