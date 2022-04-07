<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MI CAPACITACIÓN</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <span slot="title">Mi Capacitación Registrada</span>
                <div class="card-body">
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong> Capacitación:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.capacitacion }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Competencia Programa:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.competencia_programa_oferta }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Fecha Inicio:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.fecha_inicio }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Fecha Fin:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.fecha_final }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Eje :</strong>
                        </div>
                        <div
                          id="contenido"
                          v-if="datosCapacitacion.eje != null"
                        >
                          <p id="texto">
                            <!-- dato nulo -->
                            {{ datosCapacitacion.eje }}
                          </p>
                        </div>
                        <div id="contenido" v-else>
                          <p id="texto">Dato null</p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Entidad Capacitación:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.entidad_capacitadora }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Convocatoria :</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.convocatoria }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Linea tecnológica:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.linea_tecnologica }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Lugar :</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto" v-if="datosCapacitacion.lugar != null">
                            {{ datosCapacitacion.lugar }}
                          </p>
                          <p id="texto" v-if="datosCapacitacion.lugar == null">
                            {{ datosCapacitacion.municipio }} - {{datosCapacitacion.departamento}}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Estado inscripción:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ datosCapacitacion.pic_fase_convocatoria }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </tabs>
            </div>
            <br />
          </div>
          <!-- Fin Contenido -->
        </div>
        <div class="card-footer">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1">
              <a
                class="btn btn-block bg-azul-sena text-white"
                @click="$router.back()"
              >
                Volver
              </a>
            </div>
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
import AnimacionCargando from "../../../../components/animacionCargando.vue";
import axios from "axios";

@Component({
  components: {},
})
export default class VerDetalleCapacitacion extends Vue {
  datosCapacitacion = {
    capacitacion: "",
    competencia_programa_oferta: "",
    componentes: "",
    convocatoria: "",
    eje: "",
    entidad_capacitacion: "",
    fecha_final: "",
    fecha_inicio: "",
    financiacion: "",
    id_pic_convocatoria: "",
    id_pic_fase: "",
    id_usuario_actualiza: "",
    linea_tecnologica: "",
    lugar: "",
    para_funcionarios: "",
    perfiles_requisitos: "",
    pertenece_a_red: "",
    pic_fase_convocatoria: "",
    pic_id: "",
    plan_institucional_id: "",
    resultado_aprendizaje: "",
    tipo_financiacion: "",
  };
  mounted() {
    this.obtenerCapacitacion(this.$route.params.id);
  }
  obtenerCapacitacion(id) {
    Axios()
      .get("editar_convocatoria_pic/" + id)
      .then((respuesta) => {
        this.datosCapacitacion = respuesta.data.results;
        // .log(respuesta.data.results);
      });
  }
}
</script>
