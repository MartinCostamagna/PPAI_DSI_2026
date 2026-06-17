import { PartialType } from '@nestjs/mapped-types';
import { CreateBolsinDto } from './create-bolsin.dto';

export class UpdateBolsinDto extends PartialType(CreateBolsinDto) {}
