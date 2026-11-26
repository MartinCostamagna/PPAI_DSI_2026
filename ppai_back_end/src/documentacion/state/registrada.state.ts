import { EstadoDocumentacion } from "./estado-documentacion.abstract";

export class Registrada extends EstadoDocumentacion{
    agregarARemito(): void {
        console.log('Documentación agregada al remito.');
    }

    darDeBaja(): void {
        console.log('Documentación dada de baja.');
    }
}