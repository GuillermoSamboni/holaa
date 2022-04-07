<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LISTA ADJUDICACIÓN</h1>

        <div class="row">
          <div>
            <small class="text-azul-sena mr-1"
              >Convocatoria: {{ this.convocatoria.convocatoria }}</small
            >
          </div>
          <div>
            <small class="text-azul-sena mr-1"
              >Tipo convocatoria: {{ this.convocatoria.tipo_apoyo }}</small
            >
          </div>
          <div>
            <small class="text-azul-sena"
              >Cupos: {{ this.convocatoria.cupo_total }}</small
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mx-1 my-3">
          <button
            class="btn btn-azul-sena ml-1"
            @click="cambiarEstadoConvocatoria()"
          >
            Finalizar Adjudicaciones
          </button>
          <paginate-links
            class="pagination justify-content-end"
            for="aprendicesInscritos"
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
          >
          </paginate-links>
        </div>
        <div class="table-responsive">
          <paginate
            ref="paginator"
            name="aprendicesInscritos"
            :list="aprendicesInscritos"
            :per="10"
          >
            <table class="table table table-hover table-inverse">
              <thead class="bg-naranja-sena text-white">
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Adjudicar</th>
                  <th>Puntaje</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(inscrito, key) in paginated('aprendicesInscritos')"
                  :key="key"
                >
                  <td>{{ inscrito.identificacion }}</td>
                  <td>
                    {{ inscrito.primer_nombre }} {{ inscrito.segundo_nombre }}
                    {{ inscrito.primer_apellido }}
                    {{ inscrito.segundo_apellido }}
                  </td>

                  <td>
                    <label class="custom-toggle text-naranja-sena">
                      <input
                        type="checkbox"
                        :checked="comparar(inscrito.identificacion)"
                        :ref="key"
                        :id="inscrito.identificacion"
                      />
                      <span
                        class="custom-toggle-slider rounded-circle"
                        @click="
                          (id_persona = inscrito.id_persona),
                            (adjudicar = !$refs[key][0].checked),
                            validarFormulario($refs[key][0].checked),
                            (nombre = inscrito.primer_nombre)
                        "
                        data-label-off="NO"
                        data-label-on="SI"
                      ></span>
                    </label>
                  </td>
                  <td v-if="inscrito.criterios_priorizacion != null">
                    {{ inscrito.criterios_priorizacion }}
                  </td>
                  <td v-else>0</td>
                </tr>
              </tbody>
            </table>
          </paginate>
          <paginate-links
            class="pagination justify-content-end"
            for="aprendicesInscritos"
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
          >
          </paginate-links>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <modal
            :show.sync="adjudicar"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm modal-lg"
          >
            <template slot="header">
              <h1
                class="text-azul-sena modal-title"
                id="modalNovedadesAprendiz"
              >
                FINALIZAR ADJUDICACION
              </h1>
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
                <div class="col-lg-6 col-sm-12 py-2 center">
                  <div class="form-group">
                    <label class="mt-2 font-weight-bold" for="cedula">
                      Fecha Inicio
                      <span class="text-danger">*</span>:</label
                    >
                    <input
                      v-model="fecha_inicio"
                      type="date"
                      class="form-control"
                      placeholder="fecha en que aplica la suspención"
                      name="fecha_inicio"
                      id="fecha_inicio"
                      :min="fecha_inicio + '-01-01'"
                      :max="fecha_inicio + '-12-31'"
                      required
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_inicio')"
                      class="text-danger"
                      >{{ errors.first("fecha_inicio") }}</small
                    >
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 py-2 center">
                  <div class="form-group">
                    <label class="mt-2 font-weight-bold" for="cedula">
                      Fecha Fin
                      <span class="text-danger">*</span>:</label
                    >
                    <input
                      v-model="fecha_fin"
                      type="date"
                      :min="fecha_inicio"
                      :max="fecha_fin + '-12-31'"
                      class="form-control"
                      placeholder="fecha en que aplica la suspención"
                      name="fecha_fin"
                      id="fecha_fin"
                      required
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_fin')"
                      class="text-danger"
                      >{{ errors.first("fecha_fin") }}</small
                    >
                  </div>
                </div>

                <div
                  class="col-lg-6 col-sm-12 py-2 center"
                  v-if="this.convocatoria.tipo_apoyo == 'Monitorias'"
                >
                  <label class="font-weight-bold"
                    >Porcentaje Del Estimulo Mensual<span class="text-danger"
                      >*</span
                    ></label
                  >
                  <div class="row col-12">
                    <select
                      class="form-control col-5 mr-2"
                      id="porcentaje"
                      name="porcentaje"
                      v-model="porc_estimulo_entero"
                      v-validate="{ required: true }"
                    >
                      <option value="" selected disabled>
                        % Estimulo mensual
                      </option>
                      <option
                        v-for="index in 101"
                        :key="index"
                        :value="index - 1"
                      >
                        {{ index - 1 }}
                      </option>
                    </select>
                    <h1 class="text-azul-sena mt-2 mr-1">,</h1>
                    <select
                      class="form-control col-5"
                      id="porcentaje"
                      name="porcentaje"
                      v-model="porc_estimulo_decimal"
                      v-validate="{ required: true }"
                    >
                      <option value="" selected disabled>Seleccione</option>
                      <option
                        v-for="index in 10"
                        :key="index"
                        :value="index - 1"
                      >
                        {{ index - 1 }}
                      </option>
                    </select>
                  </div>

                  <small v-show="errors.has('porcentaje')" class="text-danger">
                    {{ errors.first("porcentaje") }}
                  </small>
                </div>

                <div class="d-flex justify-content-center mt-3">
                  <button
                    class="btn btn-azul-sena col-12 col-md-6"
                    @click="validarFormulario()"
                  >
                    Adjudicar
                  </button>
                </div>
              </template>
            </card>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";

