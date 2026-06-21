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

    constructor(cambiosEstado: CambioEstadoBolsin[], comisionMedicaOrigen: ComisionMedica, comisionMedicaDestino: ComisionMedica, remitos: Remito[], numeroPrecinto: number) {
        this.cambiosEstado = cambiosEstado;
        this.comisionMedicaOrigen = comisionMedicaOrigen;
        this.comisionMedicaDestino = comisionMedicaDestino;
        this.remitos = remitos;
        this.numeroPrecinto = numeroPrecinto;
    }

    // Busca el cambio de estado actual, mediante un mensaje hacia el (sosActual()).
    // Luego de encontrado el cambio actual, se pregunta si su estado es "Enviado".
    public sosEnviado(): boolean {
        const actual = this.cambiosEstado.find(ce => ce.sosActual())!;
        return actual.sosEnviado();
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

    /**
     * Se crea un nuevo cambio de estado para el bolsín seleccionado y se cambia de estado al remito.
     * Por cada remito, actualizamos el estado de todas sus documentaciones.
     */
    public registrarRecepcion(fechaYHoraActual: Date, estado: Estado, estadoRemito: Estado, estadoDocumentacion: Estado, empleado: Empleado): void {
        this.crearCEBolsin(fechaYHoraActual, estado, empleado, estadoRemito);
        this.remitos.forEach(r => {
            r.actualizarEstadoDoc(fechaYHoraActual, estadoDocumentacion, empleado);
        });
    }

    /**
     * Seteamos la fecha y hora de fin del cambio de estado actual.
     * Cada remito pasa al estado RecibidoYAceptado.
     * Creamos un nuevo cambio de estado, asignandole la fecha actual, el nuevo estado, y el empleado responsable del cambio.
     */
    public crearCEBolsin(fechaYHoraActual: Date, estado: Estado, empleado: Empleado, estadoRemito: Estado): void {
        const actual = this.cambiosEstado.find(ce => ce.sosActual())!;
        actual.setFechaYHoraFin(fechaYHoraActual);

        this.remitos.forEach(r => r.recibir(estadoRemito));

        const nuevo: CambioEstadoBolsin = new CambioEstadoBolsin(estado, empleado, fechaYHoraActual);
        this.cambiosEstado.push(nuevo);
    }
}