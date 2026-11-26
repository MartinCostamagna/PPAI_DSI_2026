import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppIcon } from '../../components/app-icon/app-icon';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, AppIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  usuario = '';
  contrasena = '';
  recordar = true;
  mostrarContrasena = signal(false);
  errorLogin = signal<string | null>(null);
  ingresando = signal(false);

  alternarContrasena() {
    this.mostrarContrasena.update(v => !v);
  }

  /**
   * Valida las credenciales contra el backend. Si son correctas navega a inicio;
   * ante un 401 muestra el error y no navega.
   */
  iniciarSesion() {
    this.errorLogin.set(null);
    this.ingresando.set(true);
    this.authService.login(this.usuario.trim(), this.contrasena).subscribe({
      next: () => {
        this.ingresando.set(false);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.ingresando.set(false);
        this.errorLogin.set(
          err?.status === 401
            ? 'Usuario o contraseña incorrectos'
            : 'No se pudo conectar con el servidor. Intentá nuevamente.',
        );
      },
    });
  }

  accionRelleno(nombre: string) {
    this.toastService.mostrarNoImplementado(nombre);
  }
}

