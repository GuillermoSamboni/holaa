<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <h1 class="text-azul-sena">Lista Reportes Pane Centro</h1>

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
                        Total lineamientos
                      </h5>
                      <span class="h2 font-weight-bold mb-0">{{
                        listarLineamientosFiltrado.length
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
                          proceso estrategico
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          numTipoProcesoEs
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
                          proceso misionales
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          numTipoProcesoMi
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
                          procesos de soporte
                        </h5>
                        <span class="h2 font-weight-bold mb-0">{{
                          numTipoProcesoSo
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
          <div class="col-lg-2 col-sm-12 mr-4 mt-2">
            <select
              class="form-control"
              id="sector"
              name="sector"
              v-model="filterProceso"
              @change="filtroProcesos()"
            >
              <option value="" selected disabled>Procesos</option>
              <option value="">Todas</option>
              <option
                v-for="(proce, key) in procesos"
                :key="key"
                v-bind:value="proce.proceso"
              >
                {{ proce.proceso }}
              </option>
            </select>
            <!-- v-validate="{ required }" -->
          </div>
          <div class="col-lg-2 col-sm-12 mr-4 mt-2">
            <select
              class="form-control"
              id="sector"
              name="sector"
              v-model="filterPeriodicidades"
              @change="filtroPeriodicidades()"
            >
              <option value="" selected disabled>Periodicidad 1</option>
              <option value="">Todas</option>
              <option
                v-for="(perio, key) in periodicidades"
                :key="key"
                v-bind:value="perio.periodicidad"
              >
                {{ perio.periodicidad }}
              </option>
            </select>
            <!-- v-validate="{ required }" -->
          </div>
          <div class="col-lg-2 col-sm-12 mr-4 mt-2">
            <select
              class="form-control"
              id="sector"
              name="sector"
              v-model="filterRolEstrategicos"
              @change="filtroRolesEstrategicos()"
            >
              <option value="" selected disabled>Rol Estrategico</option>
              <option value="">Todas</option>
              <option
                v-for="(roles, key) in rolesEstrategicos"
                :key="key"
                v-bind:value="roles.rol_operativo"
              >
                {{ roles.rol_operativo }}
              </option>
            </select>
            <!-- v-validate="{ required }" -->
          </div>
          <div class="col-lg-2 col-sm-12 mr-4 mt-2">
            <select
              class="form-control"
              id="sector"
              name="sector"
              v-model="filterRolRegionales"
              @change="filtroRolesRegionales()"
            >
              <option value="" selected disabled>Rol Regional</option>
              <option value="">Todas</option>
              <option
                v-for="(rolreg, key) in rolesRegional"
                :key="key"
                v-bind:value="rolreg.rol_operativo"
              >
                {{ rolreg.rol_operativo }}
              </option>
            </select>
          </div>
          <div class="col-lg-2 col-sm-12 mr-4 mt-2">
            <select
              class="form-control"
              id="sector"
              name="sector"
              v-model="filterEjes"
              @change="filtroEjes()"
            >
              <option value="" selected disabled>Eje</option>
              <option value="">Todas</option>
              <option
                v-for="(eje, key) in listarEjes"
                :key="key"
                v-bind:value="eje.eje"
              >
                {{ eje.eje }}
              </option>
            </select>
            <!-- v-validate="{ required }" -->
          </div>
          <div class="col-lg-3 col-sm-12 mr-4 mt-2">
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
      </div>
      <paginate-links
        class="pagination justify-content-end"
        for="listarLineamientosFiltrado"
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
      <div class="scroll-vertical table-responsive">
        <paginate
          ref="paginator"
          name="listarLineamientosFiltrado"
          :list="listarLineamientosFiltrado"
          :per="10"
        >
          <table class="table table-hoverble">
            <thead id="listado">
              <tr>
                <th class="text-nowrap">PROCESO NIVEL 1</th>
                <th class="text-nowrap">PROCESO NIVEL 2</th>
                <th class="text-nowrap">DEPENDENCIA</th>
                <th class="text-nowrap">GRUPO</th>
                <th class="text-nowrap">PERSPECTIVA</th>
                <th class="text-nowrap">OBJETIVO</th>
                <th class="text-nowrap">INDICADOR</th>
                <th class="text-nowrap">PACTO</th>
                <th class="text-nowrap">LINEA</th>
                <th class="text-nowrap">OBJETIVO</th>
                <th class="text-nowrap">ESTRATEGIA</th>
                <th class="text-nowrap">DIMENSIONES</th>
                <th class="text-nowrap">POLITICAS</th>
                <th class="text-nowrap">PLANES</th>
                <th class="text-nowrap">TEMA</th>
                <th class="text-nowrap">LINEAMIENTO</th>
                <th class="text-nowrap">ACCIÓN</th>
                <th class="text-nowrap">RESULTADO ESPERADO</th>
                <th class="text-nowrap">HERRAMIENTA DE SEGUIMIENTO 1</th>
                <th class="text-nowrap">OBSERVACIÓN 1</th>
                <th class="text-nowrap">PERIODICIDAD 1</th>
                <th class="text-nowrap">HERRAMIENTA DE SEGUIMIENTO 2</th>
                <th class="text-nowrap">OBSERVACIÓN 2</th>
                <th class="text-nowrap">PERIODICIDAD 2</th>
                <th class="text-nowrap">ROL</th>
                <th class="text-nowrap">RESPONSABLE DIRECCIÓN GENERAL</th>
                <th class="text-nowrap">RESPONSABLE DESPACHO REGIONAL</th>
                <th class="text-nowrap">RESPONSABLE CENTRO DE FORMACIÓN</th>
                <th class="text-nowrap">CENTRO DE FORMACION</th>
                <th class="text-nowrap">ANEXO</th>
                <th class="text-nowrap">GLOSARIO</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="listarLineamientosFiltrado != null">
                <tr
                  v-for="(lineamiento, key) in paginated(
                    'listarLineamientosFiltrado'
                  )"
                  :key="key"
                  
                ><td v-if="lineamiento.centro_formacion_id == usuario.centro_formacion">
                </td>
                  <td>
                    <div>{{ lineamiento.tipo_proceso }}</div>
                  </td>

                  <td class="campos">
                    <div class="primera-seccion">{{ lineamiento.proceso }}</div>
                  </td>

                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.dependencia }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="tercera-seccion">{{ lineamiento.grupo }}</div>
                  </td>
                  <td>
                    <div>{{ lineamiento.perspectiva }}</div>
                  </td>
                  <td>
                    <div>{{ lineamiento.objetivo_estrategico }}</div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.indicador }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">{{ lineamiento.pacto }}</div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">{{ lineamiento.linea }}</div>
                  </td>

                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.pes_objetivo }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.pes_estrategia }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.mipg_dimenciones }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.mipg_politicas }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.mipg_planes }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.linea_tema }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.lineamiento }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.actividad }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.resultado_esperado }}
                    </div>
                  </td>
                  <td>{{ lineamiento.herramienta_seguimiento_1 }}</td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.observacion1 }}
                    </div>
                  </td>
                  <td>{{ lineamiento.periodicidad_1 }}</td>
                  <td>{{ lineamiento.herramienta_seguimiento_2 }}</td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.observacion2 }}
                    </div>
                  </td>
                  <td>{{ lineamiento.periodicidad_2 }}</td>
                  <td>{{ lineamiento.rol_estrategico }}</td>
                  <td>{{ lineamiento.rol_direccion_general }}</td>
                  <td>{{ lineamiento.rol_despacho_regional }}</td>
                  <td>{{ lineamiento.rol_centro_formacion }}</td>
                  <td>{{ lineamiento.centro_formacion}}</td>
                  <td class="campos">
                    <div class="segunda-seccion">{{ lineamiento.anexo }}</div>
                  </td>
                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.glosario }}
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-else>
                No Encontrado
              </tr>
            </tbody>
          </table>
        </paginate>
      </div>
      <paginate-links
        class="pagination justify-content-end"
        for="listarLineamientosFiltrado"
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
      <div class="justify-content-center"></div>
    </div>
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import XLSX from "xlsx";
export default {
  name: "ReportePaneCentro",

  mounted() {
    this.listarPaneNacional();
    this.obtenerProcesos();
    this.obtenerPeriodicidades();
    this.obtenerRolesEstrategicos();
    this.obtenerEjes();
  },
  data: function () {
    return {
      usuario: JSON.parse(sessionStorage.getItem("usuario")),
      listarLineamientos: [],
      listarLineamientosFiltrado: [],
      paginate: ["listarLineamientosFiltrado"],
      actividades: [],
      actividadesFiltrado: [],
      procesos: [],
      grupos: [],
      periodicidades: [],
      rolesEstrategicos: [],
      rolesRegional: [],
      listarEjes: [],
      id_regional: [],
      numTipoProcesoEs: 0,
      numTipoProcesoMi: 0,
      numTipoProcesoSo: 0,
      filterProceso: "",
      filterPeriodicidades: "",
      filterRolEstrategicos: "",
      filterRolRegionales: "",
      filterEjes: "",
      proceso: {
        id_proceso: "",
        id_grupo: "",
      },
      regional: {
        id_regional: null,
        regional: null,
      },
      centro_formacion: {
        id_centro_formacion: null,
        centro_formacion:null
      },
    };
  },
  methods: {
    listarPaneNacional() {
      Axios()
        .get("listar_lineamientos")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listarLineamientos = respuesta.data.results;
            this.listarLineamientosFiltrado = respuesta.data.results;
              this.recorerLineamientos(
              respuesta.data.status,
              respuesta.data.message
            );

          } else {
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
    async recorerLineamientos(status, message) {
      let arregloFiltrado = [];

      for (let lineami of this.listarLineamientos) {
        let centro_formacion = lineami.centro_formacion;
        if (
          centro_formacion.indexOf(
            JSON.parse(sessionStorage.getItem("usuario")).centro_formacion
          ) >= 0
        ) {
          arregloFiltrado.push(lineami);
        }
        this.listarLineamientos = arregloFiltrado;
        this.listarLineamientosFiltrado = arregloFiltrado;
      }
      this.generarContadoresPorFase();
      if (this.listarLineamientosFiltrado < 0) {
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró que coincidan con las busqueda",
          showConfirmButton: false,
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.centro_formacion = null;
        this.listarLineamientosFiltrado   = this.listarLineamientos;
      }
    },
    obtenerProcesos() {
      Axios()
        .get("crear_grupo")
        .then((respuesta) => {
          this.procesos = respuesta.data.results.procesos;
          this.grupos = respuesta.data.results.grupos;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    obtenerPeriodicidades() {
      Axios()
        .get("crear_actividad")
        .then((respuesta) => {
          this.periodicidades = respuesta.data.results.periodicidad;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    obtenerRolesEstrategicos() {
      Axios()
        .get("crear_actividad")
        .then((respuesta) => {
          this.rolesEstrategicos = respuesta.data.results.rolEstrategico;
          this.rolesRegional = respuesta.data.results.rolRegional;
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
        .get("crear_indicador")
        .then((respuesta) => {
          this.listarEjes = respuesta.data.results.ejes;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    filtroProcesos() {
      let arregloFiltrado = [];

      for (let proc of this.listarLineamientos) {
        let proceso = proc.proceso;
        if (proceso.indexOf(this.filterProceso) >= 0) {
          arregloFiltrado.push(proc);
        }
        this.listarLineamientosFiltrado = arregloFiltrado;
      }
      if (this.listarLineamientosFiltrado.length == 0) {
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
        this.filterProceso = "";
        this.listarLineamientosFiltrado = this.listarLineamientos;
      }
    },
    filtroPeriodicidades() {
      let arregloFiltrado = [];

      for (let peri of this.listarLineamientos) {
        let periodocidad = peri.periodicidad_1;
        if (periodocidad.indexOf(this.filterPeriodicidades) >= 0) {
          arregloFiltrado.push(peri);
        }
        this.listarLineamientosFiltrado = arregloFiltrado;
      }
      if (this.listarLineamientosFiltrado.length == 0) {
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
        this.filterPeriodicidades = "";
        this.listarLineamientosFiltrado = this.listarLineamientos;
      }
    },
    filtroRolesEstrategicos() {
      let arregloFiltrado = [];

      for (let rol of this.listarLineamientos) {
        let roles = rol.rol_estrategico;
        if (roles.indexOf(this.filterRolEstrategicos) >= 0) {
          arregloFiltrado.push(rol);
        }
        this.listarLineamientosFiltrado = arregloFiltrado;
      }
      if (this.listarLineamientosFiltrado.length == 0) {
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
        this.filterRolEstrategicos = "";
        this.listarLineamientosFiltrado = this.listarLineamientos;
      }
    },
    filtroRolesRegionales() {
      let arregloFiltrado = [];

      for (let rolR of this.listarLineamientos) {
        let rolesregi = rolR.rol_despacho_regional;
        if (rolesregi.indexOf(this.filterRolRegionales) >= 0) {
          arregloFiltrado.push(rolR);
        }
        this.listarLineamientosFiltrado = arregloFiltrado;
      }
      if (this.listarLineamientosFiltrado.length == 0) {
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
        this.filterRolRegionales = "";
        this.listarLineamientosFiltrado = this.listarLineamientos;
      }
    },
    filtroEjes() {
      let arregloFiltrado = [];

      for (let ej of this.listarLineamientos) {
        let ejes = ej.eje;
        if (ejes.indexOf(this.filterEjes) >= 0) {
          arregloFiltrado.push(ej);
        }
        this.listarLineamientosFiltrado = arregloFiltrado;
      }
      if (this.listarLineamientosFiltrado.length == 0) {
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
        this.filterEjes = "";
        this.listarLineamientosFiltrado = this.listarLineamientos;
      }
    },
    exportExcel: function () {
      let data = XLSX.utils.json_to_sheet(this.listarLineamientosFiltrado, {
        header: [
          "tipo_proceso",
          "proceso",
          "dependencia",
          "grupo",
          "perspectiva",
          "objetivo_estrategico",
          "indicador",
          "pacto",
          "linea",
          "pes_objetivo",
          "pes_estrategia",
          "mipg_dimenciones",
          "mipg_politicas",
          "mipg_planes",
          "linea_tema",
          "lineamiento",
          "actividad",
          "resultado_esperado",
          "herramienta_seguimiento_1",
          "observacion1",
          "periodicidad_1",
          "herramienta_seguimiento_2",
          "observacion2",
          "periodicidad_2",
          "rol_estrategico",
          "rol_direccion_general",
          "rol_despacho_regional",
          "rol_centro_formacion",
          "centro_formacion",
          "anexo",
          "glosario",
        ],
      });
      (data["A1"].v = "PROCESO NIVEL 1"),
        (data["B1"].v = "PROCESO NIVEL 2"),
        (data["C1"].v = "DEPENDENCIA"),
        (data["D1"].v = "GRUPO"),
        (data["E1"].v = "PERSPECTIVA");
      data["F1"].v = "OBJETIVO";
      data["G1"].v = "INDICADOR";
      data["H1"].v = "PACTO";
      data["I1"].v = "LINEA";
      data["J1"].v = "OBJETIVO";
      data["K1"].v = "ESTRATEGIA";
      data["L1"].v = "DIMENSIONES";
      data["M1"].v = "POLITICAS";
      data["N1"].v = "PLANES";
      data["O1"].v = "TEMA";
      data["P1"].v = "LINEAMIENTO"
      data["Q1"].v = "ACCIÓN";
      data["R1"].v = "RESULTADO ESPERADO";
      data["S1"].v = "HERRAMIENTA DE SEGUIMIENTO 1";
      data["T1"].v = "OBSERVACIÓN 1";
      data["U1"].v = "PERIODICIDAD 1";
      data["V1"].v = "HERRAMIENTA DE SEGUIMIENTO 2";
      data["W1"].v = "OBSERVACIÓN 2";
      data["X1"].v = "PERIODICIDAD 2";
      data["Y1"].v = "ROL";
      data["Z1"].v = "RESPONSABLE DIRECCIÓN GENERAL";
      data["AA1"].v = "RESPONSABLE DESPACHO REGIONAL";
      data["AB1"].v = "RESPONSABLE CENTRO DE FORMACIÓN";
      data["AC1"].v = "CENTRO DE FORMACIÓN";
      data["AD1"].v = "ANEXO";
      data["AE1"].v = "GLOSARIO";

      const workbook = XLSX.utils.book_new();
      const filename =
        "Reporte Pane Centro " +
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1);
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    generarContadoresPorFase() {
      for (let i of this.listarLineamientos) {
        if (i.tipo_proceso == "Proceso Estrategico") {
          this.numTipoProcesoEs = this.numTipoProcesoEs + 1;
        } else if (i.tipo_proceso == "Procesos Misionales") {
          this.numTipoProcesoMi = this.numTipoProcesoMi + 1;
        } else if (i.tipo_proceso == "proceso de soporte") {
          this.numTipoProcesoSo = this.numTipoProcesoSo + 1;
        }
      }
    },
  },
};
</script>
<style scoped>
.campos .primera-seccion {
  margin: 0%;
  width: 400px;
}
.campos .segunda-seccion {
  width: 1000px;
}
.campos .tercera-seccion {
  width: 200px;
}
.campos {
  margin: 0%;
  width: 100%;
}
.scroll-vertical {
  overflow: scroll;
  max-height: 400px;
}
</style>
