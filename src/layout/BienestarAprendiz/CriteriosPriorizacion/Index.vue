<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">CRITERIOS DE PRIORIZACIÓN</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <!-- <div class="row"> -->
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
                    v-validate="'required'"
                    v-model="criterios.tipo_apoyo_id"
                    @change="obtenerCriteriosApoyo(criterios.tipo_apoyo_id)"
                  >
                    <option value="null" selected disabled>
                      Selecionar Tipo de apoyo
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
                <div>
                  <div class="row my-3">
                    <div class="justify-content-lg-end col-md-5 col-lg-8 mt-2">
                      <paginate-links
                        class="pagination justify-content-end"
                        for="listaCriteriosApoyo"
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
                  <div v-if="criterios.tipo_apoyo_id != null">
                    <h3 class="text-azul-sena">
                      <h3 class="text-azul-sena">
                        Criterios existentes en el apoyo
                        <div
                          class="btn-group btn-spc"
                          div
                          tooltip="Agregar Criterio"
                          tooltip-flow="top"
                        >
                          <a
                            @click="modalRegistroCriterio = true"
                            alt="eliminar convocatoria"
                            class="btn btn-sm bg-azul-sena text-white"
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
                      name="listaCriteriosApoyo"
                      :list="listaCriteriosApoyo"
                      :per="10"
                    >
                      <table
                        v-if="!estadoPeticion"
                        class="table table-hoverble"
                      >
                        <thead id="listado">
                          <tr>
                            <th class="text-nowrap">
                              Criterios de Priorización
                            </th>
                            <th class="text-nowrap">Puntaje</th>
                            <th class="text-nowrap">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="listaCriteriosApoyo != null">
                            <tr
                              v-for="(criterio, key) in paginated(
                                'listaCriteriosApoyo'
                              )"
                              :key="key"
                            >
                              <td>
                                {{ criterio.criterio_priorizacion }}
                              </td>
                              <td>
                                {{ criterio.puntaje }}
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
                                      eliminarCriterioApoyo(
                                        criterio.id_criterio_tipos_apoyo,
                                        key
                                      )
                                    "
                                    alt="eliminar convocatoria"
                                    class="
                                      btn btn-sm
                                      bg-naranja-sena
                                      text-white
                                    "
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </a>
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
                    for="listaCriteriosApoyo"
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
            <!-- criterios de priorizacion -->
            <div class="col-1"></div>
            <div class="col-lg-5 col-md-6 col-sm-8">
              <div id="campo">
                <label class="font-weight-bold mt-2"
                  >Criterios de Priorización<span class="text-danger">*</span
                  >:</label
                >
                <div>
                  <div>
                    <select
                      class="form-control"
                      name="tipo_apoyo"
                      v-validate="'required'"
                      :disabled="criterios.tipo_apoyo_id == null"
                      v-model="criterios.criterio_priorizacion_id"
                      v-on:changed="modalRegistroCriterio"
                    >
                      <option value="null" selected disabled>
                        Selecionar Criterio de Priorizacion
                      </option>
                      <option
                        v-for="(criterio, key) in listaCriteriosNoRepetidos"
                        :key="key"
                        v-bind:value="criterio.id_criterio_priorizacion"
                      >
                        {{ criterio.criterio_priorizacion }}
                      </option>
                    </select>
                  </div>

                  <small v-show="errors.has('tipo_apoyo')" class="text-danger">
                    {{ errors.first("tipo_apoyo") }}
                  </small>

                  <button
                    class="btn btn-azul-sena col-12 col-md-12 col-lg-12 mt-2"
                    :disabled="
                      criterios.criterio_priorizacion_id == -1 ||
                      criterios.criterio_priorizacion_id == null
                    "
                    @click="
                      registrarCriterioTipoApoyo(
                        criterios.criterio_priorizacion_id
                      )
                    "
                  >
                    Asignar criterio al apoyo
                  </button>
                  <modal
                    :show.sync="modalRegistroCriterio"
                    body-classes="p-0"
                    modal-classes="justify-content-center modal-dialog-centered modal-sm-12"
                  >
                    <template slot="header">
                      <h2
                        class="text-azul-sena modal-title"
                        id="modalRegistroCriterio"
                      >
                        Registar Criterio de Priorización
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
                            Criterio Priorización
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
                              name="RegistrarCriterioPriorizacion"
                              class="form-control"
                              id="RegistrarCriterioPriorizacion"
                              placeholder="Registrar Criterio"
                              v-model="criterios.criterio_priorizacion"
                            />
                          </div>
                          <small
                            v-show="errors.has('RegistrarCriterioPriorizacion')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("RegistrarCriterioPriorizacion") }}
                          </small>

                          <label class="mt-2 font-weight-bold">
                            Puntaje
                            <span
                              class="text-danger font-weigth-bold"
                              tooltip="Campo Requerido"
                              tooltip-flow="top"
                              >*</span
                            >:
                          </label>
                          <div class="input-group">
                            <input
                              type="number"
                              name="PuntajeCriterioPriorizacion"
                              class="form-control"
                              id="PuntajeCriterioPriorizacion"
                              placeholder="Registrar Puntaje"
                              v-model="criterios.puntaje_criterio"
                              v-validate="{ required }"
                            />
                          </div>
                          <small
                            v-show="errors.has('PuntajeCriterioPriorizacion')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("PuntajeCriterioPriorizacion") }}
                          </small>
                        </div>

                        <button
                          class="
                            btn btn-azul-sena
                            col-12 col-md-12 col-lg-12
                            mt-2
                          "
                          :disabled="
                            criterios.puntaje_criterio <= 0 ||
                            criterios.criterio_priorizacion == null
                          "
                          @click="registrarCriterio()"
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
        <!-- </div> -->
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
  modalRegistroCriterio = false;
  estadoPeticion = true;
  listaApoyos: any[] = [];
  listaCriterios: any[] = [];
  estadoPeticionTabla = false;
  paginate = ["listaCriteriosApoyo"];
  listaCriteriosApoyo = [];
  listaCriteriosNoRepetidos = [];

  criterios = {
    tipo_apoyo_id: null,
    criterio_priorizacion_id: null,
    criterio_priorizacion: null,
    puntaje_criterio: null,
    id_criterio_tipos_apoyo: null,
  };

  async mounted() {
    await this.obtenerApoyosCriterios();
  }

  obtenerApoyosCriterios() {
    Axios()
      .get("crear_tipos_apoyo")
      .then((respuesta) => {
        this.listaApoyos = respuesta.data.results.tipos_apoyo;
        this.listaCriterios = respuesta.data.results.criterios_priorizacion;
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
  // obtener los criterios que son pertenecientes a (x) apoyo
  async obtenerCriteriosApoyo(id_apoyo) {
    await Axios()
      .get("listar_criterios/" + id_apoyo)
      .then((respuesta) => {
        this.listaCriteriosApoyo = respuesta.data.results;
        this.estadoPeticion = false;
        this.obtenerDatosNoRepetidosCriteriosPriorizacion();
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

  obtenerDatosNoRepetidosCriteriosPriorizacion() {
    this.listaCriteriosNoRepetidos = [];
    let repetido = false;
    for (const criterios in this.listaCriterios) {
      repetido = false;
      for (const criteriosApoyo in this.listaCriteriosApoyo) {
        if (
          this.listaCriteriosApoyo[criteriosApoyo].criterio_priorizacion_id ==
          this.listaCriterios[criterios].id_criterio_priorizacion
        ) {
          repetido = true;
          break;
        }
      }
      if (repetido == false) {
        this.listaCriteriosNoRepetidos.push(this.listaCriterios[criterios]);
      }
    }
  }

  //registrarCriterio
  registrarCriterio() {
    Axios()
      .post("almacenar_crititerio", {
        criterio_priorizacion: this.criterios.criterio_priorizacion,
        puntaje: this.criterios.puntaje_criterio,
      })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          this.registrarCriterioTipoApoyo(
            respuesta.data.results.id_criterio_priorizacion
          );
        } else {
          Swal.fire("ERROR!", "No se creo el criterio ", "error");
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
  // registar criterio relacionado con el apoyo
  registrarCriterioTipoApoyo($id_criterio) {
    Axios()
      .post("almacenar_crititerio_tipo_apoyo", {
        tipo_apoyo_id: this.criterios.tipo_apoyo_id,
        criterio_priorizacion_id: $id_criterio,
      })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire({
            title: "Criterio Guardado",
            text: "Se guardo el Criterio en el apoyo",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        } else {
          Swal.fire("ERROR!", "No se creo el criterio ", "error");
        }
        this.modalRegistroCriterio = false;
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
        this.actualizarListaCriteriosApoyo();
      });
  }
  eliminarCriterioApoyo(id, index) {
    Swal.fire({
      title: "Eliminar Criterio ",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_criterio/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Criterio Eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
            } else {
              Swal.fire({
                title: "No se pudo eliminar el criterio",
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
          .finally(() => {
            this.actualizarListaCriteriosApoyo();
          });
      }
    });
  }

  async actualizarListaCriteriosApoyo() {
    await this.obtenerCriteriosApoyo(this.criterios.tipo_apoyo_id);
    await this.obtenerApoyosCriterios();
  }

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "El valor no puede ser menor a cero",
        max_value: () => "El valor no puede ser menor a cien",
        email: () => "El correo no es válido",
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }
}
</script>
<style></style>
