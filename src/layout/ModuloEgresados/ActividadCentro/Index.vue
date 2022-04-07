<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          GESTIONAR ACTIVIDADES CENTRO DE FORMACIÓN
        </h1>
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
                name: 'RegistrarActividadCentro'
              }"
            >
              Seleccionar Actividad
            </router-link>
          </div>
        </div>

        <div class="table-responsive" v-if="!estadoPeticion">
          <paginate
            ref="paginator"
            name="actividades"
            :list="actividades"
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
              <tbody v-if="actividades != ''">
                <tr
                  v-for="(actividad, key) in paginated('actividades')"
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

                  <td class="campos">
                    <div class="acciones">
                      <div
                        class="btn-group btn-spc"
                        tooltip="Activo"
                        tooltip-flow="top"
                      >
                        <router-link
                          class="btn btn-sm bg-azul-sena text-white"
                          :to="{
                            name: 'RegistrarActividadTrazabilidad',
                            params: {
                              id_actividad: actividad.id_actividad,
                              id_eje: actividad.id_eje
                            }
                          }"
                        >
                          <i class="fas fa-clipboard-list"></i>
                        </router-link>
                      </div>
                      <div
                        class="btn-group btn-spc"
                        tooltip="Ver Actividad trazabilidad"
                        tooltip-flow="top"
                      >
                        <router-link
                          class="btn btn-sm bg-azul-sena text-white"
                          :to="{
                            name: 'VerDetalleActividadTrazabilidad',
                            params: {
                              id_actividad: actividad.id_actividad,
                              id_eje: actividad.id_eje
                            }
                          }"
                        >
                          <i class="fas fa-eye"></i>
                        </router-link>
                      </div>
                      <div
                        class="btn-group btn-spc"
                        tooltip="Modificar Actividad Trazabilidad"
                        tooltip-flow="top"
                      >
                        <router-link
                          class="btn btn-sm bg-azul-sena text-white"
                          :to="{
                            name: 'ModificarActividadTrazabilidad',
                            params: {
                              id_actividad: actividad.id_actividad,
                              id_eje: actividad.id_eje
                            }
                          }"
                        >
                          <i class="fas fa-edit"></i>
                        </router-link>
                      </div>
                      <div
                        class="btn-group btn-spc"
                        tooltip="Eliminar Actividad"
                        tooltip-flow="top"
                      >
                        <a
                          @click="
                            eliminarActividad(actividad.id_actividad, key)
                          "
                          class="btn btn-sm bg-azul-sena text-white"
                        >
                          <i class="fas fa-trash"></i>
                        </a>
                      </div>

                      <div
                        class="btn-group btn-spc"
                        tooltip="Adicionar seguimiento"
                        tooltip-flow="top"
                        v-if="
                          actividad.fecha_inicio_actividad != null &&
                            actividad.fecha_final_actividad != null
                        "
                      >
                        <a
                          @click="
                            realizarSeguimiento(
                              actividad.id_actividad,
                              actividad.actividad,
                              actividad.fecha_final_actividad
                            )
                          "
                          class="btn btn-sm bg-azul-sena text-white mr-1"
                        >
                          <i class="fas fa-pen-square"></i>
                        </a>
                      </div>

                      <div
                        class="btn-group btn-spc"
                        tooltip="Lista seguimientos"
                        tooltip-flow="top"
                        v-if="
                          actividad.fecha_inicio_actividad != null &&
                            actividad.fecha_final_actividad != null
                        "
                      >
                        <a
                          @click="
                            listaSeguimiento(
                              actividad.id_actividad,
                              actividad.actividad
                            )
                          "
                          class="btn btn-sm bg-azul-sena text-white mr-1"
                        >
                          <i class="fas fa-paste"></i>
                        </a>
                      </div>

                      <div
                        class="btn-group btn-spc"
                        tooltip="Fecha programacion"
                        tooltip-flow="top"
                        v-if="
                          actividad.fecha_inicio_actividad == null &&
                            actividad.fecha_final_actividad == null
                        "
                      >
                        <a
                          v-b-tooltip.hover.bottomleft
                          title=""
                          @click="modal(actividad.id_actividad)"
                          class="btn btn-sm bg-azul-sena text-white"
                        >
                          <i class="far fa-calendar-alt"></i>
                        </a>
                      </div>
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
          :async="true"
          :classes="{
            ul: 'simple-links-container',
            li: 'simple-links-item',
            liActive: ['simple-links-item', 'active1'],
            'li.active': 'active1'
          }"
        ></paginate-links>
        <!-- modal para inicio de la fecha de programacion -->

        <div class="container">
          <modal
            :show.sync="verModal"
            body-classes="p-0"
            modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
          >
            <template slot="header">
              <h2
                class="text-azul-sena modal-title"
                id="modalNovedadesAprendiz"
              >
                FECHA PROGRAMACION
              </h2>
            </template>
            <card
              type="white"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0"
            >
              <template class="row">
                <!-- campo fecha -->
                <div class="col-lg-12 col-sm-12 py-2 center">
                  <div class="form-group">
                    <label class="mt-2 font-weight-bold" for="cedula">
                      Fecha Inicio
                      <span class="text-danger">*</span>
                      :
                    </label>
                    <input
                      v-model="fechas_actividad.fecha_inicio"
                      :max="fechas_actividad.fecha_fin"
                      type="date"
                      class="form-control"
                      placeholder="fecha en que aplica la suspención"
                      name="fecha_inicio"
                      id="fecha_inicio"
                      required
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_inicio')"
                      class="text-danger"
                    >
                      {{ errors.first("fecha_inicio") }}
                    </small>
                  </div>
                </div>

                <div class="col-lg-12 col-sm-12 py-2 center">
                  <div class="form-group">
                    <label class="mt-2 font-weight-bold" for="cedula">
                      Fecha Fin
                      <span class="text-danger">*</span>
                      :
                    </label>
                    <input
                      type="date"
                      v-model="fechas_actividad.fecha_fin"
                      :min="fechas_actividad.fecha_inicio"
                      class="form-control"
                      placeholder="fecha en que aplica la suspención"
                      name="fecha_fin"
                      id="fecha_fin"
                      required
                      v-validate="{ required: true }"
                    />
                    <small v-show="errors.has('fecha_fin')" class="text-danger">
                      {{ errors.first("fecha_fin") }}
                    </small>
                  </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                  <button
                    class="btn btn-azul-sena col-12 col-md-8"
                    @click="validarFormulario()"
                  >
                    registrar
                  </button>
                </div>
              </template>
            </card>
          </modal>
        </div>

        <!-- modal fin -->
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
      AnimacionCargando
    },

    mounted() {
      this.cargarActividades();
    },
    created() {
      const dict = {
        messages: {
          required: () => "Campo obligatorio",
          date_format: () => "Campo obligatorio",
          decimal: () => "Campo obligatorio",
          min_value: () => "No pude ser negativo",
          max: () =>
            "La suma de los cupos no puede ser mayor a " +
            this.convocatoria.cupo_total,
          alpha_spaces: () => "No permite numeros ni caracteres especiales",
          alpha_num: () => "No permite caracteres especiales"
        }
      };
      this.$validator.localize("es", dict);
    },

    data() {
      return {
        estadoPeticion: true,
        id_usuario: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,
        actividades: [],
        // CargoActividad= {
        //   "id_actividad" :'' ,
        //       "usuario_responsable_id": '',
        //       "centro_formacion_id": '',
        //       "estado_actividad_id": '',
        //       "gestion_actividad_id": '',
        //       "actividad_id": '',
        //       "herramienta_seguimiento1_id": '',
        //       "herramienta_seguimiento2_id": '',
        //       "periodicidad1_id": '',
        //       "periodicidad2_id": '',
        //       "rol_operativo_general_id": '',
        //       "rol_operativo_regional_id": '',
        //       "rol_operativo_centro_id": '',
        //       "grupo_id": '',
        //       "indicador_estrategico_id": '',
        //       "actividad": '',
        //       "fecha_inicio_actividad": '',
        //       "fecha_final_actividad": '',
        //       "cumplimiento": '',
        //       "otros_responsables": '',
        //       "creado": '',
        //       "actualizado": '',
        //       "peso": '',
        //       "resultado_esperado": '',
        //       "observacion1": '',
        //       "observacion2": '',
        //       "anexo": '',
        //       "glosario": '',
        //       "proceso_id": '',
        //       "rol_estrategico_id": '',
        //       "id_centro_formacion": '',
        //       "municipio_id": '',
        //       "regional_id": '',
        //       "centro_formacion": '',
        //       "direccion_centro_formacion": '',
        //       "telefono_centro_formacion": '',
        //       "activo": '',
        //       "id_regional": '',
        //       "codigo_regional": '',
        //       "departamento_id": '',
        //       "regional": '',
        //       "direccion": '',
        //       "activa": '',
        //       "id_indicador": '',
        //       "operador_id": '',
        //       "dependencia_perspectiva_id": '',
        //       "pes_estrategia_id": '',
        //       "mipg_politica_id": '',
        //       "mipg_planes_id": '',
        //       "linea_id": '',
        //       "indicador":'',
        //       "formula": '',
        //       "valor_esperado": '',
        //       "umbral": '',
        //       "pacto_id": '',
        //       "objetivo_estrategico_id": '',
        //       "lineamiento_id": '',
        //       "eje_id": '',
        //       "id_eje": '',
        //       "eje": '',
        //       "id_pes_estrategia": '',
        //       "pes_objetivo_id": '',
        //       "pes_estrategia": '',
        //       "id_rol_operativo": '',
        //       "rol_operativo": '',
        //       "tipo": '',
        //       "id_periodicidad":'',
        //       "periodicidad": '',
        //       "en_dias": '',

        //     },

        paginate: ["actividades"],
        verModal: false,
        fechas_actividad: {
          fecha_inicio: "",
          fecha_fin: "",

          id_actividad: ""
        }
      };
    },

    methods: {
      cargarActividades() {
        Axios()
          .get("listar_actividades_centro/" + this.id_usuario)
          .then(respuesta => {
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
                  confirmButton: "btn btn-azul-sena"
                }
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
      almacenarFechas() {
        Axios()
          .post("fechas_actividad", this.fechas_actividad)
          .then(respuesta => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Fechas Registradas",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276"
              });
              this.verModal = false;
              this.cargarActividades();
            }
            if (respuesta.data.status == "info") {
              Swal.fire({
                title: "error",
                text: respuesta.data.message,
                icon: "warning",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena"
                }
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
          title: "Eliminar Actividad " + this.actividades[index].actividad + "?",
          icon: "warning",
          confirmButtonText: "Eliminar",
          confirmButtonColor: "#238276",
          cancelButtonColor: "#2d2d2d",
          cancelButtonText: "Cancelar",
          showCancelButton: true
        }).then(respuesta => {
          if (respuesta.isConfirmed) {
            Axios()
              .delete("eliminar_actividad_centro/" + id)
              .then(respuesta => {
                if (respuesta.data.status == "success") {
                  Swal.fire({
                    title: "Actividad Eliminada",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    customClass: {
                      confirmButton: "btn btn-azul-sena"
                    }
                  });
                  this.actividades.splice(index, 1);
                } else {
                  Swal.fire({
                    title: "INFO",
                    text: respuesta.data.message,
                    icon: "warning",
                    confirmButtonText: "Aceptar",
                    customClass: {
                      confirmButton: "btn btn-azul-sena"
                    }
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

      modal(id) {
        this.verModal = true;

        this.fechas_actividad.id_actividad = id;
      },

      realizarSeguimiento(id, actividad, fechaFin) {
        const actividad_id = id;
        const nombreActividad = actividad;
        const fechaFinal = fechaFin;
        this.$router.push({
          name: "RegistrarSeguimientoActividad",
          params: { actividad_id, nombreActividad, fechaFinal }
        });
      },

      listaSeguimiento(id, actividad) {
        const actividad_id = id;
        const nombreActividad = actividad;
        this.$router.push({
          name: "GestionarSeguimientoActividad",
          params: { actividad_id, nombreActividad }
        });
      },

      validarFormulario() {
        this.$validator.validate().then(valid => {
          if (valid) {
            this.almacenarFechas();
          }
        });
      }
    }
  };
</script>

<style scoped>
  .agregar {
    width: 200px;
  }

  .campos .actividad {
    width: 400px;
  }
  .campos .acciones {
    width: 100px;
    display: grid;
    gap: 0.8rem;
    grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
  }
</style>
