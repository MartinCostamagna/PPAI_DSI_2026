import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { Sesion } from "../../../entities/sesion.entity";
import { SesionOrm } from "../../orm-entities/sesion.orm-entity";
import { SesionMapper } from "../../mappers/sesion.mapper";
import { SesionRepository } from "../sesion.repository";

@Injectable()
export class SesionTypeOrmRepository implements SesionRepository {
    constructor(
        @InjectRepository(SesionOrm)
        private readonly repo: Repository<SesionOrm>
    ) {}

    async buscarSesionActiva(): Promise<Sesion | null> {
        const orm = await this.repo.findOne({
            where: { fechaYHoraFin: IsNull() },
            order: { fechaYHoraInicio: 'DESC' },
            relations: { usuario: { empleado: { comisionMedica: true } } },
        });
        return orm ? SesionMapper.toDomain(orm) : null;
    }
}
