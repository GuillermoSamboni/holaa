<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR ALISTAMIENTO</h1>
        <hr />
        <div>
          <!-- formulario -->                    
        </div>
        <div class="card-footer">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1">
              <button @click="$router.back()" class="btn btn-azul-sena w-100">
                Volver
              </button>
            </div>
            <div class="col-lg-4 col-sm-12 mt-1">
              <button class="btn btn-azul-sena w-100">
                Finalizar
              </button>
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

  @Component({
    components: {
    },
  })
  export default class Alistamiento extends Vue {
    inactivo = false;

    docAlistamiento = {
      convenio_id: "",
      colegio_id: "",
      autodiagnostico_id: "",
      novedad_id: "",
      acta_compromiso_id: "",
      articulacion_curriculo_id: "",
    }

    mounted() {
      this.docAlistamiento.convenio_id = this.$route.params.id_convenio;
      this.docAlistamiento.colegio_id = this.$route.params.id_colegio;
    }
   
  }
</script>
<style>
  .circulo {
    font-size: 25px;
    padding: 10px 22px;
    border: 1px solid #238276;
    border-radius: 255px;
    color: #238276;
  }
  .circulo-selecionado {
    background-color: #238276;
    color: white;
  }

  .inputfile-1 + label {
    color: #fff;
    font-size: 0.9em;
  }

  .inputfile-1:focus + label,
  .inputfile-1.has-focus + label,
  .inputfile-1 + label:hover {
    color: #fff;
  }

  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    color: #fff;
    background-color: #238276;
  }

  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    color: #fff;
    background-color: #238276;
  }

  .nav-pills .nav-link {
    color: #333;
  }
  .modif {
    color: #333;
  }

  .rigth {
    margin-left: 27em;
  }
</style>
