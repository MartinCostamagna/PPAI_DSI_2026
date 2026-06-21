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

    public actualizarEstadoDoc(fechaYHoraActual: Date, estadoDocumentacion: Estado, empleado: Empleado): void {
        if (estadoDocumentacion.esRecibidaYAceptada()) { 
            this.detallesRemito.forEach(dr => dr.actualizarEstadoDocARecibidaYAceptada(fechaYHoraActual, estadoDocumentacion, empleado));
        } else if (estadoDocumentacion.esRecibidaYRechazada()) {
            this.detallesRemito.forEach(dr => dr.actualizarEstadoDocARecibidaYRechazada(fechaYHoraActual, estadoDocumentacion, empleado));
        } else if (estadoDocumentacion.esParaRedirigir()) {
            this.detallesRemito.forEach(dr => dr.actualizarEstadoDocAParaRedirigir(fechaYHoraActual, estadoDocumentacion, empleado));
        }
    }

    // public recibir(estado: Estado, fechaYHoraActual: Date, estadoDocumentacion: Estado, empleado: Empleado): void {
    //     this.setEstado(estado);

    //     if (estadoDocumentacion.esRecibidaYAceptada()) { 
    //         this.detallesRemito.forEach(dr => dr.actualizarEstadoDocRecibidaYAceptada(fechaYHoraActual, estadoDocumentacion, empleado));
    //     } else if (estadoDocumentacion.esRecibidaYRechazada()) {
    //         this.detallesRemito.forEach(dr => dr.actualizarEstadoDocARecibidaYRechazada(fechaYHoraActual, estadoDocumentacion, empleado));
    //     } else if (estadoDocumentacion.esParaRedirigir()) {
    //         this.detallesRemito.forEach(dr => dr.actualizarEstadoDocAParaRedirigir(fechaYHoraActual, estadoDocumentacion, empleado));
    //     }
    // }
}