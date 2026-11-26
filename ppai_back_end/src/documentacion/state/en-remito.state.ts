import { EstadoDocumentacion } from "./estado-documentacion.abstract";

export class EnRemito extends EstadoDocumentacion{
    cancelar(): void {
        console.log('Documentación cancelada.');
    }

    incluirABolsin(): void {
        console.log('Documentación incluida en el bolsín.');
    }
}