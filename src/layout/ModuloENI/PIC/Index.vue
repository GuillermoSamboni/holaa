<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">PLAN INSTITUCIONAL DE CAPACITACIÓN ENI</h1>
        </h1>
      </div>
      <div class="card-body">
        <!-- Bug opción (infraestructura) al recargar la pagina -->
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row my-3">
            <div class="col-md-6 col-lg-3 col-xl-2 mt-4">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar"
                v-model="filter"
                @keyup="picFiltrado()"
              />
            </div>
            <div class="col-md-6 col-lg-3 mt-4">
              <multiselect
                v-model="areasEscogidas"
                placeholder="Seleccione el area"
                selectLabel="Seleccionar"
                selectedLabel="Seleccionado"
                deselectLabel="Borrar de la lista"
                label="area_ruta"
                track-by="id_area_ruta"
                :options="areas"
                :preserve-search="true"
                :preselect-first="true"
                :close-on-select="false"
                :clear-on-select="false"
                @input="picAreasFiltrado()"
              >
                <template slot="selection" slot-scope="{ values, isOpen }"
                  ><span
                    class="multiselect__single"
                    v-if="values.length && !isOpen"
                    >{{ values.length }}</span
                  ></template
                >
              </multiselect>
              <!-- <input
              type="text"
              class="form-control"
              placeholder="Buscar área"
              v-model="filterArea"
              @keyup.prevent="picAreasFiltrado()"
            /> -->
            </div>

            <div class="col-md-6 col-lg-4 col-xl-3 mt-4">
              <multiselect
                v-model="redesEscogidas"
                placeholder="Red de conocimiento"
                selectLabel="Seleccionar"
                selectedLabel="Seleccionado"
                deselectLabel="Borrar de la lista"
                label="red_conocimiento"
                track-by="id_red_conocimiento"
                :options="lista_redes"
                :preserve-search="true"
                :preselect-first="true"
                :close-on-select="false"
                :clear-on-select="false"
                @input="picRedFiltrado()"
              >
                <template slot="selection" slot-scope="{ values, isOpen }"
                  ><span
                    class="multiselect__single"
                    v-if="values.length && !isOpen"
                    >{{ values.length }}</span
                  ></template
                >
              </multiselect>
            </div>

            <div class="col-md-6 col-lg-3 col-xl-2 col-sm-12 mt-4">
              <select
                class="form-control p-1"
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
            <div class="col-md-6 col-lg-3 col-xl-2 mt-4">
              <select
                class="form-control p-1"
                name="fecha"
                id="fecha"
                v-model="fecha_pic"
                @change="obtenerCapacitaciones()"
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
          </div>
          <div class="row">
            <div class="col"></div>
            <div class="col-md- col-lg-2">
              <paginate-links
                class="pagination justify-content-end"
                for="listaPicFiltrado"
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
          <div v-if="estadopeticionAnio">
            <animacion-tablas-cargando />
          </div>
          <div v-else class="table-responsive">
            <paginate
              ref="paginator"
              name="listaPicFiltrado"
              :list="listaPicFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Capacitación</th>
                    <th scope="col">Tipo</th>
                    <th scope="col" class="col-sm-5">Áreas Relacionadas</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody v-if="listaPicFiltrado.length != 0">
                  <tr
                    v-for="(pic, key) in paginated('listaPicFiltrado')"
                    :key="key"
                  >
                    <td>
                      {{ pic.capacitacion }}
                    </td>
                    <td>{{ pic.pic_tipo.pic_tipo }}</td>
                    <td>{{ pic.areas_relacionadas }}</td>
                    <td scope="row">
                      <div
                        class="btn-toolbar btn-responsive-table"
                        role="toolbar"
                      >
                        <div
                          class="btn-group btn-spc"
                          tooltip="Ver Capacitación"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'VerDetalleCapacitacionENI',
                              params: {
                                id: pic.id_pic,
                              },
                            }"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>
                        </div>
                        <div
                          class="btn-group btn-spc"
                          tooltip="Modificar Capacitación"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'ModificarCapacitacionENI',
                              params: {
                                id: pic.id_pic,
                              },
                            }"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>
                        </div>
                        <div
                          class="btn-group btn-spc"
                          tooltip="Eliminar Capacitación"
                          tooltip-flow="top"
                        >
                          <button
                            @click="eliminarPic(pic.id_pic, pic.capacitacion)"
                            class="btn btn-sm bg-azul-sena text-white"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <div v-if="listaPicFiltrado.length == 0">No hay datos</div>
              </table>
            </paginate>
          </div>
          <paginate-links
            class="pagination justify-content-end"
            for="listaPicFiltrado"
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";
import Multiselect from "vue-multiselect";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
    Multiselect,
  },
})


export default class Login extends Vue {
  areas: any[] = [];
  picTipos: any[] = [];
  redesConocimiento: any[] = [];
  areasEscogidas;
  redesEscogidas;
  // areasEscogidas: any[] = [];
  lista_redes: any[] = [];
  red_conocimiento_seleccionada = null;

  estadoPeticionTabla = false;
  estadoPeticion = true;
  listaPicFiltrado: any[] = [];
  listaPic = [];
  filter = "";
  filter2 = "";
  filterArea = "";
  value = "";
  fechas_pic: any[] = [];
  fecha_pic = this.fechas_pic[0];
  paginate = ["listaPicFiltrado"];
  filterPicTipo = "";
  existe_tipo_tecnico = false;
  existe_tipo_pedagogico = false;
  existe_tipo_clave = false;
  estadopeticionAnio = false;
  tipoPicFilter = "";
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
  

  async mounted() {
    this.obtenerCapacitaciones();
    await this.ontenerPlanInstitucional();
    await this.ObtenerDatosPIC();
    this.obtenerRedConocimiento();
  }

