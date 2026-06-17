import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SesionResolver } from './sesion/sesion.resolver';
import { SesionModule } from './sesion/sesion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { ComisionMedicaModule } from './comision-medica/comision-medica.module';
import { BolsinModule } from './bolsin/bolsin.module';
import { CambioEstadoBolsinModule } from './cambio-estado-bolsin/cambio-estado-bolsin.module';
import { EstadoModule } from './estado/estado.module';
import { RemitoModule } from './remito/remito.module';
import { DetalleRemitoModule } from './detalle-remito/detalle-remito.module';
import { DocumentacionModule } from './documentacion/documentacion.module';
import { TipoDocumentoModule } from './tipo-documento/tipo-documento.module';
import { CambioDeEstadoDocumentacionModule } from './cambio-de-estado-documentacion/cambio-de-estado-documentacion.module';

@Module({
  imports: [SesionModule, UsuarioModule, EmpleadoModule, ComisionMedicaModule, BolsinModule, CambioEstadoBolsinModule, EstadoModule, RemitoModule, DetalleRemitoModule, DocumentacionModule, TipoDocumentoModule, CambioDeEstadoDocumentacionModule],
  controllers: [AppController],
  providers: [AppService, SesionResolver],
})
export class AppModule {}
