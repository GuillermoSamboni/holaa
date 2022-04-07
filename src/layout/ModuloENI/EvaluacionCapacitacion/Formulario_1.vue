<template>
  <div class="card-body row">
    <div class="col-12 col-md-8 mx-auto">
      <p class="mt-3">
        Marque con una x la selección deseada teniendo en cuenta la siguiente
        escala de valoración:
      </p>
      <label class="">
        Si calificó alguna pregunta entre 1 y 3 por favor justifique su
        respuesta
      </label>
      <table
        class="table table-bordered table-responsive"
        v-if="$props.contenidoCurso != undefined"
      >
        <div v-show="false">
          {{ (preguntas = $props.contenidoCurso) }}
        </div>
        <thead>
          <tr>
            <th style="white-space: normal !important">
              {{ $props.contenidoCurso.pic_grupo_pregunta }}
            </th>
            <th class="alinear">1</th>
            <th class="alinear">2</th>
            <th class="alinear">3</th>
            <th class="alinear">4</th>
            <th class="alinear">5</th>
            <th class="alinear">Justificar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contenido, index) in preguntas.pic_pregunta" :key="index">
            <td class="w-50">{{ contenido.pic_pregunta }}</td>
            <td
              class="alinear"
              style="padding: 0 !important;"
              @click="mostrar(1, contenido), guardarRespuestas()"
            >
              <p v-if="contenido.calificacion == 1">X</p>
            </td>
            <td
              class="alinear"
              style="padding: 0 !important;"
              @click="mostrar(2, contenido), guardarRespuestas()"
            >
              <p v-if="contenido.calificacion == 2">X</p>
            </td>
            <td
              class="alinear"
              style="padding: 0 !important;"
              @click="mostrar(3, contenido), guardarRespuestas()"
            >
              <p v-if="contenido.calificacion == 3">X</p>
            </td>
            <td
              class="alinear"
              style="padding: 0 !important;"
              @click="mostrar(4, contenido), guardarRespuestas()"
            >
              <p v-if="contenido.calificacion == 4">X</p>
            </td>
            <td
              class="alinear"
              style="padding: 0 !important;"
              @click="mostrar(5, contenido), guardarRespuestas()"
            >
              <p v-if="contenido.calificacion == 5">X</p>
            </td>
            <td class="alinear" style="padding: 0 !important;">
              <button
                class="btn btn-sm bg-azul-sena text-white m-0"
                :disabled="
                  contenido.calificacion == 0 || contenido.calificacion >= 4
                "
                @click="
                  (juntificacion = true),
                    (posPregunta = index),
                    (respuesta = contenido.justificacion_respuesta)
                "
              >
                <i class="fab fa-stack-exchange"></i>
              </button>
              <span
                v-if="
                  contenido.calificacion < 4 &&
                    contenido.calificacion != 0 &&
                    contenido.justificacion_respuesta == ''
                "
                class="text-danger font-weigth-bold ml--1 obligatorio-btn"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-md-4">
          <modal
            :show.sync="juntificacion"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm modal-lg"
          >
            <template slot="header">
              <h1
                class="text-azul-sena modal-title"
                id="modalNovedadesAprendiz"
              >
                JUSTIFICA TU RESPUESTA
              </h1>
            </template>
            <card
              type="white"
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0 "
            >
              <label class="ml-4 font-weight-bold">
                Si calificó alguna pregunta entre 1 y 3 por favor justifique su
                respuesta:
              </label>
              <template class="row">
                <!-- campo fecha -->
                <div class="col-12 py-2 center">
                  <div class="form-group">
                    <textarea
                      :disabled="!crear && ver"
                      rows="3"
                      class="form-control mb-3"
                      v-model="respuesta"
                      placeholder="Justifique su respuesta"
                      name="calificacion_tabal_1"
                      id="calificacion_tabal_1"
                      v-validate="'required'"
                    ></textarea>
                  </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                  <button
                    class="btn btn-azul-sena col-12 col-md-6"
                    @click="guardarJustificacion()"
                  >
                    Guardar
                  </button>
                </div>
              </template>
            </card>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import { Tabla } from "./VerDetalleEvaluacionCapacitacion.vue";

@Component
export default class Formulario1 extends Vue {
  ver: any = false;
  crear: any = true;
  @Prop() contenidoCurso: Tabla;
  preguntas: Tabla = new Tabla();
  juntificacion = false;
  posPregunta = 0;
  respuesta = "";

  mounted() {
    if (
      this.$route.params.ver != undefined &&
      this.$route.params.crear != undefined
    ) {
      this.ver = this.$route.params.ver;
      this.crear = this.$route.params.crear;
    }
  }
  mostrar(cal: number, pregunta) {
    pregunta.calificacion = cal;
  }
  guardarJustificacion() {
    this.preguntas.pic_pregunta[
      this.posPregunta
    ].justificacion_respuesta = this.respuesta.trim();
    this.respuesta = "";
    this.juntificacion = false;
    this.guardarRespuestas();
  }
  guardarRespuestas() {
    this.$emit("respFormulario1", this.preguntas);
  }
}
</script>

<style>
.alinear {
  text-align: center;
  padding: 0 !important;
  vertical-align: middle !important;
}
.alinear p {
  margin: 0;
  color: #238276;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  height: 100% !important;
}
.table-bordered td {
  border-color: rgb(156, 156, 156);
}
</style>
