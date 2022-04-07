<template>
  <div>
    <!-- Contenido -->
    <div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div>
            <label class="mt-2 font-weight-bold">
              Colegio
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
              >
                *
              </span>
              :
            </label>
            <div class="input-group">
              <select
                name="colegio"
                id="colegio"
                class="form-control mb-3"
                v-model="viabilidad.colegio_id"
              >
                <option value="" selected >
                  Seleccione el Colegio
                </option>
                <option
                  v-for="(colegio, index) in colegiosConvenio"
                  :value="colegio.colegio_id"
                  :key="index"
                >
                  {{ colegio.colegio }}
                </option>
              </select>
            </div>
            <small
              v-show="errors.has('colegio')"
              class="text-danger font-weigth-bold"
            >
              {{ errors.first("colegio") }}
            </small>
          </div>
          <div>
            <label class="mt-2 font-weight-bold">
              Apto
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:
            </label>
            <div class="input-group">
              <!-- <input
                type="text"
                name="colegio_cargo"
                id="colegio_cargo"
                class="form-control"
                v-model="viabilidad.apto"
                placeholder="Apto"
                v-validate="{ required: true }"
              /> -->
            </div>
            <template>
              <div class="d-flex flex-column">
                <label class="custom-toggle text-naranja-sena">
                  <input
                    type="checkbox"
                    v-model="apto"
                    :checked="viabilidad.apto == 1"
                  />
                  <span
                    class="custom-toggle-slider rounded-circle"
                    style="width: 50px;"
                    @click="preguntaCheck"
                  ></span>
                  <p
                    v-if="viabilidad.apto == 0"
                    class="text-dark font-weight-500 ml-5 pl-1"
                    style="width: 30px;"
                  >
                    NO
                  </p>
                  <p
                    v-else
                    class="text-dark font-weight-500 ml-5 pl-1"
                    style="width: 30px;"
                  >
                    SI
                  </p>
                </label>
              </div>
            </template>
            <small
              v-show="errors.has('colegio_cargo')"
              class="text-danger font-weigth-bold"
            >
              {{ errors.first("colegio_cargo") }}
            </small>
          </div>
          <div>
            <label class="mt-2 font-weight-bold"
              >Fecha<span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="date"
                class="form-control"
                name="fecha_firma"
                v-model="viabilidad.fecha"
                id="fecha_firma"
                v-validate="{ required: true }"
              />
              <small v-show="errors.has('fecha_firma')" class="text-danger">
                {{ errors.first("fecha_firma") }}
              </small>
            </div>
          </div>
        </div>
        <!-- Fin Forms -->
      </div>
      <div class="mt-3">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <div v-if="idViabilidad == ''">
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
                  * Se ha Agregado la viabilidad
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Fin Contenido -->
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  import Component from "vue-class-component";
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import Multiselect from "vue-multiselect";

  @Component({
    components: {
      Multiselect
    },
  })
  export default class Viabilidad extends Vue {

    id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

    listaColegios: any[] = [];
    lista_regionales: any[] = [];
    listaCentroFormacion: any[] = [];
    lista_convenio: any[] = [];
    varray: any[] = [];
    apto = true;
    docValido = false;
    estadoPeticion = false;

    modalBuscarColegio = false;
    lista_municipios = null;
    departamento_actual = null;
    lista_departamentos: any[] = [];
    // Sena persona datos
    infoSenaPersona = "";
    modalSenaPersona = false;
    // identificacionSenaPersona = "";
    buscarSenaPersona;

    colegioPrograma = {};

    convenio = {
      id_convenio: null,
      convenio: "",
      regional_id: "",
      regional: "",
      centro_formacion_id: "",
      sena_persona_id: "",
      numero_convenio: "",
      fecha_firma: "",
      fecha_inicio: "",
      fecha_final: "",
      sena_cargo: "",
      colegio_cargo: "",
      minuta: null,
      municipio_id: "",
    };
    viabilidad = {
      id_viabilidad: "",
      convenio_id: "",
      convenio: "",
      colegio_id: "",
      colegio: "",
      apto: 1,
      fecha: "",
    };

    colegio: any[] = [];
    colegioEscogido: any[] = [];
    colegiosConvenio: any[] = [];

    idViabilidad = "";

    mounted() {
      this.viabilidad.convenio_id = this.$route.params.id_convenio;
      this.obtenerDepartamento();
      // this.obtenerColegios();
      this.obtenerConvenio();
      this.obtenerColegiosCovenio(this.$route.params.id_convenio);
      this.docsEmmit(event);
    }

    docsEmmit($event) {
      // alert($event);
    }
    obtenerColegiosCovenio(id_convenio) {
      Axios()
        .get("listarColegiosConvenio/" + id_convenio)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.colegiosConvenio = respuesta.data.results;
          }
        });
    }

    preguntaCheck() {
      this.viabilidad.apto = this.viabilidad.apto == 0 ? 1 : 0;
    }
    //--------------------------------------------------------------------
    registrarViabilidad() {
      this.estadoPeticion = true;
      Axios()
        .post("almacenar_viabilidad", this.viabilidad)
        .then((respuesta) => {
          if ((respuesta.data.status = "success")) {
            // this.modalBuscarColegio = false;
            Swal.fire({
              title: "Viabilidad Agregada",
              text: "Se Agrego la Viabilidad",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });

            this.idViabilidad = respuesta.data.results.id_viabilidad;

            this.$emit('envioViabilidad', this.idViabilidad);
            // this.$router.push({ name: "GestionarViabilidad" });
          } else {
            Swal.fire("ERROR!", "No se Agrego La viabilidad", "error");
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

    obtenerMunicipio(id) {
      Axios()
        .get("listar_municipios/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.lista_municipios = respuesta.data.results.municipios;
          } else {
            Swal.fire({
              title: respuesta.data.message,
            });
          }
        });
    }

    obtenerDepartamento() {
      Axios()
        .get("listar_departamentos/57")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.lista_departamentos = respuesta.data.results;
          } else {
            Swal.fire({
              title: respuesta.data.message,
            });
          }
        });
    }

    obtenerConvenio() {
      Axios()
        .get("listar_convenio")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.lista_convenio = respuesta.data.results;
          }
        });
    }

    obtenerColegios() {
      Axios()
        .get("listar_colegios_municipios/" + this.convenio.municipio_id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaColegios = respuesta.data.results;
          } else {
            Swal.fire({
              title: respuesta.data.message,
            });
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
          min_value: () => "El valor no puede ser menor a cero",
          email: () => "El correo no es válido",
          alpha_spaces: () => "No permite numeros ni caracteres especiales",
          alpha_num: () => "No permite caracteres especiales",
        },
      };
      this.$validator.localize("es", dict);
    }

    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          this.registrarViabilidad();
        }
      });
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

  .texto {
    text-align: center !important;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>