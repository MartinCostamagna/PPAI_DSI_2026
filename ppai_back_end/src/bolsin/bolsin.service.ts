import { Injectable } from '@nestjs/common';
import { CreateBolsinDto } from './dto/create-bolsin.dto';
import { UpdateBolsinDto } from './dto/update-bolsin.dto';

@Injectable()
export class BolsinService {
  create(createBolsinDto: CreateBolsinDto) {
    return 'This action adds a new bolsin';
  }

  findAll() {
    return `This action returns all bolsin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bolsin`;
  }

  update(id: number, updateBolsinDto: UpdateBolsinDto) {
    return `This action updates a #${id} bolsin`;
  }

  remove(id: number) {
    return `This action removes a #${id} bolsin`;
  }
}
