<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR PIC EJE</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <div v-if="!estado">
                <AnimacionCargando />
              </div>
              <!-- Mi Educacion -->
              <div class="card-body" v-if="estado">
                <div
                  class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                >
                  <div>
                    <br />
                    <!-- Curso Obtenido -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Pic Eje
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="Pic_Eje"
                          class="form-control"
                          placeholder="Pic Eje"
                          v-model="pic_eje.eje"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('Pic_Eje')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("Pic_Eje") }}
                      </small>
                    </div>
                    <!-- Institucion -->
                    <br />
                  </div>
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
            <br />
          </div>
          <!-- Fin Contenido -->
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
import AnimacionCargando from "@/components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class ModificarEducacionPersona extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
  estado = false;
  estadoPeticionModificar = false;

  docValido = false;
  estadoPeticion = false;
  rutadocumento = null;
  verModal = false;
  docResolucon = "";
  docVista = null;

  pic_eje = {
    id_eje: "",
    eje: "",
  };
  mounted() {
    this.obtenerPicEje(this.$route.params.id);
  }

  // ------------------------------------------------------------------------
  obtenerPicEje(idEje) {
    Axios()
      .get("listar_detalle_eje/" + idEje)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.pic_eje = respuesta.data.results;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .finally(() => {
        this.estado = true;
      });
  }

  //----------------------------------------------------------------

  modificarPicEje() {
      this.estadoPeticionModificar = true;
    Axios()
      .put("modificar_detalle_eje/" + this.pic_eje.id_eje, this.pic_eje)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire(
            "Se Modifico el pic eje",
            "Pic Eje Modificado",
            respuesta.data.status
          );
          //   this.estadoPeticion = false;
          this.$router.push({ name: "GestionarPICEje" });
        } else {
          Swal.fire("ERROR!", "No Se Modifico Pic Eje", "error");
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
        this.estadoPeticionModificar =false;
      });
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.modificarPicEje();
      }
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

#contenido {
  text-align: center;
}
#texto {
  text-align: justify;
}
</style>
