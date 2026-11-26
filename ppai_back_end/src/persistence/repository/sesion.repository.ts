import { Sesion } from "../../entities/sesion.entity";

export const SESION_REPOSITORY = Symbol('SESION_REPOSITORY');

export interface SesionRepository {
    buscarSesionActiva(): Promise<Sesion | null>;
}
