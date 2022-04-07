<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena"></h1>
        <div class="d-flex justify-content-around mt-3">
          <h3 class="circle ">1</h3>
          <h3 class="circle ">2</h3>
          <h3 class="circle circle-seleccionado">3</h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <!-- objetivos -->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Objetivo<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="objetivo"
                  v-validate="'required'"
                  v-model="indicador.id_objetivo_estrategico"
                >
                  <option value="" selected disabled>
                    Seleccione el objetivo
                  </option>
                  <option
                    v-for="(objetivo, key) in objetivosFiltrado"
                    :key="key"
                    v-bind:value="objetivo.id_objetivo_estrategico"
                  >
                    {{ objetivo.objetivo_estrategico }}
                  </option>
                </select>
                <small v-show="errors.has('objetivo')" class="text-danger">
                  {{ errors.first("objetivo") }}
                </small>
              </div>
            </div>
          </div>

          <!-- pactos-->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Pacto<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="pacto"
                  v-model="indicador.id_pacto"
                  v-validate="'required'"
                >
                  <option value="" selected disabled>
                    Seleccionar el pacto
                  </option>
                  <option
                    v-for="(pacto, key) in pactos"
                    :key="key"
                    v-bind:value="pacto.id_pacto"
                  >
                    {{ pacto.pacto }}
                  </option>
                </select>
                <small v-show="errors.has('pacto')" class="text-danger">
                  {{ errors.first("pacto") }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- lineas-->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Linea<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="linea"
                  v-model="indicador.id_linea"
                  v-validate="'required'"
                >
                  <option value="" selected disabled>
                    Seleccionar la linea
                  </option>
                  <option
                    v-for="(linea, key) in lineas"
                    :key="key"
                    v-bind:value="linea.id_linea"
                  >
                    {{ linea.linea }}
                  </option>
                </select>
                <small v-show="errors.has('linea')" class="text-danger">
                  {{ errors.first("linea") }}
                </small>
              </div>
            </div>
          </div>

          <!--pesEstrategias-->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Estrategia<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="estrategia"
                  v-model="indicador.id_pes_estrategia"
                  v-validate="'required'"
                >
                  <option value="" selected disabled>
                    Seleccionar la estrategia
                  </option>
                  <option
                    v-for="(estrategia, key) in pesEstrategias"
                    :key="key"
                    v-bind:value="estrategia.id_pes_estrategia"
                  >
                    {{ estrategia.pes_estrategia }}
                  </option>
                </select>
                <small v-show="errors.has('estrategia')" class="text-danger">
                  {{ errors.first("estrategia") }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <!--mipgPoliticas-->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Política<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="politica"
                  v-model="indicador.id_mipg_politica"
                  v-validate="'required'"
                >
                  <option value="" selected disabled>
                    Seleccionar la politica
                  </option>
                  <option
                    v-for="(politica, key) in mipgPoliticas"
                    :key="key"
                    v-bind:value="politica.id_mipg_politica"
                  >
                    {{ politica.mipg_politicas }}
                  </option>
                </select>
                <small v-show="errors.has('politica')" class="text-danger">
                  {{ errors.first("politica") }}
                </small>
              </div>
            </div>
          </div>

          <!--mipgPlanes-->
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Plan<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="plan"
                  v-model="indicador.id_mipg_planes"
                  v-validate="'required'"
                >
                  <option value="" selected disabled>
                    Seleccionar el plan
                  </option>
                  <option
                    v-for="(plan, key) in mipgPlanes"
                    :key="key"
                    v-bind:value="plan.id_mipg_planes"
                  >
                    {{ plan.mipg_planes }}
                  </option>
                </select>
                <small v-show="errors.has('plan')" class="text-danger">
                  {{ errors.first("plan") }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Indicador<span class="text-danger">*</span>:</label
              >
              <input
                class="form-control"
                type="text"
                placeholder="ingrese el indicador"
                name="indicador"
                id="indicador"
                v-model="indicador.indicador"
                v-validate="'required'"
              />
              <small v-show="errors.has('indicador')" class="text-danger">
                {{ errors.first("indicador") }}
              </small>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Fórmula<span class="text-danger">*</span>:</label
              >
              <input
                class="form-control"
                type="text"
                placeholder="ingrese la formula"
                name="formula"
                id="formula"
                v-model="indicador.formula"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Valor esperado<span class="text-danger"></span>:</label
              >
              <input
                class="form-control"
                type="number"
                placeholder="ingrese el valor esperado"
                name="valor_esperado"
                id="valor_esperado"
                v-model="indicador.valor_esperado"
              />
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Umbral<span class="text-danger"></span>:</label
              >
              <input
                class="form-control"
                type="number"
                placeholder="ingrese el umbral"
                name="umbral"
                id="umbral"
                v-model="indicador.umbral"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Tema<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="tema"
                  v-validate="'required'"
                  v-model="indicador.id_linea_tema"
                >
                  <option value="" selected disabled>
                    Seleccione el tema
                  </option>
                  <option
                    v-for="(tema, key) in lineaTemas"
                    :key="key"
                    v-bind:value="tema.id_linea_tema"
                  >
                    {{ tema.linea_tema }}
                  </option>
                </select>
                <small v-show="errors.has('tema')" class="text-danger">
                  {{ errors.first("tema") }}
                </small>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Eje<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  v-validate="'required'"
                  placeholder="ingrese el eje"
                  name="eje"
                  id="eje"
                  v-model="indicador.id_eje"
                >
                  <option value="" selected disabled>
                    Seleccione el eje
                  </option>
                  <option
                    v-for="(Leje, key) in listarEjes"
                    :key="key"
                    :value="Leje.id_eje"
                  >
                    {{ Leje.eje }}
                  </option>
                </select>
                <small v-show="errors.has('eje')" class="text-danger">
                  {{ errors.first("eje") }}
                </small>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Lineamiento<span class="text-danger">*</span>:</label
              >

              <textarea
                class="form-control"
                type="text"
                placeholder="ingrese el lineamiento"
                name="lineamiento"
                id="lineamiento"
                v-model="indicador.lineamiento"
                v-validate="'required'"
              ></textarea>
              <small v-show="errors.has('lineamiento')" class="text-danger">
                {{ errors.first("lineamiento") }}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1" v-if="verPane == true">
            <base-button
              type="azul-sena"
              @click.prevent="validarFormulario()"
              class="btn btn-block bg-azul-sena text-white"
              >Registrar</base-button
            >
          </div>

          <div class="col-lg-4 col-sm-12 mt-1" v-if="verPane == false">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarPANE',
              }"
            >
              Gestionar PANE
            </router-link>
          </div>
        </div>

        <br />
        <br />

        <h2 class="text-center text-azul-sena">LINEAMIENTO</h2>
        <div class="table-responsive">
          <table class="table table-hover table-inverse">
            <thead class="bg-gradient-azul-sena text-white" id="listado">
              <tr>
                <!-- parte del grupo -->
                <th>PROCESO NIVEL 1</th>
                <th>PROCESO NIVEL 2</th>
                <th>DEPENDENCIA</th>
                <th>GRUPO</th>

                <template v-if="mostrar == true">
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
                </template>

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
            <tbody>
              <tr>
                <td>
                  <div>{{ listaGrupo.tipo_proceso }}</div>
                </td>

                <td class="campos">
                  <div class="primera-seccion">{{ listaGrupo.proceso }}</div>
                </td>

                <td class="campos">
                  <div class="primera-seccion">
                    {{ listaGrupo.dependencia }}
                  </div>
                </td>

                <td class="campos">
                  <div class="tercera-seccion">{{ listaGrupo.grupo }}</div>
                </td>

                <template v-if="mostrar == true">
                  <td>
                    <div>{{ listaIndicador.perspectiva }}</div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ listaIndicador.objetivo_estrategico }}
                    </div>
                  </td>
                  <td>
                    <div>{{ listaIndicador.indicador }}</div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ listaIndicador.pacto }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ listaIndicador.linea }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ listaIndicador.pes_objetivo }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="segunda-seccion">
                      {{ listaIndicador.pes_estrategia }}
                    </div>
                  </td>

                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ listaIndicador.mipg_dimenciones }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ listaIndicador.mipg_politicas }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="tercera-seccion">
                      {{ listaIndicador.mipg_planes }}
                    </div>
                  </td>
                  <td class="campos">
                    <div class="primera-seccion">
                      {{ listaIndicador.linea_tema }}
                    </div>
                  </td>
                  <td>{{ listaIndicador.lineamiento }}</td>
                </template>

                <td>{{ listaActividadAct.actividad }}</td>
                <td>{{ listaActividadAct.resultado_esperado }}</td>
                <td>{{ listaActividadAct.herramienta_seguimiento1 }}</td>
                <td>{{ listaActividadAct.observacion1 }}</td>
                <td>{{ listaActividadAct.periodicidad1 }}</td>
                <td>{{ listaActividadAct.herramienta_seguimiento2 }}</td>
                <td>{{ listaActividadAct.observacion2 }}</td>
                <td>{{ listaActividadAct.periodicidad2 }}</td>
                <td>{{ listaActividadAct.rol_operativo_general }}</td>
                <td>{{ listaActividadAct.rol_operativo_regional }}</td>
                <td>{{ listaActividadAct.rol_operativo_centro }}</td>
                <td>{{ listaActividadAct.anexo }}</td>
                <td>{{ listaActividadAct.glosario }}</td>

                <td>
                  <span tooltip="Eliminar Actividad" tooltip-flow="top">
                    <a
                      @click="eliminarActividad()"
                      class="btn btn-sm bg-azul-sena text-white"
                    >
                      <i class="fas fa-trash"></i>
                    </a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
