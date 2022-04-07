<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR USUARIO</h1>
      </div>
      <div class="card-body row">
        <div class="col-12 col-md-8 mx-auto">
          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Primer nombre
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:</label
            >
            <div>
              <base-input
                v-model="usuario.primer_nombre"
                class="input-group-alternative mb-3"
                placeholder="Primer nombre*"
                addon-left-icon=""
                name="primer_nombre"
                id="primer_nombre"
                v-validate="'required'"
              >
              </base-input>
              <small
                v-show="errors.has('primer_nombre')"
                class="text-danger font-weigth-bold"
                >{{ errors.first("primer_nombre") }}</small
              >
            </div>
            <div>
              <label class="mt-2 font-weight-bold"
                >Segundo nombre
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:</label
              >
              <base-input
                v-model="usuario.segundo_nombre"
                class="input-group-alternative mb-3"
                placeholder="Segundo nombre*"
                addon-left-icon=""
                name="segundo_nombre"
                id="segundo_nombre"
                v-validate="'required'"
              >
              </base-input>
              <small
                v-show="errors.has('segundo_nombre')"
                class="text-danger font-weigth-bold"
                >{{ errors.first("segundo_nombre") }}</small
              >
            </div>
          </div>

          <div id="campo">
            <div>
              <label class="mt-2 font-weight-bold">
                Primer apellido
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:</label
              >
              <base-input
                v-model="usuario.primer_apellido"
                class="input-group-alternative mb-3"
                placeholder="Primer apellido*"
                addon-left-icon=""
                name="primer_apellido"
                id="primer_apellido"
                v-validate="'required'"
              >
              </base-input>
              <small
                v-show="errors.has('primer_apellido')"
                class="text-danger font-weigth-bold"
                >{{ errors.first("primer_apellido") }}</small
              >
            </div>
            <div>
              <label class="mt-2 font-weight-bold"
                >Segundo apellido
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*</span
                >:</label
              >
              <base-input
                v-model="usuario.segundo_apellido"
                class="input-group-alternative mb-3"
                placeholder="Segundo apellido*"
                addon-left-icon=""
                name="segundo_apellido"
                id="segundo_apellido"
                v-validate="'required'"
              >
              </base-input>
              <small
                v-show="errors.has('segundo_apellido')"
                class="text-danger font-weigth-bold"
                >{{ errors.first("segundo_apellido") }}</small
              >
            </div>
          </div>

          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Centro de formación
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:</label
            >
            <div class="input-group">
              <select
                class="form-control"
                v-model="usuario.id_centro_formacion"
              >
                <option :value="usuario.id_centro_formacion">
                  {{ usuario.centro_formacion }}
                </option>
                <option
                  v-for="(centro_formacion, index) in listaCentros"
                  :key="index"
                  v-bind:value="centro_formacion.id_centro_formacion"
                >
                  {{ centro_formacion.centro_formacion }}
                </option>
              </select>
            </div>
            <!-- <base-input
            v-model="usuario.centro_formacion"
            class="input-group-alternative mb-3"
            placeholder="Centro de formación*"
            addon-left-icon=""
            name="centro_formacion"
            id="centro_formacion"
            v-validate="'required'"
          >
          </base-input> -->
            <small
              v-show="errors.has('centro_formacion')"
              class="text-danger font-weigth-bold"
              >{{ errors.first("centro_formacion") }}</small
            >
          </div>

          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Correo
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:</label
            >
            <base-input
              v-model="usuario.correo"
              class="input-group-alternative mb-3"
              placeholder="Correo*"
              addon-left-icon=""
              name="correo"
              id="correo"
              v-validate="'required|email'"
            >
            </base-input>
            <small
              v-show="errors.has('correo')"
              class="text-danger font-weigth-bold"
              >{{ errors.first("correo") }}</small
            >
          </div>

          <div id="campo">
            <label class="mt-2 font-weight-bold"
              >Perfil
              <span
                class="text-danger font-weight-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top"
                >*</span
              >:</label
            >
            <div class="input-group">
              <select class="form-control" v-model="usuario.id_perfil">
                <option :value="usuario.id_perfil">{{ usuario.perfil }}</option>
                <option
                  v-for="(perfil, index) in perfiles"
                  :key="index"
                  v-bind:value="perfil.id_perfil"
                >
                  {{ perfil.perfil }}
                </option>
              </select>
            </div>
          </div>
          <div id="campo">
            <label class="mt-2 font-weight-bold">Teléfono:</label>
            <base-input
              v-model="usuario.telefono"
              class="input-group-alternative mb-3"
              placeholder="Teléfono*"
              addon-left-icon=""
              name="telefono"
              id="telefono"
            >
            </base-input>
          </div>
          <span
            class="text-danger font-weigth-bold"
            tooltip="Campo Requerido"
            tooltip-flow="top"
            >*</span
          >
          <small>Campos obligatorios</small>
          <!-- Volver lista de usuario -->
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click="validarFormulario()"
              class="btn btn-block"
              >Modificar
            </base-button>
          </div>
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
    id_centro_formacion: "1",
    correo: "",
    perfil: "",
    id_perfil: "1",
    telefono: "",
  };
  listaCentros = [];
  perfiles;

  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        // min: () => "Mínimo 8 caracteres",
        email: () => "Correo invalido",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {
    this.obtenerUsuario(this.$route.params.id);
    this.obtenerPerfiles();
  }
  async obtenerUsuario(id) {
    await Axios()
      .get("/editar_usuario/" + id)
      .then((respuesta) => {
        return respuesta.data.results; //pasa a la siguiente promesa
      })
      .then((res) => {

        // if(res){
        setTimeout(() => {
          this.usuario = res.usuario;
          this.perfiles = res.perfiles;
          this.listaCentros = res.centros_formacion;

          // this.usuario = respuesta.data.results;
        }, 100);
        // }
      });
  }

  obtenerPerfiles() {
    Axios()
      .get("listar_perfiles")
      .then((respuesta) => {
        this.perfiles = respuesta.data.results;

        // this.$router.push({name: "dashboard"})
      })
      .catch((respuesta) => {
        //  Swal.fire((respuesta.data.status+"!").toString().toUpperCase(), respuesta.data.message, respuesta.data.status);
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor al cargar perfiles!",
          "error"
        );
      });
  }

  ModificarUsuario() {
    Axios()
      .put("/actualizar_usuario/" + this.$route.params.id, this.usuario)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire(
            "Usuario Modificado!".toString().toUpperCase(),
            "Se a modificado el usuario exitosamente",
            respuesta.data.status
          );
          this.$router.push({ name: "GestionarUsuario" });
        } else {
          Swal.fire(
            (respuesta.data.status + "!").toString().toUpperCase(),
            respuesta.data.message.usuario,
            respuesta.data.status
          );
        }
      });
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.ModificarUsuario();
      }
    });
  }
}
</script>
