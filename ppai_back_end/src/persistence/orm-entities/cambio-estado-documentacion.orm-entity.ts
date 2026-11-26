import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpleadoOrm } from "./empleado.orm-entity";
import { DocumentacionOrm } from "./documentacion.orm-entity";

@Entity('cambio_estado_documentacion')
export class CambioEstadoDocumentacionOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50 })
    estado!: string;

    @ManyToOne(() => EmpleadoOrm)
    @JoinColumn({ name: 'empleado_id' })
    empleado!: EmpleadoOrm;

    @Column({ name: 'empleado_id' })
    empleadoId!: number;

    @Column({ name: 'fecha_y_hora_inicio', type: 'timestamp' })
    fechaYHoraInicio!: Date;

    @Column({ name: 'fecha_y_hora_fin', type: 'timestamp', nullable: true })
    fechaYHoraFin!: Date | null;

    @ManyToOne(() => DocumentacionOrm, (documentacion) => documentacion.cambiosEstadoDocumentacion)
    @JoinColumn({ name: 'documentacion_id' })
    documentacion!: DocumentacionOrm;

    @Column({ name: 'documentacion_id' })
    documentacionId!: number;
}
