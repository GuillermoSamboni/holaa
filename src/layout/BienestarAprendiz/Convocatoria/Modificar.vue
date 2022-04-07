<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR CONVOCATORIA</h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Convocatoria <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                v-model="convocatoria.convocatoria"
                class="form-control"
                placeholder="Convocatoria"
                name="convocatoria"
                id="convocatoria"
                v-validate="{ required: true }"
              />
              <small v-show="errors.has('convocatoria')" class="text-danger">
                {{ errors.first("convocatoria") }}
              </small>
            </div>
          </div>

          <div id="campo">
            <label class="font-weight-bold mt-2"
              >Tipo de apoyo<span class="text-danger">*</span>:</label
            >
            <div>
              <select
                disabled
                class="form-control"
                name="tipo_apoyo"
                v-validate="'required'"
                v-model="convocatoria.tipo_apoyo_id"
              >
                <option value="null" selected disabled>
                  Selecionar Tipo de apoyo
                </option>
                <option
                  v-for="(tipo_apoyo, key) in tiposdeapoyo"
                  :key="key"
                  v-bind:value="tipo_apoyo.id_tipo_apoyo"
                >
                  {{ tipo_apoyo.tipo_apoyo }}
                </option>
              </select>
              <small v-show="errors.has('tipo_apoyo')" class="text-danger">
                {{ errors.first("tipo_apoyo") }}
              </small>
            </div>
          </div>
          <!-- campos de tipos deshabilitados solo para visualizar -->
          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 1">
            <label class="font-weight-bold mt-2"
              >Tipos de Alimentación<span class="text-danger">*</span>:</label
            >
            <input
              disabled
              type="text"
              class="form-control"
              name="tipo_alimentacion"
              id="tipo_alimentacion"
              v-model="tipoAlimentacion.tipo_alimentacion"
            />
          </div>
          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 2">
            <label class="font-weight-bold mt-2"
              >Tipos de Transporte<span class="text-danger">*</span>:</label
            >
            <input
              disabled
              type="text"
              class="form-control"
              name="tipo_transporte"
              id="tipo_transporte"
              v-model="tipoTransporte.tipo_transporte"
            />
          </div>
          <div
            id="campo"
            v-if="
              convocatoria.tipo_transporte &&
              tipoTransporte.id_tipo_transporte == 2
            "
          >
            <label class="font-weight-bold mt-2"
              >Tipos de Sub Transporte<span class="text-danger">*</span>:</label
            >
            <input
              disabled
              type="text"
              class="form-control"
              name="tipo_transporte_personal"
              id="tipo_transporte_personal"
              v-model="subtipoTransporte.tipo_transporte_personal"
            />
          </div>

          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 4">
            <div id="multiselect">
              <label class="mt-2 font-weight-bold">
                Tipo de Monitoria
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:
              </label>
              <template>
                <div>
                  <multiselect
                    v-model="convocatoria.tipo_monitoria"
                    tag-placeholder="seleccione el tipo de monitoria"
                    placeholder="seleccione el tipo de monitoria"
                    selectLabel="Seleccionar"
                    selectedLabel="Seleccionado"
                    deselectLabel="Borrar de la lista"
                    label="tipo_monitoria"
                    track-by="id_tipo_monitoria"
                    :options="tiposdemonitoria"
                    :multiple="true"
                    :taggable="true"
                    @tag="addTag"
                  ></multiselect>
                  <!-- <pre
                      class="language-json"
                    ><code>{{ convocatoria.tipo_monitoria }}</code></pre> -->
                </div>
              </template>
              <small
                v-show="errors.has('RegistrarColegio')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("RegistrarColegio") }}
              </small>
            </div>
          </div>

          <div id="campo">
            <div>
              <label class="mt-2 font-weight-bold"
                >Fecha Inicio <span class="text-danger">*</span>:</label
              >
              <!-- fecha campo -->
              <input
                type="date"
                class="form-control"
                name="fecha_inicio"
                id="fecha_inicio"
                v-model="convocatoria.fecha_inicio_convoca"
                v-validate="'required'"
                :min="fecha_inicio + '-01-01'"
                :max="fecha_fin"
                required
              />
              <small v-show="errors.has('fecha_inicio')" class="text-danger">
                {{ errors.first("fecha_inicio") }}
              </small>
            </div>
          </div>

          <div id="campo">
            <div>
              <label class="mt-2 font-weight-bold"
                >Fecha Fin <span class="text-danger">*</span>:</label
              >
              <!-- fecha campo -->
              <input
                :min="convocatoria.fecha_inicio_convoca"
                type="date"
                class="form-control"
                name="fecha_fin"
                id="fecha_fin"
                v-model="convocatoria.fecha_final_convoca"
                v-validate="'required'"
                :max="fecha_inicio"
                required
              />
              <small v-show="errors.has('fecha_fin')" class="text-danger">
                {{ errors.first("fecha_fin") }}
              </small>
            </div>
          </div>

          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Cupos <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="number"
                v-model.number="convocatoria.cupo_total"
                class="form-control"
                placeholder="Cupo total*"
                name="cupo_total"
                id="cupo_total"
                v-validate="{ required: true, min: 0 }"
                min="0"
              />
              <small v-show="errors.has('cupo_total')" class="text-danger">
                {{ errors.first("cupo_total") }}
              </small>
            </div>
          </div>

          <!-- <div id="campo" v-if="convocatoria.tipo_apoyo_id == 3">
            <label class="mt-2 font-weight-bold"
              >Cupos instructores <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="number"
                v-model.number="convocatoria.cupo_instructores"
                class="form-control"
                placeholder="Cupo instructores*"
                addon-left-icon=""
                v-validate="{
                  required: true,
                  min: 0,
                  max:
                    convocatoria.cupo_instructores +
                      convocatoria.cupo_hombres_14_17 +
                      convocatoria.cupo_mujeres_14_17 +
                      convocatoria.cupo_hombres_mayores +
                      convocatoria.cupo_mujeres_mayores >
                    convocatoria.cupo_total,
                }"
                min="0"
                name="cupo_instructores"
                id="cupo_instructores"
              />
              <small
                v-show="errors.has('cupo_instructores')"
                class="text-danger"
                >{{ errors.first("cupo_instructores") }}</small
              >
            </div>
          </div> -->
          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 3">
            <label class="mt-2 font-weight-bold"
              >Cupos hombres entre 14 y 17 años
              <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="number"
                v-model.number="convocatoria.cupo_hombres_14_17"
                class="form-control"
                placeholder="Cupo hombre entre 14 y 17*"
                addon-left-icon=""
                v-validate="{
                  required: true,
                  min: 0,
                  max:
                    convocatoria.cupo_instructores +
                      convocatoria.cupo_hombres_14_17 +
                      convocatoria.cupo_mujeres_14_17 +
                      convocatoria.cupo_hombres_mayores +
                      convocatoria.cupo_mujeres_mayores >
                    convocatoria.cupo_total,
                }"
                min="0"
                name="cupo_hombres_14_17"
                id="cupo_hombres_14_17"
              />
              <small
                v-show="errors.has('cupo_hombres_14_17')"
                class="text-danger"
                >{{ errors.first("cupo_hombres_14_17") }}</small
              >
            </div>
          </div>

          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 3">
            <label class="mt-2 font-weight-bold"
              >Cupos mujeres entre 14 y 17 años
              <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="number"
                v-model.number="convocatoria.cupo_mujeres_14_17"
                class="form-control"
                placeholder="Cupo mujeres entre 14 y 17*"
                addon-left-icon=""
                v-validate="{
                  required: true,
                  min: 0,
                  max:
                    convocatoria.cupo_instructores +
                      convocatoria.cupo_hombres_14_17 +
                      convocatoria.cupo_mujeres_14_17 +
                      convocatoria.cupo_hombres_mayores +
                      convocatoria.cupo_mujeres_mayores >
                    convocatoria.cupo_total,
                }"
                min="0"
                name="cupo_mujeres_14_17"
                id="cupo_mujeres_14_17"
              />
              <small
                v-show="errors.has('cupo_mujeres_14_17')"
                class="text-danger"
                >{{ errors.first("cupo_mujeres_14_17") }}</small
              >
            </div>
          </div>

          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 3">
            <label class="mt-2 font-weight-bold"
              >Cupos hombres mayores <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="number"
                v-model.number="convocatoria.cupo_hombres_mayores"
                class="form-control"
                placeholder="Cupo hombres mayores*"
                addon-left-icon=""
                v-validate="{
                  required: true,
                  min: 0,
                  max:
                    convocatoria.cupo_instructores +
                      convocatoria.cupo_hombres_14_17 +
                      convocatoria.cupo_mujeres_14_17 +
                      convocatoria.cupo_hombres_mayores +
                      convocatoria.cupo_mujeres_mayores >
                    convocatoria.cupo_total,
                }"
                min="0"
                name="cupo_hombres_mayores"
                id="cupo_hombres_mayores"
              />
              <small
                v-show="errors.has('cupo_hombres_mayores')"
                class="text-danger"
                >{{ errors.first("cupo_hombres_mayores") }}</small
              >
            </div>
          </div>

          <div id="campo" v-if="convocatoria.tipo_apoyo_id == 3">
            <label class="mt-2 font-weight-bold"
              >Cupos mujeres mayores <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="number"
                v-model.number="convocatoria.cupo_mujeres_mayores"
                class="form-control"
                placeholder="Cupo mujeres mayores*"
                addon-left-icon=""
                v-validate="{
                  required: true,
                  min: 0,
                  max:
                    convocatoria.cupo_instructores +
                      convocatoria.cupo_hombres_14_17 +
                      convocatoria.cupo_mujeres_14_17 +
                      convocatoria.cupo_hombres_mayores +
                      convocatoria.cupo_mujeres_mayores >
                    convocatoria.cupo_total,
                }"
                min="0"
                name="cupo_mujeres_mayores"
                id="cupo_mujeres_mayores"
              />
              <small
                v-show="errors.has('cupo_mujeres_mayores')"
                class="text-danger"
                >{{ errors.first("cupo_mujeres_mayores") }}</small
              >
            </div>
          </div>

          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Estímulo <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                type="number"
                v-model="convocatoria.estimulo_mensual"
                class="form-control"
                placeholder="Estimulo mensual*"
                name="estimulo_mensual"
                id="estimulo_mensual"
                v-validate="{ required: true, min: 0 }"
                min="0"
              />
              <small v-show="errors.has('estimulo_mensual')" class="text-danger"
                >{{ errors.first("estimulo_mensual") }}
              </small>
            </div>
          </div>

          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Medios de divulgación <span class="text-danger">*</span>:</label
            >
            <div class="d-flex flex-wrap">
              <div
                class="
                  d-flex
                  col-6 col-md-4
                  mb-2
                  custom-control custom-checkbox
                "
                v-for="(medio_divulgacion, key) in mediosdivulgacion"
                :key="key"
              >
                <input
                  name="medio_divulgacion"
                  v-validate="{ required: true }"
                  type="checkbox"
                  class="custom-control-input"
                  v-model="convocatoria.id_medio_divulgacion"
                  :id="medio_divulgacion.medio_divulgacion"
                  v-bind:value="medio_divulgacion.id_medio_divulgacion"
                />
                <label
                  :for="medio_divulgacion.medio_divulgacion"
                  class="custom-control-label px-0"
                  >{{ medio_divulgacion.medio_divulgacion }}</label
                >
              </div>
              <small
                v-show="errors.has('medio_divulgacion')"
                class="text-danger"
                >{{ errors.first("medio_divulgacion") }}
              </small>
            </div>
          </div>

          <!-- Volver lista de usuario -->
        </div>
      </div>
       <div class="text-center card-footer" v-if="estadoPeticionModificar">
        <AnimacionCargando></AnimacionCargando>
      </div>
      <div class="card-footer" v-if="!estadoPeticionModificar">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click="validarFormulario()"
              class="btn btn-block bg-azul-sena text-white"
              >Modificar</base-button
            >
          </div>
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarConvocatoria',
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
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    Multiselect,
    AnimacionCargando

  },
})
export default class ModificarPerfil extends Vue {
  usuariocurrent = JSON.parse(sessionStorage.getItem("usuario"));
  estadoPeticionModificar = false;
  convocatoria = {
    id_convocatoria: "",
    centro_formacion_id: this.usuariocurrent.id_centro_formacion,
    convocatoria: "",
    cupo_hombres_14_17: 0,
    cupo_hombres_mayores: 0,
    cupo_instructores: 0,
    cupo_mujeres_14_17: 0,
    cupo_mujeres_mayores: 0,
    cupo_total: null,
    estimulo_mensual: "",
    // fase_bienestar: "Creación",
    fase_bienestar_id: 1,
    fecha_final_convoca: "",
    fecha_inicio_convoca: "",
    // id_convocatoria: null,
    ruta_documento: null,
    // tipo_apoyo: null,
    tipo_apoyo_id: null,

    tipo_alimentacion_id: "",
    tipo_transporte_id: "",
    subtipo_transporte_id: "",
    // tipo_monitoria: "",
    tipo_monitoria_id: null,
    id_medio_divulgacion: [],
    id_crea: this.usuariocurrent.id_usuario,
    medios_divulgacion: [],
    tipo_monitoria: [],
  };

