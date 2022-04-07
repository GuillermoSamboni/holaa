<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">PROGRAMAS APROBADOS</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <div class="row my-3">
                <div class="col-md-3 col-lg-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Buscar Programa Formación"
                    v-model="filter"
                    @keyup.prevent="ProgramaFiltrado()"
                  />
                </div>

                <div class="col-lg-4 col-sm-12 mt-1">
                  <base-button
                    type="azul-sena"
                    @click="cambiarFaseConvenio()"
                    class="btn btn-block bg-azul-sena text-white"
                  >
                    Fase viabilidad
                  </base-button>
                </div>
              </div>
              <div class="table-responsive">
                <paginate
                  ref="paginator"
                  name="listaProgramasProyectadosFiltrado"
                  :list="listaProgramasProyectadosFiltrado"
                  :per="7"
                >
                  <table class="table table-hoverble">
                    <!-- {{listaProgramasProyectadosFiltrado}} -->
                    <thead id="listado">
                      <tr>
                        <th scope="col">id</th>
                        <!-- <th scope="col">id_convenio</th> -->
                        <th scope="col">Programa Formación</th>
                        <th scope="col">Estado</th>
                        <th scope="col" class="col-sm-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="(programa, key) in paginated(
                        'listaProgramasProyectadosFiltrado'
                      )"
                      :key="key"
                    >
                      <!-- {{programa}} -->
                      <td>{{ programa.programa_formacion_id }}</td>
                      <td>{{ programa.programa_formacion }}</td>
                      <td>{{ programa.estado }}</td>
                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver Programa"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'VerDetalleProgramasAprobados',
                                params: {
                                  id: programa.id_convenio_programa_proyectado
                                }
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>

                          <!-- v-if="programa.id_estado_programa_proyectado == 2" -->
                          <div
                            class="btn-group btn-spc"
                            tooltip="Aprobar programa"
                            tooltip-flow="top"
                          >
                            <b-button
                              type="azul-sena"
                              @click="
                                registrarColegioProgramaConvenio(
                                  programa.programa_formacion_id,
                                  programa.programa_formacion
                                )
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-plus"></i>
                            </b-button>
                          </div>

                          <!-- <div
                        v-if="programa.id_estado_programa_proyectado == 1"
                        class="btn-group btn-spc"
                        tooltip="Desaprobar programa"
                        tooltip-flow="top"
                      >
                        <b-button
                          type="azul-sena"
                          @click="
                            cambiarEstadoPrograma(
                              programa.id_convenio_programa_proyectado,
                              2
                            )
                          "
                          class="btn btn-sm bg-azul-sena text-white"
                        >
                          <i class="fas fa-minus-square"></i>
                        </b-button>
                      </div> -->

                          <!-- <b-button
                          type="azul-sena"
                          @click="
                            cambiarEstadoPrograma(
                              programa.id_convenio_programa_proyectado,
                              1
                            )
                          "
                          class="btn btn-sm bg-azul-sena text-white"
                        >
                          <i class="fas fa-minus-square"></i>
                        </b-button> -->
                          <!-- <div
                        class="btn-group btn-spc"
                        tooltip="Eliminar Programa"
                        tooltip-flow="top"
                      >
                        <a
                          @click="
                            eliminarPrograma(
                              programa.id_convenio_programa_proyectado,
                              key
                            )
                          "
                          class="btn btn-sm bg-azul-sena text-white"
                        >
                          <i class="fas fa-trash"></i>
                        </a>
                      </div> -->
                        </div>
                      </td>
                    </tbody>
                  </table>
                  <!-- {{this.programasProyectados[0].id_convenio_programa_proyectado + "aaaaaaaaaa2"}} -->
                </paginate>
              </div>
              <paginate-links
                class="pagination justify-content-end"
                for="listaProgramasProyectadosFiltrado"
                :limit="2"
                :hide-single-page="true"
                :show-step-links="true"
                :full-page="true"
                :classes="{
                  ul: 'simple-links-container',
                  li: 'simple-links-item',
                  liActive: ['simple-links-item', 'active1'],
                  'li.active': 'active1'
                }"
              ></paginate-links>
            </div>

            <div class="col-md-6 col-lg-6">
              <div class="row my-3">
                <div class="col-md-6 col-lg-6">
                  <strong class="text-azul-sena">Programas colegio</strong>
                </div>
                <div class="col-md-6 col-lg-6">
                  <paginate-links
                    class="pagination justify-content-end"
                    for="programasProyectTemp"
                    :limit="2"
                    :hide-single-page="true"
                    :show-step-links="true"
                    :full-page="true"
                    :classes="{
                      ul: 'simple-links-container',
                      li: 'simple-links-item',
                      liActive: ['simple-links-item', 'active1'],
                      'li.active': 'active1'
                    }"
                  ></paginate-links>
                </div>
              </div>

              <div class="table-responsive">
                <paginate
                  ref="paginator"
                  name="programaColegioFiltrado"
                  :list="programaColegioFiltrado"
                  :per="7"
                >
                  <table class="table table-hoverble">
                    <thead id="listado">
                      <tr>
                        <th scope="col" class="col-sm-4">Convenio</th>
                        <th scope="col" class="col-sm-4">Colegio</th>
                        <th scope="col" class="col-sm-4">
                          Programas Formación
                        </th>
                        <th scope="col" class="col-sm-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(Programa, key) in paginated('programaColegioFiltrado')" :key="key">
                        <td>{{ Programa.am_convenio.convenio }}</td>
                        <td>{{ Programa.am_colegio.colegio }}</td>
                        <td>
                          {{ Programa.programa_formacion.programa_formacion }}
                        </td>

                        <div
                          class="btn-group btn-spc"
                          tooltip="Eliminar programa"
                          tooltip-flow="top"
                        >
                          <button
                            class="btn btn-sm bg-azul-sena text-white"
                            @click="
                              eliminarColegioPrograma(
                                Programa.id_colegio_programa,
                                key
                              )
                            "
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                        <!-- <td scope="row">
                  <div class="btn-toolbar btn-responsive-table" role="toolbar">
                    <div
                      class="btn-group btn-spc"
                      tooltip="Ver Eje"
                      tooltip-flow="top"
                    >
                      <router-link class="btn btn-sm bg-azul-sena text-white">
                        <i class="fas fa-eye"></i>
                      </router-link>
                    </div>
                    <div
                      class="btn-group btn-spc"
                      tooltip="Modificar Eje"
                      tooltip-flow="top"
                    >
                      <router-link class="btn btn-sm bg-azul-sena text-white">
                        <i class="fas fa-edit"></i>
                      </router-link>
                    </div>
                  </div>
                </td> -->
                      </tr>
                    </tbody>
                  </table>
                  <!-- <table class="table table-hoverble">
                    <thead id="listado">
                      <tr>
                        <th>Programa de formación</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(ProgramasFormacion, index) in paginated(
                          'programasProyectTemp'
                        )"
                        :key="index"
                      >
                        <td>{{ ProgramasFormacion.programa_formacion }}</td>
                        <td scope="row">
                          <div
                            class="btn-toolbar btn-responsive-table"
                            role="toolbar"
                          >
                            <div
                              class="btn-group btn-spc"
                              tooltip="Eliminar Programa"
                              tooltip-flow="top"
                            >
                              <base-button
                                type="azul-sena"
                                @click="eliminar(programasProyectTemp)"
                                class="btn btn-sm bg-azul-sena text-white"
                              >
                                <i class="fas fa-trash"></i>
                              </base-button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table> -->
                </paginate>
              </div>

              <paginate-links
                class="pagination justify-content-end"
                for="programaColegioFiltrado"
                :limit="2"
                :hide-single-page="true"
                :show-step-links="true"
                :full-page="true"
                :classes="{
                  ul: 'simple-links-container',
                  li: 'simple-links-item',
                  liActive: ['simple-links-item', 'active1'],
                  'li.active': 'active1'
                }"
              ></paginate-links>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import Component from "vue-class-component";
  import { Vue } from "vue-property-decorator";
  import AnimacionCargando from "../../../components/animacionCargando.vue";
  import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";

  @Component({
    components: {
      AnimacionCargando,
      AnimacionTablasCargando,
    },
  })
  export default class listaProgramasProyectados2 extends Vue {
    listaProgramasProyectados = [];
    listaProgramasProyectadosFiltrado: any[] = [];
    listaEstadosProgramas: any[] = [];
    programaColegio: any[] = [];
    programaColegioFiltrado: any[] = [];


    estadoPeticion = false;
    idConvenio = null;
    filter = "";
    paginate = ["listaProgramasProyectadosFiltrado", "programaColegioFiltrado"];

    estadoPeticionTabla = false;
    id_convenio = null;
    estadoPrograma = null;

    Programa = {
      id_colegio_programa: "",
      colegio_id: "",
      programa_formacion_id: "",
      convenio_id: ""
    }

    programasProyectados = {
      centro_formacion_id: "",
      colegio_cargo: "",
      colegio_id: "",
      convenio_id: "",
      fase_id: "",
      fecha_final: "",
      fecha_firma: "",
      fecha_inicio: "",
      id_convenio_programa_proyectado: "",
      numero_convenio: "",
      programa_formacion: "",
      programa_formacion_id: "",
      regional_id: "",
      sena_cargo: "",
      sena_persona_id: "",
    };

    convenio = {
      convenio: "",
      id_convenio: "",
      regional_id: "",
      regional: "",
      id_centro_formacion: "",
      centro_formacion: "",
      fase_id: "",
      fase: "",
      sena_persona_id: "",
      numero_convenio: "",
      fecha_firma: "",
      fecha_inicio: "",
      fecha_final: "",
      sena_cargo: "",
      colegio_cargo: "",
      minuta: "",
    };

    mounted() {

      this.obtenerConvenio(this.$route.params.id);
      this.obtenerProgramas();
      this.id_convenio = this.$route.params.id_convenio;
      this.obtenerColegioPrograma();

    }
    ProgramaFiltrado() {
      let picFilter = [];
      // this.listaConvocatoriasFiltrado = []

      for (let programa of this.listaProgramasProyectados) {
        let programaP = programa.programa_formacion.toLowerCase();

        if (programaP.indexOf(this.filter) >= 0) {
          picFilter.push(programa);
        }
      }

      this.listaProgramasProyectadosFiltrado = picFilter;
      if (this.listaProgramasProyectadosFiltrado.length == 0) {
        //busco no encontro
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró la capacitación, que coincida con la búsqueda",
          showConfirmButton: false,
          // confirmButtonText: "Aceptar",
          // confirmButtonColor: "#238276",
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.filter = "";
        this.listaProgramasProyectadosFiltrado = this.listaProgramasProyectados;
      }
    }
    obtenerProgramas() {
      Axios()
        .get("listar_programa_aprobado/" + this.$route.params.id_convenio)
        .then((respuesta) => {
          this.programasProyectados = respuesta.data.results;
          this.listaProgramasProyectados = respuesta.data.results;
          this.listaProgramasProyectadosFiltrado = respuesta.data.results;
        })
        .finally(() => {
          this.estadoPeticionTabla = true;
        });
    }
    obtenerConvenio(id) {
      Axios()
        .get("ver_detalle_convenio/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.convenio = respuesta.data.results;
          }
        });
    }

    cambiarFaseConvenio() {
      if (this.listaProgramasProyectadosFiltrado == null) {
        Swal.fire({
          title: "Informacion",
          text: "Para Sensibilizar debe tener almenos 1",
          icon: "warning",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-azul-sena",
          },
        });
      } else {
        Axios()
          .put("modificar_fase_convenio/" + this.id_convenio, {
            id_convenio: this.id_convenio,
            fase_id: 5,
            id_actualiza: JSON.parse(sessionStorage.getItem("usuario")),
          })
          .then(() => {
            Swal.fire({
              title: "Cambio de fase correcto!",
              text: "El Convenio pasó a viabilidad exitosamente!",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
              icon: "success",
            });
            this.$router.push("GestionarConvenio");
          })
          .catch(() => {
            Swal.fire({
              title: "ERROR",
              text: "No se puede cambiar de fase",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
              icon: "error",
            });
          });
      }
    }
    eliminarColegioPrograma(id, index) {
      Swal.fire({
        title: "Eliminar Programa ",
        text:
        this.programaColegioFiltrado[index].programa_formacion.programa_formacion + "?",
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_colegio_programa/" + id)
            .then((respuesta) => {
              if (respuesta.data.status == "success") {
                Swal.fire({
                  title: "Programa Eliminado",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
                this.programaColegioFiltrado.splice(index, 1);
              } else {
                Swal.fire({
                  title: "No se pudo eliminar el Programa Proyectado",
                  text: respuesta.data.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                  customClass: {
                  confirmButton: "btn btn-azul-sena",
                  },
                });
                this.$router.back();
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
      });
    }

    cambiarEstadoPrograma(id_convenio_programa_proyectado, estado) {
      // alert(id_convenio_programa_proyectado)
      Axios()
        .post("modificar_estado_aprobado", {
          id_convenio_programa_proyectado: id_convenio_programa_proyectado,
          estado_programa_proyectado_id: estado,
          // id_actualiza: JSON.parse(sessionStorage.getItem("usuario")),
        })
        .then(() => {
          Swal.fire({
            title: "Cambio de fase correcto!",
            text: "El Convenio pasó a Sensibilizar programa exitosamente!",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            icon: "success",
          });
          this.$router.push({ name: "GestionarProgramasAprobados" });
          this.obtenerProgramas();
        })
        .catch(() => {
          Swal.fire({
            title: "ERROR",
            text: "No se puede cambiar de fase",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            icon: "error",
          });
        });
    }

    registrarColegioProgramaConvenio(id_programa_formacion, programa_formacion) {
      Axios()
        .post("almacenar_colegio_programa", {
          colegio_id: this.$route.params.id_colegio,
          convenio_id: this.$route.params.id_convenio,
          programa_formacion_id: id_programa_formacion,
        })
        .then((respuesta) => {
          //200->exitosas
          if (respuesta.data.status.toLowerCase() == "success") {
            Swal.fire({
              title: "Se vinculo el programa!",
              text: "El programa " + programa_formacion + " se vinculo exitosamente al colegio",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "No se vinculo el programa",
              text: respuesta.data.message,
              icon: "error",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
            });
          }
        })
        .catch(() => {
          //500->error deservidor
          //400->error del cliente
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    }

    obtenerColegioPrograma() {
      Axios()
        .get("/listar_colegio_programa/" + this.id_convenio )
        .then((respuesta) => {
          this.programaColegio = respuesta.data.results;
          this.programaColegioFiltrado = respuesta.data.results;

          if (respuesta.data.status == "success") {
          } else {
            Swal.fire("ERROR!", "No se ha encontrado", "error");
          }
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        })
        .finally(() => { });
    }
  }
</script>
