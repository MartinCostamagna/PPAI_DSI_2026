import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { BolsinesEnviadosAEstaComisionMedica } from './pages/bolsines-enviados-aesta-comision-medica/bolsines-enviados-aesta-comision-medica';
import { BolsinSeleccionado } from './pages/bolsin-seleccionado/bolsin-seleccionado';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'bolsines-enviados-a-esta-comision-medica', component: BolsinesEnviadosAEstaComisionMedica },
  { path: 'bolsinSeleccionado', component: BolsinSeleccionado }
];
