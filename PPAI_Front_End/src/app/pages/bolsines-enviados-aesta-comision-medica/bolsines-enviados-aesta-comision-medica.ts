import { Component, computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecepcionBolsinService } from '../../services/recepcion-bolsin.service';
import { Bolsin } from '../../interfaces/bolsin.interface';

@Component({
  selector: 'app-bolsines-enviados-aesta-comision-medica',
  imports: [],
  templateUrl: './bolsines-enviados-aesta-comision-medica.html',
  styleUrl: './bolsines-enviados-aesta-comision-medica.css',
})
export class BolsinesEnviadosAEstaComisionMedica {
  private router = inject(Router);
  private recepcionService = inject(RecepcionBolsinService);

  comisionMedica = this.recepcionService.getComisionMedica();
  bolsines = this.recepcionService.getBolsines();
  bolsinSeleccionado: Bolsin | undefined = undefined;
  filtro = signal<string>('');

  bolsinesFiltrados = computed(() =>
    this.bolsines().filter(b =>
      b.nombreCMOrigen.toLowerCase().includes(this.filtro().toLowerCase()) ||
      b.numeroPrecinto.toString().includes(this.filtro())
    )
  );

  ngOnInit() {
    this.recepcionService.mostrarCMYBolsines();
  }

  seleccionar(bolsin: Bolsin) {
    this.bolsinSeleccionado = bolsin;
  }

  tomarSeleccionBolsin() {
    if(!this.bolsinSeleccionado) return;

    this.recepcionService.tomarSeleccionBolsin(this.bolsinSeleccionado)
        .subscribe(() => {
          this.router.navigate(['/bolsinSeleccionado']);
        });
  }

  cancelar() {
    this.router.navigate(["/inicio"]);
  }
}