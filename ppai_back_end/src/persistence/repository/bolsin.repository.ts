import { Bolsin } from "../../bolsin/entities/bolsin.entity";

export const BOLSIN_REPOSITORY = Symbol('BOLSIN_REPOSITORY');

export interface BolsinRepository {
    buscarTodos(): Promise<Bolsin[]>;
    guardar(bolsin: Bolsin): Promise<void>;
}
