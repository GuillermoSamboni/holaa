<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <div v-if="!esReporteConvocatoria && !esReporteAprendices & !esReportePresupuesto">
          <h1 class="text-azul-sena">REPORTES BIENESTAR</h1>                    
        </div>        
      </div>
      
      <div class="row mx-3">
        <div class="col-lg-4 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReporteConvocatoria = true)"
          >
            Convocatorias
          </button>
        </div>
        <div class="col-lg-4 col-sm-16 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReporteAprendices = true)"
          >
            Aprendices
          </button>
        </div>

        <div class="col-lg-4 col-sm-12 mt-2">
          <button
            class="btn btn-block btn-azul-sena"
            @click="cambiarEstadosComponentes(), (esReportePresupuesto = true)"
          >
            Presuesto
          </button>
        </div>
      </div>
      <div class="card-body">
        <div v-if="esReporteConvocatoria">
          <ReporteConvocatoria></ReporteConvocatoria>
        </div>
        <div>
        <div v-if="esReporteAprendices">
          <button
            class="btn btn-block btn-azul-sena col-sm-16"
            @click="
              (aprendicesAdjudicados = true), (aprendicesInscritos = false)
            "
          >
            Adjudicados
          </button>
          <button
            class="btn btn-block btn-azul-sena"
            @click="
              (aprendicesInscritos = true), (aprendicesAdjudicados = false)
            "
          >
            Inscritos
          </button>
          <div v-if="aprendicesAdjudicados">
            <ReporteAdjudicados></ReporteAdjudicados>
          </div>
          <div v-if="aprendicesInscritos">
            <ReporteInscritos></ReporteInscritos>
          </div>
        </div>
        </div>
        <div v-if="esReportePresupuesto">
          <ReportePresupuesto></ReportePresupuesto>
        </div>
         
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import ReporteConvocatoria from "@/components/ReportesBienestar/Nacional/ReporteConvocatoria.vue";
import ReporteAdjudicados from "@/components/ReportesBienestar/Nacional/ReporteAdjudicados.vue";
import ReporteInscritos from "@/components/ReportesBienestar/Nacional/ReporteInscritos.vue";
import ReportePresupuesto from "@/components/ReportesBienestar/Nacional/ReportePresupuesto.vue";

@Component({
  components: {
    ReporteConvocatoria,
    ReporteAdjudicados,
    ReporteInscritos,
    ReportePresupuesto,
   
  },
})
export default class IndexReportes extends Vue {
  esReporteConvocatoria = false;
  esReporteAprendices = false;
  esReportePresupuesto = false;

  aprendicesAdjudicados = false;
  aprendicesInscritos = false;



  constructor() {
    super();
  }

  cambiarEstadosComponentes() {
    this.esReporteConvocatoria = false;
    this.esReporteAprendices = false;
    this.esReportePresupuesto = false;

    this.aprendicesAdjudicados = false;
    this.aprendicesInscritos = false;

   
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
