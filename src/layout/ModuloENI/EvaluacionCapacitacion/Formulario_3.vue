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
          {{ (preguntas2 = $props.contenidoCurso2) }}
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
      <template v-for="(contenido, index) in preguntas2.pic_pregunta">
        <label class="mt-2 font-weight-bold" :key="'titulo' + index">
          {{ contenido.pic_pregunta }}
          <span
            class="text-danger font-weigth-bold"
            tooltip="Campo Requerido"
            tooltip-flow="top"
            >*</span
          >:
        </label>
        <div class="d-flex flex-column" :key="index">
          <label
            v-if="contenido.tipo == 'N'"
            class="custom-toggle text-naranja-sena"
          >
            <input
              type="checkbox"
              v-model="preguntas2.pic_pregunta[1].calificacion"
              :checked="contenido.calificacion == 1"
            />
            <span
              class="custom-toggle-slider rounded-circle"
              style="width: 50px;"
              @click="preguntaCheck(contenido)"></span>
              <p v-if="contenido.calificacion == 0" class="text-dark font-weight-500 ml-5 pl-1" style="width: 30px;">NO</p>
              <p v-else class="text-dark font-weight-500 ml-5 pl-1" style="width: 30px;">SI</p>
          </label>
          <textarea rows="4" v-if="contenido.tipo == 'T' || contenido.calificacion == 0"
            class="form-control"
            v-model="contenido.justificacion_respuesta"
            placeholder="Justifique su respuesta"
            name="tomar_capacitacion"
            id="tomar_capacitacion"
            v-validate="{required : contenido.calificacion == 0}" @keyup="guardarRespuestas()"></textarea>
        </div>
      </template>
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
import { Pregunta, Tabla } from "./VerDetalleEvaluacionCapacitacion.vue";

@Component
export default class Formulario3 extends Vue {
  ver: any = true;
  crear: any = true;
  @Prop() contenidoCurso: Tabla;
  @Prop() contenidoCurso2: Tabla;
  preguntas: Tabla = new Tabla();
  preguntas2: Tabla = new Tabla();
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
  mostrar(cal, objeto) {
    objeto.calificacion = cal;
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
    this.$emit("respFormulario3", this.preguntas);
    this.$emit("respFormulario4", this.preguntas2);
  }
  preguntaCheck(respuesta: Pregunta) {
    if (respuesta.calificacion == 1) {
      respuesta.calificacion = 0;
    } else {
      respuesta.calificacion = 1;
    }
  }
}
</script>

<style></style>
