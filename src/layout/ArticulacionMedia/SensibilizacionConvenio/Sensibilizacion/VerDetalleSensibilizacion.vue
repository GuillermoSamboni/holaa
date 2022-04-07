<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER SENSIBILIZACIÓN</h1>
        <!-- <div class="row">
          <div>
            <small class="text-azul-sena mr-1">
              {{ convenio }}
            </small>
          </div>
        </div> -->
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
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>fecha socilizacion:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ sensibilizacion.fecha_socilizacion }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>resultados:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ sensibilizacion.resultados }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>compromisos:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ sensibilizacion.compromisos }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>prioridad uno:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ sensibilizacion.red_prioridad_uno }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>prioridad dos:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ sensibilizacion.red_prioridad_dos }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>cantidad asistentes:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ sensibilizacion.cantidad_asistentes }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>convenio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ sensibilizacion.convenio }}</p>
              </div>
            </div>
            <!-- <div class="col-sm-12 col-md-6 col-lg-4">
              <div>
                <strong>acta sensibilizacion:</strong>
              </div>
              <base-button
                title="Ver acta sensibilizacion"
                tooltip="Ver acta sensibilizacion"
                tooltip-flow="top"
                type="azul-sena"
                @click="mirarActaSensibilizacion()"
                class="btn btn-sm bg-azul-sena text-white space"
                ><i class="fas fa-eye"></i
              ></base-button>
            </div> -->
            <!-- <div class="col-sm-12 col-md-6 col-lg-3">
              <div>
                <strong>carta intension:</strong>
              </div>
              <base-button
                title="Ver carta intension"
                tooltip="Ver carta intension"
                tooltip-flow="top"
                type="azul-sena"
                @click="mirarCartaIntencion()"
                class="btn btn-sm bg-azul-sena text-white space"
                ><i class="fas fa-eye"></i
              ></base-button>
            </div> -->
          </div>

          <!-- <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-5">
              <div>
                <strong>asistencia:</strong>
              </div>
              <base-button
                title="Ver asistencia"
                tooltip="Ver asistencia"
                tooltip-flow="top"
                type="azul-sena"
                @click="mirarModal()"
                class="btn btn-sm bg-azul-sena text-white space"
                ><i class="fas fa-eye"></i
              ></base-button>
            </div>
          </div> -->

          <!-- modal -->
          <!-- <div class="container" id="modalA">
            <modal
              :show.sync="verModalActaSensibilizacion"
              body-classes="p-0"
              modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
            >
              <template slot="header">
                <h2
                  class="text-azul-sena modal-title"
                  id="modalAnexoJustificacion"
                >
                  Acta Sensibilizacion
                </h2>
              </template>
              <card type="white" shadow class="border-0">
                <div id="contenido">
                  <embed
                    :src="rutadocumentoActaSensibilizacion"
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                </div>
              </card>
            </modal>
          </div> -->
          <!-- modal fin-->

          <!-- modal -->
          <!-- <div class="container" id="modal">
            <modal
              :show.sync="verModalCartaIntencion"
              body-classes="p-0"
              modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
            >
              <template slot="header">
                <h2 class="text-azul-sena modal-title" id="cartaintension">
                  carta intension
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
                    :src="rutadocumentoCartaIntencion"
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                </div>
              </card>
            </modal>
          </div> -->
          <!-- modal fin-->
        </div>
      </div>

      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarSensibilizacion',
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
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import AnimacionCargando from "../../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class VerDetalleColegio extends Vue {
  estadoPeticion = false;

  rutadocumentoActaSensibilizacion = null;
  verModalActaSensibilizacion = false;

  rutadocumentoCartaIntencion = null;
  verModalCartaIntencion = false;

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
  mounted() {
    this.obtenerSensibilizacion(this.$route.params.id);
  }

  obtenerSensibilizacion(id) {
    Axios()
      .get("ver_detalle_sensibilizacion/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.sensibilizacion = respuesta.data.results;
          this.mostrarActaSensibilizacion(id);
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  mirarActaSensibilizacion() {
    this.verModalActaSensibilizacion = true;
  }
  mirarCartaIntencion() {
    this.verModalCartaIntencion = true;
  }

  mostrarActaSensibilizacion(id_sensibilizacion_convenio) {
    this.rutadocumentoActaSensibilizacion =
      "https://develdfp.cloudsenactpi.net/api/ver_acta_sensibilizacion/" +
      id_sensibilizacion_convenio;
  }
  mostrarCartaIntencion(id_sensibilizacion_convenio) {
    this.rutadocumentoCartaIntencion =
      "https://develdfp.cloudsenactpi.net/api/ver_carta_intension/" +
      id_sensibilizacion_convenio;
  }
}
</script>
