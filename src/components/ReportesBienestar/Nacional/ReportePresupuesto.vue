<template>
  <div class="mt-4">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REPORTES PRESUPUESTOS NACIONAL</h1>
      </div>
      <div class="text-center" v-if="!estadoPeticionTabla">
        <AnimacionTablasCargando></AnimacionTablasCargando>
      </div>
      <div v-if="estadoPeticionTabla">
        <button
          block
          type="default"
          class="btn btn-block btn-azul-sena ml-0"
          @click="verGraficas = true"
          v-if="verGraficas == false"
        >
          Ver tabla
        </button>
        <button
          block
          type="default"
          class="btn btn-block btn-azul-sena ml-0"
          @click="verGraficas = false"
          v-if="verGraficas == true"
        >
          Ver gráficas
        </button>
        <div
          id="carouselExampleInterval"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" data-interval="200">
              <!-- Card stats -->
              <div class="row mx-5">
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-green
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto total Nacional
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            presupuestoConvTotal
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-cyan
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5
                            class="
                              card-title
                              text-uppercase text-muted
                              mb-0
                              row
                            "
                          >
                            Presupuesto Programado
                          </h5>
                          <h5
                            class="
                              card-title
                              text-uppercase text-muted
                              mb-0
                              row
                            "
                          >
                            Convocatorias
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            presupuestoConProgramado
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-info
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-user-friends"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Total Convocatorias
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            listaPresupuestoNacional.length
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-item" data-interval="200">
              <div class="row mx-5">
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-green
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto Fase Creación
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            totalPresupuestoConCreacion
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-cyan
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto Fase Inscripción
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            totalPresupuestoConInscripcion
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-info
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto Fase Ejecución
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            totalPresupuestoEjecucion
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row mx-4">
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-blue
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto Fase Adjudicación
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            totalPresupuestoAdjudicacion
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-yellow
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto Fase Cancelación
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            numFaseConvCancelacion
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-orange
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto Fase Finalizada
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            totalPresupuestoConvFinalizada
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row mx-4">
                <div class="col-xl-4 col-md-6 mt-2">
                  <div class="card card-stats">
                    <!-- Card body -->
                    <div class="card-body">
                      <div class="row">
                        <div class="col-auto">
                          <div
                            class="
                              icon icon-shape
                              bg-gradient-red
                              text-white
                              rounded-circle
                              shadow
                            "
                          >
                            <i class="fas fa-dollar-sign"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Presupuesto Fase Cierre
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            numFaseConvCierre
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            class="carousel-control-next"
            href="#carouselExampleInterval"
            role="button"
            data-slide="next"
          >
            <span
              class="carousel-control-next-icon bg-dark"
              aria-hidden="true"
            ></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div class="card" v-show="verGraficas == true">
          <div class="row">
            <div class="col-lg-2 col-md-12 col-sm-12">
              <div class="mt-5">
                <base-button
                  block
                  type="default"
                  class="btn btn-block btn-azul-sena ml-0 p-2"
                  @click="filtroNacional()"
                >
                  Nacional
                </base-button>
              </div>

              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="regional"
                  @change="
                    obtenerCentrosRegional(regional.id_regional),
                      regionalFiltrado()
                  "
                >
                  <option value="" selected disabled>Regional</option>
                  <option
                    v-for="(regional, key) in listaRegionales"
                    :key="key"
                    v-bind:value="regional"
                  >
                    {{ regional.regional }}
                  </option>
                </select>
              </div>
              <div v-if="regional.regional != null" class="mt-2">
                <div class="mt-2">
                  <select
                    class="form-control"
                    id="sector"
                    name="sector"
                    v-model="filterCentro"
                    @change="filtroCentro()"
                  >
                    <option value="" selected disabled>Centros</option>
                    <option
                      v-for="(centroFiltrado, key) in listaCentroFormacion"
                      v-bind:value="centroFiltrado.centro_formacion"
                      :key="key"
                    >
                      {{ centroFiltrado.centro_formacion }}
                    </option>
                    <!-- <option value="">Seleccionar todos los centros</option> -->
                  </select>
                </div>
              </div>

              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterApoyo"
                  @change="filtroApoyo()"
                >
                  <option value="" selected disabled>Tipos de apoyo</option>
                  <option value="">Todas</option>
                  <option
                    v-for="(tipoApoyo, index) in listaApoyos"
                    :key="index"
                    v-bind:value="tipoApoyo.tipo_apoyo"
                  >
                    {{ tipoApoyo.tipo_apoyo }}
                  </option>
                  <!-- <option value="">Seleccionar todos los apoyos</option> -->
                  opoyo
                </select>
              </div>

              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterFase"
                  @change="filtroFases()"
                >
                  <option value="" selected disabled>Fases</option>
                  <option
                    v-for="(fase, index) in listaFases"
                    :key="index"
                    v-bind:value="fase.fase_bienestar"
                  >
                    {{ fase.fase_bienestar }}
                  </option>
                  <option value="">Selecionar toadas las fases</option>
                </select>
              </div>

              <div class="mt-2">
                <button
                  block
                  type="default"
                  class="btn btn-block btn-oscuro-sena p-2"
                  @click="exportExcel()"
                >
                  Generar Reporte
                </button>
              </div>
            </div>
            <div class="col-lg-10 col-md-12 col-sm-12">
              <paginate-links
                class="pagination justify-content-end"
                for="listaPresupuestoNacionalFiltrado"
                :limit="2"
                :hide-single-page="true"
                :show-step-links="true"
                :full-page="true"
                :classes="{
                  ul: 'simple-links-container',
                  li: 'simple-links-item',
                  liActive: ['simple-links-item', 'active1'],
                  'li.active': 'active1',
                }"
              >
              </paginate-links>

              <!-- TABLA MOSTRAR -->
              <div class="table-responsive">
                <paginate
                  ref="paginator"
                  name="listaPresupuestoNacionalFiltrado"
                  :list="listaPresupuestoNacionalFiltrado"
                  :per="10"
                >
                  <table class="table table-hoverble">
                    <thead id="listado">
                      <tr>
                        <th class="text-nowrap">Convocatoria</th>
                        <th class="text-nowrap">Regional</th>
                        <th class="text-nowrap">Centro Formacion</th>
                        <th class="text-nowrap">Cupo Total</th>
                        <th class="text-nowrap">Presupuesto Convocatoria</th>
                        <th class="text-nowrap">Presupuesto Programado</th>
                        <th class="text-nowrap">Presupuesto Pagado</th>
                        <th class="text-nowrap">Tipo Apoyo</th>
                        <th class="text-nowrap">Fase</th>
                        <th class="text-nowrap">Vigencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="listaPresupuestoNacionalFiltrado != null">
                        <tr
                          v-for="(convocatoria, key) in paginated(
                            'listaPresupuestoNacionalFiltrado'
                          )"
                          :key="key"
                        >
                          <td>
                            {{ convocatoria.convocatoria }}
                          </td>

                          <td>
                            {{ convocatoria.regional }}
                          </td>

                          <td>
                            {{ convocatoria.centro_formacion }}
                          </td>

                          <td>
                            {{ convocatoria.cupo_total }}
                          </td>

                          <td>
                            {{ convocatoria.prespuesto_convocatoria }}
                          </td>

                          <td>
                            {{
                              parseFloat(convocatoria.prespuesto_convocatoria) /
                              parseFloat(convocatoria.cupo_total)
                            }}
                          </td>

                          <td>
                            {{ convocatoria.presupuesto_pagado }}
                          </td>

                          <td>
                            {{ convocatoria.tipo_apoyo }}
                          </td>

                          <td>
                            {{ convocatoria.fase_bienestar }}
                          </td>

                          <td>
                            {{ convocatoria.vigencia }}
                          </td>
                        </tr>
                      </template>
                      <tr v-else>
                        No hay convocatorias
                      </tr>
                    </tbody>
                  </table>
                </paginate>
              </div>
              <paginate-links
                class="pagination justify-content-end"
                for="listaPresupuestoNacionalFiltrado"
                :limit="2"
                :hide-single-page="true"
                :show-step-links="true"
                :full-page="true"
                :classes="{
                  ul: 'simple-links-container',
                  li: 'simple-links-item',
                  liActive: ['simple-links-item', 'active1'],
                  'li.active': 'active1',
                }"
              >
              </paginate-links>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body" v-show="verGraficas == false">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12">
            <canvas></canvas>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12">
            <canvas></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import XLSX from "xlsx";
