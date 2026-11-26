import { EstadoRemito } from "./estado-remito.abstract";

export class EnBolsinSaliente extends EstadoRemito{
    quitarDeBolsin(): void {
        console.log('Remito quitado del bolsín');
    }

    enviar(): void {
        console.log('Remito enviado.');
    }
}