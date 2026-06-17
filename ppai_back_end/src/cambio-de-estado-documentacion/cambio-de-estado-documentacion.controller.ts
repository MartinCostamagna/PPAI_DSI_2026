import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CambioDeEstadoDocumentacionService } from './cambio-de-estado-documentacion.service';
import { CreateCambioDeEstadoDocumentacionDto } from './dto/create-cambio-de-estado-documentacion.dto';
import { UpdateCambioDeEstadoDocumentacionDto } from './dto/update-cambio-de-estado-documentacion.dto';

@Controller('cambio-de-estado-documentacion')
export class CambioDeEstadoDocumentacionController {
  constructor(private readonly cambioDeEstadoDocumentacionService: CambioDeEstadoDocumentacionService) {}

  @Post()
  create(@Body() createCambioDeEstadoDocumentacionDto: CreateCambioDeEstadoDocumentacionDto) {
    return this.cambioDeEstadoDocumentacionService.create(createCambioDeEstadoDocumentacionDto);
  }

  @Get()
  findAll() {
    return this.cambioDeEstadoDocumentacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cambioDeEstadoDocumentacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCambioDeEstadoDocumentacionDto: UpdateCambioDeEstadoDocumentacionDto) {
    return this.cambioDeEstadoDocumentacionService.update(+id, updateCambioDeEstadoDocumentacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cambioDeEstadoDocumentacionService.remove(+id);
  }
}
