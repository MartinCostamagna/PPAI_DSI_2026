import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

interface CMYBolsin {
    nombreCMEmpleado: string,
    bolsinesInfo: {
        nombreCMOrigen: string,
        numeroPrecinto: number
    }[]
}
@Injectable({
  providedIn: 'root'
})
export class RecepcionBolsinService {
    private readonly http = inject(HttpClient);
    private readonly url = "http://localhost:3000/bolsines/recepcion"

    mostrarCMYBolsines(){
        return this.http.get<CMYBolsin>(this.url);
    }

}