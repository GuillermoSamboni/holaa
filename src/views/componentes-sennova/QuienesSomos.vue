<template>
  <div class="d-flex justify-content-between flex-wrap-reverse">
    <div class="col-12 col-md-7 align-items-center">
      <h1 class="blod text-azul-sena text-capitalize">Sennova</h1>
      <h3 class="blod text-azul-sena text-capitalize mb-4">Quienes Somos</h3>
      <p class="m-0 p-0 text-justify">
        El Sistema de Investigación, Innovación y Desarrollo Tecnológico del
        SENA -SENNOVA- es un programa institucional para la formación integral y
        la inclusión de procesos de Innovación, Desarrollo Tecnológico
        e Innovación - I+D+i en las regiones, que soporta la ejecución de
        actividades, indicadores y metas establecidas institucionalmente para el
        alcance de los objetivos propuestos por el Gobierno Nacional, observando
        su pertinencia técnica, territorial y social, a partir de la lectura de
        las necesidades regionales.
      </p>
    </div>
    <img
      class="col-12 col-md-5 mb-5 mb-md-0"
      src="../../assets/bienestar/quienes-somos.jpg"
      alt=""
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QuienesSomos extends Vue {}
</script>

<style></style>
