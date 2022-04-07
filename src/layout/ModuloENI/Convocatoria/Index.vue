<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA CONVOCATORIA ENI</h1>
        </h1>
      </div>
      <div class="card-body">
        <!-- <div class="text-center" v-if="estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div> -->
        <div >
          <div class="row my-3">
            <div class="col-md-4 col-lg-3 mt-4">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar Convocatoria"
                v-model="filter"
                @keyup.prevent="picFiltrado()"
              />
            </div>
            <div class="col-md-4 col-lg-3 col-sm-12 mt-4">
              <select
                class="form-control p-0"
                v-model="filterPicTipo"
                @change="picTipoFiltrado()"
              >
                <option value="" Disabled>Tipo capacitación</option>
                <option value="">Todas</option>
                <option v-if="existe_tipo_tecnico">Técnico</option>
                <option v-if="existe_tipo_pedagogico">Pedagógico</option>
                <option v-if="existe_tipo_clave">Clave y Transversal</option>
              </select>
            </div>
            <div class="col-md-3 col-lg-2 col-sm-2 col-sm-12 mt-4">
              <select
                class="form-control p-0"
                name="fecha"
                id="fecha"
                v-model="fecha_pic"
                @change="obtenerConvocatorias()"
              >
                <option
                  v-for="(fecha, index) in fechas_pic"
                  :key="index"
                  :value="fecha.plan_institucional_id"
                >
                  {{ fecha.plan_institucional_id }}
                </option>
              </select>
            </div>

            <div v-if="estadoPeticionTabla">
              <AnimacionTablasCargando />
            </div>

            <div v-else class="col-md-4 col-lg-4 mt-4">
              <paginate-links
                class="pagination justify-content-end"
                for="listaConvocatoriasFiltrado"
                :limit="2"
                :hide-single-page="true"
                :show-step-links="true"
                :full-page="true"
                :classes="{
                  ul: 'simple-links-container',
                  li: 'simple-links-item',
                  liActive: ['simple-links-item', 'active1'],
                  'li.active': 'active1',
                }"
              ></paginate-links>
            </div>
          </div>
           <div v-if="estadopeticionAnio">
            <animacion-tablas-cargando />
          </div>
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaConvocatoriasFiltrado"
              :list="listaConvocatoriasFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Convocatoria</th>
                    <th scope="col">Capacitación</th>
                    <th scope="col">Tipo Cap</th>
                    <th scope="col">Fase</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      listaConvocatoriasFiltrado != null &&
                      listaConvocatoriasFiltrado.length != 0
                    "
                  >
                    <tr
                      v-for="(convocatoria, key) in paginated(
                        'listaConvocatoriasFiltrado'
                      )"
                      :key="key"
                    >
                      <td>{{ convocatoria.codigo_conv }}</td>
                      <td>{{ convocatoria.convocatoria }}</td>
                      <td>
                        {{ convocatoria.capacitacion }}
                      </td>
                      <td>{{ convocatoria.pic_tipo.pic_tipo }}</td>
                      <td v-if="convocatoria.pic_fase_id == 1">Creación</td>
                      <td v-if="convocatoria.pic_fase_id == 2">Postulación</td>
                      <td v-if="convocatoria.pic_fase_id == 3">Validación</td>
                      <td v-if="convocatoria.pic_fase_id == 4">Terminación</td>
                      <td v-if="convocatoria.pic_fase_id == 5">Finalizada</td>
                      <td v-if="convocatoria.pic_fase_id == 6">Cancelación</td>

                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver Convocatoria ENI"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'VerDetalleConvocatoriaENI',
                                params: {
                                  id: convocatoria.id_pic_convocatoria,
                                },
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>

                          <div
                            class="btn-group btn-spc"
                            tooltip="Modificar Convocatoria ENI"
                            tooltip-flow="top"
                            v-if="convocatoria.pic_fase_id == 1"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'ModificarConvocatoriaENI',
                                params: {
                                  id: convocatoria.id_pic_convocatoria,
                                },
                              }"
                            >
                              <i class="fas fa-edit"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Eliminar Convocatoria ENI"
                            tooltip-flow="top"
                            v-if="convocatoria.pic_fase_id == 1"
                          >
                            <a
                              @click="
                                eliminarConvocatoria(
                                  convocatoria.id_pic_convocatoria,
                                  key
                                )
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-trash"></i>
                            </a>
                          </div>
                          <!-- liberar convocatoria para todos -->
                          <!-- <span
                      v-b-tooltip.hover.top
                      title="Finalizar ejecución capacitación"
                      v-if="convocatoria.pic_fase_id == 4"
                    >
                      <a
                        @click="
                          actualizarEstadoInscritos(
                            convocatoria.id_pic_convocatoria,
                            key
                          )
                        "
                        class="btn btn-sm bg-azul-sena text-white"
                      >
                        <i class="fas fa-user-friends"></i>
                      </a>
                    </span> -->
                          <div
                            class="btn-group btn-spc"
                            tooltip="Aprobar Instructores"
                            tooltip-flow="top"
                            v-if="convocatoria.pic_fase_id == 4"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'AprobarCertificarInstructor',
                                params: {
                                  id: convocatoria.id_pic_convocatoria,
                                },
                              }"
                            >
                              <i class="fas fa-user-graduate"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Validar Inscritos"
                            tooltip-flow="top"
                            v-if="convocatoria.pic_fase_id == 3"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'PostulacionesConvocatoriaENI',
                                params: {
                                  id: convocatoria.id_pic_convocatoria,
                                },
                              }"
                            >
                              <i class="fas fa-list-ul"></i>
                            </router-link>
                          </div>

                          <div
                            class="btn-group btn-spc"
                            tooltip="Listado Inscritos"
                            tooltip-flow="top"
                            v-if="convocatoria.pic_fase_id == 2"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'InscritosConvocatoriaENI',
                                params: {
                                  id: convocatoria.id_pic_convocatoria,
                                },
                              }"
                            >
                              <i class="fas fa-table"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Subir Anexo"
                            tooltip-flow="top"
                            v-if="convocatoria.pic_fase_id == 1"
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
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    No hay convocatorias
                  </tr>
                </tbody>
              </table>
            </paginate>
          </div>
          <paginate-links
            class="pagination justify-content-end"
            for="listaConvocatoriasFiltrado"
            :limit="2"
            :hide-single-page="true"
            :show-step-links="true"
            :full-page="true"
            :classes="{
              ul: 'simple-links-container',
              li: 'simple-links-item',
              liActive: ['simple-links-item', 'active1'],
              'li.active': 'active1',
            }"
          ></paginate-links>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";
