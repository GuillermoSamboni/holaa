<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">PROGRAMAS PROYECTADOS</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
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
              <b-button
                type="azul-sena"
                class="btn btn-block bg-azul-sena text-white"
                tooltip="Registrar Nuevo"
                tooltip-flow="top"
                :to="{
                  name: 'RegistrarProgramasProyectados',
                  params: {
                    id_convenio: id_convenio,
                  },
                }"
              >
                Registrar programa proyectado
              </b-button>
            </div>
            <div class="col-lg-4 col-sm-12 mt-1">
              <base-button
                type="azul-sena"
                @click="cambiarFaseConvenio()"
                class="btn btn-block bg-azul-sena text-white"
              >
                Iniciar Sensibilización
              </base-button>
            </div>
            <!-- <div class="col-sm-12 col-md-9">
              <div class="nav justify-content-end">
                <b-button
                  class="btn btn-sm bg-azul-sena text-white"
                  tooltip="Registrar Nuevo"
                  tooltip-flow="top"
                  :to="{
                    name: 'RegistrarProgramasProyectados',
                    params: {
                      id_convenio: id_convenio,
                    },
                  }"
                >
                  Registrar Programa Proyectado
                </b-button>
              </div>
            </div> -->
          </div>
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaProgramasProyectadosFiltrado"
              :list="listaProgramasProyectadosFiltrado"
              :per="9"
            >
              <table class="table table-hoverble">
                <!-- {{listaProgramasProyectadosFiltrado}} -->
                <thead id="listado">
                  <tr>
                    <th scope="col">id</th>
                    <!-- <th scope="col">id_convenio</th> -->
                    <th scope="col">Programa Formación</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(programa, key) in paginated(
                    'listaProgramasProyectadosFiltrado'
                  )"
                  :key="key"
                >
                  <td>{{ programa.id_convenio_programa_proyectado }}</td>
                  <!-- <td>{{ programa.convenio_id }}</td> -->
                  <td>{{ programa.programa_formacion }}</td>
                  <td scope="row">
                    <div
                      class="btn-toolbar btn-responsive-table"
                      role="toolbar"
                    >
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
                              name: 'VerDetalleProgramasProyectados',
                              params: {
                                id: programa.id_convenio_programa_proyectado,
                              },
                            }"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>
                        </div>
                      </div>

                      <div
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
                      </div>
                    </div>
                  </td>
                </tbody>
              </table>
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
              'li.active': 'active1',
            }"
          ></paginate-links>
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

  estadoPeticion = false;
  idConvenio = null;
  filter = "";
  paginate = ["listaProgramasProyectadosFiltrado"];

  estadoPeticionTabla = false;
  id_convenio = null;

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
    this.idConvenio = this.$route.params.id;
    this.obtenerConvenio(this.$route.params.id);
    this.obtenerProgramas();
    this.id_convenio = this.$route.params.id_convenio;
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
      .get("listar_programa_proyectado/" + this.$route.params.id_convenio)
      .then((respuesta) => {
        this.programasProyectados = respuesta.data.results;
        this.listaProgramasProyectados = respuesta.data.results;
        this.listaProgramasProyectadosFiltrado = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  // obtenerEstadosPrograma(id) {
  //   Axios()
  //     .get("listar_estados")
  //     .then((respuesta) => {
  //       if (respuesta.data.status == "success") {
  //         this.listaEstadosProgramas = respuesta.data.results;
  //       } else {
  //         Swal.fire({
  //           title: "Estado Programa",
  //           icon: "info",
  //           confirmButtonText: "Aceptar",
  //           confirmButtonColor: "#238276",
  //         });
  //       }
  //     });
  // }

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
          fase_id: 3,
          id_actualiza: JSON.parse(sessionStorage.getItem("usuario")),
        })
        .then(() => {
          Swal.fire({
            title: "Cambio de fase correcto!",
            text: "El Convenio pasó a Sensibilizar programa exitosamente!",
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
  eliminarPrograma(id, index) {
    Swal.fire({
      title: "Eliminar Programa ",
      text:
        this.listaProgramasProyectadosFiltrado[index].programa_formacion + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_programa_proyectado/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Programa Eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaProgramasProyectadosFiltrado.splice(index, 1);
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
}
</script>
