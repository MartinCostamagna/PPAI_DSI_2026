import { Documentacion } from "../../documentacion/entities/documentacion.entity";
import { DocumentacionOrm } from "../orm-entities/documentacion.orm-entity";
import { TipoDocumentoMapper } from "./tipo-documento.mapper";
import { CambioEstadoDocumentacionMapper } from "./cambio-estado-documentacion.mapper";
import { EstadoDocumentacionMapper } from "./estados/estado-documentacion.mapper";

export class DocumentacionMapper {
    private static readonly ids = new WeakMap<Documentacion, number>();

    static toDomain(orm: DocumentacionOrm): Documentacion {
        const cambiosEstado = (orm.cambiosEstadoDocumentacion ?? []).map(CambioEstadoDocumentacionMapper.toDomain);
        const documentacion = new Documentacion(
            TipoDocumentoMapper.toDomain(orm.tipoDocumento),
            orm.asunto,
            cambiosEstado,
            EstadoDocumentacionMapper.toDomain(orm.estadoActual)
        );
        this.ids.set(documentacion, orm.id);
        return documentacion;
    }

    static toOrm(domain: Documentacion): DocumentacionOrm {
        const orm = new DocumentacionOrm();

        const id = this.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.tipoDocumento = TipoDocumentoMapper.toOrm(domain.getTipoDocumento());
        orm.asunto = domain.getAsunto();
        orm.cambiosEstadoDocumentacion = domain.getCambiosEstadoDocumentacion().map(CambioEstadoDocumentacionMapper.toOrm);
        orm.estadoActual = EstadoDocumentacionMapper.toOrm(domain.getEstadoActual());

        return orm;
    }
}
