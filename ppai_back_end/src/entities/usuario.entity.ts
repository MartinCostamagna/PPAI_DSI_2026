import { Empleado } from "./empleado.entity";




export class Usuario {
    private nombre: string;
    private hashContrasenia: string; 
    private empleado: Empleado;
    
    constructor (nombre: string, hashContrasenia: string, empleado: Empleado){
        this.nombre = nombre;
        this.hashContrasenia = hashContrasenia;
        this.empleado = empleado;
    }

    public obtenerEmpleado(): Empleado {
        return this.empleado;
    }
}