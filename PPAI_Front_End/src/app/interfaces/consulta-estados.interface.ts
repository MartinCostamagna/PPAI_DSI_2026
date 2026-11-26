/** Espejo de los DTOs de consulta de estados del backend. */
export interface CambioEstadoDto {
  estado: string;
  fechaYHoraInicio: string; // ISO
  fechaYHoraFin: string | null;
  empleado: string;
}

export interface BolsinResumenDto {
  numeroPrecinto: number;
  cmOrigen: string;
  cmDestino: string;
  estadoActual: string;
  cantidadRemitos: number;
}

export interface DocumentacionDetalleDto {
  tipoDocumento: string;
  asunto: string;
  estadoActual: string;
  historial: CambioEstadoDto[];
}

export interface RemitoDetalleDto {
  numero: number;
  estadoActual: string;
  documentaciones: DocumentacionDetalleDto[];
}

export type BolsinDetalleDto = BolsinResumenDto & {
  historial: CambioEstadoDto[];
  remitos: RemitoDetalleDto[];
};
