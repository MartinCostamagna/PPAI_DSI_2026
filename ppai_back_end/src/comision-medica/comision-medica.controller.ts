import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComisionMedicaService } from './comision-medica.service';
import { CreateComisionMedicaDto } from './dto/create-comision-medica.dto';
import { UpdateComisionMedicaDto } from './dto/update-comision-medica.dto';

@Controller('comision-medica')
export class ComisionMedicaController {
  constructor(private readonly comisionMedicaService: ComisionMedicaService) {}

  @Post()
  create(@Body() createComisionMedicaDto: CreateComisionMedicaDto) {
    return this.comisionMedicaService.create(createComisionMedicaDto);
  }

  @Get()
  findAll() {
    return this.comisionMedicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comisionMedicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComisionMedicaDto: UpdateComisionMedicaDto) {
    return this.comisionMedicaService.update(+id, updateComisionMedicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comisionMedicaService.remove(+id);
  }
}
