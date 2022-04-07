<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          Seguimiento Actividad
        </h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Descripción del seguimiento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ gestion_actividad }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Evidencia:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ evidencia }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button
                class="btn btn-azul-sena col-sm-12 col-md-3 col-lg-3"
                @click="verDocumento()"
              >
                Ver Evidencia
              </button>
            </div>
          </div>

          <!-- modal para inicio de la fecha de programacion -->

          <div class="container-fluid">
            <modal
              :show.sync="verModal"
              body-classes="p-0"
              modal-classes="justify-content-center modal-dialog-centered modal-lg-12  "
            >
              <template slot="header">
                <h2
                  class="text-azul-sena modal-title"
                  id="modalNovedadesAprendiz"
                >
                  EVIDENCIA
                </h2>
              </template>
              <card
                type="white"
                shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-1 py-lg-1"
                class="border-0 "
              >
                <template class="row">
                  <div class="col-12">
                    <div>
                      <embed
                        :src="rutadocumento"
                        type="application/pdf"
                        width="100%"
                        height="500px"
                      />
                    </div>
                  </div>
                </template>
              </card>
            </modal>
          </div>

          <!-- modal finnnnnnnnnn -->
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <button
              class="btn btn-block bg-azul-sena text-white"
              @click="enviarIdActividad()"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "@/components/animacionCargando.vue";

export default {
  components: {
    AnimacionCargando,
  },
  mounted() {
    this.id_actividad = this.$route.params.actividad_id;
    this.obtenerSeguimientos(this.$route.params.id);
    this.nombreActividad = this.$route.params.nombreActividad;
    this.id_centro_formacion = this.$route.params.centro_formacion_id;
    // this.cargarSeguimientos(this.id_actividad);
  },

  data() {
    return {
      nombreActividad: '',
      id_actividad: 0,
      evidencia: "",
      fecha_ejecucion: "",
      fecha_programacion: "",
      gestion_actividad: "",
      id_gestion_actividad: "",
      verModal: false,
      rutadocumento: null,
      id_centro_formacion: "", //viene desde seguimientoCentros.vue
    };
  },
  methods: {
    obtenerSeguimientos(id) {
      Axios()
        .get("ver_seguimiento_actividad/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.evidencia = respuesta.data.results.evidencia;
            this.fecha_ejecucion = respuesta.data.results.fecha_ejecucion;
            this.fecha_programacion = respuesta.data.results.fecha_programacion;
            this.gestion_actividad = respuesta.data.results.gestion_actividad;
            this.id_gestion_actividad =
              respuesta.data.results.id_gestion_actividad;
          }
          if (respuesta.data.status == "info") {
            Swal.fire({
              title: "Informacion",
              text: respuesta.data.message,
              icon: "warning",
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
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
  
    enviarIdActividad() {
      const actividad_id = this.id_actividad;
      const nombreActividad = this.nombreActividad;
      const centro_formacion_id = this.id_centro_formacion;

      this.$router.push({
        name: "SeguimientoActividades",
        params: { actividad_id,nombreActividad,centro_formacion_id },
      });
    },
    verDocumento() {
      this.verModal = true;
      this.rutadocumento =
        "https://develdfp.cloudsenactpi.net/api/visualizar_evidencia/" +
        this.id_gestion_actividad;
    },
  },
};
</script>

<style scoped>
#contenido {
  text-align: center;
}
#texto {
  text-align: justify;
}
</style>