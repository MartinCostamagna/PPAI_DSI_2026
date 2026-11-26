import { Bolsin } from "../../bolsin/entities/bolsin.entity";
import { BolsinOrm } from "../orm-entities/bolsin.orm-entity";
import { ComisionMedicaMapper } from "./comision-medica.mapper";
import { CambioEstadoBolsinMapper } from "./cambio-estado-bolsin.mapper";
import { RemitoMapper } from "./remito.mapper";
import { EstadoBolsinMapper } from "./estados/estado-bolsin.mapper";

/**
 * Al registrar la recepción cambian el estado del bolsín, sus cambios de estado,
 * el estado de sus remitos y el estado y los cambios de estado de sus documentaciones.
 */
export class BolsinMapper {
    private static readonly ids = new WeakMap<Bolsin, number>();

    static toDomain(orm: BolsinOrm): Bolsin {
        const cambiosEstado = (orm.cambiosEstado ?? []).map(CambioEstadoBolsinMapper.toDomain);
        const remitos = (orm.remitos ?? []).map(RemitoMapper.toDomain);
        const bolsin = new Bolsin(
            cambiosEstado,
            ComisionMedicaMapper.toDomain(orm.comisionMedicaOrigen),
            ComisionMedicaMapper.toDomain(orm.comisionMedicaDestino),
            remitos,
            orm.numeroPrecinto,
            EstadoBolsinMapper.toDomain(orm.estadoActual)
        );
        BolsinMapper.ids.set(bolsin, orm.id);
        return bolsin;
    }

    static toOrm(domain: Bolsin): BolsinOrm {
        const orm = new BolsinOrm();

        const id = BolsinMapper.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.cambiosEstado = domain.getCambiosEstado().map(CambioEstadoBolsinMapper.toOrm);
        orm.comisionMedicaOrigen = ComisionMedicaMapper.toOrm(domain.getComisionMedicaOrigen());
        orm.comisionMedicaDestino = ComisionMedicaMapper.toOrm(domain.getComisionMedicaDestino());
        orm.remitos = domain.getRemitos().map(RemitoMapper.toOrm);
        orm.numeroPrecinto = domain.getNumeroPrecinto();
        orm.estadoActual = EstadoBolsinMapper.toOrm(domain.getEstadoActual());

        return orm;
    }
}
