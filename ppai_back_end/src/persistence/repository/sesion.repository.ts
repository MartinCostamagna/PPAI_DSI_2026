import { Sesion } from "../../entities/sesion.entity";

export const SESION_REPOSITORY = Symbol('SESION_REPOSITORY');

export interface SesionRepository {
    buscarSesionActiva(): Promise<Sesion | null>;
    iniciarSesion(nombreUsuario: string, fechaYHoraInicio: Date): Promise<void>;
    cerrarSesionActiva(fechaYHoraFin: Date): Promise<void>;
}
