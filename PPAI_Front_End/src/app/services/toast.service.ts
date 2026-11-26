import { Injectable, signal } from '@angular/core';

export interface ToastMensaje {
  texto: string;
  tipo: 'info' | 'success' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _mensaje = signal<ToastMensaje | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly mensaje = this._mensaje.asReadonly();

  mostrar(texto: string, tipo: 'info' | 'success' | 'warning' = 'info', duracionMs = 3200) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this._mensaje.set({ texto, tipo });
    this.timeoutId = setTimeout(() => {
      this._mensaje.set(null);
      this.timeoutId = null;
    }, duracionMs);
  }

  mostrarNoImplementado(nombreModulo: string) {
    this.mostrar(
      `"${nombreModulo}" es una acción ilustrativa del prototipo (fuera del alcance del CU actual).`,
      'info'
    );
  }

  cerrar() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this._mensaje.set(null);
  }
}