export default {
  name: "CrearIndicador",

  mounted() {
    this.id_actividad = this.$route.params.actividad_id;
    this.cargarActividad(this.id_actividad);
    this.cargarGrupo(this.id_actividad);
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
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  },

  data: function() {
    return {
      objetivos: [],
      objetivosFiltrado: [],
      pactos: [],
      lineas: [],
      pesEstrategias: [],
      mipgPoliticas: [],
      mipgPlanes: [],
      lineaTemas: [],
      listaActividadAct: [],
      listaActividadPers: [],
      listaGrupo: [],
      listaIndicador: [],
      listarEjes: [],
      mostrar: false,
      verPane: true,
      indicador: {
        id_objetivo_estrategico: "",
        id_pes_estrategia: "",
        id_mipg_politica: "",
        id_mipg_planes: "",
        id_linea: "",
        indicador: "",
        id_pacto: "",
        id_linea_tema: "",
        formula: "",
        valor_esperado: "",
        umbral: "",
        lineamiento: "",
        id_eje: "",
        eje: "",
      },
    };
  },

  methods: {
    eliminarActividad() {
      Swal.fire({
        title: "Eliminar Actividad ",
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_actividad/" + this.id_actividad)
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
                this.$router.push("RegistrarActividadesPANE");
              } else {
                Swal.fire({
                  title: "No se pudo eliminar la actividad",
                  text: respuesta.data.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
                this.$router.back();
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
    cargarDatos() {
      Axios()
        .get("crear_indicador")
        .then((respuesta) => {
      
          this.objetivos = respuesta.data.results.objetivos;
          this.objetivosFiltrado = respuesta.data.results.objetivos;
          this.pactos = respuesta.data.results.pactos;
          this.lineas = respuesta.data.results.lineas;
          this.pesEstrategias = respuesta.data.results.pesEstrategias;
          this.mipgPoliticas = respuesta.data.results.mipgPoliticas;
          this.mipgPlanes = respuesta.data.results.mipgPlanes;
          this.lineaTemas = respuesta.data.results.lineaTemas;
          this.listarEjes = respuesta.data.results.ejes;
          this.filtroDependencia();
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    filtroDependencia() {
    let arregloFiltrado = [];
    for (let obj of this.objetivos) {
      for(let act of this.listaActividadPers){
      if (obj.perspectiva_id == act.perspectiva_id) {
        arregloFiltrado.push(obj);
      }
      }
      this.objetivosFiltrado = arregloFiltrado;
    }
  },
    cargarActividad(id) {
      Axios()
        .get("ver_actividad/" + id)
        .then((respuesta) => {
     
          this.listaActividadAct = respuesta.data.results.actividad;
          this.listaActividadPers = respuesta.data.results.perspectiva;
          this.cargarDatos();
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un debe crear una actividad antes!",
            "error"
          );
        });
    },

    cargarGrupo(id) {
      Axios()
        .get("ver_grupo/" + id)
        .then((respuesta) => {
          this.listaGrupo = respuesta.data;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un debe crear un grupo antes!",
            "error"
          );
        });
    },

    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.registrarIndicador();

          this.mostrar = true;
          this.verPane = false;
        }
      });
    },

    registrarIndicador() {
      Axios()
        .post("almacenar_indicador/" + this.id_actividad, this.indicador)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            Swal.fire({
              title: "Indicador registrado",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            this.cargarIndicador(this.id_actividad);
          } else {
            Swal.fire({
              title: "indicador no registrado",
              icon: "error",
              text: respuesta.message,
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
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
    },

    cargarIndicador(id) {
      Axios()
        .get("ver_indicador/" + id)
        .then((respuesta) => {
          this.listaIndicador = respuesta.data;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un debe crear una actividad antes!",
            "error"
          );
        });
    },

    // resetearCampos(){
    //     this.indicador.id_objetivo_estrategico = ''
    //     this.indicador.id_pes_estrategia = ''
    //     this.indicador.id_mipg_politica = ''
    //     this.indicador.id_mipg_planes = ''
    //     this.indicador.id_linea = ''
    //     this.indicador.indicador = ''
    //     this.indicador.id_pacto = ''
    //     this.indicador.formula = ''
    //     this.indicador.valor_esperado = ''
    //     this.indicado.rumbral = ''
    // },
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
</style>
