import { DetalleRemito } from "./detalle-remito.entity";
import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";




export class Remito  {
    private numero: number;
    private detallesRemito: DetalleRemito[];
    private estado: Estado;

    constructor (numero: number, detallesRemito: DetalleRemito[], estado: Estado){
        this.numero = numero;
        this.detallesRemito = detallesRemito;
        this.estado = estado;
    }

    public getNumero(): number{
        return this.numero;
    }

    public mostrarDocumentacion(): Object{
        return this.detallesRemito.map(dr => (
            {tipoDocumento: dr.mostrarTipoDocumento(), 
            asunto: dr.mostrarAsunto()
        }));
    }

    public setEstado(estado: Estado): void{
        this.estado = estado;
    }

    public actualizarEstadoDoc(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{
        this.detallesRemito.forEach(dr => dr.actualizarEstadoDoc(fechaYHoraActual, estado, empleado));
    }
}