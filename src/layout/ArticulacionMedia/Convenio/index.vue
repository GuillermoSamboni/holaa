<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA CONVENIOS</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row my-3">
            <div class="col-md-3 col-lg-3 mt-4">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar Convenio"
                v-model="filter"
                @keyup.prevent="convenioFiltrado()"
              />
            </div>
            <div class="col-md-9 col-lg-9 mt-4">
              <paginate-links
                class="pagination justify-content-end"
                for="listaConveniosFiltrado"
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
                    <th scope="col">Convenio</th>
                    <!-- <th scope="col">Colegio</th> -->
                    <th scope="col">Regional</th>
                    <th scope="col">Centro de formación</th>
                    <th scope="col">Fase</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      listaConveniosFiltrado != null &&
                      listaConveniosFiltrado.length != 0
                    "
                  >
                    <tr
                      v-for="(convenio, key) in paginated(
                        'listaConveniosFiltrado'
                      )"
                      :key="key"
                    >
                      <td>{{ convenio.convenio }}</td>
                      <!-- <td>{{ convenio.colegio_cargo }}</td> -->
                      <td>{{ convenio.regional }}</td>
                      <td>{{ convenio.centro_formacion }}</td>
                      <td>{{ convenio.fase }}</td>

                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver Convenio"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'VerDetalleConvenio',
                                params: {
                                  id: convenio.id_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Modificar Convenio"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 1"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'ModificarConvenio',
                                params: {
                                  id: convenio.id_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-edit"></i>
                            </router-link>
                          </div>

                          <div
                            class="btn-group btn-spc"
                            tooltip="Eliminar Convenio"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 1"
                          >
                            <a
                              @click="
                                eliminarConvenio(convenio.id_convenio, key)
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-trash"></i>
                            </a>
                          </div>
                          <!-- fases -->
                          <div
                            class="btn-group btn-spc"
                            tooltip="Proyectado"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 2"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'GestionarProgramasProyectados',
                                params: {
                                  id_convenio: convenio.id_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-clipboard-list"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Lista sensibilización"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 3"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'GestionarSensibilizacion',
                                params: {
                                  id_convenio: convenio.id_convenio,
                                },
                              }"
                              ><i class="fas fa-clipboard-check"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Registrar sensibilización"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 3"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'RegistrarSensibilizacionDocumento',
                                params: {
                                  id_convenio: convenio.id_convenio,
                                },
                              }"
                            >
                              <!-- <a class="btn btn-sm bg-azul-sena text-white"> -->
                              <i class="fas fa-bullhorn"></i>
                            </router-link>
                          </div>

                          <div
                            class="btn-group btn-spc"
                            tooltip="Registro Colegios"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 4"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'GestionarProgramasColegios',
                                params: {
                                  id_convenio: convenio.id_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-running"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Lista viabilidad"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 5"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'GestionarViabilidad',
                                params: {
                                  id_convenio: convenio.id_convenio,
                                },
                              }"
                              ><i class="fas fa-clipboard-check"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Registro viabilidad"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 5"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'RegistrarViabilidadDocumento',
                                params: {
                                  id_convenio: convenio.id_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-stream"></i>
                            </router-link>
                          </div>

                          <div
                            class="btn-group btn-spc"
                            tooltip="Registrar Ejecución"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 6"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'GestionarEjecucionConvenioColegios',
                                params: {
                                  id_convenio: convenio.id_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-play-circle"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Finalizado"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 7"
                          >
                            <a class="btn btn-sm bg-azul-sena text-white">
                              <i class="fas fa-play-circle"></i>
                            </a>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Cancelado "
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 8"
                          >
                            <a class="btn btn-sm bg-azul-sena text-white">
                              <i class="fas fa-minus-circle"></i>
                            </a>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Suspendido"
                            tooltip-flow="top"
                            v-if="convenio.fase_id == 9"
                          >
                            <a class="btn btn-sm bg-azul-sena text-white">
                              <i class="fas fa-history"></i>
                            </a>
                          </div>
                        </div>
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
          <paginate-links
            class="pagination justify-content-end"
            for="listaConveniosFiltrado"
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
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class Convenio extends Vue {
  listaConvenios = [];
  listaConveniosFiltrado: any[] = [];
  paginate = ["listaConveniosFiltrado"];
  filter = "";

  estadoPeticionTabla = false;
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
    // minuta: "",
  };
  listaProgramasProyectados = "";
  programasProyectados = {
    id_convenio_programa_proyectado: "",
    convenio_id: "",
    programa_formacion_id: "",
    fase_id: "",
  };

  obtenerProgramas() {
    Axios()
      .get("listar_programa_proyectado")
      .then((respuesta) => {
        this.listaProgramasProyectados = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }
  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        min: () => "Mínimo 8 caracteres",
      },
    };
    this.$validator.localize("es", dict);
  }
  mounted() {
    this.obtenerConvenios();
  }
  obtenerConvenios() {
    Axios()
      .get("listar_convenio")
      .then((respuesta) => {
        this.listaConvenios = respuesta.data.results;
        this.listaConveniosFiltrado = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  eliminarConvenio(id, index) {
    Swal.fire({
      title: "Eliminar Convenio ",
      text: this.listaConveniosFiltrado[index].convenio + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_convenio/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Convenio Eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaConveniosFiltrado.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar el convenio",
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

  eliminarConvenioColegios(id) {
    Axios()
      .delete("eliminar_convenio_colegio_escogidas/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
        } else {
        }
      });
  }

  convenioFiltrado() {
    let convenioFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let conve of this.listaConvenios) {
      let colegio = conve.colegio_cargo.toLowerCase();
      let centro_formacion = conve.centro_formacion.toLowerCase();
      let fases = conve.fase.toLowerCase();
      let regional = conve.regional.toLowerCase();
      let convenio = conve.convenio.toLowerCase();

      if (
        colegio.indexOf(this.filter.toLowerCase()) >= 0 ||
        convenio.indexOf(this.filter.toLowerCase()) >= 0 ||
        fases.indexOf(this.filter.toLowerCase()) >= 0 ||
        centro_formacion.indexOf(this.filter.toLowerCase()) >= 0 ||
        regional.indexOf(this.filter.toLowerCase()) >= 0
      ) {
        convenioFilter.push(conve);
      }
    }

    this.listaConveniosFiltrado = convenioFilter;
    if (this.listaConveniosFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró el convenio, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaConveniosFiltrado = this.listaConvenios;
    }
  }
}
</script>

<style></style>
