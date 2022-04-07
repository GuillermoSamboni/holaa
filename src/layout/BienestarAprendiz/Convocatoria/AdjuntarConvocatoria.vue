<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">Cargar Circular</h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div id="campo">
            <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <!-- nombre de la convocatoria -->
                  <div>
                    <strong>Convocatoria:</strong>
                  </div>
                  <div id="contenido">
                    <p id="texto">
                      {{ convocatoria.convocatoria }}
                    </p>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <!-- capacitación -->
                  <div>
                    <strong>Tipo de apoyo:</strong>
                  </div>
                  <div id="contenido">
                    <p id="texto">
                      {{ convocatoria.tipo_apoyo }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Volver lista de usuario -->
      </div>
      <div v-if="convocatoria.ruta_documento == 'Sin Documento'">
        <h1 class="text-azul-sena text-center">Sin documento aún</h1>
      </div>
      <div
        v-if="
          convocatoria.ruta_documento != 'Sin Documento' &&
          estadoPeticion == false
        "
      >
        <embed
          :src="rutadocumento"
          type="application/pdf"
          width="100%"
          height="600px"
        />
      </div>
      <div class="text-center" v-if="estadoPeticion">
        <!-- <h1>Cargando...</h1> -->
        <AnimacionCargando></AnimacionCargando>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div id="campo">
            <button
              class="btn bg-azul-sena mt-2 text-white"
              @click.prevent="$refs.botonResolución.click()"
            >
              Cargar Circular
            </button>

            <input
              v-show="false"
              type="file"
              ref="botonResolución"
              name="urlResolucion"
              class="form-control"
              id=""
              @change="obtenerDocumento($event)"
              required="true"
            />
          </div>

          <div id="campo" v-if="docValido">
            <button
              class="btn bg-azul-sena mt-2 text-white"
              @click="subirDocumento()"
            >
              Subir resolución
            </button>
          </div>
        </div>

        <div class="row justify-content-center mt-2">
          <div id="campo" v-if="docResolucon != null" class="col-sm-12 col-md-6 col-lg-8" >
            Documento seleccionado : {{ docResolucon.name }}
          </div>
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

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class ModificarPerfil extends Vue {
  tiposdeapoyo = [];
  tiposdemonitoria = [];
  docResolucon = null;
  docValido = false;
  rutadocumento: string = "";
  estadoPeticion = false;

  idConvocatoria = null;

  convocatoria = {
    centro_formacion_id: "",
    centro_formación: "",
    convocatoria: "",
    cupo_hombres_14_17: null,
    cupo_hombres_mayores: null,
    cupo_instructores: null,
    cupo_mujeres_14_17: null,
    cupo_mujeres_mayores: null,
    cupo_total: null,
    estimulo_mensual: "",
    fase_bienestar: "",
    fase_bienestar_id: "",
    fecha_final_convoca: "",
    fecha_inicio_convoca: "",
    id_convocatoria: "",
    ruta_documento: "",
    tipo_apoyo: "",
    tipo_apoyo_id: "",
    tipo_monitoria: "",
    tipo_monitoria_id: "",
  };

  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        // min: () => "Mínimo 8 caracteres",
        // email: () => "Correo invalido",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {
    this.idConvocatoria = this.$route.params.id;
    this.obtenerConvocatoria(this.$route.params.id);
    this.mostrarDocumento(this.$route.params.id);
  }

  mostrarDocumento(id) {
    this.rutadocumento =
      "https://develdfp.cloudsenactpi.net/api/mostrar_resolucion_convocatoria/" +
      id;
  }

  obtenerConvocatoria(id) {
    Axios()
      .get("listar_convocatoria/" + id)
      .then((respuesta) => {
        this.convocatoria = respuesta.data.results;

      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  obtenerDocumento(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.docResolucon = event.target.files[0];
        Swal.fire({
          title: "Resolución Cargada!",
          text:"Archivo cargado exitosamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
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
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }

  subirDocumento() {
    this.estadoPeticion = true;
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("documento_resolucion", this.docResolucon);
    data.append("id_convocatoria", this.$route.params.id);
    //Enviamos la petición
    Axios()
      .post(
        "almacenar_resolucion_convocatoria/" + this.$route.params.id,
        data,
        { headers: headers }
      )
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire({
            title: "Se subió la resolución!",
            text:"Archivo cargado exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          
        } else {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        }
        this.estadoPeticion = false;
        this.$router.push({ name: "GestionarConvocatoria" });
      });
  }
}
</script>