<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">LISTA USUARIOS</h1>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <div
            class="d-flex justify-content-lg-between flex-lg-row flex-column"
          >
            <div class="row col-12 col-lg-6 pr-0">
              <input
                type="number"
                class="form-control col-lg-5 col-12 mb-2 mr-md-3"
                placeholder="Buscar por cédula"
                v-model="identificacionbuscar"
              />
              <button
                class="btn bg-azul-sena text-white col-lg-4 col-12 mb-2"
                @click="buscarUsuario"
              >
                Buscar
              </button>
            </div>
            <div
              class="
                row
                col-12 col-lg-6
                p-0
                mr-1
                justify-content-center justify-content-lg-end
              "
            >
              <b-pagination
                v-model="paginaActual"
                :total-rows="totalUsuarios"
                :per-page="porPagina"
                first-number
                last-number
                @change="cambiarPagina"
                class=""
              ></b-pagination>
            </div>
          </div>
          <div class="text-center" v-if="estadoPeticion">
            <!-- <h1>Cargando...</h1> -->
            <AnimacionCargando></AnimacionCargando>
          </div>
          <div class="table-responsive" v-if="!estadoPeticion">
            <table class="table table table-hover table-inverse" id="listado">
              <thead class="text-white">
                <tr>
                  <th @click="ordenar(0, 'str')">
                    Identificación <i class="ni ni-bold-down"></i>
                  </th>
                  <th @click="ordenar(1, 'str')">
                    Nombres <i class="ni ni-bold-down"></i>
                  </th>
                  <th @click="ordenar(2, 'str')">
                    Apellidos <i class="ni ni-bold-down"></i>
                  </th>
                  <th @click="ordenar(3, 'str')">
                    Perfil <i class="ni ni-bold-down"></i>
                  </th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody class="text-center" v-if="mostrarLista.length == 0">
                <p class="text-center">No hay perfiles</p>
              </tbody>

              <tbody v-if="mostrarLista.length != 0">
                <tr v-for="(usuario, key) in filtrar(mostrarLista)" :key="key">
                  <td>{{ usuario.identificacion }}</td>
                  <td>
                    {{ usuario.primer_nombre }} {{ usuario.segundo_nombre }}
                  </td>
                  <td>
                    {{ usuario.primer_apellido }} {{ usuario.segundo_apellido }}
                  </td>
                  <td>{{ usuario.perfil }}</td>
                  <td class="campos">
                    <div class="acciones">
                      <!-- ver detalle -->
                      <div
                        class="mx-1"
                        tooltip="Ver Usuario"
                        tooltip-flow="top"
                      >
                        <router-link
                          class="btn btn-sm bg-naranja-sena text-white"
                          :to="{
                            name: 'VerDetalle',
                            params: { id: usuario.id_usuario },
                          }"
                        >
                          <i class="fas fa-eye"></i>
                        </router-link>
                      </div>
                      <!-- editar usuario -->
                      <div v-if="false" tooltip="Modificar" tooltip-flow="top">
                        <router-link
                          class="btn btn-sm bg-naranja-sena text-white"
                          :to="{
                            name: 'ModificarUsuario',
                            params: { id: usuario.id_usuario },
                          }"
                        >
                          <i class="fas fa-edit"></i>
                        </router-link>
                      </div>

                      <div
                        class="mx-1"
                        tooltip="Actualizar Rol"
                        tooltip-flow="top"
                      >
                        <a
                          class="btn btn-sm bg-naranja-sena text-white"
                          @click="
                            (modificarRolModal = true), modificarRol(usuario)
                          "
                          ><i class="fas fa-user-shield"></i
                        ></a>
                      </div>
                      <!-- fin editar usuario -->
                      <!-- crear formacion -->

                      <div
                        class="mx-1"
                        tooltip="Actualizar Red"
                        tooltip-flow="top"
                      >
                        <router-link
                          class="btn btn-sm bg-naranja-sena text-white"
                          :to="{
                            name: 'CrearFormacion',
                            params: { id: usuario.id_usuario },
                          }"
                        >
                          <i class="fas fa-book-reader"></i>
                        </router-link>
                      </div>
                      <!-- fin crear formación -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <h4 class="" v-else-if="!estadoPeticion">No tienes acceso!</h4> -->
          </div>
          <div
            class="row p-0 col-12 justify-content-center justify-content-lg-end"
          >
            <b-pagination
              v-model="paginaActual"
              :total-rows="totalUsuarios"
              :per-page="porPagina"
              first-number
              last-number
              @change="cambiarPagina"
              class=""
            ></b-pagination>
          </div>
          <div class="row">
            <div class="col-md-6">
              <modal
                :show.sync="modificarRolModal"
                body-classes="p-0"
                modal-classes="modal-dialog-centered modal-sm modal-lg"
                v-if="usuarioModificarRol != null"
              >
                <template slot="header">
                  <h1
                    class="text-azul-sena modal-title"
                    id="modalModificarNovedad"
                  >
                    Modificar Rol
                  </h1>
                </template>
                <card
                  type="white"
                  shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0"
                >
                  <template class="row">
                    <div>
                      <p>
                        Usuario: {{ usuarioModificarRol.primer_nombre }}
                        {{ usuarioModificarRol.primer_apellido }}
                      </p>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        v-model="usuarioModificarRol.perfil"
                      >
                        <option
                          v-for="(perfil, index) in perfiles"
                          :key="index"
                          v-bind:value="perfil.perfil"
                        >
                          {{ perfil.perfil }}
                        </option>
                      </select>
                      <button
                        class="btn btn-azul-sena mt-3 col-12 col-lg-4"
                        @click="cambiarRol()"
                      >
                        Cambiar de Rol
                      </button>
                    </div>
                  </template>
                </card>
              </modal>
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
import AnimacionCargando from "../../components/animacionCargando.vue";
import AnimacionTablasCargando from "../../components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionCargando,
    AnimacionTablasCargando,
  },
})
export default class Login extends Vue {
  estadoPeticion = true;
  listaUsuarios = [];
  perfiles: any[] = [];
  mostrarLista = [];
  filter = "";
  colorSpinner = "azul-sena";
  modificarRolModal = false;
  usuarioModificarRol: any = null;
  estadoPeticionTabla = false;
  paginaActual = 1;
  totalUsuarios = 0;
  porPagina = 0;
  usuariobusqueda;
  identificacionbuscar = "";
  // PAGINACIÓN

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

