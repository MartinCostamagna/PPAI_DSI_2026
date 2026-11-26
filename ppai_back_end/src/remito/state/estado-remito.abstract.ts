import { Remito } from "../entities/remito.entity";

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

    recibir(remito: Remito): void {
        throw new Error("Transición no válida");
    }

    recibirParcial(): void {
        throw new Error("Transición no válida");
    }

    cancelar(): void {
        throw new Error("Transición no válida");
    }   
}
