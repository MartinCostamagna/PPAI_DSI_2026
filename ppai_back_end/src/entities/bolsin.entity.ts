import { CambioEstadoBolsin } from "./cambio-estado-bolsin.entity";
import { ComisionMedica } from "./comision-medica.entity";
import { Empleado } from "./empleado.entity";
import { Estado } from "./estado.entity";
import { Remito } from "./remito.entity";

export class Bolsin {
    private cambiosEstado: CambioEstadoBolsin[];
    private comisionMedicaOrigen: ComisionMedica;
    private comisionMedicaDestino: ComisionMedica;
    private remitos: Remito[];
    private numeroPrecinto: number;

    constructor(cambiosEstado: CambioEstadoBolsin[], comisionMedicaOrigen: ComisionMedica, comisionMedicaDestino: ComisionMedica, remitos: Remito[], numeroPrecinto: number){
        this.cambiosEstado = cambiosEstado;
        this.comisionMedicaOrigen = comisionMedicaOrigen;
        this.comisionMedicaDestino = comisionMedicaDestino;
        this.remitos = remitos;
        this.numeroPrecinto = numeroPrecinto;
    }

    public sosEnviado(): boolean {
        const actual = this.cambiosEstado.find(ce => ce.sosActual());
        return (actual?.sosEnviado()) ?? false;
    }

    public esTuCMDestino(cm: string): boolean{
        return (this.comisionMedicaDestino.getNombre() === cm);
    }

    public mostrarCMOrigen(): string{
        return this.comisionMedicaOrigen.getNombre();
    }

    public getNumeroPrecinto(): number {
        return this.numeroPrecinto;
    }

    public mostrarRemitos(): Object {
        return this.remitos.map(r => ({
            numerosRemitos: r.getNumero(),
            datosDocumentacion: this.buscarDatosDocumentacion()
        }))
    }

    public buscarDatosDocumentacion(): Object{
        return this.remitos.map(r => r.mostrarDocumentacion())
    }

    public registrarRecepcion(fechaYHoraActual: Date, estado: Estado, estadoRemito: Estado ,estadoDocumentacion: Estado, empleado: Empleado): void{
        this.crearCEBolsin(fechaYHoraActual, estado, empleado);
        this.remitos.forEach(r => {
            r.setEstado(estadoRemito);
            r.actualizarEstadoDoc(fechaYHoraActual, estadoDocumentacion, empleado);
        });
    }

    public crearCEBolsin(fechaYHoraActual: Date, estado: Estado, empleado: Empleado): void{
        const actual = this.cambiosEstado.find(ce => ce.sosActual());
        actual?.setFechaYHoraFin(fechaYHoraActual);
        this.remitos.forEach(r => r.setEstado(estado));
        const nuevo: CambioEstadoBolsin = new CambioEstadoBolsin(estado, empleado, fechaYHoraActual);
        this.cambiosEstado.push(nuevo);
    }


}