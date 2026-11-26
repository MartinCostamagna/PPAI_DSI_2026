import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Permite el acceso solo si hay sesión activa; si no, redirige a /login. */
export const sesionGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.cargarSesion().pipe(
    map(haySesion => haySesion || router.createUrlTree(['/login'])),
  );
};
