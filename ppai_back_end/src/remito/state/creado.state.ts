import { EstadoRemito } from "./estado-remito.abstract";

export class Creado extends EstadoRemito {
    incluirABolsin(): void {
        console.log('Remito creado.');
    }

    cancelar(): void {
        console.log('Remito cancelado.');
    }
}