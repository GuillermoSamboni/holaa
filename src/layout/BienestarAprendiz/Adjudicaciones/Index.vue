<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LISTA ADJUDICADOS</h1>
        <div class="row">
          <div>
            <small class="text-azul-sena mr-2"
              >Convocatoria: {{ this.convocatoria.convocatoria }}</small
            >
          </div>

          <div>
            <small class="text-azul-sena mr-2"
              >Tipo convocatoria: {{ this.convocatoria.tipo_apoyo }}</small
            >
          </div>

          <div>
            <small class="text-azul-sena"
              >Cupos: {{ this.convocatoria.cupo_total }}</small
            >
          </div>
        </div>
      </div>

      <div class="row">
        <div class="row col-12 col-lg-4 pr-0 ml-4">
          <input
            type="number"
            class="form-control col-lg-5 col-12 mb-2 mr-md-3"
            placeholder="Buscar por cédula"
            v-model="identificacionbuscar"
          />
          <button
            class="btn bg-azul-sena text-white col-lg-5 col-12 mb-2"
            @click="buscarUsuario"
          >
            Buscar
          </button>
        </div>
        <!-- v-if="convocatoria.id_pic_fase == 1" -->
        <div class="col-lg-4 col-sm-12 mt-1">
          <button
            type="azul-sena"
            @click="cambiarPostuacion(convocatoria.id_convocatoria)"
            class="btn btn-block bg-azul-sena text-white"
          >
            Finalizado
          </button>
        </div>
        <!-- aqui -->
        <div class="col-lg-2 col-sm-12 mr-4" v-if="lista == 'c'">
          <base-button
            block
            type="default"
            class="btn btn-block btn-azul-sena ml-0"
            @click="modalInscribir = true"
          >
            Inscribir aprendiz
          </base-button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <modal
            :show.sync="modalInscribir"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm modal-lg"
          >
            <template slot="header">
              <h1
                class="text-azul-sena modal-title"
                id="modalInscribirAprendiz"
              >
                Inscribir Aprendiz
              </h1>
            </template>
            <card
              type="white"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0"
            >
              <template class="row">
                <div class="col-lg-6 col-sm-12 py-2 center">
                  <div class="form-group">
                    <label class="mt-2 font-weight-bold" for="cedula">
                      Número de identificación
                      <span class="text-danger">*</span>:</label
                    >
                    <input
                      v-model="nuevaCC"
                      @keyup.delete="limpiarFichasAprendiz(), (ocultar = false)"
                      type="number"
                      class="form-control"
                      placeholder="Nueva cédula"
                      name="cedula"
                      id="cedula"
                      required
                      v-validate="'required'"
                    />
                    <small v-show="errors.has('cedula')" class="text-danger">{{
                      errors.first("cedula")
                    }}</small>
                  </div>
                  <button
                    v-if="!ocultar"
                    class="btn btn-block btn-azul-sena ml-1"
                    @click="obtenerPersona(nuevaCC), (ocultar = true)"
                  >
                    Buscar aprendiz
                  </button>
                  <small v-if="ocultar" class="verde-sena center">
                    Usuario Encontrado
                  </small>
                </div>

                <div class="col-lg-6 col-sm-12 py-2 center">
                  <div class="form-group">
                    <label class="mt-2 font-weight-bold" for="cedula">
                      Fecha Inicio
                      <span class="text-danger">*</span>:</label
                    >
                    <input
                      v-model="fecha_inicio"
                      type="date"
                      class="form-control"
                      placeholder="fecha en que aplica la suspención"
                      name="fecha_inicio"
                      id="fecha_inicio"
                      :min="fecha_inicio + '-01-01'"
                      :max="fecha_inicio + '-12-31'"
                      required
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_inicio')"
                      class="text-danger"
                      >{{ errors.first("fecha_inicio") }}</small
                    >
                  </div>
                </div>

                <div class="col-lg-6 col-sm-12 py-2 center">
                  <div class="form-group">
                    <label class="mt-2 font-weight-bold" for="cedula">
                      Fecha Fin
                      <span class="text-danger">*</span>:</label
                    >
                    <input
                      v-model="fecha_fin"
                      type="date"
                      :min="fecha_fin + '-01-01'"
                      :max="fecha_fin + '-12-31'"
                      class="form-control"
                      placeholder="fecha en que aplica la suspención"
                      name="fecha_fin"
                      id="fecha_fin"
                      required
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_fin')"
                      class="text-danger"
                      >{{ errors.first("fecha_fin") }}</small
                    >
                  </div>
                </div>

                <div class="col-lg-6 col-sm-12 p-2 center">
                  <!-- <button
                    class="btn btn-block btn-azul-sena ml-1"
                    @click="adjudicarAprendizConvocatoria()"
                  > -->

                  <div v-if="personaInscripcion">
                    <button
                      class="btn btn-block btn-azul-sena ml-1"
                      @click="adjudicarInscrito()"
                    >
                      Inscribir aprendiz
                    </button>
                  </div>
                </div>
              </template>
            </card>
          </modal>
        </div>
      </div>

      <paginate-links
        class="pagination justify-content-end"
        for="listaAdjudicados"
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

      <div class="card-body">
        <div v-if="listaAdjudicados.length == 0" class="text-center">
          <h1 class="text-azul-sena">No hay Aprendices adjudicados aún</h1>
        </div>
        <paginate
          ref="paginator"
          name="listaAdjudicados"
          :list="listaAdjudicados"
          :per="10"
        >
          <div class="table-responsive" v-if="listaAdjudicados.length > 0">
            <table class="table table table-hover table-inverse">
              <thead class="text-white">
                <tr>
                  <th>Identificación</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <!-- {{listaAdjudicados}} -->

              <tbody>
                <tr
                  v-for="(adjudicado, key) in paginated('listaAdjudicados')"
                  :key="key"
                >
                  <td>{{ adjudicado.identificacion }}</td>
                  <td>
                    {{ adjudicado.primer_nombre }}
                    {{ adjudicado.segundo_nombre }}
                  </td>
                  <td>
                    {{ adjudicado.primer_apellido }}
                    {{ adjudicado.segundo_apellido }}
                  </td>
                  <td
                    v-if="
                      adjudicado.estado != 'r' &&
                      adjudicado.estado != 'c' &&
                      adjudicado.estado != 's'">
                    Activo
                  </td>
                  <td v-if="adjudicado.estado == 'c'">Cancelado</td>
                  <td v-if="adjudicado.estado == 's'">Suspendido</td>
                  <td v-if="adjudicado.estado == 'r'">Reactivado</td>
                  <td>
                    <div>
                      <span tooltip="Reportar novedad" tooltip-flow="top">
                        
                        <b-button
                          class="btn btn-sm bg-azul-sena text-white"
                          v-if="adjudicado.estado != 'c'"
                          @click="
                            (estadoAdj = adjudicado.estado),
                              (docResolucon = null),
                              (idadjudicadobienestar =
                                adjudicado.id_adjudicacion_bienestar),
                              (modalNovedades = true),
                              fecha_aplica = ''
                          "
                          ><i class="fas fa-exclamation-triangle"></i
                        ></b-button>
                      </span>
                      <!-- modal para eliminar inscrito -->
                      <span tooltip="Historial novedades" tooltip-flow="top">
                        <b-button
                          class="btn btn-sm bg-azul-sena text-white"
                          @click="
                            obtenerNovedadesAdjudicado(
                              adjudicado.id_adjudicacion_bienestar
                            ),
                              (modalListaNovedades = true),
                              (idadjudicadobienestar =
                                adjudicado.id_adjudicacion_bienestar)
                          "
                        >
                          <i class="fas fa-list"></i>
                        </b-button>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </paginate>
      </div>
      <paginate-links
        class="pagination justify-content-end"
        for="listaAdjudicados"
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
    <div class="row">
      <div class="col-md-4" id="modal">
        <modal
          id="modal-novedad"
          :show.sync="modalNovedades"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1 class="text-azul-sena modal-title" id="modalNovedadesAprendiz">
              Lista Novedades
            </h1>
          </template>
          <card
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template class="row">
              <!-- campo fecha -->
              <div class="col-lg-6 col-sm-12 py-2 center">
                <div class="form-group">
                  <label class="mt-2 font-weight-bold" for="cedula">
                    Acción inicia desde el:
                    <span class="text-danger">*</span>:</label
                  >
                  <input
                    v-model="fecha_aplica"
                    type="date"
                    class="form-control"
                    placeholder="fecha en que aplica la suspención"
                    name="fecha_aplica"
                    id="fecha_aplica"
                    :min="fecha_minima"
                    required
                    v-validate="'required'"
                  />
                  <small
                    v-show="errors.has('fecha_aplica')"
                    class="text-danger"
                    >{{ errors.first("fecha_aplica") }}</small
                  >
                </div>
              </div>
              <div class="d-flex align-items-center" id="prueba">
                <input
                  required
                  v-validate="'required'"
                  type="file"
                  name="cargar_archivo"
                  id="cargar_archivo"
                  class="d-none"
                  @change="obtenerDocumento($event)"
                  accept="application/pdf"
                />

                <label class="btn btn-azul-sena" for="cargar_archivo"
                  >Cargar Archivo</label
                >
                <small
                  v-show="errors.has('cargar_archivo')"
                  class="text-danger"
                  >{{ errors.first("cargar_archivo") }}</small
                >
                <p class="m-0 col-sm-4 col-md-4 col-lg-8" v-if="docResolucon != null" >
                  {{ docResolucon.name }}
                </p>
              </div>

              <div class="table-responsive">
                <table class="table table table-hover table-inverse">
                  <thead class="text-white">
                    <tr>
                      <th>Clase</th>
                      <th>Novedad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="listaNovedadApoyo != null">
                      <tr
                        v-for="(novedad, key) in listaNovedadApoyo"
                        :key="key"
                      >
                        <td v-if="novedad.clase_novedad == 'c'">Cancelado</td>
                        <td v-if="novedad.clase_novedad == 's'">Suspendido</td>
                        <td v-if="novedad.clase_novedad == 'r'">Reactivado</td>
                        <td>{{ novedad.novedad }}</td>
                        <td>
                          <span tooltip="Aplicar novedad" tooltip-flow="top">
                            <button
                              type="button"
                              data-backdrop="false"
                              data-dismiss="modal"
                              class="btn btn-sm bg-azul-sena text-white"
                              @click="validarFormulario(novedad)"
                            >
                              <i class="fas fa-check-square"></i>
                            </button>
                          </span>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <modal
          :show.sync="modalListaNovedades"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1
              class="text-azul-sena modal-title"
              id="modalListaNovedadesAprendiz"
            >
              Historial Novedades
            </h1>
          </template>
          <card
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template class="row">
              <div class="table-responsive">
                <div v-if="novedadesAdjudicado.length <= 0" class="text-center">
                  <h1 class="text-azul-sena">Aún sin novedades</h1>
                </div>
                <table
                  class="table table table-hover table-inverse"
                  v-if="novedadesAdjudicado.length > 0"
                >
                  <thead class="text-white">
                    <tr>
                      <th>Nombre</th>
                      <th>Novedad</th>
                      <th>Fecha Novedad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(novedad, key) in novedadesAdjudicado"
                      :key="key"
                    >
                      <td>
                        {{ novedad.primer_nombre }}
                        {{ novedad.primer_apellido }}
                      </td>
                      <td>{{ novedad.novedad }}</td>
                      <td>{{ novedad.aplica_el }}</td>
                      <td>
                        <!-- <span v-b-tooltip.hover.top title="Eliminar Novedad">
                          <a
                            @click="
                              eliminarNovedad(
                                novedad.id_novedad,
                                novedad.tipo_novedad,
                                key
                              )
                            "
                            alt="eliminar convocatoria"
                            class="btn btn-sm bg-naranja-sena text-white"
                          >
                            <i class="fas fa-trash-alt"></i>
                          </a>
                        </span> -->
                        <!-- <span tooltip="Modificar Novedad" tooltip-flow="top">
                          <b-button
                            class="btn btn-sm bg-azul-sena text-white"
                            @click="
                              modifcarNovedad = true;
                              obtenerNovedadesApoyo(convocatoria.tipo_apoyo_id);
                            "
                            ><i class="fas fa-edit"></i
                          ></b-button>
                        </span> -->

                        <span tooltip="Ver Documento" tooltip-flow="top">
                          <button
                            class="btn btn-sm bg-azul-sena text-white"
                            @click="
                              obtenerResolucionNovedad(novedad.id_novedad)
                            "
                          >
                            <i class="far fa-file-alt"></i>
                          </button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <modal
          :show.sync="modifcarNovedad"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1 class="text-azul-sena modal-title" id="modalModificarNovedad">
              Modificar Novedad nueva
            </h1>
          </template>
          <card
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template class="row">
              <!-- campo fecha -->
              <div class="col-lg-6 col-sm-12 py-2 center">
                <div class="form-group" v-if="novedadesAdjudicado.length != 0">
                  <label class="mt-2 font-weight-bold" for="cedula">
                    Acción inicia desde el:
                    <span class="text-danger">*</span>:</label
                  >
                  <input
                    v-model="novedadesAdjudicado[posNovedad].aplica_el"
                    type="date"
                    class="form-control"
                    placeholder="fecha en que aplica la suspención"
                    name="fecha_aplica"
                    id="fecha_aplica"
                    required
                    v-validate="'required'"
                  />
                  <small
                    v-show="errors.has('fecha_aplica')"
                    class="text-danger"
                    >{{ errors.first("fecha_aplica") }}</small
                  >
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table table-hover table-inverse">
                  <thead class="text-white">
                    <tr>
                      <th>Clase</th>
                      <th>Novedad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    <template v-if="listaNovedadApoyo != null">
                      <tr
                        v-for="(novedad, key) in listaNovedadApoyo"
                        :key="key"
                      >
                        <td v-if="novedad.clase_novedad == 'c'">Cancelado</td>
                        <td v-if="novedad.clase_novedad == 's'">Suspendido</td>
                        <td v-if="novedad.clase_novedad == 'r'">Reactivado</td>
                        <td>{{ novedad.novedad }}</td>
                      
                        <td>
                          <span tooltip="Aplicar novedad" tooltip-flow="top">
                            <button
                              type="button"
                              class="btn btn-sm bg-azul-sena text-white"
                              @click="
                                novedadmodificar(novedad),
                                  modificarNovedad(
                                    novedadactual.id_novedad_bienestar
                                  )
                              "
                            >
                              <i class="fas fa-check-square"></i>
                            </button>
                          </span>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <modal
          :show.sync="verDocumento"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1 class="text-azul-sena modal-title" id="modalModificarNovedad">
              Ver Documento
            </h1>
          </template>
          <card
            v-if="docResolucon != null"
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template class="row">
              <div>
                <embed
                  :src="docResolucon"
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>
    <div
      class="btn-group btn-spc"
      v-if="convocatoria.fase_bienestar == 'Finalizada'"
      div
      tooltip="Finalizado"
      tooltip-flow="top"
    >
      <router-link
        alt="novedades"
        class="btn btn-sm bg-naranja-sena text-white"
        :to="{
          name: 'Finalizar convocatoria',
          params: { id: convocatoria.id_convocatoria },
        }"
      >
        <i class="fas fa-user-edit"></i>
      </router-link>
    </div>
    <!-- {{ this.convocatoria }} -->

    <div class="card-footer">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-sm-12 mt-1">
          <router-link
            class="btn btn-block bg-azul-sena text-white"
            :to="{
              name: 'GestionarConvocatoria',
            }"
          >
            Volver
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";

