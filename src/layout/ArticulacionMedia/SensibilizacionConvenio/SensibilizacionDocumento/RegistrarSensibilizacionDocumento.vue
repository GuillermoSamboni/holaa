<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR SENSIBILIZACIÓN</h1>
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
          <Sensi
            @envioSensibilizacion="envioSensibilizacionMetodo"
            v-if="paginaFormulario == 0"
          ></Sensi>
          <Docs
            @envioDocs="envioDocsMetodo"
            v-if="paginaFormulario == 1"
          ></Docs>
        </div>
        <div class="card-footer">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario != 0">
              <button
                v-if="docsPadre == ''"
                :disabled="inactivo"
                @click="cancelarSensibilizacionDocumento"
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
                @click="validarFormulario()"
                class="btn btn-azul-sena w-100"
              >
                Siguiente
              </button>
            </div>
            <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario == 1">
              <button
                @click="registrarSensibilizacion()"
                class="btn btn-azul-sena w-100"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
        {{ sensibilizacionPadre }} - {{ docsPadre }}
        <button @click="recorreDocs">Recorrer</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  import Component from "vue-class-component";
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import Docs from "@/components/Documentos/Documento.vue"
  import Sensi from "@/layout/ArticulacionMedia/SensibilizacionConvenio/Sensibilizacion/RegistrarSensibilizacion.vue"

  @Component({
    components: {
      Docs,
      Sensi
    },
  })
  export default class Viabilidad extends Vue {
    sensibilizacionPadre = "";
    docsPadre: any[] = [];
    paginaFormulario: number = 0;
    inactivo = false;

    docSensibilizacion = {
      sensibilizacion_convenio_id: "",
      documento_id: "",
    }
    moverPantalla() {
      window.scrollTo(0, 0)
    }
    envioSensibilizacionMetodo(data) {
      this.sensibilizacionPadre = data;
    }

    envioDocsMetodo(data) {
      this.docsPadre = data;
    }

    recorreDocs() {
      for (let i = 0; i < this.docsPadre.length; i++) {
      }
    }

    registrarSensibilizacion() {
      for (let i = 0; i < this.docsPadre.length; i++) {
        this.docSensibilizacion.sensibilizacion_convenio_id = this.sensibilizacionPadre;
        this.docSensibilizacion.documento_id = this.docsPadre[i].id_documento;

        Axios()
          .post("almacenar_sensibilizacion_documento", this.docSensibilizacion)
          .then((respuesta) => {
            if (this.docSensibilizacion.documento_id != '') {
              if ((respuesta.data.status = "success")) {
                // this.modalBuscarColegio = false;
                Swal.fire({
                  title: "Sensibilización Guardada",
                  text: "Se guardo la Sensibilización",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                });
                // this.$router.push({ name: "GestionarViabilidad" });
                this.$router.push({ name: "GestionarConvenio" });
              } else {
                Swal.fire("ERROR!", "No se Guardo la Sensibilización", "error");
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

    validarFormulario() {
      this.moverPantalla();
      if (this.sensibilizacionPadre == '') {
        this.paginaFormulario == 0
        Swal.fire({
          title: 'Faltan Datos',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#238276'
        })
      } else {
        this.paginaFormulario += 1
      }

    }

    cancelarSensibilizacionDocumento() {
      Swal.fire({
        title: "Cancelar Sensibilización ",
        text: "?",
        icon: "warning",
        confirmButtonText: "Cancelar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Salir",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_sensibilización/" + this.docSensibilizacion)
            .then((respuesta) => {
              if (respuesta.data.status == "success") {
                Swal.fire({
                  title: "Sensibilización Cancelada",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
                this.$router.push({ name: "GestionarConvenio" });
              } else {
                Swal.fire({
                  title: "No se pudo cancelar la Sensibilización",
                  text: respuesta.data.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
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
            });
        }
      });
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
</style>
