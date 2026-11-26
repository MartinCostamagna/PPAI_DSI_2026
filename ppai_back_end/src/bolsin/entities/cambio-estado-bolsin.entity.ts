import { Empleado } from "../../entities/empleado.entity";
import { EstadoBolsin } from "../state/estado-bolsin.abstract";

export class CambioEstadoBolsin {
    private estado: EstadoBolsin;
    private empleado: Empleado;
    private fechaYHoraInicio: Date;
    private fechaYHoraFin?: Date;

    constructor(estado: EstadoBolsin, empleado: Empleado, fechaYHoraInicio: Date, fechaYHoraFin?: Date) {
        this.estado = estado;
        this.fechaYHoraInicio = fechaYHoraInicio;
        this.fechaYHoraFin = fechaYHoraFin;
        this.empleado = empleado;
    }

    public sosActual(): boolean {
        return !this.fechaYHoraFin;
    }

    public sosEnviado(): boolean {
        return this.estado.sosEnviado();
    }

    public setFechaYHoraFin(fechaYHoraFin: Date): void {
        this.fechaYHoraFin = fechaYHoraFin;
    }
}