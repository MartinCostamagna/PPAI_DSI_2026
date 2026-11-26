import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadoOrm } from "./empleado.orm-entity";

@Entity('comision_medica')
export class ComisionMedicaOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 70 })
    nombre!: string;

    @OneToOne(() => EmpleadoOrm, (empelado) => empelado.comisionMedica)
    empleado!: EmpleadoOrm;
}
