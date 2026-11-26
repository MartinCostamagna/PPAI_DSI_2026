import { Empleado } from "src/entities/empleado.entity";
import { Remito } from "../entities/remito.entity";
import { EstadoRemito } from "./estado-remito.abstract";

export class RecibidoYAceptado extends EstadoRemito{
    incluirABolsin(): void {
        console.log('Remito incluido al bolsín.');
    }

    quitarDeBolsin(): void {
        console.log('Remito quitado del bolsín');
    }

    enviar(): void {
        console.log('Remito enviado.');
    }

    recibir(remito: Remito, fechaYHoraActual: Date, empleado: Empleado): void {
        
    }

    recibirParcial(): void {
        console.log('Remito recibido parcialmente.');
    }

    cancelar(): void {
        console.log('Remito cancelado.');
    }
}