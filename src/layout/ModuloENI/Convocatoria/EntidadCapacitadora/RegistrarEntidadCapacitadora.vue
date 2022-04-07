<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR ENTIDAD CAPACITADORA</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <!-- Mi Entidad Capacitadora -->
              <div class="card-body">
                <div
                  class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                >
                  <div>
                    <br />
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Entidad Capacitadora
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="Titulo_Obtenido"
                          class="form-control"
                          placeholder="Entidad capacitadora"
                          v-model="Entidad_Capacitadora.entidad_capacitadora"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('Titulo_Obtenido')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("Titulo_Obtenido") }}
                      </small>
                    </div>
                    <br />
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Nit
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="nit"
                          id="nit"
                          class="form-control"
                          placeholder="Nit"
                          v-model="Entidad_Capacitadora.nit"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('nit')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("nit") }}
                      </small>
                    </div>
                    <br />
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Dirección
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="direccion"
                          id="direccion"
                          class="form-control"
                          placeholder="Dirección"
                          v-model="Entidad_Capacitadora.direccion"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('direccion')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("direccion") }}
                      </small>
                    </div>
                    <br />
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Correo
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="correo"
                          id="correo"
                          class="form-control"
                          placeholder="Correo"
                          v-model="Entidad_Capacitadora.correo"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('correo')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("correo") }}
                      </small>
                    </div>
                    <br />
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Número Teléfono
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="numero_telefono"
                          id="numero_telefono"
                          class="form-control"
                          placeholder="Número teléfono"
                          v-model="Entidad_Capacitadora.numero_telefono"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('numero_telefono')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("numero_telefono") }}
                      </small>
                    </div>
                    <br />
                    <div id="campo">
                      <label class="mt-2 font-weight-bold">
                        Camara Comercio </label
                      ><span
                        class="text-danger font-weigth-bold"
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div class="container-input">
                        <input
                          v-show="false"
                          type="file"
                          ref="botonResolución"
                          name="minuta"
                          class="form-control inputfile-1"
                          id="minuta"
                          @change="obtenerMinuta($event)"
                          v-validate="{ required }"
                        />
                        <label
                          for="minuta"
                          @click.prevent="$refs.botonResolución.click()"
                          class="btn bg-azul-sena"
                        >
                          <i class="fas fa-file-upload"></i>
                          <span>Documento</span>
                        </label>
                      </div>
                      <small v-show="errors.has('minuta')" class="text-danger">
                        {{ errors.first("minuta") }}
                      </small>
                      <!-- <div>
                        <div
                          id="campo"
                          v-if="Entidad_Capacitadora.camara_comercio != null"
                        >
                          Documento seleccionado :
                          {{ Entidad_Capacitadora.camara_comercio.name }}
                        </div>
                      </div> -->
                    </div>
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
                    >
                      Registrar
                    </base-button>
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
export default class ModificarEntidadCapacitadora extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

estadoPeticionRegister = false;
  docValido = false;
  estadoPeticion = false;
  rutadocumento = null;
  verModal = false;
  docResolucon = "";
  docVista = null;


  Entidad_Capacitadora = {
    id_pic_entidad_capacitadora: "",
    entidad_capacitadora: "",
    nit: "",
    direccion: "",
    correo: "",
    numero_telefono: "",
    camara_comercio: null,
  };

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "El valor no puede ser menor a cero",
        email: () => "El correo no es válido",
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {}
  obtenerMinuta(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.Entidad_Capacitadora.camara_comercio = event.target.files[0];
        Swal.fire(
          "Certificación Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
        // this.docResolucon = null;
      } else {
        this.docValido = false;
        this.Entidad_Capacitadora.camara_comercio = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.Entidad_Capacitadora.camara_comercio = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
  registrarEntidadCapacitadora() {
    this.estadoPeticionRegister = true;
    this.estadoPeticion = true;
    var data = new FormData();

    //Añadimos la docinscrip seleccionada
    data.append(
      "entidad_capacitadora",
      this.Entidad_Capacitadora.entidad_capacitadora
    );
    data.append("nit", this.Entidad_Capacitadora.nit);
    data.append("direccion", this.Entidad_Capacitadora.direccion);
    data.append("correo", this.Entidad_Capacitadora.correo);
    data.append("numero_telefono", this.Entidad_Capacitadora.numero_telefono);
    data.append("camara_comercio", this.Entidad_Capacitadora.camara_comercio);

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    Axios()
      .post("almacenar_entidad_capacitadora", data, {
        headers: headers,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          

          Swal.fire({
            title: "Entidad Capacitadora Guardada",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.$router.push({ name: "GestionarEntidadCapacitadora" });
        } else {
          Swal.fire("ERROR!", "No Se Modifico La Linea Tecnologica", "error");
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
        this.estadoPeticionRegister = false;
      });
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.registrarEntidadCapacitadora();
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
