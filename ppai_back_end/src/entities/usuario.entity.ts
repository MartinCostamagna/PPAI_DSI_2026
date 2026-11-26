import { Empleado } from "./empleado.entity";
import { verificarContrasenia } from "../util/contrasenia.util";

export class Usuario {
    private nombre: string;
    private hashContrasenia: string; 
    private empleado: Empleado;
    
    constructor(nombre: string, hashContrasenia: string, empleado: Empleado) {
        this.nombre = nombre;
        this.hashContrasenia = hashContrasenia;
        this.empleado = empleado;
    }

    public obtenerEmpleado(): Empleado {
        return this.empleado;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getHashContrasenia(): string {
        return this.hashContrasenia;
    }

    public validarContrasenia(contrasenia: string): boolean {
        return verificarContrasenia(contrasenia, this.hashContrasenia);
    }
}
