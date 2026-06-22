import { Injectable } from "@nestjs/common";

import { Bolsin } from "../entities/bolsin.entity";
import { Empleado } from "../entities/empleado.entity";
import { Estado } from "../entities/estado.entity";
import { Sesion } from "../entities/sesion.entity";

import { InMemoryRepository } from "../repository/inMemory.repository";
import { dateTimestampProvider } from "rxjs/internal/scheduler/dateTimestampProvider";

/* *
 * Métodos mapeados del diagrama de secuencia de `GestorRecepcionBolsin`:
 *  3. nuevaRecepcionBolsin()
 *  4. obtenerEmpleadoLog()
 *  7. obtenerNombreCMEmpleado()
 *  11. buscarBolsinesEnviadosParaCM()
 *  23. tomarSeleccionBolsin()
 *  24. buscarNroRemitosYDocumentacion()
 *  37. tomarSeleccionOpcRecBolsin()
 *  40. tomarConfirmacion()
 *  41. registrarRecepcionBolsin()
 *  42. tomarFechaYHoraActual()
 *  43. buscarEstadoRecibidoEnCMDestino()
 *  46. buscarEstadoRecibidoYAceptado()
 *  49. buscarEstadoRecibidaYAceptada()
 *  63. llamarCUNotificarRecepcionBolsin()
 *  65. finCU()
*/
@Injectable()
export class GestorRecepcionBolsin {
    private bolsines!: Bolsin[];
    private empleados!: Empleado[];
    private estados!: Estado[];
    private sesion!: Sesion;
    
    private empleado!: Empleado;
    private nombreCMEmpleado!: string;
    private opcion!: number;
    private bolsinSeleccionado!: Bolsin;
    private fechaYHoraActual!: Date;
    private estadoRecibidoEnCMDestino!: Estado;
    private estadoRecibidoYAceptado!: Estado;
    private estadoRecibidaYAceptada!: Estado;
    
    private estadoRegistrada!: Estado;
    private estadoRecibidaYRechazada!: Estado;
    private estadoParaRedirigir!: Estado;
    
    constructor(private readonly store: InMemoryRepository) {}
    
    /**
     * Comienza los envíos de mensajes.
    */
    public nuevaRecepcionBolsin() {
       // Primero, carga datos del repositorio en memoria (para simular persistencia)
        this.bolsines = this.store.getBolsines();
        this.empleados = this.store.getEmpleados();
        this.estados = this.store.getEstados();
        this.sesion = this.store.getSesion();
        
        // Luego, se obtiene el puntero al empleado logueado en este momento.
        this.obtenerEmpleadoLog();
        
        // Retornamos la CM del empleado y los bolsines para seleccionar.
        return {
            nombreCMEmpleado: this.obtenerNombreCMEmpleado(),
            bolsinesInfo: this.buscarBolsinesEnviadosParaCM()
        }
    }

    // Orquesta el envío de mensajes a la sesión, y esta al usuario.
    public obtenerEmpleadoLog(): void {
        this.empleado = this.sesion.obtenerEmpleadoLog();
    }

    // Se obtiene la CM del empleado mediante un envío de mensaje a este.
    public obtenerNombreCMEmpleado() {
        this.nombreCMEmpleado = this.empleado.mostrarCM();
        return this.nombreCMEmpleado;
    }

    // Se buscan los bolsines, iniciando el loop "Bolsines enviados para CM usuario Logueado" del diagrama de secuencia.
    public buscarBolsinesEnviadosParaCM() {
        return this.bolsines.filter(b => b.sosEnviado()).filter(b => b.esTuCMDestino(this.nombreCMEmpleado)).map(b => ({
            nombreCMOrigen: b.mostrarCMOrigen(),
            numeroPrecinto: b.getNumeroPrecinto()
        }));
    }

    /**
     * Obtenemos el puntero al bolsín seleccionado mediante su número de precinto.
     * Luego obtenemos la información de cada remito y toda su documentación.
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
     * Obtenemos los datos necesarios para operar, siendo estos:
     *  - Fecha y hora actual.
     *  - Estados necesarios para los cambios de estado.
     * Luego se ejecuta el registro de recepción mediante un mensaje al bolsín seleccionado.
     * El mensaje de llamada al caso de uso "Notificar recepción de bolsín" varía dependiendo de la opción elegida.
     */
    public registrarRecepcionBolsin() {
        this.fechaYHoraActual = this.tomarFechaYHoraActual();
        this.estadoRecibidoEnCMDestino = this.buscarEstadoRecibidoEnCMDestino();
        let mensaje = "";
        switch (this.opcion){
            case 1:
                mensaje = "Recepción bolsín Exitosa";
                this.estadoRecibidoYAceptado = this.buscarEstadoRecibidoYAceptado();
                this.estadoRecibidaYAceptada = this.buscarEstadoRecibidaYAceptada();
                this.bolsinSeleccionado.registrarRecepcion(
                    this.fechaYHoraActual,
                    this.estadoRecibidoEnCMDestino, 
                    this.estadoRecibidoYAceptado, 
                    this.estadoRecibidaYAceptada,
                    this.empleado
                );
                break;
            case 2:
                //no realizada debido a que no sabemos quien decide si se registra o se da de baja la documentación
            case 3:
                mensaje = `Documentacion no corresponde a la CM destino ${this.nombreCMEmpleado}`;
                this.estadoRecibidoYAceptado = this.buscarEstadoRecibidoYAceptado();
                this.estadoRecibidaYRechazada = this.buscarEstadoRecibidaYRechazada();
                this.bolsinSeleccionado.registrarRecepcion(
                    this.fechaYHoraActual,
                    this.estadoRecibidoEnCMDestino, 
                    this.estadoRecibidoYAceptado,
                    this.estadoRecibidaYRechazada,
                    this.empleado
                );
                break;
            case 4:
                mensaje = "Documentación para redirigir a otra área";
                this.estadoRecibidoYAceptado = this.buscarEstadoRecibidoYAceptado();
                this.estadoParaRedirigir = this.buscarEstadoParaRedirigir();
                this.bolsinSeleccionado.registrarRecepcion(
                    this.fechaYHoraActual,
                    this.estadoRecibidoEnCMDestino, 
                    this.estadoRecibidoYAceptado, 
                    this.estadoParaRedirigir, 
                    this.empleado
                );
                break;
        }

        return this.llamarCUNotificarRecepcionBolsin(mensaje);
    }

    public tomarFechaYHoraActual(): Date {
        return new Date();
    }

    /**
     * Los siguientes métodos siguen el mismo patrón.
     * Buscan el estado necesario, filtrando la lista de estados disponibles por su ámbito, y luego por su nombre.
     */
    public buscarEstadoRecibidoEnCMDestino(): Estado {
        return this.estados.filter(e => e.esAmbitoBolsin()).find(e => e.esRecibidoEnCMDestino())!;
    }

    public buscarEstadoRecibidoYAceptado(): Estado {
        return this.estados.filter(e => e.esAmbitoRemito()).find(e => e.esRecibidoYAceptado())!;
    }

    public buscarEstadoRecibidaYAceptada(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esRecibidaYAceptada())!;
    }
    
    public buscarEstadoRegistrada(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esRegistrada())!;
    }

    public buscarEstadoRecibidaYRechazada(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esRecibidaYRechazada())!;
    }

    public buscarEstadoParaRedirigir(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esParaRedirigir())!;
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