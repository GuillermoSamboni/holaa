<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR VIABILIDAD</h1>
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
          <Viabi
            @envioViabilidad="envioViabilidadMetodo"
            v-if="paginaFormulario == 0"
          ></Viabi>
          <Docs
            @envioDocs="envioDocsMetodo"
            v-if="paginaFormulario == 1"
          ></Docs>
        </div>
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
                @click="cancelarViabilidadDocumento"
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
                @click="registrarViabilidad()"
                class="btn btn-azul-sena w-100"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
        <!-- {{ viabilidadPadre }} - {{ docsPadre }}
        <button @click="recorreDocs">Recorrer</button> -->
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
  import Viabi from "@/layout/ArticulacionMedia/ViabilidadConvenio/Viabilidad/RegistrarViabilidad.vue"

  @Component({
    components: {
      Docs,
      Viabi
    },
  })
  export default class Viabilidad extends Vue {
    viabilidadPadre = "";
    docsPadre: any[] = [];
    paginaFormulario: number = 0;
    inactivo = false;

    docViabilidad = {
      viabilidad_id: "",
      documento_id: "",
    }
    moverPantalla() {
      window.scrollTo(0, 0)
    }
    envioViabilidadMetodo(data) {
      this.viabilidadPadre = data;

    }
    envioDocsMetodo(data) {
      this.docsPadre = data;
    }
    recorreDocs() {
      for (let i = 0; i < this.docsPadre.length; i++) {
      }
    }

    registrarViabilidad() {
      for (let i = 0; i < this.docsPadre.length; i++) {
        this.docViabilidad.viabilidad_id = this.viabilidadPadre;
        this.docViabilidad.documento_id = this.docsPadre[i].id_documento;

        Axios()
          .post("almacenar_viabilidad_documento", this.docViabilidad)
          .then((respuesta) => {
            if (this.docViabilidad.documento_id != '') {
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
                Swal.fire("ERROR!", "No se Guardo la Viabilidad", "error");
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
      this.moverPantalla()
      if (this.viabilidadPadre == '') {
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

    cancelarViabilidadDocumento() {
      Swal.fire({
        title: "Cancelar Viabilidad ",
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
            .delete("eliminar_viabilidad/" + this.viabilidadPadre)
            .then((respuesta) => {
              if (respuesta.data.status == "success") {
                Swal.fire({
                  title: "Viabilidad Cancelada",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
                this.$router.push({ name: "GestionarConvenio" });
              } else {
                Swal.fire({
                  title: "No se pudo cancelar la viabilidad",
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
