import { CambioEstadoBolsin } from "./cambio-estado-bolsin.entity";
import { ComisionMedica } from "./comision-medica.entity";
import { Remito } from "./remito.entity";

export class Bolsin {
    private cambiosEstado!: CambioEstadoBolsin[];
    private comisionMedicaOrigen!: ComisionMedica;
    private comisionMedicaDestino!: ComisionMedica;
    private remito!: Remito;
}