import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const LONGITUD_SALT = 16;
const LONGITUD_CLAVE = 64;

// Genera un hash con formato `salt:hash` (ambos en hexadecimal).
export function hashearContrasenia(contrasenia: string): string {
    const salt = randomBytes(LONGITUD_SALT);
    const hash = scryptSync(contrasenia, salt, LONGITUD_CLAVE);
    return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

// Verifica una contraseña contra un hash almacenado. Nunca lanza: formato inválido => false.
export function verificarContrasenia(contrasenia: string, hashAlmacenado: string): boolean {
    try {
        const partes = (hashAlmacenado ?? '').split(':');
        if (partes.length !== 2) return false;
        const [saltHex, hashHex] = partes;
        if (!/^[0-9a-f]+$/i.test(saltHex) || !/^[0-9a-f]+$/i.test(hashHex)) return false;
        const hashEsperado = Buffer.from(hashHex, 'hex');
        if (hashEsperado.length !== LONGITUD_CLAVE) return false;
        const hashCalculado = scryptSync(contrasenia, Buffer.from(saltHex, 'hex'), LONGITUD_CLAVE);
        return timingSafeEqual(hashCalculado, hashEsperado);
    } catch {
        return false;
    }
}
