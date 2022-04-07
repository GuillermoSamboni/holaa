<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR IDIOMAS</h1>
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
                      <label class="mt-2 font-weight-bold"
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
                      <label class="mt-2 font-weight-bold"
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

                    <div>
                      <label class="mt-2 font-weight-bold">Institución</label
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
                    <br />
                    <div class="row">
                      <div id="campo" class="col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold">
                          Certificación </label
                        ><span
                          class="text-danger font-weigth-bold"
                          title="Campo Requerido"
                          >*</span
                        >:
                        <!-- subir certificado -->
                        <div class="container-input">
                          <input
                            v-show="false"
                            type="file"
                            ref="botonResolución"
                            name="urlResolucion"
                            class="form-control inputfile-1"
                            id="certificado"
                            @change="obtenerDocumento($event)"
                            v-validate="{ required }"
                            accept="application/pdf"
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
                        <!-- fin -->
                        <small
                          v-show="errors.has('certificado')"
                          class="text-danger font-weigth-bold"
                        >
                          {{ errors.first("certificado") }}
                        </small>
                      </div>
                    </div>
                    <div>
                      <base-button
                        tooltip="Ver Certificado"
                        tooltip-flow="top"
                        type="azul-sena"
                        @click="mirarModal()"
                        class="btn btn-sm bg-azul-sena text-white space"
                        ><i class="fas fa-eye"></i
                      ></base-button>
                    </div>
                    <!-- modal -->
                    <div class="container" id="modal">
                      <modal
                        :show.sync="verModal"
                        body-classes="p-0"
                        modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
                      >
                        <template slot="header">
                          <h2
                            class="text-azul-sena modal-title"
                            id="modalNovedadesAprendiz"
                          >
                            Certificado
                          </h2>
                        </template>
                        <card
                          type="white"
                          shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0"
                        >
                          <div id="contenido">
                            <embed
                              :src="rutadocumento"
                              type="application/pdf"
                              width="100%"
                              height="600px"
                            />
                          </div>
                        </card>
                      </modal>
                    </div>
                    <!-- modal finnnnnnnnnn-->
                    <!-- fin certificado -->
                    <br />
                  </div>
                </div>
                <div class="card-footer">
                  <div class="row justify-content-center">
                    <div class="col-lg-4 col-sm-12 mt-1">
                      <base-button
                        type="azul-sena"
                        @click="validarFormulario()"
                        class="btn btn-block bg-azul-sena text-white"
                        >Modificar</base-button
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
  rutadocumento = null;
  verModal = false;
  docResolucon = "";
  docVista = null;
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
    this.obtenerIdiomaPersona(this.$route.params.id);
  }

  vistaPreviaEvidencia() {
    if (this.docResolucon != "") {
      this.docVista = URL.createObjectURL(this.docResolucon);
    }
  }
  // voy a intentar mostrar en boton el pdf
  mirarModal() {
    this.verModal = true;
  }
  // ------------------------------------------------------------------------
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
        // this.docResolucon = null;
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
  //--------------------------------------------------------------------
  obtenerIdiomaPersona(id) {
    Axios()
      .get("listar_item_idiomas_persona/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.idiomas = respuesta.data.results;
          this.mostrarDocumento(id);
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Hubo un problema en el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }
  //--------------------------------------------------------------------
  mostrarDocumento(id_idioma_persona) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/visualizar_certificado_idioma_persona/" +
      id_idioma_persona;
  }

  //--------------------------------------------------------------------
  modificarIdiomasPersona(id) {
    this.idiomas.id_idioma_persona = id;
    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
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

    Axios()
      .post(
        "modificar_idioma_persona/" + this.idiomas.id_idioma_persona,
        data,
        {
          headers: headers,
        }
      )
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire(
            "Se Modifico el Idioma!",
            "Idioma Modificado",
            respuesta.data.status
          );

          this.$router.push({ name: "GestionarHojaDeVidaENI" });
        } else {
          Swal.fire("ERROR!", "No se Modifico Su Idioma", "error");
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
  //--------------------------------------------------------------------

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
        this.modificarIdiomasPersona(this.$route.params.id);
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
</style>
