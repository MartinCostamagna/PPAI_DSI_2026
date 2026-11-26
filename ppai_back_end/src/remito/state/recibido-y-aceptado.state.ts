import { EstadoRemito } from "./estado-remito.abstract";

export class RecibidoYAceptado extends EstadoRemito {
    incluirABolsin(): void {
        console.log('Remito incluido al bolsín.');
    }

    quitarDeBolsin(): void {
        console.log('Remito quitado del bolsín');
    }

    enviar(): void {
        console.log('Remito enviado.');
    }

    recibirParcial(): void {
        console.log('Remito recibido parcialmente.');
    }

    cancelar(): void {
        console.log('Remito cancelado.');
    }
}