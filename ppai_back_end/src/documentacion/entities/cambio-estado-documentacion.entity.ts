import { Empleado } from "../../entities/empleado.entity";
import { EstadoDocumentacion } from "../state/estado-documentacion.abstract";

export class CambioEstadoDocumentacion {
    private estado: EstadoDocumentacion;
    private empleado: Empleado;
    private fechaYHoraInicio: Date;
    private fechaYHoraFin?: Date;

    constructor(estado: EstadoDocumentacion, empleado: Empleado, fechaYHoraInicio: Date, fechaYHoraFin?: Date) {
        this.estado = estado;
        this.fechaYHoraInicio = fechaYHoraInicio;
        this.empleado = empleado;
        this.fechaYHoraFin = fechaYHoraFin;
    }

    public sosActual(): boolean {
        return (this.fechaYHoraFin === null);
    }

    public setFechaYHoraFin(fechaYHoraFin: Date): void {
        this.fechaYHoraFin = fechaYHoraFin;
    }
}