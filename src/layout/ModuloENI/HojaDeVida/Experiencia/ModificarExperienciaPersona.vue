<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR MI EXPERIENCIA</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Mi Experiencia -->
                <div class="card-body">
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <div>
                      <label class="mt-2 font-weight-bold">Empresa</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="Nombre_Empresa"
                          class="form-control"
                          id="Nombre_Empresa"
                          placeholder="Nombre De la Empresa"
                          v-model="experienciaPersona.empresa"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('Nombre_Empresa')"
                        class="text-danger"
                      >
                        {{ errors.first("Nombre_Empresa") }}
                      </small>
                    </div>
                    <div>
                      <label class="mt-2 font-weight-bold"> Dirección </label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="Direccion_Empresa"
                          class="form-control"
                          id="Direccion_Empresa"
                          placeholder="Dirección De la Empresa"
                          v-model="experienciaPersona.direccion_empresa"
                          v-validate="{ required }"
                        />
                      </div>
                    </div>
                    <small
                      v-show="errors.has('Direccion_Empresa')"
                      class="text-danger"
                    >
                      {{ errors.first("Direccion_Empresa") }}
                    </small>

                    <!-- grupo empresa -->
                    <div class="form-group">
                      <label class="mt-2 font-weight-bold"
                        >Tipo De Empresa<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <select
                        class="form-control"
                        id="tipo_empresas"
                        name="tipo_empresa"
                        v-model="experienciaPersona.id_tipo_empresa"
                        v-validate="{ required }"
                      >
                        <!-- <option :value="experienciaPersona.tipo_empresa_id">
                              {{experienciaPersona.tipo_empresa}}
                            </option> -->
                        <option
                          v-for="(tipoE, index) in lista_tipos_empresa"
                          :key="index"
                          :value="tipoE.id_tipo_empresa"
                        >
                          {{ tipoE.tipo_empresa }}
                        </option>
                      </select>
                    </div>
                    <small
                      v-show="errors.has('tipo_empresa')"
                      class="text-danger"
                    >
                      {{ errors.first("tipo_empresa") }}
                    </small>

                    <!-- grupo contrato -->
                    <div class="form-group">
                      <label class="mt-2 font-weight-bold"
                        >Tipo De Contrato<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <select
                        class="form-control"
                        id="tipo_contratos"
                        name="tipo_contrato"
                        v-model="experienciaPersona.tipo_contrato"
                        v-validate="{ required }"
                      >
                        <option value="" selected disabled>
                          Seleccione el Tipo de Contrato
                        </option>
                        <option :value="'D'">Definido</option>
                        <option :value="'I'">Indefinido</option>
                      </select>
                    </div>
                    <small
                      v-show="errors.has('tipo_contrato')"
                      class="text-danger"
                    >
                      {{ errors.first("tipo_contrato") }}
                    </small>

                    <div>
                      <label class="mt-2 font-weight-bold">
                        Correo De La Entidad </label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="email"
                          name="correo_Empresa"
                          class="form-control"
                          id="correo_Empresa"
                          placeholder="Correo De la Entidad"
                          v-model="experienciaPersona.correo_empresa"
                          v-validate="{ required }"
                        />
                      </div>
                    </div>
                    <small
                      v-show="errors.has('correo_Empresa')"
                      class="text-danger"
                    >
                      {{ errors.first("correo_Empresa") }}
                    </small>
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Salario Devengado </label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="number"
                          name="Salario_Devengado"
                          class="form-control"
                          id="Salario_Devengado"
                          placeholder="Salario Devengado"
                          v-model="experienciaPersona.salario"
                          v-validate="{ required, min_value: 0 }"
                        />
                      </div>
                    </div>
                    <small
                      v-show="errors.has('Salario_Devengado')"
                      class="text-danger"
                    >
                      {{ errors.first("Salario_Devengado") }}
                    </small>
                    <!-- fechas2 -->
                    <div class="row">
                      <div id="campo" class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <label class="mt-2 font-weight-bold"
                            >Fecha Inicio
                            <span class="text-danger">*</span>:</label
                          >
                          <!-- fecha campo -->
                          <input
                            type="date"
                            class="form-control"
                            name="fecha_ingreso"
                            id="fecha_ingreso"
                            v-model="experienciaPersona.fecha_ingreso_empresa"
                            v-validate="'required'"
                          />
                          <small
                            v-show="errors.has('fecha_ingreso')"
                            class="text-danger"
                          >
                            {{ errors.first("fecha_ingreso") }}
                          </small>
                        </div>
                      </div>

                      <div id="campo" class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <label class="mt-2 font-weight-bold"
                            >Fecha Fin
                            <span class="text-danger">*</span>:</label
                          >
                          <!-- fecha campo -->
                          <input
                            type="date"
                            class="form-control"
                            name="fecha_retiro"
                            id="fecha_retiro"
                            :min="experienciaPersona.fecha_ingreso_empresa"
                            v-model="experienciaPersona.fecha_retiro_empresa"
                            v-validate="'required'"
                          />
                          <small
                            v-show="errors.has('fecha_retiro')"
                            class="text-danger"
                          >
                            {{ errors.first("fecha_retiro") }}
                          </small>
                        </div>
                      </div>
                    </div>

                    <!-- fechas -->

                    <div>
                      <label class="mt-2 font-weight-bold">
                        Cargo Desempeñado</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="Cargo_Desempeñado"
                          class="form-control"
                          id="Cargo_Desempeñado"
                          placeholder="Cargo Que Desempeña"
                          v-model="experienciaPersona.cargo"
                          v-validate="{ required }"
                        />
                      </div>
                    </div>
                    <small
                      v-show="errors.has('Cargo_Desempeñado')"
                      class="text-danger"
                    >
                      {{ errors.first("Cargo_Desempeñado") }}
                    </small>
                    <div>
                      <label class="mt-2 font-weight-bold"> Area</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="Area"
                          class="form-control"
                          id="Area"
                          placeholder="Cargo Que Desempeña"
                          v-model="experienciaPersona.area"
                          v-validate="{ required }"
                        />
                      </div>
                    </div>
                    <small v-show="errors.has('Area')" class="text-danger">
                      {{ errors.first("Area") }}
                    </small>

                    <!-- Falta los paises -->

                    <!-- aqui seleciona el departamento  -->
                    <div class="row">
                      <div class="form-group col-sm-12 col-md-6 col-lg-6">
                        <label for="Departamento" class="mt-2 font-weight-bold"
                          >Departamento<span class="text-danger">*</span></label
                        >
                        <select
                          class="form-control"
                          id="departamentos"
                          v-model="experienciaPersona.id_departamento"
                          @change="
                            obtenerMunicipios(
                              experienciaPersona.id_departamento
                            )
                          "
                        >
                          <option :value="experienciaPersona.id_departamento">
                            {{ experienciaPersona.departamento }}
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
                          >Municipio<span class="text-danger">*</span></label
                        >
                        <select
                          class="form-control"
                          name="municipios"
                          id="municipios"
                          v-model="experienciaPersona.municipio_id"
                        >
                          <option :value="experienciaPersona.municipio_id">
                            {{ experienciaPersona.municipio }}
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
                      <label class="mt-2 font-weight-bold">
                        Jefe Inmediato</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="Jefe_Inmediato"
                          class="form-control"
                          id="Jefe_Inmediato"
                          placeholder="Nombre Del Jefe"
                          v-model="experienciaPersona.jefe_inmediato"
                          v-validate="{ required }"
                        />
                      </div>
                    </div>
                    <small
                      v-show="errors.has('Jefe_Inmediato')"
                      class="text-danger"
                    >
                      {{ errors.first("Jefe_Inmediato") }}
                    </small>
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Cargo Del Jefe Inmediato</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="Cargo_Jefe_Inmediato"
                          class="form-control"
                          id="Cargo_Jefe_Inmediato"
                          placeholder="Cargo Del Jefe"
                          v-model="experienciaPersona.cargo_jefe"
                          v-validate="{ required }"
                        />
                      </div>
                    </div>
                    <small
                      v-show="errors.has('Cargo_Jefe_Inmediato')"
                      class="text-danger"
                    >
                      {{ errors.first("Cargo_Jefe_Inmediato") }}
                    </small>
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Actividad Empresa</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="Actividad_Empresa"
                          class="form-control"
                          id="Actividad_Empresa"
                          placeholder="Actividad De La Empresa"
                          v-model="experienciaPersona.actividad_empresa"
                          v-validate="{ required }"
                        />
                      </div>
                    </div>
                    <small
                      v-show="errors.has('Actividad_Empresa')"
                      class="text-danger"
                    >
                      {{ errors.first("Actividad_Empresa") }}
                    </small>

                    <div>
                      <label class="mt-2 font-weight-bold"
                        >Funciones<span class="text-danger">*</span>:</label
                      >
                      <div>
                        <div class="d-flex">
                          <input
                            type="text"
                            placeholder="Función"
                            class="form-control mr-2"
                            v-model="funcion"
                          />
                          <button
                            class="
                              btn btn-sm btn-azul-sena
                              text-white
                              d-flex
                              align-items-center
                              px-3
                            "
                            :disabled="funcion == ''"
                            @click="agregarEliminarFunciones('agregar')"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div
                        class="col-12 table-responsive mt-3"
                        v-if="lista_funciones.length > 0"
                      >
                        <table class="table" id="listado">
                          <thead class="bg-gradient-naranja-sena text-white">
                            <tr>
                              <th class="w-100">Funciones</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(funcion, index) in lista_funciones"
                              :key="index"
                            >
                              <td>{{ funcion }}</td>
                              <td>
                                <a
                                  class="btn btn-sm btn-azul-sena text-white"
                                  @click="
                                    agregarEliminarFunciones('eliminar', index)
                                  "
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                        tooltip="Ver Certificado"
                        tooltip-flow="top"
                        type="azul-sena"
                        @click="mirarModal()"
                        class="btn btn-sm bg-azul-sena text-white space"
                        ><i class="fas fa-eye"></i
                      ></base-button>
                    </div>
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

                <!-- Requeridos desde desarrollador de software -->
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
export default class ExperienciaPersonal extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  lista_departamentos = null;
  lista_municipios = null;
  departamentoActual = null;
  departamentoResidencia = null;
  departamentoNacimiento = null;
  lista_funciones: any[] = [];
  funcion = "";
  lista_tipos_empresa = null;

  docValido = false;
  estadoPeticion = false;
  rutadocumento = null;
  verModal = false;
  docResolucon = "";
  docVista = null;

  experienciaPersona = {
    id_experiencia: "",

    municipio_id: "",
    persona_id: "",
    tipo_empresa_id: "",
    tipo_contrato: "",

    empresa: "",
    direccion_empresa: "",
    correo_empresa: "",
    salario: "",
    fecha_ingreso_empresa: "",
    fecha_retiro_empresa: "",
    cargo: "",
    area: "",
    jefe_inmediato: "",
    cargo_jefe: "",
    funciones: "",
    actividad_empresa: "",
    certificado: "",

    //No
    tipo_empresa: "",
    municipio: "",
    departamento: "",
    id_departamento: "",
    pais: "",
    id_pais: "",
  };

  mounted() {
    this.obtenerExperienciaPersona(this.$route.params.id);
    this.obtenerDepartamentos();
    this.obtenerPaises();
    this.obtenerTiposEmpresa();
    this.mostrarDocumento(this.experienciaPersona.id_experiencia);
  }

  // paises,departamentos y municipios datos personales #1

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

  obtenerDepartamentos() {
    Axios()
      .get("listar_departamentos/57")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_departamentos = respuesta.data.results;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Hubo un problema en el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }
  //-----------------------------------------------------------

  obtenerMunicipios(iddepa) {
    Axios()
      .get("listar_municipios/" + iddepa)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_municipios = respuesta.data.results.municipios;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Hubo un problema en el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }
  //-----------------------------------------------------------

  obtenerPaises() {
    Axios()
      .get("/listar_paises")
      .then((respu) => {})
      .catch((err) => {
        Swal.fire({
          title: "Hubo un problema en el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }
  //-----------------------------------------------------------
  agregarEliminarFunciones(tipo, pos?) {
    if (tipo == "agregar") {
      this.lista_funciones.push(this.funcion);
      this.funcion = "";
    } else {
      this.lista_funciones.splice(pos, 1);
    }
  }
  //-----------------------------------------------------------

  obtenerTiposEmpresa() {
    Axios()
      .get("crear_experiencia_persona")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_tipos_empresa = respuesta.data.results.tiposEmpresa;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Hubo un problema en el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }
  //-----------------------------------------------------------

  obtenerExperienciaPersona(id) {
    Axios()
      .get("ver_detalle_experiencia_persona/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.experienciaPersona = respuesta.data.results;
          this.lista_funciones = this.experienciaPersona.funciones.split(",");
          this.lista_funciones.splice(this.lista_funciones.length - 1, 1);
          this.mostrarDocumento(id);
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Hubo un problema en el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "#238276",
          },
        });
      });
  }
  //-----------------------------------------------------------

  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.experienciaPersona.certificado = event.target.files[0];
        Swal.fire(
          "Certificación Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
      } else {
        this.docValido = false;
        this.experienciaPersona.certificado = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.experienciaPersona.certificado = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }
  //-----------------------------------------------------------
  mostrarDocumento(id_experiencia) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/ver_certificado_experiencia_persona/" +
      id_experiencia;
  }
  //-----------------------------------------------------------

  modificarExperienciaPersona(id) {
    this.experienciaPersona.persona_id = id;
    for (const perfil of this.lista_funciones) {
      this.experienciaPersona.funciones =
        this.experienciaPersona.funciones + perfil + ",";
    }
    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("municipio_id", this.experienciaPersona.municipio_id);
    data.append("persona_id", this.experienciaPersona.persona_id);
    data.append("tipo_empresa_id", this.experienciaPersona.tipo_empresa_id);
    data.append("tipo_contrato", this.experienciaPersona.tipo_contrato);
    data.append("empresa", this.experienciaPersona.empresa);
    data.append("direccion_empresa", this.experienciaPersona.direccion_empresa);
    data.append("correo_empresa", this.experienciaPersona.correo_empresa);
    data.append("salario", this.experienciaPersona.salario);
    data.append(
      "fecha_ingreso_empresa",
      this.experienciaPersona.fecha_ingreso_empresa
    );
    data.append(
      "fecha_retiro_empresa",
      this.experienciaPersona.fecha_retiro_empresa
    );
    data.append("cargo", this.experienciaPersona.cargo);
    data.append("area", this.experienciaPersona.area);
    data.append("jefe_inmediato", this.experienciaPersona.jefe_inmediato);
    data.append("cargo_jefe", this.experienciaPersona.cargo_jefe);
    data.append("funciones", this.experienciaPersona.funciones);
    data.append("actividad_empresa", this.experienciaPersona.actividad_empresa);
    data.append("certificado", this.experienciaPersona.certificado);

    Axios()
      .put(
        "modificar_experiencia_persona/" +
          this.experienciaPersona.id_experiencia,
        data,
        {
          headers: headers,
        }
      )
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire(
            "Se subió la Experiencia!",
            "Experiencia Laboral Modificada",
            respuesta.data.status
          );
        } else {
          Swal.fire(
            "ERROR!",
            "No se Modifico La Expereiencia Laboral",
            "error"
          );
        }
        this.estadoPeticion = false;
        this.$router.push({ name: "GestionarHojaDeVidaENI" });
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
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
        min_value: () => "El valor no puede ser menor a cero",
        email: () => "El correo no es válido",
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }
  //-----------------------------------------------------------

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid && this.lista_funciones.length != 0) {
        // this.modificarExperienciaPersona();
        this.modificarExperienciaPersona(this.$route.params.id);
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
</style>
