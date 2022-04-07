<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MI IDIOMA</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <span slot="title">Mi Educación Registrada</span>
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
                          <strong>Institución: </strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ idiomas.institucion }}
                          </p>
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- capacitación -->
                        <div>
                          <strong>Idioma:</strong>
                        </div>
                        <div id="contenido">
                          <p v-if="idiomas.idioma_id == 1">Español</p>
                          <p id="texto" v-if="idiomas.idioma_id == 2">Inglés</p>
                          <p id="texto" v-if="idiomas.idioma_id == 3">
                            Italiano
                          </p>
                          <p id="texto" v-if="idiomas.idioma_id == 4">
                            Francés
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Nivel del Idioma:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto" v-if="idiomas.nivel == 'A1'">
                            Nivel elemental
                          </p>
                          <p id="texto" v-if="idiomas.nivel == 'A2'">
                            Nivel elemental superior
                          </p>
                          <p id="texto" v-if="idiomas.nivel == 'B1'">
                            Nivel intermedio
                          </p>
                          <p id="texto" v-if="idiomas.nivel == 'B2'">
                            Nivel intermedio superiorl
                          </p>
                          <p id="texto" v-if="idiomas.nivel == 'C1'">
                            Nivel avanzado
                          </p>
                          <p id="texto" v-if="idiomas.nivel == 'C2'">
                            Nivel cercano a la lengua materna
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Certificado:</strong>
                        </div>
                        <base-button
                          tooltip="Ver Certificado"
                          tooltip-flow="top"
                          type="azul-sena"
                          @click="mirarModal()"
                          class="btn btn-sm bg-azul-sena text-white space"
                          ><i class="fas fa-eye"></i
                        ></base-button>
                      </div>
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
                  </div>
                </div>
              </tabs>
            </div>
            <br />
          </div>
          <!-- Fin Contenido -->
        </div>
        <div class="card-footer">
          <div class="row justify-content-center">
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
export default class Idioma extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  listarIdiomas: any[] = [];
  listarIdiomasString: any[] = [];

  lista_idiomas: any[] = [];

  docValido = false;
  estadoPeticion = false;
  rutadocumento = null;
  verModal = false;

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
  // voy a intentar mostrar en boton el pdf
  mirarModal() {
    this.verModal = true;
  }
  // ------------------------------------------------------------------------
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
          Swal.fire("ERROR!", "No se han encontrado idiomas", "error");
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
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }
  //--------------------------------------------------------------------
  mostrarDocumento(id_idioma_persona) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/visualizar_certificado_idioma_persona/" +
      id_idioma_persona;
  }

  //--------------------------------------------------------------------

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
