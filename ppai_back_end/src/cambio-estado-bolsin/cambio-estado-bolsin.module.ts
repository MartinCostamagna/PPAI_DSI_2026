import { Module } from '@nestjs/common';
import { CambioEstadoBolsinService } from './cambio-estado-bolsin.service';
import { CambioEstadoBolsinController } from './cambio-estado-bolsin.controller';

@Module({
  controllers: [CambioEstadoBolsinController],
  providers: [CambioEstadoBolsinService],
})
export class CambioEstadoBolsinModule {}
