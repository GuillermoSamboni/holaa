<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
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
                        Total Representantes
                      </h5>
                      <span class="h2 font-weight-bold mb-0">{{
                        representantes.length
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
                          cantidad Hombres
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          contHombres
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
                          Cantidad Mujeres
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          contMujeres
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
          <div class="col-lg-2 col-sm-12 mr-4">
            <div class="mt-2">
              <base-button class="btn btn-block btn-azul-sena ml-0">
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
            <button
              block
              type="default"
              class="btn btn-block btn-oscuro-sena ml-0"
              @click="exportExcel()"
            >
              Generar Reporte
            </button>
          </div>
          <div class="col-lg-9 col-md-12 col-sm-12">
            <paginate-links
              class="pagination justify-content-end"
              for="representanteFiltrado"
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
                name="representanteFiltrado"
                :list="representanteFiltrado"
                :per="10"
              >
                <table class="table table-hoverble">
                  <thead id="listado">
                    <tr>
                      <th>Identificacion</th>
                      <th>Representante</th>
                      <th>Regional</th>
                      <th>Centro Formación</th>
                      <th>Ficha</th>
                    </tr>
                  </thead>
                  <div v-if="representantes.length == 0">
                    No hay Representantes aún.
                  </div>

                  <tbody>
                    <template v-if="representanteFiltrado != null">
                      
                      <tr
                      v-for="(proceso, index) in paginated('representanteFiltrado')"
                      :key="index"
                      >
                        <td>{{proceso.identificacion}}</td>
                        <td>
                          {{ proceso.primer_nombre }}
                          {{ proceso.segundo_nombre }}
                          {{ proceso.primer_apellido }}
                          {{ proceso.segundo_apellido }}
                        </td>
                        <td>{{ proceso.regional }}</td>
                        <td>{{ proceso.centro_formacion }}</td>
                        <td>{{ proceso.ficha_caracterizacion_id }}</td>
                      </tr>
                    </template>
                    <tr v-else>
                      No hay Persona
                    </tr>
                  </tbody>
                </table>
              </paginate>
              
              <!-- {{ this.listaAdjudicados }} -->
            </div>
            <paginate-links
              class="pagination justify-content-end"
              for="representanteFiltrado"
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
  </div>
</template>

<script lang="ts">
import Axios from "@/Axios";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import Swal from "sweetalert2";
import XLSX from "xlsx";
import BarChart from "@/components/Charts/BarChart";
import Chart from "chart.js";

@Component({
  components: {
      BarChart,
  },
})
export default class listaRepresentantes extends Vue {
  canvas = document.getElementsByTagName("canvas");
  verGraficas = false;
  listaCentros = [];
  listaRegionales = [];
  representantes: any[] = [];
  representanteFiltrado: any = [];
  paginate = ["representanteFiltrado"];
  filterRegional = null;
  filterCentro = null;
  filterFase = "";
  contHombres = 0;
  contMujeres = 0;
  regional = null;
 

  id_regional = null;

  mounted() {
    this.obtenerRegionales();
    this.obtenerRepresentantes();
  }
  obtenerRegionales() {
    Axios()
      .get("listar_regionales")

      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaRegionales = respuesta.data.results;
        } else {
          Swal.fire({
            title: "Hubo un error obteniendo los Representantes",
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
obtenerRepresentantes() {
    Axios()
      .get("reporte_representante")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.representantes = respuesta.data.results;
          this.representanteFiltrado = respuesta.data.results;
          let arregloFiltrado = [];

          for (let rep of this.representantes) {
            let regional = rep.regional;
            if (
              regional.indexOf(
                JSON.parse(sessionStorage.getItem("usuario")).regional
              ) >= 0
            ) {
              arregloFiltrado.push(rep);
            }
            this.representantes = arregloFiltrado;
            this.representanteFiltrado = arregloFiltrado;
          }
          if (this.representanteFiltrado.length == 0) {
            //busco no encontro
            Swal.fire({
              title: "No hay coincidencias",
              position: "center",
              timer: 1000,
              text: "No se encontró Representantes que coincidan con las busqueda",
              showConfirmButton: false,
              // confirmButtonText: "Aceptar",
              // confirmButtonColor: "#238276",
              backdrop: "rgba(0,0,0,0)",
              background: "#eeeeee",
            });
            this.regional = null;
            this.representanteFiltrado = this.representantes;
          }
          this.generarContadoresPorFase();
        } else {
          Swal.fire({
            title: "Hubo un error obteniendo los Representantes",
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
  buscarCentrosSegunRegional(id_regional) {
    Axios()
      .get("listar_centro_formacion_regional/ " + id_regional)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaCentros = respuesta.data.results;
        } else {
          Swal.fire({
            title: "Hubo un error obteniendo los Representantes",
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
  picFiltrado() {
    let arregloFiltrado = [];
  
    for (let adj of this.representantes) {
      let regional = adj.regional;

      if (regional.indexOf(this.filterRegional.regional) >= 0) {
        arregloFiltrado.push(adj);
      }
    }

    this.representanteFiltrado = arregloFiltrado;
    if (this.representanteFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró Representantes que coincidan con las busqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      // this.filter = "";
      this.representanteFiltrado = this.representantes;
    }
  }
  filtroCentro() {
    let arregloFiltrado = [];

    for (let rep of this.representantes) {
      let centro = rep.centro_formacion;
      if (centro.indexOf(this.filterCentro) >= 0) {
        arregloFiltrado.push(rep);
      }
      this.representanteFiltrado = arregloFiltrado;
    }
    if (this.representanteFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró Representantes que coincidan con las busqueda",
        showConfirmButton: false,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filterCentro = null;
      this.representanteFiltrado = this.representantes;
    }
  }

  exportExcel() {
    let data = XLSX.utils.json_to_sheet(this.representanteFiltrado, {
      header: [
        "regional",
        "centro formacion",
      
      ],
    });
      (data["A1"].v = "regional"),
      (data["B1"].v = "centro formacion");
     
     
    const workbook = XLSX.utils.book_new();
    const filename =
      "Reporte Representante " +
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1);
    XLSX.utils.book_append_sheet(workbook, data, filename);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }
    generarContadoresPorFase() {
    for (let i of this.representantes) {
      if (i.genero_id == "M") {
        this.contHombres = this.contHombres + 1;
      }
      if (i.genero_id == "F") {
        this.contMujeres = this.contMujeres + 1;
      }
    }
}
}
</script>