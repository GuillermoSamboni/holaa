<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR CERTIFICACIÓN</h1>
        <hr />

        <div>
          <div class="d-flex justify-content-around mt-3">
            <h3 class="circulo circulo-selecionado">1</h3>
            <h3
              class="circulo"
              :class="{ 'circulo-selecionado': paginaFormulario > 0 }"
            >
              2
            </h3>
          </div>
          <div v-if="paginaFormulario == 0">
            <div class="card-body">
              <div
                class="
                  col-lg-8 col-md-10 col-sm-12
                  offset-lg-2 offset-md-1
                  center
                "
              >
                <!-- doc1 -->
                <div class="col-md-6 col-lg-6">
                  <div class="row my-3">
                    <div id="campo">
                      <label class="mt-2 font-weight-bold">
                        Seguimiento Inicial </label
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
                          name="seguimiento_inicial"
                          class="form-control inputfile-1"
                          id="seguimiento_inicial"
                          @change="obtenerSeguimientoInicial($event)"
                          v-validate="{ required }"
                        />
                        <label
                          for="seguimiento_inicial"
                          @click.prevent="$refs.botonResolución.click()"
                          class="btn bg-azul-sena"
                        >
                          <i class="fas fa-file-upload"></i>
                          <span>seguimiento_inicial</span>
                        </label>
                      </div>
                      <small
                        v-show="errors.has('seguimiento_inicial')"
                        class="text-danger"
                      >
                        {{ errors.first("seguimiento_inicial") }}
                      </small>
                    </div>
                  </div>
                </div>
                <!-- doc2 -->
                <div class="col-md-6 col-lg-6">
                  <div class="row my-3">
                    <div id="campo">
                      <label class="mt-2 font-weight-bold">
                        Seguimiento Final </label
                      ><span
                        class="text-danger font-weigth-bold"
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div class="container-input">
                        <input
                          v-show="false"
                          type="file"
                          ref="botonResolución2"
                          name="seguimiento_final"
                          class="form-control inputfile-1"
                          id="seguimiento_final"
                          @change="obtenerSeguimientoFinal($event)"
                          v-validate="{ required }"
                        />
                        <label
                          for="seguimiento_final"
                          @click.prevent="$refs.botonResolución2.click()"
                          class="btn bg-azul-sena"
                        >
                          <i class="fas fa-file-upload"></i>
                          <span>seguimiento_final</span>
                        </label>
                      </div>
                      <small
                        v-show="errors.has('seguimiento_final')"
                        class="text-danger"
                      >
                        {{ errors.first("seguimiento_final") }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-sm-12 mt-1">
                  <div v-if="validarDocCertificado == ''">
                    <base-button
                      type="azul-sena"
                      @click="validarFormulario()"
                      class="btn btn-block bg-azul-sena text-white"
                      >Registrar</base-button
                    >
                  </div>

                  <div v-else>
                    <div class="row justify-content-center">
                      <small class="text-azul-sena">
                        * Se ha Agregado los Certificados
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Docs
            @envioDocs="envioDocsMetodo"
            v-if="paginaFormulario == 1"
          ></Docs>
        </div>
        <!-- formulario -->
        <div class="card-footer">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario != 0">
              <!-- <button
                v-if="viabilidadPadre != ''"
                :disabled="!inactivo"
                @click="(paginaFormulario -= 1), moverPantalla()"
                class="btn btn-azul-sena w-100"
              >
                Anterior
              </button>
              <button
                v-else
                :disabled="inactivo"
                @click="(paginaFormulario -= 1), moverPantalla()"
                class="btn btn-azul-sena w-100"
              >
                Anterior
              </button> -->
              <button
                v-if="docsPadre == ''"
                :disabled="inactivo"
                class="btn btn-azul-sena w-100"
              >
                Cancelar
              </button>
              <button
                v-else
                :disabled="!inactivo"
                class="btn btn-azul-sena w-100"
              >
                Cancelar
              </button>
            </div>
            <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario != 1">
              <button
                @click="moverFormulario()"
                class="btn btn-azul-sena w-100"
              >
                Siguiente
              </button>
            </div>
            <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario == 1">
              <button
                @click="registrarCertificacionDocumenos"
                class="btn btn-azul-sena w-100"
              >
                Finalizar
              </button>
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
  import Docs from "@/components/Documentos/Documento.vue";

  @Component({
    components: {
      Docs,
    },
  })
  export default class Certificacion extends Vue {
    inactivo = false;
    estadoPeticion = false;
    docsPadre: any[] = [];
    paginaFormulario: number = 0;
    viabilidadPadre = "";

    docValido = false;
    docCertificacion = {
      convenio_id: "",
      colegio_id: "",
      seguimiento_inicial: "",
      seguimiento_final: "",
    };
    docCertificacionDocumentos = {
      certificacion_id: "",
      documento_id: "",
    };

    validarDocCertificado = "";
    id_certificacion = "";

    moverPantalla() {
      window.scrollTo(0, 0);
    }

    envioDocsMetodo(data) {
      this.docsPadre = data;
    }
    envioCertificacionMetodo(data) {
      this.viabilidadPadre = data;

    }
    mounted() {
      this.docCertificacion.convenio_id = this.$route.params.id_convenio;
      this.docCertificacion.colegio_id = this.$route.params.id_colegio;
    }


    obtenerSeguimientoInicial(event) {
      if (event.target.files[0].size <= 5000000) {
        let extDoc = event.target.files[0].name
          .toString()
          .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
        if (extDoc == ".pdf") {
          this.docCertificacion.seguimiento_inicial = event.target.files[0];
          Swal.fire(
            "Certificación Cargada!",
            "Archivo cargado exitosamente!",
            "success"
          );
          this.docValido = true;
          // this.docResolucon = null;
        } else {
          this.docValido = false;
          this.docCertificacion.seguimiento_inicial = null;
          Swal.fire(
            "Algo salió mal!",
            "El archivo cargado no es un PDF!",
            "error"
          );
        }
      } else {
        this.docValido = false;
        this.docCertificacion.seguimiento_inicial = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado pesa más de 5 MegaBytes!",
          "error"
        );
      }
    }
    obtenerSeguimientoFinal(event) {
      if (event.target.files[0].size <= 5000000) {
        let extDoc = event.target.files[0].name
          .toString()
          .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
        if (extDoc == ".pdf") {
          this.docCertificacion.seguimiento_final = event.target.files[0];
          Swal.fire(
            "Certificación Cargada!",
            "Archivo cargado exitosamente!",
            "success"
          );
          this.docValido = true;
        } else {
          this.docValido = false;
          this.docCertificacion.seguimiento_final = null;
          Swal.fire(
            "Algo salió mal!",
            "El archivo cargado no es un PDF!",
            "error"
          );
        }
      } else {
        this.docValido = false;
        this.docCertificacion.seguimiento_final = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado pesa más de 5 MegaBytes!",
          "error"
        );
      }
    }
    registrarCertificacion() {
      this.estadoPeticion = true;
      var data = new FormData();
      data.append("colegio_id", this.docCertificacion.colegio_id);
      data.append("convenio_id", this.docCertificacion.convenio_id);
      data.append(
        "seguimiento_inicial",
        this.docCertificacion.seguimiento_inicial
      );
      data.append("seguimiento_final", this.docCertificacion.seguimiento_final);

      const headers = {
        "Content-Type": "multipart/form-data",
      };
      Axios()
        .post("almacenar_certificacion", data, {
          headers: headers,
        })
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            Swal.fire({
              title: "Programa Proyectado Guardado",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            this.validarDocCertificado = respuesta.data.results;
            this.id_certificacion = respuesta.data.results.id_certificacion;
            //   this.estadoPeticion = false;
          } else {
            Swal.fire({
              title: "Programa proyectado no guardado",
              text: respuesta.data.message,
              icon: respuesta.data.status.toLowerCase(),
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

    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          this.registrarCertificacion();
        }
      });
    }
    registrarCertificacionDocumenos() {
      for (let i = 0; i < this.docsPadre.length; i++) {
        this.docCertificacionDocumentos.certificacion_id = this.id_certificacion;
        this.docCertificacionDocumentos.documento_id = this.docsPadre[i].id_documento;

        Axios()
          .post("almacenar_certificacion_documento", this.docCertificacionDocumentos)
          .then((respuesta) => {
            if (this.docCertificacionDocumentos.documento_id != "") {
              if ((respuesta.data.status = "success")) {
                // this.modalBuscarColegio = false;
                Swal.fire({
                  title: "Viabilidad Guardada",
                  text: "Se guardo la Viabilidad",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                });
                // this.$router.push({ name: "GestionarViabilidad" });
                this.$router.push({ name: "GestionarConvenio" });
              } else {
                Swal.fire("ERROR!", "No se Guardo la Certificacion", "error");
              }
            } else {
            }
            // this.estadoPeticion = false;
          })
          .catch(() => {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          });
      }
    }
    moverFormulario() {
      this.moverPantalla();
      if (this.validarDocCertificado == "") {
        this.paginaFormulario == 0;
        Swal.fire({
          title: "Faltan Datos",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
        });
      } else {
        this.$validator.validate().then((valid) => {
          if (valid) {
            // el formulario se validó y tiene los datos que corresponden por campo
            this.registrarCertificacion();
          }
        });
        this.paginaFormulario += 1;
      }
    }
  }
</script>
<style>
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
