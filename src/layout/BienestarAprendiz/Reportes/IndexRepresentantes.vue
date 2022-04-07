<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">Reportes Representantes</h1>
        </h1>
      </div>
        <div class="row mx-3">
        <div class="col-lg-4 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReporteRepresentantes = true)"
          >
            Representantes
          </button>
        </div>
        </div>
        <div class="card-body" >
        <div v-if="esReporteRepresentantes">
          <ReporteRepresentantes></ReporteRepresentantes>
        </div>   
      </div>
       <div class="card-body" v-show="esReporteRepresentantes == false">
        <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <h2 class="text-azul-sena">Grafica Representante</h2>
          <canvas></canvas>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios"
import ReporteRepresentantes from "@/components/ReportesBienestar/Representantes/ReporteRepresentantes.vue";
import BarChart from "@/components/Charts/BarChart";
import Chart from "chart.js";

@Component({
  components: {
   BarChart,
  ReporteRepresentantes,
  },
})
export default class IndexReprentantes extends Vue {
  canvas = document.getElementsByTagName("canvas");
  esReporteRepresentantes = false;
  representantes: any[] = [];
  contHombres = 0;
   contMujeres = 0;
     

  constructor() {
    super();
  }
  

  cambiarEstadosComponentes() {

    this.esReporteRepresentantes = false;
  }

  mounted() {
    this.listarRepresentantes();
  }

  listarRepresentantes() {
    Axios()
      .get("reporte_representante")
      .then((respuesta) => {
        this.representantes = respuesta.data.results;

         for (let i of this.representantes) {
      if (i.genero_id == "M") {
        this.contHombres = this.contHombres + 1;
      }
      if (i.genero_id == "F") {
        this.contMujeres = this.contMujeres + 1;
      }
    }

        new Chart(this.canvas[0], {
          type: "bar",
          data: {
            labels: [
              "Hombres",
              "Mujeres",
            ],
            datasets: [
              {
                label: "Cantidad de Representantes",
                data: [
                  this.contHombres,
                  this.contMujeres,
                 
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                 
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                 
                ],
                borderWidth: 1,
              },
            ],
          },
        });
     });
  }

}
  
</script>