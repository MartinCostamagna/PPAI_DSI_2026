import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";
import { Bolsin } from "../interfaces/bolsin.interface";
import { CMYBolsin } from "../interfaces/cm-bolsin.interface";
import { Remito } from "../interfaces/remito.interface";

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  10. mostrarCMUsuarioLog()
 *  21. mostrarBolsinesPSeleccion()
 *  { la funcionalidad de ambos se resume en @method mostrarCMYBolsines() }
 *  22. tomarSeleccionBolsin()
 *  36. tomarSeleccionOpcRecBolsin()
 *  39. tomarConfirmacion()
 *  64. informarEjecucionExitosaCU()
 *  
 */
@Injectable({ providedIn: 'root' })
export class RecepcionBolsinService {
    private readonly http = inject(HttpClient);
    private readonly url = "http://localhost:3000/bolsines/recepcion";

    private comisionMedica = signal<string>("");
    private bolsines = signal<Bolsin[]>([]);
    private remitos = signal<Remito[]>([]);
    private bolsinSeleccionado!: Bolsin;
    private mensaje = signal<string>("");

    /**
     * Muestra la CM del usuario logueado y los bolsines para seleccionar.
     * Esto mediante la llamada http al controlador del backend.
     */
    mostrarCMYBolsines() {   
        return this.http.get<CMYBolsin>(this.url).subscribe(data => {
            this.comisionMedica.set(data.nombreCMEmpleado);
            this.bolsines.set(data.bolsinesInfo);
        });
    }   
    
    /**
     * Mandamos el número de precinto del bolsín seleccionado al backend.
     * Este lo utilizará para identificar la instancia de Bolsin elegida.
     * Obtenemos información esencial de cada remito, se especifica en `src/app/interfaces/bolsin.interface.ts`
     */
    tomarSeleccionBolsin(bolsinSeleccionado: Bolsin) {
        this.bolsinSeleccionado = bolsinSeleccionado;
        return this.http.get<Remito[]>(`${this.url}/${bolsinSeleccionado.numeroPrecinto}`)
                        .pipe(tap(data => this.remitos.set(data)));
    }
    
    // Mandamos al backend la opción elegida por el usuario, para actuar acorde a la misma.
    tomarSeleccionOpcRecBolsin(opcion: number) {
        return this.http.post<void>(this.url, { opcion });
    }

    // Continúa el flujo de confirmación para comunicarse con el backend.
    tomarConfirmacion() {
        return this.http.post<{ mensaje: string }>(`${this.url}/confirmar`, {})
                        .pipe(tap(data => this.mensaje.set(data.mensaje)));
    }

    // Obtenemos el mensaje de éxito del backend.
    informarEjecucionExitosaCU() {
        return this.http.get<{ mensaje: string }>(`${this.url}/finalizar`);
    }

    getComisionMedica() { return this.comisionMedica; }

    getBolsines() { return this.bolsines; }

    getRemitos() { return this.remitos; }

    getBolsinSeleccionado() { return this.bolsinSeleccionado; }

    getMensajeExito() { return this.mensaje;}
}