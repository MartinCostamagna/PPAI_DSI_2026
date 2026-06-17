import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Empleados')
export class Empleado {
    @PrimaryGeneratedColumn()
    idEmpleado!: number;

    @Column({ type: 'varchar', nullable: false })
    nombre!: string


}
