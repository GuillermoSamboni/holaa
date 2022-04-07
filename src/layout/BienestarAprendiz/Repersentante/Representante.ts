export class Representante {
    identificacion: number;
    id_persona: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    id_ficha_caracterizacion: number;
    programa_formacion: string;
    jornada: string;
    modalidad: string;

    nombre_completo(): string {
        return this.primer_nombre + " " + this.segundo_nombre + " " + this.primer_apellido + " " + this.segundo_apellido
    }
}