import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComisionMedicaOrm } from "./comision-medica.orm-entity";

@Entity('empleado')
export class EmpleadoOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 150 })
    nombre!: string;

    @OneToOne(() => ComisionMedicaOrm, (comision) => comision.empleado)
    @JoinColumn({ name: 'comision_medica_id' })
    comisionMedica!: ComisionMedicaOrm;

    @Column({ name: 'comision_medica_id' })
    comisionMedicaId!: number;
}
