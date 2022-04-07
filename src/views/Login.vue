<template>
  <div class="col-lg-6 col-md-6">
    <div class="card bg-secondary shadow border-2">
      <div class="card-body px-lg-5 py-lg-5">
        <div class="text-center text-muted mb-4">
          <h1 class="text-azul-sena">INICIAR SESIÓN</h1>
        </div>
        <form
          role="form"
          @submit.prevent="handleSubmit(login)"
          v-if="!estadoPeticion"
        >
          <base-input
            class="input-group-alternative mb-3"
            placeholder="Usuario*"
            addon-left-icon="ni ni-single-02"
            addon-rigth-icon="ni ni-single-02"
            v-model="usuario.usuario"
            name="usuario"
            id="usuario"
            v-validate="'required'"
            @keyup.enter="validarFormulario()"
          >
          </base-input>
          <!-- error -->
          <small v-show="errors.has('usuario')" class="text-danger">{{
            errors.first("usuario")
          }}</small>

          <base-input
            class="input-group-alternative"
            placeholder="Contraseña*"
            type="password"
            addon-left-icon="ni ni-lock-circle-open"
            v-model="usuario.password"
            name="password"
            id="password"
            v-validate="'required'"
            @keyup.enter="validarFormulario()"
          >
          </base-input>
          <small v-show="errors.has('password')" class="text-danger">{{
            errors.first("password")
          }}</small>
          <!-- <base-checkbox class="custom-control-alternative">
                <span class="text-muted">Remember me</span>
              </base-checkbox> -->
          <div class="text-center mb--3 mt--3">
            <base-button
              type="naranja-sena"
              @click="validarFormulario()"
              class="my-4"
              >Iniciar sesión</base-button
            >
          </div>
          <span
            class="text-danger font-weight-bold"
            tooltip="Campo Requerido"
            tooltip-flow="top"
            >*</span
          >

          <small>Campos obligatorios</small>
        </form>
        <div v-if="!estadoPeticion">
          <small>
            <router-link
              class="text-azul-sena"
              :to="{ name: 'olvidasteContrasena' }"
            >
              ¿olvidaste tu contraseña?
            </router-link>
          </small>
        </div>
        <div v-if="estadoPeticion" class="tamanocargando">
          <AnimacionCargando></AnimacionCargando>
        </div>
      </div>
    </div>
    <div class="margenfoo"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  // import { mapState, mapActions} from "vuex"
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import AnimacionCargando from '../../src/components/animacionCargando.vue';

  @Component({
    components: {
      AnimacionCargando
    }
  })
  export default class Login extends Vue {
    usuario = { usuario: "", password: "" };
    // usuario = { usuario: "meerazo7", password: "sigpa2021" };
    prueba = {
      usuario: "meerazo7",
      password: "sigpa2021",
      id_usuario: 62,
      id_persona: 26329106,
      primer_nombre: "MANUEL",
      segundo_nombre: "ESTEBAN",
      primer_apellido: "ERAZO",
      segundo_apellido: "MEDINA",
      id_perfil: 1,
      perfil: "Administrador",
      ruta_foto: "FotoUsuario/IRe7jIqmq7NFxEbSUZovKYcUiPYD9C4vM3pNuTQ4.png",
      id_centro_formacion: 9221,
      regional_id: 19,
      regional: "REGIONAL CAUCA",
      centro_formacion: "CENTRO DE TELEINFORMÁTICA Y PRODUCCIÓN INDUSTRIAL"
    };
    estadoPeticion = false;
    constructor() {
      super();

      const dict = {
        messages: {
          required: () => "Campo obligatorio",
          min: () => "Mínimo 8 caracteres",
          // email: () => "Correo invalido",
        },
      };
      this.$validator.localize("es", dict);
    }

    mounted() {      
    }
    
    login() {

      // sessionStorage.setItem(
      //   "usuario",
      //   JSON.stringify(this.prueba)
      // );
      this.estadoPeticion = true;
      Axios()
        .post("login", this.usuario)
        .then((respuesta) => {

          try {

            if (respuesta.data.status == "success") {
              sessionStorage.setItem(
                "usuario",
                JSON.stringify(respuesta.data.results.usuario)
              );
              // this.$store.state.account.dispatch("login", JSON.stringify(respuesta.data.results.usuario))
              sessionStorage.setItem(
                "modulos",
                JSON.stringify(respuesta.data.results.modulos)
              );

              this.$router.push({ name: "dashboard" });

            } else {
              // Swal.fire("Error inicio sesión", respuesta.data.message, respuesta.data.status);
              this.estadoPeticion = false;
              Swal.fire(
                (respuesta.data.status + "!").toString().toUpperCase(),
                respuesta.data.message,
                respuesta.data.status
              );
              this.estadoPeticion = false;
            }
            //estado de petición
            this.estadoPeticion = false;
          } catch (error) {
            this.estadoPeticion = false;
          }
          // sdadsasdasd
        })
        .catch((err) => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
          this.estadoPeticion = false;
        });
    }

    public validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          this.login();
        }
      });
    }
  }
</script>
<style>
  .margenfoo {
    margin-bottom: 150px;
  }
</style>
