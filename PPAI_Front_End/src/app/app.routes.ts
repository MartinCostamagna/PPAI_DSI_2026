import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { BolsinesEnviadosAEstaComisionMedica } from './pages/bolsines-enviados-a-esta-comision-medica/bolsines-enviados-a-esta-comision-medica';
import { BolsinSeleccionado } from './pages/bolsin-seleccionado/bolsin-seleccionado';
import { InformarCuExitoso } from './pages/informar-cu-exitoso/informar-cu-exitoso';
import { ConsultaEstados } from './pages/consulta-estados/consulta-estados';
import { sesionGuard } from './guards/sesion.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'inicio', component: Inicio, canActivate: [sesionGuard] },
  { path: 'bolsines-enviados-a-esta-comision-medica', component: BolsinesEnviadosAEstaComisionMedica, canActivate: [sesionGuard] },
  { path: 'bolsinSeleccionado', component: BolsinSeleccionado, canActivate: [sesionGuard] },
  { path: 'informar-cu-exitoso', component: InformarCuExitoso, canActivate: [sesionGuard] },
  { path: 'consulta-estados', component: ConsultaEstados, canActivate: [sesionGuard] },
  { path: '**', redirectTo: 'login' }
];
