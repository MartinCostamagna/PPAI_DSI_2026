import { Injectable } from '@nestjs/common';
import { CreateComisionMedicaDto } from './dto/create-comision-medica.dto';
import { UpdateComisionMedicaDto } from './dto/update-comision-medica.dto';

@Injectable()
export class ComisionMedicaService {
  create(createComisionMedicaDto: CreateComisionMedicaDto) {
    return 'This action adds a new comisionMedica';
  }

  findAll() {
    return `This action returns all comisionMedica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comisionMedica`;
  }

  update(id: number, updateComisionMedicaDto: UpdateComisionMedicaDto) {
    return `This action updates a #${id} comisionMedica`;
  }

  remove(id: number) {
    return `This action removes a #${id} comisionMedica`;
  }
}
