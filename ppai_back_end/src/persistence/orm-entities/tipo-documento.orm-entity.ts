import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_documento')
export class TipoDocumentoOrm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 70 })
    nombre!: string;
}
