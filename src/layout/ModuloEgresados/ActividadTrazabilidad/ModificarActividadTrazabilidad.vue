<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR TRAZABILIDAD ACTIVIDAD:</h1>
      </div>
      <div class="card-body">
        <div
          class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1 center"
        >
          <div v-if="!estadoPeticion">
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <AnimacionCargando></AnimacionCargando>
              </div>
            </div>
          </div>
          <div v-if="estadoPeticion">
            <div
              v-for="(trazabilidad, key) in listaTrazabilidadActividad"
              :key="key"
            >
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold"
                      >{{ trazabilidad.trazabilidad
                      }}<span class="text-danger">*</span>:</label
                    >
                    <div>
                      <input
                        type="number"
                        id="asistencia"
                        v-model="trazabilidad.asistencia"
                        name="asistencia"
                        placeholder="Ingrese el numero de asitencias"
                        class="form-control mb-3"
                      />
                      <small
                        v-show="errors.has('asistencia')"
                        class="text-danger"
                        >{{ errors.first("asistencia") }}
                      </small>
                    </div>
                    <!-- <button
                      class="btn btn-azul-sena w-100"
                      @click="aumentar(key)"
                    >
                      Registrar
                    </button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <button
              class="btn btn-azul-sena w-100"
              @click="validarFormulario()"
            >
              Modificar Trazabilidad Actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  import Component from "vue-class-component";
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import AnimacionCargando from "../../../components/animacionCargando.vue";

  @Component({
    components: {
      AnimacionCargando,
    },
  })
  export default class TrazabilidadActividad extends Vue {
    estadoPeticion = false;
    actividad = "";
    listaTrazabilidadActividad: any[] = [];
    trazabilidad = {
      id_trazabilidad_actividad: 0,
      asistencia: 0,
    }
    mounted() {
      this.actividad = this.$route.params.id_actividad;
      this.obtenerTrazabilidadActividad();
    }

    obtenerTrazabilidadActividad() {
      Axios()
        .get("listar_trazabilidad_actividad/" + this.actividad)
        .then((respuesta) => {
          this.listaTrazabilidadActividad = respuesta.data.results;
          if (this.listaTrazabilidadActividad == null) {
            Swal.fire({
              title: "Falta registrar trazabilidad",
              text: "No se ha registrado ninguna trazabilidad",
              icon: "info",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            this.$router.push({ name: "GestionarActividadCentro" });
          } else {

          }
        })
        .finally(() => {
          this.estadoPeticion = true;
        });
    }

    modificarTrazabilidad() {
      for (let i = 0; i < this.listaTrazabilidadActividad.length; i++) {
        this.trazabilidad.id_trazabilidad_actividad = this.listaTrazabilidadActividad[i].id_trazabilidad_actividad;
        this.trazabilidad.asistencia = this.listaTrazabilidadActividad[i].asistencia;
        Axios()
          .put("editar_trazabilidad_actividad/" + this.trazabilidad.id_trazabilidad_actividad, {
            asistencia: this.trazabilidad.asistencia
          })
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Trazabilidad Modificada",
                text: "Se Modifico la Trazabilidad",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
              this.$router.push({ name: "GestionarActividadCentro" });

            } else {
              Swal.fire("ERROR!", "No se Modifico la Trazabilidad", "error");
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
    }
    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          this.modificarTrazabilidad();
        }
      });
    }
  }
</script>