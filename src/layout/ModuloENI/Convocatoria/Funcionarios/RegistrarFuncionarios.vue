<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR FUNCIONARIOS</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <!-- Mi Educacion -->
              <div class="card-body">
                <div
                  class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                >
                  <div>
                    <br />
                    <!-- Curso Obtenido -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Funcionario
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
                          name="nombre"
                          class="form-control"
                          placeholder="Registrar Funcionario"
                          v-model="Funcionario.nombre"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('nombre')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("nombre") }}
                      </small>
                    </div>
                   
                    <br />
                  </div>
                </div>
              </div>
                <div class="text-center card-footer" v-if="estadoPeticionRegistrar">
            <AnimacionCargando></AnimacionCargando>
            </div>
              <div class="card-footer" v-if="!estadoPeticionRegistrar">
                <div class="row justify-content-center">
                  <div class="col-lg-4 col-sm-12 mt-1">
                    <base-button
                      type="azul-sena"
                      @click="validarFormulario()"
                      class="btn btn-block bg-azul-sena text-white"
                      >Registrar</base-button
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
export default class  RegistrarFuncionario extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  estadoPeticionRegistrar = false;
  docValido = false;
  rutadocumento = null;
  verModal = false;
  docResolucon = "";
  docVista = null;
  estado = false;

  Funcionario = {
    id_dirigido_a: "",
    nombre: "",
  };
  mounted() {}
  registrarfuncionarios() {

    this.estadoPeticionRegistrar = true;

    Axios()
      .post("almacenar_pic_dirigida", this.Funcionario)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.estado = true;
          Swal.fire({
            title: "Funcionario Guardado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.estadoPeticion = false;
          this.$router.push({ name: "GestionarFuncionarios" });
        } else {
          Swal.fire("ERROR!", "No Se Registro el Funcionario", "error");
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
        this.estadoPeticionRegistrar = false;
      });
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.registrarfuncionarios();
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