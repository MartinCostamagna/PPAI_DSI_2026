import { DetalleRemito } from "./detalle-remito.entity";
import { Estado } from "./estado.entity";




export class Remito  {
    private numero!: number;
    private detallesRemito!: DetalleRemito[];
    private estado!: Estado;
}