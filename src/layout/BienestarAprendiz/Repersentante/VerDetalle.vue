<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REPRESENTANTE</h1>
      </div>
      <div v-if="!estado">
        <AnimacionCargando />
      </div>
      <!-- Mi Educacion -->
      <div class="card-body row" v-if="estado">
        <!-- inicio de cambios  -->
        <div class="col-12 col-md-8 mx-auto">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Primer Nombre:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ datosVacios(representante.primer_nombre)}}
                </p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Segundo Nombre:</strong>
              </div>
              <div id="contenido">
                <p id="texto">
                  {{ datosVacios(representante.segundo_nombre) }}
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Primer Apellido:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(representante.primer_apellido) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Segundo Apellido:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(representante.segundo_apellido) }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Correo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.correo) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Fecha de nacimiento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.fecha_nacimiento) }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Telefono móvil:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.telefono_movil) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Telefono fijo:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.telefono_fijo)}}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Genero:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.genero_id) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Estado Civil:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.estado_civil_id) }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Numero de Documento:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.identificacion) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Dirección:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.direccion) }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Estrato:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{  datosVacios(usuario.persona.estrato) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Localidad:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.localidad) }}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong> Nombre de Ficha:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(representante.programa_formacion) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Porcentaje de discapacidad:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(usuario.persona.procentaje_discapacidad )}}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Jornada:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{  datosVacios(representante.jornada) }}</p>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-6">
              <div>
                <strong>Modalidad:</strong>
              </div>
              <div id="contenido">
                <p id="texto">{{ datosVacios(representante.modalidad )}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- fin de cambios  -->

      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'Representantes',
              }"
            >
              Volver
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";
import AnimacionCargando from "@/components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class RepresentanteVerEditar extends Vue {
  estado = false;

  usuario = ""
  representante = {
    id_persona: null,
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    identificacion: null,
    modalidad: "",
    jornada: "",
    programa_formacion: "",
    id_ficha_caracterizacion: null,
  };

  mounted() {
    this.representante.id_persona = this.$route.params.id;
    this.obtenerPersona(this.representante.id_persona);
    this.buscarUsuario(this.representante.id_persona);
  }
  obtenerPersona(id) {
    Axios()
      .post("crear_representante", { identificacion: id })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.representante = respuesta.data.results;
        } else {
          Swal.fire({
            title: respuesta.data.message,
          }).then(() => {
            this.$router.back();
          });
        }
      })
      .finally(() => {
        this.estado = true;
      });
  }
  datosVacios(dato){
     if (dato==null || dato=="" || dato==" ") {
      return "No hay datos registrados"
    }else{
      return dato
    }
  }
  async buscarUsuario(id_cedula) {
    await Axios()
      .post("buscar_usuario", { identificacion: id_cedula })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
            this.obtenerUsuario(respuesta.data.results.id_usuario);
        } else {
          Swal.fire({
            title: "perfil no existe",
            icon: "error",
          });
        }
      })
      .catch(() => {});
  }
  
  async obtenerUsuario(idUsuario) {
      await Axios()
        .get("listar_usuario/" + idUsuario)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.usuario = respuesta.data.results;
          } else {
            Swal.fire("ERROR!", "No se ha encontrado", "error");
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
}
</script>

<style scoped>
#contenido {
  text-align: center;
}
#texto {
  text-align: justify;
}
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

#contenido {
  text-align: center;
}
#texto {
  text-align: justify;
}
</style>


