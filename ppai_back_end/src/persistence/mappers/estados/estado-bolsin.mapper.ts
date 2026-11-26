import { EstadoBolsin } from "../../../bolsin/state/estado-bolsin.abstract";
import { Creado } from "../../../bolsin/state/creado.state";
import { Cerrado } from "../../../bolsin/state/cerrado.state";
import { Enviado } from "../../../bolsin/state/enviado.state";
import { RecibidoEnCMDestino } from "../../../bolsin/state/recibido-en-cm-destino.state";
import { DeBaja } from "../../../bolsin/state/de-baja.state";

/**
 * El mapper traduce nombre <--> instancia de estado del ámbito Bolsín.
 * Se usa en BolsinMapper y CambioEstadoBolsinMapper.
 */
export class EstadoBolsinMapper {
    private static readonly estados: [string, new () => EstadoBolsin][] = [
        ["Creado", Creado],
        ["Cerrado", Cerrado],
        ["Enviado", Enviado],
        ["RecibidoEnCMDestino", RecibidoEnCMDestino],
        ["DeBaja", DeBaja]
    ];

    static toDomain(nombre: string): EstadoBolsin {
        const entrada = EstadoBolsinMapper.estados.find(([n]) => n === nombre);
        if (!entrada) {
            throw new Error(`Estado de bolsín desconocido: ${nombre}`);
        }
        return new entrada[1]();
    }

    static toOrm(estado: EstadoBolsin): string {
        const entrada = EstadoBolsinMapper.estados.find(([, clase]) => estado instanceof clase);
        if (!entrada) {
            throw new Error(`Estado de bolsín no mapeado: ${estado.constructor.name}`);
        }
        return entrada[0];
    }
}
