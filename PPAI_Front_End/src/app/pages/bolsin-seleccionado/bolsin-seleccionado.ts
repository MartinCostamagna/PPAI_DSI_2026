import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppIcon } from '../../components/app-icon/app-icon';
import { AppShell } from '../../components/app-shell/app-shell';
import { StepIndicator } from '../../components/step-indicator/step-indicator';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';
import { ToastService } from '../../services/toast.service';

interface OpcionRecepcion {
  valor: number;
  titulo: string;
  descripcion: string;
}

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  34. mostrarDatosRemitos()
 *  36. tomarSeleccionOpcRecBolsin()
 *  38. solicitarConfirmacionSelec()
 *  39. tomarConfirmacion()
 */
@Component({
  selector: 'app-bolsin-seleccionado',
  imports: [RouterLink, AppShell, StepIndicator, AppIcon],
  templateUrl: './bolsin-seleccionado.html',
  styleUrl: './bolsin-seleccionado.css',
})
export class BolsinSeleccionado {
  private pantallaRecepcionService = inject(PantallaRecepcionBolsin);
  private router = inject(Router);
  private toastService = inject(ToastService);

  bolsinSeleccionado = this.pantallaRecepcionService.getBolsinSeleccionado();
  // Esta información de los remitos, se corresponde con el retorno de `34. mostrarDatosRemitos()` del diagrama de secuencia.
  remitos = this.pantallaRecepcionService.getRemitos();
  comisionMedica = this.pantallaRecepcionService.getComisionMedica();
  cargando = this.pantallaRecepcionService.getCargando();
  error = this.pantallaRecepcionService.getError();

  mostrarConfirmacion = false;
  opcion: number = 0;

  totalDocumentos = computed(() =>
    this.remitos().reduce((acc, r) => acc + r.datosDocumentacion.length, 0)
  );

  readonly opcionesRecepcion: OpcionRecepcion[] = [
    {
      valor: 1,
      titulo: 'El contenido del bolsín es igual al registrado',
      descripcion: 'Los remitos y la documentación asociada pasan al estado Recibida y Aceptada.',
    },
    {
      valor: 2,
      titulo: 'No se recibe toda la documentación asociada a los remitos que contiene el bolsín',
      descripcion: 'La documentación faltante queda No recibida, el remito Recibido y Aceptado Parcial y se notifica a la CM origen.',
    },
    {
      valor: 3,
      titulo: 'Existe documentación que no corresponde al destino (CM del usuario logueado)',
      descripcion: 'La documentación queda Recibida y Rechazada para ser devuelta a la CM origen.',
    },
    {
      valor: 4,
      titulo: 'La documentación se debe redirigir a otra área.',
      descripcion: 'Aplicable en la CMC: la documentación pasa al estado Para redirigir hacia un área interna de sede central.',
    },
  ];

  ngOnInit() {
    if ((this.pantallaRecepcionService.getRemitos())().length === 0) {
      this.router.navigate(['/inicio']);
    }
  }

  get textoOpcionSeleccionada(): string {
    return this.opcionesRecepcion.find(o => o.valor === this.opcion)?.titulo ?? '';
  }

  regresar() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }

  // Tomamos la opción seleccionada por el usuario, y la almacenamos.
  tomarSeleccionOpcRecBolsin(valor: number) {
    this.opcion = valor;
  }

  solicitarConfirmacionSelec() {
    if (this.opcion !== 0) this.mostrarConfirmacion = true;
  }

  cancelarConfirmacion() {
    this.mostrarConfirmacion = false;
  }

  accionRelleno(nombre: string) {
    this.toastService.mostrarNoImplementado(nombre);
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
