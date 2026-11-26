import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BolsinOrm } from "./orm-entities/bolsin.orm-entity";
import { UsuarioOrm } from "./orm-entities/usuario.orm-entity";
import { SesionOrm } from "./orm-entities/sesion.orm-entity";
import { BOLSIN_REPOSITORY } from "./repository/bolsin.repository";
import { USUARIO_REPOSITORY } from "./repository/usuario.repository";
import { UsuarioTypeOrmRepository } from "./repository/typeorm/usuario.typeorm.repository";
import { SESION_REPOSITORY } from "./repository/sesion.repository";
import { BolsinTypeOrmRepository } from "./repository/typeorm/bolsin.typeorm.repository";
import { SesionTypeOrmRepository } from "./repository/typeorm/sesion.typeorm.repository";

@Module({
    imports: [TypeOrmModule.forFeature([BolsinOrm, SesionOrm, UsuarioOrm])],
    providers: [
        { provide: BOLSIN_REPOSITORY, useClass: BolsinTypeOrmRepository },
        { provide: SESION_REPOSITORY, useClass: SesionTypeOrmRepository },
        { provide: USUARIO_REPOSITORY, useClass: UsuarioTypeOrmRepository },
    ],
    exports: [BOLSIN_REPOSITORY, SESION_REPOSITORY, USUARIO_REPOSITORY],
})
export class PersistenceModule {}
