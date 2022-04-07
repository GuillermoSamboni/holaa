<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LISTA DE SEGUIMIENTOS</h1>
        <p>{{ nombreActividad }}</p>
      </div>

      <div class="card-body">
        <div class="text-center" v-if="estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>

        <div class="table-responsive">
          <paginate
            ref="paginator"
            name="seguimientos"
            :list="seguimientos"
            :per="10"
          >
            <table
              class="table table-hover table-inverse"
              v-if="!estadoPeticion"
            >
              <thead class="bg-gradient-azul-sena text-white" id="listado">
                <tr>
                  <th>#</th>
                  <th>Descripción del seguimiento</th>
                  <th>Fecha de modificación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody v-if="seguimientos != ''">
                <tr
                  v-for="(seguimiento, key) in paginated('seguimientos')"
                  :key="key"
                >
                  <td>{{ seguimiento.id_gestion_actividad }}</td>
                  <td class="campos">
                    <div class="seguimiento">
                      {{ seguimiento.gestion_actividad }}
                    </div>
                  </td>
                  <td>{{ seguimiento.actualizado.slice(0, -9) }}</td>
                  <td class="campos">
                    <div class="acciones">
                      <span tooltip="Ver Detalle" tooltip-flow="top">
                        <a
                          @click="
                            verSeguimiento(seguimiento.id_gestion_actividad)
                          "
                          class="btn btn-sm bg-azul-sena text-white mr-1"
                        >
                          <i class="fas fa-eye"></i>
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <p v-else>
                No hay lineamientos registrados!
              </p>
            </table>
          </paginate>
        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="seguimientos"
          :limit="2"
          :hide-single-page="true"
          :show-step-links="true"
          :full-page="true"
          :classes="{
            ul: 'simple-links-container',
            li: 'simple-links-item',
            liActive: ['simple-links-item', 'active1'],
            'li.active': 'active1',
          }"
        ></paginate-links>
      </div>

      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <button
              class="btn btn-block bg-azul-sena text-white"
              @click="volver()"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "@/components/animacionCargando.vue";

export default {
  components: {
    AnimacionCargando,
  },

  mounted() {
    this.id_actividad = this.$route.params.actividad_id;
    this.nombreActividad = this.$route.params.nombreActividad;
    this.id_centro_formacion = this.$route.params.centro_formacion_id;

    this.obtenerSeguimientos();
    // this.cargarSeguimientos(this.id_actividad);
  },

  data() {
    return {
      meses: "abril",
      nombreActividad: "",
      id_actividad: "",
      estadoPeticion: true,
      seguimientos: [],
      id_centro_formacion: "", //viene desde seguimientoCentros.vue
      paginate: ["seguimientos"],
    };
  },
  methods: {
    obtenerSeguimientos() {
      Axios()
        .post("listar_seguimiento_actividad", {
          id_actividad: this.id_actividad,
        })
        .then((respuesta) => {
          this.seguimientos = respuesta.data.results;
          this.estadoPeticion = false;
        });
    },

    //por el ver detalle le envio el id del seguimiento y el id de la actividad
    verSeguimiento(id) {
      const actividad_id = this.id_actividad;
      const nombreActividad = this.nombreActividad;
      const centro_formacion_id = this.id_centro_formacion;
      this.$router.push({
        name: "VerDetalleActividad",
        params: { id, actividad_id, nombreActividad, centro_formacion_id },
      });
    },

    volver() {
      const centro_formacion_id = this.id_centro_formacion;
      this.$router.push({
        name: "GestionarSeguimientoCentros",
        params: { centro_formacion_id },
      });
    },
  },
};
</script>

<style scoped>
.agregar {
  width: 200px;
}
.campos .seguimiento {
  width: 500px;
}
</style>
