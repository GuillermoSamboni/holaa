<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">LISTA CONVOCATORIA ENI</h1>
        </h1>
      </div>
      <div class="card-body">
        <div class="row my-3">
          <div class="col-md-5 col-lg-4 mt-2">
            <input
              type="text"
              class="form-control"
              placeholder="buscar"
              v-model="filter"
            />
          </div>
          <div class="offset-md-2 col-md-5 offset-lg-4 col-lg-4 mt-2">
            <select
              class="form-control"
              name="fecha"
              id="fecha"
              v-model="fecha_pic"
              @change="obtenerConvocatorias()"
            >
              <option
                v-for="(fecha, index) in fechas_pic"
                :key="index"
                :value="fecha.plan_institucional_id"
              >
                {{ fecha.plan_institucional_id }}
              </option>
            </select>
          </div>
          <!--<div class="offset-md-2 col-md-5 offset-lg-4 col-lg-4 mt-2">
           <router-link
                        class="btn bg-azul-sena text-white"
                        :to="{
                          name: 'VerDetalleCapacitacionENI',
                          params: { 
                              id: convocatoria.id_convocatoria,
                              ver: false,
                              crear: true,
                          }
                        }">
                        Registrar Capacitación
                      </router-link>
          </div>-->
        </div>
        <div class="text-center" v-if="estadoPeticion">
          <!-- <h1>Cargando...</h1> -->
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="table-responsive" v-if="!estadoPeticion">
          <table class="table table table-hover table-inverse">
            <thead class="bg-gradient-naranja-sena text-white" id="listado">
              <tr>
                <th @click="ordenar(1, 'str')" class="text-nowrap">
                  Convocatoria
                </th>
                <th @click="ordenar(1, 'str')" class="text-nowrap">
                  Capacitación
                </th>
                <th @click="ordenar(3, 'str')" class="text-nowrap">
                  Inicio - Fin
                </th>
                <th @click="ordenar(3, 'str')" class="text-nowrap">Fase</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-if="
                  listaConvocatorias != null && listaConvocatorias.length != 0
                "
              >
                <tr
                  v-for="(convocatoria, key) in filtrar(listaConvocatorias)"
                  :key="key"
                >
                  <td>{{ convocatoria.convocatoria }}</td>
                  <td>
                    {{ convocatoria.capacitacion }}
                  </td>
                  <td>
                    {{ convocatoria.pic_convocatoria[0].fecha_inicio }} -
                    {{ convocatoria.pic_convocatoria[0].fecha_final }}
                  </td>
                  <td v-if="convocatoria.pic_fase_id == 1">Creación</td>
                  <td v-if="convocatoria.pic_fase_id == 2">Postulación</td>
                  <td v-if="convocatoria.pic_fase_id == 3">Validación</td>
                  <td v-if="convocatoria.pic_fase_id == 4">Terminación</td>
                  <td v-if="convocatoria.pic_fase_id == 5">Cancelación</td>
                  <td class="campos">
                    <span
                      tooltip="Ver detalle Convocatoria ENI"
                      tooltip-flow="top"
                    >
                      <router-link
                        class="btn btn-sm bg-azul-sena text-white"
                        :to="{
                          name: 'VerDetalleConvocatoriaENI',
                          params: {
                            id: convocatoria.id_pic_convocatoria,
                            ver: true,
                            crear: false,
                          },
                        }"
                      >
                        <i class="fas fa-eye"></i>
                      </router-link>
                    </span>
                    <span
                      tooltip="Modificar Convocatoria ENI"
                      tooltip-flow="top"
                    >
                      <router-link
                        class="btn btn-sm bg-azul-sena text-white"
                        :to="{
                          name: 'VerDetalleConvocatoriaENI',
                          params: {
                            id: convocatoria.id_pic_convocatoria,
                            ver: false,
                            crear: false,
                          },
                        }"
                      >
                        <i class="fas fa-edit"></i>
                      </router-link>
                    </span>
                    <span tooltip="Eliminar Convocatoria" tooltip-flow="top">
                      <a
                        @click="
                          eliminarConvocatoria(
                            convocatoria.id_pic_convocatoria,
                            key
                          )
                        "
                        class="btn btn-sm bg-azul-sena text-white"
                      >
                        <i class="fas fa-trash"></i>
                      </a>
                    </span>
                    <span
                      v-if="convocatoria.pic_fase_id == 2"
                      tooltip="Lista de Inscritos"
                      tooltip-flow="top"
                    >
                      <router-link
                        class="btn btn-sm bg-azul-sena text-white"
                        :to="{
                          name: 'PostulacionesConvocatoriaENI',
                          params: {
                            id: convocatoria.id_pic_convocatoria,
                          },
                        }"
                      >
                        <i class="fas fa-table"></i>
                      </router-link>
                    </span>
                  </td>
                </tr>
              </template>
              <tr v-else>
                No hay convocatorias
              </tr>
            </tbody>
          </table>
          <!-- <h4 class="" v-else-if="!estadoPeticion">No tienes acceso!</h4> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class Login extends Vue {
  estadoPeticion = true;
  listaConvocatorias = [];
  filter = "";
  fecha_pic = "2021";
  id_convocatoria_pic = 0;
  fechas_pic = [];

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
    this.obtenerConvocatorias();
    this.ontenerPlanInstitucional();
  }

  // obtenerConvocatorias(){
  //   Axios().get('listar_convocatoria_pics/' + this.fecha_pic).then(respuesta => {
  //   //filtrar solo las convocatorias que esten en etapa de validación -----------------------------------------------------------------------------------
  //     this.listaConvocatorias = respuesta.data.results
  //     this.estadoPeticion = false;
  //   })
  // }
  obtenerConvocatorias() {
    Axios()
      .get("listar_convocatoria_pics/" + this.fecha_pic)
      .then((respuesta) => {
        this.listaConvocatorias = respuesta.data.results;

        if (this.listaConvocatorias != null) {
          this.listaConvocatorias = this.listaConvocatorias.filter(
            (item) => item.pic_fase_id == 3
          );
        }
        this.estadoPeticion = false;
      });
  }
  ontenerPlanInstitucional() {
    Axios()
      .get("listar_plan_institucional")
      .then((respuesta) => {
        this.fechas_pic = respuesta.data.results;
      });
  }
  //eliminar convocatoria
  eliminarConvocatoria(id, index) {
    Swal.fire({
      title:
        "Eliminar Convocatoria " + this.listaConvocatorias[index].id_pic + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete("eliminar_convocatoria_pic/" + id)
          .then((respuesta) => {
            Swal.fire({
              title: "Convocatoria Eliminada",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
              cancelButtonColor: "#2d2d2d",
            });
            this.listaConvocatorias.splice(index, 1);
          });
      }
    });
  }

  filtrar(lista: any[]) {
    let resp;
    if (this.filter != "") {
      resp = lista.filter(
        (item) =>
          item.capacitacion
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
<style scoped>
.campos a {
  margin: 0%;

  width: 100%;
  font-size: 70%;
  text-align: center;
}

.campos {
  margin: 0%;

  width: 100%;
  display: grid;
  margin-right: -20px;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

@media (max-width: 970px) {
  .campos {
    display: grid;
    width: 80%;
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
    align-items: flex-start;
    text-align: center;
    justify-content: center;
  }
  .campos a {
    margin: 0%;

    width: 80%;
    margin-right: 2px;
    font-size: 70%;
  }
}
</style>