  async updated() {
    await this.listarTiposPic();
  }

  async ObtenerDatosPIC() {
    await Axios()
      .get("/crear_pic")
      .then((respuesta) => {
        this.areas = respuesta.data.results.areas;

        this.picTipos = respuesta.data.results.picTipos;
        this.redesConocimiento = respuesta.data.results.redesConocimiento;
      });
  }

  async obtenerCapacitaciones() {
    this.estadopeticionAnio = true;
    Axios()
      .get("listar_pics/" + this.fecha_pic)
      .then((respuesta) => {
        this.listaPic = respuesta.data.results.pics;
        this.listaPicFiltrado = respuesta.data.results.pics;
        this.estadopeticionAnio = false;
      }).finally(()=>{
        this.estadopeticionAnio = false;
      })
  }

  async ontenerPlanInstitucional() {
    this.estadoPeticionTabla = false;
    await Axios()
      .get("listar_plan_institucional")
      .then((respuesta) => {
        this.fechas_pic = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  async eliminarPic(id, capacitacion) {
    Swal.fire({
      title: "Eliminar Capacitación ",
      text: capacitacion + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    })
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_pic/" + id)
            .then((respuesta) => {
              if (respuesta.data.status.toLowerCase() == "success") {
                Swal.fire({
                  title: "Capacitación eliminada",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                  cancelButtonColor: "#2d2d2d",
                });
                // this.listaPicFiltrado.splice(index, 1);
                this.obtenerCapacitaciones();
              } else {
                Swal.fire({
                  title: "Capacitación No fue eliminada",
                  text: respuesta.data.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                  cancelButtonColor: "#2d2d2d",
                });
              }
              // this.listaPic.splice(index, 1);
            });
          // this.eliminarAreasEscogidasPic(id);
        }
      })
      .finally(() => {
        this.obtenerCapacitaciones();
      });
  }

  picAreasFiltrado() {

    let arregloFiltrado = [];

    for (let capacitacion of this.listaPic) {
      let areasRelacionadas = capacitacion.areas_relacionadas.toLowerCase();
      // MACHETAZO ASPERO
      this.listaPicFiltrado = this.listaPic;

      if (
        areasRelacionadas.indexOf(
          this.areasEscogidas.area_ruta.toLowerCase()
        ) >= 0
      ) {
        arregloFiltrado.push(capacitacion);
      }
    }

    this.listaPicFiltrado = arregloFiltrado;
    if (this.listaPicFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró areas que coincidan con las busqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.areasEscogidas = {};
      this.listaPicFiltrado = this.listaPic;
      // this.paginate = ['listaConvocatoriasFiltrado']
    }
  }

  picRedFiltrado() {

    let arregloFiltrado = [];

    for (let capacitacion of this.listaPic) {
      let redesRelacionadas = capacitacion.redes_relacionadas.toLowerCase();
      // MACHETAZO ASPERO
      this.listaPicFiltrado = this.listaPic;

      if (
        redesRelacionadas.indexOf(
          this.redesEscogidas.red_conocimiento.toLowerCase()
        ) >= 0
      ) {
        arregloFiltrado.push(capacitacion);
      }
    }

    this.listaPicFiltrado = arregloFiltrado;
    if (this.listaPicFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró areas que coincidan con las busqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.redesEscogidas = {};
      this.listaPicFiltrado = this.listaPic;
      // this.paginate = ['listaConvocatoriasFiltrado']
    }
  }

  obtenerRedConocimiento() {
    Axios()
      .get("listar_red_conocimiento")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_redes = respuesta.data.results;
        }
      });
  }

  async eliminarAreasEscogidasPic(id_pic) {
    await Axios()
      .delete("eliminar_areas_asociadas_capacitacion/" + id_pic)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
        } else {
        }
      });
  }

  picFiltrado() {
    let picFilter = [];

    for (let capa of this.listaPic) {
      let capacitacion = capa.capacitacion.toLowerCase();
      let pictipo = capa.pic_tipo.pic_tipo.toLowerCase();
      let areas_relacionadas = capa.areas_relacionadas.toLowerCase();

      if (
        capacitacion.indexOf(this.filter.toLowerCase()) >= 0 ||
        pictipo.indexOf(this.filter.toLowerCase()) >= 0 ||
        areas_relacionadas.indexOf(this.filter.toLowerCase()) >= 0
      ) {
        picFilter.push(capa);
      }
    }

    this.listaPicFiltrado = picFilter;
    if (this.listaPicFiltrado.length == 0) {
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
      this.listaPicFiltrado = this.listaPic;
    }
  }

 

  async picTipoFiltrado() {
    this.listaPicFiltrado = [];
    this.listarTiposPic();
    for (let conv of this.listaPic) {
      let picTipo = conv.pic_tipo.pic_tipo;
      if (this.filterPicTipo != "") {
        if (picTipo.indexOf(this.filterPicTipo) >= 0) {
          this.listaPicFiltrado.push(conv);
        } else {
          // no hay coincidencias
        }
      } else {
        this.listaPicFiltrado = this.listaPic;
      }
    }
  }

  listarTiposPic() {
    for (let conv of this.listaPic) {
      if (conv.pic_tipo.pic_tipo == "Técnico") {
        this.existe_tipo_tecnico = true;
      } else if (conv.pic_tipo.pic_tipo == "Pedagógico") {
        this.existe_tipo_pedagogico = true;
      } else if (conv.pic_tipo.pic_tipo == "Clave y Transversal") {
        this.existe_tipo_clave = true;
      }
    }
  }
}
</script>
<style>
.campos .actividad {
  width: 400px;
}
.campos .acciones {
  width: 100px;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
