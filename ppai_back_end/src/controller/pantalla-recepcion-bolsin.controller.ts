import { Controller, Get } from "@nestjs/common";
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

}