@Component
export default class ModificarPerfil extends Vue {
  aprendicesInscritos = [];
  aprendicesAdjudicados: any = [];
  nuevaCC;
  idConvocatoria = null;
  adjudicar = false;
  fecha_inicio = "";
  fecha_fin = "";
  porc_estimulo_entero = null;
  porc_estimulo_decimal = null;

  id_persona = null;
  nombre = "";

  paginate = ["aprendicesInscritos"];
  //array:any [] = [];
  array = "";
  convocatoria = {
    centro_formacion_id: "",
    centro_formación: "",
    convocatoria: "",
    cupo_hombres_14_17: null,
    cupo_hombres_mayores: null,
    cupo_instructores: null,
    cupo_mujeres_14_17: null,
    cupo_mujeres_mayores: null,
    cupo_total: null,
    estimulo_mensual: "",
    fase_bienestar: "",
    fase_bienestar_id: "",
    fecha_final_convoca: "",
    fecha_inicio_convoca: "",
    id_convocatoria: "",
    ruta_documento: "",
    tipo_apoyo: "",
    tipo_apoyo_id: "",
    tipo_monitoria: "",
    tipo_monitoria_id: "",
  };

  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Campo Obligatorio",
        min: () => "Mínimo 6 caracteres",
      },
    };
    this.$validator.localize("es", dict);
  }
  comparar(id) {
    return (
      this.aprendicesAdjudicados.filter((item) => item.identificacion == id)
        .length != 0
    );
  }
  mounted() {
    this.idConvocatoria = this.$route.params.id;
    this.obtenerConvocatoria(this.$route.params.id);
    this.obtenerInscritosConvocatoria(this.$route.params.id);
    this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
    this.verAnio();
  }
  //fechas
  verAnio() {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    // alert("El año actual es: " + anio);
    this.fecha_inicio = "";
    this.fecha_fin = "";
  }
  //fechas

  obtenerConvocatoria(id) {
    Axios()
      .get("listar_convocatoria/" + id)
      .then((respuesta) => {
        this.convocatoria = respuesta.data.results;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  async obtenerInscritosConvocatoria(id) {
    // SE LISTAN LOS APRENDICES INSCRITOS CON EL PUNTAJE TOTAL
    await Axios()
      .get("listar_adjudicaciones_convocatoria/" + id)
      .then((respuesta) => {
        return respuesta.data.results;
      })
      .then((res) => {
        setTimeout(() => {
          if (res != null) {
            this.aprendicesInscritos = res;
          }
          // this.usuario = respuesta.data.results;
        }, 100);
      });
  }
  async obtenerAdjudicadosConvocatoria(id) {
    await Axios()
      .get("listar_adjudicados/" + id)
      .then((respuesta) => {
        return respuesta.data.results;
      })
      .then((res) => {
        setTimeout(() => {
          if (res != null) {
            this.aprendicesAdjudicados = res;

            let checks = document.getElementsByTagName("input");
            for (let i = 0; i < checks.length; i++) {
              const element = checks[i];
              element.checked = false;
            }
            for (let i = 0; i < checks.length; i++) {
              const element = checks[i];

              this.aprendicesAdjudicados.forEach((aprendiz) => {
                if (element.id == aprendiz.identificacion) {
                  element.checked = true;
                }
              });
            }
          }
        }, 100);
      });
  }

  adjudicarAprendizConvocatoria(id) {
    Axios()
      .post("adjudicarInscrito", {
        id_convocatoria: this.$route.params.id,
        id_persona: id,
        fecha_inicio_apoyo: this.fecha_inicio,
        fecha_fin_apoyo: this.fecha_fin,
        porc_estimulo_mensual:
          this.porc_estimulo_entero + "," + this.porc_estimulo_decimal,
        id_usuario_autenticado: JSON.parse(sessionStorage.getItem("usuario"))
          .id_usuario,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Usuario " + this.nombre + " adjudicado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.obtenerAdjudicadosConvocatoria(this.$route.params.id);

          this.fecha_inicio = "";
          this.fecha_fin = "";
          this.porc_estimulo_entero = "";
          this.porc_estimulo_decimal = "";
          //this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
          this.adjudicar = false;
        } else {
          Swal.fire({
            title: "INFORMACIÓN",
            icon: "warning",
            text: respuesta.data.message,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        }

        // if (respuesta.data.status == "info") {
        //   Swal.fire({
        //     title: "INFORMACIÓN",
        //     icon: "warning",
        //     text:
        //       "El aprendiz " +
        //       this.nombre +
        //       " se encuentra adjudicado en otra convocatoria",
        //     confirmButtonText: "Aceptar",
        //     confirmButtonColor: "#238276",
        //   });
        this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
        this.adjudicar = false;
        // }
      })
      .catch((err) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  quitarAdjudicacion(id) {
    Axios()
      .post("quitar_adjudicacion", {
        id_persona: id,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Se ha quitado la adjudicación con exito",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
          this.adjudicar = false;
        }

        if (respuesta.data.status == "info") {
          Swal.fire({
            title: "INFORMACIÓN",
            icon: "warning",
            text:
              "El aprendiz " +
              this.nombre +
              " se encuentra adjudicado en otra convocatoria",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.obtenerAdjudicadosConvocatoria(this.$route.params.id);
          this.adjudicar = false;
        }
      })
      .catch((err) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  cambiarEstadoConvocatoria() {
    if (this.aprendicesAdjudicados.length == 0) {
      Swal.fire({
        title: "Informacion",
        text: "Para finalizar la adjudicación debe estar adjudicado almenos un aprendiz",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#238276",
        customClass: {
          confirmButton: "btn btn-azul-sena",
        },
      });
    } else {
      Axios()
        .put("actualizar_fase_convocatoria/" + this.idConvocatoria, {
          id_convocatoria: this.idConvocatoria,
          fase_bienestar_id: 4,
          id_actualiza: JSON.parse(sessionStorage.getItem("usuario"))
            .id_usuario,
        })
        .then((respuesta) => {
          if ((this.aprendicesAdjudicados.length <= this.convocatoria.cupo_total)) {
            if (respuesta.data.status == "success") {
              Swal.fire(
                "CAMBIO DE FASE CORRECTO",
                "Se ha cambiado la fase de la convocatoria exitosamente!",
                "success"
              );
              this.$router.push("GestionarConvocatoria");
            }
            return respuesta.data;
          } else {
            Swal.fire({
              title: "Información",
              text:
                "Solo hay " +
                this.convocatoria.cupo_total +
                " cupos disponibles para esta convocatoria, verifique el numero de adjudicados.",
              icon: "warning",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
            });
          }
        });
    }
  }
  validarFormulario(check) {
    if (check == true) {
      this.quitarAdjudicacion(this.id_persona);
    } else {
      this.$validator.validate().then((valid) => {
        if (valid) {
          if (this.fecha_inicio != null && this.fecha_fin != null) {
            // el formulario se validó y tiene los datos que corresponden por campo
            this.adjudicarAprendizConvocatoria(this.id_persona);
          } else {
          }
        }
      });
    }
  }
}
</script>