  tiposdeapoyo = [];

  tiposdealimentacion: any[] = [];
  tiposdetransporte: any[] = [];
  subtiposdetransporte: any[] = [];
  tiposdemonitoria = [];
  mediosdivulgacion = [];
  monitoriaEscogido: any[] = [];
  monitoria: any[] = [];
  // tipoAlimentacion: any[] = [];
  // tipoTransporte: any[] = [];
  // subtipoTransporte: any[] = [];
  tipoAlimentacion = {
    id_tipo_alimentacion: null,
    tipo_alimentacion: "",
  };
  tipoTransporte = {
    id_tipo_transporte: null,
    tipo_transporte: "",
  };
  subtipoTransporte = {
    id_subtipo_transporte: null,
    tipo_transporte_personal: "",
  };

  constructor() {
    super();
  }

  mounted() {
    this.obtenerDatosParaFormulario();
    this.obtenerConvocatoria(this.$route.params.id);
    this.convocatoria.centro_formacion_id =
      this.usuariocurrent.id_centro_formacion;
    this.convocatoria.id_crea = this.usuariocurrent.id_usuario;
    this.llenarTiposMonitoria();
    this.obtenerTiposAlimentacion();
    this.obtenerTiposTransporte();
    this.obtenerSubtiposTransporte();
    // this.obtenerTiposMonitoria();
  }

