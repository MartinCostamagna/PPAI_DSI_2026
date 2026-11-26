import { Empleado } from "../../entities/empleado.entity";
import { EmpleadoOrm } from "../orm-entities/empleado.orm-entity";
import { ComisionMedicaMapper } from "./comision-medica.mapper";

export class EmpleadoMapper {
    private static readonly ids = new WeakMap<Empleado, number>();

    // Requiere la relación `comisionMedica` cargada.
    static toDomain(orm: EmpleadoOrm): Empleado {
        const empleado = new Empleado(
            orm.nombre,
            ComisionMedicaMapper.toDomain(orm.comisionMedica)
        );
        EmpleadoMapper.ids.set(empleado, orm.id);
        return empleado;
    }

    static toOrm(domain: Empleado): EmpleadoOrm {
        const orm = new EmpleadoOrm();

        const id = EmpleadoMapper.ids.get(domain);
        if (id !== undefined) {
            orm.id = id;
        }
        orm.nombre = domain.getNombre();
        orm.comisionMedica = ComisionMedicaMapper.toOrm(domain.getComisionMedica());

        return orm;
    }
}
