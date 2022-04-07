<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">ALISTAMIENTO</h1>
        <hr />
        <!-- <span slot="title">Educación</span> -->
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
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
                <th scope="col">colegio</th>
                <th scope="col" class="col-sm-4">convenio</th>
                <th scope="col" class="col-sm-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ColegioPro, key) in colegiosConvenio" :key="key">
                <td>
                  {{ ColegioPro.colegio }}
                </td>
                <td>{{ ColegioPro.convenio }}</td>
                <td scope="row">
                  <div class="btn-toolbar btn-responsive-table" role="toolbar">
                    <div
                      class="btn-group btn-spc"
                      tooltip="Ver "
                      tooltip-flow="top"
                    >
                      <router-link
                        class="btn btn-sm bg-azul-sena text-white"
                        :to="{
                          name: 'VerDetallePICEje',
                          params: {
                            id: ColegioPro.id_eje,
                          },
                        }"
                      >
                        <i class="fas fa-eye"></i>
                      </router-link>
                    </div>
                    <div
                      class="btn-group btn-spc"
                      tooltip="Modificar "
                      tooltip-flow="top"
                    >
                      <router-link
                        class="btn btn-sm bg-azul-sena text-white"
                        :to="{
                          name: 'ModificarPICEje',
                          params: {
                            id: ColegioPro.id_eje,
                          },
                        }"
                      >
                        <i class="fas fa-edit"></i>
                      </router-link>
                    </div>
                    <!-- <div
                      class="btn-group btn-spc"
                      tooltip="Eliminar "
                      tooltip-flow="top"
                    >
                      <button
                        @click="eliminarPicEje(pic_eje.id_eje, key)"
                        class="btn btn-sm bg-azul-sena text-white"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div> -->
                  </div>
                </td>
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
export default class RegistrarColegioPrograma extends Vue {
  estadoPeticion = false;
  colegiosConvenio = [];

  convenio = {
    id_convenio: "",
    convenio: "",
    regional_id: "",
    regional: "",
    centro_formacion_id: "",
    sena_persona_id: "",
    numero_convenio: "",
    fecha_firma: "",
    fecha_inicio: "",
    fecha_final: "",
    sena_cargo: "",
    colegio_cargo: "",
    minuta: null,
    municipio_id: "",
    am_convenio_colegio: [],
    // usuarioPersona: "",
  };

  mounted() {
    this.obtenerColegiosConvenio();
  }

  obtenerColegiosConvenio() {
    Axios()
      .get("listar_convenio_colegio")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.colegiosConvenio = respuesta.data.results;
          this.convenio = respuesta.data.results;
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }
}
</script>