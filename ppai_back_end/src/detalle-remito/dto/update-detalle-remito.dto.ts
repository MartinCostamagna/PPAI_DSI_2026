import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleRemitoDto } from './create-detalle-remito.dto';

export class UpdateDetalleRemitoDto extends PartialType(CreateDetalleRemitoDto) {}
