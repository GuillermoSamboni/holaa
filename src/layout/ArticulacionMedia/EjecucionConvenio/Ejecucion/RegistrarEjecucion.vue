<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR EJECUCIÓN</h1>
        <hr />
        <div>
          <Docs @envioDocs="envioDocsMetodo"></Docs>
        </div>        
        <div class="card-footer">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1">
              <button
                v-if="docsPadre == ''"
                :disabled="inactivo"
                @click="$router.back()"
                class="btn btn-azul-sena w-100"
              >
                Volver
              </button>
              <button
                v-else
                :disabled="!inactivo"
                class="btn btn-azul-sena w-100"
              >
                Volver
              </button>
            </div>
            <div class="col-lg-4 col-sm-12 mt-1">
              <button
                @click="registrarEjecucion()"
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
  import Docs from "@/components/Documentos/Documento.vue"

  @Component({
    components: {
      Docs
    },
  })
  export default class Ejecucion extends Vue {
    docsPadre: any[] = [];
    inactivo = false;

    docEjecucion = {
      id_ejecucion: "",
      documento_id: "",
      convenio_id: "",
      colegio_id: "",
    }

    mounted() {
      this.docEjecucion.convenio_id = this.$route.params.id_convenio;
      this.docEjecucion.colegio_id = this.$route.params.id_colegio;
    }

    envioDocsMetodo(data) {
      this.docsPadre = data;
    }

    recorreDocs() {
      for (let i = 0; i < this.docsPadre.length; i++) {
      }
    }

    registrarEjecucion() {
      for (let i = 0; i < this.docsPadre.length; i++) {
        this.docEjecucion.documento_id = this.docsPadre[i].id_documento;

        Axios()
          .post("almacenar_ejecucion", this.docEjecucion)
          .then((respuesta) => {
            if (this.docEjecucion.documento_id != '') {
              if ((respuesta.data.status = "success")) {
                Swal.fire({
                  title: "Ejecución	Guardada",
                  text: "Se guardo la Ejecución",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                });
                this.$router.push({ name: "GestionarEjecucionColegios" });
              } else {
                Swal.fire("ERROR!", "No se Guardo la Ejecución", "error");
              }
            } else {
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
