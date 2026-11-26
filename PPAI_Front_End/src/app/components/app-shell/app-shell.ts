import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppIcon } from '../app-icon/app-icon';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';
import { ToastService } from '../../services/toast.service';

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

@Component({
  selector: 'app-shell',
  imports: [RouterLink, AppIcon],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  private router = inject(Router);
  private pantallaRecepcionService = inject(PantallaRecepcionBolsin);
  private toastService = inject(ToastService);

  seccionActiva = input<'inicio' | 'recepcion'>('inicio');
  tituloPagina = input<string>('Panel Principal');
  breadcrumbs = input<BreadcrumbItem[]>([]);

  comisionMedica = this.pantallaRecepcionService.getComisionMedica();
  usuario = this.pantallaRecepcionService.getUsuarioFicticio();

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  irARecepcion() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }

  accionRelleno(nombre: string) {
    this.toastService.mostrarNoImplementado(nombre);
  }

  cerrarSesion() {
    this.toastService.mostrar('Sesión cerrada correctamente.', 'info', 2200);
    this.router.navigate(['/login']);
  }
}

