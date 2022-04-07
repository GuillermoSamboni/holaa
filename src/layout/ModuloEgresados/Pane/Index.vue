<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA LINEAMIENTOS PANE</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="estadoPeticion">
          <!-- <h1>Cargando...</h1> -->
          <!-- <AnimacionCargando></AnimacionCargando>-->
        </div>
        <div class="table-responsive">
          <table class="table table table-hover table-inverse">
            <thead class="bg-gradient-naranja-sena text-white" id="listado">
              <tr>
                <th class="text-nowrap">Acción</th>
                <th class="text-nowrap">Lineamiento</th>
                <th class="text-nowrap">Resultado esperado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(lineamiento, key) in listaLineamientosPane"
                :key="key"
              >
                <td>
                  {{ lineamiento.accion }}
                </td>
                <td>
                  {{ lineamiento.lineamiento }}
                </td>
                <td>{{ lineamiento.resultado_esperado }}</td>
                <td class="campos">
                  <span tooltip="Ver detalle PIC" tooltip-flow="top">
                    <router-link
                      class="btn btn-sm bg-azul-sena text-white"
                      :to="{
                        name: 'VerDetalleCapacitacionENI',
                        params: {},
                      }"
                    >
                      <i class="fas fa-eye"></i>
                    </router-link>
                  </span>
                  <span tooltip="Modificar PIC" tooltip-flow="top">
                    <router-link
                      class="btn btn-sm bg-azul-sena text-white"
                      :to="{
                        name: 'ModificarCapacitacionENI',
                        params: {},
                      }"
                    >
                      <i class="fas fa-edit"></i>
                    </router-link>
                  </span>
                  <span tooltip="Eliminar PIC" tooltip-flow="top">
                    <a class="btn btn-sm bg-azul-sena text-white">
                      <i class="fas fa-trash"></i>
                    </a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <h4 class="" v-else-if="!estadoPeticion">No tienes acceso!</h4> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class ListarPane extends Vue {
  estadoPeticion = true;

  listaLineamientosPane = null;

  mounted() {
    this.obtenerLineamientosPane();
  }

  obtenerLineamientosPane() {
    Axios()
      .get("listar_lineamientos_pane")
      .then((respuesta) => {
        this.listaLineamientosPane = respuesta.data.results;
      });
  }
}
</script>

<style scoped>
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
