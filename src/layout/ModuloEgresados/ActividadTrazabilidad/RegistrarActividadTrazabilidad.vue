<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR TRAZABILIDAD ACTIVIDAD:</h1>
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
            <!-- {{listaActividadEje}} -->
            <div v-for="(trazabilidad, key) in listaActividadEje" :key="key">
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold"
                      >{{ trazabilidad.trazabilidad
                      }}<span class="text-danger">*</span>:</label
                    >
                    <div>
                      <!-- {{key}} -->
                      <input
                        :disabled="estadoDeshabilitado"
                        type="number"
                        id="asistencia"
                        name="asistencia"
                        v-model.number="listaActividadEje[key].asistencia"
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
              :disabled="estadoDeshabilitado"
            >
              Registrar Trazabilidad Actividad
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
    estado_eje = "";
    actividad = "";
    id_trazabilidad;
    estadoDeshabilitado = false;
    listaActividadEje: any[] = [];
    listaTrazabilidadActividad = [];
    trazabilidad = {
      trazabilidad_id: 0,
      asistencia: 0,
    }

    mounted() {
      this.estado_eje = this.$route.params.id_eje;
      this.actividad = this.$route.params.id_actividad;
      this.verActividadTrazabilidad();
      this.obtenerTrazabilidadActividad();
    }
    
    aumentar(posicion) {
      // alert("aaaa")
      this.listaActividadEje[posicion].asistencia = this.listaActividadEje[posicion].asistencia + 1
    }

    verActividadTrazabilidad() {
      Axios()
        .get("ver_trazabilidad_eje/" + this.estado_eje)
        .then((respuesta) => {
          this.listaActividadEje = respuesta.data.results;
          // this.listaActividadEje[index].asistencia = "";

          // this.id_trazabilidad = respuesta.data.results[0].id_trazabilidad;
          for (let i = 0; i < this.listaActividadEje.length; i++) {
            this.listaActividadEje[i].asistencia = 0;
          }

        })
        .finally(() => {
          this.estadoPeticion = true;
        });
    }
    // 
    registrarTrazabilidad() {
      for (let i = 0; i < this.listaActividadEje.length; i++) {
        this.trazabilidad.asistencia = this.listaActividadEje[i].asistencia;
        this.trazabilidad.trazabilidad_id = this.listaActividadEje[i].id_trazabilidad;
        Axios()
          .post("almacenar_trazabilidad_actividad", {
            actividad_id: this.$route.params.id_actividad,
            trazabilidad_id: this.trazabilidad.trazabilidad_id,
            asistencia: this.trazabilidad.asistencia
          })
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Trazabilidad Guardada",
                text: "Se guardo la Trazabilidad",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
              this.$router.push({ name: "GestionarActividadCentro" });

            } else {
              Swal.fire("ERROR!", "No se Guardo la Trazabilidad", "error");
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

    obtenerTrazabilidadActividad() {
      Axios()
        .get("listar_trazabilidad_actividad/" + this.actividad)
        .then((respuesta) => {
          this.listaTrazabilidadActividad = respuesta.data.results;
          if (this.listaTrazabilidadActividad == null) {
            this.estadoDeshabilitado = false;
          } else {
            this.estadoDeshabilitado = true;
            Swal.fire({
              title: "Trazabilidad Ya Guardada",
              text: "No se puede volver a guardar",
              icon: "info",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            this.$router.push({ name: "GestionarActividadCentro" });
          }
        })
    }

    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          this.registrarTrazabilidad();
        }
      });
    }
  }
</script>