import { Empleado } from "../../entities/empleado.entity";
import { EstadoBolsin } from "../state/estado-bolsin.abstract";

export class CambioEstadoBolsin {
    private estadoActual: EstadoBolsin;
    private empleado: Empleado;
    private fechaYHoraInicio: Date;
    private fechaYHoraFin?: Date;

    constructor(estado: EstadoBolsin, empleado: Empleado, fechaYHoraInicio: Date, fechaYHoraFin?: Date) {
        this.estadoActual = estado;
        this.fechaYHoraInicio = fechaYHoraInicio;
        this.fechaYHoraFin = fechaYHoraFin;
        this.empleado = empleado;
    }

    public sosActual(): boolean {
        return this.fechaYHoraFin === undefined;
    }

    public setFechaYHoraFin(fechaYHoraFin: Date): void {
        this.fechaYHoraFin = fechaYHoraFin;
    }

    public getEstadoActual(): EstadoBolsin {
        return this.estadoActual;
    }

    public getEmpleado(): Empleado {
        return this.empleado;
    }

    public getFechaYHoraInicio(): Date {
        return this.fechaYHoraInicio;
    }

    public getFechaYHoraFin(): Date | undefined {
        return this.fechaYHoraFin;
    }
}