<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR PROGRAMA PROYECTADO</h1>
        <hr />

        <div class="text-center" v-if="!estadoPeticionTabla">
          <AnimacionTablasCargando></AnimacionTablasCargando>
        </div>
        <div v-if="estadoPeticionTabla">
          <!-- contendor de tablas -->
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <div class="row my-3">
                <div class="col-md-6 col-lg-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Buscar Programa Formación"
                    v-model="filter"
                    @keyup.prevent="ProgramaFiltrado()"
                  />
                </div>
                <div class="col-md-6 col-lg-6">
                  <paginate-links
                    class="pagination justify-content-end"
                    for="listaProgramasFiltrado"
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
              <div>
                <paginate
                  ref="paginator"
                  name="listaProgramasFiltrado"
                  :list="listaProgramasFiltrado"
                  :per="7"
                >
                  <table class="table table-hoverble table-responsive">
                    <thead id="listado">
                      <tr>
                        <th scope="col">Id Pogramas Formación</th>
                        <th scope="col" class="col-sm-12">
                          Programas Formación
                        </th>
                        <th scope="col">Accion</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(ProgramasFormacion, index) in paginated(
                          'listaProgramasFiltrado'
                        )"
                        :key="index"
                      >
                        <td>
                          {{ ProgramasFormacion.id_programa_formacion }}
                        </td>
                        <td>{{ ProgramasFormacion.programa_formacion }}</td>
                        <td scope="row">
                          <div
                            class="btn-toolbar btn-responsive-table"
                            role="toolbar"
                          >
                            <div
                              class="btn-group btn-spc"
                              tooltip="Agregar Programa"
                              tooltip-flow="top"
                            >
                              <base-button
                                type="azul-sena"
                                @click="
                                  agregarProgramaLista(ProgramasFormacion)
                                "
                                class="btn btn-sm bg-azul-sena text-white"
                              >
                                <i class="fas fa-plus size"></i>
                              </base-button>
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
                for="listaProgramasFiltrado"
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

            <div class="col-md-6 col-lg-6">
              <div class="row my-3">
                <div class="col-md-6 col-lg-6">
                  <strong class="text-azul-sena"
                    >Programas seleccionados</strong
                  >
                </div>
                <div class="col-md-6 col-lg-6">
                  <paginate-links
                    class="pagination justify-content-end"
                    for="programasProyectTemp"
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

              <div class="table-responsive">
                <paginate
                  ref="paginator"
                  name="programasProyectTemp"
                  :list="programasProyectTemp"
                  :per="7"
                >
                  <table class="table table-hoverble">
                    <thead id="listado">
                      <tr>
                        <th>Programa de formación</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(ProgramasFormacion, index) in paginated(
                          'programasProyectTemp'
                        )"
                        :key="index"
                      >
                        <td>{{ ProgramasFormacion.programa_formacion }}</td>
                        <td scope="row">
                          <div
                            class="btn-toolbar btn-responsive-table"
                            role="toolbar"
                          >
                            <div
                              class="btn-group btn-spc"
                              tooltip="Eliminar Programa"
                              tooltip-flow="top"
                            >
                              <base-button
                                type="azul-sena"
                                @click="eliminar(programasProyectTemp)"
                                class="btn btn-sm bg-azul-sena text-white"
                              >
                                <i class="fas fa-trash"></i>
                              </base-button>
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
                for="programasProyectTemp"
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
          <div class="card-footer">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-sm-12 mt-1">
                <base-button
                  type="azul-sena"
                  @click="guardarListaProgramasProyectados()"
                  class="btn btn-block bg-azul-sena text-white"
                  >Guardar</base-button
                >
              </div>

              <div class="col-lg-4 col-sm-12 mt-1">
                <a
                  class="btn btn-block bg-azul-sena text-white"
                  @click="$router.back()"
                >
                  Volver
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionTablasCargando from "../../../components/animacionTablasCargando.vue";

@Component({
  components: {
    AnimacionTablasCargando,
  },
})
export default class ModificarProgramaProyectado extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
  id_convenio = null;

  programaProyectado = {
    programa_formacion_id: "",
    convenio_id: this.id_convenio,
    estado_programa_proyectado_id: "1",
  };
  filter = "";
  listaProgramas: any[] = [];
  listaProgramasFiltrado: any[] = [];
  programasProyectTemp: any[] = [];
  // agregarPrograma = "";

  programa = "";
  todosProgramas = "";
  estadoPeticionTabla = false;

  paginate = ["listaProgramasFiltrado", "programasProyectTemp"];
  mounted() {
    this.obtenerConvenios();
  }
  eliminar(id) {
    this.programasProyectTemp.splice(this.programasProyectTemp.indexOf(id), 1);
  }
  ProgramaFiltrado() {
    let picFilter = [];
    for (let programa of this.listaProgramas) {
      let programaP = programa.programa_formacion.toLowerCase();
      if (programaP.indexOf(this.filter) >= 0) {
        picFilter.push(programa);
      }
    }
    this.listaProgramasFiltrado = picFilter;
    if (this.listaProgramasFiltrado.length == 0) {
      //busco no encontro
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
      this.listaProgramasFiltrado = this.listaProgramas;
    }
  }
  registrarProgramaProyectado(id_programa) {
    this.programaProyectado.convenio_id = this.$route.params.id_convenio;
    this.programaProyectado.programa_formacion_id = id_programa;
    Axios()
      .post("almacenar_programa_proyectado", this.programaProyectado)

      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Programa Proyectado Guardado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.estadoPeticion = false;
          this.$router.push({ name: "GestionarProgramasProyectados" });
        } else {
          Swal.fire({
            title: "Programa proyectado no guardado",
            text: respuesta.data.message,
            icon: respuesta.data.status.toLowerCase(),
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
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
  agregarProgramaLista(programaProyectado) {
    let encontrado = false;
    let cont = 0;
    if (this.programasProyectTemp.length > 0) {
      for (let prog of this.programasProyectTemp) {
        if (
          prog.id_programa_formacion == programaProyectado.id_programa_formacion
        ) {
          encontrado = true;
          Swal.fire({
            title: "Programa repetido",
            text: "Intentelo nuevamente con otro programa.",
            icon: "info",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          cont += 1;
          return;
        }
      }
      if (!encontrado) {
        this.programasProyectTemp.push(programaProyectado);
      }
    } else {
      this.programasProyectTemp.push(programaProyectado);
    }

    // this.programasProyectTemp.push(programaProyectado);
    // this.listaProgramasFiltrado.splice(pos, 1);
  }
  guardarListaProgramasProyectados() {
    if (this.programasProyectTemp.length > 0) {
      for (let i = 0; i < this.programasProyectTemp.length; i++) {
        this.registrarProgramaProyectado(
          this.programasProyectTemp[i].id_programa_formacion
        );
      }
    } else {
      Swal.fire({
        title: "No hay programas seleccionados",
        text: "No hay programas para guardar, por favor seleccione al menos un programa de formación.",
        icon: "info",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#238276",
      });
    }
  }

  obtenerConvenios() {
    Axios()
      .get("listar_programa_formacion_activos")
      .then((respuesta) => {
        this.listaProgramas = respuesta.data.results;
        this.listaProgramasFiltrado = respuesta.data.results;
      })
      .finally(() => {
        this.estadoPeticionTabla = true;
      });
  }
}
</script>
