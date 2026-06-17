import { PartialType } from '@nestjs/mapped-types';
import { CreateComisionMedicaDto } from './create-comision-medica.dto';

export class UpdateComisionMedicaDto extends PartialType(CreateComisionMedicaDto) {}
