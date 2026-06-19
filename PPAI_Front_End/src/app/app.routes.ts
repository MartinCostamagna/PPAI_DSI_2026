import { Routes } from '@angular/router';
import { Opciones } from './features/bolsines/pages/opciones/opciones';
import { Recepcion } from './features/bolsines/pages/recepcion/recepcion';

export const routes: Routes = [
  { path: '', component: Opciones },
  { path: 'registrar-recepcion', component: Recepcion }
];

