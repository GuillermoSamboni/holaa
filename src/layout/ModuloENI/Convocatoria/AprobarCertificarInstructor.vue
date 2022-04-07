<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">APROBAR Y CERTIFICAR INSTRUCTORES</h1>
        </h1>
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
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="mb-3">
            <button
              class="btn btn-azul-sena col-12 col-md-6 col-lg-4"
              @click="cambiarEstadoConvocatoria()"
              v-if="listaInscripcionesFiltrado.length != 0"
            >
              Finalizar Aprobación y certificación
            </button>
            <paginate-links
              class="pagination justify-content-end"
              for="listaInscripcionesFiltrado"
              :limit="2"
              :hide-single-page="true"
              :show-step-links="true"
              :full-page="true"
              :classes="{
                ul: 'simple-links-container',
                li: 'simple-links-item',
                liActive: ['simple-links-item', 'active1'],
                'li.active': 'active1'
              }"
            ></paginate-links>
          </div>
          <div
            class="text-center"
            v-if="estadoPeticion && listaInscripcionesFiltrado == []"
          >
            <AnimacionCargando></AnimacionCargando>
          </div>
          <div v-if="listaInscripcionesFiltrado == null">
            <h5 class="text-azul-sena">
              No hay Inscritos en esta convocatoria
            </h5>
          </div>
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaInscripcionesFiltrado"
              :list="listaInscripcionesFiltrado"
              :per="10"
            >
              <table
                v-if="listaInscripcionesFiltrado != []"
                class="table table-hoverble"
              >
                <thead id="listado">
                  <tr>
                    <th scope="col">
                      Identificación
                    </th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Estado</th>

                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(inscrito, key) in 
                      paginated('listaInscripcionesFiltrado')"
                    :key="key"
                  >
                    <td>
                      {{ inscrito.identificacion }}
                    </td>
                    <td>
                      {{ inscrito.primer_nombre }}
                      {{ inscrito.segundo_nombre }}
                      {{ inscrito.primer_apellido }}
                      {{ inscrito.segundo_apellido }}
                    </td>                    
                    <td>
                      {{ inscrito.pic_estado_inscripcion }}
                    </td>
                    <td scope="row">
                      <div
                        class="btn-toolbar btn-responsive-table"
                        role="toolbar"
                      >
                        <div
                          class="btn-group btn-spc"
                          tooltip="Ver Respresentante"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'VerDetallePostulado',
                              params: {
                                persona: inscrito.persona,                                
                              },
                            }"
                          >
                          <!-- persona: inscrito.id_persona, -->
                            <i class="fas fa-eye"></i>
                          </router-link>
                        </div>
                        <div
                          class="btn-group btn-spc"
                          tooltip="Aprobar"
                          tooltip-flow="top"
                          v-if="inscrito.id_pic_estado_inscripcion != 4"
                        >
                          <!-- botón para Aprobar -->
                          <!-- se envia 4 que significa en la tabla paramtrica finalizado y aprobado -->
                          <button
                            class="btn btn-sm btn-azul-sena"
                            @click="
                              actualizarEstadoInscritos(4, inscrito.persona_id)
                            "
                          >
                            <i class="fas fa-check-square"></i>
                          </button>
                        </div>

                        <div
                          class="btn-group btn-spc"
                          tooltip="No Aprobar"
                          tooltip-flow="top"
                          v-if="inscrito.id_pic_estado_inscripcion != 3"
                        >
                          <!-- botón para No Aprobar -->

                          <button
                            class="btn btn-sm btn-azul-sena"
                            @click="(modalNoAprobar = true), noAprobar(inscrito)"
                          >
                            <i class="fas fa-minus-square"></i>
                          </button>
                        </div>
                        <!-- modal de no aprobar -->
                        <modal
                          :show.sync="modalNoAprobar"
                          body-classes="p-0"
                          modal-classes="modal-dialog-centered modal-sm modal-lg"
                        >
                          <template slot="header">
                            <h1
                              class="text-azul-sena modal-title"
                              id="modalNovedadesAprendiz"
                            >
                              No Aprobar Instructor
                            </h1>
                          </template>
                          <card
                            type="white"
                            shadow
                            header-classes="bg-white pb-5"
                            body-classes="px-lg-5 py-lg-5"
                            class="border-0"
                          >
                            <div class="m-2">
                              <span class="text-azul-sena">
                                Nombre: {{ inscritoNoAprobar.primer_nombre }}
                                {{ inscritoNoAprobar.segundo_nombre }}
                                {{ inscritoNoAprobar.primer_apellido }}
                                {{ inscritoNoAprobar.segundo_apellido }}
                              </span>
                              <span class="text-azul-sena mr-1">
                                Cédula: {{ inscritoNoAprobar.identificacion }}
                              </span>
                            </div>
                            <template class="row">
                              <div id="campo">
                                <!-- observación de que se acepta o no el inscrito -->
                                <div id="campo">
                                  <label class="mt-2 font-weight-bold">
                                    ¿Por qué no es aprobado?
                                    <span class="text-danger">*</span>
                                    :
                                  </label>

                                  <div>
                                    <select
                                      @change="obtenerOtro()"
                                      class="form-control"
                                      name="observacion"
                                      id="observacion"
                                      v-model="observacion"
                                      v-validate="'required'"
                                    >
                                      <option>Defunción</option>
                                      <option>Incapacidad</option>
                                      <option>Situación administrativa</option>
                                      <option>Calamidad doméstica</option>
                                      <option>
                                        No justificó de manera idónea
                                      </option>
                                      <option>Otro</option>
                                    </select>
                                    <small
                                      v-show="errors.has('observacion')"
                                      class="text-danger"
                                    >
                                      {{ errors.first("observacion") }}
                                    </small>
                                  </div>
                                  <div v-if="otro">
                                    <label class="mt-2 font-weight-bold">
                                      Otro
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
                                        name="otro"
                                        class="form-control"
                                        id="otro"
                                        v-model="observacion"
                                        placeholder="Otro"
                                        v-validate="{ required: true }"
                                      />
                                    </div>
                                    <small
                                      v-show="errors.has('otro')"
                                      class="text-danger font-weigth-bold"
                                    >
                                      {{ errors.first("otro") }}
                                    </small>
                                  </div>
                                </div>

                                <button
                                  class="
                                  btn btn-azul-sena
                                  col-12 col-md-12 col-lg-12
                                  mt-2
                                "
                                  @click="
                                    actualizarEstadoInscritos(
                                      3,
                                      inscritoNoAprobar.id_persona
                                    )
                                  "
                                >
                                  Finalizar sin aprobar
                                </button>
                              </div>
                            </template>
                          </card>
                        </modal>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </paginate>
          </div>
          <paginate-links
            class="pagination justify-content-end"
            for="listaInscripcionesFiltrado"
            :limit="2"
            :hide-single-page="true"
            :show-step-links="true"
            :full-page="true"
            :classes="{
              ul: 'simple-links-container',
              li: 'simple-links-item',
              liActive: ['simple-links-item', 'active1'],
              'li.active': 'active1'
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
  import registrarEstudio from "../HojaDeVida/Educacion/RegistrarEducacionPersona.vue";
  import Card from "@/components/Card.vue";

  @Component({
    components: {
      AnimacionCargando,
      AnimacionTablasCargando,
      registrarEstudio,
      Card,
    },
  })
  export default class Login extends Vue {
    otro = false;
    estadoPeticion = true;

    listaInscripciones = {
      id_pic_inscripcion: "",
      pic_convocatoria_id: "",
      persona_id: "",
      pic_estado_inscripcion_id: "",
      observaciones: "",
      creado: "",
      actualizado: "",
      borrado_el: "",
      id_usuario_actualiza: "",
      id_pic_estado_inscripcion: "",
      pic_estado_inscripcion: "",
      id_persona: "",
      tipo_identificacion_id: "",
      identificacion: "",
      municipio_identificacion_id: "",
      genero_id: "",
      zona_id: "",
      grupo_etnico_id: "",
      discapacidad_id: "",
      estado_civil_id: "",
      municipio_residencia_id: "",
      tipo_libreta_militar_id: "",
      fecha_identificacion: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      nombre_completo: "",
      fecha_nacimiento: "",
      estrato: "",
      hijos: "",
      clasificacion_sisben: "",
      direccion: "",
      puntaje_icfes: "",
      tipo_sangre: "",
      victima_conflicto: "",
      cabeza_familia: "",
      correo: "",
      correo_aternativo: "",
      telefono_fijo: "",
      telefono_movil: "",
      telefono_alternativo: "",
      numero_libreta_militar: "",
      id_crea: "",
      id_actualiza: "",
      contrasena: "",
      municipio_nacimiento_id: "",
      procentaje_discapacidad: "",
      localidad: "",
      pais_nacionalidad_id: "",
    };
    listaInscripcionesFiltrado = [];
    paginate = ["listaInscripcionesFiltrado"];
    filter = "";
    fecha_pic = "2021";
    fechas_pic = [];
    listaAdjudicados: any = [];
    listaInscripciones2: any = [];
    id_persona = null;
    adjudicar = false;
    nombre = "";
    observacion = null;
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
      pic_fase_id: 0,
      id_usuario_autenticado: "",
      nacional: "",
      id_municipio: "",
    };

    idPersonaActual = null;
    prueba = "";
    idInscripcionActual = null;
    estadoPeticionTabla = false;

    requisitosInstructor = null;
    rutadocumento = null;
    modalNoAprobar = false;

    inscritoNoAprobar= {
       id_pic_inscripcion: "",
      pic_convocatoria_id: "",
      persona_id: "",
      pic_estado_inscripcion_id: "",
      observaciones: "",
      creado: "",
      actualizado: "",
      borrado_el: "",
      id_usuario_actualiza: "",
      id_pic_estado_inscripcion: "",
      pic_estado_inscripcion: "",
      id_persona: "",
      tipo_identificacion_id: "",
      identificacion: "",
      municipio_identificacion_id: "",
      genero_id: "",
      zona_id: "",
      grupo_etnico_id: "",
      discapacidad_id: "",
      estado_civil_id: "",
      municipio_residencia_id: "",
      tipo_libreta_militar_id: "",
      fecha_identificacion: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      nombre_completo: "",
      fecha_nacimiento: "",
      estrato: "",
      hijos: "",
      clasificacion_sisben: "",
      direccion: "",
      puntaje_icfes: "",
      tipo_sangre: "",
      victima_conflicto: "",
      cabeza_familia: "",
      correo: "",
      correo_aternativo: "",
      telefono_fijo: "",
      telefono_movil: "",
      telefono_alternativo: "",
      numero_libreta_militar: "",
      id_crea: "",
      id_actualiza: "",
      contrasena: "",
      municipio_nacimiento_id: "",
      procentaje_discapacidad: "",
      localidad: "",
      pais_nacionalidad_id: "",
    };
    persona = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
    constructor() {
      super();
      const dict = {
        messages: {
          required: () => "Campo obligatorio",
          min: () => "Mínimo 8 caracteres",
          // email: () => "Correo invalido",
        },
      };
      this.$validator.localize("es", dict);
    }

    async mounted() {
      this.obtenerPic(this.$route.params.id);
      this.obtenerInscritos();
    }

    noAprobar(inscrito){
      this.inscritoNoAprobar = inscrito;
      
    }

    mostrarDocumento(id) {
      this.rutadocumento =
        "https://develdfp.cloudsenactpi.net/api/visualizar_requisito_pic/" + id;
    }
    // Solo obtiene los datos de los inscritos
    async obtenerInscritos() {
      let idIncritos = this.$route.params.id;
      await Axios()
        .get("listar_inscripciones_pic_adjudicados_finalizados/" + idIncritos)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.listaInscripciones = respuesta.data.results;
            this.listaInscripcionesFiltrado = respuesta.data.results;


            this.estadoPeticion = false;
          } else {
            Swal.fire({
              title: "Hay un problema",
              text: respuesta.data.message,
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
          this.$router.push("/GestionarConvocatoriaENI");
        })
        .finally(() => {
          this.estadoPeticionTabla = true;
        });
    }

    async obtenerPic(id) {
      await Axios()
        .get("editar_convocatoria_pic/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.convocatoria = respuesta.data.results;
          }
        });
    }

    cambiarEstadoConvocatoria() {
      const id_usuario = JSON.parse(sessionStorage.getItem("usuario"));
      Axios()
        .put("actualizar_fase_pic/" + this.$route.params.id, {
          id_pic_convocatoria: this.$route.params.id,
          pic_fase_id: 5,
          id_usuario_actualiza: id_usuario.id_usuario,
        })
        .then(() => {
          Swal.fire({
            title: "Convocatoria ",
            text: this.convocatoria.convocatoria + " pasó a fase de Terminación",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            icon: "success",
          });
          this.observacion = null;
          this.$router.push({ name: "GestionarConvocatoriaENI" });
        })
        .catch(() => {
          Swal.fire({
            title: "ERROR",
          });
        });
    }
    obtenerOtro() {
      if (this.observacion == "Otro") {
        this.otro = true;
      } else {
        this.otro = false;
      }
    }

    // cambia de aprobado y no aprobado
    actualizarEstadoInscritos(estado_inscripcion, id_persona) {
      // alert(this.idPersonaActual + " - " + estado_inscripcion);
      Swal.fire({
        title: 'Aprobación capacitación ',
        text: this.convocatoria.convocatoria + " Esta acción libera al funcionario para participar en otras capacitaciones",
        icon: "warning",

        confirmButtonText: "Finalizar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((respuesta) => {
        if (respuesta.isConfirmed) {
          //aqui debo actualizar metodo para mandar la observación en caso de no haber aprobado la capacitación
          Axios()
            .post("actualizar_estado_inscripto_pic/" + this.convocatoria.id_pic_convocatoria, {
              id_pic_estado_inscripcion: estado_inscripcion,
              id_usuario_actualiza: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,
              id_persona: id_persona,
              observaciones: this.observacion,
            })
            .then((respuesta) => {
              if (respuesta.data.status == "success") {
                if (estado_inscripcion == 4) {
                  //aprobado y listo para subir certificado
                  Swal.fire({
                    title: "El instructor aprobó la capacitación",
                    text:
                      "Ahora se debe subir sus certificados de la capacitación",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#238276",
                    customClass: {
                      confirmButton: "btn btn-azul-sena",
                    },
                  });
                } else {
                  //no aprobado la capacitación
                  Swal.fire({
                    title: "El instructor No aprobó la capacitación",
                    text:
                      "Capacitación terminada sin aprobación del curso por parte del instructor",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#238276",
                    customClass: {
                      confirmButton: "btn btn-azul-sena",
                    },
                  });
                }
              } else {
                Swal.fire({
                  title: "No se pudo realizar la acción, intentalo nuevamente",
                  icon: "error",
                  confirmButtonText: "Aceptar",
                  customClass: {
                    confirmButton: "btn btn-azul-sena",
                  },
                });
              }
              this.modalNoAprobar = false;
              this.observacion = null;
              // this.obtenerInscritos()
            })
            .catch(() => {
              Swal.fire(
                "ERROR!",
                "Se ha presentado un error en el servidor!",
                "error"
              );
            })
            .finally(() => {
              this.obtenerInscritos();
            });
        }
      });
    }

  }
</script>
<style></style>
