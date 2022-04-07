<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">PIC EJE</h1>
      </div>
      <div v-if="!estado">
        <AnimacionCargando />
      </div>
      <div class="card-body" v-if="estado">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Id Eje:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ pic_eje.id_eje }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Eje:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ pic_eje.eje }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarPICEje',
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
import AnimacionCargando from "@/components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class VerDetallePicEje extends Vue {
  estadoPeticion = false;

  ver: any = false;
  areas: any[] = [];
  picTipos: any[] = [];
  redesConocimiento: any[] = [];
  estado = false;

  pic_eje = {
    id_eje: "",
    eje: "",
  };

  mounted() {
    this.obtenerPicEje(this.$route.params.id);
  }

  obtenerPicEje(id_eje) {
    Axios()
      .get("listar_detalle_eje/" + id_eje)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.pic_eje = respuesta.data.results;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .finally(() => {
        this.estado = true;
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