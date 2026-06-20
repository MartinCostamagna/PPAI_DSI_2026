import { Injectable, OnModuleInit } from "@nestjs/common";

import { Bolsin } from "../entities/bolsin.entity";
import { Empleado } from "../entities/empleado.entity";
import { Estado } from "../entities/estado.entity";
import { Sesion } from "../entities/sesion.entity";

import { InMemoryRepository } from "../repository/inMemory.repository";

@Injectable()
export class GestorRecepcionBolsin implements OnModuleInit {
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
    private confirmacion: boolean = false;
    private fechaYHoraActual!: Date;

    constructor(private readonly store: InMemoryRepository) {}

    onModuleInit() {
        this.bolsines = this.store.getBolsines();
        this.empleados = this.store.getEmpleados();
        this.estados = this.store.getEstados();
        this.sesion = this.store.getSesion();
    }

    obtenerEmpleadoLog(): void {
        this.empleado = this.sesion.obtenerEmpleadoLog();
    }

    obtenerNombreCMEmpleado() {
        this.nombreCMEmpleado = this.empleado.mostrarCM();
    }

    buscarBolsinesEnviadosParaCM() {
        return this.bolsines.filter(b => b.sosEnviado()).filter(b => b.esTuCMDestino(this.nombreCMEmpleado)).map(b => ({
            nombreCMOrigen: b.mostrarCMOrigen(),
            numeroPrecinto: b.getNumeroPrecinto()
        }));
    }

    tomarSeleccionBolsin(nroPrecinto: number) {
        this.bolsinSeleccionado = this.bolsines.find(b => b.getNumeroPrecinto() === nroPrecinto)!;
        this.buscarNroRemitosYDocumentacion();
    }

    buscarNroRemitosYDocumentacion() {
        return this.bolsinSeleccionado.mostrarRemitos();
    }

    tomarSeleccionOpcRecBolsin(opcion: number) {
        this.opcion = opcion;
    }

    tomarConfirmacion() {
        this.confirmacion = true;
        if (this.confirmacion){
            this.registrarRecepcionBolsin();
        }
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
            case 2:
                mensaje = ""
            case 3:
                mensaje = ""
            case 4:
                mensaje = ""
        }
        this.llamarCUNotificarRecepcionBolsin(mensaje);
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

    llamarCUNotificarRecepcionBolsin(mensaje: string): { mensaje: string } {
        return {mensaje};
    }

    finCU(): {message: string} {
        return {message : "Fin CU"}
    }
}