  obtenerConvocatoria(id) {
    Axios()
      .get("listar_convocatoria/" + id)
      .then((respuesta) => {
        this.convocatoria = respuesta.data.results;
        this.tipoAlimentacion = respuesta.data.results.tipo_alimentacion;
        this.tipoTransporte = respuesta.data.results.tipo_transporte;
        this.subtipoTransporte = respuesta.data.results.subtipo_transporte;
        this.convocatoria.id_medio_divulgacion = [];
        for (const medio of this.convocatoria.medios_divulgacion) {
          this.convocatoria.id_medio_divulgacion.push(
            medio.id_medio_divulgacion
          );
        }
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
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }
  obtenerTiposAlimentacion() {
    Axios()
      .get("listar_tipo_alimentacion")
      .then((respuesta) => {
        this.tiposdealimentacion = respuesta.data.results;
      });
  }
  obtenerTiposTransporte() {
    Axios()
      .get("listar_tipo_transporte")
      .then((respuesta) => {
        this.tiposdetransporte = respuesta.data.results;
      });
  }
  obtenerSubtiposTransporte() {
    Axios()
      .get("listar_subtipo_transporte")
      .then((respuesta) => {
        this.subtiposdetransporte = respuesta.data.results;
      });
  }
  obtenerDatosParaFormulario() {
    Axios()
      .get("crear_convocatoria")
      .then((respuesta) => {
        this.tiposdeapoyo = respuesta.data.results.tipos_apoyo;
        this.tiposdemonitoria = respuesta.data.results.tipos_monitoria;
        this.mediosdivulgacion = respuesta.data.results.medios_divulgacion;
      });
  }

  ModificarConvocatoria() {
    this.estadoPeticionModificar = true;
    this.convocatoria.medios_divulgacion = [1];
    // this.convocatoria.tipo_alimentacion_id = this.convocatoria.tipo_alimentacion.id_tipo_alimentacion,

    // this.convocatoria.tipo_transporte_id = this.convocatoria.tipo_transporte.id_tipo_transporte,
    //   this.convocatoria.subtipo_transporte_id = this.convocatoria.subtipo_transporte.id_subtipo_transporte,
    Axios()
      .put(
        "actualizar_convocatoria/" + this.$route.params.id,
        this.convocatoria
      )
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Convocatoria Modificada!",
            text: "Se ha modificado la convocatoria exitosamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.eliminarConvenioColegios();
          this.modificarTiposMonitoria(this.convocatoria.id_convocatoria);
          this.$router.push("GestionarConvocatoria");
        } else {
          Swal.fire({
            title: "Convocatoria no modificada!",
            icon: respuesta.data.status,
            text: respuesta.data.message,
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
      })
      .finally(()=>{
        this.estadoPeticionModificar = false;
      });
  }

  validarFormulario() {

  
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        if (
          this.convocatoria.fecha_inicio_convoca <
          this.convocatoria.fecha_final_convoca
        ) {
          if (this.convocatoria.tipo_apoyo_id == 3) {
            if (
              this.convocatoria.cupo_hombres_mayores +
                this.convocatoria.cupo_mujeres_14_17 +
                this.convocatoria.cupo_hombres_14_17 +
                this.convocatoria.cupo_mujeres_mayores !=
              this.convocatoria.cupo_total
            ) {
              Swal.fire({
                title: "Convocatoria no registrada!",
                icon: "error",
                text: "El número de cupos totales no está cubierto",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
              });
            } else {
              this.ModificarConvocatoria();
            }
          } else {
            this.ModificarConvocatoria();
          }
        } else {
          Swal.fire({
            title: "Convocatoria no modificada!",
            icon: "error",
            text: "No puede finalizar una convocatoria antes de iniciarla",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        }
      }
      
    });
  }

  // obtenerTiposMonitoria() {
  //   Axios()
  //     .get(
  //       "listar_tipo_monitoria_convocatoria/" +
  //         this.convocatoria.id_convocatoria
  //     )
  //     .then((respuesta) => {
  //       if (respuesta.data.status == "success") {
  //         this.tiposdemonitoria = respuesta.data.results.tipo_monitoria;
  //       } else {
  //         Swal.fire({
  //           title: respuesta.data.message,
  //         });
  //       }
  //     });
  // }

  addTag(newTag) {
    const tag = {
      monitoria: newTag,
      tipo_monitoria: "",
      id_tipo_monitoria:
        newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
    };
    this.tiposdemonitoria.push(tag);
    this.convocatoria.tipo_monitoria.push(tag);
  }

  modificarTiposMonitoria(id_convocatoria) {
    for (let lista of this.convocatoria.tipo_monitoria) {
      Axios()
        .post("almacenar_tipos_monitorias", {
          tipo_monitoria_id: lista.id_tipo_monitoria,
          convocatoria_id: id_convocatoria,
        })
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
          } else {
          }
        });
    }
  }

  llenarTiposMonitoria() {
    for (let list of this.convocatoria.tipo_monitoria) {

      this.convocatoria.tipo_monitoria.push(list.tipo_monitoria);
    }
  }

  eliminarConvenioColegios() {
    Axios()
      .delete(
        "eliminar_convocatoria_tipo_monitoria/" +
          this.convocatoria.id_convocatoria
      )
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
        } else {
        }
      });
  }
}
class Convocatoria {
  centro_formacion_id: number;
  // centro_formación: this.usuariocurrent.centro_formacion,
  convocatoria: number;
  cupo_hombres_14_17: number;
  cupo_hombres_mayores: number;
  cupo_instructores: number;
  cupo_mujeres_14_17: number;
  cupo_mujeres_mayores: number;
  cupo_total: number;
  estimulo_mensual: number;
  // fase_bienestar: "Creación",
  fase_bienestar_id: number;
  fecha_final_convoca: string;
  fecha_inicio_convoca: string;
  // id_convocatoria: null,
  ruta_documento;
  // tipo_apoyo: null,
  tipo_apoyo_id: number;
  // tipo_monitoria: "",
  tipo_monitoria_id: number;
  id_medio_divulgacion: number[];
  id_crea: number;
  medios_divulgacion: any[];
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>