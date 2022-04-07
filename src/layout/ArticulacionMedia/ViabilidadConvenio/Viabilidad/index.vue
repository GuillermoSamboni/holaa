<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA VIABILIDAD</h1>
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
                placeholder="Buscar viabilidad"
                v-model="filter"
                @keyup.prevent="viabilidadFiltrado()"
              />
            </div>
            <div class="col-lg-4 col-sm-12 mt-1">
              <base-button
                type="azul-sena"
                @click="cambiarFaseViabilidad"
                class="btn btn-block bg-azul-sena text-white"
              >
                Iniciar Ejecución
              </base-button>
            </div>
          </div>
          <div class="col-md-9 col-lg-9 mt-4">
            <paginate-links
              class="pagination justify-content-end"
              for="listaViabilidadFiltrado"
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
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaViabilidadFiltrado"
              :list="listaViabilidadFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Id Viabilidad</th>
                    <th scope="col">Convenio</th>
                    <th scope="col">Colegio</th>
                    <th scope="col">Apto</th>
                    <th scope="col">Fecha</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      listaViabilidadFiltrado != null &&
                      listaViabilidadFiltrado.length != 0
                    "
                  >
                    <tr
                      v-for="(viabilidad, key) in paginated(
                        'listaViabilidadFiltrado'
                      )"
                      :key="key"
                    >
                      <td>{{ viabilidad.id_viabilidad }}</td>
                      <td>{{ viabilidad.convenio }}</td>
                      <td>{{ viabilidad.colegio }}</td>
                      <td v-if="viabilidad.apto == 0">No</td>
                      <td v-if="viabilidad.apto == 1">Si</td>
                      <td>{{ viabilidad.fecha }}</td>

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
                                name: 'VerDetalleViabilidad',
                                params: {
                                  id: viabilidad.id_viabilidad,
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
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'ModificarConvenio',
                                params: {
                                  id: viabilidad.id_viabilidad,
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
                          >
                            <a
                              @click="
                                eliminarConvenio(viabilidad.id_viabilidad, key)
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-trash"></i>
                            </a>
                          </div>
                          <!-- fases -->
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
            for="listaViabilidadFiltrado"
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
import AnimacionCargando from "@/components/animacionCargando.vue";
import AnimacionTablasCargando from "@/components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class Convenio extends Vue {
  listarViabilidad = [];
  listaViabilidadFiltrado: any[] = [];
  paginate = ["listaViabilidadFiltrado"];
  filter = "";
  id_convenio = null;

  estadoPeticionTabla = false;
  viabilidad = {
    id_viabilidad: "",
    convenio_id: "",
    convenio: "",
    colegio_id: "",
    colegio: "",
    apto: "",
    fecha: "",
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
    this.obtenerConvenios(this.$route.params.id_convenio);
    this.id_convenio = this.$route.params.id_convenio;
    
  }
  cambiarFaseViabilidad() {
    if (this.listaViabilidadFiltrado == null) {
      Swal.fire({
        title: "Informacion",
        text: "Para ejecutar debe tener almenos 1",
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
          fase_id: 6,
          id_actualiza: JSON.parse(sessionStorage.getItem("usuario")),
        })
        .then(() => {
          Swal.fire({
            title: "Cambio de fase correcto!",
            text: "El Convenio pasó a Ejecutar exitosamente!",
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
  obtenerConvenios(id) {
    Axios()
      .get("listar_viabilidad/" + id)
      .then((respuesta) => {
        this.listarViabilidad = respuesta.data.results;
        this.listaViabilidadFiltrado = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  eliminarConvenio(id, index) {
    this.eliminarConvenioColegios(id);
    Swal.fire({
      title: "Eliminar Convenio ",
      text: this.listaViabilidadFiltrado[index].colegio_cargo + "?",
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
              this.listaViabilidadFiltrado.splice(index, 1);
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

  viabilidadFiltrado() {
    let viabilidadFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let viabilidad of this.listarViabilidad) {
      let colegio = viabilidad.colegio.toLowerCase();
      let fases = viabilidad.convenio.toLowerCase();

      if (
        colegio.indexOf(this.filter) >= 0 ||
        fases.indexOf(this.filter) >= 0
      ) {
        viabilidadFilter.push(viabilidad);
      }
    }

    this.listaViabilidadFiltrado = viabilidadFilter;
    if (this.listaViabilidadFiltrado.length == 0) {
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
      this.listaViabilidadFiltrado = this.listarViabilidad;
    }
  }
}
</script>

<style></style>
