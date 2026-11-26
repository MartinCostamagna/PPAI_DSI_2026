import { EstadoRemito } from "../../../remito/state/estado-remito.abstract";
import { Creado } from "../../../remito/state/creado.state";
import { EnBolsinSaliente } from "../../../remito/state/en-bolsin-saliente.state";
import { EnBolsinEnviado } from "../../../remito/state/en-bolsin-enviado.state";
import { RecibidoYAceptado } from "../../../remito/state/recibido-y-aceptado.state";
import { RecibidoYAceptadoParcial } from "../../../remito/state/recibido-y-aceptado-parcial.state";
import { Cancelado } from "../../../remito/state/cancelado.state";

/**
 * El mapper traduce nombre <--> instancia de estado del ámbito Remito.
 */
export class EstadoRemitoMapper {
    private static readonly estados: [string, new () => EstadoRemito][] = [
        ["Creado", Creado],
        ["EnBolsinSaliente", EnBolsinSaliente],
        ["EnBolsinEnviado", EnBolsinEnviado],
        ["RecibidoYAceptado", RecibidoYAceptado],
        ["RecibidoYAceptadoParcial", RecibidoYAceptadoParcial],
        ["Cancelado", Cancelado]
    ];

    static toDomain(nombre: string): EstadoRemito {
        const entrada = EstadoRemitoMapper.estados.find(([n]) => n === nombre);
        if (!entrada) {
            throw new Error(`Estado de remito desconocido: ${nombre}`);
        }
        return new entrada[1]();
    }

    static toOrm(estado: EstadoRemito): string {
        const entrada = EstadoRemitoMapper.estados.find(([, clase]) => estado instanceof clase);
        if (!entrada) {
            throw new Error(`Estado de remito no mapeado: ${estado.constructor.name}`);
        }
        return entrada[0];
    }
}
