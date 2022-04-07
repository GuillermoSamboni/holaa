<template>
  <div>
    <h1 class="text-azul-sena">HIJO DOCS</h1>
    <input type="text" v-model="docs" />
    <button @click="exportarDocs">Docs</button>
  </div>
</template>
<script lang="ts">
  import Component from "vue-class-component";
  import { Prop, Vue } from "vue-property-decorator";

  @Component({
    components: {
    },
    props: {
    }
  })
  export default class DocumentosCopy extends Vue {
    docs: any[] = [];

    exportarDocs() {
      this.docs.push({ id: 1, nombre: 'doc1' })
      this.docs.push({ id: 2, nombre: 'doc2' })
      this.docs.push({ id: 3, nombre: 'doc3' })
      this.$emit('envioDocs', this.docs)
    }

  }
</script>