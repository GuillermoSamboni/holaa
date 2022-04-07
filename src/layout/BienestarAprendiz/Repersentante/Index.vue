<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REPRESENTANTES</h1>
      </div>

      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row mb-3">
            <div class="col-md-5 col-lg-4 mt-2">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar por Nombre"
                v-model="filter"
                @keyup.prevent="representantesFiltrado()"
              />
            </div>
            <div class="justify-content-lg-end col-md-5 col-lg-8 mt-2">
              <paginate-links
                class="pagination justify-content-end"
                for="listaRepresentantesFiltrado"
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
          <!-- tabla para ver la lista de representantes -->
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaRepresentantesFiltrado"
              :list="listaRepresentantesFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Identificación</th>
                    <th scope="col">Nombres</th>
                    <th scope="col"># Ficha</th>
                    <th scope="col">Regional</th>
                    <th scope="col">Centro de formación</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="!hayDatos">
                    <td class="text-center" colspan="4">
                      No hay datos para mostrar
                    </td>
                  </tr>
                  <tr
                    v-else
                    v-for="(usuario, key) in paginated(
                      'listaRepresentantesFiltrado'
                    )"
                    :key="key"
                  >
                    <td>{{ usuario.identificacion }}</td>

                    <td>
                      {{ usuario.primer_nombre }} {{ usuario.segundo_nombre }}
                      <br />
                      {{ usuario.primer_apellido }}
                      {{ usuario.segundo_apellido }}
                    </td>

                    <td>{{ usuario.id_ficha_caracterizacion }}</td>
                    <td>{{ usuario.regional }}</td>
                    <td>{{ usuario.centro_formacion }}</td>
                    <td scope="row">
                      <div
                        class="btn-toolbar btn-responsive-table"
                        role="toolbar"
                      >
                        <div
                          class="btn-group btn-spc"
                          tooltip="Ver Respresentante"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-naranja-sena text-white"
                            :to="{
                              name: 'VerRepresentanteBienestar',
                              params: {
                                id: usuario.identificacion,
                              },
                            }"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>
                        </div>
                        <div
                          class="btn-group btn-spc"
                          tooltip="Eliminar Respresentante"
                          tooltip-flow="top"
                        >
                          <a
                            class="btn btn-sm btn-azul-sena text-white"
                            @click="
                              eliminarRepresentante(
                                usuario.id_persona,
                                key,
                                usuario.primer_nombre +
                                  ' ' +
                                  usuario.primer_apellido
                              )
                            "
                          >
                            <i class="fas fa-trash-alt"></i>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </paginate>
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
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";

@Component({
  components: { AnimacionTablasCargando },
})
export default class ListarRepresentante extends Vue {
  crearRrepresentante: any = null;
  listaRepresentantes = [];
  listaRepresentantesFiltrado = [];
  estadoPeticionTabla = false;
  filter = "";
  hayDatos = false;
  paginate = ["listaRepresentantesFiltrado"];

  constructor() {
    super();
    const dict = {
      messages: {
        decimal: () => "Campo obligatorio",
        min: () => "Mínimo 8 caracteres",
      },
    };
    this.$validator.localize("es", dict);
  }

  async mounted() {
    this.listarRepresentantes();
  }
  eliminarRepresentante(id, key, nombre) {
    Swal.fire({
      title: "Eliminar representante",
      text: "¿Desea eliminar al representante: " + nombre + "?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios()
          .delete("eliminar_representante/" + id)
          .then((respuesta) => {
            this.listarRepresentantes();
            Swal.fire({
              title: "Representante Eliminado",
              cancelButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
          });
      }
    });
  }
  async listarRepresentantes() {
    await Axios()
      .get("listar_representantes")
      .then((respuesta) => {
        this.listaRepresentantes = respuesta.data.results;
        this.listaRepresentantesFiltrado = respuesta.data.results;

        if (this.listaRepresentantesFiltrado.length > 0) {
          this.hayDatos = true;
        }
      })
      .catch((error) => {
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
  representantesFiltrado() {
    let repre_filter = [];

    for (let repre of this.listaRepresentantesFiltrado) {
      let identificacion = repre.identificacion.toLowerCase();
      let Pnombre = repre.primer_nombre.toLowerCase();
      // let Snombre = repre.segundo_nombre.toLowerCase();
      let Papellido = repre.primer_apellido.toLowerCase();
      let Sapellido = repre.segundo_apellido.toLowerCase();
      // let FichaCaracterizacion = repre.id_ficha_caracterizacion;
      let Regional = repre.regional.toLowerCase();
      let centro_formacion = repre.centro_formacion.toLowerCase();

      if (
        identificacion.indexOf(this.filter.toLowerCase()) >= 0 ||
        Pnombre.indexOf(this.filter.toLowerCase()) >= 0 ||
        // Snombre.indexOf(this.filter) >= 0 ||
        Papellido.indexOf(this.filter.toLowerCase()) >= 0 ||
        Sapellido.indexOf(this.filter.toLowerCase()) >= 0 ||
        // FichaCaracterizacion.indexOf(this.filter.toLowerCase()) >= 0 ||
        Regional.indexOf(this.filter.toLowerCase()) >= 0 ||
        centro_formacion.indexOf(this.filter.toLowerCase()) >= 0
      ) {
        repre_filter.push(repre);
      }
    }

    this.listaRepresentantesFiltrado = repre_filter;
    if (this.listaRepresentantesFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaRepresentantesFiltrado = this.listaRepresentantes;
      // this.paginate = ['listaConvocatoriasFiltrado']
    }
  }
}
</script>

<style scoped></style>
