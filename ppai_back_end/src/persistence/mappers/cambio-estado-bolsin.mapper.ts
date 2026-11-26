import { CambioEstadoBolsin } from "../../bolsin/entities/cambio-estado-bolsin.entity";
import { CambioEstadoBolsinOrm } from "../orm-entities/cambio-estado-bolsin.orm-entity";
import { EmpleadoMapper } from "./empleado.mapper";
import { EstadoBolsinMapper } from "./estados/estado-bolsin.mapper";

export class CambioEstadoBolsinMapper {
    private static readonly ids = new WeakMap<CambioEstadoBolsin, number>();

    static toDomain(orm: CambioEstadoBolsinOrm): CambioEstadoBolsin {
        const cambio = new CambioEstadoBolsin(
            EstadoBolsinMapper.toDomain(orm.estadoActual),
            EmpleadoMapper.toDomain(orm.empleado),
            orm.fechaYHoraInicio,
            orm.fechaYHoraFin ?? undefined // sosActual() compara contra undefined
        );
        CambioEstadoBolsinMapper.ids.set(cambio, orm.id);
        return cambio;
    }

    /**
     * La FK al bolsín la completa TypeORM por cascade desde BolsinOrm.
     */
    static toOrm(domain: CambioEstadoBolsin): CambioEstadoBolsinOrm {
        const orm = new CambioEstadoBolsinOrm();

        const id = CambioEstadoBolsinMapper.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.estadoActual = EstadoBolsinMapper.toOrm(domain.getEstadoActual());
        orm.empleado = EmpleadoMapper.toOrm(domain.getEmpleado());
        orm.fechaYHoraInicio = domain.getFechaYHoraInicio();
        orm.fechaYHoraFin = domain.getFechaYHoraFin() ?? null;

        return orm;
    }
}
