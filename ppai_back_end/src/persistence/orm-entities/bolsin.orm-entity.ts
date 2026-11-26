import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CambioEstadoBolsinOrm } from "./cambio-estado-bolsin.orm-entity";
import { ComisionMedicaOrm } from "./comision-medica.orm-entity";
import { RemitoOrm } from "./remito.orm-entity";

@Entity('bolsin')
export class BolsinOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => CambioEstadoBolsinOrm, (cambio) => cambio.bolsin, { cascade: true })
    cambiosEstado!: CambioEstadoBolsinOrm[];

    @ManyToOne(() => ComisionMedicaOrm)
    @JoinColumn({ name: 'comision_medica_origen_id' })
    comisionMedicaOrigen!: ComisionMedicaOrm;

    @Column({ name: 'comision_medica_origen_id' })
    comisionMedicaOrigenId!: number;

    @ManyToOne(() => ComisionMedicaOrm)
    @JoinColumn({ name: 'comision_medica_destino_id' })
    comisionMedicaDestino!: ComisionMedicaOrm;

    @Column({ name: 'comision_medica_destino_id' })
    comisionMedicaDestinoId!: number;

    @OneToMany(() => RemitoOrm, (remito) => remito.bolsin, { cascade: true })
    remitos!: RemitoOrm[];

    @Column({ name: 'numero_precinto', type: 'int' })
    numeroPrecinto!: number;

    @Column({ name: 'estado_actual', type: 'varchar', length: 50 })
    estadoActual!: string;
}
