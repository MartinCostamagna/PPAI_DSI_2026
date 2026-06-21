import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GestorRecepcionBolsin } from "../service/gestor-recepcion-bolsin.service";
import { RemitoDatos } from "../types/remito-datos.type";

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  2. habilitarVentana()
 *  34. mostrarDatosRemitos()
 *  36. tomarSeleccionOpcRecBolsin()
 *  39. tomarConfirmacion()
 *  64. informarEjecucionExitosaCU()
 */
@Controller('bolsines/recepcion')
export class PantallaRecepcionBolsin {
    constructor(
        private readonly gestorRecepcionBolsin: GestorRecepcionBolsin
    ) {}

    /**
     * Comienza en definitiva el flujo del diagrama de secuencia.
     * Se llama al gestor para iniciar una nueva recepción de bolsín.
     * Finalmente, el retorno es la CM y los bolsines a seleccionar.
     */
    @Get()
    habilitarVentana() {
        return this.gestorRecepcionBolsin.nuevaRecepcionBolsin();
    }

    // Método de optención del mensaje de finalización del caso de uso.
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
    
    /**
     * Toma la confirmación del usuario y comienza la ejecución de la recepción.
     * Obtenemos un mensaje como respuesta, resultado de la "llamada" al caso de uso de inclusión correspondiente.
     */
    @Post('confirmar')
    tomarConfirmacion() {
        return this.gestorRecepcionBolsin.tomarConfirmacion();
    }
}