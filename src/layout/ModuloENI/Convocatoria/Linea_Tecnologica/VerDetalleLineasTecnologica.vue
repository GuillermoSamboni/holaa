<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MI LÍNEA TECNOLÓGICA</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <span slot="title">Mi Linea Tecnologica Registrada</span>
                <div v-if="!estado">
                  <AnimacionCargando />
                </div>
                <div class="card-body" v-if="estado">
                  <!-- <div class="text-center" v-if="!estadoPeticion">
                    <AnimacionCargando></AnimacionCargando>
                  </div> -->
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- nombre de la convocatoria -->
                        <div>
                          <strong>Id Línea Tecnológica:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ Linea_Tecnologica.id_pic_linea_tecnologica }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- nombre de la convocatoria -->
                        <div>
                          <strong>Línea Tecnológica:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ Linea_Tecnologica.linea_tecnologica }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </tabs>
            </div>
            <br />
          </div>
          <!-- Fin Contenido -->
        </div>
        <div class="card-footer">
          <div class="row justify-content-center">
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
export default class VerDetalleEducacionPersona extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
  estado = false;

  Linea_Tecnologica = {
    id_pic_linea_tecnologica: "",
    linea_tecnologica: "",
  };
  mounted() {
    this.obtenerLineaTecnologica(this.$route.params.id);
  }
  obtenerLineaTecnologica(id_linea) {
    Axios()
      .get("listar_detalle_linea_tecnologica/" + id_linea)
      .then((respuesta) => {

        if (respuesta.data.status == "success") {
          this.Linea_Tecnologica = respuesta.data.results;
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
      })
       .finally(() => {
        this.estado = true;
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