import { EstadoBolsin } from "./estado-bolsin.abstract";

export class Creado extends EstadoBolsin{
    quitarRemito(): void {
        console.log('Bolsín creado.');
    }

    cerrar(): void {
        console.log('Bolsín cerrado.');
    }

    darDeBaja(): void {
        console.log('Bolsín dado de baja.');
    }
}