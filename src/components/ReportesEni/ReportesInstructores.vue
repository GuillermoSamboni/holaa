<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <h1 class="text-azul-sena">Reportes Instructores ENI</h1>
      <div>
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
                            bg-gradient-cyan
                            text-white
                            rounded-circle
                            shadow
                          "
                        >
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5
                          class="card-title text-uppercase text-muted mb-0 row"
                        >
                          instructores Inscritos
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                        listaInstructores.length
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Inscrito
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          numFaseInscrito
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Adjudicado
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          numFaseAdjudicado
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
                          <i class="fas fa-plus-square"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          No Aceptados
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                         numFaseNoAceptado
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Finalizado No Aprobado
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                         numFasefinalizado
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Finalizado Aprobado
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                         numFaseFinalAprobado
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Cancelado
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          numFaseCancelado
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
      <div class="card-body" v-show="verGraficas == true">
        <div class="row">
          <div class="col-lg-2 col-md-12 col-sm-12">
            <div class="mt-5">
              <select
                class="form-control"
                id="sector"
                name="sector"
                v-model="regional"
                @change="
                  obtenerCentros(regional.id_regional), regionalFiltrado()
                "
              >
                <option value="" selected disabled>Regional</option>
                <option
                  v-for="(regional, key) in listarRegional"
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
                    v-for="(centroFiltrado, key) in listarCentros"
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
                v-model="filterFecha"
                @change="FechaFiltrado()"
              >
                <option value="" selected disabled>Fecha</option>
                <option
                  v-for="(fecha, index) in listarfechaspic"
                  v-bind:value="fecha.plan_institucional_id"
                  :key="index"
                >
                  {{ fecha.plan_institucional_id }}
                </option>
              </select>
            </div>
            <div class="mt-2">
              <button
                block
                type="default"
                class="btn btn-block btn-azul-sena ml-0"
                @click="exportExcel()"
              >
                Generar Reporte
              </button>
            </div>
          </div>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <paginate-links
              class="pagination justify-content-end"
              for="listaInstructoresFiltrado"
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
                name="listaInstructoresFiltrado"
                :list="listaInstructoresFiltrado"
                :per="5"
              >
                <table class="table table-hoverble">
                  <thead id="listado">
                    <tr>
                      <th class="text-nowrap">Nombre</th>
                      <th class="text-nowrap">Convocatoria</th>
                      <th class="text-nowrap">Estado Inscripcion</th>
                      <th class="text-nowrap">Año</th>
                      <th class="text-nowrap">Centro Formacion</th>
                      <th class="text-nowrap">Regional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="listaInstructoresFiltrado != null">
                      <tr
                        v-for="(instructores, key) in paginated(
                          'listaInstructoresFiltrado'
                        )"
                        :key="key"
                      >
                        <td>
                          {{ instructores.primer_nombre }}
                        </td>
                        <td>
                          {{ instructores.convocatoria }}
                        </td>
                        <td>
                          {{ instructores.pic_estado_inscripcion }}
                        </td>
                        <td>
                          {{ instructores.plan_institucional_id }}
                        </td>
                        <td>
                          {{ instructores.centro_formacion }}
                        </td>
                        <td>
                          {{ instructores.regional }}
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
              for="listaInstructoresFiltrado"
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
        <div class="col-lg-5 col-md-12 col-sm-12">
          <canvas></canvas>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import Axios from "@/Axios";
