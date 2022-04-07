<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LISTA FUNCIONARIOS</h1>
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
                name: 'RegistrarFuncionarios'
              }"
            >
              Registrar Funcionarios
              <!-- <i class="fas fa-plus size"></i> -->
            </b-button>
          </div>
          <div>
                  <div class="col-9 mb-1">
              <input
                type="text"
                class="form-control col-lg-3 col-sm-10"
                placeholder="Buscar Funcionario"
                v-model="filter"
                @keyup.prevent="FuncionarioFiltrado()"
              />
            </div>
            <br />
            <div class="table-responsive">
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col" class="col-sm-4">Funcionario</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(funcionarios, key) in listaFuncionarios"
                    :key="key"
                  >
                    <td>{{funcionarios.id_dirigido_a}}</td>
                    <td>{{funcionarios.nombre}}</td>
                    <td scope="row">
                      <div
                        class="btn-toolbar btn-responsive-table"
                        role="toolbar"
                      >
                        <div
                          class="btn-group btn-spc"
                          tooltip="Ver Funcionario"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'VerDetalleFuncionarios',
                              params: {
                                id: funcionarios.id_dirigido_a
                              }
                            }"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>
                        </div>

                        <div
                          class="btn-group btn-spc"
                          tooltip="Modificar Funcionarios"
                          tooltip-flow="top"
                        >
                          <router-link
                            class="btn btn-sm bg-azul-sena text-white"
                            :to="{
                              name: 'ModificarFuncionarios',
                              params: {
                                id: funcionarios.id_dirigido_a
                              }
                            }"
                          >
                            <i class="fas fa-edit"></i>

                          </router-link>
                        </div> 
                               <div
                          class="btn-group btn-spc"
                          tooltip="Eliminar Funcionario"
                          tooltip-flow="top"
                        >
                          <button
                            @click="
                              eliminarFuncionario(
                                Funcionario.id_dirigido_a,
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

    estadoPeticionTabla = false;
    listaFuncionarios: any[] = [];

     filter = "";
    listafuncionario = [];

    Funcionario = {
    id_dirigido_a: "",
    nombre: "",
  };

    mounted() {
      this.obtenerFuncionarios();
    }

    obtenerFuncionarios() {
      Axios()
        .get("/listar_pic_dirigida")
        .then((respuesta) => {
          this.listaFuncionarios = respuesta.data.results;
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
    eliminarFuncionario(id, index) {
    Swal.fire({
      title: "Eliminar Funcionario ",
      text: this.listaFuncionarios[index].nombre + "?",
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
            "eliminar_pic_dirigida/" +
              this.listaFuncionarios[index].id_dirigido_a
          )
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Funcionario Eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaFuncionarios.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar el funcionario",
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
  FuncionarioFiltrado() {
    let picFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let func of this.listaFuncionarios) {
      let funcionario = func.nombre.toLowerCase();

      if (funcionario.indexOf(this.filter) >= 0 ) {
        picFilter.push(func);
      }
    }

    this.listafuncionario = picFilter;
    if (this.listafuncionario.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró el Funcionario, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filter = "";
      this.listafuncionario = this.listaFuncionarios;
    }
  }
  }
</script>

