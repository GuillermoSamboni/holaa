<template>
  <div class="mt-4">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">REPORTES PRESUPUESTO REGIONAL</h1>
        </h1>
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
                <div class="col-xl-4 col-md-6">
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
                <div class="col-xl-4 col-md-6">
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
                <div class="col-xl-4 col-md-6">
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
                <div class="col-xl-4 col-md-6">
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
                <div class="col-xl-4 col-md-6">
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
                <div class="col-xl-4 col-md-6">
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
                            totalPresupuestoEjecicion
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
                <div class="col-xl-4 col-md-6">
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
                            totalPresupuestoAdjudicación
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-6">
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
                <div class="col-xl-4 col-md-6">
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
                            totalPresupuestoFinalizacion
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
                <div class="col-xl-4 col-md-6">
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

              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterApoyo"
                  @change="filtroApoyo()"
                >
                  <option value="" selected disabled>Apoyo</option>
                  <option value="">Todas</option>
                  <option
                    v-for="(apoyo, key) in listaApoyos"
                    :key="key"
                    v-bind:value="apoyo.tipo_apoyo"
                  >
                    {{ apoyo.tipo_apoyo }}
                  </option>
                  apoyo
                </select>
                <!-- v-validate="{ required }" -->
              </div>

              <div class="mt-2 mb-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterFase"
                  @change="filtroFases()"
                >
                  <option value="" selected disabled>Fases</option>
                  <option value="">Todas</option>
                  <option
                    v-for="(fase, key) in listaFases"
                    :key="key"
                    v-bind:value="fase.fase_bienestar"
                  >
                    {{ fase.fase_bienestar }}
                  </option>
                </select>
                <!-- v-validate="{ required }" -->
              </div>

              <div class="mt-2">
                <button
                  block
                  type="default"
                  class="btn btn-block btn-oscuro-sena ml-0 p-2"
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

      <div
        class="card-body"
        v-show="verGraficas == false && estadoPeticionTabla"
      >
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
    this.obtenerCentrosRegional(
      JSON.parse(sessionStorage.getItem("usuario")).regional_id
    );
    this.obtenerPresupuestos();
    this.obtenerApoyos();
    this.obtenerFases();
    this.graficas();
  },
  components: {
    AnimacionTablasCargando,
    BarChart,
  },
  data() {
    return {
      verGraficas: false,
      canvas: document.getElementsByTagName("canvas"),
      usuario: JSON.parse(sessionStorage.getItem("usuario")),
      listaCentroFormacion: [],
      listaCentroFormacionFiltrado: [],
      listaApoyos: [],
      listaFases: [],
      listaPresupuestoNacional: [],
      listaPresupuestoNacionalFiltrado: [],
      filterCentro: "",
      paginate: ["listaPresupuestoNacionalFiltrado"],
      listaRegionales: [],
      filterFase: "",
      filterApoyo: "",
      filterCentro: "",
      regional: {
        id_regional: null,
        regional: null,
      },
      numConvocatorias: 0,
      numFaseConvCreacion: 0,
      numFaseConvCancelacion: 0,
      numFaseConvFinalizada: 0,
      numFaseConvAdjudicacion: 0,
      numFaseConvInscripcion: 0,
      totalPresupuestoEjecicion: 0,
      totalPresupuestoEjecicion: 0,
      numFaseConvEjecucion: 0,
      numFaseConvCierre: 0,
      totalPresupuestoConvFinalizada: 0,
      presupuestoConvTotal: 0,
      presupuestoConProgramado: 0,
      totalPresupuestoConCreacion: 0,
      totalPresupuestoConInscripcion: 0,
      totalPresupuestoAdjudicacion: 0,
      totalPresupuestoCancelacion: 0,
      totalPresupuestoFinalizacion: 0,
      estadoPeticionTabla: false,
    };
  },
  methods: {
    obtenerPresupuestos() {
      Axios()
        .get("reportesPresupuestosBienestar")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaPresupuestoNacional = respuesta.data.results;
            this.listaPresupuestoNacionalFiltrado = respuesta.data.results;
            this.recorrerPresupuesto(
              respuesta.data.status,
              respuesta.data.message
            );
            // this.recorrerPresupuesto();
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

    async recorrerPresupuesto(status, message) {
      let arregloFiltrado = [];
      for (let presupuesto of this.listaPresupuestoNacional) {
        let regional = presupuesto.regional;
        if (
          regional.indexOf(
            JSON.parse(sessionStorage.getItem("usuario")).regional
          ) >= 0
        ) {
          arregloFiltrado.push(presupuesto);
        }
        this.listaPresupuestoNacional = arregloFiltrado;
        this.listaPresupuestoNacionalFiltrado = arregloFiltrado;
      }
      this.generarContadoresPorFase();

      if (this.listaPresupuestoNacionalFiltrado < 0) {
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
    obtenerCentrosRegional(id_regional) {
      Axios()
        .get("listar_centro_formacion_regional/ " + id_regional)
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
    filtroRegional() {
      let arregloFiltrado = [];

      for (let presupuesto of this.listaPresupuestoNacional) {
        let regional = presupuesto.regional;
        if (regional.indexOf(this.regional.regional) >= 0) {
          arregloFiltrado.push(presupuesto);
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
    filtroApoyo() {
      let arregloFiltrado = [];

      for (let presupuesto of this.listaPresupuestoNacional) {
        let apoyo = presupuesto.tipo_apoyo;
        if (apoyo.indexOf(this.filterApoyo) >= 0) {
          arregloFiltrado.push(presupuesto);
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
    filtroFases() {
      let arregloFiltrado = [];

      for (let presupuesto of this.listaPresupuestoNacional) {
        let fase = presupuesto.fase_bienestar;
        if (fase.indexOf(this.filterFase) >= 0) {
          arregloFiltrado.push(presupuesto);
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

    generarContadoresPorFase() {
      for (let i of this.listaPresupuestoNacional) {
        if (i.prespuesto_convocatoria) {
          this.presupuestoConvTotal =
            this.presupuestoConvTotal + parseFloat(i.prespuesto_convocatoria);

          let calcularProgramado = i.prespuesto_convocatoria / i.cupo_total;
          this.presupuestoConProgramado =
            this.presupuestoConProgramado + calcularProgramado;
        }
        if (i.fase_bienestar == "Creación") {
          this.totalPresupuestoConInscripcion =
            this.totalPresupuestoConInscripcion + 1;

          this.numFaseConvCreacion = this.numFaseConvCreacion + 1;
          this.totalPresupuestoConCreacion =
            this.totalPresupuestoConCreacion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Cancelación") {
          this.numFaseConvCancelacion = this.numFaseConvCancelacion + 1;
          this.totalPresupuestoCancelacion = this.totalPresupuestoCancelacion + parseFloat(i.prespuesto_convocatoria)
        } else if (i.fase_bienestar == "Finalizada\n") {
          this.numFaseConvFinalizada = this.numFaseConvFinalizada + 1;
          this.totalPresupuestoConvFinalizada =
            this.totalPresupuestoConvFinalizada +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Ejecución") {
          this.numFaseConvEjecucion = this.numFaseConvEjecucion + 1;
          this.totalPresupuestoEjecicion=this.totalPresupuestoEjecicion + parseFloat(i.prespuesto_convocatoria)
        } else if (i.fase_bienestar == "Adjudicación") {
          this.numFaseConvAdjudicacion = this.numFaseConvAdjudicacion + 1;
          this.totalPresupuestoAdjudicación =
            this.totalPresupuestoAdjudicacion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Inscripción") {
          this.numFaseConvInscripcion = this.numFaseConvInscripcion + 1;
          this.totalPresupuestoConInscripcion =
            this.totalPresupuestoConInscripcion +
            parseFloat(i.prespuesto_convocatoria);
        } else if (i.fase_bienestar == "Cierre") {
          this.numFaseConvCierre = this.numFaseConvCierre + 1;
          this.totalPresupuestoFinalizacion =
            this.totalPresupuestoFinalizacion +
            parseFloat(i.prespuesto_convocatoria);
        }
      }
      this.graficas();
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
          ],
        }
      );
      (data["A1"].v = "convocatoria"),
        (data["B1"].v = "regional"),
        (data["C1"].v = "centro formacion"),
        (data["D1"].v = "cupo_total");

      const workbook = XLSX.utils.book_new();
      const filename =
        "Reporte Presupuesto" +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1);
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    graficas() {
      new Chart(this.canvas[0], {
        type: "bar",
        data: {
          labels: [
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
              label: "Convocatorias por Fases",
              data: [
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
                this.totalPresupuestoEjecicion,
                this.totalPresupuestoAdjudicacion,
                this.totalPresupuestoCancelacion,
                this.totalPresupuestoFinalizacion,
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
  },
};
</script>