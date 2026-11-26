import { Empleado } from "src/entities/empleado.entity";
import { Remito } from "../entities/remito.entity";
import { EstadoRemito } from "./estado-remito.abstract";
import { RecibidoYAceptado } from "./recibido-y-aceptado.state";
import { DetalleRemito } from "../entities/detalle-remito.entity";

export class EnBolsinEnviado extends EstadoRemito{
    incluirABolsin(): void {
        console.log('Remito incluido al bolsín.');
    }

    quitarDeBolsin(): void {
        console.log('Remito quitado del bolsín');
    }

    enviar(): void {
        console.log('Remito enviado.');
    }

    recibir(remito: Remito): void {
        const recibidoYAceptado = this.crearEstadoRecibidoYAceptado();
        remito.setEstado(recibidoYAceptado);
    }

    recibirParcial(): void {
        console.log('Remito recibido parcialmente.');
    }

    cancelar(): void {
        console.log('Remito cancelado.');
    }

    private crearEstadoRecibidoYAceptado(): RecibidoYAceptado {
        return new RecibidoYAceptado();
    }  
}