<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">HISTORIAL CAMBIO DE RED Y ÁREA</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
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
                          <strong>Antigua Área:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ usuario.antigua_area_ruta }}
                          </p>
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- capacitación -->
                        <div>
                          <strong>Antigua Red:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ usuario.antigua_red }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Nueva Área:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ usuario.nueva_red }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Justificación Del Cambio:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ usuario.justificacion }}
                          </p>
                        </div>
                      </div>

                      <!-- anexo justificacion  -->
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Certificado Anexo Justificación:</strong>
                        </div>
                        <base-button
                          title="Ver Certificado"
                          type="azul-sena"
                          @click="mirarModalJustificacion()"
                          class="btn btn-sm bg-azul-sena text-white space"
                          ><i class="fas fa-file-pdf"></i
                        ></base-button>
                      </div>
                      <!-- fin anexo justificacion -->

                      <!-- anexo resolucion -->
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Certificado Anexo Resolución:</strong>
                        </div>
                        <base-button
                          title="Ver Certificado"
                          type="azul-sena"
                          @click="mirarModalResolucion()"
                          class="btn btn-sm bg-azul-sena text-white space"
                          ><i class="fas fa-file-pdf"></i
                        ></base-button>
                      </div>
                      <!-- fin anexo resolucion -->

                      <!-- anexo diploma -->
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Certificado Anexo Diploma:</strong>
                        </div>
                        <base-button
                          title="Ver Certificado"
                          type="azul-sena"
                          @click="mirarModalDiploma()"
                          class="btn btn-sm bg-azul-sena text-white space"
                          ><i class="fas fa-file-pdf"></i
                        ></base-button>
                      </div>
                      <!-- fin anexo diploma -->
                    </div>

                    <!-- modal anexo justificacion -->
                    <div class="container" id="modalA">
                      <modal
                        :show.sync="verModalJustificacion"
                        body-classes="p-0"
                        modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
                      >
                        <template slot="header">
                          <h2
                            class="text-azul-sena modal-title"
                            id="modalAnexoJustificacion"
                          >
                            Certificado
                          </h2>
                        </template>
                        <card type="white" shadow class="border-0">
                          <div id="contenido">
                            <embed
                              :src="rutadocumentoJustificacion"
                              type="application/pdf"
                              width="100%"
                              height="600px"
                            />
                          </div>
                        </card>
                      </modal>
                    </div>
                    <!-- fin modal anexo justificacion -->

                    <!-- modal anexo resolucion -->
                    <div class="container" id="modalB">
                      <modal
                        :show.sync="verModalResolucion"
                        body-classes="p-0"
                        modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
                      >
                        <template slot="header">
                          <h2
                            class="text-azul-sena modal-title"
                            id="modalAnexoResolucion"
                          >
                            Certificado
                          </h2>
                        </template>
                        <card type="white" shadow class="border-0">
                          <div id="contenido">
                            <embed
                              :src="rutadocumentoResolucion"
                              type="application/pdf"
                              width="100%"
                              height="600px"
                            />
                          </div>
                        </card>
                      </modal>
                    </div>
                    <!-- fin modal anexo resolucion -->

                    <!-- modal anexo diploma -->
                    <div class="container" id="modalC">
                      <modal
                        :show.sync="verModalDiploma"
                        body-classes="p-0"
                        modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
                      >
                        <template slot="header">
                          <h2
                            class="text-azul-sena modal-title"
                            id="modalAnexoDiploma"
                          >
                            Certificado
                          </h2>
                        </template>
                        <card type="white" shadow class="border-0">
                          <div id="contenido">
                            <embed
                              :src="rutadocumentoDiploma"
                              type="application/pdf"
                              width="100%"
                              height="600px"
                            />
                          </div>
                        </card>
                      </modal>
                    </div>
                    <!-- fin modal anexo diploma -->

                    <div class="card-footer">
                      <div class="row justify-content-center">
                        <div class="col-lg-8 col-sm-12 mt-1">
                          <router-link
                            class="btn btn-block bg-azul-sena text-white"
                            :to="{
                              name: 'GestionarUsuario',
                            }"
                          >
                            Volver
                          </router-link>
                        </div>
                      </div>
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
<script>
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "@/components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class VerFormacion extends Vue {
  estadoPeticion = false;

  docValido = false;
  rutadocumentoJustificacion = null;
  verModalJustificacion = false;

  rutadocumentoResolucion = null;
  verModalResolucion = false;

  rutadocumentoDiploma = null;
  verModalDiploma = false;

  usuario = {
    id_historial_usuario: "",
    usuario_id: "",
    antigua_area_ruta_id: "",
    antigua_area_ruta: "",
    antigua_red: "",
    id_antigua_red: "",
    nueva_area_ruta_id: "",
    nueva_area_ruta: "",
    nueva_red: "",
    id_nueva_red: "",
    justificacion: "",
    anexo: "",
    creado: "",
  };

  constructor() {
    super();
  }

  mounted() {
    this.obtenerFormacion();
    this.obtenerDocumentoJustificacion(this.$route.params.id);
    this.obtenerDocumentoresolucion(this.$route.params.id);
    this.obtenerDocumentoDiploma(this.$route.params.id);
  }

  mirarModalJustificacion() {
    this.verModalJustificacion = true;
  }

  mirarModalResolucion() {
    this.verModalResolucion = true;
  }

  mirarModalDiploma() {
    this.verModalDiploma = true;
  }

  obtenerFormacion() {
    Axios()
      .get("ver_item_historial_area_conocimiento/" + this.$route.params.id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          //   Swal.fire({
          //   title: "historial exitosamente",
          //   icon: respuesta.data.status,
          //   confirmButtonText: "Aceptar",
          //   confirmButtonColor: "#238276",
          // });
          this.usuario = respuesta.data.results;
        } else {
          Swal.fire({
            title: "no",
            text: respuesta.data.message,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
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
        this.estadoPeticion = true;
      });
  }

  obtenerDocumentoJustificacion(id) {
    Axios()
      .get("ver_item_historial_area_conocimiento/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.usuario = respuesta.data.results;
          this.mostrarDocumentoJustificacion(id);
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

  obtenerDocumentoresolucion(id) {
    Axios()
      .get("ver_item_historial_area_conocimiento/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.usuario = respuesta.data.results;
          this.mostrarDocumentoResolucion(id);
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

  obtenerDocumentoDiploma(id) {
    Axios()
      .get("ver_item_historial_area_conocimiento/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.usuario = respuesta.data.results;
          this.mostrarDocumentoDiploma(id);
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

  mostrarDocumentoJustificacion(id_historial) {
    this.rutadocumentoJustificacion =
      "https://develdfp.cloudsenactpi.net/api/visualizar_anexo_justificacion/" +
      id_historial;
  }

  mostrarDocumentoResolucion(id_historial) {
    this.rutadocumentoResolucion =
      "https://develdfp.cloudsenactpi.net/api/visualizar_resolucion_nombramiento/" +
      id_historial;
  }

  mostrarDocumentoDiploma(id_historial) {
    this.rutadocumentoDiploma =
      "https://develdfp.cloudsenactpi.net/api/visualizar_diploma_estudio/" +
      id_historial;
  }
}
</script>
