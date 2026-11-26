import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadoOrm } from "./empleado.orm-entity";

@Entity('comision_medica')
export class ComisionMedicaOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 70 })
    nombre!: string;

    @OneToMany(() => EmpleadoOrm, (empleado) => empleado.comisionMedica)
    empleados!: EmpleadoOrm[];
}
