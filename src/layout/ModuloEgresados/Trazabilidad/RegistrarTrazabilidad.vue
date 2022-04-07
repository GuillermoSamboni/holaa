<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR TRAZABILIAD</h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div>
            <label class="mt-2 font-weight-bold">
              Trazabilidad
              <span class="text-danger">*</span>
              :
            </label>
            <div>
              <input
                type="text"
                class="form-control"
                name="Trazabilidad"
                id="capacitacion"
                placeholder="Trazabilidad"
                v-model="trazabilidad.trazabilidad"
                v-validate="{ required: true, alpha_spaces: false }"
              />
              <small v-show="errors.has('trazabilidad')" class="text-danger">
                {{ errors.first("trazabilidad") }}
              </small>
            </div>
          </div>

          <div>
            <label class="mt-2 font-weight-bold"
              >Eje<span class="text-danger">*</span>:</label
            >
            <div class="input-group">
              <select
                v-model="trazabilidad.eje_id"
                v-validate="{ required: true }"
                id="linea_cap"
                name="linea_cap"
                class="form-control"
              >
                <option value="" selected disabled>Seleccione Eje</option>
                <option
                  v-for="(eje, index) in listaEjes"
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
        </div>
      </div>

      <div class="card-footer">
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
                name: 'GestionarTrazabilidades',
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
export default class ResgitrarTrazabilidad extends Vue {
  trazabilidad = {
    eje: "",
    id_eje: "",
    id_trazabilidad: "",
    trazabilidad: "",
  };

  estadoPeticion = false;

  picEje = {
    id_eje: "",
    eje: "",
  };

  listaEjes: any[] = [];

  async mounted() {
    this.obtenerPicEje();
  }

  obtenerPicEje() {
    Axios()
      .get("/crear_ejes")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaEjes = respuesta.data.results.Ejes;
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

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        alpha_spaces: () => "No permite números ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.registrarTrazabilidad();
      }
    });
  }

  registrarTrazabilidad() {
    Axios()
      .post("almacenar_pane_trazabilidad", this.trazabilidad)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Pic Eje Guardado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.estadoPeticion = false;
          this.$router.push({ name: "GestionarTrazabilidades" });
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
}
</script>
