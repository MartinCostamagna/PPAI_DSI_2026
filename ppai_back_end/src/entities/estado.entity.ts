export type EstadoType = "Enviado" | "Enviada" | "RecibidoEnCMDestino" |
                        "RecibidoYAceptado" | "RecibidaYAceptada" |
                        "Registrada" | "DeBaja" | "RecibidoYAceptadoParcial" |
                        "ParaRedirigir" | "RecibidaYRechazada";

export type AmbitoType = "Bolsin" | "Documentacion" | "Remito";

export class Estado {
    private nombre: EstadoType;
    private ambito: AmbitoType;
    
    constructor(nombre: EstadoType, ambito: AmbitoType) {
        this.nombre = nombre;
        this.ambito = ambito;
    }

    public sosEnviado(): boolean {
        return (this.nombre === "Enviado");
    }

    public esAmbitoBolsin(): boolean {
        return (this.ambito === "Bolsin");
    }

    public esRecibidoEnCMDestino(): boolean {
        return (this.nombre === "RecibidoEnCMDestino");
    }

    public esAmbitoRemito(): boolean {
        return (this.ambito === "Remito");
    }

    public esRecibidoYAceptado(): boolean {
        return (this.nombre === "RecibidoYAceptado");
    }

    public esRecibidoYAceptadoParcial(): boolean {
        return (this.nombre === "RecibidoYAceptadoParcial");
    }

    public esAmbitoDocumentacion(): boolean {
        return (this.ambito === "Documentacion");
    }

    public esRecibidaYAceptada(): boolean {
        return (this.nombre === "RecibidaYAceptada");
    }

    public esRegistrada(): boolean {
        return (this.nombre === "Registrada");
    }

    public esDeBaja(): boolean {
        return (this.nombre === "DeBaja");
    }

    public esParaRedirigir(): boolean {
        return (this.nombre === "ParaRedirigir");
    }

    public esRecibidaYRechazada(): boolean {
        return (this.nombre === "RecibidaYRechazada");
    }
}