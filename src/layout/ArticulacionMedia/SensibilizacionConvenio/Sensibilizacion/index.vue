<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA SENSIBILIZACIÓN</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row mb-1">
            <div class="col-12 col-lg-3 mr-2">
              <input
                type="text"
                class="form-control col-12 mb-2 mr-md-3"
                placeholder="Buscar"
                v-model="filter"
                @keyup.prevent="sensibilizacionFiltrado()"
              />
            </div>

            <!-- <div class="col-lg-4 col-sm-12 mt-10">
              <b-button
                type="azul-sena"
                class="btn btn-block bg-azul-sena text-white"
                tooltip="Registrar Nuevo"
                tooltip-flow="top"
                :to="{
                  name: 'RegistrarSensibilizacionDocumento',
                  params: {
                    id_convenio: convenio.id_convenio,
                  },
                }"
              >
                Registrar Sensibilización
              </b-button>
            </div> -->
            <div class="col-lg-4 col-sm-12 mt-1">
              <base-button
                type="azul-sena"
                @click="cambiarFaseConvenio()"
                class="btn btn-block bg-azul-sena text-white"
              >
                Fase colegios
              </base-button>
            </div>

            <div class="col-md-9 col-lg-3">
              <paginate-links
                class="pagination justify-content-end"
                for="listaSensibilizacionFiltrado"
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
              name="listaSensibilizacionFiltrado"
              :list="listaSensibilizacionFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col" class="col-sm-2">resultados</th>
                    <th scope="col" class="col-sm-2">compromisos</th>
                    <th scope="col" class="col-sm-5">prioridad uno - prioridad dos</th>
                    <!-- <th scope="col">cantidad asistentes</th> -->
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      listaSensibilizacionFiltrado != null &&
                      listaSensibilizacionFiltrado.length != 0
                    "
                  >
                    <tr
                      v-for="(sensibilizacion, key) in paginated(
                        'listaSensibilizacionFiltrado'
                      )"
                      :key="key"
                    >
                    <td>{{ sensibilizacion.id_sensibilizacion_convenio }}</td>
                      <td>{{ sensibilizacion.resultados }}</td>
                      <td>{{ sensibilizacion.compromisos }}</td>
                      <td>{{ sensibilizacion.red_prioridad_uno }} <br>
                      {{ sensibilizacion.red_prioridad_dos }}</td>
                      <!-- <td>{{ sensibilizacion.cantidad_asistentes }}</td> -->

                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver sensibilización"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'VerDetalleSensibilizacion',
                                params: {
                                  id: sensibilizacion.id_sensibilizacion_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Modificar sensibilización"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'ModificarSensibilizacion',
                                params: {
                                  id: sensibilizacion.id_sensibilizacion_convenio,
                                },
                              }"
                            >
                              <i class="fas fa-edit"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Eliminar sensibilización"
                            tooltip-flow="top"
                          >
                            <a
                              @click="
                                eliminarSensibilizacion(
                                  sensibilizacion.id_sensibilizacion_convenio,
                                  key
                                )
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-trash"></i>
                            </a>
                          </div>
                          <!--  -->
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    No hay Sensibilización
                  </tr>
                </tbody>
              </table>
            </paginate>
          </div>
          <paginate-links
            class="pagination justify-content-end"
            for="listaSensibilizacionFiltrado"
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
import AnimacionCargando from "../../../../components/animacionCargando.vue";
import AnimacionTablasCargando from "../../../../components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class sensibilizacion extends Vue {
  listaSensibilizacion = [];
  listaSensibilizacionFiltrado: any[] = [];
  paginate = ["listaSensibilizacionFiltrado"];
  filter = "";
  id_convenio = null;

  estadoPeticionTabla = false;

  sensibilizacion = {
    id_sensibilizacion_convenio: "",
    fecha_socilizacion: "",
    resultados: "",
    compromisos: "",
    prioridad_uno: "",
    prioridad_dos: "",
    url_acta_sensibilizacion: "",
    url_carta_intension: "",
    url_asistencia: "",
    cantidad_asistentes: "",
    convenio_id: "",
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
    this.obtenerSensibilizacion();
    this.id_convenio = this.$route.params.id_convenio;
    this.obtenerConvenio(this.$route.params.id);
  }

  obtenerSensibilizacion() {
    Axios()
      .get("listar_sensibilizacion/"+this.$route.params.id_convenio)
      .then((respuesta) => {
        this.listaSensibilizacion = respuesta.data.results;
        this.listaSensibilizacionFiltrado = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  eliminarSensibilizacion(id, index) {
    Swal.fire({
      title: "Eliminar sensibilización ",
      text:
        this.listaSensibilizacionFiltrado[index].id_sensibilizacion_convenio +
        "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_sensibilizacion/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Sensibilización Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaSensibilizacionFiltrado.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar la sensibilización",
                text: respuesta.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
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
  obtenerConvenio(id) {
    Axios()
      .get("ver_detalle_convenio/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          // this.convenio = respuesta.data.results;
        }
      });
  }
  sensibilizacionFiltrado() {
    let sensibilizacionFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let sensibiliza of this.listaSensibilizacion) {
      let resultados = sensibiliza.resultados.toLowerCase();
      let compromisos = sensibiliza.compromisos.toLowerCase();
      let red_prioridad_dos = sensibiliza.red_prioridad_dos.toLowerCase();
      let red_prioridad_uno = sensibiliza.red_prioridad_uno.toLowerCase();

      if (
        resultados.indexOf(this.filter) >= 0 ||
        compromisos.indexOf(this.filter) >= 0 ||
        red_prioridad_dos.indexOf(this.filter) >= 0 ||
        red_prioridad_uno.indexOf(this.filter) >= 0
      ) {
        sensibilizacionFilter.push(sensibiliza);
      }
    }

    this.listaSensibilizacionFiltrado = sensibilizacionFilter;
    if (this.listaSensibilizacionFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró la sensibilizacion, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaSensibilizacionFiltrado = this.listaSensibilizacion;
    }
  }

  cambiarFaseConvenio() {
    if (this.listaSensibilizacionFiltrado == null) {
      Swal.fire({
        title: "Informacion",
        text: "Para Sensibilizar debe tener almenos 1",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#238276",
        customClass: {
          confirmButton: "btn btn-azul-sena",
        },
      });
    } else {
      Axios()
        .put("modificar_fase_convenio/" + this.id_convenio, {
          id_convenio: this.id_convenio,
          fase_id: 4,
          id_actualiza: JSON.parse(sessionStorage.getItem("usuario")),
        })
        .then(() => {
          Swal.fire({
            title: "Cambio de fase correcto!",
            text: "El Convenio pasó a fase colegios exitosamente!",
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
}
</script>
