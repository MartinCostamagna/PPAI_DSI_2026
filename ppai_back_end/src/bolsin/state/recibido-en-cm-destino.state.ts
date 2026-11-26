import { Empleado } from "src/entities/empleado.entity";
import { Bolsin } from "../entities/bolsin.entity";
import { EstadoBolsin } from "./estado-bolsin.abstract";
import { CambioEstadoBolsin } from "../entities/cambio-estado-bolsin.entity";

export class RecibidoEnCMDestino extends EstadoBolsin{
    cerrar(): void {
        
    }

    reabrir(): void {
        
    }

    enviar(): void {
        
    }

    recibir(bolsin: Bolsin, fechaYHoraActual: Date, cambiosEstado: CambioEstadoBolsin[], empleado: Empleado): void {
        
    }

    darDeBaja(): void {
        
    }

    quitarRemito(): void {
        
    }
}