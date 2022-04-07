<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">NOVEDADES</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div class="row" v-if="estadoPeticionTabla">
          <div class="col-lg-5 col-md-12 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Tipo de apoyo<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="tipo_apoyo"
                  v-validate="{ required: true }"

                  v-model="novedad.tipo_apoyo_id"
                  @change="obtenerNovedadesApoyo(novedad.tipo_apoyo_id)"
                >
                  <option value="null" selected disabled>
                    Seleccionar Tipo de apoyo
                  </option>
                  <option
                    v-for="(apoyo, key) in listaApoyos"
                    :key="key"
                    v-bind:value="apoyo.id_tipo_apoyo"
                  >
                    {{ apoyo.tipo_apoyo }}
                  </option>
                </select>
                <small v-show="errors.has('tipo_apoyo')" class="text-danger">
                  {{ errors.first("tipo_apoyo") }}
                </small>
              </div>
              <div v-if="estadoPeticionTabla">
                <div class="row my-3">
                  <div class="justify-content-lg-end col-md-5 col-lg-8 mt-2">
                    <paginate-links
                      class="pagination justify-content-end"
                      for="listaNovedadApoyo"
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
                <div v-if="novedad.tipo_apoyo_id != null">
                  <h3 class="text-azul-sena">
                    <h3 class="text-azul-sena">
                      Novedades existentes en el apoyo
                      <div
                        class="btn-group btn-spc"
                        div
                        tooltip="Agregar Novedad"
                        tooltip-flow="top"
                      >
                        <a
                          @click="modalRegistroNovedad = true"
                          alt="eliminar Novedad"
                          class="btn btn-sm bg-azul-sena text-white "
                        >
                          <i class="fas fa-plus"></i>
                        </a>
                      </div>
                    </h3>
                  </h3>
                </div>
                <!-- tabla -->
                <div class="text-center" v-if="estadoPeticion">
                  <AnimacionCargando></AnimacionCargando>
                </div>
                <div class="table-responsive" v-if="!estadoPeticion">
                  <paginate
                    ref="paginator"
                    name="listaNovedadApoyo"
                    :list="listaNovedadApoyo"
                    :per ="10"
                  >
                    <table v-if="!estadoPeticion" class="table table-hoverble">
                      <thead id="listado">
                        <tr>
                          <th class="text-nowrap">Novedad</th>
                          <th class="text-nowrap">Tipo novedad</th>
                          <th class="text-nowrap">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="listaNovedadApoyo != null">
                          <tr
                            v-for="novedad,key in listaNovedadApoyo" :key="key">
                            <td>
                              {{ novedad.novedad }}
                            </td>
                            <td v-if="novedad.clase_novedad == 'c'">
                              Cancelado
                            </td>
                            <td v-if="novedad.clase_novedad == 's'">
                              Suspendido
                            </td>
                               <td v-if="novedad.clase_novedad == 'r'">
                              Reactivado
                            </td>
                            <td>
                              <div
                                class="btn-group btn-spc"
                                div
                                tooltip="Eliminar"
                                tooltip-flow="top"
                              >
                                <a
                                  @click="
                                    eliminarNovedadApoyo(
                                      novedad.id_novedad_tipo_apoyo,
                                      key
                                    )"

                                  alt="eliminar Novedad"
                                  class="btn btn-sm bg-naranja-sena text-white"
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </template>
                        <tr v-else>
                          No hay Novedades
                        </tr>
                      </tbody>
                    </table>
                   </paginate> 
                </div>
                <paginate-links
                  class="pagination justify-content-end"
                  for="listaNovedadApoyo"
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
          <!-- novedades -->
          <div class="col-1"></div>
          <div class="col-lg-5 col-md-6 col-sm-8">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Novedades<span class="text-danger">*</span
                >:</label
              >
              <div>
                <div>
                  <select
                    class="form-control"
                    name="tipo_apoyo"
                    v-validate="{ required: true }"
                    :disabled="novedad.tipo_apoyo_id == null"
                    v-model="novedad.novedades_bienestar_id"
                    v-on:changed="modalRegistroNovedad"
                  >
                    <option value="null" selected disabled>
                      Selecionar Novedad
                    </option>
                    <option
                      v-for="(novedad, key) in listaNovedadNoRepetidos"
                      :key="key"
                      v-bind:value="novedad.id_novedad_bienestar"
                    >
                      {{ novedad.novedad }}
                    </option>
                  </select>
                </div>

                <small v-show="errors.has('tipo_apoyo')" class="text-danger">
                  {{ errors.first("tipo_apoyo") }}
                </small>

                <button
                  class="btn btn-azul-sena col-12 col-md-12 col-lg-12 mt-2"
                  :disabled="
                    novedad.novedades_bienestar_id == -1 ||
                      novedad.novedades_bienestar_id == null"

                  @click="
                    registrarNovedadTipoApoyo(
                      novedad.novedades_bienestar_id
                    )"
                >
                  Asignar Novedad al apoyo
                </button>
                <modal
                  :show.sync="modalRegistroNovedad"
                  body-classes="p-0"
                  modal-classes="justify-content-center modal-dialog-centered modal-sm-12"
                >
                  <template slot="header">
                    <h2
                      class="text-azul-sena modal-title"
                      id="modalRegistroNovedad"
                    >
                      Registar Novedad
                    </h2>
                  </template>
                  <card
                    type="white"
                    shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 "
                    class="border-0"
                  >
                    <div id="contenido">
                      <div>
                        <label class="mt-2 font-weight-bold">
                          Novedad
                          <span
                            class="text-danger font-weigth-bold"
                            tooltip="Campo Requerido"
                            tooltip-flow="top"
                            >*</span
                          >:
                        </label>
                        <div class="input-group">
                          <input
                            type="text"
                            name="novedad"
                            class="form-control"
                            id="novedad"
                            placeholder="Registrar Novedad"
                        v-validate="{ required: true }"
                            v-model="novedad.novedad"                     
                          />
                        </div>
                        <small
                          v-show="errors.has('novedad')"
                          class="text-danger font-weigth-bold"
                        >
                          {{ errors.first("novedad") }}
                        </small>

                        <label class="mt-2 font-weight-bold">
                          Tipo novedad
                          <span
                            class="text-danger font-weigth-bold"
                            tooltip="Campo Requerido"
                            tooltip-flow="top"
                            >*</span
                          >:
                        </label>
                        <div>
                         <select class="form-control"
                          v-model="novedad.clase_novedad">
                           <option value="null" selected disabled>
                         Seleccionar Tipo de novedad</option>
                            <option value="c">Cancelado</option>
                            <option value="s">Suspendido</option>
                            <option value="r">Reactivado</option>
                            </select>
                            </div>
                        <small
                          v-show="errors.has('claseNovedad')"
                          class="text-danger font-weigth-bold"
                        >
                          {{ errors.first("claseNovedad") }}
                        </small>
                      </div>

                      <button
                        class="
                          btn btn-azul-sena
                          col-12 col-md-12 col-lg-12
                          mt-2
                        "
                        @click="registrarNovedad()"
                      >
                        Registrar
                      </button>
                    </div>
                  </card>
                </modal>
              </div>
            </div>
          </div>
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
  modalRegistroNovedad = false;
  estadoPeticion = true;
  listaApoyos: any[] = [];
  listaNovedad: any[] = [];
  estadoPeticionTabla = false;
  paginate = ["listaNovedadApoyo"];
  listaNovedadApoyo = [];
  listaNovedadNoRepetidos = [];

  novedad = {
    tipo_apoyo_id: null,
    novedades_bienestar_id: null,
    novedad: null,
    clase_novedad: null,
    id_novedad_tipo_apoyo: null,
  };

  async mounted() {
    await this.obtenerApoyosNovedades();
  }

  obtenerApoyosNovedades() {
    Axios()
      .get("crear_tipo_novedad")
      .then((respuesta) => {
        this.listaApoyos = respuesta.data.results.tipos_apoyo;
        this.listaNovedad = respuesta.data.results.novedad;
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
  // obtener las novedades que son pertenecientes a (x) apoyo
  async obtenerNovedadesApoyo(id_apoyo) {
    await Axios()
      .get("listar_novedad_bienestar/" + id_apoyo)
      .then((respuesta) => {
        this.listaNovedadApoyo = respuesta.data.results;
        this.estadoPeticion = false;
        this.obtenerDatosNoRepetidosNovedades();
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

  obtenerDatosNoRepetidosNovedades() {
    this. listaNovedadNoRepetidos= [];
    let repetido = false;
    for (const novedad in this.listaNovedad) {
      repetido = false;
      for (const novedadesApoyo in this.listaNovedadApoyo) {
        if (
          this.listaNovedadApoyo[novedadesApoyo].novedades_bienestar_id ==
          this.listaNovedad[novedad].id_novedad_bienestar
        ) {
          repetido = true;
          break;
        }
      }
      if (repetido == false) {
        this.listaNovedadNoRepetidos.push(this.listaNovedad[novedad]);
      }
    }
  }

  //registrarNovedad
  registrarNovedad() {
    Axios()
      .post("almacenar_novedad_bienestar", {
        novedad: this.novedad.novedad,
        clase_novedad: this.novedad.clase_novedad,
      })
      .then((respuesta) => {
        if ((respuesta.data.status ="success")) {
          this.registrarNovedadTipoApoyo(
            respuesta.data.results.id_novedad_bienestar
          );
        } else {
          Swal.fire("ERROR!", "No se creo la novedad ", "error");
        }
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
  // registar novedad relacionado con el apoyo
  registrarNovedadTipoApoyo(id_novedad) {
    Axios()
      .post("almacenar_novedad_bienestar_tipo/"+ id_novedad, {
        tipo_apoyo_id: this.novedad.tipo_apoyo_id,
        novedades_bienestar_id: id_novedad,
      })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire({
            title: "Novedad Guardado",
            text: "Se guardo la novedad en el apoyo",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        } else {
          Swal.fire("ERROR!", "No se creo la novedad ", "error");
        }
        this.modalRegistroNovedad = false;
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
        this.actualizarListaNovedadApoyo()
      });
  }
  eliminarNovedadApoyo(id, index) {
    Swal.fire({
      title: "Eliminar Novedad ",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_novedad_tipo_apoyo/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "novedad Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              
            } else {
              Swal.fire({
                title: "No se pudo eliminar la novedad",
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
          })
          .finally(() =>{
            this.actualizarListaNovedadApoyo()
          });
          
      }
    });
  }

  async actualizarListaNovedadApoyo() {
    await this.obtenerNovedadesApoyo(this.novedad.tipo_apoyo_id);
    await this.obtenerApoyosNovedades();
  }

   constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }
}
</script>
<style></style>
