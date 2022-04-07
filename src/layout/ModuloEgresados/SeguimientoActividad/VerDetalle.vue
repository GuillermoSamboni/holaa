<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">Seguimiento Actividad</h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Descripción del seguimiento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ gestion_actividad }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Evidencia:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ evidencia }}</p>
              </div>
            </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>id:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ id_gestion_actividad }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Fecha creado:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ creado }}</p>
            </div>
          </div>
            </div>
            <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Niño - Niña adolescente:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ nino_nina_adolecente }}</p>
            </div>
          </div>
            
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Jovenes:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ jovenes }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Adulto mayor:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ adulto_mayor }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Adolescente conflicto ley penal:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ adolescente_conflicto_ley_penal }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Victima conflicto armado:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ victima_conflicto_armado }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Adolescente trabajador:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ adolescente_trabajador }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Cabeza familia:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ cabeza_familia }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Victima desplazamiento natural:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ victima_desplazamiento_natural }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Reincorporado excombatiente:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ reincorporado_excombatiente }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Persona privada libertad:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ persona_privada_libertad }}</p>
            </div>
          
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Soldado campesino:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ soldado_campesino }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Gitano:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ gitano }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Indigena:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ indigena }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Raizal san andres:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ raizal_san_andres }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Palenquero descendiente:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ palenquero_descendiente }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Negro:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ negro }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Mulato:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ mulato }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Afrocolombiano:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ afrocolombiano }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Afrodescendiente:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ afrodescendiente }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Discapacidad fisica:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ dis_fisica }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Discapacidad auditiva:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ dis_auditiva }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Discapacidad visual:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ dis_visual }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Sordoceguera:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ sordoceguera }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Discapacidad intelectual:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ dis_intelectual }}</p>
            </div>
            </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Discapacidad psicosocial:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ dis_psicosocial }}</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Discapacidad multiple:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ dis_multiple }}</p>
            </div>
          </div>
          </div>
          <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div>
              <strong>Otros:</strong>
            </div>
            <div id="contenido">
              <p id="texto">{{ otros }}</p>
            </div>
          </div>
          </div>
          <div class="row">
            <div class="col">
              <button
                class="btn btn-azul-sena col-sm-12 col-md-3 col-lg-3"
                @click="verDocumento()"
              >
                Ver Evidencia
              </button>
            </div>
          </div>

          <!-- modal para inicio de la fecha de programacion -->

          <div class="container-fluid">
            <modal
              :show.sync="verModal"
              body-classes="p-0"
              modal-classes="justify-content-center modal-dialog-centered modal-lg-12  "
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
                body-classes="px-lg-1 py-lg-1"
                class="border-0"
              >
                <template class="row">
                  <div class="col-12">
                    <div>
                      <embed
                        :src="rutadocumento"
                        type="application/pdf"
                        width="100%"
                        height="500px"
                      />
                    </div>
                  </div>
                </template>
              </card>
            </modal>
          </div>

          <!-- modal finnnnnnnnnn -->
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
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
      evidencia: "",
      fecha_ejecucion: "",
      fecha_programacion: "",
      dis_fisica: "",
      gestion_actividad: "",
      id_gestion_actividad: "",
      creado: "",
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
      gitano: "",
      indigena: "",
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
      otros:"",

      verModal: false,
      rutadocumento: null,
    };
  },
  methods: {
    obtenerSeguimientos(id) {
      Axios()
        .get("ver_seguimiento_actividad/" + id)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.evidencia = respuesta.data.results.evidencia;
            this.fecha_ejecucion = respuesta.data.results.fecha_ejecucion;
            this.fecha_programacion = respuesta.data.results.fecha_programacion;
            this.gestion_actividad = respuesta.data.results.gestion_actividad;
            this.id_gestion_actividad =
              respuesta.data.results.id_gestion_actividad;
            this.creado = respuesta.data.results.creado;
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

            this.gitano = respuesta.data.results.gitano;
            this.indigena = respuesta.data.results.indigena;
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
            this.otros = respuesta.data.results.otros;
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
    verDocumento() {
      this.verModal = true;
      this.rutadocumento =
        "https://develdfp.cloudsenactpi.net/api/visualizar_evidencia/" +
        this.id_gestion_actividad;
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
</style>
