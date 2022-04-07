<template>
  <div
    class="d-flex justify-content-between flex-wrap-reverse align-items-center"
  >
    <div class="col-12 col-md-7">
      <h1 class="blod text-azul-sena text-capitalize">Servicio Egresados</h1>
      <h3 class="blod text-azul-sena text-capitalize mb-4">
        Estructura Organizacional
      </h3>
      <p class="m-0 p-0 text-justify">
        De acuerdo con las normas y apartes vigentes de la Ley 119 de 1994 y el
        Decreto 249 de 2004 (Modificado parcialmente por el Decreto 2520 de
        2013), la “Estructura Formal” que tiene actualmente el SENA para el
        desarrollo de sus funciones
        <!-- <img src="../../assets/bienestar/estructuraorganizacional.jpg" class="img-fluid"> -->
      </p>
    </div>
    <div class="col-5 fondo-opaco justify-content-center d-flex">
      <img
        src="../../assets/bienestar/estructura-org.svg"
        style="width: 78%;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EstructuraOrganizacional extends Vue {}
</script>

<style></style>
