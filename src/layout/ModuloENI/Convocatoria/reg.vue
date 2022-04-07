 <template>
  <div class="mt-4 container-fluid">
    <button @click="registrar()">Registrar</button>
    <!-- <div v-for="(departamento, index) in departamentos.lista_departamentos" :key="index">
      {{departamento.departamento}}
    </div> -->
    <div>
      <select
        class="custom-select"
        v-model="departactual"
        @change="obtenerMunicipio(departactual)"
      >
        <option selected>Select</option>
        <option
          :value="departamento.id_departamento"
          v-for="(departamento, index) in departamentos.lista_departamentos"
          :key="index"
        >
          {{ departamento.departamento }}
        </option>
      </select>
    </div>
    <div>
      <select class="custom-select">
        <option selected>Select</option>
        <option
          v-for="(municipio, index) in municipios.lista_municipios"
          :key="index"
        >
          {{ municipio.municipio }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang='ts'>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import router from "@/router";
import index from "../HojaDeVida/Index.vue";

@Component({
  components: {},
})
export default class VerDetalleEvaluacionCpacitacion extends Vue {
  departamentos = {
    lista_departamentos: null,
  };

  municipios = {
    lista_municipios: null,
  };

  departactual = null;

  convocatoria = {
    id_pic: 68,
    fecha_inicio: "1212-12-12",
    fecha_final: "1212-12-12",
    convocatoria: "Quemadita",
    perfiles_requisitos: "uno,dos,tres,cinco",
    financiacion: "123123",
    para_funcionarios: "SI",
    pertenece_a_red: "So",
    id_usuario_autenticado: JSON.parse(sessionStorage.getItem("usuario"))
      .id_usuario,
    id_municipio: "",
  };

  faseConvocatoria = {
    id_pic_convocatoria: null,
    pic_fase_id: 1,
    id_usuario_actualiza: JSON.parse(sessionStorage.getItem("usuario"))
      .id_usuario,
  };
  mounted() {
    this.obtenerDepartamentos();
  }

  constructor() {
    super();
  }

  registrar() {
    Axios()
      .post("almacenar_convocatoria_pic", this.convocatoria)
      .then((respuesta) => {
        // this.faseConvocatoria.id_pic_convocatoria = respuesta.data.results

        // Axios().post("almacenar_fase_convocatoria_pic", this.faseConvocatoria).then((res) => {

        // })
      })
      .catch((err) => {
      });
  }

  obtenerDepartamentos() {
    Axios()
      .get("listar_departamentos/57")
      .then((respuesta) => {
        this.departamentos.lista_departamentos = respuesta.data.results;
      })
      .catch(() => {
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

  obtenerMunicipio(idepa) {
    Axios()
      .get("listar_municipios/" + idepa)
      .then((respuesta) => {
        this.municipios.lista_municipios = respuesta.data.results.municipios;
      })
      .catch(() => {
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
}
</script>

<style>
</style>
