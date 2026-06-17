import { Injectable } from '@nestjs/common';
import { CreateDetalleRemitoDto } from './dto/create-detalle-remito.dto';
import { UpdateDetalleRemitoDto } from './dto/update-detalle-remito.dto';

@Injectable()
export class DetalleRemitoService {
  create(createDetalleRemitoDto: CreateDetalleRemitoDto) {
    return 'This action adds a new detalleRemito';
  }

  findAll() {
    return `This action returns all detalleRemito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleRemito`;
  }

  update(id: number, updateDetalleRemitoDto: UpdateDetalleRemitoDto) {
    return `This action updates a #${id} detalleRemito`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleRemito`;
  }
}
