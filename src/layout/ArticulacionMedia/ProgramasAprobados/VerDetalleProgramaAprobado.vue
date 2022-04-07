<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER PROGRAMA</h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-3 offset-md-1">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-6">
              <div>
                <strong>Programa Formación: </strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ programasProye[0].programa_formacion }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Centro Formacion: </strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ programasProye[0].centro_formacion_id }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-6">
              <div>
                <strong>Colegio cargo: </strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ programasProye[0].colegio_cargo }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div>
                <strong>Sena cargo: </strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ programasProye[0].sena_cargo }}</p>
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
                name: 'GestionarProgramasAprobados',
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
  components: {},
})
export default class verProgramaProyectado extends Vue {
  estadoPeticion = false;
  programasProye = {
    centro_formacion_id: "",
    colegio_cargo: "",
    colegio_id: "",
    convenio_id: "",
    fase_id: "",
    fecha_final: "",
    fecha_firma: "",
    fecha_inicio: "",
    id_convenio_programa_proyectado: "",
    numero_convenio: "",
    programa_formacion: "",
    programa_formacion_id: "",
    regional_id: "",
    sena_cargo: "",
    sena_persona_id: "",
  };

  mounted() {
    this.obtenerProgramaProyectado(this.$route.params.id);
  }

  obtenerProgramaProyectado(id) {
    Axios()
      .get("ver_programa_proyectado/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.programasProye = respuesta.data.results;
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }
}
</script>
