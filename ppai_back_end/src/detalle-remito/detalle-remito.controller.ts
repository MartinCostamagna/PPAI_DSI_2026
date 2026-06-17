import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleRemitoService } from './detalle-remito.service';
import { CreateDetalleRemitoDto } from './dto/create-detalle-remito.dto';
import { UpdateDetalleRemitoDto } from './dto/update-detalle-remito.dto';

@Controller('detalle-remito')
export class DetalleRemitoController {
  constructor(private readonly detalleRemitoService: DetalleRemitoService) {}

  @Post()
  create(@Body() createDetalleRemitoDto: CreateDetalleRemitoDto) {
    return this.detalleRemitoService.create(createDetalleRemitoDto);
  }

  @Get()
  findAll() {
    return this.detalleRemitoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleRemitoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleRemitoDto: UpdateDetalleRemitoDto) {
    return this.detalleRemitoService.update(+id, updateDetalleRemitoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleRemitoService.remove(+id);
  }
}
