<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <!-- documento -->
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR DOCUMENTO</h1>
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div class="card-body">
              <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
                <div>
                  <label class="mt-2 font-weight-bold">Documento</label
                  ><span
                    class="text-danger"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                    >*</span
                  >:
                  <div class="input-group">
                    <input
                      type="text"
                      name="documento"
                      class="form-control"
                      id="documento"
                      placeholder="Nombre del Documento"
                      v-model="documentos.documento"
                      v-validate="{ required }"
                    />
                  </div>
                </div>

                <div id="campo">
                  <div class="container-input mt-2">
                    <input
                      v-show="false"
                      type="file"
                      ref="botonDoc"
                      name="Ruta"
                      class="form-control inputfile-1"
                      id="Ruta"
                      @change="obtenerDocumento($event)"
                      v-validate="{ required }"
                    />
                    <label
                      for="documento"
                      @click.prevent="$refs.botonDoc.click()"
                      class="btn bg-azul-sena"
                    >
                      <i class="fas fa-file-upload"></i>
                      <span>Subir Documento</span>
                    </label>
                  </div>
                  <small v-show="errors.has('Ruta')" class="text-danger">
                    {{ errors.first("Ruta") }}
                  </small>

                  <div class="container-input mt-2">
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
              </div>
            </div>
            <div class="mt-2">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import Axios from "@/Axios";
  import Swal from "sweetalert2";

  @Component({
    components: {
    },
  })
  export default class Documentos extends Vue {
    id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

    docValido = false;
    estadoPeticion = false;
    rutadocumento = null;
    verModal = false;

    inactivo = false;

    documentos = {
      id_documento: "",
      persona_id: this.id_persona_logeada,
      ruta: "",
      documento: "",
    }

    mounted() {
      this.obtenerDocs(this.$route.params.id);
      this.people();
    }
    people() {
      this.id_persona_logeada;
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

    modificarDocumento() {
      this.estadoPeticion = true;
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      var data = new FormData();
      data.append("persona_id", this.id_persona_logeada);
      data.append("ruta", this.documentos.ruta);
      data.append("documento", this.documentos.documento);
      Axios()
        .post("modificar_documento/" + this.documentos.id_documento, data, {
          headers: headers,
        })
        .then((respuesta) => {
          if (respuesta.data.status == "success") {

            Swal.fire({
              title: "Documento Guardado",
              text: "Se Guardo el Documentos",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });

            this.$router.push({ name: "GestionarDocumento" });
          } else {
            Swal.fire({
              title: "No se Guardo el Documento",
              icon: "error",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
          }
        })
        .catch((respuesta) => {
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
          this.modificarDocumento();
        }
      });
    }
    constructor() {
      super();
      const dict = {
        messages: {
          required: () => "Campo obligatorio",
          date_format: () => "Campo obligatorio",
          decimal: () => "Campo obligatorio",
          min_value: () => "No pude ser negativo",
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