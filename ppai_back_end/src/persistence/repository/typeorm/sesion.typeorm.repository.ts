import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { Sesion } from "../../../entities/sesion.entity";
import { UsuarioOrm } from "../../orm-entities/usuario.orm-entity";
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

    // Cierra todas las sesiones abiertas e inserta una nueva para el usuario, en una transacción.
    async iniciarSesion(nombreUsuario: string, fechaYHoraInicio: Date): Promise<void> {
        await this.repo.manager.transaction(async (manager) => {
            const usuario = await manager.findOne(UsuarioOrm, { where: { nombre: nombreUsuario } });
            if (!usuario) {
                throw new Error(`No existe el usuario ${nombreUsuario}`);
            }
            await manager.update(
                SesionOrm,
                { fechaYHoraFin: IsNull() },
                { fechaYHoraFin: fechaYHoraInicio }
            );
            const sesion = manager.create(SesionOrm, {
                fechaYHoraInicio,
                fechaYHoraFin: null,
                usuarioId: usuario.id,
            });
            await manager.save(sesion);
        });
    }

    async cerrarSesionActiva(fechaYHoraFin: Date): Promise<void> {
        await this.repo.update({ fechaYHoraFin: IsNull() }, { fechaYHoraFin });
    }
}
