<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR VIABILIDAD DOCUMENTOS PADRE</h1>
      
        </div>
      </div>
    </div>
 
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  import Component from "vue-class-component";
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import Docs from "@/components/Documentos/DocumentoCopy.vue"
  import Viabi from "@/layout/ArticulacionMedia/Viabilidad/FormularioRegistroViabilidadCopy.vue"

  @Component({
    components: {
      // Docs,
      // Viabi
    }
  })
  export default class ViabilidadCopilot extends Vue {
    viabilidadPadre = "";
    docsPadre:any [] = [];
    envioViabilidadMetodo(data) {
      this.viabilidadPadre = data;

    }
    envioDocsMetodo(data) {
      this.docsPadre = data;
    }

    recorreDocs(){
      for(let i = 0; i < this.docsPadre.length; i++){
      }
    }

  }
</script>