@Component
export default class Inscribir extends Vue {
  usuario = JSON.parse(sessionStorage.getItem("usuario"));
  listaAdjudicados: any[] = [];
  listaNovedadApoyo: any[] = [];
  convocatoria = {
    centro_formacion_id: "",
    centro_formación: "",
    convocatoria: "",
    cupo_hombres_14_17: null,
    cupo_hombres_mayores: null,
    cupo_instructores: null,
    cupo_mujeres_14_17: null,
    cupo_mujeres_mayores: null,
    cupo_total: null,
    estimulo_mensual: "",
    fase_bienestar: "",
    fase_bienestar_id: "",
    fecha_final_convoca: "",
    fecha_inicio_convoca: "",
    id_convocatoria: "",
    ruta_documento: "",
    tipo_apoyo: "",
    tipo_apoyo_id: "",
    tipo_monitoria: "",
    tipo_monitoria_id: "",
    convocatoria_id: "",
  };
  modalNovedades = false;
  modalListaNovedades = false;
  modifcarNovedad = false;
  listaNovedades: [] = [];
  novedadesAdjudicado: any[] = [];
  posNovedad = 0;
  idConvocatoria = null;
  fecha_aplica: string = "";
  idadjudicadobienestar: number = -1;
  estadoAdj: string = "";
  verDocumento = false;
  mostrarDoc = null;
  docResolucon: string = null;
  docValido = false;
  criteriosSeleccionados: [] = [];
  apoyoid = -1;
  miVariable = null;
  fecha_minima = "";
  modal = null;
  novedadactual = null;

