import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { BolsinOrm } from '../persistence/orm-entities/bolsin.orm-entity';
import { PersistenceModule } from '../persistence/persistence.module';
import { ConsultaEstadosController } from './consulta-estados.controller';
import { BOLSIN_ORM_REPOSITORY, ConsultaEstadosService } from './consulta-estados.service';

@Module({
    imports: [TypeOrmModule.forFeature([BolsinOrm]), PersistenceModule],
    controllers: [ConsultaEstadosController],
    providers: [
        ConsultaEstadosService,
        { provide: BOLSIN_ORM_REPOSITORY, useExisting: getRepositoryToken(BolsinOrm) },
    ],
})
export class ConsultaModule {}
