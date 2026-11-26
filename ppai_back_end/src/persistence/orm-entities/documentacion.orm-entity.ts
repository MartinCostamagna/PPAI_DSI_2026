import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoDocumentoOrm } from "./tipo-documento.orm-entity";
import { CambioEstadoDocumentacionOrm } from "./cambio-estado-documentacion.orm-entity";

@Entity('documentacion')
export class DocumentacionOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => TipoDocumentoOrm)
    @JoinColumn({ name: 'tipo_documento_id' })
    tipoDocumento!: TipoDocumentoOrm;

    @Column({ name: 'tipo_documento_id' })
    tipoDocumentoId!: number;

    @Column({ type: 'varchar', length: 255 })
    asunto!: string;

    @OneToMany(() => CambioEstadoDocumentacionOrm, (cambio) => cambio.documentacion, { cascade: true })
    cambiosEstadoDocumentacion!: CambioEstadoDocumentacionOrm[];

    @Column({ name: 'estado_actual', type: 'varchar', length: 50 })
    estadoActual!: string;
}
