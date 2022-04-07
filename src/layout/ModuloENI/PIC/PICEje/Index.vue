<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">PIC EJE</h1>
        <hr />
        <!-- <span slot="title">Educación</span> -->
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <!-- tablas -->
        <div v-if="estadoPeticionTabla">
          <div class="clearfix">
            <b-button
              class="btn btn-sm bg-azul-sena text-white float-right"
              tooltip="Registrar Nuevo"
              tooltip-flow="top"
              :to="{
                name: 'RegistrarPICEje',
              }"
            >
              Registrar Nuevo Eje
              <!-- <i class="fas fa-plus size"></i> -->
            </b-button>
          </div>
          <div>
            <div class="col-9 mb-1">
              <input
                type="text"
                class="form-control col-lg-3 col-sm-10"
                placeholder="Buscar"
                v-model="filter"
                @keyup.prevent="ejeFiltrado()"
              />
            </div>
            <br />
            <div class="table-responsive ">
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">eje</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(Eje, key) in listaEje" :key="key">
                    <td>
                      {{ Eje.id_eje }}
                    </td>
                    <td>{{ Eje.eje }}</td>
                    <td scope="row">
                      <div
                        class="btn-toolbar btn-responsive-table"
                        role="toolbar"
                      >
                        <div
                          class="btn-group btn-spc"
                          tooltip="Ver Eje"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'VerDetallePICEje',
                              params: {
                                id: Eje.id_eje,
                              },
                            }"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>
                        </div>
                        <div
                          class="btn-group btn-spc"
                          tooltip="Modificar Eje"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'ModificarPICEje',
                              params: {
                                id: Eje.id_eje,
                              },
                            }"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>
                        </div>
                        <div
                          class="btn-group btn-spc"
                          tooltip="Eliminar Eje"
                          tooltip-flow="top"
                        >
                          <button
                            @click="eliminarPicEje(pic_eje.id_eje, key)"
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
  components: {
    AnimacionTablasCargando,
  },
})
export default class Index extends Vue {
  filtrarPicEje = "";
  listarPicEje: any[] = [];
  estadoPeticionTabla = false;
  pic_eje = {
    id_eje: "",
    eje: "",
  };
  filter = "";
  listaEje = [];

  mounted() {
    this.obtenerPicEje();
  }

  obtenerPicEje() {
    Axios()
      .get("/listar_eje")
      .then((respuesta) => {

        if (respuesta.data.status == "success") {
          this.listarPicEje = respuesta.data.results;
          this.listaEje = respuesta.data.results;
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

  ejeFiltrado() {
    let picFilter = [];

    for (let ejeF of this.listarPicEje) {
      let eje = ejeF.eje.toLowerCase();
      // let eje_id = ejeF.eje_id.toLowerCase();

      if (
        eje.indexOf(this.filter.toLowerCase()) >= 0
        //  ||
        // eje_id.indexOf(this.filter.toLowerCase()) >= 0
      ) {
        picFilter.push(ejeF);
      }
    }

    this.listaEje = picFilter;
    if (this.listaEje.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró la capacitación, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listaEje = this.listarPicEje;
    }
  }

  eliminarPicEje(id, index) {
    Swal.fire({
      title: "Eliminar Pic EJe ",
      text: this.listarPicEje[index].eje + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_eje/" + this.listarPicEje[index].id_eje)
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Pic Eje Eliminado",
                confirmButtonColor: "#238276",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listarPicEje.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar el pic eje",
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