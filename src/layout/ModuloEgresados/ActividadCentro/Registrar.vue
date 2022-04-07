<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">ACTIVIDADES CENTRO DE FORMACION</h1>
      </div>

      <div class="card-body">
        <div class="text-center" v-if="estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="container-fluid" v-if="!estadoPeticion">
          <p class="font-weight-bold">Selecione las actividades:</p>
          <template v-if="actividades != ''">
            <div
              class="d-flex col-12  mb-2 custom-control custom-checkbox"
              v-for="(actividad, key) in actividades"
              :key="key"
            >
              <input
                name="medio_divulgacion"
                type="checkbox"
                class="custom-control-input"
                :id="actividad.id_actividad"
                v-bind:value="actividad.id_actividad"
                v-model="lista_id_actividad"
              />
              <label
                :for="actividad.id_actividad"
                class="custom-control-label text-justify px-0"
                >{{ actividad.actividad }}</label
              >
            </div>
          </template>

          <p v-else>
            No hay actividades para seleccionar!
          </p>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center" >
          <div class="col-lg-4 col-sm-12 mt-1" v-if="actividades != ''">
            <base-button
              type="azul-sena"
              @click.prevent="validarActividades()"
              class="btn btn-block bg-azul-sena text-white"
              >Seleccionar Actividad
            </base-button>
          </div>

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
    this.cargarActividades();
  },

  data() {
    return {
      estadoPeticion: true,
      actividades: [],
      id_usuario: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,

      id_centro_formacion: JSON.parse(sessionStorage.getItem("usuario"))
        .id_centro_formacion,
      lista_id_actividad: [],
    };
  },

  methods: {
    cargarActividades() {
      Axios()
        .get("crear_actividad_centro/" + this.id_usuario)
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
    almacenarActividad() {
      for (let i = 0; i < this.lista_id_actividad.length; i++) {
        const id_actividad = this.lista_id_actividad[i];
        Axios()
          .post("almacenar_actividad_centro", {
            id_actividad: id_actividad,
            id_centro_formacion: JSON.parse(sessionStorage.getItem("usuario"))
              .centro_formacion_id,
            id_usuario: JSON.parse(sessionStorage.getItem("usuario"))
              .id_usuario,
          })
          .then((respuesta) => {
          })
          .catch(() => {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          });
      }
      Swal.fire(
        "Actividades Registradas!",
        "Se ha registrado exitosamente",
        "success"
      );
      this.$router.push("GestionarActividadCentro");
    },

    validarActividades() {
      if (this.lista_id_actividad != '') {
        this.almacenarActividad();
      }else{
        Swal.fire({
              title: "Información",
              text: "Por favor seleccione una actividad",
              icon: "warning",
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
            });
      }
    }
  },
};
</script>

<style scoped></style>
