<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">Reportes convenios</h1>
        </h1>
      </div>
      <div class="row mx-3">
       
        <div class="col-lg-4 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReportesConvenios = true)"
          >
            Convenios
          </button>
        </div>
      </div>
      <div class="card-body">
        <div v-if="esReportesConvenios">
          <ReportesConvenios></ReportesConvenios>
        </div>
      </div>
    </div>
      <div class="mt-4 container-fluid">
    <div class="card" v-show="esReportesConvenios ==false">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">TABLERO</h1>
        </h1>
      </div>
      
        <h2 class="text-azul-sena">Fases Convenios</h2>
        <canvas></canvas>
     
    </div>
  </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import ReportesConvenios from "@/components/ReportesArticulacionMedia/ReportesConvenios.vue";
import BarChart from "@/components/Charts/BarChart";
import Chart from "chart.js";
import Swal from "sweetalert2";

@Component({
  components: {
    ReportesConvenios,
    BarChart,
  },
})
export default class IndexReportes extends Vue {
   estadoPeticion = true;
  listaConvenios = [];
  listacantidadFases = 0;
  listaFases = [];
  esReportesConvenios = false;

canvas = document.getElementsByTagName("canvas");
 
 Creacion = 0;
 Proyectarprogramas = 0;
 Ejecucion = 0;
 Finalizado = 0;
 Cancelado = 0;
 Suspendido = 0;
 Sensibilizarconvenio = 0;
 Aprobarprogramascolegios = 0;
 Viabilidad = 0;
// programasColegio=0;
 

  cambiarEstadosComponentes() {
  
   this. esReportesConvenios = false;

  }

  mounted() {

       this.obtenerFases();   
  }

    obtenerFases() {
    Axios()
      .get("listar_convenios")
      .then((respuesta) => {
        this.listacantidadFases = respuesta.data.results.length;
        this.listaFases = respuesta.data.results;

        for (let listaConv of this.listaFases) {
          
          switch (
            listaConv.fase
            
          ) {
            
               case "Creación":
              this.Creacion++;
              break;
               case "Proyectar programas":
              this.Proyectarprogramas++;
              break;
               case "Ejecucion":
              this.Ejecucion++;
              break;
               case "Finalizado":
              this.Finalizado++;
              break;
               case "Cancelado":
              this.Cancelado++;
              break;
              case "Suspendido":
                this.Suspendido++;
                break;
              case "Sensibilizar Convenio":
                this.Sensibilizarconvenio++;
                break;
               case "Aprobar programas colegios":
              this.Aprobarprogramascolegios++;
              break;
              case "Viabilidad":
                this.Viabilidad++;
                break;
            
              
            default:
              break;
              
          }
        }

        new Chart(this.canvas[0], {
          type: "bar",
          data: {
            labels: [
              "Total Convenios",
              "Creacion",
              "Proyectar programas",
              "Ejecucion",
              "Finalizado",
              "Cancelado",
              "Suspendido",
              "Sensibilizar Convenio",
              "Aprobar programas colegios",
              "Viabilidad"
            ],
            datasets: [
              {
                label: "Convenios por Fases",
                data: [
                  this.listaFases.length,
                  this.Creacion,
                  this.Proyectarprogramas,
                  this.Ejecucion,
                  this.Finalizado,
                  this.Cancelado,
                  this.Suspendido,
                  this.Sensibilizarconvenio,
                  this.Aprobarprogramascolegios,
                  this.Viabilidad
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                  "rgba(205, 203, 207, 0.2)",
                  "rgba(163, 203, 207, 0.2)",
                  "rgba(54, 203, 207, 0.2)",
                  "rgba(223, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      });
    this.estadoPeticion = false;
  }
   
   }

</script>

<style>

.site-footer2 {
  background-color: #fff;
  padding: 45px 0 40px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
}

.site-footer2 hr {
  border-top-color: #bbb;
  opacity: 0.5;
}

.site-footer2 hr.small {
  margin: 20px 0;
}

.site-footer2 h6 {
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}

.site-footer2 a {
  color: #737373;
}

.site-footer2 a:hover {
  color: #217c70;
  text-decoration: none;
}

.footer-links2 {
  padding-left: 0;
  list-style: none;
}

.footer-links2 li {
  display: block;
}

.footer-links2.inline li {
  display: inline-block;
}

.site-footer2 .social-icons2 {
  text-align: right;
  margin-bottom: 10px;
}

.site-footer2 .social-icons2 a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  /* margin-top: -30px; */
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
}

.copyright-text2 {
  margin: 0;
}

@media (max-width: 991px) {
  .site-footer2 [class^="col-"] {
    margin-bottom: 30px;
  }
}

@media (max-width: 767px) {
  .site-footer2 {
    padding-bottom: 0;
  }
  .site-footer2.copyright-text2,
  .site-footer2 .social-icons2 {
    text-align: center;
  }
}


</style>
