<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR MI EDUCACIÓN</h1>
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
                        Título Obtenido
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido" tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="Titulo_Obtenido"
                          class="form-control"
                          placeholder="Titulo Obtenido"
                          v-model="datosEducacion.titulo_obtenido"
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
                    <!-- Institucion -->
                    <br />
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Institución
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido" tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <div class="input-group">
                        <input
                          type="text"
                          name="institucion"
                          class="form-control"
                          placeholder="Nombre de la institución"
                          v-model="datosEducacion.institucion"
                          required
                          v-validate="'required'"
                        />
                      </div>
                      <small
                        v-show="errors.has('institucion')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("institucion") }}
                      </small>
                    </div>
                    <br />
                    <!-- Fecha de inicio -->
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold"
                          >Fecha Inicio<span class="text-danger">*</span
                          >:</label
                        >
                        <div>
                          <input
                            type="date"
                            class="form-control"
                            name="fecha_inicio"
                            id="fecha_inicio"
                            v-model="datosEducacion.fecha_inicio"
                            max="2021-12-31"
                            required
                            v-validate="'required'"
                          />
                          <small
                            v-show="errors.has('fecha_inicio')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("fecha_inicio") }}
                          </small>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold"
                          >Fecha de Finalización<span class="text-danger"
                            >*</span
                          >:</label
                        >
                        <div>
                          <input
                            type="date"
                            class="form-control"
                            name="fecha_fin"
                            id="fecha_fin"
                            v-model="datosEducacion.fecha_fin"
                            :min="datosEducacion.fecha_inicio"
                            required
                            v-validate="'required'"
                          />
                          <small
                            v-show="errors.has('fecha_fin')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("fecha_fin") }}
                          </small>
                        </div>
                      </div>
                    </div>
                    <!-- adjunto -->
                    <br />
                    <!-- certificado -->
                    <div class="row">
                      <div id="campo" class="col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold">
                          Certificación </label
                        ><span
                          class="text-danger font-weigth-bold"
                          title="Campo Requerido"
                          >*</span
                        >:
                        <!-- subir certificado -->
                        <div class="container-input">
                          <input
                            v-show="false"
                            type="file"
                            ref="botonResolución"
                            name="urlResolucion"
                            class="form-control inputfile-1"
                            id="certificado"
                            @change="obtenerDocumento($event)"
                            v-validate="{ required }"
                            accept="application/pdf"
                          />
                          <label
                            for="urlResolucion"
                            @click.prevent="$refs.botonResolución.click()"
                            class="btn bg-azul-sena"
                          >
                            <i class="fas fa-file-upload"></i>
                            <span>Certificado</span>
                          </label>
                        </div>
                        <!-- fin -->
                        <small
                          v-show="errors.has('certificado')"
                          class="text-danger font-weigth-bold"
                        >
                          {{ errors.first("certificado") }}
                        </small>
                      </div>
                    </div>
                    <div>
                      <base-button
                        tooltip="Campo Requerido" tooltip-flow="top"
                        type="azul-sena"
                        @click="mirarModal()"
                        class="btn btn-sm bg-azul-sena text-white space"
                        ><i class="fas fa-eye"></i
                      ></base-button>
                    </div>
                    <br>
                    <!-- modal -->
                    <div class="container" id="modal">
                      <modal
                        :show.sync="verModal"
                        body-classes="p-0"
                        modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
                      >
                        <template slot="header">
                          <h2
                            class="text-azul-sena modal-title"
                            id="modalNovedadesAprendiz"
                          >
                            Certificado
                          </h2>
                        </template>
                        <card
                          type="white"
                          shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0"
                        >
                          <div id="contenido">
                            <embed
                              :src="rutadocumento"
                              type="application/pdf"
                              width="100%"
                              height="600px"
                            />
                          </div>
                        </card>
                      </modal>
                    </div>
                    <!-- modal finnnnnnnnnn-->
                    <!-- fin certificado -->
                    <div class="form-group">
                      <label class="mt-2 font-weight-bold"
                        >Tipo De Educación<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <select
                        class="form-control"
                        name="Tipo_Educacion"
                        id="Tipo_Educacion"
                        v-model="datosEducacion.tipo_educacion"
                        required
                        v-validate="'required'"
                      >
                        <option :value="1">Educacion Formal</option>
                        <option :value="2">Educacion No Formal</option>
                      </select>
                    </div>
                    <small
                      v-show="errors.has('Tipo_Educacion')"
                      class="text-danger font-weigth-bold"
                    >
                      {{ errors.first("Tipo_Educacion") }}
                    </small>
                    <br />
                  </div>
                </div>
              </div>
              <div class="card-footer">
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

