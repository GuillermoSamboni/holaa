<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR IDIOMAS</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Idioma -->

                <div class="card-body">
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <!-- select idiomas -->
                    <div class="form-group">
                      <label class="font-weight-bold"
                        >Idioma<span class="text-danger">*</span></label
                      >
                      <select
                        class="form-control"
                        id="idioma"
                        name="idioma"
                        v-model="idiomas.idioma_id"
                        v-validate="{ required }"
                      >
                        <option value="" selected disabled>
                          Seleccione el Idioma
                        </option>
                        <option
                          v-for="(tipoI, index) in lista_idiomas"
                          :key="index"
                          :value="tipoI.id_idioma"
                        >
                          {{ tipoI.idioma }}
                        </option>
                      </select>
                      <small v-show="errors.has('idioma')" class="text-danger">
                        {{ errors.first("idioma") }}
                      </small>
                    </div>

                    <!-- Niveles -->
                    <div class="form-group">
                      <label class="font-weight-bold"
                        >Nivel del Idioma<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <select
                        class="form-control"
                        id="nivel"
                        name="nivel"
                        v-model="idiomas.nivel"
                        v-validate="{ required }"
                      >
                        <option value="" selected disabled>
                          Seleccione Su nivel del idioma
                        </option>
                        <option :value="'A1'">Nivel elemental (A1)</option>
                        <option :value="'A2'">
                          Nivel elemental superior (A2)
                        </option>
                        <option :value="'B1'">Nivel intermedio (B1)</option>
                        <option :value="'B2'">
                          Nivel intermedio superior (B2)
                        </option>
                        <option :value="'C1'">Nivel avanzado (C1)</option>
                        <option :value="'C2'">
                          Nivel cercano a la lengua materna (C2)
                        </option>
                      </select>
                      <small v-show="errors.has('nivel')" class="text-danger">
                        {{ errors.first("nivel") }}
                      </small>
                    </div>

                    <!-- institucion -->
                    <div>
                      <label class="font-weight-bold">Institución</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="institucion"
                          class="form-control"
                          id="institucion"
                          placeholder="Nombre De la Institución"
                          v-model="idiomas.institucion"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('institucion')"
                        class="text-danger"
                      >
                        {{ errors.first("institucion") }}
                      </small>
                    </div>

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
                          name="urlResolucion"
                          class="form-control inputfile-1"
                          id="certificado"
                          @change="obtenerDocumento($event)"
                        />
                        <label
                          for="urlResolucion"
                          @click.prevent="$refs.botonResolución.click()"
                          class="btn bg-azul-sena"
                        >
                          <i class="fas fa-file-upload"></i>
                          <span>Certificado</span>
                        </label>
                      </div>
                    </div>
                    <!-- fin certificado -->
                    <div class="justify-content-center">
                      <div class="center col-lg-4 col-sm-12 mt-1">
                        <base-button
                          type="azul-sena"
                          @click="validarFormulario()"
                          class="btn btn-block bg-azul-sena text-white"
                          >Agregar Idioma</base-button
                        >
                      </div>
                      <br />
                      <div
                        class="table-responsive col-sm-12"
                        v-if="listarIdiomasString[0]"
                      >
                        <table class="table table-hoverble" id="listado">
                          <thead class="text-white">
                            <tr>
                              <th class="w-20">Idioma</th>
                              <th>Institución</th>
                              <th>Nivel</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(idioma, index) in listarIdiomasString"
                              :key="index"
                            >
                              <td v-if="idioma.idioma_id == 1">Español</td>
                              <td v-if="idioma.idioma_id == 2">Inglés</td>
                              <td v-if="idioma.idioma_id == 3">Italiano</td>
                              <td v-if="idioma.idioma_id == 4">Francés</td>
                              <td>{{ idioma.institucion }}</td>
                              <td>{{ idioma.nivel }}</td>
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
                              No hay idiomas
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="row justify-content-center">
                    <div
                      class="col-lg-4 col-sm-12 mt-1"
                      v-if="listarIdiomasString[0]"
                    >
                      <base-button
                        type="azul-sena"
                        @click="registrarIdiomasPersona()"
                        class="btn btn-block bg-azul-sena text-white"
                        :disabled="inactivo"
                        >Registrar</base-button
                      >
                    </div>
                    <div class="col-lg-4 col-sm-12 mt-1" v-else>
                      <base-button
                        type="azul-sena"
                        @click="registrarIdiomasPersona()"
                        class="btn btn-block bg-azul-sena text-white"
                        :disabled="!inactivo"
                        >Registrar</base-button
                      >
                      <small
                        ><span class="text-danger">* </span>No Hay Idiomas
                        Agregados</small
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

