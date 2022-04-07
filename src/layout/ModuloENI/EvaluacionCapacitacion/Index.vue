<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h1 class="text-azul-sena">
              <h1 class="text-azul-sena">MIS CAPACITACIONES</h1>
            </h1>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div>
          <div class="table-responsive" v-if="estadoPeticionTabla">
            <table class="table table-hoverble">
              <thead id="listado">
                <tr>
                  <th @click="ordenar(1, 'str')">Capacitación</th>
                  <th @click="ordenar(2, 'str')" class="col-sm-4">Convocatoria</th>
                  <th @click="ordenar(3, 'str')">Fase</th>
                  <th @click="ordenar(4, 'str')">Año</th>
                  <th class="col-sm-2">Acciones</th>
                </tr>
              </thead>
              <div v-if="lista_capacitaciones.length == 0">
                <p class="text-center">No hay capacitaciones</p>
              </div>
              <tbody v-if="lista_capacitaciones.length != 0">
                <tr
                  v-for="(capacitacion, key) in lista_capacitaciones"
                  :key="key"
                >
                  <td>
                    {{ capacitacion.capacitacion }}
                  </td>
                  <td>
                    {{ capacitacion.convocatoria }}
                  </td>
                  <td>
                    {{ capacitacion.pic_estado_inscripcion }}
                  </td>
                  <td>
                    {{ capacitacion.plan_institucional_id }}
                  </td>

                  <td scope="row">
                    <div
                      class="btn-toolbar btn-responsive-table"
                      role="toolbar"
                    >
                      <div class="btn-group btn-spc"
                            tooltip="Evaluar capacitacion"
                            tooltip-flow="top">
                        <router-link
                          v-if="!capacitacion.EstaEvaluado"
                          class="btn btn-sm btn-azul-sena"
                          :to="{
                            name: 'EvaluarCapacitacion',
                            params: {
                              id_pic_inscripcion:
                                capacitacion.id_pic_inscripcion,
                            },
                          }"
                        >
                          <i class="fas fa-list-ol"></i>
                        </router-link>
                      </div>
                      
                      <div class="btn-group btn-spc"
                          tooltip="Ver capacitacion"
                          tooltip-flow="top" >
                        
                        <router-link
                          class="btn btn-sm btn-azul-sena"
                          :to="{
                            name: 'VerDetalleCapacitacion',
                            params: {
                              id: capacitacion.id_pic_convocatoria,
                            },
                          }"
                        >
                          <i class="fas fa-eye"></i>
                        </router-link>
                      </div>
                      <!-- boton cuando no ha evaluado -->
                      <div v-if="capacitacion.pic_estado_inscripcion_id == 4">
                        <div v-if="!capacitacion.EstadoCertificacion">
                          <div class="btn-group btn-spc"
                            tooltip="Subir certificado"
                            tooltip-flow="top">
                            <button
                              @click="
                                (modalSubirCertificado = true),
                                  llenarDatosPredeterminados(
                                    capacitacion.id_pic_inscripcion
                                  )
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="far fa-file-pdf"></i>
                            </button>
                          </div>
                          <modal
                            :show.sync="modalSubirCertificado"
                            body-classes="p-0"
                            modal-classes="modal-dialog-centered modal-sm modal-lg"
                          >
                            <!-- <registrarEstudio></registrarEstudio> -->

                            <!-- otro -->
                            <template slot="header">
                              <h2
                                class="text-azul-sena modal-title"
                                id="modalNovedadesAprendiz"
                              >
                                REGISTRAR DATOS
                              </h2>
                            </template>
                            <card
                              type="white"
                              shadow
                              header-classes="bg-white pb-5"
                              body-classes="px-lg-5 py-lg-5"
                              class="border-0"
                            >
                              <div
                                class="
                                  col-lg-8 col-md-10 col-sm-12
                                  offset-lg-2 offset-md-1
                                "
                              >
                                <div>
                                  <!-- Titulo Obtenido -->
                                  <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                      <label class="mt-2 font-weight-bold"
                                        >Título Obtenido<span
                                          class="text-danger"
                                          >*</span
                                        >:</label
                                      >
                                      <div class="input-group">
                                        {{ datosEducacion.titulo_obtenido }}
                                      </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                      <label class="mt-2 font-weight-bold"
                                        >Tipo De Educación<span
                                          class="text-danger"
                                          >*</span
                                        >:</label
                                      >
                                      <div class="form-group">Formal</div>
                                    </div>
                                  </div>
                                  <!-- Fechas -->
                                  <div class="row">
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                      <label class="mt-2 font-weight-bold"
                                        >Fecha Inicio<span class="text-danger"
                                          >*</span
                                        >:</label
                                      >
                                      <div class="input-group">
                                        {{ datosEducacion.fecha_inicio }}
                                      </div>
                                    </div>
                                    <div class="col-sm-12 col-md-6 col-lg-6">
                                      <label class="mt-2 font-weight-bold"
                                        >Fecha de Fin<span class="text-danger"
                                          >*</span
                                        >:</label
                                      >
                                      <div class="form-group">
                                        {{ datosEducacion.fecha_fin }}
                                      </div>
                                    </div>
                                  </div>
                                  <!-- Institucion -->
                                  <div>
                                    <label class="mt-2 font-weight-bold">
                                      Institución
                                      <span
                                        class="text-danger font-weigth-bold"
                                        tooltip="Campo Requerido" tooltip-flow="top"
                                        >*</span
                                      >:
                                    </label>
                                    <div class="input-group">
                                      <input
                                        type="text"
                                        name="institucion"
                                        class="form-control"
                                        placeholder="Nombre de la institución"
                                        v-model="datosEducacion.institucion"
                                        v-validate="{
                                          required: true,
                                        }"
                                      />
                                    </div>
                                    <small
                                      v-show="errors.has('institucion')"
                                      class="text-danger font-weigth-bold"
                                    >
                                      {{ errors.first("institucion") }}
                                    </small>
                                  </div>

                                  <!-- adjunto -->
                                  <!-- certificado -->
                                  <br />
                                  <!-- jeffer -->
                                  <!-- <div id="campo">
                                    <label class="mt-2 font-weight-bold">
                                      Certificaciones </label
                                    ><span
                                      class="text-danger font-weigth-bold"
                                      title="Campo Requerido"
                                      >*</span
                                    >:
                                    <span class="">
                                      <div
                                        class="
                                          custom-input-file
                                          tam-completo
                                          btn btn-sm
                                        "
                                      >
                                        <input
                                          type="file"
                                          id="requisito"
                                          class="input-file"
                                          accept="application/pdf"
                                          value=""
                                          required="true"
                                          @change.prevent="
                                            obtenerDocumento($event)
                                          "
                                        />
                                        <i class="fas fa-file-upload"></i>
                                        <span>Certificado</span>
                                      </div>
                                    </span>

                                    <small
                                      v-show="errors.has('certificado')"
                                      class="text-danger"
                                    >
                                      {{ errors.first("certificado") }}
                                    </small>
                                  </div>                                   -->
                                  <div id="campo">
                                    <label class="mt-2 font-weight-bold">
                                      Certificación</label
                                    ><span
                                      class="text-danger font-weigth-bold"
                                      title="Campo Requerido"
                                      >*</span
                                    >:
                                    <div class="button-wrapper">
                                      <span class="label btn bg-azul-sena">
                                        Certificado
                                      </span>

                                      <input
                                        type="file"
                                        name="requisito"
                                        id="requisito"
                                        class="upload-box"
                                        accept="application/pdf"
                                        value=""
                                        v-validate="{ required }"
                                        @change.prevent="
                                          obtenerDocumento($event)
                                        "
                                      />
                                    </div>
                                    <small
                                      v-show="errors.has('requisito')"
                                      class="text-danger"
                                    >
                                      {{ errors.first("requisito") }}
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div class="card-footer">
                                <div class="row justify-content-center">
                                  <div class="col-lg-4 col-sm-12 mt-1">
                                    <base-button
                                      type="azul-sena"
                                      @click="validarFormulario()"
                                      class="
                                        btn btn-block
                                        bg-azul-sena
                                        text-white
                                      "
                                      >Registrar</base-button
                                    >
                                  </div>
                                  <div class="col-lg-4 col-sm-12 mt-1">
                                    <a
                                      class="
                                        btn btn-block
                                        bg-azul-sena
                                        text-white
                                      "
                                      @click="$router.back()"
                                    >
                                      Volver
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </card>
                            <!-- otro -->
                          </modal>
                        </div>
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
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";
// import registrarEstudio from "../HojaDeVida/Educacion/RegistrarEducacionPersona.vue";

