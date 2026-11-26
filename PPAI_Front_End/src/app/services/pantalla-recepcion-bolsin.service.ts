import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, finalize, tap, throwError } from "rxjs";
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
 */
@Injectable({ providedIn: 'root' })
export class PantallaRecepcionBolsin {
    private readonly http = inject(HttpClient);
    private readonly url = "http://localhost:3000/bolsines/recepcion";

    private comisionMedica = signal<string>("");
    private bolsines = signal<Bolsin[]>([]);
    private remitos = signal<Remito[]>([]);
    private bolsinSeleccionado!: Bolsin;
    private mensaje = signal<string>("");

    private cargando = signal<boolean>(false);
    private error = signal<string | null>(null);
    private usuarioFicticio = signal<string>("Encargado de Bolsines");

    /**
     * Muestra la CM del usuario logueado y los bolsines para seleccionar.
     * Esto mediante la llamada http al controlador del backend.
     */
    mostrarCMYBolsines() {
        this.cargando.set(true);
        this.error.set(null);

        return this.http.get<CMYBolsin>(this.url).pipe(
            finalize(() => this.cargando.set(false))
        ).subscribe({
            next: (data) => {
                this.comisionMedica.set(data.nombreCMEmpleado);
                this.bolsines.set(data.bolsinesInfo);
            },
            error: () => {
                this.error.set("No se pudo conectar con el servidor de Comisiones Médicas. Verificá que el backend esté iniciado en el puerto 3000.");
            }
        });
    }

    /**
     * Mandamos el número de precinto del bolsín seleccionado al backend.
     * Este lo utilizará para identificar la instancia de Bolsin elegida.
     * Obtenemos información esencial de cada remito, se especifica en `src/app/interfaces/bolsin.interface.ts`
     */
    tomarSeleccionBolsin(bolsinSeleccionado: Bolsin) {
        this.bolsinSeleccionado = bolsinSeleccionado;
        this.cargando.set(true);
        this.error.set(null);

        return this.http.get<Remito[]>(`${this.url}/${bolsinSeleccionado.numeroPrecinto}`).pipe(
            tap(data => this.remitos.set(data)),
            catchError(err => {
                this.error.set("No se pudieron cargar los remitos del bolsín seleccionado.");
                return throwError(() => err);
            }),
            finalize(() => this.cargando.set(false))
        );
    }

    // Mandamos al backend la opción elegida por el usuario, para actuar acorde a la misma.
    tomarSeleccionOpcRecBolsin(opcion: number) {
        this.cargando.set(true);
        this.error.set(null);

        return this.http.post<void>(this.url, { opcion }).pipe(
            catchError(err => {
                this.error.set("Ocurrió un error al registrar la opción seleccionada.");
                return throwError(() => err);
            }),
            finalize(() => this.cargando.set(false))
        );
    }

    // Continúa el flujo de confirmación para comunicarse con el backend.
    tomarConfirmacion() {
        this.cargando.set(true);
        this.error.set(null);

        return this.http.post<{ mensaje: string }>(`${this.url}/confirmar`, {}).pipe(
            tap(data => this.mensaje.set(data.mensaje)),
            catchError(err => {
                this.error.set("No se pudo confirmar la recepción del bolsín.");
                return throwError(() => err);
            }),
            finalize(() => this.cargando.set(false))
        );
    }

    // Obtenemos el mensaje de éxito del backend.
    informarEjecucionExitosaCU() {
        this.cargando.set(true);
        this.error.set(null);

        return this.http.get<{ mensaje: string }>(`${this.url}/finalizar`).pipe(
            tap(data => this.mensaje.set(data.mensaje)),
            catchError(err => {
                this.error.set("No se pudo obtener el mensaje de finalización del caso de uso.");
                return throwError(() => err);
            }),
            finalize(() => this.cargando.set(false))
        );
    }

    setUsuarioFicticio(nombre: string) {
        const limpio = nombre.trim();
        this.usuarioFicticio.set(limpio || "Encargado de Bolsines");
    }

    getUsuarioFicticio() { return this.usuarioFicticio.asReadonly(); }

    getComisionMedica() { return this.comisionMedica; }

    getBolsines() { return this.bolsines; }

    getRemitos() { return this.remitos; }

    getBolsinSeleccionado() { return this.bolsinSeleccionado; }

    getMensajeExito() { return this.mensaje; }

    getCargando() { return this.cargando.asReadonly(); }

    getError() { return this.error.asReadonly(); }
}
