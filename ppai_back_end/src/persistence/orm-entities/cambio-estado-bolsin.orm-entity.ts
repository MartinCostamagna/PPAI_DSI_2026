import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadoOrm } from "./empleado.orm-entity";
import { BolsinOrm } from "./bolsin.orm-entity";

@Entity('cambio_estado_bolsin')
export class CambioEstadoBolsinOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'estado_actual', type: 'varchar', length: 50 })
    estadoActual!: string;

    @ManyToOne(() => EmpleadoOrm)
    @JoinColumn({ name: 'empleado_id' })
    empleado!: EmpleadoOrm;

    @Column({ name: 'empleado_id' })
    empleadoId!: number;

    @Column({ name: 'fecha_y_hora_inicio', type: 'timestamp' })
    fechaYHoraInicio!: Date;

    @Column({ name: 'fecha_y_hora_fin', type: 'timestamp', nullable: true })
    fechaYHoraFin!: Date | null;

    @ManyToOne(() => BolsinOrm, (bolsin) => bolsin.cambiosEstado)
    @JoinColumn({ name: 'bolsin_id' })
    bolsin!: BolsinOrm;

    @Column({ name: 'bolsin_id' })
    bolsinId!: number;
}
