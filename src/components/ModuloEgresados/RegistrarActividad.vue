<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena"></h1>
        <div class="d-flex justify-content-around mt-3">
          <h3 class="circle circle-seleccionado">1</h3>
          <h3 class="circle">2</h3>
          <h3 class="circle">3</h3>
        </div>
      </div>
      <div class="card-body">
        <!-- Accion o Actividad -->
        <div id="campo">
          <label class="mt-2 font-weight-bold"
            >Actividad <span class="text-danger">*</span>:</label
          >
          <div>
            <textarea
              class="form-control mb-3"
              v-model="actividad.actividad"
              name="actividad"
              id="actividad"
              v-validate="'required'"
            ></textarea>
            <small v-show="errors.has('actividad')" class="text-danger"
              >{{ errors.first("actividad") }}
            </small>
          </div>
        </div>
        <!-- Resultado esperado -->
        <div id="campo">
          <label class="mt-2 font-weight-bold"
            >Resultado esperado <span class="text-danger">*</span>:</label
          >
          <div>
            <textarea
              class="form-control mb-3"
              v-model="actividad.resultado_esperado"
              name="resultadoEsperado"
              id="resultadoEsperado"
              v-validate="'required'"
            ></textarea>
            <small v-show="errors.has('resultadoEsperado')" class="text-danger"
              >{{ errors.first("resultadoEsperado") }}
            </small>
          </div>
        </div>
        <!-- Seguimiento -->
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <!-- Herramienta 1 -->
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Herramienta de seguimiento 1<span class="text-danger">*</span
                >:</label
              >
              <div>
                <select
                  class="form-control"
                  name="herramienta1"
                  v-validate="'required'"
                  v-model="actividad.id_herramienta_seguimiento1"
                >
                  <option value="" selected disabled>
                    Seleccionar la herramienta
                  </option>
                  <option
                    v-for="(herramienta, key) in herramientas"
                    :key="key"
                    v-bind:value="herramienta.id_herramienta_seguimiento"
                  >
                    {{ herramienta.herramienta_seguimiento }}
                  </option>
                </select>
                <small v-show="errors.has('herramienta1')" class="text-danger">
                  {{ errors.first("herramienta1") }}
                </small>
              </div>
            </div>
            <!-- Observación 1-->
            <div id="campo">
              <label class="mt-2 font-weight-bold"
                >Observación 1 <span class="text-danger">*</span>:</label
              >
              <div>
                <textarea
                  class="form-control mb-3"
                  v-model="actividad.observacion1"
                  name="observacion1"
                  id="observacion1"
                  v-validate="'required'"
                ></textarea>
                <small v-show="errors.has('observacion1')" class="text-danger"
                  >{{ errors.first("observacion1") }}
                </small>
              </div>
            </div>
            <!-- Periodicidad 1 -->
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Periodicidad 1<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="periodicidad1"
                  v-validate="'required'"
                  v-model="actividad.id_periodicidad1"
                >
                  <option value="" selected disabled>
                    Seleccionar la Periodicidad
                  </option>
                  <option
                    v-for="(periodo, key) in periodicidades"
                    :key="key"
                    v-bind:value="periodo.id_periodicidad"
                  >
                    {{ periodo.periodicidad }}
                  </option>
                </select>
                <small v-show="errors.has('periodicidad1')" class="text-danger">
                  {{ errors.first("periodicidad1") }}
                </small>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <!-- Herramienta 2 -->
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Herramienta de seguimiento 2:</label
              >
              <div>
                <select
                  class="form-control"
                  name="herramienta1"
                  v-model="actividad.id_herramienta_seguimiento2"
                >
                  <option value="" selected disabled>
                    Seleccionar la herramienta
                  </option>
                  <option
                    v-for="(herramienta, key) in herramientas"
                    :key="key"
                    v-bind:value="herramienta.id_herramienta_seguimiento"
                  >
                    {{ herramienta.herramienta_seguimiento }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Observación 2-->
            <div id="campo">
              <label class="mt-2 font-weight-bold">Observación 2:</label>
              <div>
                <textarea
                  class="form-control mb-3"
                  v-model="actividad.observacion2"
                  name="observacion2"
                  id="observacion2"
                ></textarea>
              </div>
            </div>
            <!-- Periodicidad 2 -->
            <div id="campo">
              <label class="font-weight-bold mt-2">Periodicidad 2:</label>
              <div>
                <select
                  class="form-control"
                  name="periodicidad2"
                  v-model="actividad.id_periodicidad2"
                >
                  <option value="" selected disabled>
                    Seleccionar la Periodicidad
                  </option>
                  <option
                    v-for="(periodo, key) in periodicidades"
                    :key="key"
                    v-bind:value="periodo.id_periodicidad"
                  >
                    {{ periodo.periodicidad }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- Roles operativos -->
        <div class="row">
          <!-- Rol estrategico -->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Rol Estrategico<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="rolEstrategico"
                  v-validate="'required'"
                  v-model="actividad.id_rol_estrategico"
                >
                  <option value="" selected disabled>Rol estrategico</option>
                  <option
                    v-for="(rolE, key) in rolesEstrategicos"
                    :key="key"
                    v-bind:value="rolE.id_rol_operativo"
                  >
                    {{ rolE.rol_operativo }}
                  </option>
                </select>
                <small
                  v-show="errors.has('rolEstrategico')"
                  class="text-danger"
                >
                  {{ errors.first("rolEstrategico") }}
                </small>
              </div>
            </div>
          </div>

          <div class="col-g-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Dir. General<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="rolGeneral"
                  v-validate="'required'"
                  v-model="actividad.id_rol_general"
                >
                  <option value="" selected disabled>
                    Rol de dirección general
                  </option>
                  <option
                    v-for="(rolG, key) in rolesGeneral"
                    :key="key"
                    v-bind:value="rolG.id_rol_operativo"
                  >
                    {{ rolG.rol_operativo }}
                  </option>
                </select>
                <small v-show="errors.has('rolGeneral')" class="text-danger">
                  {{ errors.first("rolGeneral") }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- Respondable regional -->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Regional<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="rolRegional"
                  v-validate="'required'"
                  v-model="actividad.id_rol_regional"
                >
                  <option value="" selected disabled>Rol regional</option>
                  <option
                    v-for="(rolR, key) in rolesRegional"
                    :key="key"
                    v-bind:value="rolR.id_rol_operativo"
                  >
                    {{ rolR.rol_operativo }}
                  </option>
                </select>
                <small v-show="errors.has('rolRegional')" class="text-danger">
                  {{ errors.first("rolRegional") }}
                </small>
              </div>
            </div>
          </div>
          <!-- Respondable centro -->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Centro<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="rolCentro"
                  v-validate="'required'"
                  v-model="actividad.id_rol_centro"
                >
                  <option value="" selected disabled>
                    Rol centro de formación
                  </option>
                  <option
                    v-for="(rolC, key) in rolesCentro"
                    :key="key"
                    v-bind:value="rolC.id_rol_operativo"
                  >
                    {{ rolC.rol_operativo }}
                  </option>
                </select>
                <small v-show="errors.has('rolCentro')" class="text-danger">
                  {{ errors.first("rolCentro") }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- anexos - glosario -->
        <div class="row">
          <!-- Anexo -->
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div id="campo">
              <label class="mt-2 font-weight-bold">Anexo:</label>
              <div>
                <textarea
                  class="form-control mb-3"
                  v-model="actividad.anexo"
                  name="Anexo"
                  id="Anexo"
                ></textarea>
              </div>
            </div>
          </div>
          <!-- Glosario -->
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div id="campo">
              <label class="mt-2 font-weight-bold">Glosario:</label>
              <div>
                <textarea
                  class="form-control mb-3"
                  v-model="actividad.glosario"
                  name="Glosario"
                  id="Glosario"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click.prevent="validarFormulario()"
              class="btn btn-block bg-azul-sena text-white"
              >Registrar</base-button
            >
          </div>
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarPANE',
              }"
            >
              Volver
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
export default {
  name: "CrearActividad",

  mounted() {
    this.cargarDatos();
  },
  created() {
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "No pude ser negativo",
        max: () =>
          "La suma de los cupos no puede ser mayor a " +
          this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  },
  data: function () {
    return {
      herramientas: [],
      periodicidades: [],
      rolesEstrategicos: [],
      rolesGeneral: [],
      rolesRegional: [],
      rolesCentro: [],
      actividad: {
        id_herramienta_seguimiento1: "",
        id_periodicidad1: "",
        observacion1: "",
        id_herramienta_seguimiento2: "",
        id_periodicidad2: "",
        observacion2: "",
        id_rol_estrategico: "",
        id_rol_general: "",
        id_rol_regional: "",
        id_rol_centro: "",
        actividad: "",
        resultado_esperado: "",
        anexo: "",
        glosario: "",
      },
    };
  },
  methods: {
    cargarDatos() {
      Axios()
        .get("crear_actividad")
        .then((respuesta) => {
          this.herramientas = respuesta.data.results.herramientas;
          this.periodicidades = respuesta.data.results.periodicidad;
          this.rolesEstrategicos = respuesta.data.results.rolEstrategico;
          this.rolesGeneral = respuesta.data.results.rolGeneral;
          this.rolesRegional = respuesta.data.results.rolRegional;
          this.rolesCentro = respuesta.data.results.rolCentro;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          //   this.RegistrarActividad();
          this.registrarActividad();
        }
      });
    },
    registrarActividad() {
      Axios()
        .post("almacenar_actividad", this.actividad)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            Swal.fire({
              title: "Actividad registrada",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            const actividad_id = respuesta.data.results;
            this.$router.push({
              name: "RegistrarGrupoPANE",
              params: { actividad_id },
            });
          } else {
            Swal.fire({
              title: "Actividad no registrada",
              icon: "error",
              text: respuesta.message,
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
          }
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
  },
};
</script>





<style scoped >
.campos a {
  margin: 0%;

  width: 100%;
  font-size: 70%;
  text-align: center;
}

.campos {
  margin: 0%;
  padding: 0%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
.circle {
  font-size: 25px;
  padding: 10px 22px;
  border: 1px solid #238276;
  border-radius: 255px;
  color: #238276;
}
.circle-seleccionado {
  background-color: #238276;
  color: white;
}

@media (max-width: 970px) {
  .campos {
    display: grid;
    width: 80%;
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
    align-items: flex-start;
    text-align: center;
    justify-content: center;
  }
  .campos a {
    margin: 0%;

    width: 80%;
    margin-right: 2px;
    font-size: 70%;
  }
}
</style>