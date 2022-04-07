<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER COLEGIO</h1>
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
                <strong>Colegio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.colegio }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Zona:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.zona }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Calendario:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.calendario }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Estado:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.estado }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Genero:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.genero }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Resguardo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.resguardo }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Secretaria:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.secretaria }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Sector:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.sector }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Jornada:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.jornadas }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Municipio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.municipio }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Rector:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.rector }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Dirección:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.direccion }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Telefono:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.telefono }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Código dane:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.cod_dane }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Sedes:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.sedes }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Correo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ colegio.correo }}</p>
              </div>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Licencia:</strong>
              </div>
              <base-button
                title="Ver Licencia"
                tooltip="Ver Licencia"
                tooltip-flow="top"
                type="azul-sena"
                @click="mirarModal()"
                class="btn btn-sm bg-azul-sena text-white space"
                ><i class="fas fa-eye"></i
              ></base-button>
            </div>
          </div> -->
          <!-- modal -->
          <!-- <div class="container" id="modal">
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
                  Minuta
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
                name: 'GestionarColegio',
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
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class VerDetalleColegio extends Vue {
  estadoPeticion = false;
  rutadocumento = null;
  verModal = false;

  colegio = {
    id_colegio: "",
    id_colegio_modalidad: "",
    colegio_modalidad: "",
    zona_id: "",
    zona: "",
    id_jornada: "",
    jornada: "",
    municipio_id: "",
    municipio: "",
    primer_nombre: "",
    coord_persona_id: "",
    rector_persona_id: "",
    // 'personas.id_persona',
    // 'personas.primer_nombre',
    // 'personas.id_persona',
    // 'rector.segundo_nombre',
    colegio: "",
    nit: "",
    direccion: "",
    telefono: "",
    cod_dane: "",
    licencia: "",
    sector_colegio: "",
    secretaria_id: "",
    estado: "",
    resguardo: "",
    correo: "",
    calendario: "",
    genero: "",
    sedes: "",
    jornadas: "",
    rector: "",
  };
  mounted() {
    this.obtenerColegio(this.$route.params.id);
  }

  obtenerColegio(id) {
    Axios()
      .get("ver_detalle_colegio/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.colegio = respuesta.data.results;
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

  mostrarDocumento(id_colegio) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/ver_certificado_licencia/" +
      id_colegio;
  }
}
</script>
