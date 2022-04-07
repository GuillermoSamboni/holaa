<template>
    <div>
        <div v-show="false">
            {{componente = $props.componente}}
        </div>
        <div class="d-flex justify-content-end mt-3 mb--1">
            <button class="btn btn-sm btn-azul-sena mb--4" @click="mostrar = true, texto_ayuda = componente.texto_ayuda"><i class="fas fa-edit"></i></button>            
        </div>
        <div v-if="componente.etiqueda == 'input text'">
            <label class="font-weight-bold">{{componente.texto_ayuda}}<span v-if="componente.requerido" class="text-danger">*</span>:</label>
            <input
            type="text"
            class="form-control"
            :name="'text' + componente.id"
            :id="'text' + componente.id"
            :placeholder="'Ingresa ' + componente.texto_ayuda"
            v-model="componente.nombre_dato"
            v-validate="{ required: componente.requerido}"/>
            <small v-show="errors.has('lugar')" class="text-danger">
                {{ errors.first("lugar") }}
            </small>
        </div>

        <div v-if="componente.etiqueda == 'input radio'">
            <label class="font-weight-bold">{{componente.texto_ayuda}}</label>
            <input
            type="radio"
            class="form-control"
            :name="'radio' + componente.id"
            :id="'radio' + componente.id"
            v-model="componente.nombre_dato"
            v-validate="{ required: componente.requerido}"/>
            <small v-show="errors.has('lugar')" class="text-danger">
                {{ errors.first("lugar") }}
            </small>
        </div>

        <div v-if="componente.etiqueda == 'file'">
            <label class="font-weight-bold">{{componente.texto_ayuda}}<span v-if="componente.requerido" class="text-danger">*</span>:</label>
            <input
            type="file"
            class="form-control"
            :name="'file' + componente.id"
            :id="'file' + componente.id"
            v-validate="{ required: componente.requerido}"/>
            <small v-show="errors.has('lugar')" class="text-danger">
                {{ errors.first("lugar") }}
            </small>
        </div>

        <div v-if="componente.etiqueda == 'text area'">
            <label class="font-weight-bold">{{componente.texto_ayuda}}<span v-if="componente.requerido" class="text-danger">*</span>:</label>
            <textarea class="form-control mb-3"
                v-model="componente.nombre_dato"
                :placeholder="'Ingresa ' + componente.texto_ayuda"
                :name="'text_area' + componente.id"
                :id="'text_area' + componente.id"
                v-validate="'required'"></textarea>
        </div>
              <div class="row">
        <div class="col-md-4">
          <modal
            :show.sync="mostrar"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm modal-lg">
            <template slot="header">
              <h1 class="text-azul-sena modal-title" id="modalNovedadesAprendiz">
                COMPONENTE
              </h1>
            </template>
            <card
              type="white"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0 ">
              <template class="row">
                <div class="col-lg-6 col-sm-12 py-2 center">
                    <label for="">Nombre del dato</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="texto_ayuda"/>
                </div>
                <div class="col-lg-6 col-sm-12 py-2 center">
                    <label>Requerido</label>
                    <div>
                        <label class="custom-toggle">
                            <input
                            type="checkbox"
                            v-model="requerido"
                            :value="true"
                            :checked="false"/>
                            <span
                            class="custom-toggle-slider rounded-circle"
                            data-label-off="NO"
                            data-label-on="SI"
                            ></span>
                        </label>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                  <button class="btn btn-azul-sena col-12 col-md-6" @click="guardarDatosComponete()">Adjudicar</button>
                </div>
              </template>
            </card>
          </modal>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PicConvocatoriaDatos } from './CrearFormulario.vue';

@Component
export default class CrearComponente extends Vue {
    @Prop() componente: PicConvocatoriaDatos;
    mostrar = false
    requerido = false
    texto_ayuda = ''
    mounted(){
    }
    guardarDatosComponete(){
        this.componente.texto_ayuda = this.texto_ayuda;
        this.componente.requerido = this.requerido
        this.mostrar = false;
    }
}
</script>

<style>

</style>