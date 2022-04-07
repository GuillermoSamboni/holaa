<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-body">
        <div class="card-header">
          <h1 class="text-azul-sena">
            <h1 class="text-azul-sena">DATOS RELEVANTES DE EGRESADOS</h1>
          </h1>
        </div>
        <br />
        <h3 class="mt-2 font-weight-bold">
          Cantidad de Actividades : {{ cantidadActividades }}
        </h3>
        <br />

      
          <paginate-links
            class="pagination justify-content-end"
            for="listaActividades"
            :limit="2"
            :hide-single-page="true"
            :show-step-links="true"
            :full-page="true"
            :classes="{
              ul: 'simple-links-container',
              li: 'simple-links-item',
              liActive: ['simple-links-item', 'active1'],
              'li.active': 'active1',
            }"
          >
          </paginate-links>
      </div>
      <div class="text-center" v-if="estadoPeticion">
        <AnimacionCargando></AnimacionCargando>
      </div>
      <div class="table-responsive" v-if="!estadoPeticion">
        <paginate
          ref="paginator"
          name="listaActividades"
          :list="listaActividades"
          :per="4"
        >
          <table v-if="!estadoPeticion" class="table table-hoverble">
            <thead id="listado">
              <tr>
                <th class="text-nowrap">#</th>
                <th class="text-nowrap">Nombre Actividad</th>
                <th class="text-nowrap">Nombre Responsable</th>
                <th class="text-nowrap">Correo</th>
                <th class="text-nowrap" >Proceso</th>
                <th class="text-nowrap">Rol Centro</th>
                <th class="text-nowrap">Rol Despacho</th>
                <th class="text-nowrap">Rol Direccion</th>
                <th class="text-nowrap">Rol Estrategico</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="listaActividades != null">
                <tr v-for="(actividad, key) in paginated(
                        'listaActividades'
                      )" :key="key">
                  <td>{{ key+1 }}</td>
                  <td>{{ actividad.actividad }}</td>
                  <td>{{ actividad.apellidos }} {{ actividad.nombres }}</td>
                  <td>{{ actividad.correo }}</td>
                  <td >{{ actividad.proceso }}</td>
                  <td>{{ actividad.rol_centro_formacion }}</td>
                  <td>{{ actividad.rol_despacho_regional }}</td>
                  <td>{{ actividad.rol_direccion_general }}</td>
                  <td>{{ actividad.rol_estrategico }}</td>
                </tr>
              </template>
              <tr v-else>
                No hay Actividades
              </tr>
            </tbody>
          </table>
        </paginate>
      </div>
      <paginate-links
            class="pagination justify-content-end"
            for="listaActividades"
            :limit="2"
            :hide-single-page="true"
            :show-step-links="true"
            :full-page="true"
            :classes="{
              ul: 'simple-links-container',
              li: 'simple-links-item',
              liActive: ['simple-links-item', 'active1'],
              'li.active': 'active1',
            }"
          >
          </paginate-links>
      <br />
      <h2 class="text-azul-sena">Herramientas de Seguimiento</h2>
      <canvas></canvas>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import component from "vue-class-component";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import BarChart from "@/components/Charts/BarChart";
import Chart from "chart.js";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";

@component({
  components: {
    BarChart,
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class graficasNacionales extends Vue {
  estadoPeticion = true;
  cantidadActividades = 0;
  paginate = ["listaActividades"];
  listaActividades = [];

  canvas = document.getElementsByTagName("canvas");

  //herramientas de seguimiento
  Entrevista = 0;
  Documento_oficial = 0;
  Acta = 0;
  Listado_de_asistencia = 0;
  Cronograma = 0;
  Publicación = 0;
  Reporte_físico = 0;
  Encuesta = 0;
  Informe = 0;
  Evaluación = 0;
  Estadísticas = 0;

  mounted() {
    this.listarVistaActividades();
  }

  listarVistaActividades() {
    Axios()
      .get("listar_vista_actividades")
      .then((respuesta) => {
        this.cantidadActividades = respuesta.data.results.length;
        this.listaActividades = respuesta.data.results;

        for (let seguimiento of this.listaActividades) {
          switch (
            seguimiento.herramienta_seguimiento_1 ||
            seguimiento.herramienta_seguimiento_2
          ) {
            case "Entrevista":
              this.Entrevista++;
              break;
            case "Documento oficial":
              this.Documento_oficial++;
              break;
            case "Acta":
              this.Acta++;
              break;
            case "Listado de asistencia":
              this.Listado_de_asistencia++;
              break;
            case "Cronograma":
              this.Cronograma++;
              break;
            case "Publicación":
              this.Publicación++;
              break;
            case "Reporte físico":
              this.Reporte_físico++;
              break;
            case "Encuesta":
              this.Encuesta++;
              break;
            case "Informe":
              this.Informe++;
              break;
            case "Evaluación":
              this.Evaluación++;
              break;
            case "Estadísticas":
              this.Estadísticas++;
              break;
            default:
              break;
          }
        }

        new Chart(this.canvas[0], {
          type: "bar",
          data: {
            labels: [
              "Entrevista",
              "Documento oficial",
              "Acta",
              "Listado de asistencia",
              "Cronograma",
              "Publicación",
              "Reporte físico",
              "Encuesta",
              "Informe",
              "Evaluación",
              "Estadísticas",
            ],
            datasets: [
              {
                label: "Herramientas de Segumiento",
                data: [
                  this.Entrevista,
                  this.Documento_oficial,
                  this.Acta,
                  this.Listado_de_asistencia,
                  this.Cronograma,
                  this.Publicación,
                  this.Reporte_físico,
                  this.Encuesta,
                  this.Informe,
                  this.Evaluación,
                  this.Estadísticas,
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