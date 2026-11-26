import { CambioEstadoBolsin } from "./cambio-estado-bolsin.entity";
import { ComisionMedica } from "../../entities/comision-medica.entity";
import { Empleado } from "../../entities/empleado.entity";
import { EstadoBolsin } from "../state/estado-bolsin.abstract";
import { EstadoDocumentacion } from "../../documentacion/state/estado-documentacion.abstract";
import { EstadoRemito } from "../../remito/state/estado-remito.abstract";
import { Remito } from "../../remito/entities/remito.entity";
import { Enviado } from "../state/enviado.state";

export class Bolsin {
    private cambiosEstado: CambioEstadoBolsin[];
    private comisionMedicaOrigen: ComisionMedica;
    private comisionMedicaDestino: ComisionMedica;
    private remitos: Remito[];
    private numeroPrecinto: number;
    private estadoActual: EstadoBolsin;

    constructor(cambiosEstado: CambioEstadoBolsin[], comisionMedicaOrigen: ComisionMedica, comisionMedicaDestino: ComisionMedica, remitos: Remito[], numeroPrecinto: number, estado: EstadoBolsin) {
        this.cambiosEstado = cambiosEstado;
        this.comisionMedicaOrigen = comisionMedicaOrigen;
        this.comisionMedicaDestino = comisionMedicaDestino;
        this.remitos = remitos;
        this.numeroPrecinto = numeroPrecinto;
        this.estadoActual = estado;
    }

    // Para corroborar la CM, utilizamos la ya almacenada en la busqueda anterior, la CM del empleado.
    public esTuCMDestino(cm: string): boolean {
        return this.comisionMedicaDestino.getNombre() === cm;
    }

    // Obtenemos únicamente el nombre de la CM Origen.
    public mostrarCMOrigen(): string {
        return this.comisionMedicaOrigen.getNombre();
    }

    public getNumeroPrecinto(): number {
        return this.numeroPrecinto;
    }

    /**
     * Obtenemos, por cada remito, su número y datos específicos de sus documentaciones.
     * Específicamente obtenemos el tipo de documento y el asunto.
     */
    public mostrarRemitos() {
        return this.remitos.map(r => ({
            numerosRemitos: r.getNumero(),
            datosDocumentacion: this.buscarDatosDocumentacion(r)
        }));
    }

    // Obtenemos específicamente el tipo de documento y el asunto de cada documento.
    public buscarDatosDocumentacion(remito: Remito) {
        return remito.mostrarDocumentacion();
    }

    public agregarCambioEstado(cambioEstado: CambioEstadoBolsin): void{
        this.cambiosEstado.push(cambioEstado);
    }

    public setEstado(estado: EstadoBolsin): void{
        this.estadoActual = estado;
    }

    public recibir(fechaYHoraActual: Date, empleado: Empleado): void{
        this.estadoActual.recibir(this, fechaYHoraActual, this.cambiosEstado, empleado);
    }

    public sosEnviado(): boolean {
        return this.estadoActual instanceof Enviado;
    }
}