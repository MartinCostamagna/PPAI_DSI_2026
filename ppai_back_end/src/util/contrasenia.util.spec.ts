import { hashearContrasenia, verificarContrasenia } from './contrasenia.util';

describe('contrasenia.util', () => {
    it('hashea sin exponer la contraseña en claro y con formato salt:hash', () => {
        const h = hashearContrasenia('1234');
        expect(h).not.toContain('1234');
        expect(h).toMatch(/^[0-9a-f]{32}:[0-9a-f]{128}$/);
    });

    it('dos hashes de la misma contraseña son distintos (salt)', () => {
        expect(hashearContrasenia('1234')).not.toBe(hashearContrasenia('1234'));
    });

    it('verifica contraseñas correctas e incorrectas', () => {
        const h = hashearContrasenia('1234');
        expect(verificarContrasenia('1234', h)).toBe(true);
        expect(verificarContrasenia('12345', h)).toBe(false);
    });

    it('devuelve false ante un hash malformado sin lanzar', () => {
        expect(verificarContrasenia('1234', 'abc')).toBe(false);
    });
});
