import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComisionMedicaOrm } from "./comision-medica.orm-entity";

@Entity('empleado')
export class EmpleadoOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 150 })
    nombre!: string;

    @ManyToOne(() => ComisionMedicaOrm, (comision) => comision.empleados)
    @JoinColumn({ name: 'comision_medica_id' })
    comisionMedica!: ComisionMedicaOrm;

    @Column({ name: 'comision_medica_id' })
    comisionMedicaId!: number;
}
