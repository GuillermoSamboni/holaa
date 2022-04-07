<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">PLAN DE ACCIÓN NACIONAL PARA EGRESADOS</h1>
        </h1>
      </div>
      <div class="card-body">
        <CrearActividad></CrearActividad>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import CrearActividad from "../../../components/ModuloEgresados/RegistrarActividad.vue";

@Component({
  components: {
    CrearActividad,
    AnimacionCargando,
  },
})
export default class ListarActividades extends Vue {
  listaActividades: any[] = []; //Array de tipo cualquieravalor inicial vacio

  mounted() {
    this.listarActividades();
  }

  eliminarActividad(id, index){
    Swal.fire({
      title: 'Eliminar Actividad '+ this.listaActividades[index].actividad  + '?',
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#238276',
      cancelButtonColor: '#2d2d2d',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_actividad/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Actividad Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaActividades.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar la actividad",
                text: respuesta.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.$router.back();
            }
          })
          .catch(() => {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          });
      }
    });
  }

  listarActividades() {
    Axios()
      .get("listar_actividades")
      .then((respuesta) => {
          this.listaActividades = respuesta.data;
      })
      .catch((error) => {
      });
  }
}
</script>





<style scoped >
.campos a {
  margin: 0%;

  width: 100%;
  font-size: 70%;
  text-align: center;
}

.campos {
  margin: 0%;
  padding: 0%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

@media (max-width: 970px) {
  .campos {
    display: grid;
    width: 80%;
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
    align-items: flex-start;
    text-align: center;
    justify-content: center;
  }
  .campos a {
    margin: 0%;

    width: 80%;
    margin-right: 2px;
    font-size: 70%;
  }
}
</style>