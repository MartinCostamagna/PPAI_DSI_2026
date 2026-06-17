import { PartialType } from '@nestjs/mapped-types';
import { CreateCambioEstadoBolsinDto } from './create-cambio-estado-bolsin.dto';

export class UpdateCambioEstadoBolsinDto extends PartialType(CreateCambioEstadoBolsinDto) {}
