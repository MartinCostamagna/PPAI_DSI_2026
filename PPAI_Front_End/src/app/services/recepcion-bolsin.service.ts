import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";
import { Bolsin } from "../interfaces/bolsin.interface";
import { CMYBolsin } from "../interfaces/cm-bolsin.interface";
import { Remito } from "../interfaces/remito.interface";

@Injectable({
    providedIn: 'root'
})
export class RecepcionBolsinService {
    private readonly http = inject(HttpClient);
    private readonly url = "http://localhost:3000/bolsines/recepcion";

    private comisionMedica = signal<string>("");
    private bolsines = signal<Bolsin[]>([]);
    private remitos = signal<Remito[]>([]);
    private bolsinSeleccionado!: Bolsin;
    private mensaje = signal<string>("");

    mostrarCMYBolsines() {   
        return this.http.get<CMYBolsin>(this.url).subscribe(data => {
            this.comisionMedica.set(data.nombreCMEmpleado);
            this.bolsines.set(data.bolsinesInfo);
        });
    }   
    
    tomarSeleccionBolsin(bolsinSeleccionado: Bolsin) {
        this.bolsinSeleccionado = bolsinSeleccionado;
        return this.http.get<Remito[]>(`${this.url}/${bolsinSeleccionado.numeroPrecinto}`)
                        .pipe(tap(data => this.remitos.set(data)));
    }
    
    tomarSeleccionOpcRecBolsin(opcion: number) {
        return this.http.post<void>(this.url, { opcion });
    }

    tomarConfirmacion() {
        return this.http.post<{ mensaje: string }>(`${this.url}/confirmar`, {})
                        .pipe(tap(data => this.mensaje.set(data.mensaje)));
    }

    finCU() {
        return this.http.get<{ mensaje: string }>(`${this.url}/finalizar`);
    }

    getComisionMedica() { return this.comisionMedica; }

    getBolsines() { return this.bolsines; }

    getRemitos() { return this.remitos; }

    getBolsinSeleccionado() { return this.bolsinSeleccionado; }

    getMensajeExito() { return this.mensaje;}
}