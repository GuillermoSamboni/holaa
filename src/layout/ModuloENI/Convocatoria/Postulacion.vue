<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA INSCRITOS</h1>
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
        <div class="mb-3">
          <button
            class="btn btn-azul-sena col-12 col-md-6 col-lg-4"
            @click="cambiarEstadoConvocatoria()"
            v-if="listaInscripciones != []"
          >
            Finalizar adjudicaciones
          </button>

          <!-- <input type="text" class="form-control col-3" placeholder="buscar" v-model="filter" /> -->
          <paginate-links
            class="pagination justify-content-end"
            for="listaInscripciones"
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
        <div
          class="text-center"
          v-if="estadoPeticion && listaInscripciones == []"
        >
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div v-if="listaInscripciones == null">
          <h5 class="text-azul-sena">No hay Inscritos en esta convocatoria</h5>
        </div>
        <div class="table-responsive" v-if="!estadoPeticion">
          <paginate
            ref="paginator"
            name="listaInscripciones"
            :list="listaInscripciones"
            :per="10"
          >
            <table v-if="listaInscripciones != []" class="table table-hoverble">
              <thead id="listado">
                <tr>
                  <th scope="col">Identificación</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Prioridad</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(inscrito, key) in filtrar(
                    paginated('listaInscripciones')
                  )"
                  :key="key"
                >
                  <td>
                    {{ inscrito.persona.identificacion }}
                  </td>
                  <td>
                    {{ inscrito.persona.primer_nombre }}
                    {{ inscrito.persona.segundo_nombre }}
                    {{ inscrito.persona.primer_apellido }}
                    {{ inscrito.persona.segundo_apellido }}
                  </td>
                  <td v-if="inscrito.categorizado < 3">
                    {{ inscrito.categorizado }}
                  </td>
                  <td v-if="inscrito.categorizado > 3">3</td>
                  <td>
                    {{ inscrito.pic_estado_inscripcion.pic_estado_inscripcion }}
                  </td>

                  <td scope="row">
                    <div class="btn-toolbar btn-responsive-table">
                      <div
                        class="btn-group btn-spc"
                        tooltip="Adjudicar"
                        tooltip-flow="top"
                        v-if="
                          inscrito.pic_estado_inscripcion
                            .pic_estado_inscripcion == 'Inscrito'
                        "
                      >
                        <!-- botón para adjudicar -->
                        <button
                          class="btn btn-sm bg-azul-sena text-white"
                          @click="
                            (modalAdjudicar = true),
                              (idPersonaModal = inscrito.persona.id_persona),
                              (observacion = null);
                            obtenerRequisitos(
                              //mandar de la lista con el index del vector para que quede bien
                              inscrito.persona.id_persona,
                              inscrito.id_pic_inscripcion,
                              inscrito
                            );
                            obtenerInscritos(inscrito.persona.id_persona, true);
                          "
                        >
                          <i class="fas fa-check-square"></i>
                        </button>

                        <modal
                          :show.sync="modalAdjudicar"
                          body-classes="p-0"
                          modal-classes="modal-dialog-centered modal-sm modal-lg"
                        >
                          <template slot="header">
                            <h1
                              class="text-azul-sena modal-title"
                              id="modalNovedadesAprendiz"
                            >
                              Lista requisitos Instructor
                            </h1>
                          </template>
                          <card
                            type="white"
                            shadow
                            header-classes="bg-white"
                            body-classes="px-lg-5 py-lg-5"
                            class="border-0"
                          >
                            <div>
                              <span class="text-azul-sena">
                                Nombre: {{ inscritoPersonaActual.primer_nombre }}
                                {{ inscritoPersonaActual.segundo_nombre }}
                                {{ inscritoPersonaActual.primer_apellido }}
                                {{ inscritoPersonaActual.segundo_apellido }}
                              </span>
                              <span class="text-azul-sena">
                                Cédula:
                                {{ inscritoPersonaActual.identificacion }}
                              </span>
                            </div>
                            <template class="row">
                              <div id="campo">
                                <!-- lisatdo de requisitos -->
                                <table
                                  class="table table table-hover table-inverse"
                                >
                                  <thead
                                    class="bg-gradient-naranja-sena text-white"
                                    id="listado"
                                  >
                                    <tr>
                                      <th class="text-nowrap">Requisito</th>
                                      <th class="text-nowrap">Acciones</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(requisito,
                                      key) in requisitosInstructor"
                                      :key="key"
                                    >
                                      <td>{{ requisito.anexo }}</td>
                                      <td>
                                        <span
                                          v-b-tooltip.hover.top
                                          title="Ver documento"
                                        >
                                          <b-button
                                            class="
                                              btn btn-sm
                                              bg-azul-sena
                                              text-white
                                            "
                                            @click="
                                              (modalRequisito = true),
                                                mostrarDocumento(
                                                  requisito.id_pic_requisito_instructor
                                                )
                                            "
                                          >
                                            <i class="fas fa-eye"></i>
                                          </b-button>
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- observación de que se acepta o no el inscrito -->
                                <div id="campo">
                                  <label class="font-weight-bold">
                                    ¿Por qué es o no aceptado?
                                    <span class="text-danger">*</span>
                                    :
                                  </label>

                                  <div>
                                    <base-input
                                      v-model="observacion"
                                      class="input-group mb-3"
                                      placeholder="Observación*"
                                      addon-left-icon=""
                                      name="observacion"
                                      id="observacion"
                                      v-validate="'required'"
                                    ></base-input>
                                    <!-- <small
                                        v-show="errors.has('observacion')"
                                        class="text-danger"
                                        >{{
                                          errors.first("observacion")
                                        }}</small
                                      > -->
                                  </div>
                                  <small>
                                    Importante: Está acción no tiene vuelta
                                    atrás.
                                  </small>
                                </div>

                                <button
                                  class="
                                    btn btn-azul-sena
                                    col-12 col-md-6 col-lg-4
                                    mt-2 mr-4
                                  "
                                  @click="
                                    adjudicarInstructorConvocatoria(
                                      idPersonaModal,
                                      true
                                    )
                                  "
                                >
                                  Adjudicar
                                </button>
                                <button
                                  class="
                                    btn btn-azul-sena
                                    col-12 col-md-6 col-lg-4
                                    mt-2
                                  "
                                  @click="
                                    adjudicarInstructorConvocatoria(
                                      listaInscripciones[key].persona
                                        .id_persona,
                                      false
                                    )
                                  "
                                >
                                  No aprobado
                                </button>
                              </div>
                            </template>
                          </card>
                        </modal>
                      </div>

                      <div
                        class="btn-group btn-spc"
                        tooltip="Desadjudicar"
                        tooltip-flow="top"
                        v-if="
                          inscrito.pic_estado_inscripcion
                            .pic_estado_inscripcion == 'Adjudicado'
                        "
                      >
                        <!-- botón para adjudicar -->
                        <button
                          class="btn btn-sm bg-azul-sena text-white"
                          @click="
                            adjudicarInstructorConvocatoria(
                              inscrito.persona.id_persona,
                              true
                            )
                          "
                        >
                          <i class="fas fa-minus-square"></i>
                        </button>
                      </div>

                      <div
                        class="btn-group btn-spc"
                        tooltip="Ver Inscrito"
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
                          <i class="fas fa-eye"></i>
                        </router-link>
                      </div>
                    </div>

                    <modal
                      :show.sync="modalRequisito"
                      body-classes="p-0"
                      modal-classes="modal-dialog-centered modal-sm modal-lg"
                    >
                      <template slot="header">
                        <h1
                          class="text-azul-sena modal-title"
                          id="modalNovedadesAprendiz"
                        >
                          Requisito
                        </h1>
                      </template>
                      <embed
                        :src="rutadocumento"
                        type="application/pdf"
                        width="100%"
                        height="600px"
                      />
                    </modal>
                  </td>
                </tr>
              </tbody>
            </table>
          </paginate>
          <!-- <h4 class="" v-else-if="!estadoPeticion">No tienes acceso!</h4> -->
        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="listaInscripciones"
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
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class Login extends Vue {
  idPersonaModal = "";
  estadoPeticion = true;
  listaInscripciones = [];
  paginate = ["listaInscripciones"];
  filter = "";
  fecha_pic = "2021";
  fechas_pic = [];
  listaAdjudicados: any = [];
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
  modalAdjudicar = false;

  verDetalle = null;

  idPersonaActual = null;
  idInscripcionActual = null;

  requisitosInstructor = null;
  rutadocumento = null;
  modalRequisito = false;
  inscritoPersonaActual={
    correo : "",
    id_persona: null,
    identificacion: null,
    primer_apellido: "",
    primer_nombre: "",
    segundo_apellido: "",
    segundo_nombre: ""
  };

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

  mounted() {
    this.obtenerPic(this.$route.params.id);
    this.obtenerInscritos();
  }

  mostrarDocumento(id) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/visualizar_requisito_pic/" + id;
  }

  obtenerRequisitos(idPersona, idInscripcion, inscrito) {
    // alert(idPersona + " " + idInscripcion);
    Axios()
      .post("obtener_rutas_requisitos", {
        id_persona: idPersona,
        id_pic_inscripcion: idInscripcion,
      })
      .then((respuesta) => {
        this.requisitosInstructor = respuesta.data.results;
        // recorrer pdf de in idPersona
        // this.mostrarDocumento(this.requisitosInstructor[0].id_requisito);  
                 
        for (let i = 0; i < this.requisitosInstructor.length; i++) {
          this.mostrarDocumento(this.requisitosInstructor[i].id_requisito);
        }
        this.inscritoPersonaActual = inscrito.persona
        
      })
      .catch((err) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  obtenerInscritos() {
    let id = this.$route.params.id;
    Axios()
      .get("listar_inscripciones_pic/" + id)
      .then((respuesta) => {
        this.listaInscripciones = respuesta.data.results;           
        if (respuesta.data.status == "success") {
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
        this.$router.push("/GestionarConvocatoriaENI");
      });
  }

  // verDatos() {
  //   this.nombre = this.$route.params.persona;
  // }

  obtenerPic(id) {
    Axios()
      .get("editar_convocatoria_pic/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.convocatoria = respuesta.data.results;
        }
        // else {
        //   Swal.fire({
        //     title: "Hay un problema",
        //     text: respuesta.data.message,
        //     icon: "error"
        //   });
        //   this.$router.push("GestionarConvocatoriaENI");
        // }
      });
  }

  adjudicarInstructorConvocatoria(id, esAprobado) {
    // alert(id);
    Axios()
      .post("adjudicar_persona_pic", {
        id_pic_convocatoria: this.$route.params.id,
        id_persona: id,
        id_usuario_autenticado: JSON.parse(sessionStorage.getItem("usuario"))
          .id_usuario,
        //observaciones pedir servicio aquí
        aprobado: esAprobado,
        observaciones: this.observacion,
      })
      .then((respuesta) => {
        if (
          respuesta.data.message != "El aprendiz ya no se encuentra adjudicado"
        ) {
          Swal.fire({
            title: "Usuario " + this.nombre + " adjudicado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.adjudicar = false;
        }
      })
      .then(() => {
        this.obtenerInscritos();
      })
      .catch((err) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
    this.observacion = null;
    this.modalAdjudicar = false;
  }
  cambiarEstadoConvocatoria() {
    const id_usuario = JSON.parse(sessionStorage.getItem("usuario"));
    Axios()
      .put("/actualizar_fase_pic/" + this.$route.params.id, {
        id_pic_convocatoria: this.$route.params.id,
        pic_fase_id: 4,
        id_usuario_actualiza: id_usuario.id_usuario,
      })
      .then(() => {
        Swal.fire({
          title: "Convocatoria ",
          text: " pasó a fase de Terminación",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
          icon: "success",
        });
        this.$router.back();
      })
      .catch(() => {
        Swal.fire({
          title: "ERROR",
        });
      });
  }

  filtrar(lista: any[]) {
    let resp;
    if (this.filter != "") {
      resp = lista.filter(
        (item) =>
          item.capacitacion
            .substring(0, this.filter.length)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") === this.filter.toLowerCase()
      );
    } else {
      resp = lista;
    }
    return resp;
  }
  ordenar(n: number, type: string) {
    let rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;

    const table: any = document.getElementById("listado");
    switching = true;
    dir = "asc";

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (
            (type == "str" &&
              x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
            (type == "int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))
          ) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (
            (type == "str" &&
              x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) ||
            (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))
          ) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
</script>
<style></style>
