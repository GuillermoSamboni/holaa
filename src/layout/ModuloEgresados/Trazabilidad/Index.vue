<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LISTA TRAZABILIDAD EGRESADOS</h1>
        <hr />

        <!-- {{ this.listaTrazabilidad }} -->

      </div>

      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <!-- <h1>Cargando...</h1> -->
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div class="table-responsive" v-if="estadoPeticionTabla">
          <div class="col-9 mb-1">
            <input
              type="text"
              class="form-control col-lg-3 col-sm-10"
              placeholder="Buscar"
              v-model="filter"
              @keyup.prevent="trazabilidadFiltrado()"
            />
            <br />
          </div>

          <table class="table table table-hover table-inverse">
            <thead class="bg-gradient-naranja-sena text-white" id="listado">
              <tr>
                <th class="text-nowrap">Trazabilidad</th>
                <th class="text-nowrap">Eje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trazabilidad, key) in listaTrazabilidad" :key="key">
                <td>

                  {{ trazabilidad.trazabilidad.charAt(0).toUpperCase() + trazabilidad.trazabilidad.slice(1) }}

                </td>
                <td>
                  {{ trazabilidad.eje }}
                </td>
                <td class="campos">
                  <span tooltip="Ver detalle Trazabilidad" tooltip-flow="top">
                    <router-link
                      class="btn btn-sm bg-azul-sena text-white"
                      :to="{
                        name: 'VerDetalleTrazabilidades',
                        params: {
                          id: trazabilidad.id_trazabilidad,
                        },
                      }"
                    >
                      <i class="fas fa-eye"></i>
                    </router-link>
                  </span>

                  <span tooltip="Modificar Trazabilidad" tooltip-flow="top">
                    <router-link
                      class="btn btn-sm bg-azul-sena text-white"
                      :to="{
                        name: 'ModificarTrazabilidad',
                        params: {
                          id: trazabilidad.id_trazabilidad,
                        },
                      }"
                    >
                      <i class="fas fa-edit"></i>
                    </router-link>
                  </span>
                  <div
                    class="btn-group btn-spc"
                    tooltip="Eliminar Eje"
                    tooltip-flow="top"
                  >
                    <button
                      @click="
                        eliminarTrazabilidad(trazabilidad.id_trazabilidad, key)
                      "
                      class="btn btn-sm bg-azul-sena text-white"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <h4 class="" v-else-if="!estadoPeticion">No tienes acceso!</h4> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";

@Component({
  components: {
    // AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class PaneTrazabilidad extends Vue {
  // estadoPeticion = true;
  estadoPeticionTabla = false;
  listaTrazabilidades: any[] = [];
  filter = "";
  listaTrazabilidad = [];

  Pane_razabilidad = {
    id_trazabilidad: "",
    trazabilidad: "",
    id_eje: "",
    eje: "",
  };

  mounted() {
    this.obtenerListaTrazabilidad();
  }

  obtenerListaTrazabilidad() {
    Axios()
      .get("listar_pane_trazabilidad")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaTrazabilidades = respuesta.data.results;
          this.listaTrazabilidad = respuesta.data.results;
          // this.estadoPeticionTabla = true;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  trazabilidadFiltrado() {
    let trazabilidadFilter = [];
    for (let trazabilidadF of this.listaTrazabilidades) {
      let trazabilidad = trazabilidadF.trazabilidad.toLowerCase().toUpperCase();
      let eje = trazabilidadF.eje.toLowerCase().toUpperCase();

      if (
        trazabilidad.indexOf(this.filter) >= 0 ||
        eje.indexOf(this.filter) >= 0
      ) {
        trazabilidadFilter.push(trazabilidadF);
        this.filter == "";
      }
    }

    this.listaTrazabilidad = trazabilidadFilter;
    if (this.listaTrazabilidad.length == 0) {
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró la capacitación, que coincida con la búsqueda",
        showConfirmButton: false,
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaTrazabilidad = this.listaTrazabilidades;
    }
  }

  eliminarTrazabilidad(id, index) {
    Swal.fire({
      title: "Eliminar Trazabilidad ",
      text: this.listaTrazabilidades[index].trazabilidad + "?",
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
            "eliminar_pane_trazabilidad/" +
              this.listaTrazabilidades[index].id_trazabilidad
          )
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Trazabilidad Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaTrazabilidades.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar ls traazabilidad",
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