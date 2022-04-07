<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">PLAN DE ACCIÓN NACIONAL PARA EGRESADOS</h1>
        </h1>
      </div>
      <div class="card-body">
        <crear-indicador></crear-indicador>
        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import CrearIndicador from "../../../components/ModuloEgresados/RegistrarIndicador.vue";

@Component({
  components: {
    CrearIndicador,
    AnimacionCargando,
  },
})
export default class ListarActividades extends Vue {
 



 
}
</script>





<style scoped >