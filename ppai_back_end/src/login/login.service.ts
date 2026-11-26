import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USUARIO_REPOSITORY, type UsuarioRepository } from '../persistence/repository/usuario.repository';
import { SESION_REPOSITORY, type SesionRepository } from '../persistence/repository/sesion.repository';
import { Usuario } from '../entities/usuario.entity';

export type DatosSesion = {
    nombreUsuario: string;
    nombreEmpleado: string;
    nombreCM: string;
};

@Injectable()
export class LoginService {
    constructor(
        @Inject(USUARIO_REPOSITORY) private readonly usuarioRepo: UsuarioRepository,
        @Inject(SESION_REPOSITORY) private readonly sesionRepo: SesionRepository
    ) {}

    // Valida las credenciales y, si son correctas, inicia una nueva sesión.
    async iniciarSesion(usuario: string, contrasena: string): Promise<DatosSesion> {
        // Se rechazan datos faltantes antes de consultar el repositorio.
        if (typeof usuario !== 'string' || usuario === '' || typeof contrasena !== 'string' || contrasena === '') {
            throw new UnauthorizedException('Usuario o contraseña incorrectos');
        }
        const encontrado = await this.usuarioRepo.buscarPorNombre(usuario);
        if (!encontrado || !encontrado.validarContrasenia(contrasena)) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos');
        }
        await this.sesionRepo.iniciarSesion(encontrado.getNombre(), new Date());
        return this.armarDatosSesion(encontrado);
    }

    async cerrarSesion(): Promise<void> {
        await this.sesionRepo.cerrarSesionActiva(new Date());
    }

    async obtenerSesionActual(): Promise<DatosSesion> {
        const sesion = await this.sesionRepo.buscarSesionActiva();
        if (!sesion) {
            throw new UnauthorizedException('No hay una sesión activa');
        }
        return this.armarDatosSesion(sesion.getUsuario());
    }

    private armarDatosSesion(usuario: Usuario): DatosSesion {
        const empleado = usuario.obtenerEmpleado();
        return {
            nombreUsuario: usuario.getNombre(),
            nombreEmpleado: empleado.getNombre(),
            nombreCM: empleado.mostrarCM(),
        };
    }
}
