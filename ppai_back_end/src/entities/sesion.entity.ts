import { Empleado } from "./empleado.entity";
import { Usuario } from "./usuario.entity";

export class Sesion {
    private fechaYHoraInicio: Date;
    private fechaYHoraFin?: Date;
    private usuario: Usuario;

    constructor(usuario: Usuario, fechaYHoraInicio: Date, fechaYHoraFin?: Date) {
        this.fechaYHoraInicio = fechaYHoraInicio;
        this.fechaYHoraFin = fechaYHoraFin;
        this.usuario = usuario;
    }

    public obtenerEmpleadoLog(): Empleado {
        return this.usuario.obtenerEmpleado();        
    }
}