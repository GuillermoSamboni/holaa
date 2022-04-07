<template>
  <div class="col-8 center">
    <!-- documento -->
    <div>
      <div>
        <label class="mt-2 font-weight-bold">Documento</label
        ><span class="text-danger" tooltip="Campo Requerido" tooltip-flow="top"
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
      <small v-show="errors.has('documento')" class="text-danger">
        {{ errors.first("documento") }}
      </small>

      <div id="campo">
        <!-- <label class="mt-2 font-weight-bold">Ruta:</label
        ><span class="text-danger font-weigth-bold" title="Campo Requerido"
          >*</span
        >: -->
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
      </div>
    </div>
    <div v-if="prueba == ''">
      <div class="center col-lg-5 col-sm-12 mt-1">
        <base-button
          v-if="documentos.ruta == ''"
          type="azul-sena"
          :disabled="!inactivo"
          @click="validarFormulario()"
          class="btn btn-block bg-azul-sena text-white"
          >Agregar Documento</base-button
        >
        <base-button
          v-else
          type="azul-sena"
          :disabled="inactivo"
          @click="validarFormulario()"
          class="btn btn-block bg-azul-sena text-white"
          >Agregar Documento</base-button
        >
      </div>
      <div class="col-sm-5 center mt-3" v-if="listarDocumentosString[0]">
        <table class="table table-hoverble" id="listado">
          <thead class="bg-gradient-naranja-sena text-white">
            <tr>
              <th scope="col">Ruta</th>
              <th scope="col" class="col-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(docs, index) in listarDocumentosString" :key="index">
              <td>{{ docs.documento }}</td>
              <td scope="row">
                <div class="btn-toolbar btn-responsive-table" role="toolbar">
                  <div
                    class="btn-group btn-spc"
                    tooltip="Eliminar Documento"
                    tooltip-flow="top"
                  >
                    <base-button
                      type="azul-sena"
                      @click="eliminar(listarDocumentosString)"
                      class="btn btn-sm bg-azul-sena text-white"
                    >
                      <i class="fas fa-trash"></i>
                    </base-button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-2">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1" v-if="listarDocumentosString[0]">
            <base-button
              type="azul-sena"
              @click="registrarDocumentos()"
              :disabled="inactivo"
              class="btn btn-block bg-azul-sena text-white"
              >Registrar</base-button
            >
          </div>
          <div class="col-lg-4 col-sm-12 mt-1" v-else>
            <base-button
              type="azul-sena"
              @click="registrarDocumentos()"
              :disabled="!inactivo"
              class="btn btn-block bg-azul-sena text-white"
              >Registrar</base-button
            >
          </div>
          <div class="mb-6"></div>
          <!-- 
        <div class="col-lg-4 col-sm-12 mt-1">
          <a
            class="btn btn-block bg-azul-sena text-white"
            @click="$router.back()"
          >
            Volver
          </a>
        </div> -->
        </div>
      </div>
    </div>
    <div v-else class="center col-lg-5 col-sm-12 mt-1 mb-4">
      <div class="row justify-content-center">
        <small class="text-azul-sena">
          * Se han Agregado {{cont}} documentos
        </small>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Component from "vue-class-component";
  import { Prop, Vue } from "vue-property-decorator";

  import Axios from "@/Axios";
  import Swal from "sweetalert2";

  @Component({
    components: {
    },
    props: {
    }
  })
  export default class Documentos extends Vue {

    id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
    docValido = false;
    estadoPeticion = false;
    listarDocumentos: any[] = [];
    listarDocumentosString: any[] = [];
    contDocumentos = 0;
    prueba: any[] = []; 
    cont;   

    inactivo = false;

    documentos = {
      persona_id: this.id_persona_logeada,
      ruta: "",
      documento: "",
    }

    mounted() {
      this.people();
    }
    people() {
      this.id_persona_logeada;
    }

    ListarDocs() {
      this.estadoPeticion = true;
      //Creamos el formData
      var data = new FormData();
      //Añadimos la docinscrip seleccionada
      data.append("persona_id", this.id_persona_logeada);
      data.append("ruta", this.documentos.ruta);
      data.append("documento", this.documentos.documento);

      // this.listarDocumentos.push(data);

      this.listarDocumentosString.push(this.documentos);
      this.documentos = {
        persona_id: this.id_persona_logeada,
        ruta: "",
        documento: ""
      };
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
    eliminar(id) {
      this.listarDocumentosString.splice(this.listarDocumentosString.indexOf(id), 1);
    }

    registrarDocumentos() {
      this.estadoPeticion = true;
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      for (var i = 0; i < this.listarDocumentosString.length; i++) {
        var data = new FormData();
        //Añadimos la docinscrip seleccionada
        data.append("persona_id", this.listarDocumentosString[i].persona_id);
        data.append("ruta", this.listarDocumentosString[i].ruta);
        data.append("documento", this.listarDocumentosString[i].documento);
        Axios()
          .post("almacenar_documento", data, {
            headers: headers,
          })
          .then((respuesta) => {

            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Documentos Agregados",
                text: "Se Agregaron " + this.listarDocumentosString.length + " Documentos",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
              this.cont = this.listarDocumentosString.length;
              this.prueba = this.listarDocumentos;
            } else {
              Swal.fire({
                title: "No se Agregaron los Documentos",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
            }

            this.listarDocumentos.push(respuesta.data.results);
            this.$emit('envioDocs', this.listarDocumentos);
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
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.ListarDocs();
        }
      });
    }
    // onClick() {      
    //   this.$emit('clicks', this.listarDocumentosString);
    // }
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