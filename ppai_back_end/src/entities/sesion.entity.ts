import { Usuario } from "./usuario.entity";





export class Sesion {
    private fechaYHoraInicio!: Date;
    private fechaYHoraFin!: Date;
    private usuario!: Usuario;
}