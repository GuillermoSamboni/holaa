<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">Reportes Egresados</h1>
        </h1>
      </div>
      <div class="row mx-3">
        <div class="col-lg-4 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReportePaneNacional = true)"
          >
            Plan De Accion Nacional
          </button>
        </div>
        <div class="col-lg-4 col-sm-16 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReporteTrazabilidad = true)"
          >
            Trazabilidad
          </button>
        </div>
      </div>
      <div class="card-body">
        <div v-if="esReportePaneNacional">
          <ReportePANENacional></ReportePANENacional>
        </div>
        <div v-if="esReporteTrazabilidad">
          <ReporteTrazabilidad></ReporteTrazabilidad>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import ReportePANENacional from "@/components/ReportesEgresados/Nacional/ReportePANENacional.vue";
import ReporteTrazabilidad from "@/components/ReportesEgresados/ReporteTrazabilidad.vue";

@Component({
  components: {
    ReportePANENacional,
    ReporteTrazabilidad,
  },
})
export default class IndexReportes extends Vue {
  esReportePaneNacional = false;
  esReporteTrazabilidad = false;

  constructor() {
    super();
  }
  cambiarEstadosComponentes() {
    this.esReportePaneNacional = false;
    this.esReporteTrazabilidad = false;
  }
}
</script>
<style></style>