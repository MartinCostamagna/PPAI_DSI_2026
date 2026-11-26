import { TipoDocumento } from "../../documentacion/entities/tipo-documento.entity";
import { TipoDocumentoOrm } from "../orm-entities/tipo-documento.orm-entity";

export class TipoDocumentoMapper {
    private static readonly ids = new WeakMap<TipoDocumento, number>();

    static toDomain(orm: TipoDocumentoOrm): TipoDocumento {
        const tipo = new TipoDocumento(orm.nombre);
        TipoDocumentoMapper.ids.set(tipo, orm.id);
        return tipo;
    }

    static toOrm(domain: TipoDocumento): TipoDocumentoOrm {
        const orm = new TipoDocumentoOrm();

        const id = TipoDocumentoMapper.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.nombre = domain.getNombre();

        return orm;
    }
}
