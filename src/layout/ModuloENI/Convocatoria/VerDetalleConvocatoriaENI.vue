<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">CONVOCATORIA ENI</h1>
        <div class="row">
          <div>
            <small class="text-azul-sena mr-1">
              Convocatoria: {{ this.convocatoria.convocatoria }}
            </small>
          </div>
          <div>
            <small class="text-azul-sena">
              Capacitación: {{ this.convocatoria.capacitacion }}
            </small>
          </div>
        </div>
      </div>
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
                <strong>Nombre de la convocatoria:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.convocatoria }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- capacitación -->
              <div>
                <strong>Capacitación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.capacitacion }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- año  -->
              <div>
                <strong>Año:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.plan_institucional_id }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- financiacion -->
              <div>
                <strong>Financiación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.financiacion }}</p>
              </div>
            </div>
          </div>

          <!-- departamentos y municipios -->
          <div v-if="convocatoria.id_municipio != null" class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Departamento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.departamento }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Municipio:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.municipio }}</p>
              </div>
            </div>
          </div>

          <template v-if="convocatoria.lugar != null">
            <div>
              <strong>Lugar:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ convocatoria.lugar }}</p>
            </div>
          </template>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Horas capacitación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.horas_capacitacion }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Identificación:</strong>
              </div>
              <div
                id="contenido"
                v-if="convocatoria.identificacion_responsable != null"
              >
                <p id="texto">{{ convocatoria.identificacion_responsable }}</p>
              </div>
              <div id="contenido" v-else>
                <p id="texto">No tiene Identificación</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Fecha inicio convocatoria:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.fecha_inicio_conv }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Fecha final convocatoria:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.fecha_fin_conv }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Fecha inicio capacitación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.fecha_inicio }}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Fecha final capacitación:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.fecha_final }}</p>
              </div>
            </div>
          </div>
          <!-- campos nuevos -->
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Tipos de Financiación</strong>
              </div>
              <div id="contenido" v-if="convocatoria.tipo_financiacion == 1">
                <p id="texto">Convenio</p>
              </div>
              <div id="contenido" v-if="convocatoria.tipo_financiacion == 2">
                <p id="texto">Contrato</p>
              </div>
              <div id="contenido" v-if="convocatoria.tipo_financiacion == 3">
                <p id="texto">Memorando de entendimiento</p>
              </div>
              <div id="contenido" v-if="convocatoria.tipo_financiacion == 4">
                <p id="texto">Proveedor SENA</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Línea Tecnológica:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.linea_tecnologica }}</p>
              </div>
            </div>
          </div>
          <!-- fin campos nuevos -->

          <!-- Funcionarios contratistas-->
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Dirigido a:</strong>
              </div>
              <div id="contenido">
                <p id="texto" v-if="convocatoria.para_funcionarios == 'fp'">
                  Funcionarios de planta
                </p>
                <p id="texto" v-if="convocatoria.para_funcionarios == 'fc'">
                  Funcionarios contratistas
                </p>
                <p id="texto" v-if="convocatoria.para_funcionarios == 'am'">
                  Funcionarios de planta y contratistas
                </p>
                <p id="texto" v-if="convocatoria.para_funcionarios == 'co'">
                  Contratistas
                </p>
                <p id="texto" v-if="convocatoria.para_funcionarios == 'ca'">
                  Carrera administrativa
                </p>
                <p id="texto" v-if="convocatoria.para_funcionarios == 'np'">
                  Nombramiento Provisional
                </p>
                <p id="texto" v-if="convocatoria.para_funcionarios == 'pt'">
                  Planta Temporal
                </p>
                <p id="texto" v-if="convocatoria.para_funcionarios == 'no'">
                  Nombramientos en periodo de prueba
                </p>
                 <p id="texto">{{ convocatoria.nombre}}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <!-- fecha inicio capacitación -->
              <div>
                <strong>Entidad Capacitación</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ convocatoria.entidad_capacitadora }}</p>
              </div>
            </div>
          </div>
          <!-- requisitos -->
          <div>
            <label class="mt-2 font-weight-bold">
              Requisitos
              <span class="text-danger"></span>
              :
            </label>
            <div
              class="col-12 table-responsive mt-3"
              v-if="lista_perfiles_requisitos.length > 0"
            >
              <table class="table" id="listado">
                <thead class="bg-gradient-naranja-sena text-white">
                  <tr>
                    <th class="w-100">Requisitos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(requisito, index) in lista_perfiles_requisitos"
                    :key="index"
                  >
                    <td>{{ requisito }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- aprendizaje -->
          <div>
            <label class="mt-2 font-weight-bold">
              Resultado Aprendizaje
              <span class="text-danger"></span>
              :
            </label>
            <div
              class="col-12 table-responsive mt-3"
              v-if="lista_aprendizaje.length > 0"
            >
              <table class="table" id="listado">
                <thead class="bg-gradient-naranja-sena text-white">
                  <tr>
                    <th class="w-100">Aprendizaje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(aprendizaje, index) in lista_aprendizaje"
                    :key="index"
                  >
                    <td>{{ aprendizaje }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- competencia -->
          <div>
            <label class="mt-2 font-weight-bold">
              Competencias Programadas
              <span class="text-danger"></span>
              :
            </label>
            <div
              class="col-12 table-responsive mt-3"
              v-if="lista_oferta.length > 0"
            >
              <table class="table" id="listado">
                <thead class="bg-gradient-naranja-sena text-white">
                  <tr>
                    <th class="w-100">Oferta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(oferta, index) in lista_oferta" :key="index">
                    <td>{{ oferta }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- anexos -->
          <div class="row">
            <label class="mt-2 font-weight-bold col-6">
              Anexos
              <span class="text-danger"></span>
              :
            </label>
            <div
              class="col-6"
              align="right"
              v-if="convocatoria.id_pic_fase == 1"
            >
              <div
                class="btn-group btn-spc"
                tooltip="Subir Anexo"
                tooltip-flow="top"
              >
                <div class="custom-input-file">
                  <input
                    type="file"
                    id="requisito"
                    class="input-file"
                    accept="application/pdf"
                    multiple
                    required="true"
                    @change.prevent="
                      obtenerDocumento(
                        $event,
                        key,
                        convocatoria.id_pic_convocatoria
                      )
                    "
                  />
                  <i class="fas fa-file-pdf"></i>
                </div>
              </div>
            </div>
          </div>

          <div v-if="anexos_convocatoria == 0">
            <p class="text-center mt-2 display-4">No hay anexos cargados</p>
          </div>

          <div v-else>
            <div class="table-responsive">
              <div class="mt-3">
                <table class="table table-hoverble">
                  <thead id="listado">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Anexo</th>
                      <th scope="col" class="col-2">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(anexo, index) in anexos_convocatoria"
                      :key="index"
                    >
                      <td>{{ anexo.id_pic_anexo_convocatoria }}</td>
                      <td>{{ anexo.anexo }}</td>
                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver Anexo"
                            tooltip-flow="top"
                          >
                            <button
                              class="btn btn-sm bg-azul-sena text-white space"
                              @click="
                                (modalAnexo = true),
                                  mostrarDocumento(
                                    anexos_convocatoria[index]
                                      .id_pic_anexo_convocatoria
                                  )
                              "
                            >
                              <i class="fas fa-eye"></i>
                            </button>
                          </div>
                          <div>
                            <!-- modal -->
                            <modal
                              :show.sync="modalAnexo"
                              body-classes="p-0"
                              modal-classes="modal-dialog-centered modal-sm modal-lg"
                            >
                              <template slot="header">
                                <h1
                                  class="text-azul-sena modal-title"
                                  id="modalNovedadesAprendiz"
                                >
                                  Anexo
                                </h1>
                              </template>
                              <embed
                                :src="rutadocumento"
                                type="application/pdf"
                                width="100%"
                                height="600px"
                              />
                            </modal>
                            <!-- anexos fin -->
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Eliminar Anexo"
                            tooltip-flow="top"
                            v-if="convocatoria.id_pic_fase == 1"
                          >
                            <button
                              class="btn btn-sm bg-azul-sena text-white space"
                              @click="
                                eliminarAnexoDocumento(
                                  anexos_convocatoria[index]
                                    .id_pic_anexo_convocatoria
                                )
                              "
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="estadoPeticionRegistrar">
        <AnimacionCargando></AnimacionCargando>
      </div>
      <div class="card-footer" v-if="!estadoPeticionRegistrar">
        <div class="row justify-content-center">
          <div
            class="col-lg-4 col-sm-12 mt-1"
            v-if="convocatoria.id_pic_fase == 1"
          >
            <base-button
              type="azul-sena"
              @click="cambiarPostuacion()"
              class="btn btn-block bg-azul-sena text-white"
            >
              Iniciar Postulaciones
            </base-button>
          </div>
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarConvocatoriaENI'
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
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import Component from "vue-class-component";
  import { Vue } from "vue-property-decorator";
  import router from "@/router";
  import AnimacionCargando from "../../../components/animacionCargando.vue";

  @Component({
    components: {
      AnimacionCargando,
    },
  })
  export default class VerDetalleEvaluacionCpacitacion extends Vue {
    errorRequisito: any = false;
    // docResolucon = null;
    docValido = false;
    estadoPeticion = false;
    estadoPeticionSubirDocumento = false;
    estadoPeticionRegistrar = false;

    // variables para capacitacion nacional e internacional
    tipo_inter_nacio = "";
    convocatoria = {
      convocatoria: "",
      fecha_inicio: "",
      fecha_final: "",
      lugar: "",
      perfiles_requisitos: "",
      financiacion: "",
      id_pic_convocatoria: "",
      para_funcionarios: "",
      pertenece_a_red: "SI", //dato quemado
      pic_id: "",
      plan_institucional_id: "",
      id_pic: "",
      id_pic_fase: null,
      id_usuario_autenticado: JSON.parse(sessionStorage.getItem("usuario"))
        .id_usuario, //esta quemado, verificar
      nacional: "",
      id_municipio: "",
      tipo_financiacion: "",
      linea_tecnologica: "",
      nombre:"",
      entidad_capacitadora: "",
      entidad_capacitacion: "",
      resultado_aprendizaje: "",
      competencia_programa_oferta: "",
      //nuevos
      fecha_fin_conv: "",
      fecha_inicio_conv: "",
      horas_capacitacion: "",
      identificacion_responsable: "",
    };

    fechas_pic = [];

    lista_capacitaciones: any[] = [];
    modalidades: any[] = [];
    docResolucon: any[] = null;
    docSubidosCont = 0;

    requisito = "";
    aprendizaje = "";
    oferta = "";
    mostar_aprendizaje: any = false;
    mostar_oferta: any = false;
    lista_perfiles_requisitos: any[] = [];
    lista_aprendizaje: any[] = [];
    lista_oferta: any[] = [];
    // anexos
    anexos_convocatoria: any[] = [];
    id_anexo = "";
    modalAnexo = false;
    rutadocumento = "";
    //departamentos
    lista_departamentos: any[] = [];
    id_pais = 57;
    lista_paises = null;
    //municipios
    lista_municipios = null;
    departamento_actual = null;
    mounted() {
      // Axios()
      //   .get("/crear_convocatoria_pic")
      //   .then((respuesta) => {
      //     this.lista_capacitaciones = respuesta.data.results.pics;
      //     this.modalidades = respuesta.data.results.modalidades;
      //   });

      this.convocatoria.id_pic_convocatoria = this.$route.params.id;

      this.obtenerPic(this.convocatoria.id_pic_convocatoria);
      this.obtenerAnexoConvocatoria();

      this.ontenerPlanInstitucional();
      this.obtenerDepartamento(57);
    }

    //obtener municipios inicio
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
    //obtener municipios fin

    //obtener departamentos inicio
    obtenerDepartamento(id_pais) {
      Axios()
        .get("listar_departamentos/" + id_pais)
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

    //obtener departamentos fin

    obtenerPic(id) {
      Axios()
        .get("editar_convocatoria_pic/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.convocatoria = respuesta.data.results;

            // this.convocatoria.pic_fase_id = respuesta.data.results.id_pic_fase; //se hace
            this.lista_perfiles_requisitos =
              this.convocatoria.perfiles_requisitos.split(",");
            this.lista_perfiles_requisitos.splice(
              this.lista_perfiles_requisitos.length - 1,
              1
            );

            this.lista_aprendizaje =
              this.convocatoria.resultado_aprendizaje.split(",");
            this.lista_aprendizaje.splice(this.lista_aprendizaje.length - 1, 1);

            this.lista_oferta =
              this.convocatoria.competencia_programa_oferta.split(",");
            this.lista_oferta.splice(this.lista_oferta.length - 1, 1);
            // this.convocatoria.id_pic = respuesta.data.results.pic_id;
          } else {
            Swal.fire({
              title: respuesta.data.message,
            }).then(() => {
              this.$router.push("GestionarConvocatoriaENI");
            });
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
          min_value: () => "No pude ser negativo",
          // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
          alpha_spaces: () => "No permite numeros ni caracteres especiales",
          alpha_num: () => "No permite caracteres especiales",
        },
      };
      this.$validator.localize("es", dict);
    }

    // anexos
    obtenerAnexoConvocatoria() {
      Axios()
        .get(
          "mostrar_anexos_pic_convocatoria/" +
          this.convocatoria.id_pic_convocatoria
        )
        .then((respuesta) => {
          this.anexos_convocatoria = respuesta.data.results;
        })
        .finally(() => {
          this.estadoPeticion = true;
        });
      // .catch(() => {
      //   Swal.fire({
      //     title: 'ERROR anexo'
      //   })
      // })
    }
    mostrarDocumento(id) {
      this.rutadocumento =
        "https://develdfp.cloudsenactpi.net/api/visualizar_anexo_pic_convocatoria/" +
        id;
    }

    ontenerPlanInstitucional() {
      Axios()
        .get("listar_plan_institucional")
        .then((respuesta) => {
          this.fechas_pic = respuesta.data.results;
        });
    }

    cambiarPostuacion() {
      const id_usuario = JSON.parse(sessionStorage.getItem("usuario"));
      this.estadoPeticionRegistrar = true;
      Axios()
        .put("/actualizar_fase_pic/" + this.convocatoria.id_pic_convocatoria, {
          id_pic_convocatoria: this.convocatoria.id_pic_convocatoria,
          pic_fase_id: 2,
          id_usuario_actualiza: id_usuario.id_usuario,
        })
        .then(() => {
          this.estadoPeticionRegistrar = true;
          Swal.fire({
            title: "Convocatoria ",
            text: this.convocatoria.convocatoria + " pasó a fase de postulación",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            icon: "success",
          });
          router.back();
        })
        .catch(() => {
          this.estadoPeticionRegistrar = false;

          Swal.fire({
            title: "ERROR",
          });
        });
    }
    async obtenerDocumento(event, pos, id_pic_convocatoria) {
      if (event.target.files[0].size <= 4000000) {
        let extDoc = event.target.files[0].name
          .toString()
          .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
        if (extDoc == ".pdf") {
          this.docResolucon = event.target.files;

          Swal.fire({
            title: "Subir los archivos",
            text: "Se Agregarán " + this.docResolucon.length + " Documento(s)",
            icon: "question",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
          }).then((resp) => {
            if (resp.isConfirmed) {
              this.subirDocumento(pos, id_pic_convocatoria);
            }
          });
          this.docValido = true;
          // this.$router.push({ name: "VerDetalleConvocatoriaENI" });
        } else {
          this.docValido = false;
          this.docResolucon = null;
          Swal.fire(
            "Algo salió mal!",
            "El archivo cargado no es un PDF!",
            "error"
          );
        }
      } else {
        this.docValido = false;
        this.docResolucon = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado pesa más de 4 MegaBytes!",
          "error"
        );
      }
    }

    subirDocumento(pos, id_pic_convocatoria) {
      this.estadoPeticionSubirDocumento = true;
      let id = JSON.parse(sessionStorage.getItem("usuario"));
      for (const documento of this.docResolucon) {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        var data = new FormData();
        data.append("anexo", documento.name);
        data.append("documento", documento);
        data.append(
          "id_convocatoria",
          id_pic_convocatoria
          // this.listaConvocatoriasFiltrado[pos].id_pic_convocatoria
        );
        data.append("id_usuario_autenticado", id.id_usuario);
        Axios()
          .post(
            "almacenar_anexo_convocatoria_pic/" + id_pic_convocatoria,
            // this.listaConvocatoriasFiltrado[pos].id_pic_convocatoria,
            data,
            { headers: headers }
          )
          .then((respuesta) => {
            if ((respuesta.data.status = "success")) {
              this.docSubidosCont = this.docSubidosCont + 1;
              if (this.docResolucon.length == this.docSubidosCont) {
                Swal.fire({
                  title: "Los Anexos fueron subidos exitosamente",
                  icon: "success",
                  text: "Se subieron " + this.docResolucon.length + " anexos",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                })
                this.docSubidosCont = 0;
              }
            } else {
              Swal.fire({
                title: "Los Anexos No fueron subidos",
                icon: "error",
                text: respuesta.data.message,
                confirmButtonText: "Aceptar",
              });
            }
            // this.modalCargarAnexo = false;
          })
          .catch(() => {
            Swal.fire(
              "ERROR!",
              "Se ha presentado un error en el servidor!",
              "error"
            );
          })
          .finally(() => {
            this.estadoPeticionSubirDocumento = false;
            this.obtenerAnexoConvocatoria()
          });
      }
    }

    eliminarAnexoDocumento(id_pic_anexo_convocatoria, index) {
      Swal.fire({
        title: "Eliminar",
        text: this.anexos_convocatoria[index] + "?",
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          Axios()
            .delete("eliminar_anexo_documento/" + id_pic_anexo_convocatoria)
            .then((respuesta) => {
              if (respuesta.data.status == "success") {
                Swal.fire({
                  title: "Convocatoria Eliminada",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "#238276",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
                this.anexos_convocatoria.splice(index, 1);
              } else {
                Swal.fire({
                  title: "No se pudo eliminar la convocatoria",
                  text: respuesta.data.message,
                  icon: "error",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
                this.$router.back();
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

  /* estilos para input tipo file */
  .custom-input-file {
    background-color: #238276;
    color: #fff;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    /* margin: 0 auto 0; */
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    text-align: center;
    padding-top: 4px;
    width: 30px;
    height: 30px;
  }

  .tam-completo {
    width: 100%;
    font-size: 13px;
  }
  .custom-input-file .input-file {
    font-size: 10em;
    margin: 0;
    opacity: 0;
    outline: 0 none;
    padding: 5px 5px 5px 5px !important;
    position: absolute;
  }

  /* fin estilos de input file */
</style>