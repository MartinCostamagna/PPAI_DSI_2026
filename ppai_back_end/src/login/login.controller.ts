import { Body, Controller, Get, Post } from '@nestjs/common';
import { type DatosSesion, LoginService } from './login.service';

@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('login')
    login(@Body() body: { usuario: string; contrasena: string }): Promise<DatosSesion> {
        return this.loginService.iniciarSesion(body.usuario, body.contrasena);
    }

    @Post('logout')
    logout(): Promise<void> {
        return this.loginService.cerrarSesion();
    }

    @Get('sesion')
    sesion(): Promise<DatosSesion> {
        return this.loginService.obtenerSesionActual();
    }
}
