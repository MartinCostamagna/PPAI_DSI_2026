import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BolsinService } from './bolsin.service';
import { CreateBolsinDto } from './dto/create-bolsin.dto';
import { UpdateBolsinDto } from './dto/update-bolsin.dto';

@Controller('bolsin')
export class BolsinController {
  constructor(private readonly bolsinService: BolsinService) {}

  @Post()
  create(@Body() createBolsinDto: CreateBolsinDto) {
    return this.bolsinService.create(createBolsinDto);
  }

  @Get()
  findAll() {
    return this.bolsinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bolsinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBolsinDto: UpdateBolsinDto) {
    return this.bolsinService.update(+id, updateBolsinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bolsinService.remove(+id);
  }
}
