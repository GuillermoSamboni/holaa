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
          <table
            class="table table-hover table-inverse "
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
              <tr v-for="(seguimiento, key) in seguimientos" :key="key">
                <td>{{ seguimiento.id_gestion_actividad }}</td>
                <td class="campos">
                  <div class="seguimiento">
                    {{ seguimiento.gestion_actividad }}
                  </div>
                </td>
                <td>{{ seguimiento.actualizado.slice(0, -9) }}</td>
                <!-- slice() sirve para devolver la cantidad de caracteres dentro de una cadena de texto -->
                <td class="campos">
                  <div class="acciones">
                    <span>
                      <a
                        tooltip="Eliminar Seguimiento"
                        tooltip-flow="top"
                        @click="
                          eliminarSeguimiento(
                            seguimiento.id_gestion_actividad,
                            key
                          )
                        "
                        class="btn btn-sm bg-azul-sena text-white "
                      >
                        <i class="fas fa-trash"></i>
                      </a>
                    </span>

                    <span>
                      <a
                        tooltip="Ver Detalle"
                        tooltip-flow="top"
                        @click="
                          verSeguimiento(seguimiento.id_gestion_actividad)
                        "
                        class="btn btn-sm bg-azul-sena text-white mr-1"
                      >
                        <i class="fas fa-eye"></i>
                      </a>
                    </span>

                    <span>
                      <a
                        tooltip="Modificar"
                        tooltip-flow="top"
                        @click="
                          modificarSeguimiento(seguimiento.id_gestion_actividad)
                        "
                        class="btn btn-sm bg-azul-sena text-white mr-1"
                      >
                        <i class="fas fa-edit"></i>
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
        </div>
      </div>

      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarActividadCentro',
              }"
            >
              Volver
            </router-link>
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
    this.fecha.id_actividad = this.$route.params.actividad_id;
    this.nombreActividad = this.$route.params.nombreActividad;

    this.obtenerSeguimientos();
    // this.cargarSeguimientos(this.id_actividad);
  },

  data() {
    return {
      meses: "abril",
      nombreActividad: "",
      id_actividad: 0,
      estadoPeticion: true,
      seguimientos: [],
      fecha: {
        mes: "febrero",
        id_actividad: "",
      },
      meses: [
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ],
    };
  },
  methods: {
    cargarSeguimientos(id) {
      Axios()
        .get(
          "listar_seguimiento_actividad/" +
            { params: { id_actividad: id, mes: this.meses } }
        )
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.seguimientos = respuesta.data.results;
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

    eliminarSeguimiento(id, index) {
      Swal.fire({
        title: "Eliminar Seguimiento ?",
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_seguimiento_actividad/" + id)
            .then((respuesta) => {
              if (respuesta.data.status == "success") {
                Swal.fire({
                  title: "Seguimiento Eliminado",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
                this.seguimientos.splice(index, 1);
              } else {
                Swal.fire({
                  title: "No se pudo eliminar el seguimiento",
                  text: respuesta.data.message,
                  icon: "error",
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

    obtenerSeguimientos() {
      Axios()
        .post("listar_seguimiento_actividad", this.fecha)
        .then((respuesta) => {
          this.seguimientos = respuesta.data.results;
          this.estadoPeticion = false;
        });
    },

    //por el ver detalle le envio el id del seguimiento y el id de la actividad
    verSeguimiento(id) {
      const actividad_id = this.fecha.id_actividad;
      const nombreActividad = this.nombreActividad;
      this.$router.push({
        name: "VerDetalleSeguimientoActividad",
        params: { id, actividad_id, nombreActividad },
      });
    },

    modificarSeguimiento(id) {
      const actividad_id = this.fecha.id_actividad;
      const nombreActividad = this.nombreActividad;
      this.$router.push({
        name: "ModificarSeguimientoActividad",
        params: { id, actividad_id, nombreActividad },
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
  width: 400px;
}

.campos .acciones {
  width: 100px;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
}
</style>
