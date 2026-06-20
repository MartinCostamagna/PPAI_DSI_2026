import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GestorRecepcionBolsin } from "src/service/gestor-recepcion-bolsin.service";

@Controller('bolsines/recepcion')
export class PantallaRecepcionBolsin {   
    private nombreCMEmpleado!: string;
    
    constructor(
        private readonly gestorRecepcionBolsin: GestorRecepcionBolsin,
    ) {}

    @Get()
    habilitarVentana(){
        return this.gestorRecepcionBolsin.nuevaRecepcionBolsin();
    }

    @Get('finalizar')
    finCU(){
        return this.gestorRecepcionBolsin.finCU();
    }

    @Get(':numeroPrecinto')
    mostrarDatosRemitos(@Param('numeroPrecinto') numeroPrecinto: string){
        return this.gestorRecepcionBolsin.tomarSeleccionBolsin(+numeroPrecinto);
    }

    @Post()
    tomarSeleccionOpcRecBolsin(@Body() body: {opcion: string}){
        this.gestorRecepcionBolsin.tomarSeleccionOpcRecBolsin(+body.opcion);
    }

    @Post('confirmar')
    tomarConfirmacion(){
        return this.gestorRecepcionBolsin.tomarConfirmacion();
    }
}