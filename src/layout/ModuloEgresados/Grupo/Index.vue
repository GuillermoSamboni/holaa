<template>
    <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">PLAN DE ACCIÓN NACIONAL PARA EGRESADOS</h1>
        </h1>
      </div>
      <div class="card-body">
        <crearGrupo/>
        
        <!-- <div class="table-responsive">
          <table class="table table-hover table-inverse">
            <thead class="bg-gradient-azul-sena text-white" id="listado">
              <tr>
                <th class="text-nowrap">Tipo de proceso</th>
                <th class="text-nowrap">Proceso</th>
                <th class="text-nowrap">Dependencia</th>
                <th class="text-nowrap">Grupo</th>
                
              </tr>
            </thead>

            <tbody>
              <tr v-for="(grupo, key) in listaGrupos" :key="key" >
                <td>
                  {{ grupo.tipo_proceso }}
                </td>

                <td>
                  {{ grupo.proceso }}
                </td>

                <td>
                  {{ grupo.dependencia }}
                </td>

                <td>
                  {{ grupo.grupo }}
                </td>
              </tr>
            </tbody>
          </table>
         
        </div> -->
      </div>
    </div>
  </div>
    
</template>

<script lang="ts">
import Axios from "@/Axios";
import { Component, Vue } from "vue-property-decorator";
import CrearGrupo from "../../../components/ModuloEgresados/RegistrarGrupo.vue";

@Component({
  components: {
    CrearGrupo,
    
  },
})

export default class ListarGrupos extends Vue{
listaGrupos: any[] = [];


//  mounted() {
//     this.listarGrupos();
//   }

 
  //  listarGrupos() {
  //   Axios()
  //     .get("listar_grupos/"+1)
  //     .then((respuesta) => {
  //         this.listaGrupos = respuesta.data.results;
        
  //     })
  //     .catch((error) => {
  //     });
  // }
}
</script>