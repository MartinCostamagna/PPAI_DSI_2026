import { Usuario } from "../../entities/usuario.entity";

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');

export interface UsuarioRepository {
    buscarPorNombre(nombre: string): Promise<Usuario | null>;
}
