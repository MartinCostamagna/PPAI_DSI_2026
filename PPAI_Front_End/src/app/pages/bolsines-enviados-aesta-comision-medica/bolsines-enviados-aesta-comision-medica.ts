import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecepcionBolsinService } from '../../services/recepcion-bolsin.service';

@Component({
  selector: 'app-bolsines-enviados-aesta-comision-medica',
  imports: [RouterLink],
  templateUrl: './bolsines-enviados-aesta-comision-medica.html',
  styleUrl: './bolsines-enviados-aesta-comision-medica.css',
})
export class BolsinesEnviadosAEstaComisionMedica {
  ComisionMedica = { nombre: '' };
  bolsines: any[] = [];

  constructor(private recepcionService: RecepcionBolsinService) {}

  ngOnInit() {
    this.recepcionService.mostrarCMYBolsines().subscribe(data => {
      this.ComisionMedica = { nombre: data.nombreCMEmpleado };
      this.bolsines = data.bolsinesInfo;
    });
  }
}
