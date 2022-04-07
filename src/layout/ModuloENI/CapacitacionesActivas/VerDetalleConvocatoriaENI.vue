<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">CONVOCATORIA ENI ACTIVA</h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div
          v-if="estadoPeticion"
          class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
        >
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Nombre de la convocatoria:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.convocatoria }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- capacitación -->
              <div>
                <strong> Capacitación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.capacitacion }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- año  -->
              <div>
                <strong> Año:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.plan_institucional_id }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- financiacion -->
              <div>
                <strong> Financiación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.financiacion }}</p>
              </div>
            </div>
          </div>

          <!-- departamentos y municipios -->
          <div v-if="convocatoria.id_municipio != null" class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Departamento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.departamento }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Municipio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.municipio }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Dirigido a:</strong>
                <div id="contenido">
                  <p id="texto" v-if="convocatoria.para_funcionarios == 'fc'">
                    Funcionarios contratista
                  </p>
                  <p id="texto" v-if="convocatoria.para_funcionarios == 'fp'">
                    Funcionarios de planta
                  </p>
                  <p id="texto" v-if="convocatoria.para_funcionarios == 'am'">
                    Funcionarios de planta y funcionarios contratistas
                  </p>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <template v-if="convocatoria.lugar != null">
                <div>
                  <strong> Lugar:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ convocatoria.lugar }}</p>
                </div>
              </template>
            </div>
          </div>
          <!-- fin -->
          <!-- advertencia para subir completos y bien los documentos -->
          <div>
            <label class="font-weight-bold"
              >Importante<span class="text-danger">*</span>:</label
            >
            <div id="contenido">
              <small
                >Recuerde verificar cada uno de los documentos que esta
                cargando, porque esta acción no tiene marcha atrás.</small
              >
            </div>
          </div>
          <div>
            <label class="mt-2 font-weight-bold"
              >Acta de compromiso<span class="text-danger">*</span>:</label
            >
            <div class="row">
              <div class="col-lg-5 col-md-5 col-sm-12 mb-1">
                <span>
                  <a
                    class="btn btn-sm btn-azul-sena text-white tam-completo"
                    @click="modal_datos_acta = true"
                  >
                    Descargar acta diligenciada</a
                  ></span
                >
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12 mb-1">
                <span class="">
                  <div class="custom-input-file tam-completo btn btn-sm">
                    <input
                      type="file"
                      id="requisito"
                      class="input-file"
                      accept="application/pdf"
                      value=""
                      required="true"
                      @change.prevent="obtenerActaCompromiso($event)"
                    />
                    Cargar acta de compromiso firmada
                  </div>
                </span>
              </div>

              <div class="mb-1" v-if="documentoActa">
                <span>
                  <!-- ver el archivo -->
                  <a
                    class="btn btn-sm btn-azul-sena text-white tam-completo"
                    @click="
                      (modal_ver_requisito = true),
                        vistaPreviaActaC(documentoActa)
                    "
                    ><i class="fas fa-eye"></i>
                  </a>
                </span>
                <modal
                  :show.sync="modal_ver_requisito"
                  body-classes="p-0"
                  modal-classes="modal-dialog-centered modal-sm
                              modal-lg"
                >
                  <template slot="header">
                    <h1
                      class="text-azul-sena modal-title"
                      id="modalNovedadesAprendiz"
                    >
                      Documento cargado - Vista previa
                    </h1>
                  </template>
                  <card
                    type="white"
                    shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0"
                  >
                    <div v-if="!vistaPreviaActa">
                      <h5 class="text-azul-sena">
                        No se a cargado ningún archivo
                      </h5>
                    </div>
                    <embed
                      v-if="vistaPreviaActa"
                      :src="vistaPreviaActa"
                      type="application/pdf"
                      width="100%"
                      height="600px"
                      style="border= 1;"
                    />
                  </card>
                </modal>
              </div>
              <!-- para descargar el formato de acta de compromiso -->
              <!-- <span v-b-tooltip.hover.top title="Descargar Formato"> -->
              <!-- ver el archivo -->
              <!-- <a class="btn btn-sm btn-azul-sena text-white" href="/descargas/GTH_F_136_V03_FORMATO_ACTA_DE_COMPROMISO_CAPACITACIÓN_INSTRUCTORES_.xlsx">
                    Descargar formato del acta
                    <i class="fas fa-file-download"></i>
                  </a> -->
              <!-- </span> -->
              <!-- boton para ver el archivo pdf cargado colocar url para llevar hacia el documento -->

              <modal
                :show.sync="modal_datos_acta"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-sm modal-lg"
              >
                <!-- <registrarEstudio></registrarEstudio> -->
                <!-- otro -->
                <template slot="header">
                  <h2 class="text-azul-sena modal-title" id="">
                    Generar Acta de compromiso
                  </h2>
                </template>
                <card
                  type="white"
                  shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0"
                >
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <div>
                      <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-6">
                          <label class="mt-4 font-weight-bold"
                            >Nombre instructor:</label
                          >
                          <div class="input-group">
                            {{ datosPersonales.primer_nombre }}
                            {{ datosPersonales.segundo_nombre }}
                            {{ datosPersonales.primer_apellido }}
                            {{ datosPersonales.segundo_apellido }}
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6">
                          <label class="mt-4 font-weight-bold"
                            >Identificación:</label
                          >
                          <class class="input-group">
                            {{ datosPersonales.identificacion }}
                          </class>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-1 font-weight-bold"
                          >Convocatoria:</label
                        >
                        <div class="input-group">
                          {{ convocatoria.capacitacion }}
                        </div>
                      </div>
                      <div class="col-sm-10 col-md-3 col-lg-6">
                        <label class="mt-0 font-weight-bold">Cargo:</label>
                        <div class="input-group">
                          {{ usuarioLogueado.perfil }}
                        </div>
                      </div>
                      <div>
                        <label class="mt-4 font-weight-bold">
                          Aplicar los conocimientos y/o habilidades adquiridos
                          en la capacitación
                          <span
                            class="text-danger font-weigth-bold"
                            tooltip="Campo Requerido"
                            tooltip-flow="top"
                            >*</span
                          >:
                        </label>
                        <div class="input-group">
                          <select
                            v-model="
                              datosActaCompromiso.aplicacion_conocimiento
                            "
                            type="text"
                            name="acta"
                            class="form-control"
                            v-validate="{
                              required: true
                            }"
                          >
                            <option value="1">
                              Diseño curricular de un programa para instructores
                              de la red en la temática del programa recibido, en
                              coordinacion con la ENI.
                            </option>
                            <option value="2">
                              Desarrollo curricular (Elaboracion de guias,
                              talleres, materiales de apoyo) del programa
                              recibido, en coordinacion con la ENI.
                            </option>
                            <option value="3">
                              Orientar formación a instructores en la temática
                              del programa recibido con los programas diseñados
                              por al ENI.
                            </option>
                            <option value="4">
                              Elaborar un artículo (técnico / pedagógico) para
                              la revista RUTAS PEDAGÓGICAS, según estándares
                              ENI.
                            </option>
                            <option value="5">
                              Desarrollar EDT (Eventos de divulgación
                              tecnológica), para aprendices y empresarios
                              coordinado con el Centro.
                            </option>
                          </select>
                        </div>
                        <small
                          v-show="errors.has('acta')"
                          class="text-danger font-weigth-bold"
                        >
                          {{ errors.first("acta") }}
                        </small>
                      </div>
                    </div>

                    <div>
                      <label class="mt-1 font-weight-bold">
                        Nombre del subdirector
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="Nombre_suscrito"
                          class="form-control"
                          placeholder="Nombre de quien autoriza la capacitación"
                          required
                          v-validate="'required'"
                          v-model="datosPersonales.nombre_subdirector"
                        />
                      </div>
                      <label class="mt-1 font-weight-bold">
                        Identificación del subdirector
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="number"
                          name="Nombre_suscrito"
                          class="form-control"
                          placeholder="Cédula de quien autoriza la capacitación"
                          required
                          v-validate="'required'"
                          v-model="datosPersonales.identificacion_subdirector"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="mt-3 font-weight-bold">
                        IP SENA
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="number"
                          name="Nombre_suscrito"
                          class="form-control"
                          placeholder="Numero IP del Sena"
                          required
                          v-validate="'required'"
                          v-model="datosPersonales.ip_sena"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="card-footer">
                    <div class="row justify-content-center">
                      <div
                        class="col-lg-2 col-sm-12 mt-1"
                        v-if="estado_descargando"
                      >
                        <AnimacionGuardando />
                      </div>
                      <div
                        class="col-lg-4 col-sm-12 mt-1"
                        v-if="!estado_descargando"
                      >
                        <base-button
                          type="azul-sena"
                          @click="validarFormulario()"
                          class="btn btn-block bg-azul-sena text-white"
                          >Descargar Acta</base-button
                        >
                      </div>
                      <div class="col-lg-4 col-sm-12 mt-1">
                        <a
                          class="btn btn-block bg-azul-sena text-white"
                          @click="$router.back()"
                        >
                          Volver
                        </a>
                      </div>
                    </div>
                  </div>
                </card>
                <!-- otro -->
              </modal>
            </div>
          </div>
          <label class="mt-2 font-weight-bold"
            >Requisitos<span class="text-danger">*</span>:</label
          >
          <div>
            <div
              class="table-responsive mt-2"
              v-if="lista_perfiles_requisitos.length > 0"
            >
              <div class="table-responsive col-sm-12">
                <table class="table table-hoverble">
                  <thead id="listado">
                    <tr>
                      <th scope="col" class="col-sm-8">Requisitos</th>
                      <th scope="col" class="col-sm-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(requisito, index) in lista_perfiles_requisitos"
                      :key="index"
                    >
                      <td>{{ requisito }}</td>
                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div class="btn-group btn-spc">
                            <div class="custom-input-file">
                              <input
                                type="file"
                                id="requisitoUno"
                                class="input-file"
                                accept="application/pdf"
                                value=""
                                required="true"
                                @change.prevent="
                                  obtenerDocumento($event, index)
                                "
                              />
                              <i class="fas fa-file-pdf"></i>
                            </div>
                          </div>
                          <!-- boton para ver el archivo pdf cargado colocar url para llevar hacia el documento -->
                          <div class="btn-group btn-spc">
                            <!-- ver el archivo -->
                            <button
                              @click="
                                (modal_ver_requisito_Vista = true),
                                  (vistaPreviaDocRequisito = null);
                                vistaPreviaRequisito(
                                  docsRequisitosArray[index]
                                );
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-eye"></i>
                            </button>

                            <modal
                              :show.sync="modal_ver_requisito_Vista"
                              body-classes="p-0"
                              modal-classes="modal-dialog-centered modal-sm
                              modal-lg"
                            >
                              <template slot="header">
                                <h1
                                  class="text-azul-sena modal-title"
                                  id="modalVerRequisito"
                                >
                                  Documento cargado - Vista previa
                                </h1>
                              </template>
                              <card
                                type="white"
                                shadow
                                header-classes="bg-white pb-5"
                                body-classes="px-lg-5 py-lg-5"
                                class="border-0"
                              >
                                <div v-if="vistaPreviaDocRequisito == null">
                                  <h5 class="text-azul-sena">
                                    No se a cargado ningún archivo
                                  </h5>
                                </div>
                                <embed
                                  v-if="vistaPreviaDocRequisito"
                                  :src="vistaPreviaDocRequisito"
                                  type="application/pdf"
                                  width="100%"
                                  height="600px"
                                  style="border= 1;"
                                />
                              </card>
                            </modal>
                            <!-- modal para mirar el acta -->
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center card-footer" v-if="estadoPeticionPostularme">
        <AnimacionCargando></AnimacionCargando>
      </div>
      <div class="card-footer" v-if="!estadoPeticionPostularme">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click="postularme()"
              class="btn btn-block bg-azul-sena text-white"
              >Postularme</base-button
            >
            <!-- modal para subir anexos requisitos para capacitacion pic eni-->
          </div>

          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarConvocatoriaActivasENI'
              }"
            >
              Volver
            </router-link>
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
  import AnimacionCargando from "../../../components/animacionCargando.vue";
  import AnimacionGuardando from "../../../components/animacionGuardando.vue";

  @Component({
    components: {
      AnimacionCargando,
      AnimacionGuardando
    },
  })
  export default class VerDetalleCapacitacionENI extends Vue {
    usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario"));
    estadoPeticion = false;
    estadoPeticionPostularme = false;
    vistapreviaDoc = null;
    idInscripcion = "";
    contadorsubidos = 0;
    postulacionExitosa = false;
    requisitossubidos = false;
    modal_ver_requisito = false;
    modal_ver_requisito_Vista = false;
    modal_datos_acta = false;
    index_doc_ver = 0;
    ArrayUrlsRequisitos: any[] = [];

    estado_descargando = false;

    convocatoria = {
      capacitacion: "",
      componentes: null,
      convocatoria: "",
      fecha_final: "",
      fecha_inicio: "",
      financiacion: "",
      id_pic_convocatoria: "",
      id_pic_fase: "",
      id_usuario_actualiza: "",
      lugar: "",
      municipio_id: "",
      para_funcionarios: "",
      perfiles_requisitos: "",
      pertenece_a_red: "",
      pic_fase_convocatoria: "",
      pic_fase_id: "",
      pic_id: "",
      plan_institucional_id: "",
    };
    lista_capacitaciones: any[] = [];

    requisito = "";
    lista_perfiles_requisitos: any[] = [];
    docRequisito = null;
    //array de docrequisitos
    docsRequisitosArray: any[] = [];
    docValido = false;
    docValidoActa = false;
    numeroRequisitos = this.lista_perfiles_requisitos.length;
    //acta de compromiso
    documentoActa = null;
    actaCompromisoSubida = false;
    vistaPreviaActa = null;
    vistaPreviaDocRequisito = null;
    //-------------------------------------------
    datosActaCompromiso = {
      nombre_instructor: "",
      identificacion: "",
      numero_telefono: "",
      correo: "",
      red_conocimiento: "",
      cargo: "",
      area: "",
      nombre_evento: "",
      fecha_inicio_evento: "",
      fecha_fin_evento: "",
      sede: "",
      aplicacion_conocimiento: "",
      regional: "",
      centro: "",
      ip_sena: "",
      nombre_subdirector: "",
      identificacion_subdirector: "",
    };
    //-------------------------------------------
    datosPersonales = {
      correo: "",
      correo_aternativo: "",
      depto_expedicion: "",
      depto_nacimiento: "",
      depto_residencia: "",
      direccion: "",
      discapacidad: "",
      id_discapacidad: "",
      fecha_identificacion: "",
      fecha_nacimiento: "",
      genero: "",
      id_depto_expedicion: "",
      id_depto_nacimiento: "",
      id_depto_residencia: "",
      id_genero: "",
      id_municipio_expedicion: "",
      id_municipio_nacimiento: "",
      id_municipio_residencia: "",
      id_persona: "",
      id_tipo_identificacion: "",
      identificacion: "",
      localidad: "",
      municipio_expedicion: "",
      municipio_nacimiento: "",
      municipio_residencia: "",
      nacionalidad: "",
      pais_nacimiento: "",
      pais_residencia: "",
      porcentaje_discapacidad: "",
      primer_apellido: "",
      primer_nombre: "",
      segundo_apellido: "",
      segundo_nombre: "",
      telefono_fijo: "",
      telefono_movil: "",
      ip_sena: "",
      nombre_subdirector: "",
      identificacion_subdirector: "",
    };
    areaRuta = {
      id_usuario: null,
      persona_id: null,
      id_area_ruta: null,
      area_ruta: "",
      red_conocimiento: "",
      id_red_conocimiento: null,
    };

    mounted() {
      this.obtenerPic(this.$route.params.id);
      this.mostrarDatosPersonales(this.usuarioLogueado.id_persona);
      this.obtenerAreaRuta();
    }

    updated() {
      //  this.obtenerDocumento();
    }

    generarActaCompromiso() {
      const headers = {
        responseType: "blob",
        // "Content-Disposition": "attachment;filename=report.pdf",
        "Content-Type": "application/octet-stream",
      };
      this.datosActaCompromiso.nombre_instructor =
        this.datosPersonales.primer_nombre +
        " " +
        this.datosPersonales.segundo_nombre +
        " " +
        this.datosPersonales.primer_apellido +
        " " +
        this.datosPersonales.segundo_apellido;
      //------------------------
      this.datosActaCompromiso.identificacion = this.datosPersonales.identificacion;

      this.datosActaCompromiso.nombre_subdirector = this.datosPersonales.nombre_subdirector;

      this.datosActaCompromiso.identificacion_subdirector = this.datosPersonales.identificacion_subdirector;


      this.datosActaCompromiso.ip_sena = this.datosPersonales.ip_sena;

      //------------------------
      this.datosActaCompromiso.correo = this.datosPersonales.correo;
      //------------------------
      this.datosActaCompromiso.numero_telefono =
        this.datosPersonales.telefono_movil
      //------------------------
      this.datosActaCompromiso.red_conocimiento = this.areaRuta.red_conocimiento;
      this.datosActaCompromiso.cargo = this.usuarioLogueado.perfil;
      this.datosActaCompromiso.area = this.areaRuta.area_ruta;
      //------------------------
      this.datosActaCompromiso.nombre_evento = this.convocatoria.capacitacion;
      //------------------------
      this.datosActaCompromiso.fecha_inicio_evento = this.convocatoria.fecha_inicio;
      this.datosActaCompromiso.fecha_fin_evento = this.convocatoria.fecha_final;
      this.datosActaCompromiso.sede = this.convocatoria.lugar;
      this.datosActaCompromiso.regional = this.usuarioLogueado.regional;
      this.datosActaCompromiso.centro = this.usuarioLogueado.centro_formacion;
      this.estado_descargando = true;
      Axios()
        .post("descargar_acta", this.datosActaCompromiso, {
          responseType: "blob",
        })
        .then((response) => {
          const type = response.headers["content-type"];
          const blob = new Blob([response.data], {
            type: type,
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download =
            this.datosActaCompromiso.nombre_instructor +
            " GTH_F_136_V03_FORMATO_ACTA_DE_COMPROMISO_CAPACITACIÓN_INSTRUCTORES.pdf";
          link.click();
          this.modal_datos_acta = false;
          this.estado_descargando = false;

        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
      // axios({
      //     url: 'https://develdfp.cloudsenactpi.net/api/descargar_acta',
      //     method: 'POST',
      //     responseType: 'blob', // important
      // }).then((response) => {
      //     const url = window.URL.createObjectURL(new Blob([response.data]));
      //     const link = document.createElement('a');
      //     link.href = url;
      //     link.setAttribute('download', 'file.pdf');
      //     document.body.appendChild(link);
      //     link.click();
      // });
    }
    vistaPreviaRequisito(docRequisitoMostrar) {
      this.vistaPreviaDocRequisito = URL.createObjectURL(docRequisitoMostrar);
      // this.index_doc_ver = -1;
    }
    vistaPreviaActaC(docMostrar) {
      this.vistaPreviaActa = URL.createObjectURL(docMostrar);
    }
    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          //   this.RegistrarActividad();
          this.generarActaCompromiso();
        }
      });
    }
    constructor() {
      super();
      const dict = {
        messages: {
          required: () => "Campo obligatorio",
          date_format: () => "Campo obligatorio",
          decimal: () => "Campo obligatorio",
          min_value: () => "No pude ser negativo",
          alpha_spaces: () => "No permite numeros ni caracteres especiales",
          alpha_num: () => "No permite caracteres especiales",
        },
      };
      this.$validator.localize("es", dict);
    }

    async postularme() {
      if (
        this.lista_perfiles_requisitos.length ==
        this.docsRequisitosArray.length &&
        this.documentoActa != null
      ) {
        const usuario = JSON.parse(sessionStorage.getItem("usuario"));
        this.estadoPeticion = true;
        await Axios()
          .post("almacenar_inscripcion_pic", {
            id_pic_convocatoria: this.convocatoria.id_pic_convocatoria,
            id_persona: usuario.id_persona,
            id_pic_estado_inscripcion: 0,
            observaciones: "sin observaciones",
          })
          .then((respuesta) => {
            if (respuesta.data.status.toLowerCase() == "info") {
              Swal.fire({
                title: "Error al postularse",
                text: respuesta.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
            }
            if (respuesta.data.status.toLowerCase() == "success") {
              this.estadoPeticionPostularme = true;
              Swal.fire({
                title: "Postulación Exitosa",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
              this.postulacionExitosa = true;

              this.idInscripcion = respuesta.data.results;
              //ciclo para subir cada requisito de la convocatoria
              for (let i = 0; i < this.docsRequisitosArray.length; i++) {
                const archivo = this.docsRequisitosArray[i];
                this.subirDocumento(archivo, i, this.idInscripcion);
              }
              this.subirActaCompromiso(this.documentoActa, this.idInscripcion);

              this.$router.push({
                name: "GestionarConvocatoriaActivasENI",
              });
            }
          })
          .catch(() => {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          });
      } else {
        // alerta

        Swal.fire({
          title: "Un momento!",
          icon: "info",
          text: "Si deseas postularte carga todos los requisitos!",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
        });
      }
    }

    obtenerAreaRuta() {
      Axios()
        .get("ver_area_red_usuario/" + this.usuarioLogueado.id_usuario)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.areaRuta = respuesta.data.results;
          } else {
            Swal.fire("ERROR!", "No se ha encontrado", "error");
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

    mostrarDatosPersonales(id) {
      Axios()
        .get("ver_detalle_persona/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.datosPersonales = respuesta.data.results;
          } else {
            Swal.fire("ERROR!", "No se ha encontrado", "error");
          }
        })
        .finally(() => {
          this.estadoPeticion = true;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    }

    obtenerPic(id) {
      Axios()
        .get("editar_convocatoria_pic/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.convocatoria = respuesta.data.results;
            this.convocatoria.pic_id = respuesta.data.results.pic_id;
            this.lista_perfiles_requisitos = this.convocatoria.perfiles_requisitos.split(
              ","
            );
            this.lista_perfiles_requisitos.splice(
              this.lista_perfiles_requisitos.length - 1,
              1
            );
            this.convocatoria.pic_id = respuesta.data.results.pic_id;
          } else {
            Swal.fire({
              title: respuesta.data.message,
            }).then(() => {
              this.$router.back();
            });
          }
        })
        .finally(() => {
          this.estadoPeticion = true;
        });
    }

    obtenerDocumento(event, index) {
      if (event.target.files[0].size <= 5000000) {
        //5mb tope
        let extDoc = event.target.files[0].name
          .toString()
          .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
        if (extDoc == ".pdf") {
          this.docRequisito = event.target.files[0];

          //agregamos a un array de documentos
          this.docsRequisitosArray.splice(index, 1, this.docRequisito);

          Swal.fire({
            title: "Requisito Cargado exitosamente!",
            text: "Nombre documento cargado: " + this.docRequisito.name,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });

          this.docValido = true;
        } else {
          this.docValido = false;
          this.docRequisito = null;
          Swal.fire(
            "Algo salió mal!",
            "El archivo cargado no es un PDF!",
            "error"
          );
        }
      } else {
        this.docValido = false;
        this.docRequisito = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado pesa más de 5 MegaBytes!",
          "error"
        );
      }
      //Asignamos la docinscrip a  nuestra data
    }

    obtenerActaCompromiso(event) {
      if (event.target.files[0].size <= 5000000) {
        //5mb tope
        let extDoc = event.target.files[0].name //nombre del archivo
          .toString()
          .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
        if (extDoc == ".pdf") {
          this.documentoActa = event.target.files[0];
          Swal.fire({
            title: "Acta de compromiso cargada exitosamente!",
            text: "Nombre documento cargado: " + this.documentoActa.name,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });

          this.docValidoActa = true;
        } else {
          this.docValidoActa = false;
          this.documentoActa = null;
          Swal.fire(
            "Algo salió mal!",
            "El archivo cargado no es un PDF!",
            "error"
          );
        }
      } else {
        this.docValidoActa = false;
        this.documentoActa = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado pesa más de 5 MegaBytes!",
          "error"
        );
      }
      //Asignamos la docinscrip a  nuestra data
    }

    async subirDocumento(archivo, i, idIns) {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      //Creamos el formData
      var data = new FormData();
      //Añadimos la docinscrip seleccionada
      data.append("documento", archivo);
      data.append("nombre_anexo", this.lista_perfiles_requisitos[i]);
      data.append("id_pic_inscripcion", idIns);
      data.append(
        "id_usuario_autenticado",
        JSON.parse(sessionStorage.getItem("usuario")).id_persona
      );
      //Enviamos la petición
      // Axios().post('almacenar_resolucion_convocatoria/' + this.$route.params.id,{ id_convocatoria: this.$route.params.id, documento_resolucion : data})
      await Axios()
        .post("almacenar_requisito_inscripcion_pic", data, {
          headers: headers,
        })
        .then((respuesta) => {
          if ((respuesta.data.status = "success")) {
            // Swal.fire(
            //     "Se subió la resolución!",
            //     "Archivo cargado exitosamente!",
            //     respuesta.data.status
            // );
            this.contadorsubidos = this.contadorsubidos + 1;
          } else {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          }
          // this.estadoPeticion= false;
          if (this.contadorsubidos == this.lista_perfiles_requisitos.length) {
            //se subieron todos los archivos de los requisitos, ahora falta poner un sweet alert informando que se hizo todo bien
            this.requisitossubidos = true;
          }
        });
    }

    async subirActaCompromiso(archivo, idIns) {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      //Creamos el formData
      var data = new FormData();
      //Añadimos la docinscrip seleccionada
      data.append("documento", archivo);
      data.append("nombre_anexo", "Acta De Compromiso");
      data.append("id_pic_inscripcion", idIns);
      data.append(
        "id_usuario_autenticado",
        JSON.parse(sessionStorage.getItem("usuario")).id_persona
      );
      //Enviamos la petición
      // Axios().post('almacenar_resolucion_convocatoria/' + this.$route.params.id,{ id_convocatoria: this.$route.params.id, documento_resolucion : data})
      await Axios()
        .post("almacenar_requisito_inscripcion_pic", data, {
          headers: headers,
        })
        .then((respuesta) => {
          if ((respuesta.data.status = "success")) {
            // Swal.fire(
            //     "Se subió la resolución!",
            //     "Archivo cargado exitosamente!",
            //     respuesta.data.status
            // );
            this.actaCompromisoSubida = true;
          } else {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          }
          //se subió todo y comparo las banderas
          if (
            this.requisitossubidos &&
            this.postulacionExitosa &&
            this.actaCompromisoSubida
          ) {
            //estan llegando falsos algunos, verificar
            Swal.fire({
              title: "Postulación Exitosa",
              text:
                "Estas inscrito a la convocatoria " +
                this.convocatoria.convocatoria,
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            this.estadoPeticion = false;
            this.$router.push({
              name: "GestionarConvocatoriaActivasENI",
            });
          }
        });
    }
  }
</script>
<style scoped>
  /* estilos para input tipo file */

  .custom-input-file {
    background-color: #238276;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    margin: 0 auto 0;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    text-align: center;
    width: 35px;
  }

  .tam-completo {
    width: 100%;
    font-size: 13px;
  }

  .custom-input-file .input-file {
    font-size: 1000px;
    margin: 0;
    opacity: 0;
    outline: 0 none;
    padding: 0;
    position: absolute;
  }
  /* fin estilos de input file */

  .circulo {
    font-size: 25px;
    padding: 10px 22px;
    border: 1px solid #238276;
    border-radius: 255px;
    color: #238276;
  }

  .circulo-selecionado {
    background-color: #238276;
    color: white;
  }

  .btn-group > .btn:not(:last-child):not(.dropdown-toggle),
  .btn-group > .btn-group:not(:last-child) > .btn {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>
<style scoped>
  .header-table {
    width: 100%;
  }

  .header-table img {
    width: 100px;
  }

  .subtitulo {
    font-size: 22px;
  }

  .texto {
    font-size: 15px;
  }

  .linea-botom {
    border-bottom: 1px rgb(107, 101, 101) solid;
  }
</style>
