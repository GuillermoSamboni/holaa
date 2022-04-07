<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">GESTIONAR PANE</h1>
      </div>

      <div class="card-body">
        <paginate-links
          class="pagination justify-content-end"
          for="lineamientos"
          :limit="3"
          :hide-single-page="true"
          :show-step-links="true"
          :full-page="true"
          :async="true"
          :classes="{
            ul: 'simple-links-container',
            li: 'simple-links-item',
            liActive: ['simple-links-item', 'active1'],
            'li.active': 'active1',
          }"
        ></paginate-links>

        <div class="text-center" v-if="estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="scroll-vertical table-responsive" v-if="!estadoPeticion">
          
          <paginate
            ref="paginator"
            name="lineamientos"
            :list="lineamientos"
            :per="10"
          >
            
            <table class="table table-hover table-inverse">
              <thead class="bg-gradient-azul-sena text-white" id="listado">
                <tr>
                  <th>PROCESO NIVEL 1</th>
                  <th>PROCESO NIVEL 2</th>
                  <th>DEPENDENCIA</th>
                  <th>GRUPO</th>
                  <th>PERSPECTIVA</th>
                  <th>OBJETIVO</th>
                  <th>INDICADOR</th>
                  <th>PACTO</th>
                  <th>LINEA</th>
                  <th>OBJETIVO</th>
                  <th>ESTRATEGIA</th>
                  <th>DIMENSIONES</th>
                  <th>POLITICAS</th>
                  <th>PLANES</th>
                  <th>TEMA</th>
                  <th>LINEAMIENTO</th>
                  <th>ACCIÓN</th>
                  <th>RESULTADO ESPERADO</th>
                  <th>HERRAMIENTA DE SEGUIMIENTO 1</th>
                  <th>OBSERVACIÓN 1</th>
                  <th>PERIODICIDAD 1</th>
                  <th>HERRAMIENTA DE SEGUIMIENTO 2</th>
                  <th>OBSERVACIÓN 2</th>
                  <th>PERIODICIDAD 2</th>
                  <th>RESPONSABLE DIRECCIÓN GENERAL</th>
                  <th>RESPONSABLE DESPACHO REGIONAL</th>
                  <th>RESPONSABLE CENTRO DE FORMACIÓN</th>
                  <th>ANEXO</th>
                  <th>GLOSARIO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <div v-if="lineamientos.length <= 0">
              <p>No hay datos aún.</p>
              </div>
              <tbody v-if="lineamientos.length > 0">
                <tr
                  v-for="(lineamiento, key) in paginated('lineamientos')"
                  :key="key"
                >
                  <td>
                    <div>{{ lineamiento.tipo_proceso }}</div>
                  </td>

                  <td class="campos">
                    <div class="primera-seccion">{{ lineamiento.proceso }}</div>
                  </td>

                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.dependencia }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="tercera-seccion">{{ lineamiento.grupo }}</div>
                  </td>
                  <td>
                    <div>{{ lineamiento.perspectiva }}</div>
                  </td>
                  <td>
                    <div>{{ lineamiento.objetivo_estrategico }}</div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.indicador }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">{{ lineamiento.pacto }}</div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">{{ lineamiento.linea }}</div>
                  </td>

                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.pes_objetivo }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.pes_estrategia }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.mipg_dimenciones }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.mipg_politicas }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.mipg_planes }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.linea_tema }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.lineamiento }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.actividad }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.resultado_esperado }}
                    </div>
                  </td>
                  <td>{{ lineamiento.herramienta_seguimiento_1 }}</td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ lineamiento.observacion1 }}
                    </div>
                  </td>
                  <td>{{ lineamiento.periodicidad_1 }}</td>
                  <td>{{ lineamiento.herramienta_seguimiento_2 }}</td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ lineamiento.observacion2 }}
                    </div>
                  </td>
                  <td>{{ lineamiento.periodicidad_2 }}</td>
                  <td>{{ lineamiento.rol_direccion_general }}</td>
                  <td>{{ lineamiento.rol_despacho_regional }}</td>
                  <td>{{ lineamiento.rol_centro_formacion }}</td>
                  <td class="campos">
                    <div class="segunda-seccion">{{ lineamiento.anexo }}</div>
                  </td>
                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ lineamiento.glosario }}
                    </div>
                  </td>
                  <td>
                    <div
                      class="btn-group btn-spc"
                      tooltip="Eliminar Actividad"
                      tooltip-flow="top"
                    >
                      <a
                        @click="
                          eliminarActividad(lineamiento.id_actividad, key)
                        "
                        class="btn btn-sm bg-azul-sena text-white"
                      >
                        <i class="fas fa-trash"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </paginate>

        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="lineamientos"
          :limit="3"
          :hide-single-page="true"
          :show-step-links="true"
          :full-page="true"
          :async="true"
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
    this.cargarData();
  },

  data() {
    return {
      estadoPeticion: true,
      lineamientos: [],
      paginate: ["lineamientos"],
      filter: "",
    };
  },

  methods: {
    cargarData() {
      Axios()
        .get("listar_data")
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.lineamientos = respuesta.data.results;
            this.estadoPeticion = false;
          } else {
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
        title: "Eliminar Actividad " + this.lineamientos[index].actividad + "?",
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_actividad/" + id)
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
                // this.lineamientos.splice(index, 1);
                // this.cargarData()
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
            })
            .finally(() => {
              this.cargarData();
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.campos .primera-seccion {
  margin: 0%;
  width: 400px;
}
.campos .segunda-seccion {
  width: 1000px;
}
.campos .tercera-seccion {
  width: 200px;
}
.campos {
  margin: 0%;
  width: 100%;
}
.scroll-vertical {
  overflow: scroll;
  max-height: 400px;
}
</style>
