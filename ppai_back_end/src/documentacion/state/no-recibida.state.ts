import { EstadoDocumentacion } from "./estado-documentacion.abstract";

export class NoRecibida extends EstadoDocumentacion {
    reenviar(): void {
        console.log('Documentación reenviada.');
    }

    darDeBaja(): void {
        console.log('Documentación dada de baja.');
    }
}
