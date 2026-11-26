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

    // Registra la recepción del remito y acepta toda su documentación.
    public recibir(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.recibir(this);
        this.detallesRemito.forEach(d => d.aceptarDocumentacion(fechaYHoraActual, empleado));
    }

    // Registra la recepción del remito y rechaza toda su documentación.
    public rechazar(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.recibir(this);
        this.detallesRemito.forEach(d => d.rechazarDocumentacion(fechaYHoraActual, empleado));
    }

    // Registra la recepción del remito y deja su documentación para redirigir.
    public redirigir(fechaYHoraActual: Date, empleado: Empleado): void {
        this.estadoActual.recibir(this);
        this.detallesRemito.forEach(d => d.redirigirDocumentacion(fechaYHoraActual, empleado));
    }

    public getDetallesRemito(): DetalleRemito[] {
        return this.detallesRemito;
    }

    public getEstadoActual(): EstadoRemito {
        return this.estadoActual;
    }
}