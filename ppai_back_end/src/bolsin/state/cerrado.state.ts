import { EstadoBolsin } from "./estado-bolsin.abstract";

export class Cerrado extends EstadoBolsin {
    reabrir(): void {
        console.log('Bolsín reabirto.');
    }

    enviar(): void {
        console.log('Bolsín enviado.');
    }

    darDeBaja(): void {
        console.log('Bolsín dado de baja.');
    }
}