import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestorRecepcionBolsin } from './service/gestor-recepcion-bolsin.service';
import { PantallaRecepcionBolsin } from './controller/pantalla-recepcion-bolsin.controller';
import { PersistenceModule } from './persistence/persistence.module';
import { databaseConfig } from './persistence/database.config';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { ConsultaModule } from './consulta/consulta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PersistenceModule,
    ConsultaModule,
  ],
  controllers: [PantallaRecepcionBolsin, LoginController],
  providers: [GestorRecepcionBolsin, LoginService],
})
export class AppModule {}
