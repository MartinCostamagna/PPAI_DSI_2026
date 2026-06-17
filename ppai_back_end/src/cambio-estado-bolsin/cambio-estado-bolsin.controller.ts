import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CambioEstadoBolsinService } from './cambio-estado-bolsin.service';
import { CreateCambioEstadoBolsinDto } from './dto/create-cambio-estado-bolsin.dto';
import { UpdateCambioEstadoBolsinDto } from './dto/update-cambio-estado-bolsin.dto';

@Controller('cambio-estado-bolsin')
export class CambioEstadoBolsinController {
  constructor(private readonly cambioEstadoBolsinService: CambioEstadoBolsinService) {}

  @Post()
  create(@Body() createCambioEstadoBolsinDto: CreateCambioEstadoBolsinDto) {
    return this.cambioEstadoBolsinService.create(createCambioEstadoBolsinDto);
  }

  @Get()
  findAll() {
    return this.cambioEstadoBolsinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cambioEstadoBolsinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCambioEstadoBolsinDto: UpdateCambioEstadoBolsinDto) {
    return this.cambioEstadoBolsinService.update(+id, updateCambioEstadoBolsinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cambioEstadoBolsinService.remove(+id);
  }
}
