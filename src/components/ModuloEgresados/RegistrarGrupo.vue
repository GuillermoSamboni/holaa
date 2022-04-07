<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena"></h1>

        <div class="d-flex justify-content-around mt-3">
          <h3 class="circle ">1</h3>
          <h3 class="circle circle-seleccionado">2</h3>
          <h3 class="circle">3</h3>
        </div>
      </div>
      <div class="card-body">
        <!-- procesos-->
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Proceso<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="herramienta1"
                  v-validate="'required'"
                  v-model="proceso.id_proceso"
                >
                  <option value="" selected disabled>
                    Selecciona el proceso
                  </option>
                  <option
                    v-for="(proceso, key) in procesos"
                    :key="key"
                    v-bind:value="proceso.id_proceso"
                  >
                    {{ proceso.proceso }}
                  </option>
                </select>
                <small v-show="errors.has('herramienta1')" class="text-danger">
                  {{ errors.first("herramienta1") }}
                </small>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div id="campo">
              <label class="font-weight-bold mt-2"
                >Grupo<span class="text-danger">*</span>:</label
              >
              <div>
                <select
                  class="form-control"
                  name="grupo"
                  v-validate="'required'"
                  v-model="proceso.id_grupo"
                >
                  <option value="" selected disabled>
                    Selecciona el grupo
                  </option>
                  <option
                    v-for="(grupo, key) in grupos"
                    :key="key"
                    v-bind:value="grupo.id_grupo"
                  >
                    {{ grupo.grupo }}
                  </option>
                </select>
                <small v-show="errors.has('grupo')" class="text-danger">
                  {{ errors.first("grupo") }}
                </small>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <base-button
              type="azul-sena"
              @click.prevent="validarFormulario()"
              class="btn btn-block bg-azul-sena text-white"
              >Registrar</base-button
            >
          </div>
          
        </div>
        <br />
        <br />

        <h2 class="text-center text-azul-sena">LINEAMIENTO</h2>
        <div class="table-responsive">
          <table class="table table-hover table-inverse">
            <thead class="bg-gradient-azul-sena text-white" id="listado">
              <tr>
               <th>ACCIÓN</th>
                <th>RESULTADO ESPERADO</th>
                <th>HERRAMIENTA DE SEGUIMIENTO 1</th>
                <th>OBSERVACIÓN 1</th>
                <th>PERIODICIDAD 1</th>
                <th>HERRAMIENTA DE SEGUIMIENTO 2</th>
                <th>OBSERVACIÓN 2</th>
                <th>PERIODICIDAD 2</th>
                <th>RESPONSABLE DIRECCIÓN GENERAL</th>
                <th>RESPONSABLE DESPACHO REGIONAL</th>
                <th>RESPONSABLE CENTRO DE FORMACIÓN</th>
                <th>ANEXO</th>
                <th>GLOSARIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                
                
                <td>{{ listaActividad.actividad}}</td>
                <td>{{ listaActividad.resultado_esperado }}</td>
                <td>{{ listaActividad.herramienta_seguimiento1 }}</td>
                <td>{{ listaActividad.observacion1 }}</td>
                <td>{{ listaActividad.periodicidad1 }}</td>
                <td>{{ listaActividad.herramienta_seguimiento2 }}</td>
                <td>{{ listaActividad.observacion2 }}</td>
                <td>{{ listaActividad.periodicidad2 }}</td>
                <td>{{ listaActividad.rol_operativo_general }}</td>
                <td>{{ listaActividad.rol_operativo_regional }}</td>
                <td>{{ listaActividad.rol_operativo_centro }}</td>
                <td>{{ listaActividad.anexo }}</td>
                <td>{{ listaActividad.glosario }}</td>
             
                <!-- <td>
                  <span v-b-tooltip.hover.top title="Eliminar Actividad" >                      
                    <a @click="eliminarActividad(actividad.id_actividad, key)" class="btn btn-sm bg-azul-sena text-white">
                      <i class="fas fa-trash"></i>
                    </a>
                  </span>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/Axios";
import Swal from "sweetalert2";
export default {
  name: "CrearGrupo",
  mounted() {
    this.cargarDatos();
    this.id_actividad = this.$route.params.actividad_id;
    this.cargarActividad(this.id_actividad);
  },
  created() {
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "No pude ser negativo",
        max: () =>
          "La suma de los cupos no puede ser mayor a " +
          this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  },
  data: function() {
    return {
      procesos: [],
      grupos: [],
      listaActividad: [],
      id_actividad: "",
      proceso: {
        id_proceso: "",
        id_grupo: "",
        id_usuario: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,
        
      },
    };
  },
  methods: {
    cargarDatos() {
      Axios()
        .get("crear_grupo")
        .then((respuesta) => {
          this.procesos = respuesta.data.results.procesos;
          this.grupos = respuesta.data.results.grupos;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        });
    },
    cargarActividad(id) {
      Axios()
        .get("ver_actividad/" + id)
        .then((respuesta) => {
          this.listaActividad = respuesta.data.results.actividad;
        })
        .catch(() => {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un debe crear una actividad antes!",
            "error"
          );
        });
    },
    registrarGrupo() {
      Axios()
        .post("almacenar_grupo/" + this.id_actividad, this.proceso)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            Swal.fire({
              title: "Grupo registrado",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#238276",
            });
            const actividad_id = this.id_actividad
             this.$router.push({ name: 'RegistrarIndicadorPANE', params: { actividad_id } })
          } else {
            Swal.fire({
              title: "Grupo no registrado",
              icon: "error",
              text: respuesta.message,
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
    },
    validarFormulario() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          // el formulario se validó y tiene los datos que corresponden por campo
          //   this.RegistrarActividad();
          this.registrarGrupo();
        }
      });
    },
  },
};
</script>

<style>
.circle {
  font-size: 25px;
  padding: 10px 22px;
  border: 1px solid #238276;
  border-radius: 255px;
  color: #238276;
}
.circle-seleccionado {
  background-color: #238276;
  color: white;
}
.campos .primera-seccion {
  margin: 0%;
  width: 400px;
}
.campos .segunda-seccion {
  width: 1000px;
}

.campos .tercera-seccion {
  width: 200px;
}

.campos {
  margin: 0%;
  width: 100%;
}
</style>
