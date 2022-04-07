<template>
  <div>
    <div class="mt-4 container-fluid" >
      <div class="card">
        <div v-if="!estadoPeticion">
          <div class="card-header">
            <h1 class="text-azul-sena">MODIFICAR CAPACITACIÓN ENI</h1>
          </div>
          <div class="card-body"></div>

          <div class="text-center">
            <AnimacionCargando></AnimacionCargando>
          </div>
        </div>
        <div class="card" v-if="estadoPeticion">
          <div class="card-header">
            <h1 class="text-azul-sena">MODIFICAR CAPACITACIÓN ENI</h1>
          </div>
          <div class="card-body">
            <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
              <div>
                <label class="mt-2 font-weight-bold">
                  Capacitación
                  <span class="text-danger">*</span>
                  :
                </label>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    name="Capacitación"
                    id="capacitacion"
                    placeholder="Capacitación"
                    v-model="capacitacion.capacitacion"
                    v-validate="{ required: true, alpha_spaces: false }"
                  />
                  <small
                    v-show="errors.has('capacitacion')"
                    class="text-danger"
                  >
                    {{ errors.first("capacitacion") }}
                  </small>
                </div>
              </div>

              <div>
                <label class="mt-2 font-weight-bold">
                  Año
                  <span
                    class="text-danger font-weigth-bold"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                  >
                    *
                  </span>
                  :
                </label>
                <div class="input-group">
                  <input
                    type="number"
                    v-validate="{ required: true, min_value: 2021 }"
                    maxlength="4"
                    v-model="capacitacion.plan_institucional_id"
                    id="año"
                    name="año"
                    class="form-control"
                    placeholder="Ingrese el año de la capacitación"
                  />
                </div>
                <small
                  v-show="errors.has('año')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("año") }}
                </small>
              </div>
              <div>
                <label class="mt-2 font-weight-bold">
                  Red de conocimiento
                  <span
                    class="text-danger font-weigth-bold"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                  >
                    *
                  </span>
                  :
                </label>
                <div class="input-group">
                  <select
                    v-model="capacitacion.pertenece_a_red"
                    name="red"
                    id="red"
                    v-validate="{ required: false }"
                    class="form-control mb-3"
                    @change="obtenerAreasPorRed()"
                  >
                    <option selected disabled>Seleccione la red</option>
                    <option
                      v-for="(red, index) in redesConocimiento"
                      :value="red.id_red_conocimiento"
                      :key="index"
                    >
                      {{ red.red_conocimiento.toUpperCase() }}
                    </option>
                  </select>
                </div>
                <small
                  v-show="errors.has('red')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("red") }}
                </small>
              </div>
              <div v-if="capacitacion.pertenece_a_red != ''">
                <!-- nuevo -->
                <div id="multiselect">
                  <label class="mt-2 font-weight-bold">
                    Área
                    <span
                      class="text-danger font-weigth-bold"
                      tooltip="Campo Requerido"
                      tooltip-flow="top"
                    >
                      *
                    </span>
                    :
                  </label>
                  <template>
                    <div>
                      <multiselect
                        v-model="areasEscogidas"
                        tag-placeholder="seleccione el área"
                        placeholder="Seleccione el área"
                        selectLabel="Seleccionar"
                        selectedLabel="Seleccionado"
                        deselectLabel="Borrar de la lista"
                        label="area_ruta"
                        track-by="id_area_ruta"
                        :options="areas"
                        :multiple="true"
                        :taggable="true"
                        @tag="addTag"
                      ></multiselect>
                      <!-- <pre
                    class="language-json"
                  ><code>{{ areasEscogidas }}</code></pre> -->
                    </div>
                  </template>
                </div>
                <!-- fin nuevo -->

                <small
                  v-show="errors.has('area')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("area") }}
                </small>
              </div>

              <!-- <div>
            <label class="mt-2 font-weight-bold">
              Tipo de PIC
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
              >
                *
              </span>
              :
            </label>

            <div class="input-group">
              <select
                v-model="capacitacion.id_pic_tipo"
                name="tipo_pic"
                id="tipo_pic"
                class="form-control mb-3"
                v-validate="{ required: false }"
              >
                <option :value="capacitacion.pic_tipo.id_pic_tipo" selected disabled>
                  {{ capacitacion.pic_tipo.pic_tipo }}
                </option>
                <option
                  v-for="(tipo, index) in picTipos"
                  :key="index"
                  :value="tipo.id_pic_tipo"
                >
                  {{ tipo.pic_tipo }}
                </option>
              </select>
            </div>
            <small
              v-show="errors.has('tipo_pic')"
              class="text-danger font-weigth-bold"
            >
              {{ errors.first("tipo_pic") }}
            </small>
          </div> -->

              <!-- nuevo eje -->
              <div>
                <label class="mt-2 font-weight-bold"
                  >Eje<span class="text-danger">*</span>:</label
                >
                <div class="input-group">
                  <select
                    v-model="capacitacion.eje_id"
                    v-validate="{ required: true }"
                    id="linea_cap"
                    name="linea_cap"
                    class="form-control"
                  >
                    <option value="" selected disabled>
                      Seleccione Pic Eje
                    </option>
                    <option
                      v-for="(eje, index) in listarPicEje"
                      :value="eje.id_eje"
                      :key="index"
                    >
                      {{ eje.eje }}
                    </option>
                  </select>
                </div>
                <small
                  v-show="errors.has('linea_cap')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("linea_cap") }}
                </small>
              </div>
              <!-- fin nuevo eje -->

              <!-- <div>
            <label class="mt-2 font-weight-bold">
              Eje
              <span
                class="text-danger font-weigth-bold"
                v-b-tooltip.hover.top
                title="Campo Requerido"
              >
                *
              </span>
              :
            </label>
            <div class="input-group">
              <select
                name="eje"
                id="eje"
                v-model="capacitacion.eje"
                v-validate="{ required: true }"
                class="form-control mb-3"
              >
                <option value="" selected disabled>Seleccione el eje</option>
                <option>Gestión del conocimiento y la innovación</option>
                <option>Creación del valor público</option>
                <option>Transformación digital</option>
                <option>Probidad y ética de lo público</option>
              </select>
            </div>
            <small
              v-show="errors.has('eje')"
              class="text-danger font-weigth-bold"
            >
              {{ errors.first("eje") }}
            </small>
          </div> -->
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
                >
                  Modificar
                </base-button>
              </div>
              <div class="col-lg-4 col-sm-12 mt-1">
                <router-link
                  class="btn btn-block bg-azul-sena text-white"
                  :to="{
                    name: 'GestionarPICENI',
                  }"
                >
                  Volver
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import Multiselect from "vue-multiselect";
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
    Multiselect,
  },
})
export default class ModificarPIC extends Vue {
  estadoPeticion = false;
  areas: any[] = [];
  picTipos = null;
  redesConocimiento: any[] = [];
  estadoPeticionModificar = false;
  listarPicEje: any[] = [];
  capacitacion = {
    id_pic: null,
    capacitacion: "",
    pertenece_a_red: "",
    plan_institucional_id: "",
    id_area_ruta: "",
    id_pic_tipo: "",
    pic_tipo_id: "",
    tipo_pic: "",
    pic_tipo: "",
    eje: "",
    eje_id: "",
    pic_rel_capacitacion_red: [],
  };
  picEje = {
    id_eje: "",
    eje: "",
  };
  requisito = "";
  pertenece_a_red = "";
  // nuevo
  areasEscogidas: any[] = [];
  async mounted() {
    this.capacitacion.id_pic = this.$route.params.id;
    await this.ObtenerDatosPIC();
    await this.obtenerAreasConocimiento();
    await this.obtenerPic(this.capacitacion.id_pic);
    await this.obtenerPicEje();
    this.llenarAreasEscogidasPic();
    this.capacitacion.id_pic_tipo = this.capacitacion.pic_tipo_id;
    this.estadoPeticion = true;
  }
  async obtenerPic(id) {
    await Axios()
      .get("detalle_pic/" + id)
      .then((respuesta) => {

        if (respuesta.data.status == "success") {
          this.capacitacion = respuesta.data.results;
        } else {
          Swal.fire({
            title: "No se obtuvo Capacitación",
            text: respuesta.data.message,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          }).then(() => {
            this.$router.back();
          });
        }
      });
  }
  async obtenerAreasConocimiento() {
    await Axios()
      .get("/crear_pic")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.areas = respuesta.data.results.areas;
          this.picTipos = respuesta.data.results.picTipos;
          this.redesConocimiento = respuesta.data.results.redesConocimiento;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      });
  }

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "Fecha mayor o igual a 2020",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite números ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }
  llenarAreasEscogidasPic() {
    for (let area of this.capacitacion.pic_rel_capacitacion_red) {
      this.areasEscogidas.push(area.area_ruta);
    }
  }
  modificarAreas(id_pic) {
    for (let area of this.areasEscogidas) {
      Axios()
        .post("almacenar_red", { id_area: area.id_area_ruta, id_pic: id_pic })
        .then((respuesta) => {
          if (respuesta.data.status == "success") {

          } else {

          }
        });
    }
  }

  eliminarAreasEscogidasPic() {
    Axios()
      .delete(
        "eliminar_areas_asociadas_capacitacion/" + this.capacitacion.id_pic
      )
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
        } else {
        }
      });
  }

  modificarPIC() {
    this.estadoPeticionModificar = true;
    Axios()
      .put("modificar_pic/" + this.capacitacion.id_pic, this.capacitacion)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Capacitación modificada",
            text:
              "La capacitación " +
              this.capacitacion.capacitacion +
              " fue modificada exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.eliminarAreasEscogidasPic();
          this.modificarAreas(this.capacitacion.id_pic);
          this.estadoPeticionModificar = true;
          this.$router.back();
        } else {
          Swal.fire({
            title: "Error no se pudo modificar",
            text:
              "La capacitación de nombre " +
              this.capacitacion.capacitacion +
              " no se puede modificar.",
            icon: "error",
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
      .finally(() => {
        this.estadoPeticionModificar = false;
      });
  }

  async ObtenerDatosPIC() {
    await Axios()
      .get("/crear_pic")
      .then((respuesta) => {
        this.areas = respuesta.data.results.areas;
        this.picTipos = respuesta.data.results.picTipos;
        this.redesConocimiento = respuesta.data.results.redesConocimiento;
      });
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.modificarPIC();
      }
    });
  }
  async obtenerPicEje() {
    await Axios()
      .get("/listar_eje")
      .then((respuesta) => {

        if (respuesta.data.status == "success") {
          this.listarPicEje = respuesta.data.results;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
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

  async obtenerAreasPorRed() {
    await Axios()
      .get("listar_areas_filtrado/" + this.capacitacion.pertenece_a_red)
      .then((respuesta) => {
        this.areas = respuesta.data.results;
      });
  }

  addTag(newTag) {
    const tag = {
      area_ruta: newTag,
      red_conocimiento_id: "",
      componentes: "",
      id_area_ruta:
        newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
    };
    this.areas.push(tag);
    this.areasEscogidas.push(tag);
  }
}
</script>

<style scoped>
.circulo {
  font-size: 25px;
  padding: 10px 22px;
  border: 1px solid #238276;
  border-radius: 255px;
  color: #238276;
}
.circulo-selecionado {
  background-color: #238276;
  color: white;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
