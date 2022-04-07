<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div v-if="!estadoPeticionCargando">
        <div class="card-header">
          <h1 class="text-azul-sena">REGISTRAR CAPACITACIÓN ENI</h1>
        </div>
        <div class="card-body"></div>
        <div class="text-center">
          <AnimacionCargando></AnimacionCargando>
        </div>
      </div>
      <div class="card" v-if="estadoPeticionCargando">
        <div class="card-header">
          <h1 class="text-azul-sena">REGISTRAR CAPACITACIÓN ENI</h1>
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
                <small v-show="errors.has('capacitacion')" class="text-danger">
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
                Tipo de capacitación
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
                  v-validate="{ required: true }"
                  v-model="capacitacion.id_pic_tipo"
                  name="tipo_pic"
                  id="tipo_pic"
                  class="form-control mb-3"
                  @change="ponerTodasAreas()"
                >
                  <option value="" selected disabled>
                    Seleccione tipo de Capacitación
                  </option>
                  <option
                    v-for="(tipo, index) in picTipos"
                    :value="tipo.id_pic_tipo"
                    :key="index"
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
            </div>
            <div>
              <div v-if="capacitacion.id_pic_tipo == 1">
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
                    v-validate="{ required: true }"
                    class="form-control mb-3"
                    @change="obtenerAreasPorRed()"
                  >
                    <option value="" selected disabled>
                      Seleccione la red
                    </option>
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
              <!-- pruebas -->
              <div>
                <!-- nuevo -->
                <div id="multiselect">
                  <!-- <div> -->
                  <div
                    v-if="
                      capacitacion.pertenece_a_red != '' ||
                      capacitacion.pertenece_a_red == '0'
                    "
                  >
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
                    <div>
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
                  </div>
                </div>
                <!-- fin nuevo -->
                <small
                  v-show="errors.has('area')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("area") }}
                </small>
              </div>
            </div>

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
                  <option value="" selected disabled>Seleccione Pic Eje</option>
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
          </div>
        </div>
        <!-- ----------------------------------------------------------------------------------------------------------------- -->
        <div class="text-center card-footer" v-if="estadoPeticionRegistrar">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="card-footer" v-if="!estadoPeticionRegistrar">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1">
              <base-button
                type="azul-sena"
                @click="validarFormulario()"
                class="btn btn-block bg-azul-sena text-white"
              >
                Registrar
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
export default class RegistrarCapacitacionEni extends Vue {
  estadoPeticionCargando = false;
  areas: any[] = [];
  picTipos: any[] = [];
  redesConocimiento: any[] = [];
  listarPicEje: any[] = [];
  estadoPeticionRegistrar = false;
  estadoPeticion = true;
  capacitacion = {
    id_pic: null,
    capacitacion: "",
    pertenece_a_red: "",
    plan_institucional_id: "",
    id_area_ruta: "",
    id_pic_tipo: "",
    eje: "",
    eje_id: "",
    pic_rel_capacitacion_red: [],
  };

  picEje = {
    id_eje: "",
    eje: "",
  };
  todasAreas = "";
  todas: any[] = [];
  redesTodas = "";

  // nuevo
  areasEscogidas: any[] = [];

  async mounted() {
    await this.obtenerAreasConocimiento();
    this.obtenerPicEje();
    this.estadoPeticionCargando = true;
  }

  updated() {
    if (this.capacitacion.id_pic_tipo != "1") {
      this.capacitacion.pertenece_a_red = "0";
    }
  }

  async obtenerAreasConocimiento() {
    await Axios()
      .get("/crear_pic")
      .then((respuesta) => {
        this.areas = respuesta.data.results.areas;

        this.picTipos = respuesta.data.results.picTipos;
        this.redesConocimiento = respuesta.data.results.redesConocimiento;

        // this.redesTodas = this.redesConocimiento;
      })
      .finally(() => {
        this.estadoPeticion = false;
      });
  }

  obtenerAreasPorRed() {
    Axios()
      .get("listar_areas_filtrado/" + this.capacitacion.pertenece_a_red)
      .then((respuesta) => {
        this.areas = respuesta.data.results;

        if (this.capacitacion.pertenece_a_red == "0") {
          this.areasEscogidas = [];
          this.todasAreas = this.areas[0];
          this.areasEscogidas.push(this.todasAreas);
        } else {
        }
      });
  }

  ponerTodasAreas() {
    if (this.capacitacion.id_pic_tipo != "1") {
      Axios()
        .get("listar_areas_filtrado/0")
        .then((respuesta) => {
          this.areas = respuesta.data.results;

          this.areasEscogidas = [];
          this.todasAreas = this.areas[0];
          this.areasEscogidas.push(this.todasAreas);
        });
    } else {
      this.areasEscogidas = [];
    }
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

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "Fecha mayor o igual a 2021",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite números ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  crearPIC() {
    this.estadoPeticionRegistrar = true;

    Axios()
      .post("/almacenar_pic", this.capacitacion)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Capacitación registrada",
            text: "La capacitación fue registrada exitosamente.",
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.registroTodasAreas(respuesta.data.results.id_pic);
          this.$router.push({ name: "GestionarPICENI" });
        } else {
          Swal.fire({
            title: "Capacitación no registrada",
            text: "La capacitación no fue registrada.",
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.$router.push({ name: "VerDetalleCapacitacionENI" });
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
        this.estadoPeticionRegistrar = false;
      });
  }


  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.crearPIC();
      }
    });
  }

  registrarAreas(id_pic) {
    for (let area of this.areasEscogidas) {
      setTimeout(() => {
        Axios()
          .post("almacenar_red", {
            id_area: area.id_area_ruta,
            id_pic: id_pic,
          })
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
            } else {
            }
          });
      }, 100);
    }
  }

  // Se podria considerar un machetazo para registrar todas las areas de una vez, pero funciona
  registroTodasAreas(id_pic) {
    if (this.capacitacion.id_pic_tipo != "1") {
      this.capacitacion.id_area_ruta = "0";
      this.areasEscogidas = this.areas;
      this.areas.push(id_pic);
      this.registrarAreas(id_pic);
    } else {
      this.registrarAreas(id_pic);
    }
  }

  registrarPicEje() {
    Axios()
      .post("almacenar_eje", this.picEje)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Pic Eje Guardado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.estadoPeticion = false;
          this.estadoPeticionRegistrar = true;

          this.$router.push({ name: "GestionarPICEje" });
        } else {
          Swal.fire("ERROR!", "No Se registro el Pic Eje", "error");
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

  obtenerPicEje() {
    Axios()
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
}
</script>

<style>
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
