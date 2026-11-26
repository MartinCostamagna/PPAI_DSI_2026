import { Component, input } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';

@Component({
  selector: 'app-step-indicator',
  imports: [AppIcon],
  templateUrl: './step-indicator.html',
  styleUrl: './step-indicator.css',
})
export class StepIndicator {
  pasoActual = input.required<1 | 2 | 3>();

  readonly pasos = [
    { numero: 1, titulo: 'Seleccionar bolsín', subtitulo: 'Listado enviado a tu CM' },
    { numero: 2, titulo: 'Revisar remitos y opción', subtitulo: 'Verificación de contenido' },
    { numero: 3, titulo: 'Confirmar y finalizar', subtitulo: 'Resultado de la recepción' },
  ];
}

