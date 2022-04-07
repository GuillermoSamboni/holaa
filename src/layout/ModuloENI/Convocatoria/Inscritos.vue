<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          <h1 class="text-azul-sena">INSCRITOS EN LA CONVOCATORIA</h1>
        </h1>
        <div class="row">
          <div>
            <small class="text-azul-sena mr-1">
              Convocatoria: {{ this.convocatoria.convocatoria }}
            </small>
          </div>
          <div>
            <small class="text-azul-sena">
              Capacitación: {{ this.convocatoria.capacitacion }}
            </small>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <button
            class="btn btn-azul-sena col-12 col-md-6 col-lg-4"
            @click="cambiarEstadoConvocatoria()"
            v-if="listaInscripciones != null"
          >
            Iniciar Validaciones
          </button>
          <paginate-links
            class="pagination justify-content-end"
            for="listaInscripciones"
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
          <!-- <input type="text" class="form-control col-3" placeholder="buscar" v-model="filter" /> -->
        </div>
        <div class="text-center" v-if="estadoPeticion">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="table-responsive" v-if="!estadoPeticion">
          <paginate
            ref="paginator"
            name="listaInscripciones"
            :list="listaInscripciones"
            :per="10"
          >
            <table class="table table table-hover table-inverse">
              <thead class="bg-gradient-naranja-sena text-white" id="listado">
                <tr class="container-fluid">
                  <th @click="ordenar(1, 'str')" class="text-nowrap">
                    Identificación
                  </th>
                  <th @click="ordenar(2, 'str')" class="text-nowrap">Nombre</th>
                  <th @click="ordenar(3, 'str')" class="text-nowrap">
                    Categorización
                  </th>
                </tr>
              </thead>
              <tbody v-if="listaInscripciones == null">
                No hay postulados aún.
              </tbody>
              <tbody v-if="listaInscripciones != null">
                <tr
                  v-for="(inscrito, key) in filtrar(
                    paginated('listaInscripciones'),
                  )"
                  :key="key"
                >
                  <td>
                    {{ inscrito.persona.identificacion }}
                  </td>
                  <td>
                    {{ inscrito.persona.primer_nombre }}
                    {{ inscrito.persona.segundo_nombre }}
                    {{ inscrito.persona.primer_apellido }}
                    {{ inscrito.persona.segundo_apellido }}
                  </td>
                  <td v-if="inscrito.categorizado < 3">
                    {{ inscrito.categorizado }}
                  </td>
                  <td v-if="inscrito.categorizado > 3">
                    3
                  </td>
                </tr>
              </tbody>
            </table>
          </paginate>
        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="listaInscripciones"
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
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Axios from '@/Axios'
import Swal from 'sweetalert2'
import AnimacionCargando from '../../../components/animacionCargando.vue'

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class Login extends Vue {
  estadoPeticion = true
  listaInscripciones = []
  paginate = ['listaInscripciones']
  filter = ''
  fecha_pic = '2021'
  fechas_pic = []
  listaAdjudicados: any = []
  id_persona = null
  adjudicar = false
  nombre = ''
  convocatoria = {
    convocatoria: '',
    fecha_inicio: '',
    fecha_final: '',
    lugar: '',
    perfiles_requisitos: '',
    financiacion: '',
    id_pic_convocatoria: '',
    para_funcionarios: '',
    pertenece_a_red: 'SI', //dato quemado
    pic_id: '',
    plan_institucional_id: '',
    id_pic: '',
    pic_fase_id: 0,
    id_usuario_autenticado: '',
    nacional: '',
    id_municipio: '',
  }

  constructor() {
    super()
    const dict = {
      messages: {
        required: () => 'Campo obligatorio',
        min: () => 'Mínimo 8 caracteres',
        // email: () => "Correo invalido",
      },
    }
    this.$validator.localize('es', dict)
  }

  mounted() {
    this.obtenerPic(this.$route.params.id)
    this.obtenerInscritos()
  }

  obtenerInscritos() {
    let id = this.$route.params.id
    Axios()
      .get('listar_inscripciones_pic/' + id)
      .then((respuesta) => {
        this.listaInscripciones = respuesta.data.results
        this.estadoPeticion = false
      })
  }

  obtenerPic(id) {
    Axios()
      .get('editar_convocatoria_pic/' + id)
      .then((respuesta) => {
        if (respuesta.data.status == 'success') {
          this.convocatoria = respuesta.data.results
        } else {
          Swal.fire({
            title: 'Hay un problema',
            text: respuesta.data.message,
            icon: 'error',
          })
          this.$router.push('GestionarConvocatoriaENI')
        }
      })
  }
  cambiarEstadoConvocatoria() {
    const id_usuario = JSON.parse(sessionStorage.getItem('usuario'))
    Axios()
      .put('/actualizar_fase_pic/' + this.$route.params.id, {
        id_pic_convocatoria: this.$route.params.id,
        pic_fase_id: 3,
        id_usuario_actualiza: id_usuario.id_usuario,
      })
      .then(() => {
        Swal.fire({
          title: 'Convocatoria ',
          text: this.convocatoria.convocatoria +","+ ' pasó a fase de Validación.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#238276',
          icon: 'success',
        })
        this.$router.back()
      })
      .catch(() => {
        Swal.fire({
          title: 'ERROR',
        })
      })
  }

  filtrar(lista: any[]) {
    let resp
    if (this.filter != '') {
      resp = lista.filter(
        (item) =>
          item.capacitacion
            .substring(0, this.filter.length)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') === this.filter.toLowerCase(),
      )
    } else {
      resp = lista
    }
    return resp
  }
  ordenar(n: number, type: string) {
    let rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0

    const table: any = document.getElementById('listado')
    switching = true
    dir = 'asc'

    while (switching) {
      switching = false
      rows = table.rows
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false
        x = rows[i].getElementsByTagName('TD')[n]
        y = rows[i + 1].getElementsByTagName('TD')[n]
        if (dir == 'asc') {
          if (
            (type == 'str' &&
              x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
            (type == 'int' && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))
          ) {
            shouldSwitch = true
            break
          }
        } else if (dir == 'desc') {
          if (
            (type == 'str' &&
              x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) ||
            (type == 'int' && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))
          ) {
            shouldSwitch = true
            break
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
        switching = true
        switchcount++
      } else {
        if (switchcount == 0 && dir == 'asc') {
          dir = 'desc'
          switching = true
        }
      }
    }
  }
}
</script>
<style></style>
