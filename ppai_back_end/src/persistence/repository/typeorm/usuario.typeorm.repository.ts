import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../../../entities/usuario.entity";
import { UsuarioOrm } from "../../orm-entities/usuario.orm-entity";
import { UsuarioMapper } from "../../mappers/usuario.mapper";
import { UsuarioRepository } from "../usuario.repository";

@Injectable()
export class UsuarioTypeOrmRepository implements UsuarioRepository {
    constructor(
        @InjectRepository(UsuarioOrm)
        private readonly repo: Repository<UsuarioOrm>
    ) {}

    async buscarPorNombre(nombre: string): Promise<Usuario | null> {
        const orm = await this.repo.findOne({
            where: { nombre },
            relations: { empleado: { comisionMedica: true } },
        });
        return orm ? UsuarioMapper.toDomain(orm) : null;
    }
}
