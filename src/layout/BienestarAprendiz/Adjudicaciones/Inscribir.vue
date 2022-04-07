<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">INSCRIPCIÓN A CONVOCATORIA</h1>
        <div class="row">
          <div>
            <small class="text-azul-sena mr-1"
              >Convocatoria: {{ this.convocatoria.convocatoria }}</small
            >
          </div>
          <div>
            <small class="text-azul-sena"
              >Tipo convocatoria: {{ this.convocatoria.tipo_apoyo }}</small
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mx-1 my-3">
          <div class="col-lg-4 col-sm-12 p-2">
            <base-button
              block
              type="default"
              class="btn btn-block btn-azul-sena ml-1"
              @click="modalInscribir = true"
            >
              Inscribir aprendiz
            </base-button>
          </div>
          <div class="col-lg-4 col-sm-12 p-2">
            <div id="campo">
              <button
                class="btn btn-block btn-azul-sena ml-1 text-white"
                @click="modalArchivo = true"
              >
                Cargar desde archivo
              </button>

              <input
                v-show="false"
                type="file"
                ref="btninscporarchivo"
                name="btnInscribirXArchivo"
                class="form-control"
                id=""
                required="true"
                @change="obtenerDocumento"
              />
            </div>
          </div>
          <div class="col-lg-4 col-sm-12 p-2">
            <button
              class="btn btn-block btn-azul-sena ml-1"
              @click="cambiarEstadoConvocatoria()"
            >
              Finalizar Inscripciones
            </button>
          </div>
        </div>
        <div v-if="aprendicesInscritos.length == 0" class="text-center">
          <h1 class="text-azul-sena">No hay Aprendices inscritos aún</h1>
        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="aprendicesInscritos"
          :limit="10"
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
        <br />

        <div class="table-responsive" v-if="aprendicesInscritos.length > 0">
          <paginate
            ref="paginator"
            name="aprendicesInscritos"
            :list="aprendicesInscritos"
            :per="10"
          >
            <table class="table table table-hover table-inverse">
              <thead class="text-white">
                <tr>
                  <th>Identificación</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Programa</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(inscrito, key) in paginated('aprendicesInscritos')"
                  :key="key"
                >
                  <td>{{ inscrito.identificacion }}</td>
                  <td>
                    {{ inscrito.primer_nombre }} {{ inscrito.segundo_nombre }}
                  </td>
                  <td>
                    {{ inscrito.primer_apellido }}
                    {{ inscrito.segundo_apellido }}
                  </td>
                  <td>{{ inscrito.programa_formacion }}</td>
                  <td>
                    <div>
                      <span tooltip="Eliminar Inscrito" tooltip-flow="top">
                        <b-button
                          class="btn btn-sm bg-azul-sena text-white"
                          @click="mostrarModalEliminar(inscrito)"
                          ><i class="fas fa-trash-alt"></i
                        ></b-button>
                      </span>
                      <!-- modal para eliminar inscrito -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </paginate>
        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="aprendicesInscritos"
          :limit="3"
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

      <!-- footer -->
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
    <div class="row">
      <div class="col-md-4">
        <modal
          :show.sync="modalInscribir"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1 class="text-azul-sena modal-title" id="modalInscribirAprendiz">
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
                    @keyup.delete="limpiarFichasAprendiz()"
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

                  <button
                    class="btn btn-block btn-azul-sena ml-1 mt-1"
                    @click="
                      (btnVerFichas = true), obtenerFichasAprendiz(nuevaCC)
                    "
                  >
                    Consultar fichas activas Aprendiz
                  </button>
                </div>
              </div>

              <div id="campo" class="mb-3" v-if="btnVerFichas">
                <label class="mt-2 font-weight-bold"> Fichas Activas:</label>
                <div>
                  <select
                    class="form-control"
                    name="fichaaprendiz"
                    id="fichaaprendiz"
                    v-model="fichaSeleccionada"
                    v-validate="'required'"
                  >
                    <option :value="null" selected disabled>
                      Selecciona una ficha
                    </option>
                    <option
                      v-for="(ficha, key) in fichasAprendiz"
                      :key="key"
                      v-bind:value="ficha.ficha_caracterizacion_id"
                    >
                      {{ ficha.ficha_caracterizacion_id }} :
                      {{ ficha.programa_formacion }}
                    </option>
                  </select>
                  <small
                    v-show="errors.has('fichaaprendiz')"
                    class="text-danger"
                  >
                    {{ errors.first("fichaaprendiz") }}
                  </small>
                </div>
              </div>

              <div class="table-responsive" v-show="btnVerFichas">
                <table class="table table table-hover table-inverse">
                  <thead class="text-white">
                    <tr>
                      <th>Id</th>
                      <th>Criterio</th>
                      <th>Puntaje</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(criterio, key) in listaCriteriosApoyo" :key="key">
                      <td>{{ criterio.id_criterio_priorizacion }}</td>
                      <td>{{ criterio.criterio_priorizacion }}</td>
                      <td>{{ criterio.puntaje }}</td>
                      <td>
                        <label class="custom-toggle">
                          <input
                            type="checkbox"
                            :id="criterio.id_criterio_priorizacion"
                            :name="criterio.id_criterio_priorizacion"
                            v-model="criteriosSeleccionados"
                            :value="criterio.id_criterio_priorizacion"
                            :checked="false"
                          />
                          <span
                            class="custom-toggle-slider rounded-circle"
                            data-label-off="NO"
                            data-label-on="SI"
                          ></span>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-lg-6 col-sm-12 p-2 center" v-show="btnVerFichas">
                <button
                  class="btn btn-block btn-azul-sena ml-1"
                  @click="validarFormulario()"
                >
                  Inscribir aprendiz
                </button>
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <modal
          :show.sync="modalArchivo"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1 class="text-azul-sena modal-title" id="modalInscribirAprendiz">
              Opciones de Archivos
            </h1>
          </template>
          <card
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="row justify-content-center">
                <div class="col-lg-4 col-sm-12 p-2">
                  <div class="form-group">
                    <label class="font-weight-bold pb-lg-4" for="cedula">
                      Paso 1: Descargar formato
                    </label>
                    <base-button
                      block
                      type="default"
                      class="btn btn-block btn-azul-sena"
                      @click="descargarFormato()"
                    >
                      Descargar formato
                    </base-button>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-12 p-2">
                  <div class="form-group">
                    <label class="font-weight-bold" for="cedula">
                      Paso 2: Diligenciar y cargar formato
                    </label>
                    <button
                      class="btn btn-block btn-azul-sena text-white"
                      @click.prevent="$refs.btninscporarchivo.click()"
                    >
                      Cargar desde archivo
                    </button>

                    <input
                      v-show="false"
                      type="file"
                      ref="btninscporarchivo"
                      name="btnInscribirXArchivo"
                      class="form-control"
                      id=""
                      required="true"
                      @change="obtenerDocumento"
                    />

                    <div id="campo" v-if="docInscritos != null">
                      Documento seleccionado : {{ docInscritos.name }}
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-12 p-2" v-if="docValido">
                  <div class="form-group">
                    <label class="font-weight-bold pb-lg-4" for="cedula">
                      Paso 3: Enviar formato
                    </label>
                    <button
                      class="btn btn-block btn-azul-sena"
                      @click="subirDocumento()"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <modal
          :show.sync="modalEliminarAprendiz"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1 class="text-azul-sena modal-title" id="modalInscribirAprendiz">
              Eliminar Aprendiz
            </h1>
          </template>
          <card
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="row justify-content-center">
                <div class="col-lg-8 col-sm-12 p-2 text-center">
                  <p>Se va a borrar de la lista el aprendiz:</p>
                  <div>
                    Nombre: <b>{{ nombreAprendizEliminar }}</b> <br />
                    Con identificación: <b>{{ cedulaAprendizEliminar }}</b>
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <button class="btn btn-azul-sena" @click="eliminarInscrito()">
                  Eliminar
                </button>
                <button
                  class="btn btn-dark"
                  @click="modalEliminarAprendiz = false"
                >
                  Cancelar
                </button>
              </div>
            </template>
          </card>
        </modal>
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
  aprendicesInscritos: [] = [];
  nuevaCC = "";
  paginate = ["aprendicesInscritos"];
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
  };
  modalInscribir = false;
  modalArchivo = false;
  listaCriterios: [] = [];
  listaCriteriosApoyo : [] = [];
  idConvocatoria = null;
  docValido = false;
  docInscritos = null;
  modalEliminarAprendiz = false;

  nombreAprendizEliminar = "";
  cedulaAprendizEliminar = "";
  idpersonaAprendizEliminar = "";

  criteriosSeleccionados: [] = [];
  fichasAprendiz: [] = [];
  fichaSeleccionada = null;
  btnVerFichas = false;

  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Este campo es requerido",
        min: () => "Mínimo 6 caracteres",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {
    this.obtenerConvocatoria(this.$route.params.id);
    this.idConvocatoria = this.$route.params.id;
    this.obtenerInscritosConvocatoria(this.$route.params.id);
    this.obtenerCriterios(this.$route.params.id);
  }

  ver() {
    setTimeout(() => {}, 1000);
  }

  async descargarFormato() {
    await Axios()
      .get("convocatoria_csv/" + this.idConvocatoria, {
        responseType: "blob",
      })
      .then((respuesta) => {
        var fileURL = window.URL.createObjectURL(
          new Blob([respuesta.data], { type: "text/csv" })
        );
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          this.idConvocatoria + "-InscripcionAprendices.csv"
        );
        document.body.appendChild(fileLink);

        fileLink.click();
      })
      .catch((error) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
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

  limpiarFichasAprendiz() {
    // if(this.nuevaCC.length < 7){
    this.btnVerFichas = false;
    this.fichasAprendiz = [];
    this.fichaSeleccionada = null;
    // this.obtenerFichasAprendiz(this.nuevaCC)
    // }
  }

   obtenerConvocatoria(id) {
     Axios()
      .get("listar_convocatoria/" + id)
      .then((respuesta) => {
        this.convocatoria = respuesta.data.results;
        this.obtenerCriteriosApoyo(this.convocatoria.tipo_apoyo_id);
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }
  async obtenerCriteriosApoyo(id_apoyo){
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
      })
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

  async obtenerInscritosConvocatoria(id) {
    await Axios()
      .get("listar_inscripciones_convocatoria/" + id)
      .then((respuesta) => {
        return respuesta.data.results;
      })
      .then((res) => {
        setTimeout(() => {
          if (res != null) {
            this.aprendicesInscritos = res;
          }
        }, 100);
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
          this.criteriosSeleccionados = []
          this.obtenerCriteriosApoyo(this.convocatoria.tipo_apoyo_id)
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

  mostrarModalEliminar(persona) {
    this.nombreAprendizEliminar =
      persona.primer_nombre + " " + persona.primer_apellido;
    this.cedulaAprendizEliminar = persona.identificacion;
    this.idpersonaAprendizEliminar = persona.id_persona;
    this.modalEliminarAprendiz = true;
  }
  eliminarInscrito() {
    Axios()
      .delete(
        "eliminar_inscripcion_convocatoria/" +
          this.$route.params.id +
          "/" +
          this.idpersonaAprendizEliminar
      )
      .then((respuesta) => {
        this.aprendicesInscritos = [];
        this.modalEliminarAprendiz = false;
      })
      .then(() => {
        this.obtenerInscritosConvocatoria(this.$route.params.id);
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  cambiarEstadoConvocatoria() {
    if (this.aprendicesInscritos.length == 0) {
      Swal.fire({
        title: "Informacion",
        text:
          "Para finalizar las inscripciones debe estar inscrito almenos un aprendiz",
        icon: "warning",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "btn btn-azul-sena",
        },
      });
    } else {
      Axios()
        .put("actualizar_fase_convocatoria/" + this.idConvocatoria, {
          id_convocatoria: this.idConvocatoria,
          fase_bienestar_id: 3,
          id_actualiza: JSON.parse(sessionStorage.getItem("usuario"))
            .id_usuario,
        })
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            Swal.fire(
              "CAMBIO DE FASE CORRECTO",
              "Se ha cambiado la fase de la convocatoria exitosamente!",
              "success"
            );
            this.$router.push("GestionarConvocatoria");
          }
          return respuesta.data;
        });
    }
  }

  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".csv") {
        this.docInscritos = event.target.files[0];
        Swal.fire(
          "Listado de aprendices cargado!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
      } else {
        this.docValido = false;
        this.docInscritos = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un CVS!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.docInscritos = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }

  subirDocumento() {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("inscripciones", this.docInscritos);
    //Enviamos la petición
    Axios()
      .post("cargar_inscripciones/" + this.$route.params.id, data, {
        headers: headers,
      })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          this.modalArchivo = false;
          this.obtenerInscritosConvocatoria(this.$route.params.id);
          Swal.fire({
            title: "Se subió la resolución!",
            text: "Archivo cargado exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        } else {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        }
      });
  }

  validarFormulario() {
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
}
</script>

<style></style>
