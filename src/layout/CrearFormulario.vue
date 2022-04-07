<template>
    <div class="mt-4 container-fluid">
        <div class="card">
            <div class="card-header">
                <h1 class="text-azul-sena " v-if="!crear && ver">FORMULARIO</h1>
                <h1 class="text-azul-sena " v-else-if="crear">
                    CREAR FORMULARIO
                </h1>
            </div>
            <div class="card-body row">
                <div class="col-9">
                    <template  v-for="(componente, index) in componentes">
                        <CrearComponente :key="index" :componente="componentes[index]"></CrearComponente>
                    </template>
                </div>
                <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                    <button class="btn btn-azul-sena w-100 m-0" @click="agregarComponente('input text')">Entrada de Texto</button>
                    <button class="btn btn-azul-sena w-100 m-0 mt-2" @click="agregarComponente('input radio')">Boton de Radio</button>
                    <button class="btn btn-azul-sena w-100 m-0 mt-2" @click="agregarComponente('file')">Boton de Archivo</button>
                    <button class="btn btn-azul-sena w-100 m-0 mt-2" @click="agregarComponente('text area')">Area de Texto</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue } from 'vue-property-decorator';
import CrearComponente from './CrearComponente.vue';

@Component({
    components: {
        CrearComponente
    }
})
export default class Crearformularios extends Vue {
    ver: any = false;
    crear: any = true;
    documento: any
    componentes: PicConvocatoriaDatos [] = []
    mounted(){
        if (this.$route.params.ver != undefined && this.$route.params.crear != undefined) {
        this.ver = this.$route.params.ver;
        this.crear = this.$route.params.crear;      
        }
    }
    agregarComponente(tipo: string){
        const componente: PicConvocatoriaDatos = new PicConvocatoriaDatos()
        componente.etiqueda = tipo
        componente.texto_ayuda = "nombre del dato"
        componente.nombre_dato = ""
        componente.requerido = false
        this.componentes.push(componente)
    }
}
export class PicConvocatoriaDatos {
    id: number = 0
    id_tipo_dato: number = 0
    pic_conv_id: number = 0
    etiqueda: string = ''
    texto_ayuda: string = ''
    nombre_dato: string = ''
    requerido: boolean = true
}
</script>

<style>

</style>