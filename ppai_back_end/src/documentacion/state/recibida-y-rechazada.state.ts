import { EstadoDocumentacion } from "./estado-documentacion.abstract";

export class RecibidaYRechazada extends EstadoDocumentacion {
    reenviar(): void {
        console.log('Documentación reenviada.');
    }
}