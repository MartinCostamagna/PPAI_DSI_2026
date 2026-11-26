import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadoOrm } from "./empleado.orm-entity";

@Entity('usuario')
export class UsuarioOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50 })
    nombre!: string;

    @Column({ name: 'hash_contrasenia', type: 'varchar', length: 255 })
    hashContrasenia!: string;

    @OneToOne(() => EmpleadoOrm)
    @JoinColumn({ name: 'empleado_id' })
    empleado!: EmpleadoOrm;

    @Column({ name: 'empleado_id' })
    empleadoId!: number;
}
