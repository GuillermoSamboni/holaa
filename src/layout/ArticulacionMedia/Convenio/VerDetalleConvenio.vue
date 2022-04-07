<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER CONVENIO</h1>
        <!-- <Documento/> -->
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
                <strong>Centro de formación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convenio.centro_formacion }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Regional:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convenio.regional }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Fase:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convenio.fase }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Colegio a cargo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convenio.colegio_cargo }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Sena cargo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convenio.sena_cargo }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Sena persona:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convenio.sena_persona_id }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Convenio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convenio.convenio }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Minuta:</strong>
              </div>
              <base-button
                title="Ver Minuta"
                tooltip="Ver Minuta"
                tooltip-flow="top"
                type="azul-sena"
                @click="mirarModal()"
                class="btn btn-sm bg-azul-sena text-white space"
                ><i class="fas fa-eye"></i
              ></base-button>
            </div>
          </div>
          <!-- modal -->
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
          </div>
          <!-- modal fin-->
        </div>
        <!-- <div class="col-sm-12 col-md-6 col-lg-6 center">
          <ul class="list-group">
            <li
              class="list-group-item disabled"
              v-for="(lista, index) in colegiosConvenio"
              :key="index"
            >
              {{ lista.colegio.toLowerCase() }}
            </li>
          </ul>
        </div> -->
      </div>

      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarConvenio',
              }"
            >
              Volver
            </router-link>
          </div>
          <div class="col-lg-4 col-sm-12 mt-1" v-if="convenio.fase_id == 1">
            <base-button
              type="azul-sena"
              @click="cambiarFaseConvenio()"
              class="btn btn-block bg-azul-sena text-white"
            >
              Proyectar Programa
            </base-button>
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
import Documento from "@/components/Documentos/Documento.vue";

@Component({
  components: {
    AnimacionCargando,
    Documento,
  },
})
export default class VerDetalleConvenio extends Vue {
  estadoPeticion = false;
  docValido = false;
  rutadocumento = null;
  verModal = false;
  colegiosConvenio: any[] = [];

  convenio = {
    convenio: "",
    id_convenio: "",
    regional_id: "",
    regional: "",
    id_centro_formacion: "",
    centro_formacion: "",
    fase_id: "",
    fase: "",
    sena_persona_id: "",
    numero_convenio: "",
    fecha_firma: "",
    fecha_inicio: "",
    fecha_final: "",
    sena_cargo: "",
    colegio_cargo: "",
    minuta: "",
  };
  mounted() {
    this.obtenerConvenio(this.$route.params.id);
    this.obtenerColegiosConvenio(this.$route.params.id);
  }
  obtenerColegiosConvenio(id) {
    Axios()
      .get("ver_detalle_convenio_colegio/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.colegiosConvenio = respuesta.data.results;
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }
  obtenerConvenio(id) {
    Axios()
      .get("ver_detalle_convenio/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.convenio = respuesta.data.results;
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
  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.convenio.minuta = event.target.files[0];
        Swal.fire(
          "Certificación Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
        // this.docResolucon = null;
      } else {
        this.docValido = false;
        this.convenio.minuta = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.convenio.minuta = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
  mostrarDocumento(id_convenio) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/ver_certificado_minuta/" +
      id_convenio;
  }

  cambiarFaseConvenio() {
    Axios()
      .put("modificar_fase_convenio/" + this.convenio.id_convenio, {
        id_convenio: this.convenio.id_convenio,
        fase_id: 2,
        id_actualiza: JSON.parse(sessionStorage.getItem("usuario")),
      })
      .then(() => {
        Swal.fire({
          title: "Cambio de fase correcto!",
          text: "El Convenio pasó a Proyectar programa exitosamente!",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
          icon: "success",
        });
        this.$router.push("GestionarConvenio");
      })
      .catch(() => {
        Swal.fire({
          title: "ERROR",
          text: "No se puede cambiar de fase",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
          icon: "error",
        });
      });
  }
}
</script>
