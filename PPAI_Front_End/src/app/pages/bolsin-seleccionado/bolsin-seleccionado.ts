import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RecepcionBolsinService } from '../../services/recepcion-bolsin.service';

@Component({
  selector: 'app-bolsin-seleccionado',
  imports: [RouterLink],
  templateUrl: './bolsin-seleccionado.html',
  styleUrl: './bolsin-seleccionado.css',
})
export class BolsinSeleccionado {
  private recepcionService = inject(RecepcionBolsinService);
  private router = inject(Router);

  bolsinSeleccionado = this.recepcionService.getBolsinSeleccionado();
  remitos = this.recepcionService.getRemitos();
  comisionMedica = this.recepcionService.getComisionMedica();
  mostrarConfirmacion = false;
  opcion: number = 0;

  ngOnInit() {
    if ((this.recepcionService.getRemitos())().length === 0) {
      this.router.navigate(['/inicio']);
    }
  }

  regresar() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }

  tomarSeleccionOpcRecBolsin(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.opcion= +select.value;
  }

  solicitarConfirmacion() {
    if (this.opcion !== 0) this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion() {
    this.mostrarConfirmacion = false;
  }

  tomarConfirmacion() {
    this.recepcionService.tomarSeleccionOpcRecBolsin(this.opcion)
        .subscribe(() => {
            this.mostrarConfirmacion = false;
            this.router.navigate(['/informar-cu-exitoso']);
        });
  }
}