import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario!: number;

    @Column({ type: 'varchar', nullable: false })
    nombre!: string;

    @Column({ type: 'varchar', nullable: false })
    contraseña!: string;
}
