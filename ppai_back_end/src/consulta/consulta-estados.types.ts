export type CambioEstadoDto = { estado: string; fechaYHoraInicio: Date; fechaYHoraFin: Date | null; empleado: string };
export type BolsinResumenDto = { numeroPrecinto: number; cmOrigen: string; cmDestino: string; estadoActual: string; cantidadRemitos: number };
export type DocumentacionDetalleDto = { tipoDocumento: string; asunto: string; estadoActual: string; historial: CambioEstadoDto[] };
export type RemitoDetalleDto = { numero: number; estadoActual: string; documentaciones: DocumentacionDetalleDto[] };
export type BolsinDetalleDto = BolsinResumenDto & { historial: CambioEstadoDto[]; remitos: RemitoDetalleDto[] };
