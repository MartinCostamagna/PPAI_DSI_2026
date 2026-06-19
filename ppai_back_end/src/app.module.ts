import { Module } from '@nestjs/common';
import { GestorRecepcionBolsin } from './service/gestor-recepcion-bolsin.service';
import { InMemoryRepository } from './repository/inMemory.repository';
import { PantallaRecepcionBolsin } from './controller/pantalla-recepcion-bolsin.controller';

@Module({
  imports: [],
  controllers: [PantallaRecepcionBolsin],
  providers: [GestorRecepcionBolsin, InMemoryRepository],
  
})
export class AppModule {}
