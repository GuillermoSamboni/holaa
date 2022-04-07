<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA REPORTES TRAZABILIDAD</h1>
        </h1>
      </div>
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
                        Total Trazabilidad
                      </h5>
                      <span class="h2 font-weight-bold mb-0">{{
                        listarTrazabilidad.length
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="carousel-item" data-interval="200">
            <div class="row mx-5">
              <div class="col-xl-4 col-md-6">
                <div class="card card-stats">
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
                          Eje Cualificación Ocupacional
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          contEjeCuali
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-6">
                <div class="card card-stats">
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
                          Fase Eje 2
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
                          Fase Eje 3
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
          </div> -->
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
          <div class="col-lg-2 col-md-12 col-sm-12">
            <div class="mt-5">
              <select
                class="form-control"
                id="sector"
                name="sector"
                v-model="regional"
                @change="
                  obtenerCentrosRegional(regional.id_regional), filtroRegional()
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
            <div class="mt-2">
              <select
                class="form-control"
                id="sector"
                name="sector"
                v-model="filterEje"
                @change="filtroEje()"
              >
                <option value="" selected disabled>Eje</option>
                <option value="">Todas</option>
                <option
                  v-for="(eje, key) in listaEjes"
                  :key="key"
                  v-bind:value="eje.eje"
                >
                  {{ eje.eje }}
                </option>
                apoyo
              </select>
              <!-- v-validate="{ required }" -->
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
              for="listaTotalidadCentros"
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
                name="listaTotalidadCentros"
                :list="listaTotalidadCentros"
                :per="5"
              >
                <table class="table table-hoverble">
                  <thead id="listado">
                    <tr>
                <th class="text-nowrap">centro formacion</th>
                <th class="text-nowrap">regional</th>
                <th v-for="(trazabilidad, index) in listarTrazabilidad" :key="index">
                  {{ trazabilidad.trazabilidad }}
                </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template
                      v-if="listaTotalidadCentros != null"
                    >
                      <tr
                        v-for="(lineamiento, key) in paginated(
                          'listaTotalidadCentros'
                        )"
                        :key="key"
                      >
                  <td>{{ lineamiento.centro_formacion }}</td>
                  <td>{{ lineamiento.regional }}</td>
                  <td v-for="(trazabilidad, index) in listarTrazabilidad" :key="index" v-if="trazabilidad.id_centro_formacion == lineamiento.id_centro_formacion" >
                    {{trazabilidad.asistencia}}
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
              for="listaTotalidadCentros"
              :limit="3"
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
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import XLSX from "xlsx";
export default {
  name: "ReporteTrazabilidad",

  mounted() {
    this.obtenerCentrosFormacion();
    this.obtenerRegionales();
    this.obtenerTrazabilidades();
    this.obtenerEjes();
    // this.obtenerListaTrazabilidades();
  },
  data: function () {
    return {
      listaTotalidadCentros: [],
      listaRegionales: [],
      listarTrazabilidad: [],
      listarTrazabilidadFiltrado: [],
      paginate: ["listaTotalidadCentros"],
      listaEjes: [],
      listaCentros: [],
      listarListaTrazabilidades: [],
      filterEje: "",
      filterCentro: "",
      contEjeCuali: 0,
      contConvCancelacion: 0,
      contConvFinalizada: 0,
      contConvEjecucion: 0,
      contConvAdjudicacion: 0,
      contConvInscripcion: 0,
      contConvCierre: 0,
      regional: {
        id_regional: null,
        regional: null,
      },
    };
  },
  methods: {
      obtenerCentrosFormacion() {
      Axios()
        .get("listar_centros")
        .then((respuesta) => {
          this.listaTotalidadCentros = respuesta.data.results;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    obtenerTrazabilidades() {
      Axios()
        .get("listar_vista_egresados")
        .then((respuesta) => {
          if (respuesta.data.status.toLowerCase() == "success") {
            this.listarTrazabilidad = respuesta.data.results;
            this.listarTrazabilidadFiltrado = respuesta.data.results;
            this.generarContadoresPorFase();
          } else {
            Swal.fire({
              title: "Hubo un error",
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
    obtenerEjes() {
      Axios()
        .get("crear_ejes")
        .then((respuesta) => {
          this.listaEjes = respuesta.data.results.Ejes;
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
    // obtenerListaTrazabilidades() {
    //   Axios()
    //     .get("listar_trazabilidad")
    //     .then((respuesta) => {
    //       this.listarListaTrazabilidades = respuesta.data.results;
    //     })
    //     .catch(() => {
    //       Swal.fire(
    //         "ERROR!",
    //         "Se ha presentado un error en el servidor!",
    //         "error"
    //       );
    //     });
    // },
    generarContadoresPorFase() {
      for (let i of this.listarTrazabilidad) {
        if (i.eje == "CUALIFICACIÓN OCUPACIONAL") {
          this.contEjeCuali = this.contEjeCuali + 1;
        } else if (i.fase_bienestar == "Cancelación") {
          this.contConvCancelacion = this.contConvCancelacion + 1;
        } else if (i.fase_bienestar == "Finalizada") {
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
    },
    filtroEje() {
      let arregloFiltrado = [];

      for (let conv of this.listarTrazabilidad) {
        let ej = conv.eje;
        if (ej.indexOf(this.filterEje) >= 0) {
          arregloFiltrado.push(conv);
        }
        this.listarTrazabilidadFiltrado = arregloFiltrado;
      }
      if (this.listarTrazabilidadFiltrado.length == 0) {
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
        this.filterEje = "";
        this.listarTrazabilidadFiltrado =
          this.listarTrazabilidad;
      }
    },
    filtroRegional() {
      let arregloFiltrado = [];

      for (let conv of this.listarTrazabilidad) {
        let regional = conv.regional;
        if (regional.indexOf(this.regional.regional) >= 0) {
          arregloFiltrado.push(conv);
        }
        this.listarTrazabilidadFiltrado = arregloFiltrado;
      }
      if (this.listarTrazabilidadFiltrado.length == 0) {
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
        this.listarTrazabilidadFiltrado =
          this.listarTrazabilidad;
      }
    },
    filtroCentro() {
      let arregloFiltrado = [];

      for (let conv of this.listarTrazabilidad) {
        let centro = conv.centro_formacion;
        if (centro.indexOf(this.filterCentro) >= 0) {
          arregloFiltrado.push(conv);
        }
        this.listarTrazabilidadFiltrado = arregloFiltrado;
      }
      if (this.listarTrazabilidadFiltrado.length == 0) {
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
        this.listarTrazabilidadFiltrado =
          this.listarTrazabilidad;
      }
    },
    exportExcel: function () {
      let data = XLSX.utils.json_to_sheet(
        this.listarTrazabilidadFiltrado,
        {
          header: [
            "regional",
            "centro_formacion",
            "asistencia",
            "trazabilidad",
            "eje",
          ],
        }
      );
      (data["A1"].v = " Regional"),
        (data["B1"].v = "Centro Formacion"),
        (data["C1"].v = "Asistencia"),
        (data["D1"].v = "Trazabilidad"),
        (data["E1"].v = "Eje");

      const workbook = XLSX.utils.book_new();
      const filename =
        "Reporte Trazabilidad " +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1);
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
  },
};
</script>