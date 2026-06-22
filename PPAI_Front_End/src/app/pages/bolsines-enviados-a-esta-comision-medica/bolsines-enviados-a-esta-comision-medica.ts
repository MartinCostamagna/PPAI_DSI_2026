import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PantallaRecepcionBolsin } from '../../services/pantalla-recepcion-bolsin.service';
import { Bolsin } from '../../interfaces/bolsin.interface';

/**
 * Métodos mapeados del diagrama de secuencia de `PantallaRecepcionBolsin`:
 *  10. mostrarCMUsuarioLog()
 *  21. mostrarBolsinesPSeleccion()
 *  { la funcionalidad de ambos se inicia al cargar el componente, con @method ngOnInit() }
 *  23. tomarSeleccionBolsin()
 */
@Component({
  selector: 'app-bolsines-enviados-a-esta-comision-medica',
  imports: [],
  templateUrl: './bolsines-enviados-a-esta-comision-medica.html',
  styleUrl: './bolsines-enviados-a-esta-comision-medica.css',
})
export class BolsinesEnviadosAEstaComisionMedica {
  private router = inject(Router);
  private pantallaRecepcionService = inject(PantallaRecepcionBolsin);

  comisionMedica = this.pantallaRecepcionService.getComisionMedica();
  bolsines = this.pantallaRecepcionService.getBolsines();
  bolsinSeleccionado: Bolsin | undefined = undefined;
  filtro = signal<string>('');

  bolsinesFiltrados = computed(() =>
    this.bolsines().filter(b =>
      b.nombreCMOrigen.toLowerCase().includes(this.filtro().toLowerCase()) ||
      b.numeroPrecinto.toString().includes(this.filtro())
    )
  );

  /**
   * Al navegar a este componente, se llama automáticamente al servicio para obtener la CM del usuario logueado, y los bolsines.
   * Esto se hace mediante una primer llamada http al backend, quien inicia el proceso con la habilitación de la ventana de parte del controlador.
   */
  ngOnInit() {
    this.pantallaRecepcionService.mostrarCMYBolsines();
  }

  seleccionar(bolsin: Bolsin) {
    this.bolsinSeleccionado = bolsin;
  }

  // Tomamos el bolsín seleccionado por el usuario, y mandamos la opción al backend mediante el servicio.
  tomarSeleccionBolsin() {
    if(!this.bolsinSeleccionado) return;

    this.pantallaRecepcionService.tomarSeleccionBolsin(this.bolsinSeleccionado)
        .subscribe(() => {
          this.router.navigate(['/bolsinSeleccionado']);
        });
  }

  cancelar() {
    this.router.navigate(["/inicio"]);
  }
}