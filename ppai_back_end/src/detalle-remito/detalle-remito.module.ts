import { Module } from '@nestjs/common';
import { DetalleRemitoService } from './detalle-remito.service';
import { DetalleRemitoController } from './detalle-remito.controller';

@Module({
  controllers: [DetalleRemitoController],
  providers: [DetalleRemitoService],
})
export class DetalleRemitoModule {}
