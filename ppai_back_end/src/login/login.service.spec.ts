import { UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { Usuario } from '../entities/usuario.entity';
import { Sesion } from '../entities/sesion.entity';
import { Empleado } from '../entities/empleado.entity';
import { ComisionMedica } from '../entities/comision-medica.entity';
import { hashearContrasenia } from '../util/contrasenia.util';

describe('LoginService', () => {
    const crearUsuario = () =>
        new Usuario(
            'jperez',
            hashearContrasenia('secreta'),
            new Empleado('Juan Pérez', new ComisionMedica('CM Córdoba'))
        );

    let usuarioRepo: { buscarPorNombre: jest.Mock };
    let sesionRepo: {
        buscarSesionActiva: jest.Mock;
        iniciarSesion: jest.Mock;
        cerrarSesionActiva: jest.Mock;
    };
    let servicio: LoginService;

    beforeEach(() => {
        usuarioRepo = { buscarPorNombre: jest.fn() };
        sesionRepo = {
            buscarSesionActiva: jest.fn(),
            iniciarSesion: jest.fn().mockResolvedValue(undefined),
            cerrarSesionActiva: jest.fn().mockResolvedValue(undefined),
        };
        servicio = new LoginService(usuarioRepo as any, sesionRepo as any);
    });

    it('con credenciales válidas devuelve los datos de sesión e inicia sesión', async () => {
        usuarioRepo.buscarPorNombre.mockResolvedValue(crearUsuario());
        await expect(servicio.iniciarSesion('jperez', 'secreta')).resolves.toEqual({
            nombreUsuario: 'jperez',
            nombreEmpleado: 'Juan Pérez',
            nombreCM: 'CM Córdoba',
        });
        expect(sesionRepo.iniciarSesion).toHaveBeenCalledWith('jperez', expect.any(Date));
    });

    it('con usuario inexistente lanza UnauthorizedException', async () => {
        usuarioRepo.buscarPorNombre.mockResolvedValue(null);
        await expect(servicio.iniciarSesion('nadie', 'x')).rejects.toThrow(UnauthorizedException);
        expect(sesionRepo.iniciarSesion).not.toHaveBeenCalled();
    });

    it('con contraseña incorrecta lanza UnauthorizedException', async () => {
        usuarioRepo.buscarPorNombre.mockResolvedValue(crearUsuario());
        await expect(servicio.iniciarSesion('jperez', 'mala')).rejects.toThrow(UnauthorizedException);
        expect(sesionRepo.iniciarSesion).not.toHaveBeenCalled();
    });

    it.each([
        [undefined, 'secreta'],
        ['', 'secreta'],
        ['jperez', undefined],
        ['jperez', ''],
        [123, 'secreta'],
    ])('con usuario/contraseña faltante (%p, %p) lanza UnauthorizedException sin consultar el repositorio', async (u, c) => {
        await expect(servicio.iniciarSesion(u as any, c as any)).rejects.toThrow(UnauthorizedException);
        expect(usuarioRepo.buscarPorNombre).not.toHaveBeenCalled();
        expect(sesionRepo.iniciarSesion).not.toHaveBeenCalled();
    });

    it('obtenerSesionActual sin sesión lanza UnauthorizedException', async () => {
        sesionRepo.buscarSesionActiva.mockResolvedValue(null);
        await expect(servicio.obtenerSesionActual()).rejects.toThrow(UnauthorizedException);
    });

    it('obtenerSesionActual con sesión devuelve los datos', async () => {
        sesionRepo.buscarSesionActiva.mockResolvedValue(new Sesion(crearUsuario(), new Date()));
        await expect(servicio.obtenerSesionActual()).resolves.toEqual({
            nombreUsuario: 'jperez',
            nombreEmpleado: 'Juan Pérez',
            nombreCM: 'CM Córdoba',
        });
    });

    it('cerrarSesion cierra la sesión activa', async () => {
        await servicio.cerrarSesion();
        expect(sesionRepo.cerrarSesionActiva).toHaveBeenCalledWith(expect.any(Date));
    });
});
