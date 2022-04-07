<template>
  <div class="d-flex justify-content-between flex-wrap">
    <div class="col-lg-12 col-md-12">
      <div class="d-flex  justify-content-between mb-5 flex-wrap">
        <h3 class="blod text-azul-sena text-capitalize titulo m-0">
          Directorio
        </h3>
      </div>
      <div style="overflow-x: scroll;">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Telefono</th>
              <th scope="col">IP</th>
              <th scope="col">E-mail Sena</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lista" :key="item.idn" class="mt-2">
              <td>{{ item.nombre }}</td>
              <td>{{ item.telefono }}</td>
              <td>{{ item.ip }}</td>
              <td>{{ item.e_mail }}</td>
              <td>{{ item.rol }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <a
        class="btn bg-azul-sena mt-2 text-white col-12 col-md-3"
        href="../../assets/descargas/directorio2020.pdf"
        download
        >Descargar</a
      >
      <!--<div>
                 <img class="col-5" src="../../assets/bienestar/directorio.svg" alt="">
            </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Directorio extends Vue {
  lista: any = [];

  constructor() {
    super();
    this.lista = [
      {
        nombre: "Héctor Castaño Velásquez",
        telefono: 3196991562,
        ip: 13895,
        e_mail: "hcastano@sena.edu.co",
        rol: "PLANTA",
      },
      {
        nombre: "Karina Inés Altamiranda Rodriguez",
        telefono: 3214432077,
        ip: 12041,
        e_mail: "kaltamiranda@sena.edu.co",
        rol: "CONTRATISTA: APOYOS DE SOSTENIMIENTO",
      },
      {
        nombre: "Angela Andrea Alba Villamil",
        telefono: 3133887680,
        ip: 12595,
        e_mail: "aalbav@sena.edu.co",
        rol: "CONTRATISTA: APOYO EN EGRESADOS",
      },
      {
        nombre: "Dora Emma Ramirez Serafinoff",
        telefono: 3005611670,
        ip: 0,
        e_mail: "deramirez@sena.edu.co",
        rol: "PLANTA",
      },
      {
        nombre: "Francia Elena Arango Monsalve",
        telefono: 3138528163,
        ip: 13003,
        e_mail: "fearango@sena.edu.co",
        rol: "CONTRATISTA",
      },
      {
        nombre: "Yolanda Marín Maldonado",
        telefono: 3132571571,
        ip: 12136,
        e_mail: "ymarinm@sena.edu.co",
        rol: "PLANTA",
      },

      {
        nombre: "Johanna Andrea Sandoval Lorgia",
        telefono: 3177381786,
        ip: 12131,
        e_mail: "josandoval@sena.edu.co",
        rol: "CONTRATISTA: APOYO EN LIDERAZGO",
      },
      {
        nombre: "Claudia Forero Londoño",
        telefono: 3182191999,
        ip: 12301,
        e_mail: "cpforero@sena.edu.co",
        rol: "COORDINADORA GRUPO",
      },
      {
        nombre: "Carolina Perez Cardenas",
        telefono: 3132831412,
        ip: 0,
        e_mail: "cperez@sena.edu.co",
        rol: "CONTRATISTA",
      },
      {
        nombre: "Adriana Paola Forero Castañeda",
        telefono: 3166170141,
        ip: 0,
        e_mail: "adpforero@sena.edu.co",
        rol: "CONTRATISTA",
      },
    ];
  }
}
</script>

<style></style>
