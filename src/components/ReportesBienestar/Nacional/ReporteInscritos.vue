<template>
  <div class="mt-4">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">REPORTES INSCRITOS NACIONAL</h1>
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
          v-show="verGraficas == false"
        >
          Ver tabla
        </button>
        <button
          block
          type="default"
          class="btn btn-block btn-azul-sena ml-0"
          @click="verGraficas = false"
          v-show="verGraficas == true"
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
              <div class="col-xl-12 col-md-6">
                <div class="card card-stats">
                  <!-- Card body -->
                  <div class="card-body">
                    <div class="row mx-5">
                      <div class="col-auto">
                        <div
                          class="
                            icon icon-shape
                            bg-gradient-dark
                            text-white
                            rounded-circle
                            shadow
                          "
                        >
                          <i class="fas fa-file-contract"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Total Convocatorias
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          Inscritos.length
                        }}</span>
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
                            Fase Creación
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            contConvCreacion
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
                            Fase Inscripción
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            contConvInscripcion
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
                            Fase Ejecución
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            contConvEjecucion
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
                              bg-gradient-yellow
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
                            Fase Adjudicación
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            contConvAdjudicacion
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
                            <i class="fas fa-times-circle"></i>
                          </div>
                        </div>
                        <div class="col">
                          <h5 class="card-title text-uppercase text-muted mb-0">
                            Fase Cancelación
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            contConvCancelacion
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
                              bg-gradient-red
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
                            Fase Finalizada
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            contConvFinalizada
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
            <div class="col-lg-2 col-sm-12 mr-4">
              <div class="mt-2">
                <base-button class="btn btn-block btn-azul-sena ml-0 p-2">
                  Nacional
                </base-button>
              </div>

              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterRegional"
                  @change="
                    picFiltrado(),
                      buscarCentrosSegunRegional(filterRegional.id_regional)
                  "
                >
                  <option value="" selected disabled>Regional</option>
                  <option value="">Todas</option>

                  <option
                    v-for="(regional, key) in listaRegionales"
                    :key="key"
                    v-bind:value="regional"
                  >
                    {{ regional.regional }}
                  </option>
                </select>
                <!-- v-validate="{ required }" -->
                <small
                  v-show="errors.has('Titulo_Obtenido')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("Titulo_Obtenido") }}
                </small>
              </div>
              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterCentro"
                  @change="filtroCentro()"
                >
                  <option value="" selected disabled>Centro</option>
                  <option value="">Todas</option>

                  <option
                    v-for="(centros, key) in listaCentros"
                    :key="key"
                    v-bind:value="centros.centro_formacion"
                  >
                    {{ centros.centro_formacion }}
                  </option>
                </select>
                <!-- v-validate="{ required }" -->
                <small
                  v-show="errors.has('Titulo_Obtenido')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("Titulo_Obtenido") }}
                </small>
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
            <div class="col-lg-9 col-md-12 col-sm-12">
              <paginate-links
                class="pagination justify-content-end"
                for="ListaInscritosFiltrado"
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

              <div class="table-responsive">
                <paginate
                  ref="paginator"
                  name="ListaInscritosFiltrado"
                  :list="ListaInscritosFiltrado"
                  :per="10"
                >
                  <table class="table table-hoverble">
                    <thead id="listado">
                      <tr>
                        <th>Convocatoria</th>
                        <th>Inscritos</th>
                        <th>Cupo total</th>
                        <th>Regional</th>
                        <th>Centro Formación</th>
                      </tr>
                    </thead>
                    <div v-if="Inscritos.length == 0">
                      No hay aprendices aún.
                    </div>

                    <tbody>
                      <template v-if="ListaInscritosFiltrado != null">
                        <tr
                          v-for="(inscritos, index) in paginated(
                            'ListaInscritosFiltrado'
                          )"
                          :key="index"
                        >
                          <td>{{ inscritos.id_convocatoria }}</td>
                          <td>
                            {{ inscritos.primer_nombre }}
                            {{ inscritos.segundo_nombre }}
                            {{ inscritos.primer_apellido }}
                            {{ inscritos.segundo_apellido }}
                          </td>
                          <td>{{ inscritos.cupo_total }}</td>
                          <td>{{ inscritos.regional }}</td>
                          <td>{{ inscritos.centro_formacion }}</td>
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
                for="ListaInscritosFiltrado"
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

