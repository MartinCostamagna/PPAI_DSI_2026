import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, inject, signal, viewChild } from '@angular/core';
import { AppIcon } from '../../components/app-icon/app-icon';
import { AppShell } from '../../components/app-shell/app-shell';
import { BolsinDetalleDto, BolsinResumenDto } from '../../interfaces/consulta-estados.interface';
import { ConsultaEstadosService } from '../../services/consulta-estados.service';

/** Página de solo lectura para verificar los estados persistidos. No forma parte del CU 28. */
@Component({
  selector: 'app-consulta-estados',
  imports: [AppShell, AppIcon, DatePipe, NgTemplateOutlet],
  templateUrl: './consulta-estados.html',
  styleUrl: './consulta-estados.css',
})
export class ConsultaEstados implements OnInit {
  private consultaService = inject(ConsultaEstadosService);

  bolsines = signal<BolsinResumenDto[]>([]);
  cargando = signal(false);
  error = signal('');

  precintoSeleccionado = signal<number | null>(null);
  detalle = signal<BolsinDetalleDto | null>(null);
  cargandoDetalle = signal(false);
  errorDetalle = signal('');

  private panelDetalle = viewChild<ElementRef<HTMLElement>>('panelDetalle');

  ngOnInit() {
    this.recargar();
  }

  /** Recarga la lista y, si hay un bolsín abierto, también su detalle. */
  recargar() {
    this.cargando.set(true);
    this.error.set('');
    this.consultaService.listarBolsines().subscribe({
      next: bolsines => {
        this.bolsines.set(bolsines);
        this.cargando.set(false);
        const abierto = this.precintoSeleccionado();
        if (abierto !== null) {
          this.cargarDetalle(abierto);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(this.mensajeError(err, 'No se pudieron obtener los bolsines. Verificá que el servidor esté activo.'));
        this.cargando.set(false);
      },
    });
  }

  /** Click en una fila: expande el detalle; si ya estaba abierto, lo contrae. */
  alternarDetalle(bolsin: BolsinResumenDto) {
    if (this.precintoSeleccionado() === bolsin.numeroPrecinto) {
      this.precintoSeleccionado.set(null);
      this.detalle.set(null);
      return;
    }
    this.precintoSeleccionado.set(bolsin.numeroPrecinto);
    this.detalle.set(null);
    this.cargarDetalle(bolsin.numeroPrecinto);
    // Espera a que el panel se renderice y lo trae a la vista.
    setTimeout(() => this.panelDetalle()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  private cargarDetalle(numeroPrecinto: number) {
    this.cargandoDetalle.set(true);
    this.errorDetalle.set('');
    this.consultaService.obtenerDetalle(numeroPrecinto).subscribe({
      next: detalle => {
        if (this.precintoSeleccionado() === numeroPrecinto) {
          this.detalle.set(detalle);
        }
        this.cargandoDetalle.set(false);
      },
      error: (err: HttpErrorResponse) => {
        if (this.precintoSeleccionado() === numeroPrecinto) {
          this.errorDetalle.set(this.mensajeError(err, 'No se pudo obtener el detalle del bolsín. Verificá que el servidor esté activo.'));
          this.cargandoDetalle.set(false);
        }
      },
    });
  }

  private mensajeError(err: HttpErrorResponse, mensajeConexion: string): string {
    if (err.status === 401) {
      return 'No hay una sesión activa. Volvé a iniciar sesión.';
    }
    if (err.status === 404) {
      return 'El bolsín no pertenece a tu Comisión Médica o no existe.';
    }
    return mensajeConexion;
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'Enviado':
      case 'EnBolsinEnviado':
      case 'EnBolsinSaliente':
        return 'badge-warning';
      case 'RecibidoEnCMDestino':
      case 'RecibidoYAceptado':
      case 'RecibidaYAceptada':
        return 'badge-success';
      case 'RecibidaYRechazada':
      case 'Cancelado':
      case 'DeBaja':
      case 'NoRecibida':
        return 'badge-danger';
      case 'ParaRedirigir':
      case 'RecibidoYAceptadoParcial':
        return 'badge-primary';
      default:
        return 'badge-neutral';
    }
  }
}
