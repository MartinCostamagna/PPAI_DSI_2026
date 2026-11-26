import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleRemitoOrm } from "./detalle-remito.orm-entity";
import { BolsinOrm } from "./bolsin.orm-entity";

@Entity('remito')
export class RemitoOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    numero!: number;

    @OneToMany(() => DetalleRemitoOrm, (detalle) => detalle.remito, { cascade: true })
    detallesRemito!: DetalleRemitoOrm[];

    @Column({ name: 'estado_actual', type: 'varchar', length: 50 })
    estadoActual!: string;

    @ManyToOne(() => BolsinOrm, (bolsin) => bolsin.remitos, { nullable: true })
    @JoinColumn({ name: 'bolsin_id' })
    bolsin!: BolsinOrm | null;

    @Column({ name: 'bolsin_id', type: 'int', nullable: true })
    bolsinId!: number | null;
}
