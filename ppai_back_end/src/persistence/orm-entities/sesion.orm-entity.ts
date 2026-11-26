import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioOrm } from "./usuario.orm-entity";

@Entity('sesion')
export class SesionOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'fecha_y_hora_inicio', type: 'timestamp' })
    fechaYHoraInicio!: Date;

    @Column({ name: 'fecha_y_hora_fin', type: 'timestamp', nullable: true })
    fechaYHoraFin!: Date | null;

    @ManyToOne(() => UsuarioOrm)
    @JoinColumn({ name: 'usuario_id' })
    usuario!: UsuarioOrm;

    @Column({ name: 'usuario_id' })
    usuarioId!: number;
}
