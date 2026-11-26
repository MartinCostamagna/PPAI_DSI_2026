import { EstadoDocumentacion } from "./estado-documentacion.abstract";

export class EnBolsinSaliente extends EstadoDocumentacion {
    enviar(): void {
        console.log('Documentación enviada.');
    }

    darDeBaja(): void {
        console.log('Documentación dada de baja.');
    }
}