import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-opciones',
  imports: [],
  templateUrl: './opciones.html',
  styleUrl: './opciones.css',
})
export class Opciones {
constructor(private router: Router) {}

  seleccionar(ruta: string) {
    this.router.navigate([ruta]);
}
}
