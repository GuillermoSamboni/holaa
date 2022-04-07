<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LÍNEA TECNOLÓGICA</h1>
        <hr />
        <!-- <span slot="title">Educación</span> -->
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div class="clearfix">
            <b-button
              class="btn btn-sm bg-azul-sena text-white float-right"
              tooltip="Registrar Nuevo"
              tooltip-flow="top"
              :to="{
                name: 'RegistrarLineasTecnologica',
              }"
            >
              Registrar Nueva Línea
              <!-- <i class="fas fa-plus size"></i> -->
            </b-button>
          </div>
          <div>
            <div class="col-9 mb-1">
              <input
                type="text"
                class="form-control col-lg-3 col-sm-10"
                placeholder="Buscar Línea Tecnológica"
                v-model="filter"
                @keyup.prevent="lineaTecnologicaFiltrado()"
              />
            </div>
            <br />
            <!-- <div class="text-center" >
                <AnimacionCargando></AnimacionCargando>
              </div> -->
            <div class="table-responsive">
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Id Línea Tecnológica</th>
                    <th scope="col" class="col-sm-4">Línea Tecnológica</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(linea, key) in listaLineaTecnologica" :key="key">
                    <td>
                      {{ linea.id_pic_linea_tecnologica }}
                    </td>
                    <td>{{ linea.linea_tecnologica }}</td>
                    <td scope="row">
                      <div
                        class="btn-toolbar btn-responsive-table"
                        role="toolbar"
                      >
                        <div
                          class="btn-group btn-spc"
                          tooltip="Ver Linea Tecnologica"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'VerDetalleLineasTecnologicas',
                              params: {
                                id: linea.id_pic_linea_tecnologica,
                              },
                            }"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>
                        </div>

                        <div
                          class="btn-group btn-spc"
                          tooltip="Modificar Linea Tecnologica"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'ModificarLineaTecnologica',
                              params: {
                                id: linea.id_pic_linea_tecnologica,
                              },
                            }"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>
                        </div>

                        <div
                          class="btn-group btn-spc"
                          tooltip="Eliminar Linea Tecnologica"
                          tooltip-flow="top"
                        >
                          <button
                            @click="
                              eliminarLineaTecnologica(
                                Linea_Tecnologica.id_pic_linea_tecnologica,
                                key
                              )
                            "
                            class="btn btn-sm bg-azul-sena text-white"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swal from "sweetalert2";
import Axios from "@/Axios";
import AnimacionTablasCargando from "../../../../components/animacionTablasCargando.vue";

@Component({
  components: { AnimacionTablasCargando },
})
export default class Index extends Vue {
  filterLinea = "";
  listarLineaTecnologica: any[] = [];
  estadoPeticionTabla = false;

  filter = "";
  listaLineaTecnologica = [];

  Linea_Tecnologica = {
    id_pic_linea_tecnologica: "",
    linea_tecnologica: "",
  };

  mounted() {
    this.obtenerLineaTecnologica();
  }

  obtenerLineaTecnologica() {
    Axios()
      .get("/listar_lineas_tecnologica")
      .then((respuesta) => {

        if (respuesta.data.status == "success") {
          this.listarLineaTecnologica = respuesta.data.results;
          this.listaLineaTecnologica = respuesta.data.results;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  lineaTecnologicaFiltrado() {
    let picFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let linea of this.listarLineaTecnologica) {
      let tecnologica = linea.linea_tecnologica.toLowerCase();

      if (tecnologica.indexOf(this.filter) >= 0) {
        picFilter.push(linea);
      }
    }

    this.listaLineaTecnologica = picFilter;
    if (this.listaLineaTecnologica.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró la línea tecnologica, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaLineaTecnologica = this.listarLineaTecnologica;
    }
  }

  eliminarLineaTecnologica(id, index) {
    Swal.fire({
      title: "Eliminar Línea Tecnológica ",
      text: this.listarLineaTecnologica[index].linea_tecnologica + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete(
            "eliminar_linea_tecnologica/" +
              this.listarLineaTecnologica[index].id_pic_linea_tecnologica
          )
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Línea Teconológica Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listarLineaTecnologica.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar la línea teconológica",
                text: respuesta.data.message,
                icon: "error",
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
      }
    });
  }
}
</script>

