<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LISTA CONVOCATORIA FINALIZADA</h1>
        <div class="row">
          <div>
            <small class="text-azul-sena mr-2"
              >Convocatoria: {{ this.convocatoria.convocatoria }}</small
            >
          </div>

          <div>
            <small class="text-azul-sena mr-2"
              >Tipo convocatoria: {{ this.convocatoria.tipo_apoyo }}</small
            >
          </div>

          <div>
            <small class="text-azul-sena"
              >Cupos: {{ this.convocatoria.cupo_total }}</small
            >
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <h1 class="text-azul-sena">INSCRITOS</h1>
            <div class="justify-content-center">
              <paginate-links
                class="pagination justify-content-end"
                for="aprendicesInscritos"
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
              >
              </paginate-links>
            </div>
            <paginate
              ref="paginator"
              name="aprendicesInscritos"
              :list="aprendicesInscritos"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col" class="col-sm-1">id</th>
                    <!-- <th scope="col" class="col-sm-3">Convocatoria</th> -->
                    <th scope="col" class="col-sm-4">Inscrito</th>
                  </tr>
                </thead>
                <div v-if="aprendicesInscritos.length == 0">
                  No hay aprendices aún.
                </div>
                <tbody
                  v-for="(adjudicados, key) in paginated('aprendicesInscritos')"
                  :key="key"
                >
                  <td>{{ adjudicados.id_convocatoria }}</td>
                  <!-- <td>{{ adjudicados.convocatoria }}</td> -->
                  <td>
                    {{ adjudicados.primer_nombre }}
                    {{ adjudicados.segundo_nombre }}
                    {{ adjudicados.primer_apellido }}
                    {{ adjudicados.segundo_apellido }}
                  </td>
                </tbody>
              </table>
            </paginate>
            <div class="justify-content-center">
              <paginate-links
                class="pagination justify-content-end"
                for="aprendicesInscritos"
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
              >
              </paginate-links>
            </div>
          </div>

          <div class="col-lg-6 col-md-12 col-sm-12">
            <h1 class="text-azul-sena">EJECUCIÓN</h1>
            <div class="justify-content-center">
              <paginate-links
                class="pagination justify-content-end"
                for="adjudicados"
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
              >
              </paginate-links>
            </div>
            <paginate
              ref="paginator"
              name="adjudicados"
              :list="adjudicados"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col" class="col-sm-1">id</th>
                    <!-- <th scope="col" class="col-sm-3">Convocatoria</th> -->
                    <th scope="col" class="col-sm-2">Estado</th>
                    <th scope="col" class="col-sm-5">Adjudicado</th>
                  </tr>
                </thead>
                <div v-if="adjudicados.length == 0">
                  No hay aprendices aún.
                </div>

                <tbody
                  v-for="(proceso, key) in paginated('adjudicados')"
                  :key="key"
                >
                  <td>{{ proceso.id_convocatoria }}</td>
                  <!-- <td>{{ proceso.convocatoria }}</td> -->
                  <td>{{ proceso.estado }}</td>
                  <td>
                    {{ proceso.primer_nombre }} {{ proceso.segundo_nombre }}
                    {{ proceso.primer_apellido }} {{ proceso.segundo_apellido }}
                  </td>
                </tbody>
              </table>
            </paginate>
            <div class="justify-content-center">
              <paginate-links
                class="pagination justify-content-end"
                for="adjudicados"
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
              >
              </paginate-links>
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
              name: 'GestionarConvocatoria',
            }"
          >
            Volver
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Axios from "@/Axios";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import Swal from "sweetalert2";

@Component({
  components: {},
})
export default class listaAdjudicados extends Vue {
  adjudicados: any[] = [];
  convocatoria: any[] = [];
  paginate = ["aprendicesInscritos", "adjudicados"];
  aprendicesInscritos: [] = [];

  mounted() {
    this.obtenerAdjudicados(this.$route.params.id);
    this.obtenerInscritos(this.$route.params.id);
    this.obtenerConvocatoria(this.$route.params.id);
  }

  obtenerAdjudicados(id) {
    Axios()
      .get("listar_adjudicados/" + this.$route.params.id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.adjudicados = respuesta.data.results;
        }
      });
  }
  obtenerInscritos(id) {
    Axios()
      .get("listar_inscripciones_convocatoria/" + this.$route.params.id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.aprendicesInscritos = respuesta.data.results;
        }
      });
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
}
</script>
