import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";


export class CambioEstadoBolsin {
    private estado: Estado;
    private fechaYHoraInicio: Date;
    private fechaYHoraFin?: Date;
    private empleado: Empleado;

    constructor (estado: Estado, empleado: Empleado, fechaYHoraInicio: Date, fechaYHoraFin?: Date){
        this.estado = estado;
        this.fechaYHoraInicio = fechaYHoraInicio;
        this.fechaYHoraFin = fechaYHoraFin;
        this.empleado = empleado;
    }

    public sosActual(): boolean {
        return (!this.fechaYHoraFin);
    }

    public sosEnviado(): boolean{
        return (this.estado.sosEnviado());
    }

    public setFechaYHoraFin(fechaYHoraFin: Date): void {
        this.fechaYHoraFin = fechaYHoraFin;
    }
}