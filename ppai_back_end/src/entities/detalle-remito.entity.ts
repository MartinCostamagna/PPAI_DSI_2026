import { Documentacion } from "./documentacion.entity";
import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";



export class DetalleRemito  {
    private documentacion: Documentacion;

    constructor(documentacion: Documentacion){
        this.documentacion = documentacion;
    }

    public mostrarTipoDocumento(): string {
        return this.documentacion.mostrarTipoDocumento();
    }

    public mostrarAsunto(): string {
        return this.documentacion.getAsunto();
    }

    public actualizarEstadoDoc(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void {
        this.documentacion.actualizarEstadoDoc(fechaYHoraActual, estado, empleado)
    }

}