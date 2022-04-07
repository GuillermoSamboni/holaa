<template>
  <div>
    <div class="mt-4 container-fluid">
      <div class="card">
        <div v-if="!estadoPeticion">
          <div class="card-header">
            <h1 class="text-azul-sena">CAPACITACIÓN PIC</h1>
          </div>
          <div class="card-body"></div>

          <div class="text-center">
            <AnimacionCargando></AnimacionCargando>
          </div>
        </div>
        <div class="card" v-if="estadoPeticion">
          <div class="card-header">
            <h1 class="text-azul-sena">CAPACITACIÓN PIC</h1>
          </div>
          <div class="card-body">
            <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-3 offset-md-1">
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong> Nombre de la capacitación:</strong>
                  </div>
                  <div id="contenido">
                    <p id="texto">{{ capacitacion.capacitacion }}</p>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Año de vigencia:</strong>
                  </div>
                  <div id="contenido">
                    <p id="texto">{{ capacitacion.plan_institucional_id }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Eje:</strong>
                  </div>
                  <div id="contenido">
                    <p id="texto">{{ capacitacion.pic_eje.eje }}</p>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Tipo de capacitación:</strong>
                  </div>
                  <div id="contenido">
                    <p id="texto">{{ capacitacion.pic_tipo.pic_tipo }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-sm-6 col-md-6 col-lg-6">
                <table class="table table-hoverble">
                  <thead id="listado">
                    <tr>
                      <th class="text-nowrap">Areas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        area, key
                      ) in capacitacion.pic_rel_capacitacion_red"
                      :key="key"
                    >
                      <td>
                        {{ area.area_ruta.area_ruta }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-sm-12 mt-1">
                <router-link
                  class="btn btn-block bg-azul-sena text-white"
                  :to="{
                    name: 'GestionarPICENI',
                  }"
                >
                  Volver
                </router-link>
              </div>
            </div>
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
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class VerDetalleEvaluacionCpacitacion extends Vue {
  estadoPeticion = false;
  areasAsociadas = [];
  ver: any = false;
  areas: any[] = [];
  picTipos: any[] = [];
  redesConocimiento: any[] = [];
  capacitacion = {
    capacitacion: "",
    componentes: "",
    id_area_ruta: "",
    id_pic: "",
    plan_institucional_id: "",
    tipo_pic: "",
    eje: "",
    id_eje: "",
  };
  requisito = "";
  id_capacitacion = "";
  async mounted() {
    await Axios()
      .get("/crear_pic")
      .then((respuesta) => {
        this.areas = respuesta.data.results.areas;
        this.picTipos = respuesta.data.results.picTipos;
        this.redesConocimiento = respuesta.data.results.redesConocimiento;
      });
    // this.capacitacion.id_pic = this.$route.params.id;

    await this.obtenerPic(this.$route.params.id);
    // await this.verRedesPIC();
  }
  async obtenerPic(id) {
    await Axios()
      .get("detalle_pic/" + id)
      .then((respuesta) => {

        if (respuesta.data.status == "success") {
          this.capacitacion = respuesta.data.results;
        } else {
          Swal.fire({
            title: "No se obtuvo Capacitación",
            text: respuesta.data.message,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          }).then(() => {

            this.verRedesPIC(this.capacitacion.id_pic);
            this.$router.back();
          });
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  verRedesPIC(id_pic) {
    Axios()
      .get("listar_redes/" + id_pic)
      .then((respuesta) => {
        this.areasAsociadas = respuesta.data.results;
      });
  }
  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "Fecha mayor o igual a 2020",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite números ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  verPIC() {
    Swal.fire({
      title: "PIC visto",
      icon: "success",
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton: "btn btn-azul-sena",
      },
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

#contenido {
  text-align: center;
}
#texto {
  text-align: justify;
}
</style>
