import { Module } from '@nestjs/common';
import { CambioDeEstadoDocumentacionService } from './cambio-de-estado-documentacion.service';
import { CambioDeEstadoDocumentacionController } from './cambio-de-estado-documentacion.controller';

@Module({
  controllers: [CambioDeEstadoDocumentacionController],
  providers: [CambioDeEstadoDocumentacionService],
})
export class CambioDeEstadoDocumentacionModule {}
