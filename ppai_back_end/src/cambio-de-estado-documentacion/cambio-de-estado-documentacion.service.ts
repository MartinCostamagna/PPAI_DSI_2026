import { Injectable } from '@nestjs/common';
import { CreateCambioDeEstadoDocumentacionDto } from './dto/create-cambio-de-estado-documentacion.dto';
import { UpdateCambioDeEstadoDocumentacionDto } from './dto/update-cambio-de-estado-documentacion.dto';

@Injectable()
export class CambioDeEstadoDocumentacionService {
  create(createCambioDeEstadoDocumentacionDto: CreateCambioDeEstadoDocumentacionDto) {
    return 'This action adds a new cambioDeEstadoDocumentacion';
  }

  findAll() {
    return `This action returns all cambioDeEstadoDocumentacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cambioDeEstadoDocumentacion`;
  }

  update(id: number, updateCambioDeEstadoDocumentacionDto: UpdateCambioDeEstadoDocumentacionDto) {
    return `This action updates a #${id} cambioDeEstadoDocumentacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} cambioDeEstadoDocumentacion`;
  }
}
