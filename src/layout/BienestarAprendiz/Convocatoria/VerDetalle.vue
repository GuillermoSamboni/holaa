<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER CONVOCATORIA</h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div
          v-if="estadoPeticion"
          class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
        >
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Convocatoria:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.convocatoria }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- capacitación -->
              <div>
                <strong>Tipo de apoyo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.tipo_apoyo }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Fecha Inicio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.fecha_inicio_convoca }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- capacitación -->
              <div>
                <strong>Fecha Fin:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.fecha_final_convoca }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Cupos:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.cupo_total }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- capacitación -->
              <div>
                <strong>Estímulo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.estimulo_mensual }}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div id="campo" v-if="convocatoria.tipo_apoyo_id == 1">
                <div>
                  <strong>Tipos de Alimentación:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">
                    {{ tipoAlimentacion.tipo_alimentacion }}
                  </p>
                </div>
              </div>
              <div id="campo" v-if="convocatoria.tipo_apoyo_id == 2">
                <div>
                  <strong>Tipos de Transporte:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">
                    {{ tipoTransporte.tipo_transporte }}
                  </p>
                </div>
              </div>
            </div>
            <!-- {{convocatoria}} -->
            <!-- {{tipoAlimentacion}}
            {{tipoTransporte}} -->
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div
                id="campo"
                v-if="
                  convocatoria.tipo_transporte &&
                  tipoTransporte.id_tipo_transporte == 2
                "
              >
                <!-- <div id="campo"> -->
                <div>
                  <strong>Subtipo de Transporte:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">
                    {{ subtipoTransporte.tipo_transporte_personal }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="convocatoria.tipo_apoyo_id == 3">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Cupos hombres mayores:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.cupo_hombres_mayores }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Cupos hombres entre 14 y 17 años:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.cupo_hombres_14_17 }}
                </p>
              </div>
            </div>
          </div>

          <div class="row" v-if="convocatoria.tipo_apoyo_id == 3">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Cupos mujeres mayores:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.cupo_mujeres_mayores }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Cupos mujeres entre 14 y 17 años:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.cupo_mujeres_14_17 }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Fase:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ convocatoria.fase_bienestar_id }}
                </p>
              </div>
            </div>
          </div>
          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 4">
            <div>
              <strong>Tipos de Monitoria:</strong>
            </div>

            <ul class="list-group">
              <li
                class="list-group-item disabled"
                v-for="(lista, index) in tiposMonitoria"
                :key="index"
              >
                {{ lista.tipo_monitoria }}
              </li>
            </ul>
          </div>

          <div id="campo">
            <div>
              <strong>Medios de divulgación:</strong>
            </div>

            <ul class="list-group">
              <li
                class="list-group-item disabled"
                v-for="(medio, index) in convocatoria.medios_divulgacion"
                :key="index"
              >
                {{ medio.medio_divulgacion }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Volver lista de usuario -->
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div
            class="col-lg-4 col-sm-12 mt-1"
            v-if="convocatoria.fase_bienestar_id === 1"
          >
            <button
              type="button"
              class="btn btn-azul-sena btn-block"
              @click="iniciarInscripcion()"
            >
              Iniciar Inscripción
            </button>
          </div>
          <div
            class="col-lg-4 col-sm-12 mt-1"
            v-if="convocatoria.fase_bienestar_id === 2"
          >
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'Inscribir',
                params: { id: idConvocatoria },
              }"
            >
              Inscribir Aprendices
            </router-link>
          </div>

          <div
            class="col-lg-4 col-sm-12 mt-1"
            v-if="convocatoria.fase_bienestar_id == 3"
          >
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'AdjudicarApredizConvocatoria',
                params: { id: idConvocatoria },
              }"
            >
              Adjudicar
            </router-link>
          </div>

          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarConvocatoria',
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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "@/components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class ModificarPerfil extends Vue {
  tiposdeapoyo = [];
  tiposdemonitoria = [];
  tiposMonitoria: any[] = [];
  tipoAlimentacion: any[] = [];
  tipoTransporte: any[] = [];
  subtipoTransporte: any[] = [];

  estadoPeticion = false;
  idConvocatoria = null;

  convocatoria = {
    centro_formacion_id: "",
    centro_formación: "",
    convocatoria: "",
    cupo_hombres_14_17: null,
    cupo_hombres_mayores: null,
    cupo_instructores: null,
    cupo_mujeres_14_17: null,
    cupo_mujeres_mayores: null,
    cupo_total: null,
    estimulo_mensual: "",
    fase_bienestar: "",
    fase_bienestar_id: "",
    fecha_final_convoca: "",
    fecha_inicio_convoca: "",
    id_convocatoria: "",
    ruta_documento: "",
    tipo_apoyo: "",
    tipo_alimentacion_id: "",
    tipo_transporte_id: "",
    subtipo_transporte_id: "",
    tipo_apoyo_id: "",
    tipo_monitoria: "",
    tipo_monitoria_id: "",
  };

  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        // min: () => "Mínimo 8 caracteres",
        // email: () => "Correo invalido",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {
    this.idConvocatoria = this.$route.params.id;
    this.obtenerConvocatoria(this.$route.params.id);
    this.obtenerTiposMonitoria(this.$route.params.id);
  }

  obtenerTiposMonitoria(id) {
    Axios()
      .get("listar_convocatoria_tipos_monitorias/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.tiposMonitoria = respuesta.data.results;
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  obtenerConvocatoria(id) {
    Axios()
      .get("listar_convocatoria/" + id)
      .then((respuesta) => {
        this.convocatoria = respuesta.data.results;
        this.tipoAlimentacion = respuesta.data.results.tipo_alimentacion;
        this.tipoTransporte = respuesta.data.results.tipo_transporte;
        this.subtipoTransporte = respuesta.data.results.subtipo_transporte;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  iniciarInscripcion() {
    Axios()
      .put("actualizar_fase_convocatoria/" + this.idConvocatoria, {
        id_convocatoria: this.idConvocatoria,
        fase_bienestar_id: 2,
        id_actualiza: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Cambio de fase correcto!",
            text: "Se ha cambiado la fase de la convocatoria exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.$router.push("GestionarConvocatoria");
        }
        return respuesta.data;
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
</style>
