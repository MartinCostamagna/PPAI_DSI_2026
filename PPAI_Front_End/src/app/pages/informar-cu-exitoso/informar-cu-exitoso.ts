import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppIcon } from '../../components/app-icon/app-icon';
import { AppShell } from '../../components/app-shell/app-shell';
import { StepIndicator } from '../../components/step-indicator/step-indicator';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';
import { ToastService } from '../../services/toast.service';

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  39. tomarConfirmacion()
 *  64. informarEjecucionExitosaCU()
 */
@Component({
  selector: 'app-informar-cu-exitoso',
  imports: [AppShell, StepIndicator, AppIcon],
  templateUrl: './informar-cu-exitoso.html',
  styleUrl: './informar-cu-exitoso.css',
})
export class InformarCuExitoso {
  private pantallaRecepcionBolsin = inject(PantallaRecepcionBolsin);
  private router = inject(Router);
  private toastService = inject(ToastService);

  mensaje = this.pantallaRecepcionBolsin.getMensajeExito();
  bolsinSeleccionado = this.pantallaRecepcionBolsin.getBolsinSeleccionado();
  cargando = this.pantallaRecepcionBolsin.getCargando();
  error = this.pantallaRecepcionBolsin.getError();
  quiereSalir = false;

  // Llamada automática, por medio de la navegación a este componente, a la llamada http tomarConfirmacion()
  ngOnInit() {
    if ((this.pantallaRecepcionBolsin.getRemitos())().length === 0) {
      this.router.navigate(['/inicio']);
    } else {
      this.pantallaRecepcionBolsin.tomarConfirmacion().subscribe();
    }
  }

  // Se muestra el mensaje de éxito de la ejecución del caso de uso de inclusión.
  informarEjecucionExitosaCU() {
    if (!this.quiereSalir) this.quiereSalir = true;

    this.pantallaRecepcionBolsin.informarEjecucionExitosaCU().subscribe(data => {
      this.mensaje.set(data.mensaje);
    });
  }

  volver() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }

  irAlInicio() {
    this.router.navigate(['/inicio']);
  }

  accionRelleno(nombre: string) {
    this.toastService.mostrarNoImplementado(nombre);
  }
}
