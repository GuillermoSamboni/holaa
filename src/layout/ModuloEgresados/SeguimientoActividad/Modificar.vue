<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR SEGUIMIENTO</h1>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div id="campo">
              <label class="mt-2 font-weight-bold"
                >Seguimiento de la actividad
                <span class="text-danger">*</span>:</label
              >
              <div>
                <textarea
                  class="form-control mb-3"
                  v-model="gestion_actividad"
                  name="gestion_actividad"
                  id="gestion_actividad"
                  v-validate="'required'"
                ></textarea>
                <small
                  v-show="errors.has('gestion_actividad')"
                  class="text-danger"
                  >{{ errors.first("gestion_actividad") }}
                </small>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="campo">
              <label class="mt-2 font-weight-bold"
                >Evidencia<span class="text-danger">*</span>:</label
              >
              <input
                type="text"
                v-validate="{ required: true }"
                v-model="evidencia"
                name="evidencia"
                id="evidencia"
                placeholder="ingrese el nombre de la evidencia"
                class="form-control"
              />
              <small v-show="errors.has('evidencia')" class="text-danger"
                >{{ errors.first("evidencia") }}
              </small>
            </div>
          </div>
        </div>
        <!-- Espacio de nuevos campos -->
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Niños, niñas - adolescentes<span class="text-danger">*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="nino_nina_adolecente"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Jóvenes<span class="text-danger">*</span>:</strong>
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="jovenes"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Adulto mayor<span class="text-danger">*</span>:</strong>
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="adulto_mayor"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Adolescente en conflicto con la ley penal<span
                  class="text-danger"
                  >*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="adolescente_conflicto_ley_penal"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Víctimas de conflicto armado<span class="text-danger">*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="victima_conflicto_armado"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Adolescente trabajador<span class="text-danger">*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="adolescente_trabajador"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Cabeza de familia<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="cabeza_familia"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Víctimas desplazamiento natural<span class="text-danger"
                  >*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="victima_desplazamiento_natural"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Reincorporados y Excombatientes<span class="text-danger"
                  >*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="reincorporado_excombatiente"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Personas privadas de la libertad<span class="text-danger"
                  >*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="persona_privada_libertad"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Fuerzas Militares y la Policía Nacional<span
                  class="text-danger"
                  >*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="fuerza_militar_policia_nacional"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Soldados campesinos<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="soldado_campesino"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Indígena<span class="text-danger">*</span>:</strong>
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="indigena"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Gitano<span class="text-danger">*</span>:</strong>
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="gitano"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Raizal del Archipiélago de San Andrés, Providencia y Santa
                Catalina<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="raizal_san_andres"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Palenquero(a) de San Basilio o descendiente<span
                  class="text-danger"
                  >*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="palenquero_descendiente"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Negro(a)<span class="text-danger">*</span>:</strong>
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="negro"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Mulato(a)<span class="text-danger">*</span>:</strong>
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="mulato"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Afrocolombiano(a)<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="afrocolombiano"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Afrodescendiente<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="afrodescendiente"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Discapacidad física<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="dis_fisica"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Discapacidad auditiva<span class="text-danger">*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="dis_auditiva"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Discapacidad visual<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="dis_visual"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Sordoceguera<span class="text-danger">*</span>:</strong>
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="sordoceguera"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Discapacidad intelectual<span class="text-danger">*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="dis_intelectual"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Discapacidad psicosocial<span class="text-danger">*</span
                >:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="dis_psicosocial"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong
                >Discapacidad múltiple (física, sensorial, mental,
                intelectual)<span class="text-danger">*</span>:</strong
              >
            </div>
            <div id="contenido">
              <div id="texto">
                <input
                  type="number"
                  v-model="dis_multiple"
                  placeholder="ingrese el"
                  class="form-control mb-3"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- fin Espacio de nuevos campos -->

        <div class="row">
          <div class="col-lg-5 col-md-6 col-sm-6 mt-1">
            <div>
              <input
                type="file"
                name="cargar_archivo"
                id="cargar_archivo"
                class=" d-none"
                @change="obtenerDocumento($event)"
                accept="application/pdf"
              />
              <label class=" btn btn-azul-sena" for="cargar_archivo"
                >cargar archivo</label
              >
            </div>
          </div>

          <div class="col-lg-7 col-md-6 col-sm-12  mt-2">
            <base-button
              tooltip="Ver Evidencia"
              tooltip-flow="top"
              type="azul-sena"
              @click="mirarModal()"
              class="btn ver-evidencia btn-block bg-azul-sena text-white"
              ><i class="fas fa-eye"></i
            ></base-button>
          </div>
        </div>

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
                EVIDENCIA
              </h2>
            </template>
            <card
              type="white"
              shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0 "
            >
              <template class="row">
                <div v-if="docVista != null">
                  <embed
                    :src="docVista"
                    type="application/pdf"
                    width="100%"
                    height="450px"
                  />
                </div>
                <p v-else>no hay evidencia cargada</p>
              </template>
            </card>
          </modal>
        </div>
      </div>

      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click.prevent="validarFormulario()"
              class="btn btn-block bg-azul-sena text-white"
              >Actualizar</base-button
            >
          </div>
          <div class="col-lg-4 col-sm-12 mt-1">
            <button
              class="btn btn-block bg-azul-sena text-white"
              @click="enviarIdActividad()"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "@/components/animacionCargando.vue";

