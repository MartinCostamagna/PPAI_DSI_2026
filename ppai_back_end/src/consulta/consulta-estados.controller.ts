import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConsultaEstadosService } from './consulta-estados.service';
import { BolsinDetalleDto, BolsinResumenDto } from './consulta-estados.types';

@Controller('consulta')
export class ConsultaEstadosController {
    constructor(private readonly servicio: ConsultaEstadosService) {}

    @Get('bolsines')
    listarBolsines(): Promise<BolsinResumenDto[]> {
        return this.servicio.listarBolsines();
    }

    @Get('bolsines/:numeroPrecinto')
    obtenerDetalle(@Param('numeroPrecinto', ParseIntPipe) numeroPrecinto: number): Promise<BolsinDetalleDto> {
        return this.servicio.obtenerDetalle(numeroPrecinto);
    }
}
