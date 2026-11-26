import { DetalleRemito } from "../../remito/entities/detalle-remito.entity";
import { DetalleRemitoOrm } from "../orm-entities/detalle-remito.orm-entity";
import { DocumentacionMapper } from "./documentacion.mapper";

export class DetalleRemitoMapper {
    private static readonly ids = new WeakMap<DetalleRemito, number>();

    static toDomain(orm: DetalleRemitoOrm): DetalleRemito {
        const detalle = new DetalleRemito(DocumentacionMapper.toDomain(orm.documentacion));
        DetalleRemitoMapper.ids.set(detalle, orm.id);
        return detalle;
    }

    // La FK al remito la completa TypeORM por cascade desde RemitoOrm.
    static toOrm(domain: DetalleRemito): DetalleRemitoOrm {
        const orm = new DetalleRemitoOrm();

        const id = DetalleRemitoMapper.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.documentacion = DocumentacionMapper.toOrm(domain.getDocumentacion());

        return orm;
    }
}
