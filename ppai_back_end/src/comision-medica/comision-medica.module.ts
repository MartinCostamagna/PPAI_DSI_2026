import { Module } from '@nestjs/common';
import { ComisionMedicaService } from './comision-medica.service';
import { ComisionMedicaController } from './comision-medica.controller';

@Module({
  controllers: [ComisionMedicaController],
  providers: [ComisionMedicaService],
})
export class ComisionMedicaModule {}
