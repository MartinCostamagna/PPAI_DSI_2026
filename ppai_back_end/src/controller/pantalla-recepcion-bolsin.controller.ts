import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GestorRecepcionBolsin } from "../service/gestor-recepcion-bolsin.service";
import { RemitoDatos } from "../types/remito-datos.type";

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 * habilitarVentana()
 * mostrarDatosRemitos()
 * tomarSeleccionOpcRecBolsin()
 * tomarConfirmacion()
 * informarEjecucionExitosaCU()
 */
@Controller('bolsines/recepcion')
export class PantallaRecepcionBolsin {
    constructor(
        private readonly gestorRecepcionBolsin: GestorRecepcionBolsin
    ) {}

    // Inicia la recepción y devuelve la CM del empleado y los bolsines que puede elegir.
    @Get()
    habilitarVentana() {
        return this.gestorRecepcionBolsin.nuevaRecepcionBolsin();
    }

    // Devuelve el mensaje de finalización del caso de uso.
    @Get('finalizar')
    informarEjecucionExitosaCU() {
        return this.gestorRecepcionBolsin.finCU();
    }

    /**
     * Se toma el bolsín seleccionado mediante su número de precinto.
     * Luego mostramos los datos esenciales de los remitos.
     */
    @Get(':numeroPrecinto')
    mostrarDatosRemitos(@Param('numeroPrecinto') numeroPrecinto: string): RemitoDatos[] {
        return this.gestorRecepcionBolsin.tomarSeleccionBolsin(+numeroPrecinto);
    }
    
    // Almacenamos la opción elegida por el usuario, para su uso posterior.
    @Post()
    tomarSeleccionOpcRecBolsin(@Body() body: { opcion: string }) {
        this.gestorRecepcionBolsin.tomarSeleccionOpcRecBolsin(+body.opcion);
    }
    
    // Confirma la recepción y devuelve el mensaje correspondiente a la opción elegida.
    @Post('confirmar')
    tomarConfirmacion() {
        return this.gestorRecepcionBolsin.tomarConfirmacion();
    }
}