<script lang="ts">
import Axios from "@/Axios";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import Swal from "sweetalert2";
import XLSX from "xlsx";
import BarChart from "@/components/Charts/BarChart";
import AnimacionTablasCargando from "@/components/animacionCargando.vue";
import Chart from "chart.js";

@Component({
  components: {
    AnimacionTablasCargando,
    BarChart,
  },
})
export default class listaInscritos extends Vue {
  canvas = document.getElementsByTagName("canvas");
  estadoPeticionTabla = false;
  verGraficas = false;
  Inscritos: any[] = [];
  listaRegionales = [];
  InscritosFiltrado = [];
  paginate = ["ListaInscritosFiltrado"];
  contConvCreacion = 0;
  contConvFinalizada = 0;
  contConvCancelacion = 0;
  contConvEjecucion = 0;
  contConvAdjudicacion = 0;
  contConvInscripcion = 0;
  contConvCierre = 0;
  contApoyoSostenimientoF = 0;
  contApoyoSostenimientoR = 0;
  contRepresentantes = 0;
  contReporteActividades = 0;
  contMonitorias = 0;
  contInternados = 0;
  contApoyoTransporte = 0;
  contApoyoAlimentacion = 0;
  filterFase = null;

  año: any[] = [];
  listaCentros = [];
  ListaInscritosFiltrado = [];
  filterRegional = null;
  filterCentro = null;

  id_regional = null;

