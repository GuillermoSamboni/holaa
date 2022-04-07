<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR CONVENIO</h1>
        <hr />
        <!-- Contenido -->
        <div>
          <div class="card-body">
            <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
              <div>
                <label class="mt-2 font-weight-bold">
                  Nombre del Convenio
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
                    name="Nombre_Convenio"
                    class="form-control"
                    v-model="convenio.convenio"
                    placeholder="Nombre del Convenio"
                    v-validate="{ required }"
                  />
                </div>
                <small
                  v-show="errors.has('Nombre_Convenio')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("Nombre_Convenio") }}
                </small>
              </div>
              <div>
                <label class="mt-2 font-weight-bold">
                  Regional
                  <span
                    class="text-danger font-weigth-bold"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                    >*</span
                  >:
                </label>
                <select
                  class="form-control"
                  id="regional"
                  name="regional"
                  v-model="convenio.regional_id"
                  v-validate="{ required: true }"
                >
                  <option value="" selected disabled>
                    Seleccione la regional
                  </option>
                  <option
                    v-for="(listaR, index) in lista_regionales"
                    :key="index"
                    :value="listaR.id_regional"
                  >
                    {{ listaR.regional }}
                  </option>
                </select>
                <!-- v-validate="{ required }" -->
                <small
                  v-show="errors.has('regional')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("regional") }}
                </small>
              </div>
              <br />
              <div>
                <label class="mt-2 font-weight-bold">
                  Departamento
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
                  <select
                    v-model="departamento_actual"
                    name="departamento"
                    id="departamento"
                    v-validate="{ required: true }"
                    class="form-control mb-3"
                    @change="obtenerMunicipio(departamento_actual)"
                  >
                    <option value="" selected disabled>
                      Seleccione el departamento
                    </option>
                    <option
                      v-for="(departamento, index) in lista_departamentos"
                      :value="departamento.id_departamento"
                      :key="index"
                    >
                      {{ departamento.departamento }}
                    </option>
                  </select>
                </div>
                <small
                  v-show="errors.has('departamento')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("departamento") }}
                </small>
              </div>
              <!-- fin de departamento -->
              <!-- aqui seleciona el municipio -->
              <div v-if="departamento_actual != null">
                <label class="mt-2 font-weight-bold">
                  Municipio
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
                  <select
                    v-validate="{ required: true }"
                    name="Municipio"
                    id="Municipio"
                    class="form-control mb-3"
                    v-model="convenio.municipio_id"
                    @change="obtenerCentroFormacion(), obtenerColegios()"
                  >
                    <option value="" selected disabled>
                      Seleccione el municipio
                    </option>
                    <template v-for="(municipio, index) in lista_municipios">
                      <option :value="municipio.id_municipio" :key="index">
                        {{ municipio.municipio }}
                      </option>
                    </template>
                  </select>
                </div>
                <small
                  v-show="errors.has('Municipio')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("Municipio") }}
                </small>
              </div>
              <div v-if="convenio.municipio_id != ''">
                <label class="mt-2 font-weight-bold">
                  Centro Formación
                  <span
                    class="text-danger font-weigth-bold"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                    >*</span
                  >:
                </label>
                <select
                  class="form-control"
                  id="centroFormacion"
                  name="centroFormacion"
                  v-model="convenio.centro_formacion_id"
                  v-validate="{ required: true }"
                >
                  <option value="" selected disabled>
                    Seleccione el centro formación
                  </option>
                  <option
                    v-for="(centro, index) in listaCentroFormacion"
                    :key="index"
                    :value="centro.id_centro_formacion"
                  >
                    {{ centro.centro_formacion }}
                  </option>
                </select>
                <small
                  v-show="errors.has('centroFormacion')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("centroFormacion") }}
                </small>
              </div>
              <!-- <div id="multiselect">
                <label class="mt-2 font-weight-bold">
                  Colegio
                  <span
                    class="text-danger font-weigth-bold"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                    >*</span
                  >:
                </label>
                <template>
                  <div>
                    <multiselect
                      v-model="colegioEscogido"
                      placeholder="Seleccione el colegio"
                      selectLabel="Seleccionar"
                      selectedLabel="Seleccionado"
                      deselectLabel="Borrar de la lista"
                      label="colegio"
                      track-by="id_colegio"
                      :options="listaColegios"
                      :multiple="true"
                      :taggable="true"
                      @tag="addTag"
                    ></multiselect>
                    <pre
                      class="language-json"
                    ><code>{{ listaColegios }}</code></pre>
                  </div>
                </template>
                <small
                  v-show="errors.has('RegistrarColegio')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("RegistrarColegio") }}
                </small>
              </div> -->
              <!-- <br /> -->
              <!-- espacio sena persona -->
              <div>
                <!-- inicio -->
                <label class="mt-2 font-weight-bold">
                  Sena Persona
                  <span
                    class="text-danger font-weigth-bold"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                    >*</span
                  >:
                </label>
                <!-- modal para buscar el id de la persona sena -->
                <div class="input-group" @click="modalSenaPersona = true">
                  <input
                    type="text"
                    name="infoSenaPersona"
                    id="infoSenaPersona"
                    class="form-control"
                    v-model="infoSenaPersona"
                    placeholder="Buscar Sena Persona"
                    :disabled="true"
                    v-validate="{ required: true }"
                  />
                </div>
                <small
                  v-show="errors.has('infoSenaPersona')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("infoSenaPersona") }}
                </small>
                <!-- modal -->
                <div class="container" id="modal">
                  <modal
                    :show.sync="modalSenaPersona"
                    body-classes="p-0"
                    modal-classes="justify-content-center modal-dialog-centered modal-sm-12"
                  >
                    <template slot="header">
                      <h2
                        class="text-azul-sena modal-title"
                        id="modalBuscarInstructor"
                      >
                        Buscar Sena Persona
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
                        <!-- formulario de busqueda de instructor -->
                        <div>
                          <label class="mt-2 font-weight-bold">
                            Sena persona
                            <span
                              class="text-danger font-weigth-bold"
                              tooltip="Campo Requerido"
                              tooltip-flow="top"
                              >*</span
                            >:
                          </label>
                          <div class="input-group">
                            <input
                              type="number"
                              name="identificacionSenaPersona"
                              class="form-control"
                              id="identificacionSenaPersona"
                              placeholder="Buscar por cédula"
                              v-model="convenio.sena_persona_id"
                              v-validate="{ min_value: 9999999 }"
                            />
                          </div>
                          <small
                            v-show="errors.has('identificacionSenaPersona')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("identificacionSenaPersona") }}
                          </small>
                        </div>

                        <button
                          class="
                            btn btn-azul-sena
                            col-12 col-md-12 col-lg-12
                            mt-2
                          "
                          @click="buscarUsuario()"
                        >
                          Buscar Sena Persona
                        </button>
                      </div>
                    </card>
                  </modal>
                </div>
                <!-- fin modal -->
              </div>
              <!-- fin -->
              <br />
              <div>
                <label class="mt-2 font-weight-bold">
                  Número Del Convenio
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
                    name="numero_convenio"
                    id="numero_convenio"
                    class="form-control"
                    v-model="convenio.numero_convenio"
                    placeholder="Número de convenio"
                    v-validate="{ required: true }"
                  />
                </div>
                <small
                  v-show="errors.has('numero_convenio')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("numero_convenio") }}
                </small>
              </div>
              <br />
              <!-- Fecha de inicio -->
              <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <label class="mt-2 font-weight-bold"
                    >Fecha Firma<span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="date"
                      class="form-control"
                      name="fecha_firma"
                      v-model="convenio.fecha_firma"
                      id="fecha_firma"
                      max="2021-12-31"
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_firma')"
                      class="text-danger"
                    >
                      {{ errors.first("fecha_firma") }}
                    </small>
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <label class="mt-2 font-weight-bold"
                    >Fecha De Inicio<span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="date"
                      class="form-control"
                      v-model="convenio.fecha_inicio"
                      name="fecha_inicio"
                      id="fecha_inicio"
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_inicio')"
                      class="text-danger"
                    >
                      {{ errors.first("fecha_inicio") }}
                    </small>
                  </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                  <label class="mt-2 font-weight-bold"
                    >Fecha Cargo <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="date"
                      class="form-control"
                      v-model="convenio.fecha_final"
                      name="fecha_final"
                      id="fecha_final"
                      max="2021-12-31"
                      v-validate="{ required: true }"
                    />
                    <small
                      v-show="errors.has('fecha_final')"
                      class="text-danger"
                    >
                      {{ errors.first("fecha_final") }}
                    </small>
                  </div>
                </div>
              </div>
              <br />
              <div>
                <label class="mt-2 font-weight-bold">
                  Sena Cargo
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
                    name="sena_cargo"
                    id="sena_cargo"
                    class="form-control"
                    v-model="convenio.sena_cargo"
                    placeholder="Nombre sena cargo"
                    v-validate="{ required: true }"
                  />
                </div>
                <small
                  v-show="errors.has('sena_cargo')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("sena_cargo") }}
                </small>
              </div>
              <br />
              <div>
                <label class="mt-2 font-weight-bold">
                  Colegio Cargo
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
                    name="colegio_cargo"
                    id="colegio_cargo"
                    class="form-control"
                    v-model="convenio.colegio_cargo"
                    placeholder="Nombre de colegio cargo"
                    v-validate="{ required: true }"
                  />
                </div>
                <small
                  v-show="errors.has('colegio_cargo')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("colegio_cargo") }}
                </small>
              </div>
              <!-- adjunto -->
              <br />
              <!-- certificado -->
              <div id="campo">
                <label class="mt-2 font-weight-bold"> Minuta </label
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
                    <span>minuta</span>
                  </label>
                </div>
                <small v-show="errors.has('minuta')" class="text-danger">
                  {{ errors.first("minuta") }}
                </small>
                <!--<div>
                  <div id="campo" v-if="convenio.minuta != null">
                    Documento seleccionado :
                    {{ convenio.minuta.name }}
                  </div>
                </div> -->
              </div>
              <br />
            </div>

            <!-- Fin Forms -->
          </div>
           <div class="text-center card-footer"  v-if="estadoPeticionRegistrar">
        <AnimacionCargando></AnimacionCargando>
      </div>
          <div class="card-footer"  v-if="!estadoPeticionRegistrar" >
            <div class="row justify-content-center">
              <div class="col-lg-4 col-sm-12 mt-1">
                <base-button
                  type="azul-sena"
                  @click="registrarConvenio()"
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

        <!-- Fin Contenido -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    Multiselect,
    AnimacionCargando
  },
})
export default class Idioma extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  listaColegios: any[] = [];
  lista_regionales: any[] = [];
  listaCentroFormacion: any[] = [];

  docValido = false;
  estadoPeticionRegistrar = false;

  modalBuscarColegio = false;
  lista_municipios = null;
  departamento_actual = null;
  lista_departamentos: any[] = [];
 

  // Sena persona datos
  infoSenaPersona = "";
  modalSenaPersona = false;
  // identificacionSenaPersona = "";
  buscarSenaPersona;

  convenio = {
    id_convenio: null,
    convenio: "",
    regional_id: "",
    regional: "",
    centro_formacion_id: "",
    sena_persona_id: "",
    numero_convenio: "",
    fecha_firma: "",
    fecha_inicio: "",
    fecha_final: "",
    sena_cargo: "",
    colegio_cargo: "",
    minuta: null,
    municipio_id: "",
  };

  colegioConvenio = {
    id_colegio_convenio: null,
    convenio_id: "",
    colegio_id: "",
  };

  centroFormacion = {
    id_centro_formacion: "",
    municipio_id: "",
    regional_id: "",
    centro_formacion: "",
    direccion_centro_formacion: "",
    telefono_centro_formacion: "",
  };
  colegio: any[] = [];
  colegioEscogido: any[] = [];
 
  mounted() {
    this.obtenerDepartamento();
    // this.obtenerColegios();
    this.obtenerRegionalConvenio();
    // this.obtenerCentroFormacion();
  }

  //-----------------------------------------------------------
  obtenerMinuta(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.convenio.minuta = event.target.files[0];
        Swal.fire(
          "Certificación Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
        // this.docResolucon = null;
      } else {
        this.docValido = false;
        this.convenio.minuta = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.convenio.minuta = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
  //--------------------------------------------------------------------
  registrarConvenio() {

    this.estadoPeticionRegistrar = true;
    var data = new FormData();

    //Añadimos la docinscrip seleccionada
    data.append("regional_id", this.convenio.regional_id);
    data.append("convenio", this.convenio.convenio);
    data.append("centro_formacion_id", this.convenio.centro_formacion_id);
    data.append("sena_persona_id", this.convenio.sena_persona_id);
    data.append("numero_convenio", this.convenio.numero_convenio);
    data.append("fecha_firma", this.convenio.fecha_firma);
    data.append("fecha_inicio", this.convenio.fecha_inicio);
    data.append("fecha_final", this.convenio.fecha_final);
    data.append("colegio_cargo", this.convenio.colegio_cargo);
    data.append("sena_cargo", this.convenio.sena_cargo);
    data.append("minuta", this.convenio.minuta);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    Axios()
      .post("almacenar_convenio", data, {
        headers: headers,
      })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          // this.modalBuscarColegio = false;
          Swal.fire({
            title: "Convenio Guardado",
            text: "Se guardo el convenio",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          // this.registrarColegios(respuesta.data.results.id_convenio);
          this.$router.push({ name: "GestionarConvenio" });
        } else {
          Swal.fire("ERROR!", "No se Guardo El convenio", "error");
        }
        // this.estadoPeticion = false;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      })
    .finally(() => {
        this.estadoPeticionRegistrar = false;
      });
    
  }
 

  obtenerMunicipio(id) {
    Axios()
      .get("listar_municipios/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_municipios = respuesta.data.results.municipios;
        } else {
          Swal.fire({
            title: respuesta.data.message,
          });
        }
      });
  }

  obtenerDepartamento() {
    Axios()
      .get("listar_departamentos/57")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_departamentos = respuesta.data.results;
        } else {
          Swal.fire({
            title: respuesta.data.message,
          });
        }
      });
  }

  obtenerColegios() {
    Axios()
      .get("listar_colegios_municipios/" + this.convenio.municipio_id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaColegios = respuesta.data.results;
        } else {
          Swal.fire({
            title: respuesta.data.message,
          });
        }
      });
  }

  addTag(newTag) {
    const tag = {
      colegio: newTag,
      municipio_id: "",
      municipio: "",
      id_colegio: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
    };
    this.listaColegios.push(tag);
    this.colegioEscogido.push(tag);
  }

  registrarColegios(id_convenio) {
    for (let lista of this.colegioEscogido) {
      Axios()
        .post("almacenar_convenio_colegio", {
          colegio_id: lista.id_colegio,
          convenio_id: id_convenio,
        })
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
          } else {
          }
        });
    }
  }

  obtenerRegionalConvenio() {
    Axios()
      .get("listar_regional_convenio")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_regionales = respuesta.data.results;
        }
      });
  }
  buscarUsuario() {
    Axios()
      .post("buscar_usuario", {
        identificacion: this.convenio.sena_persona_id,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.buscarSenaPersona = respuesta.data.results;
          this.infoSenaPersona =
            this.buscarSenaPersona.primer_nombre +
            " " +
            this.buscarSenaPersona.segundo_nombre +
            " " +
            this.buscarSenaPersona.primer_apellido +
            " " +
            this.buscarSenaPersona.segundo_apellido +
            " - " +
            this.buscarSenaPersona.identificacion;
          this.modalSenaPersona = false;
          Swal.fire({
            title: "Sena Persona encontrada",
            text:
              this.buscarSenaPersona.primer_nombre +
              " " +
              this.buscarSenaPersona.segundo_nombre +
              " " +
              this.buscarSenaPersona.primer_apellido +
              " " +
              this.buscarSenaPersona.segundo_apellido,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });
        } else {
          Swal.fire({
            title: "Sena Persona no existe",
            text: "Ingrese una identificación correcta",
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
      });
  }
  obtenerCentroFormacion() {
    Axios()
      .get("listar_centro_formacion/" + this.convenio.municipio_id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaCentroFormacion = respuesta.data.results;
        } else {
        }
      });
  }
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

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.registrarConvenio();
      }
    });
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

.texto {
  text-align: center !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
