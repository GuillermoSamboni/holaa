<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA ACTIVIDADES CENTRO</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="row my-3">
          <div class="col-md-5 col-lg-4 mt-2">
            <select
              placeholder="se"
              class="form-control"
              name="fecha"
              id="fecha"
              v-model="centro_formacion_id"
              @change="obtenerActividadesCentro()"
            >
              <option :value="nada" selected disabled>
                Seleccione un centro de formación
              </option>
              <option
                v-for="(centro, index) in centros"
                :key="index"
                :value="centro.id_centro_formacion"
              >
                {{ centro.centro_formacion }}
              </option>
            </select>
          </div>
          <div class="justify-content-lg-end col-md-5 col-lg-8 mt-2">
            <paginate-links
              class="pagination justify-content-end"
              for="actividadesCentro"
              :limit="3"
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
        </div>

        <div class="table-responsive">
          <paginate
            ref="paginator"
            name="actividadesCentro"
            :list="actividadesCentro"
            :per="10"
          >
            <table class="table table-hover table-inverse">
              <thead class="bg-gradient-azul-sena text-white" id="listado">
                <tr>
                  <th>EJE</th>
                  <th>ESTRATÉGIA DE IMPLEMENTACIÓN</th>
                  <th>ACCIÓN</th>
                  <th>META/ INDICADOR</th>
                  <th>RESPONSABLE</th>
                  <th>FRECUENCIA</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <div class="text-center" v-if="estadoPeticion">
                <AnimacionCargando></AnimacionCargando>
              </div>
              <template v-if="!estadoPeticion">
                <tbody v-if="actividadesCentro != null">
                  <tr
                    v-for="(actividad, key) in paginated('actividadesCentro')"
                    :key="key"
                  >
                    <td class="campos">
                      <div class="actividad">{{ actividad.eje }}</div>
                    </td>

                    <td>{{ actividad.pes_estrategia }}</td>
                    <td>{{ actividad.actividad }}</td>
                    <td>{{ actividad.indicador }}</td>
                    <td>{{ actividad.rol_operativo }}</td>
                    <td>{{ actividad.periodicidad }}</td>

                    <td>
                      <span tooltip="Lista seguimientos" tooltip-flow="top">
                        <a
                          @click="listaSeguimiento(actividad.id_actividad)"
                          class="btn btn-sm bg-azul-sena text-white mr-1"
                        >
                          <i class="fas fa-paste"></i>
                        </a>
                      </span>
                    </td>
                  </tr>
                </tbody>
                <p v-else>No hay actividades registradas para este centro!</p>
              </template>
            </table>
          </paginate>
        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="actividadesCentro"
          :limit="3"
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
    this.centro_formacion_id = this.$route.params.centro_formacion_id;
    this.cargarCentros();
    this.obtenerActividadesCentro();
  },

  data() {
    return {
      id_usuario: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,
      centros: [],
      centro_formacion_id: "",
      actividadesCentro: [],
      paginate: ["actividadesCentro"],
      estadoPeticion: false,
    };
  },

  methods: {
    cargarCentros() {
      Axios()
        .get("listar_centros_regional/" + this.id_usuario)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.centros = respuesta.data.results;
            this.estadoPeticion = false;
          }
          if (respuesta.data.status == "info") {
            Swal.fire({
              title: "Informacion",
              text: respuesta.data.message,
              icon: "warning",
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
            });
            this.estadoPeticion = false;
          }
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },

    obtenerActividadesCentro() {
      this.estadoPeticion = true;
      Axios()
        .post("actividades_centros", {
          id_usuario: this.id_usuario,
          id_centro_formacion: this.centro_formacion_id,
        })
        .then((respuesta) => {
          this.actividadesCentro = respuesta.data.results;
          this.estadoPeticion = false;
        });
    },

    listaSeguimiento(id, actividad) {
      const actividad_id = id;
      const nombreActividad = actividad;
      const centro_formacion_id = this.centro_formacion_id;
      this.$router.push({
        name: "SeguimientoActividades",
        params: { actividad_id, nombreActividad, centro_formacion_id },
      });
    },
  },
};
</script>

<style scoped>
.campos .actividad {
  width: 500px;
}
</style>