  mounted() {
    this.obtenerRegionales();

    this.obtenerInscritos(this.$route.params.id);
  }
  buscarCentrosSegunRegional(id_regional) {
    Axios()
      .get("listar_centro_formacion_regional/ " + id_regional)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaCentros = respuesta.data.results;
        } else {
          Swal.fire({
            title: "Hubo un error obteniendo las convocatorias",
            icon: respuesta.data.status,
            text: respuesta.data.message,
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  obtenerRegionales() {
    Axios()
      .get("listar_regionales")

      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaRegionales = respuesta.data.results;
        } else {
          Swal.fire({
            title: "Hubo un error obteniendo las regionales",
            icon: respuesta.data.status,
            text: respuesta.data.message,
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  obtenerInscritos(id) {
    Axios()
      .get("reportes_inscritos")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.Inscritos = respuesta.data.results;
          this.ListaInscritosFiltrado = respuesta.data.results;
          this.año = respuesta.data.results;
          this.generarContadoresPorFase();
        } else {
          Swal.fire({
            title: "Hubo un error obteniendo los inscritos",
            icon: respuesta.data.status,
            text: respuesta.data.message,
            confirmButtonText: "Aceptar",
          });
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
  }

  picFiltrado() {
    let arregloFiltrado = [];
    // this.listaConvocatoriasFiltrado = []

    for (let adj of this.Inscritos) {
      let regional = adj.regional;

      if (regional.indexOf(this.filterRegional.regional) >= 0) {
        arregloFiltrado.push(adj);
      }
    }

    this.ListaInscritosFiltrado = arregloFiltrado;
    if (this.ListaInscritosFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró ninguna coincidencia con la busqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      // this.filter = "";
      this.ListaInscritosFiltrado = this.Inscritos;
      // this.paginate = ['listaConvocatoriasFiltrado']
    }
  }
  filtroCentro() {
    let arregloFiltrado = [];

    for (let conv of this.Inscritos) {
      let centro = conv.centro_formacion;
      if (centro.indexOf(this.filterCentro) >= 0) {
        arregloFiltrado.push(conv);
      }
      this.ListaInscritosFiltrado = arregloFiltrado;
    }
    if (this.ListaInscritosFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró ninguna coincidencia con la busqueda",
        showConfirmButton: false,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filterCentro = null;
      this.ListaInscritosFiltrado = this.Inscritos;
    }
  }
  exportExcel() {
    let data = XLSX.utils.json_to_sheet(this.ListaInscritosFiltrado, {
      header: [
        "convocatoria",
        "regional",
        "centro_formacion",
        "tipo_apoyo",
        "fase_bienestar",
      ],
    });
    (data["A1"].v = "convocatoria"),
      (data["B1"].v = "regional"),
      (data["C1"].v = "centro formacion"),
      (data["D1"].v = "tipo apoyo"),
      (data["E1"].v = "fase bienestar");

    const workbook = XLSX.utils.book_new();
    const filename =
      "Reporte Convocatorias " +
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1);
    XLSX.utils.book_append_sheet(workbook, data, filename);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }
  async generarContadoresPorFase() {
    for (let i of this.Inscritos) {
      if (i.tipo_apoyo == "Apoyos de alimentación") {
        this.contApoyoAlimentacion = this.contApoyoAlimentacion + 1;
      } else if (i.tipo_apoyo == "Apoyos de transporte") {
        this.contApoyoTransporte = this.contApoyoTransporte + 1;
      } else if (i.tipo_apoyo == "Internados-Centros de convivencia") {
        this.contInternados = this.contInternados + 1;
      } else if (i.tipo_apoyo == "Monitorias") {
        this.contMonitorias = this.contMonitorias + 1;
      } else if (
        i.tipo_apoyo ==
        "Reporte de actividades de la política de enfoque pluralista y diferencial"
      ) {
        this.contReporteActividades = this.contReporteActividades + 1;
      } else if (i.tipo_apoyo == "Representantes de aprendices") {
        this.contRepresentantes = this.contRepresentantes + 1;
      } else if (i.tipo_apoyo == "Apoyos de sostenimiento Regular") {
        this.contApoyoSostenimientoR = this.contApoyoSostenimientoR + 1;
      } else if (i.tipo_apoyo == "Apoyos de sostenimiento FIC") {
        this.contApoyoSostenimientoF = this.contApoyoSostenimientoF + 1;
      }
    }
    for (let i of this.Inscritos) {
      if (i.fase_bienestar == "Creación") {
        this.contConvCreacion = this.contConvCreacion + 1;
      } else if (i.fase_bienestar == "Cancelación") {
        this.contConvCancelacion = this.contConvCancelacion + 1;
      } else if (i.fase_bienestar == "Finalizada\n") {
        this.contConvFinalizada = this.contConvFinalizada + 1;
      } else if (i.fase_bienestar == "Ejecución") {
        this.contConvEjecucion = this.contConvEjecucion + 1;
      } else if (i.fase_bienestar == "Adjudicación") {
        this.contConvAdjudicacion = this.contConvAdjudicacion + 1;
      } else if (i.fase_bienestar == "Inscripción") {
        this.contConvInscripcion = this.contConvInscripcion + 1;
      } else if (i.fase_bienestar == "Cierre") {
        this.contConvCierre = this.contConvCierre + 1;
      }
    }
    this.graficas();
  }
  graficas() {
    new Chart(this.canvas[0], {
      type: "line",
      data: {
        labels: [
          "Creación",
          "Cancelación",
          "Finalizada",
          "Ejecución",
          "Adjudicación",
          "Inscripción",
        ],
        datasets: [
          {
            label: "Fases",
            data: [
              this.contConvCreacion,
              this.contConvCancelacion,
              this.contConvFinalizada,
              this.contConvEjecucion,
              this.contConvAdjudicacion,
              this.contConvInscripcion,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
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
          "Apoyos de alimentación",
          "Apoyos de transporte",
          "Internados-Centros de convivencia",
          "Monitorias",
          "Reporte de actividades de la política de enfoque pluralista y diferencial",
          "Representantes de aprendices",
          "Apoyos de sostenimiento Regular",
          "Apoyos de sostenimiento FIC",
        ],
        datasets: [
          {
            label: "Apoyos",
            data: [
              this.contApoyoAlimentacion,
              this.contApoyoTransporte,
              this.contInternados,
              this.contMonitorias,
              this.contReporteActividades,
              this.contRepresentantes,
              this.contApoyoSostenimientoR,
              this.contApoyoSostenimientoF,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
  filtroFases() {
    let arregloFiltrado = [];

    for (let conv of this.Inscritos) {
      let fase = conv.fase_bienestar;
      if (fase.indexOf(this.filterFase) >= 0) {
        arregloFiltrado.push(conv);
      }
      this.ListaInscritosFiltrado = arregloFiltrado;
    }
    if (this.ListaInscritosFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró ninguna coincidencia con la busqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filterFase = "";
      this.ListaInscritosFiltrado = this.Inscritos;
    }
  }
}
</script>