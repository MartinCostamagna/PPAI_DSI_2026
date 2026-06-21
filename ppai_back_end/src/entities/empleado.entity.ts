import { ComisionMedica } from "./comision-medica.entity";

export class Empleado {
    private nombre: string;
    private comisionMedica: ComisionMedica;

    constructor(nombre: string, comisionMedica: ComisionMedica) {
        this.nombre = nombre;
        this.comisionMedica = comisionMedica;
    }

    // Obtiene únicamente el nombre de la comisión médica asociada.
    public mostrarCM(): string {
        return this.comisionMedica.getNombre();
    }
}