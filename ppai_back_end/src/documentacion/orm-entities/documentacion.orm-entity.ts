import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('documentacion')
export class DocumentacionORM{

    @PrimaryGeneratedColumn()
    id!: number;

    //tipoDocumento: TipoDocumento;
    
    //asunto: string;
    
    //cambioEstadoDocumentacion: CambioEstadoDocumentacion[];
}