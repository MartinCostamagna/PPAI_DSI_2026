import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { BolsinesEnviadosAEstaComisionMedica } from './pages/bolsines-enviados-a-esta-comision-medica/bolsines-enviados-a-esta-comision-medica';
import { BolsinSeleccionado } from './pages/bolsin-seleccionado/bolsin-seleccionado';
import { InformarCuExitoso } from './pages/informar-cu-exitoso/informar-cu-exitoso';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'inicio', component: Inicio },
  { path: 'bolsines-enviados-a-esta-comision-medica', component: BolsinesEnviadosAEstaComisionMedica },
  { path: 'bolsinSeleccionado', component: BolsinSeleccionado },
  { path: 'informar-cu-exitoso', component: InformarCuExitoso },
  { path: '**', redirectTo: 'login' }
];
