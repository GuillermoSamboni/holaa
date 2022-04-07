<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR TRAZABILIAD</h1>
        <!-- <H2>{{ this.trazabilidad }} </H2> -->
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
                placeholder="Trazabilidad"
                v-model="trazabilidad.trazabilidad"
                required
                v-validate="'required'"
              />
              <small v-show="errors.has('Trazabilidad')" class="text-danger">
                {{ errors.first("Trazabilidad") }}
              </small>
            </div>
          </div>

          <!-- <div>
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
          </div> -->
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
              Modificar
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
    // Multiselect,
  },
})
export default class ResgitrarTrazabilidad extends Vue {
  // id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  trazabilidad = {
    eje: "",
    id_eje: "",
    id_trazabilidad: "",
    trazabilidad: "",
  };

  estadoPeticion = false;

  //   picEje = {
  //     id_eje: "",
  //     eje: "",
  //   };

  //   listaEjes: any[] = [];

  async mounted() {
    this.obtenerListaTrazabilidad(this.$route.params.id);
  }

  async obtenerListaTrazabilidad(id_trazabilidad) {
    Axios()
      .get("ver_detalle_pane_trazabilidad/" + id_trazabilidad)
      .then((respuesta) => {
        this.trazabilidad = respuesta.data.results;
        this.estadoPeticion = false;
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  async modificarTrazabilidad() {
    Axios()
      .put(
        "actualizar_pane_trazabilidad/" + this.trazabilidad.id_trazabilidad,
        { trazabilidad: this.trazabilidad.trazabilidad }
      )
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Trazabilidad modificada",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.estadoPeticion = false;
          this.$router.push({ name: "GestionarTrazabilidades" });
        } else {
          Swal.fire("ERROR!", "No se modifico trazabilidad", "error");
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

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.modificarTrazabilidad();
      }
    });
  }
}
</script>