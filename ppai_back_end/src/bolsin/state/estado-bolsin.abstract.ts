import { Empleado } from "../../entities/empleado.entity";
import { Bolsin } from "../entities/bolsin.entity";
import { CambioEstadoBolsin } from "../entities/cambio-estado-bolsin.entity"

export abstract class EstadoBolsin {
    crearCambioEstado(estado: EstadoBolsin, empleado: Empleado, fechaYHoraActual: Date): CambioEstadoBolsin {
        return new CambioEstadoBolsin(estado, empleado, fechaYHoraActual);
    }

    cerrar(): void {
        throw new Error("Transición no válida");
    }
    
    reabrir(): void {
        throw new Error("Transición no válida");
    }

    enviar(): void {
        throw new Error("Transición no válida");
    }

    recibir(bolsin: Bolsin, fechaYHoraActual: Date, cambiosEstado: CambioEstadoBolsin[], empleado: Empleado): void {
        throw new Error("Transición no válida");
    }

    darDeBaja(): void {
        throw new Error("Transición no válida");
    } 
}
