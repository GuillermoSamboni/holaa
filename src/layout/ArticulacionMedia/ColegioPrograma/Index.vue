<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">Programas Colegio</h1>
        <hr />
        <!-- <span slot="title">Educación</span> -->
        <!-- <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div> -->
        <!-- tablas -->
        <!-- <div v-if="estadoPeticionTabla"> -->
        <!-- <div class="clearfix">
            <b-button
              class="btn btn-sm bg-azul-sena text-white float-right"
              tooltip="Registrar Nuevo"
              tooltip-flow="top"
              :to="{
                name: 'RegistrarPICEje',
              }"
            >
              Registrar Nuevo Eje -->
        <!-- <i class="fas fa-plus size"></i> -->
        <!-- </b-button> -->
        <!-- </div> -->
        <!-- <div>
            <div class="col-9 mb-1">
              <input
                type="text"
                class="form-control col-lg-3 col-sm-10"
                placeholder="Buscar"
                v-model="filter"
                @keyup.prevent="ejeFiltrado()"
              />
            </div> -->
        <!-- <br /> -->
        <div class="table-responsive col-sm-12">
          <table class="table table-hoverble">
            <thead id="listado">
              <tr>
                <th scope="col" class="col-sm-4">Convenios</th>
                <th scope="col" class="col-sm-4">Colegios</th>
                <th scope="col" class="col-sm-4">Programas Formación</th>
                <th scope="col" class="col-sm-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(Programa, key) in programaColegio" :key="key">
                <td>{{ Programa.am_convenio.convenio }}</td>
                <td>{{ Programa.am_colegio.colegio }}</td>
                <td>{{ Programa.programa_formacion.programa_formacion }}</td>

                <!-- <td scope="row">
                  <div class="btn-toolbar btn-responsive-table" role="toolbar">
                    <div
                      class="btn-group btn-spc"
                      tooltip="Ver Eje"
                      tooltip-flow="top"
                    >
                      <router-link class="btn btn-sm bg-azul-sena text-white">
                        <i class="fas fa-eye"></i>
                      </router-link>
                    </div>
                    <div
                      class="btn-group btn-spc"
                      tooltip="Modificar Eje"
                      tooltip-flow="top"
                    >
                      <router-link class="btn btn-sm bg-azul-sena text-white">
                        <i class="fas fa-edit"></i>
                      </router-link>
                    </div>
                    <div
                      class="btn-group btn-spc"
                      tooltip="Eliminar Eje"
                      tooltip-flow="top"
                    >
                      <button class="btn btn-sm bg-azul-sena text-white">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
  <!-- </div> -->
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swal from "sweetalert2";
import Axios from "@/Axios";

@Component({
  components: {},
})
export default class Index extends Vue {
  programaColegio: any[] = [];

  mounted() {
    this.obtenerColegioPrograma();
  }

  obtenerColegioPrograma() {
    Axios()
      .get("/listar_colegio_programa")
      .then((respuesta) => {
        this.programaColegio = respuesta.data.results;

        if (respuesta.data.status == "success") {
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      })
      .finally(() => {});
  }
}
</script>