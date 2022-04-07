<template>
  <div class="col-lg-6 col-md-6">
    <div class="card bg-secondary shadow border-2">
      <div class="card-body px-lg-5 py-lg-5">
        <div class="text-center text-muted mb-4">
          <h1 class="text-azul-sena">VALIDAR RECUPERACIÓN DE CONTRASEÑA</h1>
        </div>
        <form role="form" @submit.prevent="handleSubmit(login)" v-if="!estadoPeticion">
          <base-input
            class="input-group-alternative"
            placeholder="Numero de identificación*"
            addon-left-icon="ni ni-badge"
            addon-rigth-icon="ni ni-badge"
            v-model="usuario.identificacion"
            name="identificacion"
            id="identificacion"
            v-validate="{required : true}"
            @keyup.enter="validarFormulario()"
          >
          </base-input>
          <!-- error -->
          <small v-show="errors.has('identificacion')" class="text-danger  mb-3">{{
            errors.first("identificacion")
          }}</small>

          <base-input
            class="input-group-alternative"
            placeholder="Correo Sena*"
            type="text"
            addon-left-icon="ni ni-email-83"
            v-model="usuario.correo"
            name="correo"
            id="correo"
            v-validate="{required : true, email : true}"
            @keyup.enter="validarFormulario()"
          >
          </base-input>
          <small v-show="errors.has('correo')" class="text-danger">{{
            errors.first("correo")
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
          
          <div class="text-center">
            <base-button
              type="azul-sena btn btn-block"
              @click="validarFormulario()"
              class="my-4"
              >Recuperar contraseña</base-button
            >

            <small>
              <router-link
              class="text-azul-sena"
              :to="{
                name: 'login',
              }"
            >
              Volver
            </router-link>
            </small>
          </div>
          
         
          <span
            class="text-danger font-weight-bold"
            tooltip="Campo Requerido"
                        tooltip-flow="top"
            >*</span>
          
          <small>Campos obligatorios</small>
          
        </form>
        <div v-if="estadoPeticion" class="tamanocargando" >
           <AnimacionCargando></AnimacionCargando>
          </div>
      </div>
    </div>
    <div class="margenfoo">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { mapState, mapActions} from "vuex"
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from '../../../components/animacionCargando.vue';

@Component({
  components:{
    AnimacionCargando
  }
})
export default class Login extends Vue {
  usuario = { identificacion: "", correo: "" };
  estadoPeticion=false;
  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        min: () => "Mínimo 8 caracteres",
        email: () => "Correo invalido",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {}
  recuperarContrasena(){
    Swal.fire({
      title: "Revisa tu correo",
              text: "Se ha enviado la información necesaria para continuar con el proceso de recuperación de contraseña.",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
  }

  public validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.recuperarContrasena();
      }
    });
  }
}
</script>
<style>
.margenfoo{
  margin-bottom:10px;
}
</style>
