<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <!-- <div class="card-header"> -->
      <!-- <h1 class="text-azul-sena"> -->
      <h1 class="text-azul-sena">Reportes Convenios</h1>
      <!-- </h1> -->
      <!-- </div> -->
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
                          <i class="fas fa-plus-square"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Total Convenios
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          listaConvenios.length
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
                        <h5
                          class="card-title text-uppercase text-muted mb-0 row"
                        >
                          Total Colegios
                        </h5>

                        <span class="h2 font-weight-bold mb-0">{{
                          listaColegios
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
                          Total programas formacion
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          listaProgramasFormacion
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Fase Creación
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseCreacion
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
                          Fase Proyectar Programas
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseProyectarprogramas
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
                          faseEjecución
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
                          Fase Finalizado
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseFinalizado
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
                          <i class="fas fa-times-circle"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Fase Cancelado
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseCancelado
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Fase Suspendido
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseSuspendido
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
                          <i class="ni ni-money-coins"></i>
                        </div>
                      </div>
                      <div class="col">
                        <h5 class="card-title text-uppercase text-muted mb-0">
                          Fase Sensibilizar Convenio
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseSensibilizarconvenio
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
                          Fase Aprobar Programas Colegios
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseAprobarprogramascolegios
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
                          Fase Viabilidad
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          faseViabilidad
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

      <div class="card-body">
        <div class="row">
          <div class="col-lg-3 col-md-12 col-sm-12">
            <div class="">
              <base-button
                block
                type="default"
                class="btn btn-block btn-azul-sena ml-0"
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
              <!-- v-validate="{ required }" -->
            </div>
            <div class="mt-2">
              <select
                class="form-control"
                id="sector"
                name="sector"
                v-model="filterCentro"
                @change="filtroCentro()"
              >
                <option value="" selected disabled>Centros</option>
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
                  v-bind:value="fase.fase"
                >
                  {{ fase.fase }}
                </option>
              </select>
              <!-- v-validate="{ required }" -->
            </div>
            <button
              block
              type="default"
              class="btn btn-block btn-oscuro-sena ml-0"
              @click="exportExcel()"
            >
              Generar Reporte
            </button>
          </div>
          <!-- TABLA MOSTRAR -->
          <div class="col-lg-9 col-md-12 col-sm-12">
            <div class="table-responsive">
              <paginate
                ref="paginator"
                name="listaConveniosFiltrado"
                :list="listaConveniosFiltrado"
                :per="10"
              >
                <table class="table table-hoverble">
                  <thead id="listado">
                    <tr>
                      <th class="text-nowrap">Convenio</th>
                      <th class="text-nowrap">Centro de formacion</th>
                      <th class="text-nowrap">fase</th>
                      <th class="text-nowrap">regional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="listaConveniosFiltrado != null">
                      <tr
                        v-for="(conveni, key) in paginated(
                          'listaConveniosFiltrado'
                        )"
                        :key="key"
                      >
                        <td>
                          {{ conveni.convenio }}
                        </td>
                        <td>
                          {{ conveni.centro_formacion }}
                        </td>
                        <td>
                          {{ conveni.fase }}
                        </td>
                        <td>
                          {{ conveni.programa_formacion }}
                        </td>

                        <td>
                          {{ conveni.regional }}
                        </td>
                      </tr>
                    </template>
                    <tr v-else>
                      No hay convenios
                    </tr>
                  </tbody>
                </table>
              </paginate>
            </div>
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

export default {
  name: "ReportesConvenios",

  mounted() {
    this.obtenerRegionales();
    this.obtenerConvenios();
    this.obtenerFases();
    this.obtenerprogrmaformacion();
    this.obtenercolegios();
  },
  data() {
    return {
      regional: {
        id_regional: null,
        regional: null,
      },
      listaRegionales: [],
      listaCentros: [],
      listaConvenios: [],
      listaColegios: [],
      listaProgramasFormacion: [],
      listaConveniosFiltrado: [],
      paginate: ["listaConveniosFiltrado"],
      listaFases: [],

      refionalFilter: null,
      filterFase: "",
      filterConvenio: "",
      filterCentro: "",

      regional_escogida: null,
      existe_regional: false,

      faseCreacion: 0,
      faseEjecución: 0,
      faseAprobarprogramascolegios: 0,
      faseProyectarprogramas: 0,
      faseFinalizado: 0,
      faseCancelado: 0,
      faseSuspendido: 0,
      faseSensibilizarconvenio: 0,
      faseViabilidad: 0,
      numcolegio: 0,
      numprogramaformacion: 0,
      numcolegios: 0,
    };
  },
  methods: {
    filtroNacional() {
      this.listaConveniosFiltrado = this.listaConvenios;
    },
    obtenerRegionales() {
      Axios()
        .get("listar_regionales")
        .then((respuesta) => {
          this.listaRegionales = respuesta.data.results;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    obtenerConvenios() {
      Axios()
        .get("listar_convenios")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaConvenios = respuesta.data.results;
            this.listaConveniosFiltrado = respuesta.data.results;
            this.contadorFases();
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
    obtenerprogrmaformacion() {
      Axios()
        .get("listar_conteo_programas")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaProgramasFormacion = respuesta.data.results;
            this.listaProgramasFormacionfiltrado = respuesta.data.results;
          
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

    obtenercolegios() {
      Axios()
        .get("listar_colegios_sin_secretaria")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaColegios = respuesta.data.results;
            this.listaColegiosfiltrado = respuesta.data.results;
        
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
        .get("listar_centro_formacion_regional/ " + id_regional)
        .then((respuesta) => {
          this.listaCentros = respuesta.data.results;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    obtenerFases() {
      Axios()
        .get("listar_fases_convenios")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaFases = respuesta.data.results;
          
          } else {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          }
        });
    },

    regionalFiltrado() {
      let arregloFiltrado = [];
      for (let conRegional of this.listaConvenios) {
        let regional = conRegional.regional;
        if (regional.indexOf(this.regional.regional) >= 0) {
          arregloFiltrado.push(conRegional);
        }
      }
      this.listaConveniosFiltrado = arregloFiltrado;

      if (this.listaConveniosFiltrado.length == 0) {
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró convocatorias que coincidan con las busqueda",
          showConfirmButton: false,

          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });

        this.regional = null;
        this.listaConveniosFiltrado = this.listaConvenios;
      }
    },
    filtroCentro() {
      let arregloFiltrado = [];

      for (let conv of this.listaConvenios) {
        let centro = conv.centro_formacion;
        if (centro.indexOf(this.filterCentro) >= 0) {
          arregloFiltrado.push(conv);
        }
        this.listaConveniosFiltrado = arregloFiltrado;
      }
      if (this.listaConveniosFiltrado.length == 0) {
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró convocatorias que coincidan con las busqueda",
          showConfirmButton: false,

          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.filterCentro = null;
        this.listaConveniosFiltrado = this.listaConvenios;
      }
    },

    filtroFases() {
      let arregloFiltrado = [];

      for (let fas of this.listaConvenios) {
        let fase = fas.fase;
        if (fase.indexOf(this.filterFase) >= 0) {
          arregloFiltrado.push(fas);
        }
        this.listaConveniosFiltrado = arregloFiltrado;
      }
      if (this.listaConveniosFiltrado.length == 0) {
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró fases que coincidan con las busqueda",
          showConfirmButton: false,

          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.filterFase = "";
        this.listaConveniosFiltrado = this.listaConvenios;
      }
    },

    async contadorFases() {
      for (let i of this.listaConveniosFiltrado) {
        if (i.colegio) {
          this.numcolegios = this.numcolegios + 1;
        } else if (i.programa_formacion) {
          this.numprogramaformacion = this.numprogramaformacion + 1;
        } else if (i.colegio_cargo) {
          this.numcolegio = this.numcolegio + 1;
        }

        if (i.fase == "Creación") {
          this.faseCreacion = this.faseCreacion +1;
        } else if (i.fase == "Aprobar programas colegios") {
          this.faseAprobarprogramascolegios = this.faseAprobarprogramascolegios + 1         
        } else if (i.fase == "Ejecución") {
          this.faseEjecución = this.faseEjecución + 1;
        } else if (i.fase == "Finalizado") {
          this.faseFinalizado = this.faseFinalizado + 1;
        } else if (i.fase == "Cancelado") {
          this.faseCancelado = this.faseCancelado + 1;
        } else if (i.fase == "Suspendido") {
          this.faseSuspendido = this.faseSuspendido + 1;
        } else if (i.fase == "Sensibilizar convenio") {
          this.faseSensibilizarconvenio = this.faseSensibilizarconvenio + 1;
        } else if (i.fase == "Proyectar programas") {
          this.faseProyectarprogramas = this.faseProyectarprogramas + 1;
        } else if (i.fase == "Viabilidad") {
          this.faseViabilidad = this.faseViabilidad + 1;
        }
      }  
    },

    exportExcel() {
      let data = XLSX.utils.json_to_sheet(this.listaConveniosFiltrado, {
        header: ["convenio", "centro_formacion", "fase", "regional"],
      });
      (data["A1"].v = "Convenio"),
        (data["B1"].v = "Centro de formacion"),
        (data["C1"].v = "fase"),
        (data["D1"].v = "regional");

      const workbook = XLSX.utils.book_new();
      const filename =
        "Reporte convenio" +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1);
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
  },
};
</script>