<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA DE CONVOCATORIAS BIENESTAR</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row my-3">
            <div class="col-md-5 col-lg-4 mt-2">
              <input
                type="text"
                class="form-control"
                placeholder="buscar"
                v-model="filter"
                @keyup.prevent="convocatoriaFiltrado()"
              />
            </div>
            <div class="justify-content-lg-end col-md-5 col-lg-8 mt-2">
              <paginate-links
                class="pagination justify-content-end"
                for="listaConvocatoriasB"
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
              >
              </paginate-links>
            </div>
          </div>
          <div class="text-center" v-if="estadoPeticion">
            <AnimacionCargando></AnimacionCargando>
          </div>
          <div class="table-responsive" v-if="!estadoPeticion">
            <paginate
              ref="paginator"
              name="listaConvocatoriasB"
              :list="listaConvocatoriasB"
              :per="10"
            >
              <table v-if="!estadoPeticion" class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th class="text-nowrap">Nombre</th>
                    <th class="text-nowrap">Inicio - Cierre</th>
                    <th class="text-nowrap">Fase</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="listaConvocatoriasB != null">
                    <tr
                      v-for="(convocatoria, key) in paginated(
                        'listaConvocatoriasB'
                      )"
                      :key="key"
                    >
                      <td>
                        {{ convocatoria.convocatoria }}
                      </td>
                      <td>
                        {{ convocatoria.fecha_inicio_convoca }} -
                        {{ convocatoria.fecha_final_convoca }}
                      </td>
                      <td>{{ convocatoria.fase_bienestar }}</td>
                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            div
                            tooltip="Ver Convocatoria"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'VerDetalleConvocatoria',
                                params: { id: convocatoria.id_convocatoria }
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>
                          
                          <div
                            class="btn-group btn-spc"
                            v-if="
                              convocatoria.fase_bienestar != 'Ejecución' &&
                              convocatoria.fase_bienestar != 'Finalizada' &&
                              convocatoria.fase_bienestar == 'Creación' &&
                                convocatoria.fase_bienestar != 'Adjudicación'
                            "
                            div
                            tooltip="Adjuntar circular"
                            tooltip-flow="top"
                          >
                            <router-link
                              alt="Adjuntar circular"
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'AdjuntarResolucion',
                                params: { id: convocatoria.id_convocatoria }
                              }"
                            >
                              <i class="far fa-file-alt"></i>
                            </router-link>
                          </div>

                          <!-- editar convocatoria -->
                          <div
                            class="btn-group btn-spc"
                            v-if="convocatoria.fase_bienestar == 'Creación'"
                            div
                            tooltip="Modificar Convocatoria"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-naranja-sena text-white"
                              :to="{
                                name: 'ModificarConvocatoria',
                                params: { id: convocatoria.id_convocatoria }
                              }"
                            >
                              <i class="fas fa-edit"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            v-if="convocatoria.fase_bienestar == 'Creación'"
                            div
                            tooltip="Eliminar Convocatoria"
                            tooltip-flow="top"
                          >
                            <a
                              @click="
                                eliminarConvocatoria(
                                  convocatoria.id_convocatoria,
                                  convocatoria.convocatoria
                                )
                              "
                              alt="eliminar convocatoria"
                              class="btn btn-sm bg-naranja-sena text-white"
                            >
                              <i class="fas fa-trash-alt"></i>
                            </a>
                          </div>
                          <!-- INSCRIBIR convocatoria -->
                          <div
                            class="btn-group btn-spc"
                            v-if="convocatoria.fase_bienestar == 'Inscripción'"
                            div
                            tooltip="Inscribir Aprendices"
                            tooltip-flow="top"
                          >
                            <router-link
                              alt="adjudicar"
                              class="btn btn-sm bg-naranja-sena text-white"
                              :to="{
                                name: 'Inscribir',
                                params: { id: convocatoria.id_convocatoria }
                              }"
                            >
                              <i class="fas fa-user-plus"></i>
                            </router-link>
                          </div>

                          <div
                            class="btn-group btn-spc"
                            v-if="convocatoria.fase_bienestar == 'Adjudicación'"
                            div
                            tooltip="Adjudicar Aprendices"
                            tooltip-flow="top"
                          >
                            <router-link
                              alt="adjudicar"
                              class="btn btn-sm bg-naranja-sena text-white"
                              :to="{
                                name: 'AdjudicarApredizConvocatoria',
                                params: { id: convocatoria.id_convocatoria }
                              }"
                            >
                              <i class="fas fa-list"></i>
                            </router-link>
                          </div>

                          <div
                            class="btn-group btn-spc"
                            v-if="convocatoria.fase_bienestar == 'Ejecución'"
                            div
                            tooltip="Novedades Adjudicados"
                            tooltip-flow="top"
                          >
                            <router-link
                              alt="novedades"
                              class="btn btn-sm bg-naranja-sena text-white"
                              :to="{
                                name: 'GestionarAdjudicados',
                                params: { id: convocatoria.id_convocatoria }
                              }"
                            >
                              <i class="fas fa-user-edit"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            v-if="(!(convocatoria.fase_bienestar == 'Creación') ||
                            (convocatoria.fase_bienestar == 'Inscripción') ||
                            (convocatoria.fase_bienestar == 'Adjudicación') ||
                            (convocatoria.fase_bienestar == 'Ejecución') )"
                            div
                            tooltip="Ver listas resumen"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'Index_Finalizado',
                                params: { id: convocatoria.id_convocatoria }
                              }"
                            >
                            <i class="fas fa-award"></i>
                            </router-link>
                          </div>
                        </div>
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
              for="listaConvocatoriasB"
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
            >
            </paginate-links>          
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
  export default class Login extends Vue {
    estadoPeticion = true;
    listaConvocatorias: any[] = [];
    estadoPeticionTabla = false;
    filter = "";
    paginate = ["listaConvocatoriasB"];
    listaConvocatoriasB = [];

    constructor() {
      super();
      const dict = {
        messages: {
          required: () => "Campo obligatorio",
          min: () => "Mínimo 8 caracteres",
          // email: () => "Correo invalido",
        },
      };
      this.$validator.localize("es", dict);
    }

    mounted() {
      this.obtenerConvocatorias();
    }

    obtenerConvocatorias() {
      Axios()
        .get(
          "listar_convocatorias/" +
          JSON.parse(sessionStorage.getItem("usuario")).id_usuario
        )
        .then((respuesta) => {
          this.listaConvocatorias = respuesta.data.results;
          this.listaConvocatoriasB = respuesta.data.results;
          this.estadoPeticion = false;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        })
        .finally(() => {
          this.estadoPeticionTabla = true;
        });
    }

    eliminarConvocatoria(id: number, nombre: string) {
      this.eliminarConvenioColegios(id);
      Swal.fire({
        title: "Eliminar Convocatoria ",
        text: nombre + " ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
      }).then((resp) => {
        if (resp.isConfirmed) {
          Axios()
            .delete("eliminar_convocatoria/" + id)
            .then((respuesta) => {
              Swal.fire({
                title: "Convocatoria Eliminada",
                text: "La convocatoria se ha eliminado exitosamente!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
              this.obtenerConvocatorias();
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
        .delete("eliminar_convocatoria_tipo_monitoria/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
          } else {
          }
        });
    }

    convocatoriaFiltrado() {
      let picFilter = [];
      // this.listaConvocatoriasFiltrado = []

      for (let convo of this.listaConvocatorias) {
        let convocatoria = convo.convocatoria.toLowerCase();
        let fase = convo.fase_bienestar.toLowerCase();
        let fecha_inicio = convo.fecha_inicio_convoca.toLowerCase();
        let fecha_fin = convo.fecha_final_convoca.toLowerCase();

        if (
          convocatoria.indexOf(this.filter.toLowerCase()) >= 0 ||
          fase.indexOf(this.filter.toLowerCase()) >= 0 ||
          fecha_inicio.indexOf(this.filter.toLowerCase()) >= 0 ||
          fecha_fin.indexOf(this.filter.toLowerCase()) >= 0
        ) {
          picFilter.push(convo);
        }
      }

      this.listaConvocatoriasB = picFilter;
      if (this.listaConvocatoriasB.length == 0) {
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
        this.listaConvocatoriasB = this.listaConvocatorias;
      }
    }
  }
</script>
<style>
  
</style>