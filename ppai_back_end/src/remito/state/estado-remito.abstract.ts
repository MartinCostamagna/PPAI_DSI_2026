import { Empleado } from "src/entities/empleado.entity";
import { Remito } from "../entities/remito.entity";
import { DetalleRemito } from "../entities/detalle-remito.entity";

export abstract class EstadoRemito {
    incluirABolsin(): void {
        throw new Error("Transición no válida");
    }

    quitarDeBolsin(): void {
        throw new Error("Transición no válida");
    }

    enviar(): void {
        throw new Error("Transición no válida");
    }

    recibir(remito: Remito, fechaYHoraActual: Date, empleado: Empleado, detallesRemito: DetalleRemito[]): void {
        throw new Error("Transición no válida");
    }

    recibirParcial(): void {
        throw new Error("Transición no válida");
    }

    cancelar(): void {
        throw new Error("Transición no válida");
    }   
}
