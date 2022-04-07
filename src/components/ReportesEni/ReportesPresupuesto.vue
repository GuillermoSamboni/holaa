<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <h1 class="text-azul-sena">Reportes Convocatoria ENI</h1>
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
                            class="
                              card-title
                              text-uppercase text-muted
                              mb-0
                              row
                            "
                          >
                            Total Convocatoria
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            listaConvocatoriasEni.length
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
                            Total Creacion
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            totalFinanciacionCreacion
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
                            Fase Cancelacion
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            Cancelación
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
                            Total Postulacion
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            numFaseConvPostulacion
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
                            Fase Validacion
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            numFaseConvTerminacion
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
                            Fase Terminada
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            numFaseConvTerminacion
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
                            Fase Finalizada
                          </h5>
                          <span class="h2 font-weight-bold mb-0">{{
                            numFaseConvTerminacion
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
                  v-model="filterFecha"
                  @change="picConvocatoriaFechaFiltrado()"
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
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterfase"
                  @change="picFaseFiltrado()"
                >
                  <option value="" selected disabled>Fases</option>
                  <option
                    v-for="(fase, index) in listarFase"
                    :value="fase.pic_fase_convocatoria"
                    :key="index"
                  >
                    {{ fase.pic_fase_convocatoria }}
                  </option>
                  <option value="">Selecionar toadas las fases</option>
                </select>
              </div>
              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterLinea"
                  @change="picLineaTecnologicaFiltro()"
                >
                  <option value="" selected disabled>Linea Tecnologica</option>
                  <option
                    v-for="(lineaTecnologica, index) in listarLineaTecnologica"
                    :value="lineaTecnologica.linea_tecnologica"
                    :key="index"
                  >
                    {{ lineaTecnologica.linea_tecnologica }}
                  </option>
                </select>
              </div>
              <div class="mt-2">
                <select
                  class="form-control"
                  id="sector"
                  name="sector"
                  v-model="filterModalidad"
                  @change="modalidadFiltro()"
                >
                  <option value="" selected disabled>Modalidad</option>
                  <option
                    v-for="(mod, index) in listarModalidades"
                    :value="mod.modalidad"
                    :key="index"
                  >
                    {{ mod.modalidad }}
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
                for="listaConvocatoriaEniFiltrado"
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
                  name="listaConvocatoriaEniFiltrado"
                  :list="listaConvocatoriaEniFiltrado"
                  :per="5"
                >
                  <table class="table table-hoverble">
                    <thead id="listado">
                      <tr>
                        <th class="text-nowrap">Convocatoria</th>
                        <th class="text-nowrap">Capacitacion</th>
                        <th class="text-nowrap">Financiacion</th>
                        <th class="text-nowrap">Fase</th>
                        <th class="text-nowrap">Año</th>
                        <th class="text-nowrap">Linea tecnologica</th>
                        <th class="text-nowrap">Modalidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="listaConvocatoriaEniFiltrado != null">
                        <tr
                          v-for="(convocatoria, key) in paginated(
                            'listaConvocatoriaEniFiltrado'
                          )"
                          :key="key"
                        >
                          <td>
                            {{ convocatoria.convocatoria }}
                          </td>
                          <td>
                            {{ convocatoria.capacitacion }}
                          </td>
                               <td>
                            {{ convocatoria.financiacion }}
                          </td>

                          <td>
                            {{ convocatoria.pic_fase_convocatoria }}
                          </td>
                          <td>
                            {{ convocatoria.plan_institucional_id }}
                          </td>
                          <td>
                            {{ convocatoria.linea_tecnologica }}
                          </td>
                          <td>
                            {{ convocatoria.modalidad }}
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
                for="listaConvocatoriaEniFiltrado"
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
import XLSX from "xlsx";
import Swal from "sweetalert2";
import BarChart from "@/components/Charts/BarChart";
import AnimacionTablasCargando from "@/components/animacionCargando.vue";
export default {
  name: "ReporteConvocatoria",

  mounted() {
    this.obtenerConvocatoriasEni();
    this.listarFasesEni();
    this.ontenerPlanInstitucional();
    this.ontenerLineaTecnologica();
    this.ontenerModalidad();
  },

  data: function () {
    return {
      verGraficas: false,
      canvas: document.getElementsByTagName("canvas"),
      listaConvocatoriasEni: [],
      listaConvocatoriaEniFiltrado: [],
      listarFase: [],
      listarModalidades: "",
      filterfase: "",
      filterFecha: "",
      filterLinea: "",
      filterModalidad: "",
      listarLineaTecnologica: "",
      listarfechaspic: [],
      listarfechaspicFiltros: [],
      paginate: ["listaConvocatoriaEniFiltrado"],

      numFaseConvCreacion: 0,
      numFaseConvPostulacion: 0,
      numFaseConvValidacion: 0,
      numFaseConvTerminacion: 0,
      numFaseConvFinalizada: 0,
      numFaseConvCancelacion: 0,
      numFecha2021:0,
      numFecha2022:0,
      totalFinanciacionCreacion:0,
      totalfinalPostulacion:0,
    };
  },
  methods: {
    obtenerConvocatoriasEni() {
      Axios()
        .get("reportes_convocatorias_eni")
        .then((respuesta) => {
          this.listaConvocatoriasEni = respuesta.data.results;
          this.listaConvocatoriaEniFiltrado = respuesta.data.results;

          this.generarContadoresPorFase();
        });
    },

    async generarContadoresPorFase() {
      for (let conv of this.listaConvocatoriasEni) {

        if (conv.pic_fase_convocatoria == "Creación") {
          this.numFaseConvCreacion = this.numFaseConvCreacion + 1;
          this.totalFinanciacionCreacion = this.totalFinanciacionCreacion + parseFloat (conv.financiacion);
        } else if (conv.pic_fase_convocatoria == "Postulación") {
          this.numFaseConvPostulacion = this.numFaseConvPostulacion + 1;
          this.totalfinalPostulacion = this.totalfinalPostulacion + parseFloat(conv.financiacion)
        } else if (conv.pic_fase_convocatoria == "Validación") {
          this.numFaseConvValidacion = this.numFaseConvValidacion + 1;
        } else if (conv.pic_fase_convocatoria == "Terminación") {
          this.numFaseConvTerminacion = this.numFaseConvTerminacion + 1;
        } else if (conv.pic_fase_convocatoria == "Finalizada") {
          this.numFaseConvFinalizada = this.numFaseConvFinalizada + 1;
        } else if (conv.pic_fase_convocatoria == "Cancelación") {
          this.numFaseConvCancelacion = this.numFaseConvCancelacion + 1;
        }
      }
      for(let r of this.listaConvocatoriasEni){
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
            "Creacion",
            "Postulacion",
            "Validacion",
            "Terminacion",
            "finalizada",
          ],
          datasets: [
            {
              label: "Total Convocatorias por fase",
              data: [
                this.numFaseConvCreacion,
                this.numFaseConvPostulacion,
                this.numFaseConvValidacion,
                this.numFaseConvTerminacion,
                this.numFaseConvFinalizada,
                this.numFaseConvCancelacion,
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
    listarFasesEni() {
      Axios()
        .get("listar_fases_pic")
        .then((respuesta) => {
          this.listarFase = respuesta.data.results;
        });
    },

    picFaseFiltrado() {
      let arregloFiltrado = [];

      for (let conv of this.listaConvocatoriasEni) {
        let fase = conv.pic_fase_convocatoria;

        if (fase.indexOf(this.filterfase) >= 0) {
          arregloFiltrado.push(conv);
        }
      }

      this.listaConvocatoriaEniFiltrado = arregloFiltrado;
      if (this.listaConvocatoriaEniFiltrado.length == 0) {
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
        this.filterfase = "";
        this.listaConvocatoriaEniFiltrado = this.listaConvocatoriasEni;
      }
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
    picConvocatoriaFechaFiltrado() {
      let anioFitrado = [];
      for (let conv of this.listaConvocatoriasEni) {
        let anio = conv.plan_institucional_id;

        if (anio.toString().indexOf(this.filterFecha.toString()) >= 0) {
          anioFitrado.push(conv);
        }
      }
      this.listaConvocatoriaEniFiltrado = anioFitrado;

      if (this.listaConvocatoriaEniFiltrado.length == 0) {
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
        this.listaConvocatoriaEniFiltrado = this.listaConvocatoriasEni;
      }
    },
    exportExcel: function () {
      let data = XLSX.utils.json_to_sheet(this.listaConvocatoriaEniFiltrado, {
        header: ["convocatoria", "capacitacion", "fase", "año"],
      });
      (data["A1"].v = "convocatoria"),
        (data["B1"].v = "capacitacion"),
        (data["C1"].v = "fase"),
        (data["D1"].v = "año");
      const workbook = XLSX.utils.book_new();
      const filename =
        "Reporte Convocatorias " +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1);
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    ontenerLineaTecnologica() {
      Axios()
        .get("listar_lineas_tecnologica")
        .then((respuesta) => {
          this.listarLineaTecnologica = respuesta.data.results;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
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
    picLineaTecnologicaFiltro() {
      let lineaFitrado = [];
      for (let linea of this.listaConvocatoriasEni) {
        let lin = linea.linea_tecnologica;

        if (lin.indexOf(this.filterLinea) >= 0) {
          lineaFitrado.push(linea);
        }
      }
      this.listaConvocatoriaEniFiltrado = lineaFitrado;

      if (this.listaConvocatoriaEniFiltrado.length == 0) {
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
        this.filterLinea = "";
        this.listaConvocatoriaEniFiltrado = this.listaConvocatoriasEni;
      }
    },
    ontenerModalidad() {
      Axios()
        .get("listar_modalidades")
        .then((respuesta) => {
          this.listarModalidades = respuesta.data.results;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    modalidadFiltro() {
      let modalidadFitrado = [];
      for (let mod of this.listaConvocatoriasEni) {
        let lin = mod.modalidad;

        if (lin.indexOf(this.filterModalidad) >= 0) {
          modalidadFitrado.push(mod);
        }
      }
      this.listaConvocatoriaEniFiltrado = modalidadFitrado;

      if (this.listaConvocatoriaEniFiltrado.length == 0) {
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
        this.filterModalidad = "";
        this.listaConvocatoriaEniFiltrado = this.listaConvocatoriasEni;
      }
    },
  },
};
</script>