import XLSX from "xlsx";
import Swal from "sweetalert2";
import BarChart from "@/components/Charts/BarChart";
import AnimacionTablasCargando from "@/components/animacionCargando.vue";
export default {
  name: "ReporteInstructor",

  mounted() {
    this.obtenerInstructores();
    this.obtenerRegional();
    this.ontenerPlanInstitucional();
  },

  data: function () {
    return {
      verGraficas: false,
       canvas: document.getElementsByTagName("canvas"),
      listaInstructores: [],
      listaInstructoresFiltrado: [],
      paginate: ["listaInstructoresFiltrado"],
      listarRegional: [],
      listarCentros: [],
      selec_regional: null,
      regional: {
        id_regional: null,
        regional: null,
      },
      listarfechaspic: [],
      filterCentro: "",
      filterFecha: "",
      numFaseInscrito:0,
      numFaseAdjudicado:0,
      numFaseNoAceptado:0,
      numFasefinalizado:0,
      numFaseFinalAprobado:0,
      numFaseCancelado:0,
      numFecha2021:0,
      numFecha2022:0,
    };
  },
  methods: {
    obtenerInstructores() {
      Axios()
        .get("listar_incripciones")
        .then((respuesta) => {
          this.listaInstructores = respuesta.data.results;
          this.listaInstructoresFiltrado = respuesta.data.results;
          this.generarEstado();
        });
    },
     async generarEstado() {
      for (let i of this.listaInstructores) {
        if (i.pic_estados_inscripcion == "Inscrito") {
          this.numFaseInscrito = this.numFaseInscrito + 1;
        } else if (i.pic_estado_inscripcion == "Adjudicado") {
          this.numFaseAdjudicado = this.numFaseAdjudicado + 1;
        } else if (i.pic_estado_inscripcion == "No aceptado") {
          this.numFaseNoAceptado = this.numFaseNoAceptado + 1;
        } else if (i.pic_estado_inscripcion == "Finalizado no aprobado") {
          this.numFasefinalizado = this.numFasefinalizado + 1;
        } else if (i.pic_estado_inscripcion == "Finalizado aprobado") {
          this.numFaseFinalAprobado = this.numFaseFinalAprobado + 1;
        } else if (i.pic_estado_inscripcion == "Cancelado") {
          this.numFaseCancelado = this.numFaseCancelado + 1;
        }
      }
      for(let r of this.listaInstructores){
        if(r.plan_institucional_id == 2021){
          this.numFecha2021 = this.numFecha2021 +1;
        }else if(r.plan_institucional_id == 2022){
          this.numFecha2022 = this.numFecha2022 +1;
        }
      }
      this.graficas();
    },
        async graficas() {
      new Chart(this.canvas[0], {
        type: "bar",
        data: {
          labels: [
            "Inscrito",
            "Adjudicado",
            "No aceptado",
            "Finalizado no aprobado",
            "Finalizado aprobado",
            "Cancelado",
          ],
          datasets: [
            {
              label: "Estado de Inscripcion",
              data: [
                this.numFaseInscrito,
                this.numFaseAdjudicado,
                this.numFaseNoAceptado,
                this.numFasefinalizado,
                this.numFaseFinalAprobado,
                this.numFaseConvCancelacion,
                this.numFaseCancelado,
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
        type: "bar",
        data: {
          labels: [
            "2021",
            "2022",
          ],
          datasets: [
            {
              label: "Fechas",
              data: [
                this.numFecha2021,
                this.numFecha2022,
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
    obtenerRegional() {
      Axios()
        .get("listar_regionales")
        .then((respuesta) => {
          this.listarRegional = respuesta.data.results;
        });
    },
    obtenerCentros(id_regional) {
      Axios()
        .get("listar_centro_formacion_regional/" + id_regional)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listarCentros = respuesta.data.results;
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
    ontenerPlanInstitucional() {
      Axios()
        .get("listar_plan_institucional")
        .then((respuesta) => {
          this.listarfechaspic = respuesta.data.results;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    regionalFiltrado() {
      let arregloPresupuestoNacionalFiltrado = [];
      for (let presuRegional of this.listaInstructores) {
        let regional = presuRegional.regional;
        if (regional.indexOf(this.regional.regional) >= 0) {
          arregloPresupuestoNacionalFiltrado.push(presuRegional);
        }
      }
      this.listaInstructoresFiltrado = arregloPresupuestoNacionalFiltrado;
      if (this.listaInstructoresFiltrado.length == 0) {
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
        this.listaInstructoresFiltrado = this.listaInstructores;
      }
    },
    filtroCentro() {
      let arregloFiltrado = [];

      for (let presuRegional of this.listaInstructores) {
        let centro = presuRegional.centro_formacion;
        if (centro.indexOf(this.filterCentro) >= 0) {
          arregloFiltrado.push(presuRegional);
        }
        this.listaInstructoresFiltrado = arregloFiltrado;
      }
      if (this.listaInstructoresFiltrado.length == 0) {
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
        this.listaInstructoresFiltrado = this.listaInstructores;
      }
    },
    FechaFiltrado() {
      let anioFitrado = [];
      for (let conv of this.listaInstructores) {
        let anio = conv.plan_institucional_id;

        if (anio.toString().indexOf(this.filterFecha.toString()) >= 0) {
          anioFitrado.push(conv);
        }
      }
      this.listaInstructoresFiltrado = anioFitrado;

      if (this.listaInstructoresFiltrado.length == 0) {
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
        this.filterFecha = "";
        this.listaInstructoresFiltrado = this.listaInstructores;
      }
    },
       exportExcel: function () {
      let data = XLSX.utils.json_to_sheet(this.listaInstructoresFiltrado, {
        header: ["", "", "", ""],
      });
      (data["E1"].v = "Nombre"),
        (data["F1"].v = "Convocatoria"),
        (data["G1"].v = "Inscripcion"),
        (data["H1"].v = "año");
      const workbook = XLSX.utils.book_new();
      const filename =
        "Reporte Convocatorias " +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1);
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
  },
};
</script>