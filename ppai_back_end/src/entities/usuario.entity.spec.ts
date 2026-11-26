import { Usuario } from './usuario.entity';
import { Empleado } from './empleado.entity';
import { ComisionMedica } from './comision-medica.entity';
import { hashearContrasenia } from '../util/contrasenia.util';

describe('Usuario.validarContrasenia', () => {
    const empleado = new Empleado('Juan Pérez', new ComisionMedica('Córdoba'));
    const usuario = new Usuario('jperez', hashearContrasenia('1234'), empleado);

    it('acepta la contraseña correcta', () => {
        expect(usuario.validarContrasenia('1234')).toBe(true);
    });
    it('rechaza una contraseña incorrecta', () => {
        expect(usuario.validarContrasenia('12345')).toBe(false);
    });
    it('rechaza una contraseña vacía', () => {
        expect(usuario.validarContrasenia('')).toBe(false);
    });
});
