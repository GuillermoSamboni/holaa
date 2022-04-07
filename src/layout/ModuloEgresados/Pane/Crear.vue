<template>
   <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          REGISTRAR LINEAMIENTO PANE
        </h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">

         <!-- tema pane -->
         <div>
            <label class="mt-2 font-weight-bold">
              Tema Pane
              <span
                class="text-danger font-weigth-bold"
                tooltip="Campo Requerido"
                tooltip-flow="top">*</span>:
            </label>
            <div class="input-group">
              <select
                v-model="lineamientoPane.id_pane_tema"
                name="tema"
                id="tema"
                placeholder="seleccione el tema"
                v-validate="{ required: true}"
                class="form-control mb-3">
                <option value="" selected disabled>seleccione el tema</option>
                <option v-for="(pane, index) in temasPane" :value="pane.id_pane_tema" :key="index">{{pane.tema}}</option>
              </select>
            </div>
            <small
              v-show="errors.has('tema')"
              class="text-danger font-weigth-bold">
              {{ errors.first("tema") }}
            </small>
         </div>

         <!-- lineamiento -->
         <div>
            <label class="mt-2 font-weight-bold">Lineamiento<span class="text-danger">*</span>:</label>
            <div>
              <textarea
                type="text"
                class="form-control"
                name="lineamiento"
                id="lineamiento"
                placeholder="ingrese el lineamiento..."
                v-model="lineamientoPane.lineamiento"
                v-validate="{ required: true, alpha_spaces:false}"/>
              <small v-show="errors.has('lineamiento')" class="text-danger">
                {{ errors.first("lineamiento") }}
              </small>
            </div>
         </div>

         <!-- accion -->
         <div>
            <label class="mt-2 font-weight-bold">Acción<span class="text-danger">*</span>:</label>
            <div>
              <textarea
                type="text"
                class="form-control"
                name="accion"
                id="accion"
                placeholder="ingrese la acción..."
                v-model="lineamientoPane.accion"
                v-validate="{ required: true, alpha_spaces:false}"/>
              <small v-show="errors.has('accion')" class="text-danger">
                {{ errors.first("accion") }}
              </small>
            </div>
         </div>

          <!-- resultado esperado -->
         <div>
            <label class="mt-2 font-weight-bold">Resultado Esperado<span class="text-danger">*</span>:</label>
            <div>
              <textarea
                type="text"
                class="form-control"
                name="resultado_esperado"
                id="resultado_esperado"
                placeholder="ingrese el resultado esperado..."
                v-model="lineamientoPane.resultado_esperado"
                v-validate="{ required: true, alpha_spaces:false}"/>
              <small v-show="errors.has('resultado_esperado')" class="text-danger">
                {{ errors.first("resultado_esperado") }}
              </small>
            </div>
         </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click="validarFormulario()"
              class="btn btn-block bg-azul-sena text-white">Registrar</base-button>
          </div>
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'GestionarPICENI',
              }">
              Volver
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script lang='ts'>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class CrearPane extends Vue {
  temasPane = null

  lineamientoPane = {
    id_pane_tema: null,
    lineamiento: '',
    accion: '',
    resultado_esperado: ''
  }

  mounted() {
    this.obtenerPane()
  }

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "Fecha mayor o igual a 2021",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite números ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales"
      },
    };
    this.$validator.localize("es", dict);
  }
  
  obtenerPane() {
    Axios()
      .get("crear_lineamiento_pane"  )
     
      .then((respuesta) => {
          this.temasPane = respuesta.data.results
      });
  }

  almacenarPane(){
    Axios().post('almacenar_lineamiento_pane', this.lineamientoPane).then(respuesta => {
      if (respuesta.data.status == "success") {
        Swal.fire({
        title: "LINEAMIENTO PANE CREADO",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "btn btn-azul-sena",
        },
        });
        this.$router.push({ name: "ListarPane" });
      }else{
        Swal.fire({
        title: "Error Lineamiento pane no creado",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "btn btn-azul-sena",
        },
        });
        
      }
      
       
      
    }).catch(()=>{
      Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
    });
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.almacenarPane()
      }
    });
  }
}
</script>


<style>