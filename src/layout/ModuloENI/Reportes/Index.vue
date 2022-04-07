  <template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">Reportes ENI</h1>
        </h1>
      </div>
      <div class="row mx-3">
        <div class="col-lg-3 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReporteConvocatoria = true)"
          >
            Convocatorias
          </button>
        </div>
        <div class="col-lg-4 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReporteInstructores = true)"
          >
            Instructores
          </button>
        </div>
        <div class="col-lg-4 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReportePresupuesto = true)"
          >
            Presupuesto
          </button>
        </div>
      </div>
      <div class="card-body">
        <div v-if="esReporteConvocatoria">
          <ReportesPICConvocatoria></ReportesPICConvocatoria>
        </div>
      </div>
      <div class="card-body">
        <div v-if="esReporteInstructores">
          <ReportesInstructores></ReportesInstructores>
        </div>
      </div>
      <div class="card-body">
        <div v-if="esReportePresupuesto">
          <ReportesPresupuesto></ReportesPresupuesto>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import ReportesPICConvocatoria from "@/components/ReportesEni/ReportesPICConvocatoria.vue";
import ReportesInstructores from "@/components/ReportesEni/ReportesInstructores.vue";
import ReportesPresupuesto from "@/components/ReportesEni/ReportesPresupuesto.vue";

@Component({
  components: {
    ReportesPICConvocatoria,
    ReportesInstructores,
    ReportesPresupuesto,
  },
})
export default class IndexReportes extends Vue {
  esReporteConvocatoria = false;
  esReporteInstructores = false;
  esReportePresupuesto = false;

  constructor() {
    super();
  }

  cambiarEstadosComponentes() {
    this.esReporteConvocatoria = false;
    this.esReporteInstructores = false;
    this.esReportePresupuesto = false;
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
