import { ComisionMedica } from "../../entities/comision-medica.entity";
import { ComisionMedicaOrm } from "../orm-entities/comision-medica.orm-entity";

export class ComisionMedicaMapper {
    static toDomain(orm: ComisionMedicaOrm): ComisionMedica {
        return new ComisionMedica(orm.nombre);
    }

    static toOrm(domain: ComisionMedica): ComisionMedicaOrm {
        const orm = new ComisionMedicaOrm();
        orm.nombre = domain.getNombre();
        return orm;
    }
}