@Component({
  components: {},
})
export default class Idioma extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  listarIdiomas: any[] = [];
  listarIdiomasString: any[] = [];

  lista_idiomas: any[] = [];

  docValido = false;
  estadoPeticion = false;

  inactivo = false;

  contIdiomaGuardada = 0;

  idiomas = {
    id_idioma_persona: "",
    persona_id: "",
    idioma_id: "",
    idioma: "",
    institucion: "",
    nivel: "",
    certificado: null,
  };

  mounted() {
    this.obtenerIdiomas();
  }

  //-----------------------------------------------------------
  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.idiomas.certificado = event.target.files[0];
        Swal.fire(
          "Certificación Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
      } else {
        this.docValido = false;
        this.idiomas.certificado = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.idiomas.certificado = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
  //--------------------------------------------------------------------
  // Roa y edier eliminar
  //--------------------------------------------------------------------
  obtenerIdiomas() {
    Axios()
      .get("crear_idiomas_persona")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_idiomas = respuesta.data.results.idiomas;
        } else {
          Swal.fire({
            title: "No se pudo obtener idiomas",
            text: respuesta.data.message,
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
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

  //--------------------------------------------------------------------
  listarIdiomasPersona() {
    //Creamos el formData
    var data = new FormData();

    //Añadimos la docinscrip seleccionada
    data.append("id_idioma_persona", this.idiomas.id_idioma_persona);
    data.append("persona_id", this.id_persona_logeada);
    data.append("idioma_id", this.idiomas.idioma_id);
    data.append("idioma", this.idiomas.idioma);
    data.append("institucion", this.idiomas.institucion);
    data.append("nivel", this.idiomas.nivel);
    data.append("certificado", this.idiomas.certificado);

    this.listarIdiomas.push(data);
    this.listarIdiomasString.push(this.idiomas);
    this.idiomas = {
      id_idioma_persona: "",
      persona_id: "",
      idioma_id: "",
      idioma: "",
      institucion: "",
      nivel: "",
      certificado: null,
    };
  }
  //--------------------------------------------------------------------
  registrarIdiomasPersona() {
    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (this.listarIdiomas.length != 0) {
      for (var i = 0; i < this.listarIdiomas.length; i++) {
        Axios()
          .post("almecenar_idioma_persona", this.listarIdiomas[i], {
            headers: headers,
          })
          .then((respuesta) => {
            if ((respuesta.data.status = "success")) {
              this.contIdiomaGuardada++;
              if (this.contIdiomaGuardada == this.listarIdiomas.length) {
                Swal.fire({
                  title: "Idiomas Guardados",
                  text: "Se guardaron " + this.contIdiomaGuardada + " Idiomas",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                });
              }
              this.$router.push({ name: "GestionarHojaDeVidaENI" });
              // this.contExpGuardada++;
            } else {
              Swal.fire("ERROR!", "No se Guardaron Sus Idiomas", "error");
            }
            this.estadoPeticion = false;
          })
          .catch(() => {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          });
      }
    } else {
      Swal.fire({
        title: "Un momento!",
        icon: "info",
        text:
          "No hay idiomas agregados, por favor llene el formulario al menos una vez",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#238276",
      });
    }
  }

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "El valor no puede ser menor a cero",
        email: () => "El correo no es válido",
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.listarIdiomasPersona();
      }
    });
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

.texto {
  text-align: center !important;
}
</style>