import router from "@/router";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class Login extends Vue {
  estadoPeticion = true;
  listaConvocatorias = [];
  filter = "";
  filterPicTipo = "";
  fecha_pic = "2021";
  id_convocatoria_pic = 0;
  fechas_pic = [];
  docSubidosCont = 0;
  estadoPeticionTabla = false;
  paginate = ["listaConvocatoriasFiltrado"];

  existe_tipo_tecnico = false;
  existe_tipo_pedagogico = false;
  existe_tipo_clave = false;
 estadopeticionAnio = false;
  listaConvocatoriasFiltrado = [];

  tipoPicFilter = "";

  capacitacion = {
    area_ruta: "",
    capacitacion: "",
    componentes: "",
    id_area_ruta: "",
    id_pic: "",
    plan_institucional_id: "",
    red_conocimiento_id: "",
    tipo_pic: "",
    eje: "",
  };

  docResolucon: any[] = null;
  docValido = false;
  idConvocatoriaActual = null;

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        min: () => "Mínimo 8 caracteres",
      },
    };
    this.$validator.localize("es", dict);
  }
  async mounted() {
    await this.obtenerConvocatorias();
    await this.ontenerPlanInstitucional();
  }
  async updated() {
    await this.listarTiposPic();
  }
  async obtenerConvocatorias() {
   this.estadopeticionAnio = true;
    await Axios()
      .get("listar_convocatoria_pics/" + this.fecha_pic)
      .then((respuesta) => {
        this.estadoPeticionTabla = false;
        this.listaConvocatorias = respuesta.data.results;
        this.listaConvocatoriasFiltrado = respuesta.data.results;
          this.estadopeticionAnio = false;

        if (this.listaConvocatorias == null) {
          this.listaConvocatorias = [];
          this.listaConvocatoriasFiltrado = [];
          
        }
        this.estadoPeticion = false;
        // this.estadoPeticionTabla = false;
      })
      .then(() => {
        this.listarTiposPic();
      })
      .finally(() => {
        this.estadoPeticionTabla = false;
            this.estadopeticionAnio = false;
      });
  }
  ontenerPlanInstitucional() {
    this.estadoPeticionTabla = true;
    Axios()
      .get("listar_plan_institucional")
      .then((respuesta) => {
        this.fechas_pic = respuesta.data.results;
        this.estadoPeticionTabla = false;
      })
      .finally(() => {
        // this.estadoPeticionTabla = true;
      });
  }

  actualizarEstadoInscritos(id, index) {
    //NO UTILIZADO
    Swal.fire({
      title:
        'Finalizar ejecución de la capacitación "' +
        this.listaConvocatoriasFiltrado[index].convocatoria +
        '"?',
      text: "Esta acción libera a los funcionarios que participaron en la capacitación",
      icon: "warning",

      confirmButtonText: "Finalizar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .post("actualizar_estado_inscripcion_pic/" + id, {
            id_pic_estado_inscripcion: 4,
            id_usuario_actualiza: JSON.parse(sessionStorage.getItem("usuario"))
              .id_usuario,
          })
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Capacitación terminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
            } else {
              Swal.fire({
                title: "No se pudo finalizar la capacitación",
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

  eliminarConvocatoria(id, index) {
    Swal.fire({
      title: "Eliminar Convocatoria ",
      text: this.listaConvocatoriasFiltrado[index].convocatoria + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_convocatoria_pic/" + id)
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
              this.listaConvocatoriasFiltrado.splice(index, 1);
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
  obtenerDocumento(event, pos, id_pic_convocatoria) {
    if (event.target.files[0].size <= 4000000) {
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.docResolucon = event.target.files;
        Swal.fire({
          title: "Subir los archivos",
          text:
            "(" +
            this.nombres() +
            ") de la Convocatoria " +
            this.listaConvocatoriasFiltrado[pos].convocatoria +
            "?",
          icon: "question",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
          cancelButtonText: "Cancelar",
          showCancelButton: true,
        }).then((resp) => {
          if (resp.isConfirmed) {
            this.subirDocumentos(pos, id_pic_convocatoria);
          }
        });
        this.docValido = true;
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
  nombres(): string {
    let nombre = "";
    for (const archivo of this.docResolucon) {
      nombre += archivo.name + ", ";
    }
    nombre = nombre.slice(0, -1);
    return nombre;
  }
  subirDocumentos(pos, id_pic_convocatoria) {
    this.estadoPeticion = true;
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
              });
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
          this.estadoPeticion = false;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    }
  }

  filtrarTipoPic(lista: any[]) {
    let listaRetornar = [];

    if (this.tipoPicFilter != "") {
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].pic_tipo_id == this.tipoPicFilter) {
          listaRetornar.push(lista[i]);
        }
      }
      return listaRetornar;
    } else {
      return lista;
    }
  }

  picFiltrado() {
    let arregloFiltrado = [];
    // this.listaConvocatoriasFiltrado = []

    for (let conv of this.listaConvocatorias) {
      let convocatoria = conv.convocatoria.toLowerCase();
      let tipo = conv.pic_tipo.pic_tipo.toLowerCase();
      let codigo = conv.pic_convocatoria[0].codigo_conv.toLowerCase();

      if (
        convocatoria.indexOf(this.filter) >= 0 ||
        tipo.indexOf(this.filter) >= 0 ||
        codigo.indexOf(this.filter) >= 0 ||
        this.filter == ""
      ) {
        arregloFiltrado.push(conv);
      }
    }

    this.listaConvocatoriasFiltrado = arregloFiltrado;
    if (this.listaConvocatoriasFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró convocatorias que coincidan con las busqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaConvocatoriasFiltrado = this.listaConvocatorias;
      // this.paginate = ['listaConvocatoriasFiltrado']
    }
  }

  async picTipoFiltrado() {
    this.listaConvocatoriasFiltrado = [];
    this.listarTiposPic();
    for (let conv of this.listaConvocatorias) {
      let picTipo = conv.pic_tipo.pic_tipo;
      if (this.filterPicTipo != "") {
        if (picTipo.indexOf(this.filterPicTipo) >= 0) {
          this.listaConvocatoriasFiltrado.push(conv);
        } else {
          // no hay coincidencias
        }
      } else {
        this.listaConvocatoriasFiltrado = this.listaConvocatorias;
      }
    }
  }

  listarTiposPic() {
    for (let conv of this.listaConvocatorias) {
      if (conv.pic_tipo.pic_tipo == "Técnico") {
        this.existe_tipo_tecnico = true;
      } else if (conv.pic_tipo.pic_tipo == "Pedagógico") {
        this.existe_tipo_pedagogico = true;
      } else if (conv.pic_tipo.pic_tipo == "Clave y Transversal") {
        this.existe_tipo_clave = true;
      }
    }
  }

  // updated(){
  //   this.obtenerConvocatorias()
  // }
}
</script>
<style scoped>
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
