<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MI EDUCACIÓN</h1>
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
                          <strong>Título Obtenido:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosEducacion.titulo_obtenido }}
                          </p>
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- capacitación -->
                        <div>
                          <strong>Institución:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosEducacion.institucion }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Fecha Inicio:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosEducacion.fecha_inicio }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Fecha Fin:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosEducacion.fecha_fin }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
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
export default class VerDetalleEducacionPersona extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  docValido = false;
  rutadocumento = null;
  estadoPeticion = false;
  verModal = false;

  datosEducacion = {
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
  mounted() {
    this.obtenerEducacionPersona(this.$route.params.id);
    this.mostrarDocumento(this.datosEducacion.id_educacion);
  }
  // voy a intentar mostrar en boton el pdf

  mirarModal() {
    this.verModal = true;
  }
  // ------------------------------------------------------------------------

  obtenerEducacionPersona(id) {
    Axios()
      .get("ver_detalle_educacion_persona/" + id)
      .then((respuesta) => {
        this.datosEducacion = respuesta.data.results;
        this.mostrarDocumento(id);
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.datosEducacion.certificado = event.target.files[0];
        Swal.fire(
          "Resolución Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
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
  mostrarDocumento(id_educacion) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/ver_certificado_educacion_persona/" +
      id_educacion;
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
