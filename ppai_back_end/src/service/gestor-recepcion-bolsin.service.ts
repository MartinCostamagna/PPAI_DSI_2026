import { Injectable, OnModuleInit } from "@nestjs/common";

import { Bolsin } from "../entities/bolsin.entity";
import { Empleado } from "../entities/empleado.entity";
import { Estado } from "../entities/estado.entity";
import { Sesion } from "../entities/sesion.entity";

import { InMemoryRepository } from "../repository/inMemory.repository";

@Injectable()
export class GestorRecepcionBolsin {
    private bolsines!: Bolsin[];
    private empleados!: Empleado[];
    private estados!: Estado[];
    private sesion!: Sesion;
    private opcion!: number;
    private nombreCMEmpleado!: string;
    private empleado!: Empleado;
    private bolsinSeleccionado!: Bolsin;
    private estadoRecibidoEnCMDestino!: Estado;
    private estadoRecibidoYAceptado!: Estado;
    private estadoRecibidaYAceptada!: Estado;
    private fechaYHoraActual!: Date;
    private estadoRegistrada!: Estado;
    private estadoRecibidaYRechazada!: Estado;
    private estadoParaRedirigir!: Estado;
    
    constructor(private readonly store: InMemoryRepository) {}

    nuevaRecepcionBolsin() {
        this.bolsines = this.store.getBolsines();
        this.empleados = this.store.getEmpleados();
        this.estados = this.store.getEstados();
        this.sesion = this.store.getSesion();
        this.obtenerEmpleadoLog();
        return {
            nombreCMEmpleado: this.obtenerNombreCMEmpleado(),
            bolsinesInfo: this.buscarBolsinesEnviadosParaCM()
        } 
    }

    obtenerEmpleadoLog(): void {
        this.empleado = this.sesion.obtenerEmpleadoLog();
        }

    obtenerNombreCMEmpleado() {
        this.nombreCMEmpleado = this.empleado.mostrarCM();
        return this.nombreCMEmpleado;
    }

    buscarBolsinesEnviadosParaCM() {
        return this.bolsines.filter(b => b.sosEnviado()).filter(b => b.esTuCMDestino(this.nombreCMEmpleado)).map(b => ({
            nombreCMOrigen: b.mostrarCMOrigen(),
            numeroPrecinto: b.getNumeroPrecinto()
        }));
    }

    tomarSeleccionBolsin(nroPrecinto: number) {
        this.bolsinSeleccionado = this.bolsines.find(b => b.getNumeroPrecinto() === nroPrecinto)!;
        return this.buscarNroRemitosYDocumentacion();
    }

    buscarNroRemitosYDocumentacion() {
        return this.bolsinSeleccionado.mostrarRemitos();
    }

    tomarSeleccionOpcRecBolsin(opcion: number) {
        this.opcion = opcion;
    }

    tomarConfirmacion() {
        return this.registrarRecepcionBolsin();
    }

    registrarRecepcionBolsin() {
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
                )
                break
            case 2:
            //skip por ahora falta saber estado remito
                mensaje = "Documentacion faltante"
                this.estadoRegistrada = this.buscarEstadoRegistrada();
                break
            case 3:
                mensaje = `Documentacion no corresponde a la CM destino ${this.nombreCMEmpleado}`
                this.estadoRecibidaYRechazada = this.buscarEstadoRecibidaYRechazada();
                //estado remito buscar cuando sepamos
                this.bolsinSeleccionado.registrarRecepcion(
                    this.fechaYHoraActual,
                    this.estadoRecibidoEnCMDestino, 
                    this.estadoRecibidaYAceptada,// cambiar, no sabemos va el estado remito cuando sepamos, 
                    this.estadoRecibidaYRechazada,
                    this.empleado
                )
                break
            case 4:
                mensaje = "Documentación para redirigir a otra área"
                this.estadoParaRedirigir = this.buscarEstadoParaRedirigir();
                //estado remito buscar cuando sepamos
                this.bolsinSeleccionado.registrarRecepcion(
                    this.fechaYHoraActual,
                    this.estadoRecibidoEnCMDestino, 
                    this.estadoRecibidaYRechazada, // cambiar, no sabemos va el estado remito cuando sepamos,
                    this.estadoParaRedirigir, 
                    this.empleado
                )
                break
        }
        return this.llamarCUNotificarRecepcionBolsin(mensaje);
    }

    tomarFechaYHoraActual(): Date {
        return new Date();
    }

    buscarEstadoRecibidoEnCMDestino(): Estado {
        return this.estados.filter(e => e.esAmbitoBolsin()).find(e => e.esRecibidoEnCMDestino())!;
    }

    buscarEstadoRecibidoYAceptado(): Estado {
        return this.estados.filter(e => e.esAmbitoRemito()).find(e => e.esRecibidoYAceptado())!;
    }

    buscarEstadoRecibidaYAceptada(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esRecibidaYAceptada())!;
    }
    
    buscarEstadoRegistrada(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esRegistrada())!;
    }

    buscarEstadoRecibidaYRechazada(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esRecibidaYRechazada())!;
    }

    buscarEstadoParaRedirigir(): Estado {
        return this.estados.filter(e => e.esAmbitoDocumentacion()).find(e => e.esParaRedirigir())!;
    }

    llamarCUNotificarRecepcionBolsin(mensaje: string): { mensaje: string } {
        return {mensaje};
    }

    finCU(): {mensaje: string} {
        return {mensaje : "Fin CU"}
    }
}