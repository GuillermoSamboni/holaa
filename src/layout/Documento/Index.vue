
<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA DOCUMENTOS</h1>
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
                placeholder="Buscar Documento"
                v-model="filter"
                @keyup.prevent="documentoFiltrado()"
              />
            </div>
            <div class="col-md-9 col-lg-9 mt-4">
              <paginate-links
                class="pagination justify-content-end"
                for="listaDocumentosFiltrado"
                :limit="2"
                :hide-single-page="true"
                :show-step-links="true"
                :full-page="true"
                :classes="{
                  ul: 'simple-links-container',
                  li: 'simple-links-item',
                  liActive: ['simple-links-item', 'active1'],
                  'li.active': 'active1'
                }"
              >
              </paginate-links>
            </div>
          </div>
          <div class="table-responsive">
            <paginate
              ref="paginator"
              name="listaDocumentosFiltrado"
              :list="listaDocumentosFiltrado"
              :per="10"
            >
              <table class="table table-hoverble">
                <thead id="listado">
                  <tr>
                    <th scope="col">Documento</th>
                    <th scope="col">Persona</th>
                    <th scope="col">Fecha</th>
                    <th scope="col" class="col-sm-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <template>
                    <tr v-for="(docs, key) in paginated('listaDocumentosFiltrado')" :key="key">
                      <td>{{ docs.documento }}</td>
                      <td>
                        {{ docs.primer_nombre }} {{ docs.segundo_nombre }}
                        {{ docs.primer_apellido }} {{ docs.segundo_apellido }}
                      </td>
                      <td>{{ docs.fecha }}</td>

                      <td scope="row">
                        <div
                          class="btn-toolbar btn-responsive-table"
                          role="toolbar"
                        >
                          <div
                            class="btn-group btn-spc"
                            tooltip="Ver Documento"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'VerDetalleDocumento',
                                params: {
                                  id: docs.id_documento
                                }
                              }"
                            >
                              <i class="fas fa-eye"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Modificar Documento"
                            tooltip-flow="top"
                          >
                            <router-link
                              class="btn btn-sm bg-azul-sena text-white"
                              :to="{
                                name: 'ModificarDocumento',
                                params: {
                                  id: docs.id_documento
                                }
                              }"
                            >
                              <i class="fas fa-edit"></i>
                            </router-link>
                          </div>
                          <div
                            class="btn-group btn-spc"
                            tooltip="Eliminar Documento"
                            tooltip-flow="top"
                          >
                            <a
                              @click="
                                eliminarDocs(docs.id_documento, docs.documento)
                              "
                              class="btn btn-sm bg-azul-sena text-white"
                            >
                              <i class="fas fa-trash"></i>
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </paginate>
          </div>
          <paginate-links
            class="pagination justify-content-end"
            for="listaDocumentosFiltrado"
            :limit="2"
            :hide-single-page="true"
            :show-step-links="true"
            :full-page="true"
            :classes="{
              ul: 'simple-links-container',
              li: 'simple-links-item',
              liActive: ['simple-links-item', 'active1'],
              'li.active': 'active1'
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
  import Docs from "@/components/Documentos/Documento.vue";


  @Component({
    components: {
      AnimacionCargando,
      Docs
    },
  })
  export default class Documento extends Vue {
    listaDocumentos = [];
    listaDocumentosFiltrado: any[] = [];
    paginate = ["listaDocumentosFiltrado"];

    estadoPeticionTabla = false;
    filter = "";

    // documentos = {
    //   id_documento: "",
    //   ruta: "",
    //   documento: "",
    //   persona_id: "",
    //   primer_nombre: "",
    //   segundo_nombre: "",
    //   primer_apellido: "",
    //   segundo_apellido: "",
    //   fecha: ""
    // }

    obtenerDocs() {
      Axios()
        .get("listar_documento")
        .then((respuesta) => {
          this.listaDocumentos = respuesta.data.results;
          this.listaDocumentosFiltrado = respuesta.data.results;
        })
        .finally(() => {
          this.estadoPeticionTabla = true;
        });
    }

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
      this.obtenerDocs();
    }

    eliminarDocs(id, documento, index) {
      Swal.fire({
        title: "Eliminar Documento ",
        text: documento + "?",
        icon: "warning",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#238276",
        cancelButtonColor: "#2d2d2d",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      })
        .then((respuesta) => {
          if (respuesta.isConfirmed) {
            Axios()
              .delete("eliminar_documento/" + id)
              .then((respuesta) => {
                if (respuesta.data.status.toLowerCase() == "success") {
                  Swal.fire({
                    title: "Documento eliminado",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#238276",
                    cancelButtonColor: "#2d2d2d",
                  });
                  this.listaDocumentosFiltrado.splice(index, 1);
                } else if (respuesta.data.status.toLowerCase() == "error") {
                  Swal.fire({
                    title: "El Documento No fue eliminado",
                    text: respuesta.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#238276",
                    cancelButtonColor: "#2d2d2d",
                  });
                }
              });
          }
        });
    }

    documentoFiltrado() {
      let docsFilter = [];
      // this.listaConvocatoriasFiltrado = []

      for (let docs of this.listaDocumentos) {
        let documento = docs.documento.toLowerCase();

        if (
          documento.indexOf(this.filter) >= 0
        ) {
          docsFilter.push(docs);
        }
      }

      this.listaDocumentosFiltrado = docsFilter;
      if (this.listaDocumentosFiltrado.length == 0) {
        //busco no encontro
        Swal.fire({
          title: "No hay coincidencias",
          position: "center",
          timer: 1000,
          text: "No se encontró el documento, que coincida con la búsqueda",
          showConfirmButton: false,
          // confirmButtonText: "Aceptar",
          // confirmButtonColor: "#238276",
          backdrop: "rgba(0,0,0,0)",
          background: "#eeeeee",
        });
        this.filter = "";
        this.listaDocumentosFiltrado = this.listaDocumentos;
      }
    }
  }
</script>