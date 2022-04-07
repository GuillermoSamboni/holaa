<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">Cargar Plan Accion</h1>
      </div>
      <div class="card-body">
        <a class="btn bg-azul-sena my-3 text-white" href="../../assets/descargas/PlanAccion.xlsx" download>Descargar Formato Excel</a>

        <div id="campo">
          <button class="btn bg-azul-sena mt-2 text-white" @click.prevent="$refs.botonResolución.click()">
            Cargar Formato de Planeacion
          </button>
          <!-- <button class="btn btn-primary m-1" :disable="file === null" @click.prevent="guardarImagen(),saved=1">Guardar Audio</button> -->

          <input v-show="false" type="file" ref="botonResolución" name="cargarexcel" class="form-control" id="cargarexcel"
            required="true" accept=".xls,.xlsx" />
        </div>
        <button class="btn btn-azul-sena" @click="guardar()">Guardar Informacion</button>
      </div>
    </div>
  </div>
</template>

<script>
import Component from 'vue-class-component'
import Vue from 'vue';
import XLSX from '../../../node_modules/xlsx';

@Component
export default class PlaneacionAccion extends Vue {
  guardar(){
    let input = document.getElementById('cargarexcel');
    let archivo = input.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(archivo);
    fileReader.onload = (evento) =>{
      let data = evento.target.result
      let workbook = XLSX.read(data, {type: 'binary'})
      workbook.SheetNames.forEach(sheet => {
        let lista = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
      })
    }
  }
}
</script>

<style>

</style>