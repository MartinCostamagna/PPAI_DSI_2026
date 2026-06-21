import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  1. seleccionOpcRegistRecepBolsin()
 */
@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private router = inject(Router);

  /**
   * Comienza la ejecución de todo el caso de uso.
   */
  seleccionOpcRegistRecepBolsin() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }
}
