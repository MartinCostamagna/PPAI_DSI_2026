import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { DatosSesion } from '../interfaces/datos-sesion.interface';

/**
 * Maneja la sesión del usuario contra el backend (sin tokens ni cookies:
 * la sesión vive en el servidor).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/auth';

  private readonly datosSesion = signal<DatosSesion | null>(null);
  readonly sesion = this.datosSesion.asReadonly();

  login(usuario: string, contrasena: string): Observable<DatosSesion> {
    return this.http
      .post<DatosSesion>(`${this.url}/login`, { usuario, contrasena })
      .pipe(tap(datos => this.datosSesion.set(datos)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.url}/logout`, {})
      .pipe(finalize(() => this.datosSesion.set(null)));
  }

  /** Consulta la sesión al backend. true si hay sesión, false ante 401 u otro error. */
  cargarSesion(): Observable<boolean> {
    return this.http.get<DatosSesion>(`${this.url}/sesion`).pipe(
      tap(datos => this.datosSesion.set(datos)),
      map(() => true),
      catchError(() => {
        this.datosSesion.set(null);
        return of(false);
      }),
    );
  }
}
