import { Usuario } from "../../entities/usuario.entity";
import { UsuarioOrm } from "../orm-entities/usuario.orm-entity";
import { EmpleadoMapper } from "./empleado.mapper";

export class UsuarioMapper {
    private static readonly ids = new WeakMap<Usuario, number>();

    // Requiere la relación `empleado` y su `comisionMedica` cargada.
    static toDomain(orm: UsuarioOrm): Usuario {
        const usuario = new Usuario(
            orm.nombre,
            orm.hashContrasenia,
            EmpleadoMapper.toDomain(orm.empleado)
        );
        this.ids.set(usuario, orm.id);
        return usuario;
    }

    static toOrm(domain: Usuario): UsuarioOrm {
        const orm = new UsuarioOrm();

        const id = this.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.nombre = domain.getNombre();
        orm.hashContrasenia = domain.getHashContrasenia();
        orm.empleado = EmpleadoMapper.toOrm(domain.obtenerEmpleado());

        return orm;
    }
}
