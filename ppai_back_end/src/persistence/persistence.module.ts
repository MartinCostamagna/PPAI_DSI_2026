import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BolsinOrm } from "./orm-entities/bolsin.orm-entity";
import { SesionOrm } from "./orm-entities/sesion.orm-entity";
import { BOLSIN_REPOSITORY } from "./repository/bolsin.repository";
import { SESION_REPOSITORY } from "./repository/sesion.repository";
import { BolsinTypeOrmRepository } from "./repository/typeorm/bolsin.typeorm.repository";
import { SesionTypeOrmRepository } from "./repository/typeorm/sesion.typeorm.repository";

@Module({
    imports: [TypeOrmModule.forFeature([BolsinOrm, SesionOrm])],
    providers: [
        { provide: BOLSIN_REPOSITORY, useClass: BolsinTypeOrmRepository },
        { provide: SESION_REPOSITORY, useClass: SesionTypeOrmRepository },
    ],
    exports: [BOLSIN_REPOSITORY, SESION_REPOSITORY],
})
export class PersistenceModule {}
