import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppIcon, IconName } from '../../components/app-icon/app-icon';
import { AppShell } from '../../components/app-shell/app-shell';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';
import { ToastService } from '../../services/toast.service';

interface AccionMenu {
  titulo: string;
  descripcion: string;
  icono: IconName;
  disponible: boolean;
  etiqueta: string;
}

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  1. seleccionOpcRegistRecepBolsin()
 */
@Component({
  selector: 'app-inicio',
  imports: [AppShell, AppIcon],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private router = inject(Router);
  private toastService = inject(ToastService);
  private pantallaRecepcionService = inject(PantallaRecepcionBolsin);

  usuario = this.pantallaRecepcionService.getUsuarioFicticio();

  // Casos de uso del actor principal: Encargado de Bolsines (EB)
  readonly accionesBolsines: AccionMenu[] = [
    {
      titulo: 'Registrar recepción de bolsín',
      descripcion: 'Controlar bolsines en estado Enviado para esta CM, verificar remitos y documentación y actualizar su estado.',
      icono: 'inbox',
      disponible: true,
      etiqueta: 'CU 28 · Activo',
    },
    {
      titulo: 'Generar bolsín',
      descripcion: 'Dar de alta un bolsín para una única CM destino asociando remitos en estado Creado y registrando su peso en gramos.',
      icono: 'package',
      disponible: false,
      etiqueta: 'CU 19',
    },
    {
      titulo: 'Cerrar / Reabrir bolsín',
      descripcion: 'Registrar el número de precinto al cerrar un bolsín o quitar el precinto para modificar sus remitos antes del retiro.',
      icono: 'lock',
      disponible: false,
      etiqueta: 'CU 39 · CU 40',
    },
    {
      titulo: 'Registrar el retiro de bolsines',
      descripcion: 'Actualizar a estado Enviado los bolsines cerrados que retira el correo, junto a sus remitos y documentación.',
      icono: 'truck',
      disponible: false,
      etiqueta: 'CU 27',
    },
    {
      titulo: 'Consultar seguimiento de bolsines',
      descripcion: 'Visualizar en Google Maps la ubicación en tránsito obtenida del GPS Tracker y notificar al GCM destino.',
      icono: 'map-pin',
      disponible: false,
      etiqueta: 'CU 36 · GPS',
    },
    {
      titulo: 'Consultar / Modificar bolsín',
      descripcion: 'Visualizar trazabilidad y empleado responsable, quitar o agregar remitos completos, o dar de baja bolsines no enviados.',
      icono: 'search',
      disponible: false,
      etiqueta: 'CU 20 - 22',
    },
  ];

  /**
   * Comienza la ejecución de todo el caso de uso.
   */
  seleccionOpcRegistRecepBolsin() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }

  ejecutarAccion(accion: AccionMenu) {
    if (accion.disponible) {
      this.seleccionOpcRegistRecepBolsin();
    } else {
      this.toastService.mostrarNoImplementado(`${accion.titulo} (${accion.etiqueta})`);
    }
  }

  accionRelleno(nombre: string) {
    this.toastService.mostrarNoImplementado(nombre);
  }
}
