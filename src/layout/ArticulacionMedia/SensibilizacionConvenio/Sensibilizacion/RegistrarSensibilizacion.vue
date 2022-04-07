<template>
  <div>
    <!-- Contenido -->
    <div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <!-- Fecha socilizacion -->
          <div>
            <label class="mt-2 font-weight-bold"
              >Fecha socialización
              <span class="text-danger">*</span>
              :
            </label>
            <div>
              <input
                type="date"
                class="form-control"
                name="fecha_socilizacion"
                id="fecha_socilizacion"
                v-model="sensibilizacion.fecha_socilizacion"
                v-validate="{ required: true }"
              />
              <small
                v-show="errors.has('fecha_socilizacion')"
                class="text-danger"
              >
                {{ errors.first("fecha_socilizacion") }}
              </small>
            </div>
          </div>
          <!-- fin Fecha socilizacion -->

          <!-- resultados -->
          <div>
            <label class="font-weight-bold">Resultados</label
            ><span
              class="text-danger"
              tooltip="Campo Requerido"
              tooltip-flow="top"
              >*</span
            >:
            <div class="input-group">
              <input
                type="text"
                name="resultados"
                class="form-control"
                id="resultados"
                placeholder="Resultados"
                v-model="sensibilizacion.resultados"
                v-validate="{ required }"
              />
            </div>
            <small v-show="errors.has('resultados')" class="text-danger">
              {{ errors.first("resultados") }}
            </small>
          </div>
          <!-- fin resultados -->

          <!-- compromisos -->
          <div>
            <label class="font-weight-bold">Compromisos</label
            ><span
              class="text-danger"
              tooltip="Campo Requerido"
              tooltip-flow="top"
              >*</span
            >:
            <div class="input-group">
              <input
                type="text"
                name="compromisos"
                class="form-control"
                id="compromisos"
                placeholder="Compromisos"
                v-model="sensibilizacion.compromisos"
                v-validate="{ required }"
              />
            </div>
            <small v-show="errors.has('compromisos')" class="text-danger">
              {{ errors.first("compromisos") }}
            </small>
          </div>
          <!-- fin compromisos -->

          <!-- prioridad uno -->
          <div>
            <label class="mt-2 font-weight-bold">
              Prioridad uno
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:
            </label>
            <select
              class="form-control"
              id="prioridad_uno"
              name="prioridad_uno"
              v-model="sensibilizacion.prioridad_uno"
              v-validate="{ required: true }"
            >
              <option value="" selected disabled>
                Seleccione la prioridad uno
              </option>
              <option
                v-for="(listauno, index) in lista_prioridad_uno"
                :key="index"
                :value="listauno.id_red_conocimiento"
              >
                {{ listauno.red_conocimiento }}
              </option>
            </select>
            <small
              v-show="errors.has('prioridad_uno')"
              class="text-danger font-weigth-bold"
            >
              {{ errors.first("prioridad_uno") }}
            </small>
          </div>
          <!-- fin prioridad uno -->

          <!-- prioridad uno -->
          <div>
            <label class="mt-2 font-weight-bold">
              Prioridad dos
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:
            </label>
            <select
              class="form-control"
              id="prioridad_dos"
              name="prioridad_dos"
              v-model="sensibilizacion.prioridad_dos"
              v-validate="{ required: true }"
            >
              <option value="" selected disabled>
                Seleccione la prioridad dos
              </option>
              <option
                v-for="(listajo, index) in lista_prioridad_uno"
                :key="index"
                :value="listajo.id_red_conocimiento"
              >
                {{ listajo.red_conocimiento }}
              </option>
            </select>
            <small
              v-show="errors.has('prioridad_dos')"
              class="text-danger font-weigth-bold"
            >
              {{ errors.first("prioridad_dos") }}
            </small>
          </div>
          <!-- fin prioridad uno -->

          <!-- asistentes -->
          <div>
            <label class="mt-2 font-weight-bold">
              Numero asistentes
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:
            </label>
            <div class="input-group">
              <input
                type="number"
                name="cantidad_asistentes"
                class="form-control"
                v-model="sensibilizacion.cantidad_asistentes"
                placeholder="Numero asistentes"
                v-validate="{ required }"
              />
            </div>
            <small
              v-show="errors.has('cantidad_asistentes')"
              class="text-danger font-weigth-bold"
            >
              {{ errors.first("cantidad_asistentes") }}
            </small>
          </div>
          <!--  fin asistentes -->
        </div>
      </div>
      <div class="mt-3">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <div v-if="idSensibilizacion == ''">
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
                  * Se ha Agregado la sensibilización
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

  @Component({
    components: {
    },
  })
  export default class Sensibilizacion extends Vue {
    id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
    id_convenio = null;

    estadoPeticion = false;
    lista_prioridad_uno: any[] = [];
    lista_convenio: any[] = [];

    sensibilizacion = {
      id_sensibilizacion_convenio: "",
      fecha_socilizacion: "",
      resultados: "",
      compromisos: "",
      prioridad_uno: "",
      prioridad_dos: "",
      cantidad_asistentes: "",
      convenio_id: "",
    };

    idSensibilizacion = "";

    mounted() {
      this.sensibilizacion.convenio_id = this.$route.params.id_convenio;
      this.obtenerConvenio();
      this.obtenerRedConocimiento();
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

    obtenerRedConocimiento() {
      Axios()
        .get("listar_red_conocimiento")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.lista_prioridad_uno = respuesta.data.results;
          }
        });
    }

    registrarSensibilizacion() {
      this.estadoPeticion = true;
      Axios()
        .post("almacenar_sensibilizacion", this.sensibilizacion)
        .then((respuesta) => {
          if ((respuesta.data.status = "success")) {            
            // this.modalBuscarColegio = false;
            Swal.fire({
              title: "Sensibilizacion Agregada",
              text: "Se Agrego la Viabilidad",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });

            this.idSensibilizacion = respuesta.data.results.id_sensibilizacion_convenio;

            this.$emit('envioSensibilizacion', this.idSensibilizacion);
            
            // this.$router.push({ name: "GestionarViabilidad" });
          } else {
            Swal.fire("ERROR!", "No se Agrego La Sensibilizacion", "error");
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
          this.registrarSensibilizacion();
        }
      });
    }
  }
</script>