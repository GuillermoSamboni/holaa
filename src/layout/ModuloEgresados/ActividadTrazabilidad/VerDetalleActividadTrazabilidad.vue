<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          VER ACTIVIDAD TRAZABILIDAD
        </h1>
      </div>
      <div class="card-body">
        <div v-if="!estadoPeticion">
          <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
            <AnimacionCargando></AnimacionCargando>
          </div>
        </div>
        <div v-if="estadoPeticion">
          <div
            v-for="(trazabilidad, key) in listaTrazabilidadActividad"
            :key="key"
            class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1 center"
          >
            <div class="row">
              <div class="col-sm-12 col-md-4 col-lg-4">
                <div>
                  <strong>Nombre de la Trazabilidad:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ trazabilidad.trazabilidad }}</p>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 col-lg-4">
                <div>
                  <strong>Numero de Asistentes:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ trazabilidad.asistencia }}</p>
                </div>
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
                name: 'GestionarActividadCentro'
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
  export default class VerTrazabilidadActividad extends Vue {
    listaTrazabilidadActividad: any[] = [];
    actividad = "";
    estadoPeticion = false;

    mounted() {
      this.actividad = this.$route.params.id_actividad;
      this.obtenerTrazabilidadActividad();
    }

    obtenerTrazabilidadActividad() {
      Axios()
        .get("listar_trazabilidad_actividad/" + this.actividad)
        .then((respuesta) => {
          this.listaTrazabilidadActividad = respuesta.data.results;
          if (this.listaTrazabilidadActividad == null) {
            Swal.fire({
                title: "Falta registrar trazabilidad",
                text: "No se ha registrado ninguna trazabilidad",
                icon: "info",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
            this.$router.push({ name: "GestionarActividadCentro" });
          } else {

          }
        })
        .finally(() => {
          this.estadoPeticion = true;
        });
    }
  }
</script>
