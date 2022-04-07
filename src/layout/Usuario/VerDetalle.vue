<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">VER USUARIO</h1>
      </div>
      <div class="card-body row">
        <div class="col-12 col-md-8 mx-auto">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Primer nombre: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.persona.primer_nombre }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Segundo nombre: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.persona.segundo_nombre }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Primer apellido: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.persona.primer_apellido }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Segundo apellido: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.persona.segundo_apellido }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Red: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ areaRuta.red_conocimiento }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Area: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ areaRuta.area_ruta }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Regional: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.centro_formacion.regional.regional }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Centro de formación: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.centro_formacion.centro_formacion }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Correo Institucional: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.correo }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- capacitación -->
              <div>
                <strong>Correo alterno:</strong>
              </div>
              <div id="contenido">
                {{ usuario.persona.correo_aternativo }}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Teléfono celular: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.persona.telefono_movil }}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- nombre de la convocatoria -->
              <div>
                <strong>Perfil: </strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ usuario.perfil.perfil }}
                </p>
              </div>
            </div>
          </div>

          <!-- Volver lista de usuario -->
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarUsuario',
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

@Component
export default class ModificarPerfil extends Vue {
  usuario = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    centro_formacion: "",
    correo: "",
    perfil: "",
    telefono: "",
    area_ruta_id: "",
    regional: "",
  };
  areaRuta = {
    id_usuario: null,
    persona_id: null,
    id_area_ruta: null,
    area_ruta: "",
    red_conocimiento: "",
    id_red_conocimiento: null,
  };

  constructor() {
    super();
  }

  mounted() {
    this.obtenerUsuario(this.$route.params.id);
    this.obtenerAreaRuta(this.$route.params.id);
  }
  async obtenerUsuario(id) {
    await Axios()
      .get("listar_usuario/" + id)
      .then((respuesta) => {
        return respuesta.data.results; //pasa a la siguiente promesa
      })
      .then((res) => {

        // if(res){
        setTimeout(() => {
          this.usuario = res;

          // this.usuario = respuesta.data.results;
        }, 100);
        // }
      });
  }

  obtenerAreaRuta(idUsuario) {
    Axios()
      .get("ver_area_red_usuario/" + idUsuario)
      .then((respuesta) => {
        this.areaRuta = respuesta.data.results;
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
