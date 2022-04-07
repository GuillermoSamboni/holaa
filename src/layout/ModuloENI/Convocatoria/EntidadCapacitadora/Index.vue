<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">ENTIDAD CAPACITADORA</h1>
        <hr />
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
                name: 'RegistrarEntidadCapacitadora',
              }"
            >
              Registrar Nueva Entidad
              <!-- <i class="fas fa-plus size"></i> -->
            </b-button>
          </div>
          <div>
            <div class="col-9 mb-1">
              <input
                type="text"
                class="form-control col-lg-3 col-sm-10"
                placeholder="Buscar Entidad Capacitadora"
                v-model="filter"
                @keyup.prevent="convocatoriaFiltrado()"
              />
            </div>
            <br />
            <div class="table-responsive">
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Entidad Capacitadora</th>
                    <th scope="col" class="col-sm-2">Nit</th>
                    <th scope="col" class="col-sm-2">Direccion</th>
                    <th scope="col" class="col-sm-3">Correo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody v-for="(Entidad, key) in listarEntidad" :key="key">
                  <td>{{ Entidad.id_pic_entidad_capacitadora }}</td>
                  <td>{{ Entidad.entidad_capacitadora }}</td>
                  <td>{{ Entidad.nit }}</td>
                  <td>{{ Entidad.direccion }}</td>
                  <td>{{ Entidad.correo }}</td>
                  <td scope="row">
                    <div
                      class="btn-toolbar btn-responsive-table"
                      role="toolbar"
                    >
                      <div
                        class="btn-group btn-spc"
                        tooltip="Ver Entidad Capacitadora"
                        tooltip-flow="top"
                      >
                        <router-link
                          class="btn btn-sm bg-azul-sena text-white"
                          :to="{
                            name: 'VerDetalleEntidadCapacitadora',
                            params: {
                              id: Entidad.id_pic_entidad_capacitadora,
                            },
                          }"
                        >
                          <i class="fas fa-eye"></i>
                        </router-link>
                      </div>
                      <div
                        class="btn-group btn-spc"
                        tooltip="Modificar Entidad Capacitadora"
                        tooltip-flow="top"
                      >
                        <router-link
                          class="btn btn-sm bg-azul-sena text-white"
                          :to="{
                            name: 'ModificarEntidadCapacitadora',
                            params: {
                              id: Entidad.id_pic_entidad_capacitadora,
                            },
                          }"
                        >
                          <i class="fas fa-edit"></i>
                        </router-link>
                      </div>
                      <div
                        class="btn-group btn-spc"
                        tooltip="Eliminar Entidad Capacitadora"
                        tooltip-flow="top"
                      >
                        <button
                          @click="
                            eliminarEntidadCapacitadora(
                              entidadCapacitadora.id_pic_entidad_capacitadora,
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
                  <!-- plantilla tabla -->
                  <!-- <td scope="row">
                      <div class="btn-toolbar btn-responsive-table" role="toolbar">                        
                        <div class="btn-group btn-spc">

                        </div>
                        <div class="btn-group btn-spc">

                        </div>
                        <div class="btn-group btn-spc">
                          <button
                            //accion de eliminar
                            @click="eliminarPicEje(pic_eje.id_eje, key)"                            
                            class="btn btn-sm bg-azul-sena text-white"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>  
                      </div>
                  </td> -->
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
  listarEntidadCapacitadora: any[] = [];
  estadoPeticionTabla = false;
  filtrarEntidad = "";
  filter = "";
  listarEntidad = [];

  entidadCapacitadora = {
    id_pic_entidad_capacitadora: "",
    entidad_capacitadora: "",
    nit: "",
    direccion: "",
    correo: "",
    numero_telefono: "",
    camara_comercio: "",
  };

  mounted() {
    this.obtenerEntidadCapacitadora();
  }
  obtenerEntidadCapacitadora() {
    Axios()
      .get("listar_entidad_capacitadora")
      .then((respuesta) => {
        this.listarEntidadCapacitadora = respuesta.data.results;
        this.listarEntidad = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }

  convocatoriaFiltrado() {
    let picFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let entidad of this.listarEntidadCapacitadora) {
      let entidadC = entidad.entidad_capacitadora.toLowerCase();

      if (entidadC.indexOf(this.filter) >= 0) {
        picFilter.push(entidad);
      }
    }

    this.listarEntidad = picFilter;
    if (this.listarEntidad.length == 0) {
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
      this.listarEntidad = this.listarEntidadCapacitadora;
    }
  }

  eliminarEntidadCapacitadora(id, index) {
    Swal.fire({
      title: "Eliminar entidad capacitadora ",
      text: this.listarEntidadCapacitadora[index].entidad_capacitadora + "?",
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
            "eliminar_entidad_capacitadora/" +
              this.listarEntidadCapacitadora[index].id_pic_entidad_capacitadora
          )
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Entidad capacitadora Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listarEntidadCapacitadora.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar la experiencia",
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
<style>
.clearfix {
  margin-bottom: -40px;
  margin-top: 20px;
  margin-right: 15px;
}
</style>