@Component({
  components: {
    // registrarEstudio,
    AnimacionTablasCargando,
  },
})
export default class Login extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;

  docValido = false;
  estadoPeticion = false;
  estadoPeticionTabla = false;
  lista_capacitaciones = [];
  modalSubirCertificado = false;
  datosEducacion = {
    actualizado: "",
    certificado: "",
    creado: "",
    fecha_fin: "",
    fecha_inicio: "",
    id_educacion: "",
    institucion: "",
    persona_id: "",
    tipo_educacion: "",
    titulo_obtenido: "",
    pic_inscripcion_id: "",
  };

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

  mounted() {
    this.obtenerCapacitacionesEni();
  }

  obtenerCapacitacionesEni() {
    Axios()
      .get("listar_mis_capacitaciones/" + this.id_persona_logeada)
      .then((respuesta) => {

        this.lista_capacitaciones = respuesta.data;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  //métodos registrar educación con certificado
  registrarEducacionPersona() {
    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("persona_id", this.id_persona_logeada);
    data.append("titulo_obtenido", this.datosEducacion.titulo_obtenido);
    data.append("institucion", this.datosEducacion.institucion);
    data.append("fecha_inicio", this.datosEducacion.fecha_inicio);
    data.append("fecha_fin", this.datosEducacion.fecha_fin);
    data.append("certificado", this.datosEducacion.certificado);
    data.append("tipo_educacion", this.datosEducacion.tipo_educacion);
    data.append("pic_inscripcion_id", this.datosEducacion.pic_inscripcion_id);

    Axios()
      .post("almacenar_educacion_persona", data, { headers: headers })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Educación Guardada",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.modalSubirCertificado = false;
          this.obtenerCapacitacionesEni();
          // this.$router.push({ name: "GestionarCapacitacionENI" });
          // this.$router.back();
        } else {
          Swal.fire({
            title: "No se Guardo La Educación",
            icon: "error",
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
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.registrarEducacionPersona();
      }
    });
  }

  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.datosEducacion.certificado = event.target.files[0];
        Swal.fire(
          "Certificado Cargado!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
        // this.docResolucon = null;
      } else {
        this.docValido = false;
        this.datosEducacion.certificado = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.datosEducacion.certificado = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }

  llenarDatosPredeterminados(id_pic_inscripcion) {
    // this.datosEducacion = {
    this.datosEducacion.fecha_fin = this.lista_capacitaciones[0].fecha_final;
    this.datosEducacion.fecha_inicio = this.lista_capacitaciones[0].fecha_inicio;
    this.datosEducacion.tipo_educacion = "1";
    this.datosEducacion.titulo_obtenido = this.lista_capacitaciones[0].convocatoria;
    this.datosEducacion.pic_inscripcion_id = id_pic_inscripcion;

    // };
  }
  //---------------------------------------------------------------------------
}
</script>

<style>
.button-wrapper {
  position: relative;
  width: 150px;
  text-align: center;
}

.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 10px 0;
  font-size: 13px;
  color: #ffffff;
}

#requisito {
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
/* style 1 */

/*fin estilos de input file */
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

.campos .acciones {
  width: 100px;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
}
</style>
