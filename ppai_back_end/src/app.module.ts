import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorRecepcionBolsin } from './service/gestor-recepcion-bolsin.service';
import { PantallaRecepcionBolsin } from './controller/pantalla-recepcion-bolsin.controller';
import { PersistenceModule } from './persistence/persistence.module';
import { databaseConfig } from './persistence/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PersistenceModule,
  ],
  controllers: [PantallaRecepcionBolsin],
  providers: [GestorRecepcionBolsin],
})
export class AppModule {}
