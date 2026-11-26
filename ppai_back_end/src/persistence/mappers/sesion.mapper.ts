import { Sesion } from "../../entities/sesion.entity";
import { SesionOrm } from "../orm-entities/sesion.orm-entity";
import { UsuarioMapper } from "./usuario.mapper";

export class SesionMapper {
    private static readonly ids = new WeakMap<Sesion, number>();

    // Requiere la relación `usuario` -> `empleado` -> `comisionMedica` cargada.
    static toDomain(orm: SesionOrm): Sesion {
        const sesion = new Sesion(
            UsuarioMapper.toDomain(orm.usuario),
            orm.fechaYHoraInicio,
            orm.fechaYHoraFin ?? undefined
        );
        this.ids.set(sesion, orm.id);
        return sesion;
    }

    static toOrm(domain: Sesion): SesionOrm {
        const orm = new SesionOrm();

        const id = this.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.fechaYHoraInicio = domain.getFechaYHoraInicio();
        orm.fechaYHoraFin = domain.getFechaYHoraFin() ?? null;
        orm.usuario = UsuarioMapper.toOrm(domain.getUsuario());

        return orm;
    }
}
