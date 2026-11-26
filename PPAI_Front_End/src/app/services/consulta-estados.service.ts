import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BolsinDetalleDto, BolsinResumenDto } from '../interfaces/consulta-estados.interface';

/** Consulta de solo lectura de estados e historiales (funcionalidad de apoyo, fuera del CU 28). */
@Injectable({ providedIn: 'root' })
export class ConsultaEstadosService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/consulta';

  listarBolsines(): Observable<BolsinResumenDto[]> {
    return this.http.get<BolsinResumenDto[]>(`${this.url}/bolsines`);
  }

  obtenerDetalle(numeroPrecinto: number): Observable<BolsinDetalleDto> {
    return this.http.get<BolsinDetalleDto>(`${this.url}/bolsines/${numeroPrecinto}`);
  }
}
