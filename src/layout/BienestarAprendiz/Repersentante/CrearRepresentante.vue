<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">CREAR REPRESENTANTE</h1>
      </div>
      <div class="card-body row">
        <div class="col-12 col-md-8 mx-auto">
          <div class="d-flex">
            <input
              v-model="representante.identificacion"
              @keyup.delete="limpiarDatosRepresentante()"
              class="form-control"
              placeholder="Numero de Documento*"
              addon-left-icon=""
              name="numero_document"
              id="numero_document"
              v-validate="'required'"
              type= "number"
            >
           
            <button
              class="btn btn-azul-sena col-1 "
              @click="obtenerPersona(representante.identificacion)"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
          <small
            v-show="errors.has('identificacion')"
            class="text-danger font-weigth-bold"
          >
            {{ errors.first("identificacion") }}
          </small>
        </div>
        <div
          v-if="btnbuscar == true && representante.identificacion != ''"
          class="col-12 col-md-8 mx-auto"
        >
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Nombres:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ representante.primer_nombre }}
                  {{ representante.segundo_nombre }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Apellidos:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{
                    representante.primer_apellido +
                    " " +
                    representante.segundo_apellido
                  }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Numero de Documento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ representante.identificacion }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Modalidad:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ representante.modalidad }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Jornada:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ representante.jornada }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Nombre de Ficha:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ representante.programa_formacion }}</p>
              </div>
            </div>
          </div>

          <!-- Volver lista de usuario -->
        </div>
      </div>
       <div class="text-center card-footer" v-if="estadoPeticionRegistrar">
        <AnimacionCargando></AnimacionCargando>
      </div>
      <div class="card-footer" v-if="!estadoPeticionRegistrar">
        <div class="row justify-content-center">
          <div
            v-show="representante.primer_nombre != ''"
            class="col-lg-4 col-sm-12 mt-1"
          >
            <base-button
              type="azul-sena"
              @click="almacenarRepresentante()"
              class="btn btn-block"
            >
              Crear
            </base-button>
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
</template>

<script lang="ts">
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import AnimacionCargando from "../../../components/animacionCargando.vue";
@Component({
  components: {
    AnimacionCargando
  },
})
export default class CrearRepresentante extends Vue {
  crearRrepresentante: any = null;
  estadoPeticionRegistrar = false;
  ver: any = true;
  crear: any = true;
  representante = {
    id_persona: null,
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    identificacion: null,
    modalidad: "",
    jornada: "",
    programa_formacion: "",
    id_ficha_caracterizacion: null,
  };
  btnbuscar = false;

  mounted() {
    this.ver = this.$route.params.ver;
    this.crear = this.$route.params.crear;
    this.representante.id_persona = this.$route.params.id;
  }
  obtenerPersona(id) {
    Axios()
      .post("crear_representante", { identificacion: id })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.representante = respuesta.data.results;
          this.btnbuscar = true;
        } else {
          Swal.fire({
            title: "No se encontró la persona",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            text: "El número de identificación no corresponde a una persona registrada en el sistema.",
          }).then(() => {
            this.$router.back();
          });
        }
      });
  }

  almacenarRepresentante() {
    this.estadoPeticionRegistrar = true;
    Axios()
      .post("almacenar_representante", {
        persona_id: this.representante.id_persona,
        ficha_caracterizacion_id: this.representante.id_ficha_caracterizacion,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Representante registrado!",
            text: "Nuevo representante ha sido registrado exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.$router.push({ name: "Representantes" });
        } else {
          Swal.fire({
            title: "Representante No registrado!",
            text: respuesta.data.message,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          }).then(() => {
            this.$router.push({ name: "Representantes" });
          });
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
        this.estadoPeticionRegistrar = false;
      });
  }
  limpiarDatosRepresentante() {
    this.btnbuscar = false;
    this.representante.id_persona = null;
    this.representante.primer_nombre = "";
    this.representante.segundo_nombre = "";
    this.representante.primer_apellido = "";
    this.representante.segundo_apellido = "";
    this.representante.tipo_documento = "";
    this.representante.modalidad = "";
    this.representante.jornada = "";
    this.representante.programa_formacion = "";
    this.representante.id_ficha_caracterizacion = null;
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        ({
          params: { id: this.crearRrepresentante, ver: "true", crear: "true" },
        });
      }
    });
  }
}
</script>

<style scoped></style>