@Component({
  components: {},
})
export default class ModificarEducacionPersona extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  docValido = false;
  estadoPeticion = false;
  rutadocumento = null;
  verModal = false;
  docResolucon = "";
  docVista = null;

  datosEducacion = {
    actualizado: "",
    certificado: "",
    creado: "",
    fecha_fin: "",
    fecha_inicio: "",
    id_educacion: "",
    institucion: "",
    persona_id: "",
    tipo_educacion: "",
    titulo_obtenido: "",
  };
  mounted() {
    // this.modificarDatosEducacion(this.$route.params.id);
    this.obtenerDatosEducacionPersona(this.$route.params.id);
    this.mostrarDocumento(this.datosEducacion.id_educacion);
  }
  vistaPreviaEvidencia() {
    if (this.docResolucon != "") {
      this.docVista = URL.createObjectURL(this.docResolucon);
    }
  }
  // voy a intentar mostrar en boton el pdf
  mirarModal() {
    this.verModal = true;
  }
  // ------------------------------------------------------------------------
  async obtenerDatosEducacionPersona(id) {
    await Axios()
      .get("ver_detalle_educacion_persona/" + id)
      .then((respuesta) => {
        this.datosEducacion = respuesta.data.results;
        this.mostrarDocumento(id);
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  //----------------------------------------------------------------
  mostrarDocumento(id_educacion) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/ver_certificado_educacion_persona/" +
      id_educacion;
  }

  modificarDatosEducacion(id) {
    this.datosEducacion.persona_id = this.id_persona_logeada;

    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("certificado", this.datosEducacion.certificado);
    data.append("fecha_fin", this.datosEducacion.fecha_fin);
    data.append("fecha_inicio", this.datosEducacion.fecha_inicio);
    data.append("institucion", this.datosEducacion.institucion);
    data.append("persona_id", this.id_persona_logeada);
    data.append("tipo_educacion", this.datosEducacion.tipo_educacion);
    data.append("titulo_obtenido", this.datosEducacion.titulo_obtenido);

    Axios()
      .post(
        "modificar_educacion_persona/" + this.datosEducacion.id_educacion,
        data,
        {
          headers: headers,
        }
      )
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire(
            "Se subió la Educación!",
            "Educación Modificada",
            respuesta.data.status
          );
          this.estadoPeticion = false;
          this.$router.push({ name: "GestionarHojaDeVidaENI" });
        } else {
          Swal.fire("ERROR!", "No se Modifico La Educación", "error");
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.modificarDatosEducacion(this.$route.params.id);
      }
    });
  }
  //-----------------------------------------------------------
  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "No pude ser negativo",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }
  //--------------------------------------------------------------
  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.datosEducacion.certificado = event.target.files[0];
        Swal.fire(
          "Resolución Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
      } else {
        this.docValido = false;
        this.datosEducacion.certificado = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.datosEducacion.certificado = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
}
</script>

<style>
.inputfile-1 + label {
  color: #fff;
  font-size: 0.9em;
}

.inputfile-1:focus + label,
.inputfile-1.has-focus + label,
.inputfile-1 + label:hover {
  color: #fff;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #238276;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #238276;
}

.nav-pills .nav-link {
  color: #333;
}
.modif {
  color: #333;
}

.rigth {
  margin-left: 27em;
}
</style>
