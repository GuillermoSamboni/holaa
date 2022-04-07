<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER TRAZABILIDAD</h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div
          v-if="estadoPeticion"
          class="col-lg-8 col-md-10 col-sm-12 offset-lg-3 offset-md-1"
        >
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Nombre de la trazabilidad:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ trazabilidad.trazabilidad }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Eje:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ trazabilidad.eje }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarTrazabilidades',
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
export default class VerTrazabilidad extends Vue {
  estadoPeticion = true;
  //idConvocatoria = null;

  trazabilidad = {
    eje: "",
    id_eje: "",
    id_trazabilidad: "",
    trazabilidad: "",
  };

  mounted() {
    // this.idConvocatoria = this.$route.params.id;
    this.verDetalleTrazabilidad(this.$route.params.id);
  }

  verDetalleTrazabilidad(id) {
    Axios()
      .get("ver_detalle_pane_trazabilidad/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.trazabilidad = respuesta.data.results;
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  //   async verDetalleTrazabilidad(id) {
  //     Axios()
  //       .get("ver_detalle_pane_trazabilidad/" + id)
  //       .then((respuesta) => {
  //         if (respuesta.data.status == "success") {
  //           this.trazabilidad = respuesta.data.results;
  //         } else {
  //           Swal.fire({
  //             title: "Error obteniendo la razabilidad",
  //             text: respuesta.data.message,
  //             icon: "error",
  //             confirmButtonText: "Aceptar",
  //             customClass: {
  //               confirmButton: "btn btn-azul-sena",
  //             },
  //           });
  //         }
  //       })
  //       .catch(() => {
  //         Swal.fire(
  //           "ERROR!",
  //           "Se ha presentado un error en el servidor!",
  //           "error"
  //         );
  //       })
  //       .finally(() => {
  //         this.estadoPeticion = false;
  //       });
  //   }
}
</script>
