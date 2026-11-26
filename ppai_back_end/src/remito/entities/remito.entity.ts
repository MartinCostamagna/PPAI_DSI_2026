import { DetalleRemito } from "./detalle-remito.entity";
import { Empleado } from "../../entities/empleado.entity";
import { EstadoRemito } from "../state/estado-remito.abstract";

export class Remito {
    private numero: number;
    private detallesRemito: DetalleRemito[];
    private estadoActual: EstadoRemito;

    constructor(numero: number, detallesRemito: DetalleRemito[], estado: EstadoRemito) {
        this.numero = numero;
        this.detallesRemito = detallesRemito;
        this.estadoActual = estado;
    }

    public getNumero(): number{
        return this.numero;
    }

    // Mostramos datos esenciales de cada documentación, el tipo de documento y el asunto.
    public mostrarDocumentacion() {
        return this.detallesRemito.map(dr => ({
            tipoDocumento: dr.mostrarTipoDocumento(), 
            asunto: dr.mostrarAsuntoDoc()
        }));
    }

    public setEstado(estado: EstadoRemito): void {
        this.estadoActual = estado;
    }

    public recibir(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.recibir(this, fechaYHoraActual, empleado, this.detallesRemito);
    }
}