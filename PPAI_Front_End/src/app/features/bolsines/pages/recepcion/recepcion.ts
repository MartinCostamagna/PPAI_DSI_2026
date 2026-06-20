import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recepcion.html',
  styleUrl: './recepcion.css'
})
export class Recepcion implements OnInit, OnDestroy {
  cmActual: string = '0001'; // acá va la CM que busquemos del usuario
  fechaHoraActual: Date = new Date();
  bolsines: any[] = []; // Los bolsines que filtramos en base a la CM obtenida

  private intervalo: any;

  ngOnInit() {
    // actualiza la hora cada segundo
    this.intervalo = setInterval(() => {
      this.fechaHoraActual = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}