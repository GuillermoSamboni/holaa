<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MI EXPERIENCIA</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Experiencia Laboral -->

                <div class="card-body">
                  <div class="text-center" v-if="!estadoPeticion">
                    <AnimacionCargando></AnimacionCargando>
                  </div>
                  <div
                    v-if="estadoPeticion"
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >
                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- nombre de la convocatoria -->
                        <div>
                          <strong>Empresa:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.empresa }}
                          </p>
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- capacitación -->
                        <div>
                          <strong> Dirección De La Empresa:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.direccion_empresa }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Correo De La Empresa:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.correo_empresa }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Salario:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.salario }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Fecha De Ingreso:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.fecha_ingreso_empresa }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Fecha De Retiro:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.fecha_retiro_empresa }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Cargo:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.cargo }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Aréa:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.area }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Tipo De Contrato:</strong>
                        </div>
                        <div
                          id="contenido"
                          v-if="experienciaPersona.tipo_contrato == D"
                        >
                          <p id="texto">Definido</p>
                        </div>

                        <div id="contenido" v-else>
                          <p id="texto">Indefinido</p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Jefe Inmediato:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.jefe_inmediato }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Cargo Jefe:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.cargo_jefe }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Funciones:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.funciones }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Actividad Empresa:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.actividad_empresa }}
                          </p>
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-8 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Tipo De Empresa:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.tipo_empresa }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Departamento:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.departamento }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>Municipio:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.municipio }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <!-- año  -->
                        <div>
                          <strong>País:</strong>
                        </div>
                        <div id="contenido">
                          <p id="texto">
                            {{ experienciaPersona.pais }}
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6 col-lg-6">
                        <div>
                          <strong>Certificado:</strong>
                        </div>
                        <base-button
                          tooltip="Ver Certificado"
                          tooltip-flow="top"
                          type="azul-sena"
                          @click="mirarModal()"
                          class="btn btn-sm bg-azul-sena text-white space"
                          ><i class="fas fa-eye"></i
                        ></base-button>
                      </div>
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
                  </div>
                </div>
              </tabs>
            </div>
            <br />
          </div>
          <!-- Fin Contenido -->
        </div>
        <div class="card-footer">
          <div class="row justify-content-center">
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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class ExperienciaPersonal extends Vue {
  lista_departamentos = null;
  lista_municipios = null;
  departamentoActual = null;
  departamentoResidencia = null;
  departamentoNacimiento = null;

  anexos_experiencia: any[] = [];
  index_doc_ver = 0;
  vistapreviaDoc = null;
  docsRequisitosArray: any[] = [];

  docValido = false;
  estadoPeticion = false;
  rutadocumento = null;
  verModal = false;

  requisito = "";
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  experienciaPersona = {
    id_experiencia: "",
    persona_id: "",
    empresa: "",
    direccion_empresa: "",
    correo_empresa: "",
    salario: "",
    fecha_ingreso_empresa: "",
    fecha_retiro_empresa: "",
    cargo: "",
    area: "",
    tipo_contrato: "",
    jefe_inmediato: "",
    cargo_jefe: "",
    funciones: "",
    actividad_empresa: "",
    certificado: "",

    id_tipo_empresa: "",
    tipo_empresa: "",
    municipio: "",
    id_municipio: "",
    departamento: "",
    id_departamento: "",
    pais: "",
    id_pais: "",
  };

  mounted() {
    this.obtenerDepartamentos();
    this.obtenerPaises();
    this.verDetallleExperienciaPersona(this.$route.params.id);
    this.mostrarDocumento(this.experienciaPersona.id_experiencia);
  }

  // paises,departamentos y municipios datos personales #1
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
            confirmButton: "btn btn-azul-sena",
          },
        });
      });
  }

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
            confirmButton: "btn btn-azul-sena",
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
          title: "Hubo un problema en el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-azul-sena",
          },
        });
      });
  }

  //-----------------------------------------------------------
  vistaPreviaRequisito(index) {
    //para la vista previa del documento se debe crear la url
    this.vistapreviaDoc = URL.createObjectURL(this.docsRequisitosArray[index]);
    this.index_doc_ver = -1;
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
        // this.docResolucon = null;
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

  mostrarDocumento(id_experiencia) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/ver_certificado_experiencia_persona/" +
      id_experiencia;
  }
  //-----------------------------------------------------------
  verDetallleExperienciaPersona(id) {
    Axios()
      .get("ver_detalle_experiencia_persona/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.experienciaPersona = respuesta.data.results;
          this.mostrarDocumento(id);
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      })
      .finally(() => {
        this.estadoPeticion = true;
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
