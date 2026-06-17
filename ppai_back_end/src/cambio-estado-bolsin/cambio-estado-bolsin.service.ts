import { Injectable } from '@nestjs/common';
import { CreateCambioEstadoBolsinDto } from './dto/create-cambio-estado-bolsin.dto';
import { UpdateCambioEstadoBolsinDto } from './dto/update-cambio-estado-bolsin.dto';

@Injectable()
export class CambioEstadoBolsinService {
  create(createCambioEstadoBolsinDto: CreateCambioEstadoBolsinDto) {
    return 'This action adds a new cambioEstadoBolsin';
  }

  findAll() {
    return `This action returns all cambioEstadoBolsin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cambioEstadoBolsin`;
  }

  update(id: number, updateCambioEstadoBolsinDto: UpdateCambioEstadoBolsinDto) {
    return `This action updates a #${id} cambioEstadoBolsin`;
  }

  remove(id: number) {
    return `This action removes a #${id} cambioEstadoBolsin`;
  }
}