export default {
  components: {
    AnimacionCargando,
  },
  mounted() {
    this.id_actividad = this.$route.params.actividad_id;
    this.obtenerSeguimientos(this.$route.params.id);
    this.nombreActividad = this.$route.params.nombreActividad;

    // this.cargarSeguimientos(this.id_actividad);
  },

  data() {
    return {
      nombreActividad: "",
      id_actividad: 0,
      id_gestion_actividad: "",
      //variables del form data
      evidencia: "",
      gestion_actividad: "",
      docResolucon: "",
      docVista: null,
      verModal: false,

      // enfoque
      nino_nina_adolecente: "",
      jovenes: "",
      adulto_mayor: "",
      adolescente_conflicto_ley_penal: "",
      victima_conflicto_armado: "",
      adolescente_trabajador: "",
      cabeza_familia: "",
      victima_desplazamiento_natural: "",
      reincorporado_excombatiente: "",
      persona_privada_libertad: "",
      fuerza_militar_policia_nacional: "",
      soldado_campesino: "",
      indigena: "",
      gitano: "",
      raizal_san_andres: "",
      palenquero_descendiente: "",
      negro: "",
      mulato: "",
      afrocolombiano: "",
      afrodescendiente: "",
      dis_fisica: "",
      dis_auditiva: "",
      dis_visual: "",
      sordoceguera: "",
      dis_intelectual: "",
      dis_psicosocial: "",
      dis_multiple: "",
    };
  },
  methods: {
    obtenerSeguimientos(id) {
      Axios()
        .get("editar_seguimiento_actividad/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.id_gestion_actividad =
              respuesta.data.results.id_gestion_actividad;
            this.evidencia = respuesta.data.results.evidencia;
            this.gestion_actividad = respuesta.data.results.gestion_actividad;
            //asigno la ruta del documento que me llega del servidor
            // Que pereza poner todos esos campos ;)
            this.nino_nina_adolecente =
              respuesta.data.results.nino_nina_adolecente;
            this.jovenes = respuesta.data.results.jovenes;
            this.adulto_mayor = respuesta.data.results.adulto_mayor;
            this.adolescente_conflicto_ley_penal =
              respuesta.data.results.adolescente_conflicto_ley_penal;
            this.victima_conflicto_armado =
              respuesta.data.results.victima_conflicto_armado;
            this.adolescente_trabajador =
              respuesta.data.results.adolescente_trabajador;
            this.cabeza_familia = respuesta.data.results.cabeza_familia;
            this.victima_desplazamiento_natural =
              respuesta.data.results.victima_desplazamiento_natural;
            this.reincorporado_excombatiente =
              respuesta.data.results.reincorporado_excombatiente;
            this.persona_privada_libertad =
              respuesta.data.results.persona_privada_libertad;
            this.fuerza_militar_policia_nacional =
              respuesta.data.results.fuerza_militar_policia_nacional;
            this.soldado_campesino = respuesta.data.results.soldado_campesino;
            this.indigena = respuesta.data.results.indigena;
            this.gitano = respuesta.data.results.gitano;
            this.raizal_san_andres = respuesta.data.results.raizal_san_andres;
            this.palenquero_descendiente =
              respuesta.data.results.palenquero_descendiente;
            this.negro = respuesta.data.results.negro;
            this.mulato = respuesta.data.results.mulato;
            this.afrocolombiano = respuesta.data.results.afrocolombiano;
            this.afrodescendiente = respuesta.data.results.afrodescendiente;
            this.dis_fisica = respuesta.data.results.dis_fisica;
            this.dis_auditiva = respuesta.data.results.dis_auditiva;
            this.dis_visual = respuesta.data.results.dis_visual;
            this.sordoceguera = respuesta.data.results.sordoceguera;
            this.dis_intelectual = respuesta.data.results.dis_intelectual;
            this.dis_psicosocial = respuesta.data.results.dis_psicosocial;
            this.dis_multiple = respuesta.data.results.dis_multiple;
            this.docVista =
              "https://develdfp.cloudsenactpi.net/api/visualizar_evidencia/" +
              this.id_gestion_actividad;
          }
          if (respuesta.data.status == "info") {
            Swal.fire({
              title: "Informacion",
              text: respuesta.data.message,
              icon: "warning",
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
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

      // this.docVista ="https://develdfp.cloudsenactpi.net/api/visualizar_evidencia/" +
      //   this.id_gestion_actividad;
    },

    vistaPreviaEvidencia() {
      if (this.docResolucon != "") {
        this.docVista = URL.createObjectURL(this.docResolucon);
      }
    },

    mirarModal() {
      this.verModal = true;
      this.vistaPreviaEvidencia();
    },

    obtenerDocumento(event) {
      if (event.target.files[0].size <= 5000000) {
        //5mb tope
        let extDoc = event.target.files[0].name
          .toString()
          .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
        if (extDoc == ".pdf") {
          this.docResolucon = event.target.files[0];
          this.docVista = null;
          Swal.fire("Pdf Cargado!", "Archivo cargado exitosamente!", "success");
          this.docValido = true;
          // this.docResolucon = null;
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
          "El archivo cargado pesa más de 5 MegaBytes!",
          "error"
        );
      }
    },

    //pruebas

    //pruebas

    actualizarSeguimiento() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      var data = new FormData();

      data.append("id_gestion_actividad", this.id_gestion_actividad);
      data.append("documento", this.docResolucon);
      data.append("gestion_actividad", this.gestion_actividad);
      data.append("evidencia", this.evidencia);

      // enfoque
      data.append("nino_nina_adolecente", this.nino_nina_adolecente);
      data.append("jovenes", this.jovenes);
      data.append("adulto_mayor", this.adulto_mayor);
      data.append("palenquero_descendiente", this.palenquero_descendiente);
      data.append(
        "adolescente_conflicto_ley_penal",
        this.adolescente_conflicto_ley_penal
      );
      data.append("victima_conflicto_armado", this.victima_conflicto_armado);
      data.append("adolescente_trabajador", this.adolescente_trabajador);
      data.append("cabeza_familia", this.cabeza_familia);
      data.append(
        "victima_desplazamiento_natural",
        this.victima_desplazamiento_natural
      );
      data.append(
        "reincorporado_excombatiente",
        this.reincorporado_excombatiente
      );
      data.append("persona_privada_libertad", this.persona_privada_libertad);
      data.append(
        "fuerza_militar_policia_nacional",
        this.fuerza_militar_policia_nacional
      );
      data.append("soldado_campesino", this.soldado_campesino);

      data.append("indigena", this.indigena);
      data.append("gitano", this.gitano);
      data.append("raizal_san_andres", this.raizal_san_andres);
      data.append("negro", this.negro);
      data.append("mulato", this.mulato);
      data.append("afrocolombiano", this.afrocolombiano);
      data.append("afrodescendiente", this.afrodescendiente);

      data.append("dis_fisica", this.dis_fisica);
      data.append("dis_auditiva", this.dis_auditiva);
      data.append("dis_visual", this.dis_visual);
      data.append("sordoceguera", this.sordoceguera);
      data.append("dis_intelectual", this.dis_intelectual);
      data.append("dis_psicosocial", this.dis_psicosocial);
      data.append("dis_multiple", this.dis_multiple);

      Axios()
        .post(
          "actualizar_seguimiento_actividad/" + this.id_gestion_actividad,
          data,
          {
            headers: headers,
          }
        )
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            Swal.fire({
              title: "Seguimiento Actualizado",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            const actividad_id = this.id_actividad;
            this.$router.push({
              name: "GestionarSeguimientoActividad",
              params: { actividad_id },
            });
          }
          if (respuesta.data.status == "info") {
            Swal.fire({
              title: "Informacion",
              text: respuesta.data.message,
              icon: "warning",
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
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
    },
    //por el ver detalle le envio el id del seguimiento y el id de la actividad
    enviarIdActividad() {
      const actividad_id = this.id_actividad;
      const nombreActividad = this.nombreActividad;
      this.$router.push({
        name: "GestionarSeguimientoActividad",
        params: { actividad_id, nombreActividad },
      });
    },

    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          //   this.RegistrarActividad();
          this.actualizarSeguimiento();
        }
      });
    },
  },
};
</script>

<style scoped>
#contenido {
  text-align: center;
}
#texto {
  text-align: justify;
}
.ver-evidencia {
  display: flex;
  width: 60px;
}
</style>
