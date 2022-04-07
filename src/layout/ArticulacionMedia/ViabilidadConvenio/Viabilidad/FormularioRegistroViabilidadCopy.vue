<template>
  <div>
    <h1 class="text-azul-sena">HIJO VIABILIDAD</h1>
    <input type="text" v-model="viabilidad" />
    <button @click="exportarViabilidad">Docs</button>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  import Component from "vue-class-component";
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import Multiselect from "vue-multiselect";

  @Component({
    components: {
      Multiselect
    },
  })
  export default class ViabilidadCopy extends Vue {
    viabilidad:String = "";

    exportarViabilidad() {
      this.viabilidad = "1";
      this.$emit('envioViabilidad', this.viabilidad)

    }
  }
</script>