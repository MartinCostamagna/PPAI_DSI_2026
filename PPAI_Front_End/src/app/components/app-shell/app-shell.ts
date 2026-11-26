import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppIcon } from '../app-icon/app-icon';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';
import { AuthService } from '../../services/auth.service';
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
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  seccionActiva = input<'inicio' | 'recepcion' | 'consulta'>('inicio');
  tituloPagina = input<string>('Panel Principal');
  breadcrumbs = input<BreadcrumbItem[]>([]);

  private cmRecepcion = this.pantallaRecepcionService.getComisionMedica();
  comisionMedica = computed(() => this.authService.sesion()?.nombreCM || this.cmRecepcion());
  usuario = computed(() => this.authService.sesion()?.nombreEmpleado ?? '');

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  irARecepcion() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }

  irAConsulta() {
    this.router.navigate(['/consulta-estados']);
  }

  accionRelleno(nombre: string) {
    this.toastService.mostrarNoImplementado(nombre);
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastService.mostrar('Sesión cerrada correctamente.', 'info', 2200);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastService.mostrar('No se pudo cerrar la sesión en el servidor.', 'info', 2200);
        this.router.navigate(['/login']);
      },
    });
  }
}

