import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentacionOrm } from "./documentacion.orm-entity";
import { RemitoOrm } from "./remito.orm-entity";

@Entity('detalle_remito')
export class DetalleRemitoOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => DocumentacionOrm, { cascade: true })
    @JoinColumn({ name: 'documentacion_id' })
    documentacion!: DocumentacionOrm;

    @Column({ name: 'documentacion_id' })
    documentacionId!: number;

    @ManyToOne(() => RemitoOrm, (remito) => remito.detallesRemito)
    @JoinColumn({ name: 'remito_id' })
    remito!: RemitoOrm;

    @Column({ name: 'remito_id' })
    remitoId!: number;
}
