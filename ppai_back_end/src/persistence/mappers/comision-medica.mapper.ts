import { ComisionMedica } from "../../entities/comision-medica.entity";
import { ComisionMedicaOrm } from "../orm-entities/comision-medica.orm-entity";

export class ComisionMedicaMapper {
    private static readonly ids = new WeakMap<ComisionMedica, number>();

    static toDomain(orm: ComisionMedicaOrm): ComisionMedica {
        const comision = new ComisionMedica(orm.nombre);
        this.ids.set(comision, orm.id);
        return comision;
    }

    static toOrm(domain: ComisionMedica): ComisionMedicaOrm {
        const orm = new ComisionMedicaOrm();

        const id = this.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.nombre = domain.getNombre();

        return orm;
    }
}