  ocultar = false;

  modalInscribir = false;
  fichaSeleccionada = null;
  nuevaCC = "";
  btnVerFichas = false;
  fichasAprendiz: [] = [];
  listaCriteriosApoyo: [] = [];
  listaCriterios: [] = [];
  aprendicesInscritos: [] = [];
  fecha_inicio = null;
  fecha_fin = null;
  porc_estimulo_entero = null;
  porc_estimulo_decimal = null;
  nombre = "";
  adjudicar = false;
  filter = "";
  listaRepresentantesFiltrado: any[] = [];
  paginate = ["listaAdjudicados"];
  listaRepresentantes = [];
  id_persona = null;
  usuariobusqueda;
  mostrarLista = [];
  identificacionbuscar = "";
  personaInscripcion = null;
  estadoPeticionRegistrar = false;

  //mi prueba
  lista: any = [];
  listaLength = "";
  menu;
  clonedMenu;
  menuEliminar;
  prueba = false;
  id_usuario = "";

  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Este campo es obligatorio",
        min: () => "Mínimo 6 caracteres",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {
    this.idConvocatoria = this.$route.params.id;
    this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
    this.obtenerConvocatoria(this.$route.params.id);
    this.obtenerNovedadesApoyo(this.$route.params.id);
    this.obtenerCriterios(this.$route.params.id);
    this.obtenerInscritosConvocatoria(this.$route.params.id);
    this.id_usuario = JSON.parse(sessionStorage.getItem("usuario")).id_usuario;
 
  }

