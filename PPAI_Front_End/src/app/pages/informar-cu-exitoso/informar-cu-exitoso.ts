import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecepcionBolsinService } from '../../services/recepcion-bolsin.service';

@Component({
  selector: 'app-informar-cu-exitoso',
  imports: [],
  templateUrl: './informar-cu-exitoso.html',
  styleUrl: './informar-cu-exitoso.css',
})
export class InformarCuExitoso {
  private recepcionService = inject(RecepcionBolsinService);
  private router = inject(Router);

  mensaje = this.recepcionService.getMensajeExito();
  quiereSalir = false;

  ngOnInit() {
    this.recepcionService.tomarConfirmacion().subscribe();
  }

  finCU() {
    if (!this.quiereSalir) this.quiereSalir = true;

    this.recepcionService.finCU().subscribe(data => {
      this.mensaje.set(data.mensaje);
    });
  }

  volver() {
    this.router.navigate(['/bolsines-enviados-a-esta-comision-medica']);
  }
}