  filtrar() {
    if (this.identificacionbuscar == "") {
      this.mostrarLista = this.listaUsuarios;
      return this.mostrarLista;
    } else {
      return this.mostrarLista;
    }
  }

  modificarRol(usuario) {
    this.usuarioModificarRol = usuario;
    this.obtenerPerfiles();
  }
  obtenerPerfiles() {
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
          "Se ha presentado un error en el servidor al cargar perfiles!",
          "error"
        );
      });
  }

  cambiarRol() {
    let perfil = this.perfiles.filter(
      (item) =>
        item.perfil.toLowerCase() ===
        this.usuarioModificarRol.perfil.toLowerCase()
    );
    Axios()
      .post("cambiar_perfil_usuario", {
        id_persona: this.usuarioModificarRol.id_persona,
        id_perfil: perfil[0].id_perfil,
      })
      .then((respuesta) => {
        this.modificarRolModal = false;
        Swal.fire({
          title: "Rol cambiado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
        });
      });
  }

  cambiarPagina(pagina) {
    this.paginaActual = pagina;
    this.listarUsuarios();
  }

  mounted() {
    this.paginaActual = 1;
    this.listarUsuarios();
  }

  async buscarUsuario() {
    await Axios()
      .post("buscar_usuario", { identificacion: this.identificacionbuscar })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.usuariobusqueda = respuesta.data.results;
          this.mostrarLista = [];
          this.mostrarLista.push(this.usuariobusqueda);
          // this.listaUsuarios = []
          // this.listaUsuarios.push(respuesta.data.results.data)

          // this.estadoPeticion = false;
        } else {
          Swal.fire({
            title: "perfil no existe",
            icon: "error",
          });
        }
      })
      .catch(() => {});
  }

  async listarUsuarios() {
    await Axios()
      .get("listar_usuarios?page=" + this.paginaActual)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaUsuarios = respuesta.data.results.data;
          this.mostrarLista = this.listaUsuarios;
          const dataPaginacion = respuesta.data.results.paginacion;
          this.totalUsuarios = dataPaginacion.total_usuarios;
          this.porPagina = dataPaginacion.cantidad_por_pagina;
          this.paginaActual = dataPaginacion.pagina_actual;
          // dataPaginacion.siguiente_pagina;
          // dataPaginacion.anterior_pagina;
          this.estadoPeticion = false;
        } else {
          Swal.fire(
            (respuesta.data.status + "!").toString().toUpperCase(),
            respuesta.data.message,
            respuesta.data.status
          );
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
  editar(key: number) {
    this.$router.push({
      name: "ModificarUSuario",
      params: this.listaUsuarios[key],
    });
  }
  ver(key: number) {
    this.$router.push({
      name: "VerDetalle",
      params: this.listaUsuarios[key],
    });
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
.page-item.active .page-link {
  background-color: var(--azul-sena) !important;
  color: white;
}

/* @media (min-width: 752px) {
  .marki {
    margin-top: 2px;
  }
}
@media (min-width: 897px) {
  .markiw {
    margin-top: 28px;
  }
} */

.campos .acciones {
  width: 100px;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
}
</style>
