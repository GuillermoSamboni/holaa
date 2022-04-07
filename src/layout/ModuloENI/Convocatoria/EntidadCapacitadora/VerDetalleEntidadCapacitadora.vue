<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">ENTIDAD CAPACITADORA</h1>
      </div>

      <div v-if="!estado">
        <AnimacionCargando />
      </div>
      <div class="card-body" v-if="estado">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Id Entidad Capacitadora :</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ Entidad_Capacitadora.id_pic_entidad_capacitadora }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Entidad Capacitadora:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ Entidad_Capacitadora.entidad_capacitadora }}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Nit:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ Entidad_Capacitadora.nit }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Dirección:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ Entidad_Capacitadora.direccion }}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Correo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ Entidad_Capacitadora.correo }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Número teléfono:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ Entidad_Capacitadora.numero_telefono }}
                </p>
              </div>
            </div>
          </div>

          <!-- <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Red de conocimiento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ pic_eje.red_conocimiento }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Área:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ pic_eje.area_ruta.toLowerCase() }}</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarEntidadCapacitadora',
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
import router from "@/router";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import AnimacionCargando from "@/components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class VerDetalleEntidadCapacitadora extends Vue {
  redesConocimiento: any[] = [];
  estado = false;

  Entidad_Capacitadora = {
    id_pic_entidad_capacitadora: "",
    entidad_capacitadora: "",
    nit: "",
    direccion: "",
    correo: "",
    numero_telefono: "",
    camara_comercio: "",
  };

  mounted() {
    this.obtenerEntidadCapacitadora(this.$route.params.id);
  }

  obtenerEntidadCapacitadora(id_entidad) {
    Axios()
      .get("ver_entidad_capacitadora/" + id_entidad)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.Entidad_Capacitadora = respuesta.data.results;
        } else {
          Swal.fire({
            title: "No se obtuvo Capacitación",
            text: respuesta.data.message,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          }).then(() => {
            this.$router.back();
          });
        }
      })
      .finally(() => {
        this.estado = true;
      });
  }
}
</script>
