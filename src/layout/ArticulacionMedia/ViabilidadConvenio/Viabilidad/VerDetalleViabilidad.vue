<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER VIABILIDAD</h1>
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
                <strong>Nombre del Convenio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ viabilidad.convenio }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Nombre del Colegio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ viabilidad.colegio }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Apto:</strong>
              </div>
              <div id="contenido">
                <p id="texto" v-if="viabilidad.apto == 0">No</p>
                <p id="texto" v-if="viabilidad.apto == 1">Si</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Fecha:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ viabilidad.fecha }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="row justify-content-center">
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
import AnimacionCargando from "@/components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class VerDetalleConvenio extends Vue {
  estadoPeticion = false;

  viabilidad = {
    id_viabilidad: "",
    convenio_id: "",
    convenio: "",
    colegio_id: "",
    colegio: "",
    apto: "",
    fecha: "",
  };
  mounted() {
    this.obtenerViabilidad(this.$route.params.id);
  }
  obtenerViabilidad(id) {
    Axios()
      .get("ver_detalle_viabilidad/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.viabilidad = respuesta.data.results[0];
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }
}
</script>
