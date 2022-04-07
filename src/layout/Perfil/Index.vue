<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-md-6">
            <h1 class="text-azul-sena">
              <h1 class="text-azul-sena">LISTA PERFILES</h1>
            </h1>
          </div>
          <!-- <div  class="offset-md-2 col-md-4 align-content-end" v-if="perfiles.length != 0">
            <div class="row mx-1 my-3">
              <input
                type="text"
                class="form-control"
                placeholder="buscar"
                v-model="filter"
              />
            </div>
          </div> -->
        </div>
        <div>
          <!-- <router-link
            class="btn btn-sm bg-naranja-sena text-white"
            :to="{ name: 'Registrar' }"
          >
            <i class="fas fa-plus"></i>
          </router-link> -->
        </div>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div v-if="perfiles.length == 0">
            <p class="text-center">No hay perfiles</p>
          </div>
          <div v-if="perfiles.length != 0">
            <div class="row my-3">
              <div class="col-md-5 col-lg-4 mt-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="buscar"
                  v-model="filter"
                />
              </div>
              <div class="justify-content-lg-end col-md-5 col-lg-8 mt-2">
                <paginate-links
                  class="pagination justify-content-end"
                  for="perfiles"
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
              <div class="col-12">
                <br />
                <paginate
                  ref="paginator"
                  name="perfiles"
                  :list="perfiles"
                  :per="10"
                >
                  <table class="table table-hoverble" id="listado">
                    <thead class="bg-gradient-naranja-sena text-white">
                      <tr>
                        <th scope="col" @click="ordenar(0, 'str')">#</th>
                        <th scope="col" @click="ordenar(0, 'str')">Perfil</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(perfil, index) in filtrar(
                          paginated('perfiles')
                        )"
                        :key="index"
                      >
                        <td>{{ perfil.id_perfil }}</td>
                        <td>{{ perfil.perfil }}</td>
                        <td class="campos">
                          <div class="acciones">
                            <div
                              tooltip="Modificar Experiencia"
                              tooltip-flow="top"
                            >
                              <router-link
                                class="btn btn-sm bg-naranja-sena text-white"
                                :to="{
                                  name: 'ModificarPerfil',
                                  params: { id: perfil.id_perfil },
                                }"
                              >
                                <i class="fas fa-edit"></i>
                              </router-link>
                            </div>
                            <div
                              tooltip="Eliminar Experiencia"
                              tooltip-flow="top"
                            >
                              <a
                                class="btn btn-sm bg-naranja-sena text-white"
                                @click="
                                  eliminarPerfil(
                                    perfil.id_perfil,
                                    perfil.perfil
                                  )
                                "
                              >
                                <i class="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </paginate>
              </div>
              <paginate-links
                class="pagination justify-content-end"
                for="perfiles"
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionTablasCargando from "../../components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionTablasCargando,
  },
})
export default class PerfilLista extends Vue {
  perfiles = [];
  filter = "";
  estadoPeticionTabla = false;

  paginate = ["perfiles"];

  constructor() {
    super();

    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        min: () => "Mínimo 8 caracteres",
        // email: () => "Correo invalido",
      },
    };
    this.$validator.localize("es", dict);
  }

  mounted() {
    this.llenarPerfiles();
  }
  llenarPerfiles() {
    Axios()
      .get("listar_perfiles")
      .then((respuesta) => {
        this.perfiles = respuesta.data.results;

        // this.$router.push({name: "dashboard"})
      })
      .catch((respuesta) => {
        //  Swal.fire((respuesta.data.status+"!").toString().toUpperCase(), respuesta.data.message, respuesta.data.status);
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

  //   public validarFormulario(){
  //     this.$validator.validate().then((valid) => {
  //       if (valid) {
  //         // el formulario se validó y tiene los datos que corresponden por campo
  //         this.login();
  //       }
  //     });
  //   }

  eliminarPerfil(id: number, nombre: string) {
    Swal.fire({
      title: "Eliminar Perfil " + nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((resp) => {
      if (resp.isConfirmed) {
        Axios()
          .delete("eliminar_perfil/" + id)
          .then((respuesta) => {
            Swal.fire({
              title: "Perfil Eliminado",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
            this.llenarPerfiles();
          })
          .catch((error) => {
            Swal.fire({
              title: "No se pudo elimar perfil",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          });
      }
    });
  }

  filtrar(lista: any[]) {
    let resp;
    if (this.filter != "") {
      resp = lista.filter(
        (item) =>
          item.perfil
            .substring(0, this.filter.length)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") === this.filter.toLowerCase()
      );
    } else {
      resp = lista;
    }
    return resp;
  }
  ordenar(n: number, type: string) {
    let rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;

    const table: any = document.getElementById("listado");
    switching = true;
    dir = "asc";

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (
            (type == "str" &&
              x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
            (type == "int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))
          ) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (
            (type == "str" &&
              x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) ||
            (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))
          ) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
</script>
<style>
.campos .acciones {
  width: 100px;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
}
</style>
