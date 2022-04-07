<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">ACTUALIZAR ÁREA Y RED</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Mi Educacion -->
                <div class="card-body">
                  <!-- Forms -->

                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <div>
                      <div v-if="this.usuario.area_ruta_id == null">
                        <small class="text-azul-sena">
                          {{ usuario.primer_nombre }}
                          {{ usuario.segundo_nombre }}
                          {{ usuario.primer_apellido }}
                          {{ usuario.segundo_apellido }} identificado con
                          documento {{ usuario.identificacion }} aún no tiene
                          asignado red ni área.
                        </small>
                      </div>
                      <div class="row" v-else>
                        <div class="col-sm-12 col-md-6 col-lg-6">
                          <!-- capacitación -->
                          <div>
                            <strong>Red de conocimiento actual:</strong>
                          </div>
                          <div id="contenido">
                            <p id="texto">
                              {{ areaRuta.red_conocimiento }}
                            </p>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6">
                          <!-- nombre de la convocatoria -->
                          <div>
                            <strong>Area Ruta actual:</strong>
                          </div>
                          <div id="contenido">
                            <p id="texto">
                              {{ areaRuta.area_ruta }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <label class="mt-2 font-weight-bold">
                        Red de conocimiento nueva
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>

                      <div class="input-group">
                        <select
                          v-model="capacitacion.pertenece_a_red"
                          id="red"
                          class="form-control mb-3"
                          name="red"
                          v-validate="{ required: true }"
                        >
                          <option value="" selected disabled>
                            seleccione la red
                          </option>
                          <option
                            v-for="(red, index) in redesConocimiento"
                            :value="red.id_red_conocimiento"
                            :key="index"
                          >
                            {{ red.red_conocimiento }}
                          </option>
                        </select>
                      </div>
                      <small v-show="errors.has('red')" class="text-danger">
                        {{ errors.first("red") }}
                      </small>
                    </div>
                    <div v-if="capacitacion.pertenece_a_red != ''">
                      <label class="mt-2 font-weight-bold">
                        Área nueva
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <div class="input-group">
                        <select
                          v-model.number="area.area_ruta_id"
                          name="area"
                          id="area"
                          class="form-control mb-3"
                        >
                          <option value="" selected disabled>
                            Seleccione el Area
                          </option>
                          <template v-for="(areaobtenida, index) in areas">
                            <option
                              v-if="
                                capacitacion.pertenece_a_red ==
                                  areaobtenida.red_conocimiento_id
                              "
                              :value="areaobtenida.id_area_ruta"
                              :key="index"
                            >
                              {{ areaobtenida.area_ruta }}
                            </option>
                          </template>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label class="mt-2 font-weight-bold">Justificación</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="justificación"
                          class="form-control"
                          id="justificación"
                          placeholder="Justificación"
                          v-model="historial.justificacion"
                          v-validate="{ required: true }"
                        />
                      </div>
                      <small
                        v-show="errors.has('justificación')"
                        class="text-danger"
                      >
                        {{ errors.first("justificación") }}
                      </small>
                    </div>
                  </div>

                  <!-- Fin Forms -->
                </div>

                <div class="row justify-content-center">
                  <div class="col-sm-8 col-md-8 col-lg-7">
                    <table class="table table-hoverble">
                      <thead class="text-white">
                        <tr>
                          <th>Certificados</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <label>Anexo justificación</label
                          ><span class="text-danger" title="Campo Requerido"
                            >*</span
                          >:
                          <small
                            v-show="errors.has('anexo_justificación')"
                            class="text-danger"
                          >
                            {{ errors.first("anexo_justificación") }}
                          </small>
                          <td>
                            <div
                              class="btn-group btn-spc"
                              tooltip="Subir Certificado"
                              tooltip-flow="top"
                            >
                              <div class="container-input">
                                <input
                                  v-show="false"
                                  type="file"
                                  ref="botonAnexoJustificacion"
                                  name="certificado_anexo"
                                  accept="application/pdf"
                                  class="form-control inputfile-1"
                                  id="certificado_anexo"
                                  @change="
                                    obtenerDocumentoAnexoJustificacion($event)
                                  "
                                  v-validate="{ required: true }"
                                />
                                <label
                                  for="certificado_anexo"
                                  @click.prevent="
                                    $refs.botonAnexoJustificacion.click()
                                  "
                                  class="btn bg-azul-sena"
                                >
                                  <i class="fas fa-file-upload"></i>
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <label>Resolución Nombramiento</label
                          ><span class="text-danger" title="Campo Requerido"
                            >*</span
                          >:
                          <small
                            v-show="errors.has('Resolución_Nombramiento')"
                            class="text-danger"
                          >
                            {{ errors.first("Resolución_Nombramiento") }}
                          </small>
                          <td>
                            <div
                              class="btn-group btn-spc"
                              tooltip="Subir Certificado"
                              tooltip-flow="top"
                            >
                              <div class="container-input">
                                <input
                                  v-show="false"
                                  type="file"
                                  ref="botonResolucionNombramiento"
                                  name="certificado_resolucion"
                                  accept="application/pdf"
                                  class="form-control inputfile-1"
                                  id="certificado_resolucion"
                                  @change="
                                    obtenerDocumentoResolucionNombramiento(
                                      $event
                                    )
                                  "
                                  v-validate="{ required: true }"
                                />
                                <label
                                  for="certificado_resolucion"
                                  @click.prevent="
                                    $refs.botonResolucionNombramiento.click()
                                  "
                                  class="btn bg-azul-sena"
                                >
                                  <i class="fas fa-file-upload"></i>
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <label>Diploma Estudio</label
                          ><span class="text-danger" title="Campo Requerido"
                            >*</span
                          >:
                          <small
                            v-show="errors.has('Diploma_Estudio')"
                            class="text-danger"
                          >
                            {{ errors.first("Diploma_Estudio") }}
                          </small>
                          <td>
                            <div
                              class="btn-group btn-spc"
                              tooltip="Subir Certificado"
                              tooltip-flow="top"
                            >
                              <div class="container-input">
                                <input
                                  v-show="false"
                                  type="file"
                                  ref="botonDiplomaEstudioRed"
                                  name="certificado_diploma"
                                  accept="application/pdf"
                                  class="form-control inputfile-1"
                                  id="certificado_diploma"
                                  @change="
                                    obtenerDocumentoDiplomaEstudioRed($event)
                                  "
                                  v-validate="{ required: true }"
                                />
                                <label
                                  for="certificado_diploma"
                                  @click.prevent="
                                    $refs.botonDiplomaEstudioRed.click()
                                  "
                                  class="btn bg-azul-sena"
                                >
                                  <i class="fas fa-file-upload"></i>
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="row justify-content-center">
                    <div class="col-lg-4 col-sm-12 mb-sm-1">
                      <base-button
                        type="azul-sena"
                        @click="validarFormulario()"
                        class="btn btn-block bg-azul-sena text-white"
                        >Actualizar</base-button
                      >
                    </div>

                    <div class="col-lg-4 col-sm-12">
                      <a
                        class="btn btn-block bg-azul-sena text-white"
                        @click="$router.back()"
                      >
                        Volver
                      </a>
                    </div>
                  </div>
                </div>

                <!-- listas areas antiguas y nuevas -->

                <div
                  class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                >
                  <div class="justify-content-center">
                    <hr />
                    <div class="center col-lg-4 col-sm-12">
                      <h1 class="font-weight-bold text-center text-azul-sena">
                        Historial
                      </h1>
                    </div>
                  </div>
                  <div v-if="listaUsuario.length == 0">
                    <p class="text-center">No hay historial</p>
                  </div>
                  <div
                    v-if="listaUsuario.length != 0"
                    class="table-responsive col-sm-12"
                  >
                    <table class="table table-hoverble">
                      <thead>
                        <tr>
                          <th>Antigua Área</th>
                          <th>Nueva Área</th>
                          <th>Creado</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody
                        v-for="(usuario, index) in listaUsuario"
                        :key="index"
                      >
                        <td>
                          {{ usuario.antigua_area_ruta }}
                        </td>
                        <td>{{ usuario.nueva_area_ruta }}</td>
                        <td>{{ usuario.creado }}</td>
                        <td class="campos">
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver "
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white space"
                              :to="{
                                name: 'VerDetalleFormacion',
                                params: {
                                  id: usuario.id_historial_usuario,
                                },
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>
                        </td>
                      </tbody>
                    </table>
                  </div>
                </div>
              </tabs>
            </div>
            <br />
          </div>
          <!-- Fin Contenido -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import axios from "axios";
import AnimacionCargando from "../../components/animacionGuardando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class CrearFormacion extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
  id_usuario_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_usuario;

  areas: any[] = [];
  picTipos: any[] = [];
  redesConocimiento: any[] = [];
  listaUsuario: any[] = [];
  listaUsuariostring: any[] = [];
  docValidouno = false;
  docValidodos = false;
  docValidotres = false;

  estadoPeticion = true;

  usuario = null;

  capacitacion = {
    id_pic: null,
    capacitacion: "",
    pertenece_a_red: "",
    plan_institucional_id: "",
    id_area_ruta: "",
    id_pic_tipo: "",
  };
  area = {
    area_ruta_id: null,
  };
  areaRuta = {
    id_usuario: null,
    persona_id: null,
    id_area_ruta: "",
    area_ruta: "",
    red_conocimiento: "",
    id_red_conocimiento: "",
  };
  // listaUsuarios = {
  //   id_historial_usuario: null,
  //   usuario_id: null,
  //   antigua_area_ruta_id: null,
  //   antigua_area_ruta: this.areaRuta.id_area_ruta,
  //   antigua_red: null,
  //   id_antigua_red: null,
  //   nueva_area_ruta_id: null,
  //   nueva_area_ruta: this.area.area_ruta_id,
  //   nueva_red: null,
  //   id_nueva_red: null,
  //   justificacion: null,
  //   anexo: null,
  //   creado: null,
  // };
  historial = {
    usuario_id: "",
    antigua_area_ruta_id: "",
    nueva_area_ruta_id: "",
    justificacion: "",
  };

  anexo_justificacion_red: null;
  resolucion_nombramiento_red: null;
  diploma_estudio_red: null;

  mounted() {
    this.listarUsuario();
    this.obtenerUsuario(this.$route.params.id);
    // this.historial1111();
    Axios()
      .get("/crear_pic")
      .then((respuesta) => {
        this.areas = respuesta.data.results.areas;
        this.picTipos = respuesta.data.results.picTipos;
        this.redesConocimiento = respuesta.data.results.redesConocimiento;
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
  actualizarFormacion(idUsuario) {
    Axios()
      .put("actualizar_area_red/" + idUsuario, this.area)
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire({
            title: "Area y Red de conocimiento",
            text: "Se actualizo correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.$router.push({ name: "GestionarUsuario" });
        } else {
          Swal.fire({
            title: "Formación No Creada",
            text: "No Se Pudo Guardar La Formación!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
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
  }

  listarUsuario() {
    Axios()
      .get("listar_historial_area_conocimiento/" + this.$route.params.id)
      .then((respuesta) => {
        this.listaUsuario = respuesta.data.results;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.actualizarFormacion(this.$route.params.id);
        this.subirDocumento();
      }
    });
  }

  obtenerAreaRuta(idUsuario) {
    Axios()
      .get("ver_area_red_usuario/" + idUsuario)
      .then((respuesta) => {
        this.areaRuta = respuesta.data.results;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  obtenerUsuario(idUsuario) {
    Axios()
      .get("listar_usuario/" + idUsuario)
      .then((respuesta) => {
        this.usuario = respuesta.data.results;
        if (this.usuario.area_ruta_id != null) {
          this.obtenerAreaRuta(this.$route.params.id);
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

  obtenerDocumentoAnexoJustificacion(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.anexo_justificacion_red = event.target.files[0];
        Swal.fire("PDF Cargado!", "Archivo cargado exitosamente!", "success");
        this.docValidouno = true;
      } else {
        this.docValidouno = false;
        this.anexo_justificacion_red = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValidouno = false;
      this.anexo_justificacion_red = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }

  obtenerDocumentoResolucionNombramiento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.resolucion_nombramiento_red = event.target.files[0];
        Swal.fire("PDF Cargado!", "Archivo cargado exitosamente!", "success");
        this.docValidodos = true;
        // this.docResolucon = null;
      } else {
        this.docValidodos = false;
        this.resolucion_nombramiento_red = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValidodos = false;
      this.resolucion_nombramiento_red = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }

  obtenerDocumentoDiplomaEstudioRed(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.diploma_estudio_red = event.target.files[0];
        Swal.fire("PDF Cargado!", "Archivo cargado exitosamente!", "success");
        this.docValidotres = true;
        // this.docResolucon = null;
      } else {
        this.docValidotres = false;
        this.diploma_estudio_red = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValidotres = false;
      this.diploma_estudio_red = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }

  subirDocumento() {
    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("usuario_id", this.$route.params.id);
    data.append("antigua_area_ruta_id", this.areaRuta.id_area_ruta);
    data.append("nueva_area_ruta_id", this.area.area_ruta_id);
    data.append("justificacion", this.historial.justificacion);
    data.append("anexo_justificacion_red", this.anexo_justificacion_red);
    data.append(
      "resolucion_nombramiento_red",
      this.resolucion_nombramiento_red
    );
    data.append("diploma_estudio_red", this.diploma_estudio_red);
    //Enviamos la petición

    Axios()
      .post("almacenar_item_historial_area_conocimiento", data, {
        headers: headers,
      })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          // Swal.fire({
          //   title: "Se subió la resolución!",
          //   text: "Archivo cargado exitosamente!",
          //   icon: "success",
          //   confirmButtonText: "Aceptar",
          //   confirmButtonColor: "#238276",
          // });
        } else {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        }
        this.estadoPeticion = false;
        // this.$router.push({ name: "GestionarConvocatoria" });
      });
  }

  //-------------------------------------------------------------------------------
}
</script>

<style>
.inputfile-1 + label {
  color: #fff;
  font-size: 0.9em;
}

.inputfile-1:focus + label,
.inputfile-1.has-focus + label,
.inputfile-1 + label:hover {
  color: #fff;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #238276;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #238276;
}

.nav-pills .nav-link {
  color: #333;
}
.modif {
  color: #333;
}

.rigth {
  margin-left: 27em;
}

.fon {
  font-size: 2em;
}
/* @media (max-width: 991px) {
  .margen {
    right: 20px;
    left: auto;
  }
} */
</style>
