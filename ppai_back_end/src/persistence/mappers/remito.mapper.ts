import { Remito } from "../../remito/entities/remito.entity";
import { RemitoOrm } from "../orm-entities/remito.orm-entity";
import { DetalleRemitoMapper } from "./detalle-remito.mapper";
import { EstadoRemitoMapper } from "./estados/estado-remito.mapper";

export class RemitoMapper {
    private static readonly ids = new WeakMap<Remito, number>();

    /**
     * Requiere la relación `detallesRemito` (y sus relaciones) cargada.
     */
    static toDomain(orm: RemitoOrm): Remito {
        const detalles = (orm.detallesRemito ?? []).map(d => DetalleRemitoMapper.toDomain(d));
        const remito = new Remito(
            orm.numero,
            detalles,
            EstadoRemitoMapper.toDomain(orm.estadoActual)
        );
        RemitoMapper.ids.set(remito, orm.id);
        return remito;
    }

    // La FK al bolsín la completa TypeORM por cascade desde BolsinOrm.
    static toOrm(domain: Remito): RemitoOrm {
        const orm = new RemitoOrm();

        const id = RemitoMapper.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.numero = domain.getNumero();
        orm.detallesRemito = domain.getDetallesRemito().map(DetalleRemitoMapper.toOrm);
        orm.estadoActual = EstadoRemitoMapper.toOrm(domain.getEstadoActual());

        return orm;
    }
}
