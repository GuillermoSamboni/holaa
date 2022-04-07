<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">USUARIO POSTULADO</h1>
      </div>
      <!-- {{ listaInscripciones }} -->
      <div class="card-body row">
        <div class="col-12 col-md-8 mx-auto">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Primer Nombre:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ persona.primer_nombre }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Segundo Nombre:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ persona.segundo_nombre }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Primer Apellido:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ persona.primer_apellido }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Segundo Apellido:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ persona.segundo_apellido }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Correo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ persona.correo }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Identificación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ persona.identificacion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <!-- Volver lista de usuario -->
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'PostulacionesConvocatoriaENI',
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
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_usuario;

  estadoPeticion = false;

  persona = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido:"",
    segundo_apellido: "",
    correo: "",
    identificacion: "",
  }

  // persona = null;
  constructor() {
    super();
  }

  mounted() {
     this.obtenerInscritos(this.$route.params.id);
  }


  obtenerInscritos(id) {
     Axios()
      .get("listar_adjudicados_postulados/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.persona = respuesta.data.results;
          this.estadoPeticion = false;
        } else {
          Swal.fire({
            title: "Hay un problema",
            text: respuesta.data.message,
            icon: "error",
          });
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
        // this.$router.push("/GestionarConvocatoriaENI");
      })
      .finally(() => {
        // this.estadoPeticionTabla = true;
      });
  }

  
}
</script>
