<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR PERFIL</h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <form
            role="form"
            class=""
            @submit.prevent="handleSubmit(RegistrarPerfil())"
          >
            <div id="campo">
              <label for=""
                >Perfil
                <span
                  class="text-danger"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:</label
              >
              <input
                v-model="perfil"
                class="form-control mb-3"
                placeholder="Perfil*"
                addon-left-icon=""
                name="perfil"
                id="perfil"
                v-validate="{ required: true, alpha_spaces: true }"
              />
              <small v-show="errors.has('perfil')" class="text-danger">{{
                errors.first("perfil")
              }}</small>
            </div>
            <!-- error -->
            <span
              class="text-danger"
              tooltip="Campo Requerido"
              tooltip-flow="top"
              >*</span
            >
            <small>Campos obligatorios</small>
          </form>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click="validarFormulario()"
              class="btn btn-block bg-azul-sena text-white"
              >Registrar</base-button
            >
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
export default class RegistrarPerfil extends Vue {
  perfil: string = "";

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        // min: () => "Mínimo 8 caracteres",
        // email: () => "Correo invalido",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {}

  RegistrarPerfil() {
    Axios()
      .post("almacenar_perfil", { perfil: this.perfil })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire(
            "Perfil Creado!".toString().toUpperCase(),
            "Se a creado el perfil exitosamente",
            respuesta.data.status
          );
          this.$router.push({ name: "GestionarPerfil" });
        } else {
          Swal.fire(
            (respuesta.data.status + "!").toString().toUpperCase(),
            respuesta.data.message.perfil[0],
            respuesta.data.status
          );
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

  public validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.RegistrarPerfil();
      }
    });
  }
}
</script>
