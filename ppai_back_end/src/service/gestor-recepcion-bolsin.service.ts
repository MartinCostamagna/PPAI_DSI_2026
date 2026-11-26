import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Bolsin } from "../bolsin/entities/bolsin.entity";
import { Empleado } from "../entities/empleado.entity";
import { Sesion } from "../entities/sesion.entity";
import { BOLSIN_REPOSITORY, type BolsinRepository } from "../persistence/repository/bolsin.repository";
import { SESION_REPOSITORY, type SesionRepository } from "../persistence/repository/sesion.repository";
/**
 * Métodos mapeados del diagrama de secuencia de GestorRecepcionBolsin:
 * nuevaRecepcionBolsin()
 * obtenerEmpleadoLog()
 * obtenerNombreCMEmpleado()
 * buscarBolsinesEnviadosParaCM()
 * tomarSeleccionBolsin()
 * buscarNroRemitosYDocumentacion()
 * tomarSeleccionOpcRecBolsin()
 * tomarConfirmacion()
 * registrarRecepcionBolsin()
 * tomarFechaYHoraActual()
 * llamarCUNotificarRecepcionBolsin()
 * finCU()
 */
@Injectable()
export class GestorRecepcionBolsin {
    private bolsines!: Bolsin[];
    private sesion!: Sesion;
    
    private empleado!: Empleado;
    private nombreCMEmpleado!: string;
    private opcion!: number;
    private bolsinSeleccionado!: Bolsin;
    private fechaYHoraActual!: Date;

    constructor(
        @Inject(BOLSIN_REPOSITORY) private readonly bolsinRepository: BolsinRepository,
        @Inject(SESION_REPOSITORY) private readonly sesionRepository: SesionRepository
    ) {}

    // Busca la sesión activa y los bolsines disponibles para iniciar la recepción.
    public async nuevaRecepcionBolsin() {
        const sesion = await this.sesionRepository.buscarSesionActiva();
        if (!sesion) {
            throw new NotFoundException("No hay una sesión activa");
        }
        this.sesion = sesion;
        this.bolsines = await this.bolsinRepository.buscarTodos();

        this.obtenerEmpleadoLog();
        
        // Retornamos la CM del empleado y los bolsines para seleccionar.
        return {
            nombreCMEmpleado: this.obtenerNombreCMEmpleado(),
            bolsinesInfo: this.buscarBolsinesEnviadosParaCM()
        }
    }

    // Obtiene el empleado asociado a la sesión activa.
    public obtenerEmpleadoLog(): void {
        this.empleado = this.sesion.obtenerEmpleadoLog();
    }

    // Guarda el nombre de la CM del empleado para filtrar los bolsines.
    public obtenerNombreCMEmpleado() {
        this.nombreCMEmpleado = this.empleado.mostrarCM();
        return this.nombreCMEmpleado;
    }

    // Selecciona los bolsines enviados a la CM del empleado.
    public buscarBolsinesEnviadosParaCM() {
        return this.bolsines.filter(b => b.sosEnviado()).filter(b => b.esTuCMDestino(this.nombreCMEmpleado)).map(b => ({
            nombreCMOrigen: b.mostrarCMOrigen(),
            numeroPrecinto: b.getNumeroPrecinto()
        }));
    }

    /**
     * Busca el bolsín por su número de precinto y devuelve sus remitos
     * con el tipo y el asunto de cada documento.
     */
    public tomarSeleccionBolsin(nroPrecinto: number) {
        this.bolsinSeleccionado = this.bolsines.find(b => b.getNumeroPrecinto() === nroPrecinto)!;
        return this.buscarNroRemitosYDocumentacion();
    }

    public buscarNroRemitosYDocumentacion() {
        return this.bolsinSeleccionado.mostrarRemitos();
    }

    public tomarSeleccionOpcRecBolsin(opcion: number) {
        this.opcion = opcion;
    }

    // Comienza el registro de la recepción del bolsín, en base a la opción elegida previamente.
    public tomarConfirmacion() {
        return this.registrarRecepcionBolsin();
    }

    /**
     * Registra la recepción del bolsín y aplica la opción elegida a su documentación.
     * Usa la misma fecha y hora para los cambios de estado.
     * Guarda el bolsín y devuelve el mensaje de la recepción.
     */
    public async registrarRecepcionBolsin() {
        this.fechaYHoraActual = this.tomarFechaYHoraActual();
        this.bolsinSeleccionado.recibir(
                    this.fechaYHoraActual,
                    this.empleado
                );
        let mensaje = "";
        switch (this.opcion){
            case 1:
                mensaje = "Recepción bolsín Exitosa";
                this.bolsinSeleccionado.aceptarDocumentacion(
                    this.fechaYHoraActual,
                    this.empleado
                )
                break;
            case 2:
                // Las opciones 2 y 3 siguen el mismo flujo de rechazo.
            case 3:
                mensaje = `Documentacion no corresponde a la CM destino ${this.nombreCMEmpleado}`;
                this.bolsinSeleccionado.rechazarDocumentacion(
                    this.fechaYHoraActual,
                    this.empleado,
                )
                break;
            case 4:
                mensaje = "Documentación para redirigir a otra área";
                this.bolsinSeleccionado.redirigirDocumentacion(
                    this.fechaYHoraActual,
                    this.empleado
                );
                break;
        }

        await this.bolsinRepository.guardar(this.bolsinSeleccionado);

        return this.llamarCUNotificarRecepcionBolsin(mensaje);
    }

    public tomarFechaYHoraActual(): Date {
        return new Date();
    }

    // Se retorna el mensaje armado, simulando una llamada al caso de uso "Notificar recepción de bolsín".
    public llamarCUNotificarRecepcionBolsin(mensaje: string): { mensaje: string } {
        return { mensaje };
    }

    // Retornamos un mensaje de finalización del caso de uso.
    public finCU(): { mensaje: string } {
        return { mensaje : "Fin CU" };
    }
}