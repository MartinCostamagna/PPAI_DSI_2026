import { Empleado } from "src/entities/empleado.entity";
import { Bolsin } from "../entities/bolsin.entity";
import { CambioEstadoBolsin } from "../entities/cambio-estado-bolsin.entity"

export abstract class EstadoBolsin {
    crearCambioEstado(estado: EstadoBolsin, empleado: Empleado, fechaYHoraActual: Date): CambioEstadoBolsin {
        return new CambioEstadoBolsin(estado, empleado, fechaYHoraActual);
    }

    cerrar(): void{

    }
    
    reabrir(): void{

    }

    enviar(): void{

    }

    recibir(bolsin: Bolsin, fechaYHoraActual: Date): void{

    }

    darDeBaja(): void{

    }

    quitarRemito(): void{
        
    }   
}
