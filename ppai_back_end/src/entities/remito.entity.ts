import { DetalleRemito } from "./detalle-remito.entity";
import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";

export class Remito {
    private numero: number;
    private detallesRemito: DetalleRemito[];
    private estado: Estado;

    constructor(numero: number, detallesRemito: DetalleRemito[], estado: Estado) {
        this.numero = numero;
        this.detallesRemito = detallesRemito;
        this.estado = estado;
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

    public setEstado(estado: Estado): void {
        this.estado = estado;
    }

    public recibir(estado: Estado): void {
        this.estado = estado;
    }

    /**
     * Dependiendo del estado deseado para la documentación, se ejecuta su método de la máquina de estados.
     * El cambio se realiza para la documentación correspondiente a cada detalle del remito.
     */
    public actualizarEstadoDoc(fechaYHoraActual: Date, estadoDocumentacion: Estado, empleado: Empleado): void {
        if (estadoDocumentacion.esRecibidaYAceptada()) { 
            this.detallesRemito.forEach(dr => dr.actualizarEstadoDocARecibidaYAceptada(fechaYHoraActual, estadoDocumentacion, empleado));
        } else if (estadoDocumentacion.esRecibidaYRechazada()) {
            this.detallesRemito.forEach(dr => dr.actualizarEstadoDocARecibidaYRechazada(fechaYHoraActual, estadoDocumentacion, empleado));
        } else if (estadoDocumentacion.esParaRedirigir()) {
            this.detallesRemito.forEach(dr => dr.actualizarEstadoDocAParaRedirigir(fechaYHoraActual, estadoDocumentacion, empleado));
        }
    }
}