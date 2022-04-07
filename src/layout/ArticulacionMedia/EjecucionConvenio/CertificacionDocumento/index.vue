<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA CERTIFICACIÓN</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="row my-3">
            <div class="col-md-3 col-lg-3 mt-4">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar certificado"
                v-model="filter"
                @keyup.prevent="certificadoFiltrado()"
              />
            </div>
            <div class="col-md-9 col-lg-9 mt-4">
              <paginate-links
                class="pagination justify-content-end"
                for="listaCertificadoFiltrado"
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
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaCertificadoFiltrado"
              :list="listaCertificadoFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Id Certificacion</th>
                    <th scope="col">Convenio</th>
                    <th scope="col">Colegio</th>
                    <th scope="col">Seguimiento inicial</th>
                    <th scope="col">Seguimiento final</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      listaCertificadoFiltrado != null &&
                      listaCertificadoFiltrado.length != 0
                    "
                  >
                    <tr
                      v-for="(Certificacion, key) in paginated(
                        'listaCertificadoFiltrado'
                      )"
                      :key="key"
                    >
                      <td>{{ Certificacion.id_certificacion }}</td>
                      <td>{{ Certificacion.convenio }}</td>
                      <td>{{ Certificacion.colegio }}</td>
                      <td>{{ Certificacion.seguimiento_inicial }}</td>
                      <td>{{ Certificacion.seguimiento_final }}</td>

                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver Convenio"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'VerDetallecertificado',
                                params: {
                                  id: certificado.id_certificado,
                                },
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Eliminar Convenio"
                            tooltip-flow="top"
                          >
                            <a
                              @click="
                                eliminarConvenio(
                                  certificado.id_certificado,
                                  key
                                )
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-trash"></i>
                            </a>
                          </div>
                          <!-- fases -->
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-else>
                    No hay convenios
                  </tr>
                </tbody>
              </table>
            </paginate>
          </div>
          <paginate-links
            class="pagination justify-content-end"
            for="listaCertificadoFiltrado"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "@/components/animacionCargando.vue";
import AnimacionTablasCargando from "@/components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class Convenio extends Vue {
  listarCertificado = [];
  listaCertificadoFiltrado: any[] = [];
  paginate = ["listaCertificadoFiltrado"];
  filter = "";

  estadoPeticionTabla = false;
  certificado = {
    id_certificado: "",
    convenio_id: "",
    convenio: "",
    colegio_id: "",
    colegio: "",
    apto: "",
    fecha: "",
  };
  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        min: () => "Mínimo 8 caracteres",
      },
    };
    this.$validator.localize("es", dict);
  }
  mounted() {
    this.obtenerConvenios(this.$route.params.id_convenio);
  }
  obtenerConvenios(id) {
    Axios()
      .get("listar_certificacion/" + id)
      .then((respuesta) => {
        this.listarCertificado = respuesta.data.results;
        this.listaCertificadoFiltrado = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  eliminarConvenio(id, index) {
    this.eliminarConvenioColegios(id);
    Swal.fire({
      title: "Eliminar Convenio ",
      text: this.listaCertificadoFiltrado[index].colegio_cargo + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_certificacion/" + id)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Convenio Eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaCertificadoFiltrado.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar el convenio",
                text: respuesta.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.$router.back();
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
    });
  }

  eliminarConvenioColegios(id) {
    Axios()
      .delete("eliminar_convenio_colegio_escogidas/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
        } else {
        }
      });
  }

  certificadoFiltrado() {
    let certificadoFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let certificado of this.listarCertificado) {
      let colegio = certificado.colegio.toLowerCase();
      let fases = certificado.convenio.toLowerCase();

      if (
        colegio.indexOf(this.filter) >= 0 ||
        fases.indexOf(this.filter) >= 0
      ) {
        certificadoFilter.push(certificado);
      }
    }

    this.listaCertificadoFiltrado = certificadoFilter;
    if (this.listaCertificadoFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró el convenio, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaCertificadoFiltrado = this.listarCertificado;
    }
  }
}
</script>

<style></style>
