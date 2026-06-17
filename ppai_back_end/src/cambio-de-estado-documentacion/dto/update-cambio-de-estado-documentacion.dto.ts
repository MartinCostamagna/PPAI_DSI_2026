import { PartialType } from '@nestjs/mapped-types';
import { CreateCambioDeEstadoDocumentacionDto } from './create-cambio-de-estado-documentacion.dto';

export class UpdateCambioDeEstadoDocumentacionDto extends PartialType(CreateCambioDeEstadoDocumentacionDto) {}
