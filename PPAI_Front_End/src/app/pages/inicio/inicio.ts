import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private router = inject(Router);

  irABolsines() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica'])
  }
}
