<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR EDUCACIÓN</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Mi Educacion -->
                <div class="card-body">
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  ></div>
                  <!-- Forms -->

                  <div class="card-body">
                    <div
                      class="
                        col-lg-8 col-md-10 col-sm-12
                        offset-lg-2 offset-md-1
                      "
                    >
                      <div>
                        <br />
                        <!-- Titulo Obtenido -->

                        <div>
                          <label class="mt-2 font-weight-bold">
                            Título Obtenido
                            <span
                              class="text-danger font-weigth-bold"
                              tooltip="Campo Requerido" tooltip-flow="top"
                              >*</span
                            >:
                          </label>
                          <div class="input-group">
                            <input
                              type="text"
                              name="Titulo_Obtenido"
                              class="form-control"
                              placeholder="Titulo Obtenido"
                              v-model="datosEducacion.titulo_obtenido"
                              v-validate="{ required }"
                            />
                          </div>
                          <small
                            v-show="errors.has('Titulo_Obtenido')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("Titulo_Obtenido") }}
                          </small>
                        </div>
                        <!-- Institucion -->
                        <br />
                        <div>
                          <label class="mt-2 font-weight-bold">
                            Institución
                            <span
                              class="text-danger font-weigth-bold"
                              tooltip="Campo Requerido" tooltip-flow="top"
                              >*</span
                            >:
                          </label>
                          <div class="input-group">
                            <input
                              type="text"
                              name="institucion"
                              class="form-control"
                              placeholder="Nombre de la institución"
                              v-model="datosEducacion.institucion"
                              v-validate="{ required }"
                            />
                          </div>
                          <small
                            v-show="errors.has('institucion')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("institucion") }}
                          </small>
                        </div>
                        <br />
                        <!-- Fecha de inicio -->
                        <div class="row">
                          <div class="col-sm-12 col-md-6 col-lg-6">
                            <label class="mt-2 font-weight-bold"
                              >Fecha Inicio<span class="text-danger">*</span
                              >:</label
                            >
                            <div>
                              <input
                                type="date"
                                class="form-control"
                                name="fecha_inicio"
                                id="fecha_inicio"
                                v-model="datosEducacion.fecha_inicio"
                                max="2021-12-31"
                                v-validate="{ required }"
                              />
                              <small
                                v-show="errors.has('fecha_inicio')"
                                class="text-danger"
                              >
                                {{ errors.first("fecha_inicio") }}
                              </small>
                            </div>
                          </div>
                          <div class="col-sm-12 col-md-6 col-lg-6">
                            <label class="mt-2 font-weight-bold"
                              >Fecha de Finalización<span class="text-danger"
                                >*</span
                              >:</label
                            >
                            <div>
                              <input
                                type="date"
                                class="form-control"
                                name="fecha_fin"
                                id="fecha_fin"
                                v-model="datosEducacion.fecha_fin"
                                :min="datosEducacion.fecha_inicio"
                                v-validate="{ required }"
                              />
                              <small
                                v-show="errors.has('fecha_fin')"
                                class="text-danger"
                              >
                                {{ errors.first("fecha_fin") }}
                              </small>
                            </div>
                          </div>
                        </div>
                        <!-- adjunto -->
                        <br />
                        <!-- certificado -->
                        <div id="campo">
                          <label class="mt-2 font-weight-bold">
                            Certificaciones </label
                          ><span
                            class="text-danger font-weigth-bold"
                            title="Campo Requerido"
                            >*</span
                          >:
                          <div class="container-input">
                            <input
                              v-show="false"
                              type="file"
                              ref="botonResolución"
                              name="certificado"
                              class="form-control inputfile-1"
                              id="certificado"
                              @change="obtenerDocumento($event)"
                              v-validate="{ required }"
                            />
                            <label
                              for="certificado"
                              @click.prevent="$refs.botonResolución.click()"
                              class="btn bg-azul-sena"
                            >
                              <i class="fas fa-file-upload"></i>
                              <span>Certificado</span>
                            </label>
                          </div>
                          <small
                            v-show="errors.has('certificado')"
                            class="text-danger"
                          >
                            {{ errors.first("certificado") }}
                          </small>
                          <div>
                            <div
                              id="campo"
                              v-if="datosEducacion.certificado != null"
                            >
                              Documento seleccionado :
                              {{ datosEducacion.certificado.name }}
                            </div>
                          </div>
                        </div>
                        <!-- fin certificado -->
                        <div class="form-group">
                          <label class="mt-2 font-weight-bold"
                            >Tipo De Educación<span class="text-danger"
                              >*</span
                            ></label
                          >
                          <select
                            class="form-control"
                            id="Tipo_educacion"
                            name="Tipo_educacion"
                            v-model="datosEducacion.tipo_educacion"
                            v-validate="{ required }"
                          >
                            <option value="" selected disabled>
                              Seleccione La Educación
                            </option>
                            <option :value="'1'">Educacion Formal</option>
                            <option :value="'2'">Educacion No Formal</option>
                          </select>
                        </div>
                        <small
                          v-show="errors.has('Tipo_educacion')"
                          class="text-danger"
                        >
                          {{ errors.first("Tipo_educacion") }}
                        </small>

                        <div class="center col-lg-5 col-sm-12 mt-1">
                          <base-button
                            type="azul-sena"
                            @click="validarFormulario()"
                            class="btn btn-block bg-azul-sena text-white"
                            >Agregar Educacion</base-button
                          >
                        </div>
                        <br />
                        <div
                          class="table-responsive col-sm-12"
                          v-if="listareducacionstring[0]"
                        >
                          <table class="table table-hoverble" id="listado">
                            <thead class="bg-gradient-naranja-sena text-white">
                              <tr>
                                <th scope="col">Tipo de Formación</th>
                                <th scope="col">Título</th>
                                <th scope="col">Institución</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(edu, index) in listareducacionstring"
                                :key="index"
                              >
                                <td v-if="edu.tipo_educacion == 1">Formal</td>
                                <td v-else>No Formal</td>
                                <td>{{ edu.titulo_obtenido }}</td>
                                <td>{{ edu.institucion }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div v-else>
                          <div class="justify-content-center">
                            <div class="center col-lg-4 col-sm-12">
                              <h3
                                class="
                                  font-weight-bold
                                  text-center text-azul-sena
                                "
                              >
                                No hay Educaciones
                              </h3>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>

                  <!-- Fin Forms -->
                </div>
                <!-- <div class="text-center" v-if="!estadoPeticion">
                  <AnimacionCargando></AnimacionCargando>
                </div>
                <div class="card-footer" v-if="estadoPeticion"> -->
                <div class="card-footer">
                  <div class="row justify-content-center">
                    <div class="col-lg-4 col-sm-12 mt-1">
                      <base-button
                        type="azul-sena"
                        @click="registrarEducacionPersona()"
                        class="btn btn-block bg-azul-sena text-white"
                        >Registrar</base-button
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
import AnimacionCargando from "../../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class RegistrarEducacionPersona extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  inactiva = false;
  docValido = false;
  estadoPeticion = false;
  listarEducacion: any[] = [];
  funcion = null;
  listareducacionstring: any[] = [];
  contEduGuardada = 0;

  datosEducacion = {
    actualizado: "",
    certificado: null,
    creado: "",
    fecha_fin: "",
    fecha_inicio: "",
    id_educacion: "",
    institucion: "",
    persona_id: "",
    tipo_educacion: "",
    titulo_obtenido: "",
  };
  mounted() {}

  //-------------------------------------------------------------------------------
  ListarEducacionPersona() {
    this.estadoPeticion = true;
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("persona_id", this.id_persona_logeada);
    data.append("titulo_obtenido", this.datosEducacion.titulo_obtenido);
    data.append("institucion", this.datosEducacion.institucion);
    data.append("fecha_inicio", this.datosEducacion.fecha_inicio);
    data.append("fecha_fin", this.datosEducacion.fecha_fin);
    data.append("certificado", this.datosEducacion.certificado);
    data.append("tipo_educacion", this.datosEducacion.tipo_educacion);

    this.listarEducacion.push(data);
    this.listareducacionstring.push(this.datosEducacion);
    this.datosEducacion = {
      actualizado: "",
      certificado: "",
      creado: "",
      fecha_fin: "",
      fecha_inicio: "",
      id_educacion: "",
      institucion: "",
      persona_id: "",
      tipo_educacion: "",
      titulo_obtenido: "",
    };
  }
  // validarFormulario() {
  //   this.ListarEducacionPersona();
  // }

  //---------------------------------------------------------------------------
  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.datosEducacion.certificado = event.target.files[0];
        Swal.fire("PDF Cargado!", "Archivo cargado exitosamente!", "success");
        this.docValido = true;
      } else {
        this.docValido = false;
        this.datosEducacion.certificado = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.datosEducacion.certificado = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
  //----------------------------------------------------------------------
  registrarEducacionPersona() {
    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    if (this.listarEducacion.length != 0) {
      for (var i = 0; i < this.listarEducacion.length; i++) {
        Axios()
          .post("almacenar_educacion_persona", this.listarEducacion[i], {
            headers: headers,
          })
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              this.contEduGuardada++;
              if (this.contEduGuardada == this.listarEducacion.length) {
                Swal.fire({
                  title: "Educación Guardada",
                  text: "Se guardaron " + this.contEduGuardada + " Educaciones",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                });
              }
              this.$router.push({ name: "GestionarHojaDeVidaENI" });
            } else {
              Swal.fire({
                title: "No se Guardo La Educación",
                icon: "error",
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
        // .finally(() => {
        //   this.estadoPeticion = true;
        // });
      }
    } else {
      // alerta

      Swal.fire({
        title: "Un momento!",
        icon: "info",
        text: "No hay educación agregada, por favor llene el formulario al menos una vez",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#238276",
      });
    }
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // this.registrarEducacionPersona(this.$route.params.id);
        this.ListarEducacionPersona();
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
</style>