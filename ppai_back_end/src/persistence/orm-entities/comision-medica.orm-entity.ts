import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comision_medica')
export class ComisionMedicaOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 70 })
    nombre!: string;
}