import Chart from "chart.js";
import BarChart from "@/components/Charts/BarChart";
import AnimacionTablasCargando from "@/components/animacionCargando.vue";

export default {
  name: "ReportePresupuesto",
  mounted() {
    this.obtenerRegionales();
    this.obtenerPresupuestos();
    this.obtenerApoyos();
    this.obtenerFases();
  },
  components: {
    AnimacionTablasCargando,
    BarChart,
  },
  data() {
    return {
      verGraficas: false,
      canvas: document.getElementsByTagName("canvas"),
      listaPresupuestoNacional: [],
      listaPresupuestoNacionalFiltrado: [],
      totalPresupuestoNacional: 0,
      presupuestoProgramado: 0,
      paginate: ["listaPresupuestoNacionalFiltrado"],
      listaCentroFormacionFiltrado: [],
      listaCentroFormacion: [],
      regional: {
        id_regional: null,
        regional: null,
      },
      listaRegionales: [],
      listaApoyos: [],
      listaFases: [],
      filterFase: "",
      filterApoyo: "",
      filterCentro: "",
      numConvocatorias: 0,
      numFaseConvCreacion: 0,
      numFaseConvCancelacion: 0,
      numFaseConvFinalizada: 0,
      numFaseConvAdjudicacion: 0,
      numFaseConvInscripcion: 0,
      totalPresupuestoEjecicion: 0,
      numFaseConvEjecucion: 0,
      numFaseConvCierre: 0,
      totalPresupuestoConvFinalizada: 0,
      presupuestoConvTotal: 0,
      presupuestoConProgramado: 0,
      totalPresupuestoConCreacion: 0,
      totalPresupuestoConInscripcion: 0,
      totalPresupuestoEjecucion: 0,
      totalPresupuestoCancelacion: 0,
      totalPresupuestoAdjudicacion: 0,
      estadoPeticionTabla: false,
    };
  },
  methods: {
    obtenerRegionales() {
      Axios()
        .get("listar_regionales")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaRegionales = respuesta.data.results;
            this.regional_escogida = respuesta.data.results.id_regional;
          } else {
            Swal.fire({
              title: "No se encontro regionales",
              text: respuesta.data.message,
              icon: respuesta.data.status,
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
          }
        });
    },
    obtenerApoyos() {
      Axios()
        .get("crear_tipos_apoyo")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaApoyos = respuesta.data.results.tipos_apoyo;
          }
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    obtenerCentrosRegional(id_regional) {
      Axios()
        .get("listar_centro_formacion_regional/" + id_regional)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaCentroFormacion = respuesta.data.results;
            this.listaCentroFormacionFiltrado = respuesta.data.results;
          } else {
            Swal.fire({
              title: "No se encontró regionales",
              text: respuesta.data.message,
              icon: respuesta.data.status,
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
          }
        });
    },
    obtenerFases() {
      Axios()
        .get("crear_convocatoria")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaFases = respuesta.data.results.fases_bienestar;
          }
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },

    async obtenerPresupuestos() {
      await Axios()
        .get("reportesPresupuestosBienestar")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaPresupuestoNacional = respuesta.data.results;
            this.listaPresupuestoNacionalFiltrado = respuesta.data.results;
            this.generarContadoresPorFase();
          } else {
            Swal.fire(
              (respuesta.data.status + "!").toString().toUpperCase(),
              respuesta.data.message,
              respuesta.data.status
            );
          }
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        })
        .finally(() => {
          this.estadoPeticionTabla = true;
        });
    },

    async generarContadoresPorFase() {
      for (let i of this.listaPresupuestoNacional) {
        if (i.prespuesto_convocatoria) {
          this.presupuestoConvTotal =
            this.presupuestoConvTotal + parseFloat(i.prespuesto_convocatoria);

          let calcularProgramado = i.prespuesto_convocatoria / i.cupo_total;
          this.presupuestoConProgramado =
            this.presupuestoConProgramado + calcularProgramado;
        }
        if (i.fase_bienestar == "Creación") {
          this.numFaseConvCreacion = this.numFaseConvCreacion + 1;
          this.totalPresupuestoConCreacion =
            this.totalPresupuestoConCreacion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Cancelación") {
          this.numFaseConvCancelacion = this.numFaseConvCancelacion + 1;
          this.totalPresupuestoCancelacion =
            this.totalPresupuestoCancelacion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Finalizada\n") {
          this.numFaseConvFinalizada = this.numFaseConvFinalizada + 1;
          this.totalPresupuestoConvFinalizada =
            this.totalPresupuestoConvFinalizada +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Ejecución") {
          this.numFaseConvEjecucion = this.numFaseConvEjecucion + 1;
          this.totalPresupuestoEjecucion =
            this.totalPresupuestoEjecucion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Adjudicación") {
          this.numFaseConvAdjudicacion = this.numFaseConvAdjudicacion + 1;
          this.totalPresupuestoAdjudicacion =
            this.totalPresupuestoAdjudicacion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Inscripción") {
          this.numFaseConvInscripcion = this.numFaseConvInscripcion + 1;
          this.totalPresupuestoConInscripcion =
            this.totalPresupuestoConInscripcion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Cierre") {
          this.numFaseConvCierre = this.numFaseConvCierre + 1;
        }
      }
      this.graficas();
      // alert(this.totalPresupuestoConCreacion);
    },
    async graficas() {
      new Chart(this.canvas[0], {
        type: "bar",
        data: {
          labels: [
            "Total Convocatorias",
            "Creacion",
            "Cancelación",
            "Finalizada",
            "Ejecución",
            "Adjudicación",
            "Inscripción",
            "Inscripción",
          ],
          datasets: [
            {
              label: "Total Convocatorias por fase",
              data: [
                this.listaPresupuestoNacional.length,
                this.numFaseConvCreacion,
                this.numFaseConvCancelacion,
                this.numFaseConvFinalizada,
                this.numFaseConvEjecucion,
                this.numFaseConvAdjudicacion,
                this.numFaseConvInscripcion,
                this.numFaseConvCierre,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
                "rgba(205, 203, 207, 0.2)",
                "rgba(163, 203, 207, 0.2)",
                "rgba(54, 203, 207, 0.2)",
                "rgba(223, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
      });

      new Chart(this.canvas[1], {
        type: "pie",
        data: {
          labels: [
            "Presupuesto Total",
            "Presupuesto Programado",
            "Presupuesto fase Creación",
            "Presupuesto fase Inscripción",
            "Presupuesto fase Ejecución",
            "Presupuesto fase Adjudicación",
            "Presupuesto fase Cancelación",
            "Presupuesto fase finalizada",
          ],
          datasets: [
            {
              label: "Presupuesto Convocatorias por fase",
              data: [
                this.presupuestoConvTotal,
                this.presupuestoConProgramado,
                this.totalPresupuestoConCreacion,
                this.totalPresupuestoConInscripcion,
                this.totalPresupuestoEjecucion,
                this.totalPresupuestoAdjudicacion,
                this.totalPresupuestoCancelacion,
                this.totalPresupuestoConvFinalizada,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
                "rgba(205, 203, 207, 0.2)",
                "rgba(163, 203, 207, 0.2)",
                "rgba(54, 203, 207, 0.2)",
                "rgba(223, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    },

    regionalFiltrado() {
      let arregloPresupuestoNacionalFiltrado = [];
      for (let presuRegional of this.listaPresupuestoNacional) {
        let regional = presuRegional.regional;
        if (regional.indexOf(this.regional.regional) >= 0) {
          arregloPresupuestoNacionalFiltrado.push(presuRegional);
        }
      }
      this.listaPresupuestoNacionalFiltrado =
        arregloPresupuestoNacionalFiltrado;
      if (this.listaPresupuestoNacionalFiltrado.length == 0) {
        //busco no encontro
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró convocatorias que coincidan con las busqueda",
          showConfirmButton: false,
          // confirmButtonText: "Aceptar",
          // confirmButtonColor: "#238276",
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.regional = null;
        this.listaPresupuestoNacionalFiltrado = this.listaPresupuestoNacional;
      }
    },
    filtroCentro() {
      let arregloFiltrado = [];

      for (let presuRegional of this.listaPresupuestoNacional) {
        let centro = presuRegional.centro_formacion;
        if (centro.indexOf(this.filterCentro) >= 0) {
          arregloFiltrado.push(presuRegional);
        }
        this.listaPresupuestoNacionalFiltrado = arregloFiltrado;
      }
      if (this.listaPresupuestoNacionalFiltrado.length == 0) {
        //busco no encontro
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró convocatorias que coincidan con las busqueda",
          showConfirmButton: false,
          // confirmButtonText: "Aceptar",
          // confirmButtonColor: "#238276",
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.filterCentro = null;
        this.listaPresupuestoNacionalFiltrado = this.listaPresupuestoNacional;
      }
    },

    filtroApoyo() {
      let arregloFiltrado = [];

      for (let presuRegional of this.listaPresupuestoNacional) {
        let apoyo = presuRegional.tipo_apoyo;
        if (apoyo.indexOf(this.filterApoyo) >= 0) {
          arregloFiltrado.push(presuRegional);
        }
        this.listaPresupuestoNacionalFiltrado = arregloFiltrado;
      }
      if (this.listaPresupuestoNacionalFiltrado.length == 0) {
        //busco no encontro
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró convocatorias que coincidan con las busqueda",
          showConfirmButton: false,
          // confirmButtonText: "Aceptar",
          // confirmButtonColor: "#238276",
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.filterApoyo = "";
        this.listaPresupuestoNacionalFiltrado = this.listaPresupuestoNacional;
      }
    },
    filtroFases() {
      let arregloFiltrado = [];

      for (let presuRegional of this.listaPresupuestoNacional) {
        let fase = presuRegional.fase_bienestar;
        if (fase.indexOf(this.filterFase) >= 0) {
          arregloFiltrado.push(presuRegional);
        }
        this.listaPresupuestoNacionalFiltrado = arregloFiltrado;
      }
      if (this.listaPresupuestoNacionalFiltrado.length == 0) {
        //busco no encontro
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró convocatorias que coincidan con las busqueda",
          showConfirmButton: false,
          // confirmButtonText: "Aceptar",
          // confirmButtonColor: "#238276",
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.filterFase = "";
        this.listaPresupuestoNacionalFiltrado = this.listaPresupuestoNacional;
      }
    },

    filtroNacional() {
      this.listaPresupuestoNacionalFiltrado = this.listaPresupuestoNacional;
    },
    exportExcel() {
      let data = XLSX.utils.json_to_sheet(
        this.listaPresupuestoNacionalFiltrado,
        {
          header: [
            "convocatoria",
            "regional",
            "centro_formacion",
            "cupo_total",
            "presupuesto_convocatoria",
            "presupuesto_programado",
            "presupuesto_pagado",
            "tipo_apoyo",
            "fase_bienestar",
            "vigencia",
          ],
        }
      );
      (data["A1"].v = "convocatoria"),
        (data["B1"].v = "regional"),
        (data["C1"].v = "centro formacion"),
        (data["D1"].v = "cupo_total"),
        (data["E1"].v = "presupuesto convocatoria"),
        (data["F1"].v = "presupuesto programado"),
        (data["G1"].v = "presupuesto pagado"),
        (data["H1"].v = "presupuesto pagado"),
        (data["I1"].v = "presupuesto pagado"),
        (data["J1"].v = "tipo apoyo"),
        (data["K1"].v = "fase bienestar"),
        (data["L1"].v = "vigencia");

      const workbook = XLSX.utils.book_new();
      const filename =
        "Reporte Presupuesto" +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1);
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
  },
};
</script>