import { EstadoDocumentacion } from "../../../documentacion/state/estado-documentacion.abstract";
import { Registrada } from "../../../documentacion/state/registrada.state";
import { EnRemito } from "../../../documentacion/state/en-remito.state";
import { EnBolsinSaliente } from "../../../documentacion/state/en-bolsin-saliente.state";
import { EnBolsinEnviado } from "../../../documentacion/state/en-bolsin-enviado.state";
import { NoRecibida } from "../../../documentacion/state/no-recibida.state";
import { ParaRedirigir } from "../../../documentacion/state/para-redirigir.state";
import { RecibidaYAceptada } from "../../../documentacion/state/recibida-y-aceptada.state";
import { RecibidaYRechazada } from "../../../documentacion/state/recibida-y-rechazada.state";
import { DeBaja } from "../../../documentacion/state/de-baja.state";

/**
 * El mapper traduce nombre <--> instancia de estado del ámbito Documentación.
 * Lo usan DocumentacionMapper y CambioEstadoDocumentacionMapper.
 */
export class EstadoDocumentacionMapper {
    private static readonly estados: [string, new () => EstadoDocumentacion][] = [
        ["Registrada", Registrada],
        ["EnRemito", EnRemito],
        ["EnBolsinSaliente", EnBolsinSaliente],
        ["EnBolsinEnviado", EnBolsinEnviado],
        ["NoRecibida", NoRecibida],
        ["ParaRedirigir", ParaRedirigir],
        ["RecibidaYAceptada", RecibidaYAceptada],
        ["RecibidaYRechazada", RecibidaYRechazada],
        ["DeBaja", DeBaja]
    ];

    static toDomain(nombre: string): EstadoDocumentacion {
        const entrada = this.estados.find(([n]) => n === nombre);
        if (!entrada) {
            throw new Error(`Estado de documentación desconocido: ${nombre}`);
        }
        return new entrada[1]();
    }

    static toOrm(estado: EstadoDocumentacion): string {
        const entrada = this.estados.find(([, clase]) => estado instanceof clase);
        if (!entrada) {
            throw new Error(`Estado de documentación no mapeado: ${estado.constructor.name}`);
        }
        return entrada[0];
    }
}
