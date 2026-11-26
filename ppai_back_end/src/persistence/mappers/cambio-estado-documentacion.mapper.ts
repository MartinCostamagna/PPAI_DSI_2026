import { CambioEstadoDocumentacion } from "../../documentacion/entities/cambio-estado-documentacion.entity";
import { CambioEstadoDocumentacionOrm } from "../orm-entities/cambio-estado-documentacion.orm-entity";
import { EmpleadoMapper } from "./empleado.mapper";
import { EstadoDocumentacionMapper } from "./estados/estado-documentacion.mapper";

export class CambioEstadoDocumentacionMapper {
    private static readonly ids = new WeakMap<CambioEstadoDocumentacion, number>();

    static toDomain(orm: CambioEstadoDocumentacionOrm): CambioEstadoDocumentacion {
        const cambio = new CambioEstadoDocumentacion(
            EstadoDocumentacionMapper.toDomain(orm.estado),
            EmpleadoMapper.toDomain(orm.empleado),
            orm.fechaYHoraInicio,
            orm.fechaYHoraFin ?? undefined
        );
        CambioEstadoDocumentacionMapper.ids.set(cambio, orm.id);
        return cambio;
    }

    /**
     * La FK a la documentación la completa TypeORM por cascade desde DocumentacionOrm.
     */
    static toOrm(domain: CambioEstadoDocumentacion): CambioEstadoDocumentacionOrm {
        const orm = new CambioEstadoDocumentacionOrm();

        const id = CambioEstadoDocumentacionMapper.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.estado = EstadoDocumentacionMapper.toOrm(domain.getEstado());
        orm.empleado = EmpleadoMapper.toOrm(domain.getEmpleado());
        orm.fechaYHoraInicio = domain.getFechaYHoraInicio();
        orm.fechaYHoraFin = domain.getFechaYHoraFin() ?? null;

        return orm;
    }
}
