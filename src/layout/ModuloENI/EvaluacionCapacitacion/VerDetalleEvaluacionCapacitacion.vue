<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena " v-if="!crear && ver">
          EVALUACION DE CAPACITACION
        </h1>
        <h1 class="text-azul-sena " v-else-if="crear">
          CREAR EVALUACION DE CAPACITACION
        </h1>
        <h1 class="text-azul-sena " v-else>
          MODIFICAR EVALUACION DE CAPACITACION
        </h1>
      </div>
      <div>
        <div class="d-flex justify-content-around mt-3">
          <h3 class="circulo circulo-selecionado">1</h3>
          <h3
            class="circulo"
            :class="{ 'circulo-selecionado': paginaFormulario > 0 }"
          >
            2
          </h3>
          <h3
            class="circulo"
            :class="{ 'circulo-selecionado': paginaFormulario == 2 }"
          >
            3
          </h3>
        </div>
        <Formulario1
          v-if="paginaFormulario == 0"
          :contenidoCurso="preguntas[0]"
          @respFormulario1="actualizarRespuestas"
        ></Formulario1>
        <Formulario2
          v-if="paginaFormulario == 1"
          :contenidoCurso="preguntas[1]"
          @respFormulario2="actualizarRespuestas"
        ></Formulario2>
        <Formulario3
          v-if="paginaFormulario == 2"
          :contenidoCurso="preguntas[2]"
          :contenidoCurso2="preguntas[3]"
          @respFormulario3="actualizarRespuestas"
        ></Formulario3>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario != 0">
            <button
              @click="(paginaFormulario -= 1), moverPantalla()"
              class="btn btn-azul-sena w-100"
            >
              Anterior
            </button>
          </div>
          <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario != 2">
            <button
              @click="validarFormulario()"
              class="btn btn-azul-sena w-100"
            >
              Siguiente
            </button>
          </div>
          <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario == 2">
            <button
              @click="crearConvocatoriaCapacitacion()"
              class="btn btn-azul-sena w-100"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import Axios from '@/Axios';
  import Swal from 'sweetalert2';
  import Component from 'vue-class-component'
  import { Vue } from 'vue-property-decorator';
  import Formulario1 from './Formulario_1.vue'
  import Formulario2 from './Formulario_2.vue';
  import Formulario3 from './Formulario_3.vue';

  @Component({
    components: {
      Formulario1,
      Formulario2,
      Formulario3
    }
  })
  export default class VerDetalleEvaluacionCpacitacion extends Vue {

    ver: any = false;
    crear: any = true;
    paginaFormulario: number = 0;
    preguntas: Tabla[] = [];

    mounted() {
      if (this.$route.params.ver != undefined && this.$route.params.crear != undefined) {
        this.ver = this.$route.params.ver;
        this.crear = this.$route.params.crear;
      }
      this.obtenerPreguntas()
    }
    obtenerPreguntas() {
      Axios().get('crear_evaluacion_pic').then(respuesta => {
        for (const tabla of respuesta.data.results) {
          for (const pregunta of tabla.pic_pregunta) {
            pregunta.calificacion = 0
            pregunta.justificacion_respuesta = ''
          }
        }
        this.preguntas = respuesta.data.results

      })
    }
    validarFormulario() {
      for (const tabla of this.preguntas[this.paginaFormulario].pic_pregunta) {
        if (tabla.calificacion < 4 && tabla.calificacion > 0 && tabla.justificacion_respuesta == '') {
          Swal.fire({
            title: 'Es necesario justificar las respuestas que fueron respondidas entre 1 y 3',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#238276'
          })
          return true;
        } else if (tabla.calificacion == 0) {
          Swal.fire({
            title: 'Es necesario marcar la calificación de una o varias preguntas',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#238276'
          })
          return true;
        }
      }
      if (this.paginaFormulario == 2 && this.preguntas[3].pic_pregunta[0].calificacion == 1 &&
        this.preguntas[3].pic_pregunta[0].justificacion_respuesta == '') {
        Swal.fire({
          title: 'Faltan las justificaciones de una o varias preguntas',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#238276'
        })
        return true;
      }
      this.moverPantalla()
      this.paginaFormulario += 1
      return false;
    }
    moverPantalla() {
      window.scrollTo(0, 0)
    }
    crearConvocatoriaCapacitacion() {
      let mensaje = true
      let error = false
      if (this.validarFormulario()) {
        return;
      }
      for (const pregunta of this.preguntas) {
        if (!error) {
          for (const tabla of pregunta.pic_pregunta) {
            if (tabla.tipo == 'N' && !error) {
              Axios().post('almacenar_evaluacion_pic', {
                id_pic_pregunta: tabla.id_pic_pregunta,
                id_pic_inscripcion: this.$route.params.id_pic_inscripcion,
                respuesta_numero: tabla.calificacion,
                respuesta_texto: '',
                justificacion_respuesta: tabla.justificacion_respuesta,
              }).then(resp => {
              }).catch(error => {
                Axios().delete('eliminar_evaluacion_pic/' + this.$route.params.id_pic_inscripcion).then(() => {
                  Swal.fire({
                    title: 'Error en el servidor',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: "#238276",
                    customClass: {
                      confirmButton: 'btn btn-azul-sena'
                    }
                  })
                  error = true
                })
              })
            } else if (!error) {
              Axios().post('almacenar_evaluacion_pic', {
                id_pic_pregunta: tabla.id_pic_pregunta,
                id_pic_inscripcion: this.$route.params.id_pic_inscripcion,
                respuesta_numero: 0,
                respuesta_texto: tabla.justificacion_respuesta,
                justificacion_respuesta: ''
              }).then(resp => {
                if (mensaje) {
                  Swal.fire({
                    title: 'Capacitación Evaluada',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: "#238276",
                    customClass: {
                      confirmButton: 'btn btn-azul-sena'
                    }
                  })
                  this.$router.back()
                }
                mensaje = false
              }).catch(error => {
                Axios().delete('eliminar_evaluacion_pic/' + this.$route.params.id_pic_inscripcion).then(() => {
                  Swal.fire({
                    title: 'Error en el servidor',
                    icon: 'error',
                    text: 'vuelve a intentarlo',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                      confirmButton: 'btn btn-azul-sena'
                    }
                  })
                  error = true
                })
                this.$router.push({ name: "GestionarCapacitacionENI" });
              })
            }
          }
        }
      }
    }
    actualizarRespuestas(respuesta) {
      this.preguntas[this.paginaFormulario] = respuesta
    }
  }
  export class Tabla {
    id_pic_grupo_pregunta: number
    pic_grupo_pregunta: string
    pic_pregunta: Pregunta[]
  }
  export class Pregunta {
    calificacion: number = 0
    id_pic_pregunta: number
    pic_grupo_pregunta_id: number
    pic_pregunta: string
    tipo: string
    justificacion_respuesta: string
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
</style>