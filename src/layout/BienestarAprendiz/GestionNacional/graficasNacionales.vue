<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div id="campo">
            <div>
              <label class="mt-2 font-weight-bold">
                Ubicación Deseada
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:
              </label>
              <select class="form-control" id="regional" name="regional">
                <option value="" selected disabled>
                  Seleccione la Ubicación
                </option>
                <option
                  v-for="(listaR, index) in listaRegionales"
                  :key="index"
                  :value="listaR.id_regional"
                >
                  {{ listaR.regional }}
                </option>
              </select>
              <!-- v-validate="{ required }" -->
              <small
                v-show="errors.has('regional')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("regional") }}
              </small>
            </div>
          </div>

          <div id="campo">
            <div>
              <label class="mt-2 font-weight-bold">
                Centro De Formación
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:
              </label>
              <select class="form-control" id="regional" name="regional">
                <option value="" selected disabled>
                  Seleccione Su Centro De Formación
                </option>
                <option
                  v-for="(listaC, index) in listaCentros"
                  :key="index"
                  :value="listaC.id_centro_formacion"
                >
                  {{ listaC.centro_formacion }}
                </option>
              </select>
              <!-- v-validate="{ required }" -->
              <small
                v-show="errors.has('regional')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("regional") }}
              </small>
            </div>
          </div>

          <div id="campo">
            <div>
              <label class="mt-2 font-weight-bold">
                Convocatorias
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:
              </label>
              <select class="form-control" id="regional" name="regional" v-model="convocatoriaInfo.id_convocatoria"
              @change="convocatoria()">
                <option value="" selected disabled>
                  Seleccione Su Convocatoria
                </option>
                <option
                  v-for="(listaC, index) in listaConvocatorias"
                  :key="index"
                  :value="listaC.id_convocatoria"
                >
                  {{ listaC.convocatoria }}
                </option>
              </select>
              <!-- v-validate="{ required }" -->
              <small
                v-show="errors.has('regional')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("regional") }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import component from "vue-class-component";
import Axios from "@/Axios";
import Swal from "sweetalert2";

@component({
  components: {},
})
export default class graficasNacionales extends Vue {
  listaRegionales: any[] = [];
  listaCentros: any[] = [];
  listaConvocatorias: any[] = [];

  convocatoriaInfo = {
    id_convocatoria : ""
  };



  mounted() {
    this.obtenerRegionales();
    this.obtenerListaConvocatorias();
    this.obtenerListaCentros();
    this.listarVistaActividades();
  }

  obtenerRegionales() {
    Axios()
      .get("listar_regional_convenio")
      .then((respuesta) => {
        this.listaRegionales = respuesta.data.results;
      });
  }
  obtenerListaConvocatorias() {
    Axios()
      .get(
        "listar_convocatorias/" +
          JSON.parse(sessionStorage.getItem("usuario")).id_usuario
      )
      .then((respuesta) => {
        this.listaConvocatorias = respuesta.data.results;
      });
  }
  obtenerListaCentros() {
    Axios()
      .get(
        "listar_centros_regional/" +
          JSON.parse(sessionStorage.getItem("usuario")).id_usuario
      )
      .then((respuesta) => {
        this.listaCentros = respuesta.data.results;
      });
  }
  convocatoria(){
    Axios()
    .get("listar_convocatoria/"+ this.convocatoriaInfo.id_convocatoria )
    .then((respuesta)=>{
    })
  }
  listarVistaActividades(){
    Axios()
    .get("listar_vista_actividades")
    .then((respuesta)=>{
    })
  }
}
</script>