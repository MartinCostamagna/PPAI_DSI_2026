import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  34. mostrarDatosRemitos()
 *  36. tomarSeleccionOpcRecBolsin()
 *  38. solicitarConfirmacionSelec()
 *  39. tomarConfirmacion()
 */
@Component({
  selector: 'app-bolsin-seleccionado',
  imports: [RouterLink],
  templateUrl: './bolsin-seleccionado.html',
  styleUrl: './bolsin-seleccionado.css',
})
export class BolsinSeleccionado {
  private pantallaRecepcionService = inject(PantallaRecepcionBolsin);
  private router = inject(Router);

  bolsinSeleccionado = this.pantallaRecepcionService.getBolsinSeleccionado();
  // Esta información de los remitos, se corresponde con el retorno de `34. mostrarDatosRemitos()` del diagrama de secuencia.
  remitos = this.pantallaRecepcionService.getRemitos();
  comisionMedica = this.pantallaRecepcionService.getComisionMedica();
  mostrarConfirmacion = false;
  opcion: number = 0;

  ngOnInit() {
    if ((this.pantallaRecepcionService.getRemitos())().length === 0) {
      this.router.navigate(['/inicio']);
    }
  }

  regresar() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }

  // Tomamos la opción seleccionada por el usuario, y la almacenamos.
  tomarSeleccionOpcRecBolsin(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.opcion= +select.value;
  }

  solicitarConfirmacionSelec() {
    if (this.opcion !== 0) this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion() {
    this.mostrarConfirmacion = false;
  }

  // Comienza el flujo de confirmación, navegando a la pantalla de finalización del caso de uso.
  tomarConfirmacion() {
    this.pantallaRecepcionService.tomarSeleccionOpcRecBolsin(this.opcion)
        .subscribe(() => {
            this.mostrarConfirmacion = false;
            this.router.navigate(['/informar-cu-exitoso']);
        });
  }
}