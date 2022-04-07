<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR SENSIBILIZACIÓN</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Id -->

                <div class="card-body">
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <!-- Fecha socilizacion -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Fecha socialización
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
                          placeholder="resultados"
                          v-model="sensibilizacion.resultados"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('resultados')"
                        class="text-danger"
                      >
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
                          placeholder="compromisos"
                          v-model="sensibilizacion.compromisos"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('compromisos')"
                        class="text-danger"
                      >
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
                          Seleccioné la prioridad uno
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
                          Seleccioné la prioridad dos
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
                        Cantidad asistentes
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
                          placeholder="cantidad asistentes"
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

                    <!-- convenio -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Convenio
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <select
                        class="form-control"
                        id="convenio_id"
                        name="convenio_id"
                        v-model="sensibilizacion.convenio_id"
                        v-validate="{ required: true }"
                      >
                        <option
                          :value="sensibilizacion.convenio_id"
                          selected
                          disabled
                        >
                          {{ sensibilizacion.convenio }}
                        </option>
                        <option
                          v-for="(listaconv, index) in lista_convenio"
                          :key="index"
                          :value="listaconv.id_convenio"
                        >
                          {{ listaconv.convenio }}
                        </option>
                      </select>
                      <small
                        v-show="errors.has('convenio_id')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("convenio_id") }}
                      </small>
                    </div>
                    <!-- fin convenio -->
                  </div>
                </div>
              </tabs>
            </div>
            <br />
          </div>
          <!-- Fin Contenido -->
        </div>
        <div class="card-footer">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1">
              <base-button
                type="azul-sena"
                @click="modificarSensibilizacion()"
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
      <!-- </div> -->

      <!-- <div class="card-body"> -->
    </div>
    <!-- </div> -->
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionTablasCargando from "../../../../components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionTablasCargando,
  },
})
export default class Modificarsensibilizacion extends Vue {
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
    url_acta_sensibilizacion: "",
    url_carta_intension: "",
    url_asistencia: "",
    cantidad_asistentes: "",
    convenio_id: "",
  };

  filter = "";
  listaProgramas: any[] = [];
  listaProgramasFiltrado: any[] = [];
  programasProyectTemp: any[] = [];
  // agregarPrograma = "";

  programa = "";
  todosProgramas = "";
  estadoPeticionTabla = false;

  paginate = ["listaProgramasFiltrado"];

  mounted() {
    this.obtenerConvenio();
    this.obtenerRedConocimiento();
    this.obtenerSensibilizacion(this.$route.params.id);
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

  obtenerSensibilizacion(id) {
    Axios()
      .get("ver_detalle_sensibilizacion/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.sensibilizacion = respuesta.data.results;
          //   this.mostrarActaSensibilizacion(id);
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  modificarSensibilizacion() {
    this.estadoPeticion = true;
    // var data = new FormData();

    // Añadimos la docinscrip seleccionada
    // data.append("fecha_socilizacion", this.sensibilizacion.fecha_socilizacion);
    // data.append("resultados", this.sensibilizacion.resultados);
    // data.append("compromisos", this.sensibilizacion.compromisos);
    // data.append("prioridad_uno", this.sensibilizacion.prioridad_uno);
    // data.append("prioridad_dos", this.sensibilizacion.prioridad_dos);
    // data.append("cantidad_asistentes",this.sensibilizacion.cantidad_asistentes);
    // data.append("convenio_id", this.sensibilizacion.convenio_id);
    // const headers = {
    //   "Content-Type": "multipart/form-data",
    // };
    Axios()
      .post(
        "modificar_sensibilizacion/" +
          this.sensibilizacion.id_sensibilizacion_convenio,
        this.sensibilizacion
      )
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          // this.modalBuscarColegio = false;
          Swal.fire({
            title: "Sensibilización Modificada",
            text: "Se guardo la sensibilización",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.registrarColegios(respuesta.data.results.id_convenio);
          this.$router.push({ name: "GestionarSensibilizacion" });
        } else {
          Swal.fire("ERROR!", "No se Guardo la sensibilizacion", "error");
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

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.modificarSensibilizacion();
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

  obtenerRedConocimiento() {
    Axios()
      .get("listar_red_conocimiento")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_prioridad_uno = respuesta.data.results;
        }
      });
  }
}
</script>
