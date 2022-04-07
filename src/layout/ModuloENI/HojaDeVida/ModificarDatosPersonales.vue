<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR MIS DATOS</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Mis Datos -->

                <span slot="title">Mis Datos Personales</span>
                <div class="card-body">
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <div class="row">
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold">
                          Primer Nombre </label
                        ><span
                          class="text-danger"
                          tooltip="Campo Requerido" tooltip-flow="top"
                          >*</span
                        >:
                        <div>
                          <input
                            type="text"
                            name="Primer_Nombre"
                            class="form-control"
                            id="Primer_Nombre"
                            placeholder="Primer Nombre"
                            v-model="datosPersonales.primer_nombre"
                          />
                        </div>
                      </div>
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold">
                          Segundo Nombre
                        </label>
                        <input
                          type="text"
                          name="Segundo_Nombre"
                          class="form-control"
                          id="Segundo_Nombre"
                          placeholder="Segundo Nombre"
                          v-model="datosPersonales.segundo_nombre"
                        />
                        <span
                          class="text-danger"
                          tooltip="Campo Requerido" tooltip-flow="top"
                        ></span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold">
                          Primer Apellido </label
                        ><span
                          class="text-danger"
                          tooltip="Campo Requerido" tooltip-flow="top"
                          >*</span
                        >:
                        <div>
                          <input
                            type="text"
                            name="Primer_Apellido"
                            class="form-control"
                            id="Primer_Apellido"
                            placeholder="Primer Apellido"
                            v-model="datosPersonales.primer_apellido"
                          />
                        </div>
                      </div>
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label class="mt-2 font-weight-bold">
                          Segundo Apellido </label
                        ><span
                          class="text-danger"
                          tooltip="Campo Requerido" tooltip-flow="top"
                        ></span
                        >:
                        <div>
                          <input
                            type="text"
                            name="Segundo_Apellido"
                            class="form-control"
                            id="Segundo_Apellido"
                            placeholder="Segundo Apellido"
                            v-model="datosPersonales.segundo_apellido"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label class="mt-2 font-weight-bold"
                        >Fecha Expedición Del Documento<span class="text-danger"
                          >*</span
                        >:</label
                      >
                      <div>
                        <input
                          type="date"
                          class="form-control"
                          name="Fecha_Expedicion"
                          id="Fecha_Expedicion"
                          v-model="datosPersonales.fecha_identificacion"
                        />
                      </div>
                    </div>

                    <div>
                      <label class="mt-2 font-weight-bold">
                        Número De Cédula </label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido" tooltip-flow="top"
                        >*</span
                      >:
                      <div>
                        <input
                          type="text"
                          name="Numero_Cedula"
                          class="form-control"
                          id="Numero_Cedula"
                          placeholder="Numero De Cedula"
                          v-model="datosPersonales.identificacion"
                        />
                      </div>
                    </div>
                    <!-- aqui seleciona el lugar de expedicion del documento -->
                    <div></div>
                    <!-- fin de expedicion -->
                    <!-- aqui seleciona el departamento #1-->
                    <div class="row">
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Departamento" class="mt-2 font-weight-bold"
                          >Departamento expedición<span class="text-danger"
                            >*</span
                          >:</label
                        >
                        <select
                          class="form-control"
                          id="departamentos"
                          v-model="datosPersonales.id_depto_expedicion"
                          @change="
                            obtenerMunicipios(
                              datosPersonales.id_depto_expedicion
                            )
                          "
                        >
                          <option :value="datosPersonales.id_depto_expedicion">
                            {{ datosPersonales.depto_expedicion }}
                          </option>
                          <option
                            v-for="(departamento, index) in lista_departamentos"
                            :key="index"
                            :value="departamento.id_departamento"
                          >
                            {{ departamento.departamento }}
                          </option>
                        </select>
                      </div>
                      <!-- fin de departamento -->
                      <!-- aqui seleciona el municipio -->
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Nacionalidad" class="mt-2 font-weight-bold"
                          >Municipio expedición<span class="text-danger">*</span
                          >:</label
                        >
                        <select
                          class="form-control"
                          id="municipios"
                          v-model="datosPersonales.id_municipio_expedicion"
                        >
                          <option
                            :value="datosPersonales.id_municipio_expedicion"
                          >
                            {{ datosPersonales.municipio_expedicion }}
                          </option>
                          <option
                            v-for="(municipio, index) in lista_municipios"
                            :key="index"
                            :value="municipio.id_municipio"
                          >
                            {{ municipio.municipio }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <!-- fin de municipio -->

                    <!-- aqui va la localidad -->
                    <div>
                      <label for="Localidad" class="mt-2 font-weight-bold"
                        >Localidad<span class="text-danger">*</span></label
                      >
                      <select class="form-control" id="Localidad">
                        <option>Rural</option>
                        <option>Urbano</option>
                      </select>
                    </div>
                    <!-- fin localidad -->
                    <div class="row">
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Nacionalidad" class="mt-2 font-weight-bold"
                          >Nacionalidad<span class="text-danger">*</span></label
                        >
                        <select class="form-control" id="Nacionalidad">
                          <option>Colombiano</option>
                          <option>Mexicano</option>
                          <option>Alemán</option>
                        </select>
                      </div>
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Genero" class="mt-2 font-weight-bold"
                          >Género<span class="text-danger">*</span></label
                        >
                        <select
                          class="form-control"
                          id="Genero"
                          v-model="datosPersonales.id_genero"
                        >
                          <option value="" selected disabled>
                            Seleccione Su Genero
                          </option>
                          <option :value="'M'">Masculino</option>
                          <option :value="'F'">Femenino</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label class="mt-2 font-weight-bold"
                        >Fecha De Nacimiento<span class="text-danger">*</span
                        >:</label
                      >
                      <div>
                        <input
                          type="date"
                          class="form-control"
                          name="Fecha_Nac"
                          id="Fecha_Nac"
                          v-model="datosPersonales.fecha_nacimiento"
                        />
                      </div>
                    </div>
                    <!-- Pais de nacimiento -->
                    <!-- <div>
                      <label class="mt-2 font-weight-bold">
                        País De Nacimiento</label
                      ><span
                        class="text-danger font-weigth-bold"
                        v-b-tooltip.hover.top
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div>
                        <input
                          type="text"
                          name="PaisNac"
                          class="form-control"
                          id="PaisNac"
                          placeholder="Pais De Nacimiento"
                        />
                      </div>
                    </div> -->
                    <!-- fin de pais de nacimiento -->
                    <!-- aqui seleciona el departamento #2-->
                    <div class="row">
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Departamento" class="mt-2 font-weight-bold"
                          >Departamento De Nacimiento<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <select
                          class="form-control"
                          id="departamentos"
                          v-model="datosPersonales.id_depto_nacimiento"
                          @change="obtenerMunicipios(datosPersonales.id_depto_nacimiento)"
                        >
                          <option :value="datosPersonales.id_depto_nacimiento">
                            {{ datosPersonales.depto_nacimiento }}
                          </option>
                          <option
                            v-for="(departamento, index) in lista_departamentos"
                            :key="index"
                            :value="departamento.id_departamento"
                          >
                            {{ departamento.departamento }}
                          </option>
                        </select>
                      </div>
                      <!-- fin de departamento -->
                      <!-- aqui seleciona el municipio -->
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Nacionalidad" class="mt-2 font-weight-bold"
                          >Municipio De Nacimiento
                          <span class="text-danger">*</span></label
                        >

                        <select
                          class="form-control"
                          id="municipios"
                          v-model="datosPersonales.id_municipio_nacimiento"
                        >
                          <option
                            :value="datosPersonales.id_municipio_nacimiento"
                          >
                            {{ datosPersonales.municipio_nacimiento }}
                          </option>
                          <option
                            v-for="(municipio, index) in lista_municipios"
                            :key="index"
                            :value="municipio.id_municipio"
                          >
                            {{ municipio.municipio }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <!-- fin de municipio -->

                    <!-- aqui va el pais de residencia -->
                    <!-- <div>
                      <label class="mt-2 font-weight-bold">
                        País De Residencia</label
                      ><span
                        class="text-danger font-weigth-bold"
                        v-b-tooltip.hover.top
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div>
                        <input
                          type="text"
                          name="PaisResidencia"
                          class="form-control"
                          id="PaisResidencia"
                          placeholder="Pais De Nacimiento"
                        />
                      </div>
                    </div> -->
                    <!-- fin residencia -->

                    <!-- aqui seleciona el departamento de residencia -->
                    <div class="row">
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Departamento" class="mt-2 font-weight-bold"
                          >Departamento De Residencia<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <select
                          class="form-control"
                          id="departamentos"
                          v-model="datosPersonales.id_depto_residencia"
                          @change="obtenerMunicipios(datosPersonales.id_depto_residencia)"
                        >
                          <option :value="datosPersonales.id_depto_residencia">
                            {{ datosPersonales.depto_residencia }}
                          </option>
                          <option
                            v-for="(departamento, index) in lista_departamentos"
                            :key="index"
                            :value="departamento.id_departamento"
                          >
                            {{ departamento.departamento }}
                          </option>
                        </select>
                      </div>
                      <!-- fin de departamento -->
                      <!-- aqui seleciona el municipio -->
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Nacionalidad" class="mt-2 font-weight-bold"
                          >Municipio De Residencia<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <select
                          class="form-control"
                          id="municipios"
                          v-model="datosPersonales.id_municipio_residencia"
                        >
                          <option
                            :value="datosPersonales.id_municipio_residencia"
                          >
                            {{ datosPersonales.municipio_residencia }}
                          </option>
                          <option
                            v-for="(municipio, index) in lista_municipios"
                            :key="index"
                            :value="municipio.id_municipio"
                          >
                            {{ municipio.municipio }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <!-- fin de municipio -->

                    <div>
                      <label class="mt-2 font-weight-bold"> Dirección </label
                      ><span
                        class="text-danger font-weigth-bold"
                        tooltip="Campo Requerido" tooltip-flow="top"
                        >*</span
                      >:
                      <div>
                        <input
                          type="text"
                          name="Direccion"
                          class="form-control"
                          id="Direccion"
                          placeholder="Dirección"
                          v-model="datosPersonales.direccion"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="mt-2 font-weight-bold"> E-mail SENA </label
                      ><span
                        class="text-danger font-weigth-bold"
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div>
                        <input
                          type="email"
                          name="Email_SENA"
                          class="form-control"
                          id="Email_SENA"
                          placeholder="name@example.com"
                          v-model="datosPersonales.correo"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="mt-2 font-weight-bold">
                        E-mail PERSONAL </label
                      ><span
                        class="text-danger font-weigth-bold"
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div>
                        <input
                          type="email"
                          name="Email_PERSONAL"
                          class="form-control"
                          id="Email_PERSONAL"
                          placeholder="name@example.com"
                          v-model="datosPersonales.correo_aternativo"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Teléfono Móvil </label
                      ><span
                        class="text-danger font-weigth-bold"
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div>
                        <input
                          type="text"
                          name="Telefono_Movil"
                          class="form-control"
                          id="Telefono_Movil"
                          placeholder="Numero De Telefono"
                          v-model="datosPersonales.telefono_movil"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Teléfono Fijo </label
                      ><span
                        class="text-danger font-weigth-bold"
                        title="Campo Requerido"
                      ></span
                      >:
                      <div>
                        <input
                          type="text"
                          name="Telefono"
                          class="form-control"
                          id="Telefono"
                          placeholder="Numero De Telefono"
                          v-model="datosPersonales.telefono_fijo"
                        />
                      </div>
                    </div>
                    <!-- <div>
                      <label class="mt-2 font-weight-bold">
                        Matricula Profesional </label
                      ><span
                        class="text-danger font-weigth-bold"
                        v-b-tooltip.hover.top
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div>
                        <input
                          type="text"
                          name="Matricula_Profesional"
                          class="form-control"
                          id="Matricula_Profesional"
                          placeholder="Numero De Matricula Profesional"
                        />
                      </div>
                    </div> -->
                    <div>
                      <label class="mt-2 font-weight-bold"> Discapacidad </label
                      ><span
                        class="text-danger font-weigth-bold"
                        tooltip="Campo Requerido" tooltip-flow="top"
                        >*</span
                      >:

                      <!-- Options -->
                      <div class="row">
                        <div class="col-1">
                          <!-- Option Formal -->
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              id="flexRadioDefault1"
                              type="radio"
                              name="Matricula_Profesional"
                              value="1"
                              v-model="discapacidad"
                              @click="si = null"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Si
                            </label>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-check">
                            <input
                              class="si_no no"
                              id="flexRadioDefault2"
                              type="radio"
                              name="Matricula_Profesional"
                              value="2"
                              v-model="discapacidad"
                              @click="no = null"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault2"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <!-- Fin Options -->
                    </div>
                    <div class="form-group" v-if="discapacidad == '1'">
                      <label for="Discapacidad" class="mt-2 font-weight-bold"
                        >Tipo De Discapacidad<span class="text-danger"></span
                      ></label>
                      <select
                        class="form-control"
                        id="Discapacidad"
                        v-model="datosPersonales.id_discapacidad"
                      >
                        <option selected :value="datosPersonales.id_discapacidad">
                          {{datosPersonales.discapacidad}}
                        </option>
                        <option
                          v-for="(tipoD, index) in lista_discacidades"
                          :key="index"
                          :value="tipoD.id_discapacidad"
                        >
                          {{ tipoD.discapacidad }}
                        </option>
                      </select>
                      <br>
                      <div>
                      <label class="mt-2 font-weight-bold">
                       Porcentaje de discapacidad </label
                      ><span
                        class="text-danger font-weigth-bold"
                        tooltip="Campo Requerido" tooltip-flow="top"
                        >*</span
                      >:
                      <div>
                        <input
                          type="number"
                          name="porcentajeD"
                          class="form-control"
                          id="porcentajeD"
                          placeholder="Porcentaje de discapacidad"
                          min = "0"
                          max = "100"
                          v-validate = "{min_value:0,max_value:100}"
                          v-model.number="datosPersonales.porcentaje_discapacidad"
                        />
                        <small
                            v-show="errors.has('porcentajeD')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("porcentajeD") }}
                          </small>
                      </div>
                    </div>
                    </div>
                    <div v-if="discapacidad == '2'"></div>
                    <br />
                  </div>
                </div>
                <div class="card-footer">
                  <div class="row justify-content-center">
                    <div class="col-lg-4 col-sm-12 mt-1">
                      <base-button
                        type="azul-sena"
                        @click="modificarDatosPersonales(id_persona_logeada)"
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
              </tabs>
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
export default class FormularioPersonal extends Vue {
  discapacidad = {
    tiene: "",
    noTiene: "",
  };
  lista_discacidades: any[] = [];
  lista_departamentos = null;
  lista_municipios = null;
  departamentoActual = null;
  departamentoResidencia = null;
  departamentoNacimiento = null;

  areas: any[] = [];
  picTipos: any[] = [];
  redesConocimiento: any[] = [];
  capacitacion = {
    id_pic: null,
    capacitacion: "",
    pertenece_a_red: "",
    plan_institucional_id: "",
    id_area_ruta: "",
    id_pic_tipo: "",
  };
  requisito = "";
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  datosPersonales = {
    correo: "",
    correo_aternativo: "",
    depto_expedicion: "",
    depto_nacimiento: "",
    depto_residencia: "",
    direccion: "",
    discapacidad: "",
    id_discapacidad: "",
    fecha_identificacion: "",
    fecha_nacimiento: "",
    genero: "",
    id_depto_expedicion: "",
    id_depto_nacimiento: "",
    id_depto_residencia: "",
    id_genero: "",
    id_municipio_expedicion: "",
    id_municipio_nacimiento: "",
    id_municipio_residencia: "",
    id_persona: "",
    id_tipo_identificacion: "",
    identificacion: "",
    localidad: "",
    municipio_expedicion: "",
    municipio_nacimiento: "",
    municipio_residencia: "",
    nacionalidad: "",
    pais_nacimiento: "",
    pais_residencia: "",
    porcentaje_discapacidad: "",
    primer_apellido: "",
    primer_nombre: "",
    segundo_apellido: "",
    segundo_nombre: "",
    telefono_fijo: "",
    telefono_movil: "",
  };

  mounted() {
    this.obtenerDepartamentos();
    this.obtenerPaises();
    this.obtenerDatosPersonales(this.id_persona_logeada);
    this.obtenerDiscacidades();
    // this.obtenerMunicipios(54);
  }

  obtenerDiscacidades() {
    Axios()
      .get("crear_datos_personales_persona")
      .then((respuesta) => {

        if (respuesta.data.status == "success") {
          this.lista_discacidades = respuesta.data.results.discapacidades;
        } else {
          Swal.fire({
            title: respuesta.data.message,
          });
        }
      });
  }

  // paises,departamentos y municipios datos personales #1

  obtenerDepartamentos() {
    Axios()
      .get("listar_departamentos/57")
      .then((respuesta) => {
        this.lista_departamentos = respuesta.data.results;
      })
      .catch((err) => {
        Swal.fire({
          title: "Se ha presentado un error en el servidor!",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }

  obtenerMunicipios(iddepa) {
    Axios()
      .get("listar_municipios/" + iddepa)
      .then((respuesta) => {
        this.lista_municipios = respuesta.data.results.municipios;
      })
      .catch((err) => {
        Swal.fire({
          title: "Se ha presentado un error en el servidor!",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }

  obtenerPaises() {
    Axios()
      .get("/listar_paises")
      .then((respu) => {})
      .catch((err) => {
        Swal.fire({
          title: "Se ha presentado un error en el servidor!",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }

  //-----------------------------------------------------------

  obtenerDatosPersonales(id) {
    Axios()
      .get("ver_detalle_persona/" + id)
      .then((respuesta) => {
        return respuesta;
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.datosPersonales = respuesta.data.results;
        } else {
          Swal.fire({
            title: respuesta.data.message,
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

  modificarDatosPersonales(id) {
    
    Axios()
      .put("modificar_datos_persona/" + id, this.datosPersonales)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Datos personales modificados",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.$router.push({ name: "GestionarHojaDeVidaENI" });
        } else {
          Swal.fire({
            title: "Datos personales No modificados",
            icon: "error",
            // text: respuesta.data.message.toString(),
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
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

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "El valor no puede ser menor a cero",
        max_value: () => "El valor no puede ser mayor a cien",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite números ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        // this.crearPIC();
      }
    });
  }
}
</script>

<style>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  max-width: 80%;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
}

.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  margin-right: 0.25em;
}

.iborrainputfile {
  font-size: 16px;
}

/* style 1 */

.inputfile-1 + label {
  color: #fff;
  background-color: #238276;
}

.inputfile-1:focus + label,
.inputfile-1.has-focus + label,
.inputfile-1 + label:hover {
  background-color: #20514b;
}

.ic {
  padding-right: 10px;
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

.marge {
  margin-right: 5px;
}

.no {
  margin-right: 4.8px;
}
@media (min-width: 1049px) {
  .si_no {
    margin-right: 5px;
  }
}
</style>
