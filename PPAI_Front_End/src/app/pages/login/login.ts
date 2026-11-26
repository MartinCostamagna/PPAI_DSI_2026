import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppIcon } from '../../components/app-icon/app-icon';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, AppIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private pantallaRecepcionService = inject(PantallaRecepcionBolsin);
  private toastService = inject(ToastService);

  usuario = '';
  contrasena = '';
  recordar = true;
  mostrarContrasena = signal(false);

  alternarContrasena() {
    this.mostrarContrasena.update(v => !v);
  }

  /**
   * Inicio de sesión ficticio: no valida credenciales ni consulta al backend.
   * Redirige directamente a la pantalla de inicio del prototipo.
   */
  iniciarSesion() {
    this.pantallaRecepcionService.setUsuarioFicticio(this.usuario);
    this.router.navigate(['/inicio']);
  }

  accionRelleno(nombre: string) {
    this.toastService.mostrarNoImplementado(nombre);
  }
}