  cambiarPostuacion(i) {
    // const id_usuario = JSON.parse(sessionStorage.getItem("usuario"));
    Axios()
      .post("/cambiar_estado_finalizado/" + this.convocatoria.id_convocatoria, {
        id_convocatoria: this.convocatoria.id_convocatoria,
        fase_bienestar_id: 7,
        // id_usuario_actualiza: id_usuario.id_usuario,
        id_usuario_actualiza: JSON.parse(sessionStorage.getItem("usuario")),
      })
      .then(() => {
        this.estadoPeticionRegistrar = true;
        Swal.fire({
          title: "Convocatoria ",
          text: "Pasó a fase de finalización",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
          icon: "success",
        });
        // router.back();
            this.$router.push("GestionarConvocatoria");
      })
      .catch(() => {
        this.estadoPeticionRegistrar = false;

        Swal.fire({
          title: "ERROR",
        });
      });
  }

  async obtenerConvocatoria(id) {
    await Axios()
      .get("listar_convocatoria/" + id)
      .then((respuesta) => {
        this.convocatoria = respuesta.data.results;
        // this.apoyoid = this.convocatoria.tipo_apoyo_id;
        this.obtenerCriteriosApoyo(this.convocatoria.tipo_apoyo_id);
        this.obtenerNovedades(this.convocatoria.tipo_apoyo_id);
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  eliminarNovedad(id: number, nombre: string, pos: number) {
    Swal.fire({
      title: "Eliminar novedad " + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#238276",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Axios()
          .delete("eliminar_novedad/" + id)
          .then((respuesta) => {
            Swal.fire({
              title: "Novedad Eliminada",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            // this.obtenerNovedadesAdjudicado(id);
            this.novedadesAdjudicado.splice(pos, 1);
            this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
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
  obtenerNovedadesAdjudicado(id) {
    Axios()
      .get("detalle_novedad/" + id)
      .then((respuesta) => {
        this.novedadesAdjudicado = respuesta.data.results;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  obtenerResolucionNovedad(id: number) {
    this.docResolucon = null;
    this.docResolucon =
      "https://develdfp.cloudsenactpi.net/api/mostrar_resolucion_novedad/" + id;
    this.verDocumento = true;
  }

  novedadmodificar(novedad) {
    this.novedadactual = novedad;
  }
  modificarNovedad(idNovedad) {
    const id_usuario = JSON.parse(sessionStorage.getItem("usuario")).id_usuario;

    Axios()
      .put(
        "actualizar_novedad/" +
          this.novedadesAdjudicado[this.posNovedad].id_novedad,
        {
          id_novedad: this.novedadesAdjudicado[this.posNovedad].id_novedad,
          // tipo_novedad_id: idNovedad.id_novedad_bienestar,
          id_novedad_bienestar:
            this.novedadesAdjudicado[this.posNovedad].id_novedad,
          id_adjudicacion_bienestar: this.idadjudicadobienestar,
          aplica_el: this.novedadesAdjudicado[this.posNovedad].aplica_el,
          id_usuario: id_usuario,
        }
      )
      .then((respuesta) => {

        Swal.fire(
          "Novedad Modificada!".toString().toUpperCase(),
          "la causal de suspención o cancelación ha sido modificada!",
          "success"
        );
        this.modifcarNovedad = false;
        this.obtenerNovedadesAdjudicado(this.idadjudicadobienestar);
        this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
        this.obtenerNovedadesApoyo(this.$route.params.id);
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  async obtenerNovedades(id) {
    // this.modalNovedades = true;
    // if para saber estado y segun eso mostrar las novedades
    await Axios()
      .post("crear_novedad/" + id, {
        tipo_apoyo_id: id,
        id_adjudicacion_bienestar: this.idadjudicadobienestar,
      })
      .then((respuesta) => {
        this.obtenerNovedadesApoyo(id);
        return respuesta.data.results;
      })
      .then((res) => {
        //mis cambios agregue.tipos_novedad
        this.fecha_minima = res.fecha_minima;
        this.listaNovedades = res.tipos_novedad;

        return true;
      })
      .then(() => {});
  }

  async obtenerAdjudicadosConvocatoria(id) {
    await Axios()
      .get("listar_adjudicados/" + id)
      .then((respuesta) => {
        return respuesta.data.results;
      })
      .then((res) => {
        setTimeout(() => {
          if (res != null) {
            this.listaAdjudicados = res;
            this.listaLength = res.length;
            for (let i in this.listaAdjudicados) {
              this.lista = this.listaAdjudicados[i].estado;
            }
          }
        }, 100);
      });
  }

 registrarNovedad(fecha_aplica, novedad) {
    // alert("al fin!!!")
    
    if ((fecha_aplica != "" && this.docResolucon != null)) {
      Axios()
        .post("almacenar_novedad/" + this.usuario.id_usuario, {
          id_tipo_novedad: novedad.novedades_bienestar_id,
          aplica_el: fecha_aplica,
          id_adjudicacion_bienestar: this.idadjudicadobienestar,
        })
        .then((respuesta) => {
          Swal.fire(
            "Novedad Registrada".toString().toUpperCase(),
            "la causal de suspención o cancelación ha sido registrada!",
            "success"
          );
          if (this.docResolucon != null) {
            this.subirDocumento(respuesta.data.results.id_novedad);
          }
          this.fecha_aplica = "";

          this.modalNovedades = false;
          this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
        });
    } else {
      Swal.fire({
        title: "Campos vacíos",
        text: "Se debe ingresar una fecha de inicio de la novedad y un documento de soprte de la novedad",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "btn btn-azul-sena",
        },
      });
    }
  }

 validarFormulario(novedad) {
    this.$validator.validate().then((valid) => {
      this.registrarNovedad(this.fecha_aplica, novedad);

    });

  }

  obtenerDocumento(event) {
    let newFileList = Array.from(event);
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.docResolucon = event.target.files[0];
        //eliminar

        Swal.fire("Pdf Cargado!", "Archivo cargado exitosamente!", "success");
        this.docValido = true;
      } else {
        this.docValido = false;
        this.docResolucon = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.docResolucon = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
  subirDocumento(idNovedad) {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("documento", this.docResolucon);
    data.append("id_novedad", idNovedad);
    //Enviamos la petición
    Axios()
      .post("almacenar_resolucion_novedad/" + idNovedad, data, {
        headers: headers,
      })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire(
            "Se subió la resolución!",
            "Archivo cargado exitosamente!",
            respuesta.data.status
          );
        } else {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        }
      });
  }
  // obtener las novedades que son pertenecientes a (x) apoyo
  obtenerNovedadesApoyo(id) {
    Axios()
      .get("listar_novedad_bienestar/" + id)
      .then((respuesta) => {
        this.listaNovedadApoyo = respuesta.data.results;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  async obtenerCriterios(id) {
    await Axios()
      .get("crear_inscripcion_convocatoria/" + id)
      .then((respuesta) => {
        return respuesta.data.results;
      })
      .then((res) => {
        this.listaCriterios = res;
        return true;
      })
      .then(() => {
        let checks = document.getElementsByTagName("input");
        for (let i = 0; i < checks.length; i++) {
          const element = checks[i];
          if (element.type == "checkbox") {
            element.checked = false;
          }
        }
      });
  }

  async obtenerCriteriosApoyo(id_apoyo) {
    await Axios()
      .get("listar_criterios/" + id_apoyo)
      .then((respuesta) => {
        this.listaCriteriosApoyo = respuesta.data.results;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  async obtenerInscritosConvocatoria(id) {
    await Axios()
      .get("listar_inscripciones_convocatoria/" + id)
      .then((respuesta) => {
        return respuesta.data.results;
      })
      .then((res) => {
        // setTimeout(() => {
        if (res != null) {
          this.aprendicesInscritos = res;
        }
        // }, 100);
      });
  }

  obtenerFichasAprendiz(cedula) {
    Axios()
      .get("buscar_fichas_aprendiz/" + cedula)
      .then((respuesta) => {
        if (respuesta.data.status.toLowerCase() == "info") {
          this.btnVerFichas = false;
          Swal.fire({
            title: "ERROR!",
            icon: "error",
            text: respuesta.data.message,
            confirmButtonText: "Ok",
            confirmButtonColor: "#238276",
          });
        } else if (respuesta.data.status.toLowerCase() == "success") {
          this.fichasAprendiz = respuesta.data.results;
        }

        // this.btnVerFichas = false
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  inscribirAprendizConvocatoria(nuevaCC, idConvocatoria) {
    Axios()
      .post("almacenar_inscripcion_convocatoria", {
        id_convocatoria: idConvocatoria,
        identificacion: nuevaCC,
        id_criterio_priorizacion: this.criteriosSeleccionados,
        id_ficha_caracterizacion: this.fichaSeleccionada,
      })
      .then((respuesta) => {
        return respuesta.data;
      })
      .then((res) => {
        if (res.status == "success") {
          Swal.fire(
            "Aprendiz Inscrito!".toString().toUpperCase(),
            "Se inscribió exitosamente el aprendiz",
            "success"
          );
          this.listaCriterios = [];
          this.listaCriteriosApoyo = [];
          this.criteriosSeleccionados = [];
          this.obtenerCriteriosApoyo(this.convocatoria.tipo_apoyo_id);
          this.obtenerInscritosConvocatoria(this.$route.params.id);
          this.modalInscribir = false;
          setTimeout(() => {
            this.obtenerCriterios(this.$route.params.id);
          }, 3000);
        } else {
          Swal.fire(
            res.status.toString().toUpperCase(),
            res.message,
            res.status
          );
        }
      })
      .catch((err) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  validarFormularioAprendiz() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.inscribirAprendizConvocatoria(this.nuevaCC, this.idConvocatoria);
        this.nuevaCC = "";

        /* se quita la validacion por requeremiento de Johanna */

        // el formulario se validó y tiene los datos que corresponden por campo
        // if (this.criteriosSeleccionados.length <= 0) {
        //   Swal.fire({
        //     title: "Selección de criterios".toString().toUpperCase(),
        //     text: "Debe seleccionar al menos un criterio!",
        //     icon: "error",
        //     confirmButtonText: "Aceptar",
        //     confirmButtonColor: "#238276",
        //   });
        // } else {
        //   this.inscribirAprendizConvocatoria(this.nuevaCC, this.idConvocatoria);
        //   this.nuevaCC = "";
        // }
      }
    });
  }

  limpiarFichasAprendiz() {
    // if(this.nuevaCC.length < 7){
    this.btnVerFichas = false;
    this.fichasAprendiz = [];
    this.fichaSeleccionada = null;
    // this.obtenerFichasAprendiz(this.nuevaCC)
    // }
  }

  adjudicarInscrito() {
    Axios()
      .post("adjudicarInscrito", {
        id_persona: this.personaInscripcion.id_persona,
        id_convocatoria: this.convocatoria.id_convocatoria,
        fecha_inicio_apoyo: this.fecha_inicio,
        fecha_fin_apoyo: this.fecha_fin,
      })
      .then((respuesta) => {
        if ((this.listaLength <= this.convocatoria.cupo_total) || (this.lista == 'c')){
          if (respuesta.data.status == "success") {
            Swal.fire({
              title: "Aprendiz Adjudicado!",
              text: "Se ha registrado el aprendiz a la convocatoria exitosamente",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
          } else {
            Swal.fire({
              title: "Aprendiz NO Adjudicado!",
              text: respuesta.data.message,
              icon: "error",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
          }
        } else {
          Swal.fire({
            title: "Información",
            text:
              "Solo hay " +
              this.convocatoria.cupo_total +
              " cupos disponibles para esta convocatoria, verifique el numero de adjudicados.",
            icon: "warning",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error en el servidor!",
          text: "Cominiquese con el administrador del sistema",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
        });
      })
      .finally();
  }

  adjudicarAprendizConvocatoria(id) {
    Axios()
      .post("adjudicar_aprendiz_convocatoria", {
        id_convocatoria: this.$route.params.id,
        id_persona: id,
        fecha_inicio_apoyo: this.fecha_inicio,
        fecha_fin_apoyo: this.fecha_fin,
        porc_estimulo_mensual:
          this.porc_estimulo_entero + "," + this.porc_estimulo_decimal,
        id_usuario_autenticado: JSON.parse(sessionStorage.getItem("usuario"))
          .id_usuario,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Usuario " + this.nombre + " adjudicado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.fecha_inicio = "";
          this.fecha_fin = "";
          this.porc_estimulo_entero = "";
          this.porc_estimulo_decimal = "";
          this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
          this.adjudicar = false;
        } else {
          Swal.fire({
            title: "INFORMACIÓN",
            icon: "warning",
            text: respuesta.data.message,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        }

        // if (respuesta.data.status == "info") {
        //   Swal.fire({
        //     title: "INFORMACIÓN",
        //     icon: "warning",
        //     text:
        //       "El aprendiz " +
        //       this.nombre +
        //       " se encuentra adjudicado en otra convocatoria",
        //     confirmButtonText: "Aceptar",
        //     confirmButtonColor: "#238276",
        //   });
        this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
        this.adjudicar = false;
        // }
      })
      .catch((err) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  obtenerPersona(identificacion) {
    Axios()
      .post("crear_representante", { identificacion: identificacion })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.personaInscripcion = respuesta.data.results;
        } else {
          Swal.fire({
            title: "No se encontró la persona",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            text: "El número de identificación no corresponde a una persona registrada en el sistema.",
          }).then(() => {
            this.$router.back();
          });
        }
      });
  }

  async buscarUsuario() {
    await Axios()
      .post("buscar_usuario", { identificacion: this.identificacionbuscar })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.usuariobusqueda = respuesta.data.results;
          this.listaAdjudicados = [];
          this.listaAdjudicados.push(this.usuariobusqueda);
          // this.listaUsuarios = []
          // this.listaUsuarios.push(respuesta.data.results.data)

          // this.estadoPeticion = false;
        } else {
          Swal.fire({
            title: "perfil no existe",
            icon: "error",
          });
        }
      })
      .catch(() => {});
  }

  filtrar() {
    if (this.identificacionbuscar == "") {
      this.listaAdjudicados = this.aprendicesInscritos;
      return this.listaAdjudicados;
    } else {
      return this.listaAdjudicados;
    }
  }

}
</script>

<style></style>