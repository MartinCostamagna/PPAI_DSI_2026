import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";


export class CambioEstadoDocumentacion {
    private estado: Estado;
    private fechaYHoraInicio: Date;
    private fechaYHoraFin?: Date;
    private empleado: Empleado;

    constructor( estado: Estado, empleado: Empleado, fechaYHoraInicio: Date, fechaYHoraFin?: Date){
        this.estado = estado;
        this.fechaYHoraInicio = fechaYHoraInicio;
        this.empleado = empleado;
        this.fechaYHoraFin = fechaYHoraFin;
    }

    public sosActual(): boolean{
        return (!this.fechaYHoraFin);
    }

    public setFechaYHoraFin(fechaYHoraFin: Date): void {
        this.fechaYHoraFin = fechaYHoraFin;
    }
}