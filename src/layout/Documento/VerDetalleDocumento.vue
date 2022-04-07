<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER DOCUMENTO</h1>
        <div class="row">
          <div class="container">
            <div class="card-body">
              <div class="text-center" v-if="!estadoPeticion">
                <AnimacionCargando></AnimacionCargando>
              </div>
              <div
                v-if="estadoPeticion"
                class="col-lg-12 col-md-10 col-sm-12 offset-lg-2 offset-md-1 center"
              >
                <div class="row">
                  <div class="col-sm-12 col-md-4 col-lg-4">
                    <div>
                      <strong>Documento:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ documentos.documento }}</p>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-4 col-lg-4">
                    <div>
                      <strong>Persona:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">
                        {{ documentos.primer_nombre }}
                        {{ documentos.segundo_nombre }}
                        {{ documentos.primer_apellido }}
                        {{ documentos.segundo_apellido }}
                      </p>
                    </div>
                  </div>                  
                </div>

                <div class="row">
                  <div class="col-sm-12 col-md-4 col-lg-4">
                    <div>
                      <strong>Fecha:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ documentos.fecha }}</p>
                    </div>
                  </div>
                  
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div>
                      <strong>Ruta:</strong>
                    </div>
                    <base-button
                      title="Ver Documentos"
                      tooltip="Ver Documentos"
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
                        Documento
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
                <!-- modal fin-->
              </div>
            </div>
            <div class="mt-2">
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

            <!-- <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarConvenio'
              }"
            >
              Volver
            </router-link>
          </div>
        </div>
      </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import Component from "vue-class-component";
  import { Vue } from "vue-property-decorator";
  import AnimacionCargando from "@/components/animacionCargando.vue";

  @Component({
    components: {
      AnimacionCargando,
    },
  })
  export default class VerDetalleDocs extends Vue {
    estadoPeticion = false;
    docValido = false;
    rutadocumento = null;
    verModal = false;

    documentos = {
      id_documento: "",
      ruta: "",
      documento: "",
      persona_id: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      fecha: ""
    }
    mounted() {
      this.obtenerDocs(this.$route.params.id);
    }

    obtenerDocs(id) {
      Axios()
        .get("ver_detalle_documento/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.documentos = respuesta.data.results[0];
            this.mostrarDocumento(id);
          }
        })
        .finally(() => {
          this.estadoPeticion = true;
        });
    }
    mirarModal() {
      this.verModal = true;
    }
    obtenerDocumento(event) {
      if (event.target.files[0].size <= 5000000) {
        //5mb tope
        let extDoc = event.target.files[0].name
          .toString()
          .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
        if (extDoc == ".pdf") {
          this.documentos.ruta = event.target.files[0];
          Swal.fire("PDF Cargado!", "Archivo cargado exitosamente!", "success");
          this.docValido = true;
          // this.docResolucon = null;
        } else {
          this.docValido = false;
          this.documentos.ruta = null;
          Swal.fire(
            "Algo salió mal!",
            "El archivo cargado no es un PDF!",
            "error"
          );
        }
      } else {
        this.docValido = false;
        this.documentos.ruta = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado pesa más de 5 MegaBytes!",
          "error"
        );
      }
    }

    mostrarDocumento(id_documento) {
      this.rutadocumento =
        "https://develdfp.cloudsenactpi.net/api/visualizar_documento/" +
        id_documento;
    }
  }
</script>
