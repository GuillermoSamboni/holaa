<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">GESTIONAR ACTIVIDADES REGIONAL</h1>
      </div>

      <div class="card-body">
        <div class="text-center" v-if="estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="row justify-content-end">
          <div class="agregar mt-1 mb-2 mr-3">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'RegistrarActividadRegional',
              }"
            >
              Seleccionar Actividad
            </router-link>
          </div>
        </div>

        <div class="table-responsive">
          <paginate
            ref="paginator"
            name="actividades"
            :list="actividades"
            :per="10"
          >
            <table
              class="table table-hover table-inverse"
              v-if="!estadoPeticion"
            >
              <thead class="bg-gradient-azul-sena text-white" id="listado">
                <tr>
                  <th>Actividad</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody v-if="actividades != ''">
                <tr
                  v-for="(actividad, key) in paginated('actividades')"
                  :key="key"
                >
                  <td class="campos">
                    <div class="actividad">{{ actividad.actividad }}</div>
                  </td>

                  <td>
                    <div
                      class="btn-group btn-spc"
                      tooltip="Eliminar Actividad"
                      tooltip-flow="top"
                    >
                      <a
                        @click="eliminarActividad(actividad.id_actividad, key)"
                        class="btn btn-sm bg-azul-sena text-white"
                      >
                        <i class="fas fa-trash"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
              <p v-else>No hay actividades registradas!</p>
            </table>
          </paginate>
        </div>

        <paginate-links
          class="pagination justify-content-end"
          for="actividades"
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
    this.cargarActividades();
  },

  data() {
    return {
      estadoPeticion: true,
      id_usuario: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,
      actividades: [],
      paginate: ["actividades"],
    };
  },

  methods: {
    cargarActividades() {
      Axios()
        .get("listar_actividades_regional/" + this.id_usuario)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.actividades = respuesta.data.results;
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

    eliminarActividad(id, index) {
      Swal.fire({
        title: "Eliminar Actividad",
        text: "Eliminar Actividad " + this.actividades[index].actividad + "?",
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_actividad_regional/" + id)
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
                this.actividades.splice(index, 1);
              } else {
                Swal.fire({
                  title: "INFO",
                  text: respuesta.data.message,
                  icon: "warning",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
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
    },
  },
};
</script>

<style scoped>
.campos .actividad {
  width: 500px;
}
.scroll-vertical {
  overflow: scroll;
  max-height: 400px;
}
.encabezado {
  position: fixed;
}
</style>
