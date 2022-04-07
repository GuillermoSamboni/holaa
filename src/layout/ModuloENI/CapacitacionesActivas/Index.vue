<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA CONVOCATORIA ACTIVAS</h1>
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
                placeholder="Buscar Convocatoria"
                v-model="filter"
                @keyup.prevent="picFiltrado()"
              />
            </div>
            <div class="col-md-2 col-lg-2 col-sm-12 mt-4">
              <select
                class="form-control p-0"
                v-model="filterPicTipo"
                @change="picTipoFiltrado()"
              >
                <option value="" Disabled>Tipo capacitación</option>
                <option value="">Todas</option>
                <option v-if="existe_tipo_tecnico">Técnico</option>
                <option v-if="existe_tipo_pedagogico">Pedagógico</option>
                <option v-if="existe_tipo_clave">Clave y Transversal</option>
              </select>
            </div>
            <div class="col-md-3 col-lg-2 col-sm-2 col-sm-12 mt-4">
              <select
                class="form-control p-0"
                name="fecha"
                id="fecha"
                v-model="fecha_pic"
                @change="obtenerConvocatorias()"
              >
                <option
                  v-for="(fecha, index) in fechas_pic"
                  :key="index"
                  :value="fecha.plan_institucional_id"
                >
                  {{ fecha.plan_institucional_id }}
                </option>
              </select>
            </div>
            <div class="col-md-4 col-lg-4 mt-4">
              <paginate-links
                class="pagination justify-content-end"
                for="listaConvocatoriasFiltrado"
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
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaConvocatoriasFiltrado"
              :list="listaConvocatoriasFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <!-- <th scope="col">Código</th> -->
                    <th scope="col">Código</th>
                    <th scope="col">Convocatoria</th>
                    <th scope="col">Capacitación</th>
                    <th scope="col">Inicio - Fin Capacitación</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      listaConvocatoriasFiltrado != null &&
                      listaConvocatoriasFiltrado.length != 0
                    "
                  >
                    <!-- {{listaConvocatoriasFiltrado}} -->
                    <tr
                      v-for="(convocatoria, key) in paginated(
                        'listaConvocatoriasFiltrado'
                      )"
                      :key="key"
                    >
                      <td>{{ convocatoria.codigo_conv }}</td>
                      <td>{{ convocatoria.convocatoria }}</td>

                      <td>
                        {{ convocatoria.capacitacion }}
                      </td>
                      <td>
                        {{ convocatoria.fecha_inicio }} -
                        {{ convocatoria.fecha_final }}
                      </td>

                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver Convocatoria Activa"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white space"
                              :to="{
                                name: 'VerDetalleConvocatoriasActivasENI',
                                params: {
                                  id: convocatoria.id_pic_convocatoria,
                                },
                              }"
                            >
                              <i class="fas fa-eye"></i>
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
            for="listaConvocatoriasFiltrado"
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
import router from "@/router";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class Login extends Vue {
  estadoPeticion = true;
  listaConvocatorias = [];
  filter = "";
  filterPicTipo = "";
  fecha_pic = "2021";
  id_convocatoria_pic = 0;
  fechas_pic = [];
  docSubidosCont = 0;
  estadoPeticionTabla = false;
  paginate = ["listaConvocatoriasFiltrado"];
  usuario = JSON.parse(sessionStorage.getItem("usuario"));

  existe_tipo_tecnico = false;
  existe_tipo_pedagogico = false;
  existe_tipo_clave = false;

  listaConvocatoriasFiltrado = [];

  tipoPicFilter = "";

  capacitacion = {
    area_ruta: "",
    capacitacion: "",
    componentes: "",
    id_area_ruta: "",
    id_pic: "",
    plan_institucional_id: "",
    red_conocimiento_id: "",
    tipo_pic: "",
    eje: "",
  };

  docResolucon: any[] = null;
  docValido = false;
  idConvocatoriaActual = null;

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
  async mounted() {
    await this.obtenerConvocatorias();
    await this.ontenerPlanInstitucional();
  }
  async updated() {
    await this.listarTiposPic();
  }
  async obtenerConvocatorias() {
    await Axios()
      .post("listar_convocatorias_instructor", {
        id_persona: this.usuario.id_persona,
        id_plan_institucional: this.fecha_pic,
      })
      .then((respuesta) => {
        if (respuesta.data.status.toLowerCase() == "success") {
          this.listaConvocatorias = respuesta.data.results;
          this.listaConvocatoriasFiltrado = respuesta.data.results;
          this.estadoPeticion = false;
          this.estadoPeticionTabla = true;
        } else {
          Swal.fire({
            title: "No hay Convocatorias activas",
            position: "center",
            timer: 1000,
            text: respuesta.data.message,
            showConfirmButton: false,
            // confirmButtonText: "Aceptar",
            // confirmButtonColor: "#238276",
            backdrop: "rgba(0,0,0,0)",
            background: "#eeeeee",
          });
          this.estadoPeticionTabla = true;
          this.listaConvocatorias = respuesta.data.results;
          this.listaConvocatoriasFiltrado = respuesta.data.results;
        }
      })
      .then(() => {
        this.listarTiposPic();
      })
      .catch(() => {
        // Swal.fire({
        //   title: "No hay Convocatorias activas",
        //   position: "center",
        //   text:"error en el servidor",
        //   showConfirmButton: true,
        //   confirmButtonText: "Aceptar",
        //   confirmButtonColor: "#238276",
        // });
      });
  }
  ontenerPlanInstitucional() {
    Axios()
      .get("listar_plan_institucional")
      .then((respuesta) => {
        this.fechas_pic = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  filtrarTipoPic(lista: any[]) {
    let listaRetornar = [];

    if (this.tipoPicFilter != "") {
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].pic_tipo_id == this.tipoPicFilter) {
          listaRetornar.push(lista[i]);
        }
      }
      return listaRetornar;
    } else {
      return lista;
    }
  }

  picFiltrado() {
    let arregloFiltrado = [];
    // this.listaConvocatoriasFiltrado = []

    for (let conv of this.listaConvocatorias) {
      let convocatoria = conv.convocatoria.toLowerCase();
      let capacitacion = conv.capacitacion.toLowerCase();
      let tipo = conv.pic_tipo.toLowerCase();
      let codigo = conv.codigo.toLowerCase();

      if (
        convocatoria.indexOf(this.filter) >= 0 ||
        capacitacion.indexOf(this.filter) >= 0 ||
        tipo.indexOf(this.filter) >= 0 ||
        codigo.indexOf(this.filter) >= 0 ||
        this.filter == ""
      ) {
        arregloFiltrado.push(conv);
      }
    }

    this.listaConvocatoriasFiltrado = arregloFiltrado;
    if (this.listaConvocatoriasFiltrado.length == 0) {
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
      this.filter = "";
      this.listaConvocatoriasFiltrado = this.listaConvocatorias;
      // this.paginate = ['listaConvocatoriasFiltrado']
    }
  }

  async picTipoFiltrado() {
    this.listaConvocatoriasFiltrado = [];
    this.listarTiposPic();
    for (let conv of this.listaConvocatorias) {
      let picTipo = conv.pic_tipo;
      if (this.filterPicTipo != "") {
        if (picTipo.indexOf(this.filterPicTipo) >= 0) {
          this.listaConvocatoriasFiltrado.push(conv);
        } else {
          // no hay coincidencias
        }
      } else {
        this.listaConvocatoriasFiltrado = this.listaConvocatorias;
      }
    }
  }

  listarTiposPic() {
    for (let conv of this.listaConvocatorias) {
      if (conv.pic_tipo == "Técnico") {
        this.existe_tipo_tecnico = true;
      } else if (conv.pic_tipo == "Pedagógico") {
        this.existe_tipo_pedagogico = true;
      } else if (conv.pic_tipo == "Clave y Transversal") {
        this.existe_tipo_clave = true;
      }
    }
  }

  // updated(){
  //   this.obtenerConvocatorias()
  // }
}
</script>
<style scoped>
/* estilos para input tipo file */
.custom-input-file {
  background-color: #238276;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  /* margin: 0 auto 0; */
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  text-align: center;
  padding-top: 4px;
  width: 30px;
  height: 30px;
}

.tam-completo {
  width: 100%;
  font-size: 13px;
}
.custom-input-file .input-file {
  font-size: 10em;
  margin: 0;
  opacity: 0;
  outline: 0 none;
  padding: 5px 5px 5px 5px !important;
  position: absolute;
}

/* fin estilos de input file */
</style>
