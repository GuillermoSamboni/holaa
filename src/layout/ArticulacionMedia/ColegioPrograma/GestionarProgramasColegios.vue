<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA COLEGIOS</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row mb-1">
            <!-- <div class="col-12 col-lg-3 mr-2">
              <input
                type="text"
                class="form-control col-12 mb-2 mr-md-3"
                placeholder="Buscar Colegio."
                v-model="filter"
                @keyup.prevent="buscarColegios()"
              />
            </div> -->
            <div class="row col-12 col-lg-4 pr-0">
              <input
                type="number"
                class="form-control col-lg-5 col-12 mb-2 ml-3 mr-2"
                placeholder="Buscar código dane"
                v-model="dane"
              />
              <button
                class="btn bg-azul-sena text-white col-lg-6 col-5 mb-4"
                @click="buscarColegios"
              >
                Buscar
              </button>
            </div>

            <div class="row col-12 col-lg-5 ml-3">
              <select
                class="form-control col-lg-6 col-12 mb-2 mr-md-3"
                id="secreatria"
                name="secretaria"
                v-model="colegio.secretaria_id"
                v-validate="{ required: true }"
              >
                <option value="" selected disabled>
                  Seleccione la secretaría.
                </option>
                <option
                  v-for="(listase, index) in lista_secretaria"
                  :key="index"
                  :value="listase.id_secretaria"
                >
                  {{ listase.secretaria }}
                </option>
              </select>
              <button
                type="azul-sena"
                class="btn bg-azul-sena text-white col-lg-5 col-5 mb-4"
                @click="obtenerColegios()"
              >
                Buscar secretaria
              </button>
            </div>

            <!-- {{ this.colegio.secretaria_id }} -->

            <div class="col-md-9 col-lg-3 ml-3">
              <paginate-links
                class="pagination justify-content-end"
                for="listaColegiosFiltrado"
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
              name="listaColegiosFiltrado"
              :list="listaColegiosFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">código dane</th>
                    <th scope="col">colegio</th>
                    <th scope="col">municipio</th>
                    <th scope="col">rector</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      listaColegiosFiltrado != null &&
                      listaColegiosFiltrado.length != 0
                    "
                  >
                    <tr
                      v-for="(colegio, key) in filtrar('listaColegiosFiltrado')"
                      :key="key"
                    ></tr>
                    <tr
                      v-for="(colegio, key) in paginated(
                        'listaColegiosFiltrado'
                      )"
                      :key="key"
                    >
                      <td>{{ colegio.cod_dane }}</td>
                      <td>{{ colegio.colegio }}</td>
                      <td v-if="listaColegiosFiltrado.length > 1">
                        {{ colegio.municipio }}
                      </td>
                      <td v-else>{{ colegio.municipio.municipio }}</td>
                      <td>{{ colegio.rector }}</td>

                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Agregar programa"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'GestionarProgramasAprobados',
                                params: {
                                  id_convenio: id_convenio,
                                  id_colegio: colegio.id_colegio,
                                },
                              }"
                            >
                              <i class="fas fa-clipboard-list"></i>
                            </router-link>
                          </div>

                          <!--  -->
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    No hay colegios
                  </tr>
                </tbody>
              </table>
            </paginate>
          </div>
          <paginate-links
            class="pagination justify-content-end"
            for="listaColegiosFiltrado"
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
export default class Colegio extends Vue {
  listaColegios = [];
  listaColegiosFiltrado: any[] = [];
  paginate = ["listaColegiosFiltrado"];
  filter = "";
  id_secretaria = "";
  // id_secretaria: any[] = [];
  secretaria = [];

  lista_secretaria: any[] = [];

  buscarColegio;
  id_convenio = "";

  buscarColegiosDane;
  mostrarListaColegios = [];
  modalSenaPersona = false;
  dane = "";
  listaUsuarios = [];

  estadoPeticionTabla = false;
  colegio = {
    id_colegio: "",
    colegio_modalidad_id: "",
    zona_id: "",
    jornada_id: "",
    municipio_id: "",
    primer_nombre: "",
    coord_persona_id: "",
    rector_persona_id: "",
    // 'personas.id_persona',
    // 'personas.primer_nombre',
    // 'personas.id_persona',
    // 'rector.segundo_nombre',
    colegio: "",
    nit: "",
    direccion: "",
    telefono: "",
    cod_dane: "",
    licencia: "",
    sector_colegio: "",
    secretaria_id: "19",
    estado: "",
    resguardo: "",
    correo: "",
    calendario: "",
    genero: "",
    sedes: "",
    jornadas: "",
    rector: "",
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
    this.obtenerColegios();
    this.obtenerSecretariaColegio();
    this.id_convenio = this.$route.params.id_convenio;
  }

  updated() {
    // this.obtenerColegios();
  }
  // Matchetazo aspero pero incompleto
  obtenerColegios() {
    Axios()
      .get("listar_colegios/" + this.colegio.secretaria_id)
      .then((respuesta) => {
        this.listaColegios = respuesta.data.results;
        this.listaColegiosFiltrado = respuesta.data.results;
        if (respuesta.data.status == "success") {
          this.estadoPeticionTabla = true;
          this.colegio.secretaria_id = this.id_secretaria;
          this.id_secretaria = this.colegio.secretaria_id;
        }
      })
      .catch(() => {
        if (this.id_secretaria != "") {
          Swal.fire({
            title: "Error de servidor!",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            icon: "error",
          });
        } else {
        }
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  obtenerSecretariaColegio() {
    Axios()
      .get("listar_secretaria_colegio")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_secretaria = respuesta.data.results;
        }
      });
  }

  eliminarColegio(id, index) {
    Swal.fire({
      title: "Eliminar Colegio ",
      text: this.listaColegiosFiltrado[index].colegio + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_colegios/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Colegio Eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaColegiosFiltrado.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar el colegio",
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

  colegioFiltrado() {
    let colegioFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let colegi of this.listaColegios) {
      let colegio = colegi.colegio.toLowerCase();
      let municipio = colegi.municipio.toLowerCase();
      let rector = colegi.rector.toLowerCase();
      let dane = colegi.cod_dane.toLowerCase();

      if (
        colegio.indexOf(this.filter) >= 0 ||
        municipio.indexOf(this.filter) >= 0 ||
        rector.indexOf(this.filter) >= 0 ||
        dane.indexOf(this.filter) >= 0
      ) {
        colegioFilter.push(colegi);
      }
    }

    this.listaColegiosFiltrado = colegioFilter;
    if (this.listaColegiosFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró el colegio, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaColegiosFiltrado = this.listaColegios;
    }
  }

  async buscarColegios() {
    await Axios()
      .get("buscar_colegio/" + this.dane)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.buscarColegiosDane = respuesta.data.results;
          this.listaColegiosFiltrado = [];
          this.listaColegiosFiltrado.push(this.buscarColegiosDane);

        } else {
          Swal.fire({
            title: "No existe el codigo dane",
            text: " Para el colegio!",
            icon: "error",
          });
        }
      })
      .catch(() => {});
  }

  filtrar() {
    if (this.dane == "") {
      this.listaColegiosFiltrado = this.listaColegios;
      return this.listaColegiosFiltrado;
    } else {
      return this.listaColegiosFiltrado;
    }
  }
}
</script>
