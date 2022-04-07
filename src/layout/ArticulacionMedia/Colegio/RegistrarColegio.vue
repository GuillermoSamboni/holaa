<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">REGISTRAR COLEGIO</h1>
        <hr />
        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div>
              <tabs fill class="flex-column flex-sm-row">
                <!-- Id -->

                <div class="card-body">
                  <div
                    class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                  >

                    <!-- zona -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Zona
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <select
                        class="form-control"
                        id="zona"
                        name="zona"
                        v-model="colegio.zona_id"
                        v-validate="{ required: true }"
                      >
                        <option value="" selected disabled>
                          Seleccione la zona
                        </option>
                        <option
                          v-for="(listaZo, index) in lista_zona"
                          :key="index"
                          :value="listaZo.id_zona"
                        >
                          {{ listaZo.zona }}
                        </option>
                      </select>
                      <!-- v-validate="{ required }" -->
                      <small
                        v-show="errors.has('Titulo_Obtenido')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("Titulo_Obtenido") }}
                      </small>
                    </div>
                    <!-- fin zona -->

                    <!-- departamento -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Departamento
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                        >
                          *
                        </span>
                        :
                      </label>
                      <div class="input-group">
                        <select
                          v-model="departamento_actual"
                          name="departamento"
                          id="departamento"
                          v-validate="{ required: true }"
                          class="form-control mb-3"
                          @change="obtenerMunicipio(departamento_actual)"
                        >
                          <option value="" selected disabled>
                            Seleccione el departamento
                          </option>
                          <option
                            v-for="(departamento, index) in lista_departamentos"
                            :value="departamento.id_departamento"
                            :key="index"
                          >
                            {{ departamento.departamento }}
                          </option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('red')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("red") }}
                      </small>
                    </div>
                    <!-- fin departamento -->

                    <!-- municipio -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Municipio
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <select
                        class="form-control"
                        id="municipio"
                        name="municipio"
                        v-model="colegio.municipio_id"
                        v-validate="{ required: true }"
                      >
                        <option value="" selected disabled>
                          Seleccione el municipio
                        </option>
                        <template
                          v-for="(municipio, index) in lista_municipios"
                        >
                          <option :value="municipio.id_municipio" :key="index">
                            {{ municipio.municipio }}
                          </option>
                        </template>
                      </select>
                      <!-- v-validate="{ required }" -->
                      <small
                        v-show="errors.has('Titulo_Obtenido')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("Titulo_Obtenido") }}
                      </small>
                    </div>
                    <!-- fin municipio -->

                    <!-- colegio -->
                    <div>
                      <label class="font-weight-bold">Colegio</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="colegio"
                          class="form-control"
                          id="colegio"
                          placeholder="Colegio"
                          v-model="colegio.colegio"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('colegio')" class="text-danger">
                        {{ errors.first("colegio") }}
                      </small>
                    </div>
                    <!-- fin colegio -->

                    <!-- direccion -->
                    <div>
                      <label class="font-weight-bold">Dirección</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="direccion"
                          class="form-control"
                          id="direccion"
                          placeholder="Dirección"
                          v-model="colegio.direccion"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('direccion')"
                        class="text-danger"
                      >
                        {{ errors.first("direccion") }}
                      </small>
                    </div>
                    <!--  fin direccion -->

                      <!-- telefono -->
                    <div>
                      <label class="font-weight-bold">Telefono</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="telefono"
                          class="form-control"
                          id="telefono"
                          placeholder="Telefono"
                          v-model="colegio.telefono"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('telefono')"
                        class="text-danger"
                      >
                        {{ errors.first("telefono") }}
                      </small>
                    </div>
                    <!-- fin telefono -->

                    <!-- codigo dane -->
                    <div>
                      <label class="font-weight-bold">Codigo Dane</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="codigo_dane"
                          class="form-control"
                          id="codigo_dane"
                          placeholder="Codigo Dane"
                          v-model="colegio.cod_dane"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('codigo_dane')"
                        class="text-danger"
                      >
                        {{ errors.first("codigo_dane") }}
                      </small>
                    </div>
                    <!-- fin codigo dane -->

                      <!-- sector colegio -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Sector colegio
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <select
                        class="form-control"
                        id="sector"
                        name="sector"
                        v-model="colegio.sector_colegio"
                        v-validate="{ required: true }"
                      >
                        <option value="" selected disabled>
                          Seleccione el sector colegio
                        </option>
                        <option
                          v-for="(listasect, index) in lista_sector"
                          :key="index"
                          :value="listasect.id_sector"
                        >
                          {{ listasect.sector }}
                        </option>
                      </select>
                      <!-- v-validate="{ required }" -->
                      <small
                        v-show="errors.has('Titulo_Obtenido')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("Titulo_Obtenido") }}
                      </small>
                    </div>
                    <!-- fin sector colegio -->

                      <!-- secretaria -->
                    <div>
                      <label class="mt-2 font-weight-bold">
                        Secretaria
                        <span
                          class="text-danger font-weigth-bold"
                          tooltip="Campo Requerido"
                          tooltip-flow="top"
                          >*</span
                        >:
                      </label>
                      <select
                        class="form-control"
                        id="secrataria"
                        name="secrataria"
                        v-model="colegio.secretaria_id"
                        v-validate="{ required: true }"
                      >
                        <option value="" selected disabled>
                          Seleccione la secretaria
                        </option>
                        <option
                          v-for="(listaZo, index) in lista_secretaria"
                          :key="index"
                          :value="listaZo.id_secretaria"
                        >
                          {{ listaZo.secretaria }}
                        </option>
                      </select>
                      <!-- v-validate="{ required }" -->
                      <small
                        v-show="errors.has('Titulo_Obtenido')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("Titulo_Obtenido") }}
                      </small>
                    </div>
                    <!-- fin secrfetaria -->

                    <!-- estado -->
                    <div>
                      <label class="font-weight-bold">Estado</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="estado"
                          class="form-control"
                          id="estado"
                          placeholder="Estado"
                          v-model="colegio.estado"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('estado')" class="text-danger">
                        {{ errors.first("estado") }}
                      </small>
                    </div>
                    <!-- fin estado -->

                    <!-- resguardo -->
                    <div>
                      <label class="font-weight-bold">Resguardo</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="resguardo"
                          class="form-control"
                          id="resguardo"
                          placeholder="Resguardo"
                          v-model="colegio.resguardo"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('resguardo')" class="text-danger">
                        {{ errors.first("resguardo") }}
                      </small>
                    </div>
                    <!-- fin resguardo -->

                    <!-- correo -->
                    <div>
                      <label class="font-weight-bold">Correo</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="correo"
                          class="form-control"
                          id="correo"
                          placeholder="Correo"
                          v-model="colegio.correo"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('correo')" class="text-danger">
                        {{ errors.first("correo") }}
                      </small>
                    </div>
                    <!-- fin correo -->

                    <!-- calendario -->
                    <div>
                      <label class="font-weight-bold">Calendario</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="calendario"
                          class="form-control"
                          id="calendario"
                          placeholder="Calendario"
                          v-model="colegio.calendario"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('calendario')" class="text-danger">
                        {{ errors.first("calendario") }}
                      </small>
                    </div>
                    <!-- fin calendario -->

                    <!-- genero -->
                    <div>
                      <label class="font-weight-bold">Genero</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="genero"
                          class="form-control"
                          id="genero"
                          placeholder="Genero"
                          v-model="colegio.genero"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('genero')" class="text-danger">
                        {{ errors.first("genero") }}
                      </small>
                    </div>
                    <!-- fin genero -->

                    <!-- sedes -->
                    <div>
                      <label class="font-weight-bold">Sedes</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="sedes"
                          class="form-control"
                          id="sedes"
                          placeholder="Sedes"
                          v-model="colegio.sedes"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('sedes')" class="text-danger">
                        {{ errors.first("sedes") }}
                      </small>
                    </div>
                    <!-- fin sedes -->

                    <!-- jornadas -->
                    <div>
                      <label class="font-weight-bold">Jornadas</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="jornadas"
                          class="form-control"
                          id="jornadas"
                          placeholder="Jornadas"
                          v-model="colegio.jornadas"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('jornadas')"
                        class="text-danger"
                      >
                        {{ errors.first("jornadas") }}
                      </small>
                    </div>
                    <!-- fin jornadas -->

                     <!-- rector -->
                    <div>
                      <label class="font-weight-bold">Rector</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="rector"
                          class="form-control"
                          id="rector"
                          placeholder="Rector"
                          v-model="colegio.rector"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('rector')" class="text-danger">
                        {{ errors.first("rector") }}
                      </small>
                    </div>
                    <!-- fin rector -->

                  </div>
                </div>
                <!-- ------------------------------------------- -->
                <div class="text-center card-footer" v-if="estadoPeticionRegistrar" >
               <AnimacionCargando></AnimacionCargando>
            </div>
                <div class="card-footer" v-if="!estadoPeticionRegistrar">
                  <div class="row justify-content-center">
                    <div class="col-lg-4 col-sm-12 mt-1">
                      <base-button
                        type="azul-sena"
                        @click="validarFormulario()"
                        class="btn btn-block bg-azul-sena text-white"
                        >Registrar</base-button
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
              </tabs>
            </div>
            <br />
          </div>
          <!-- Fin Contenido -->
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
import AnimacionCargando from "../../../components/animacionCargando.vue";


@Component({
  components: {
    AnimacionCargando
  },
})
export default class registrarColegio extends Vue {
  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
  estadoPeticionRegistrar = false;

  listarIdiomas: any[] = [];
  listarIdiomasString: any[] = [];
  lista_modalidad: any[] = [];
  lista_zona: any[] = [];
  lista_jornada: any[] = [];
  lista_municipio: any[] = [];
  lista_departamentos: any[] = [];
  departamento_actual = null;
  lista_secretaria: any[] = [];
  lista_sector: any[] = [];
 


  infoSenaPersona = "";
  modalSenaPersona = false;
  buscarSenaPersona;

  lista_municipios = null;

  lista_idiomas: any[] = [];

  docValido = false;
  estadoPeticion = false;

  inactivo = false;

  contIdiomaGuardada = 0;

  colegio = {
    id_colegio: "",
    zona_id: "",
    municipio_id: "",
    municipio: "",
    colegio: "",
    direccion: "",
    telefono: "",
    cod_dane: "",
    sector_colegio: "",
    secretaria_id: "",
    estado: "",
    resguardo:"",
    correo:"",
    calendario:"",
    genero:"",
    sedes:"",
    jornadas:"",
    rector:""
  };

  mounted() {
    this.obtenerModalidadColegio();
    this.obtenerZonaColegio();
    this.obtenerJornadaColegio();
    this.obtenerDepartamento();
    this.obtenerSecretariaColegio();
    this.obtenerSectorColegio();
  }

  //--------------------------------------------------------------------
  registrarColegio() {
    
   this.estadoPeticionRegistrar = true;
    // var data = new FormData();

    // //Añadimos la docinscrip seleccionada
    // // data.append("colegio_modalidad_id", this.colegio.colegio_modalidad_id);
    // data.append("zona_id", this.colegio.zona_id);
    // // data.append("jornada_id", this.colegio.jornada_id);
    // data.append("municipio_id", this.colegio.municipio_id);
    // // data.append("coord_persona_id", this.colegio.coord_persona_id);
    // // data.append("rector_persona_id", this.colegio.rector_persona_id);
    // data.append("colegio", this.colegio.colegio);
    // // data.append("nit", this.colegio.nit);
    // data.append("direccion", this.colegio.direccion);
    // data.append("telefono", this.colegio.telefono);
    // data.append("cod_dane", this.colegio.cod_dane);
    // // data.append("licencia", this.colegio.licencia);
    // data.append("sector_colegio", this.colegio.sector_colegio);

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    Axios()
      .post("almacenar_colegios",)
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          // this.modalBuscarColegio = false;
          Swal.fire({
            title: "colegio Guardado",
            text: "Se guardo el colegio",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.$router.push({ name: "GestionarHojaDeVidaENI" });
        } else {
          Swal.fire("ERROR!", "No se Guardo El colegio", "error");
        }
        // this.estadoPeticion = false;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      })
  .finally(()=>{
    this.estadoPeticionRegistrar = false;
  });
  }

    validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // el formulario se validó y tiene los datos que corresponden por campo
        this.registrarColegio();
      }
    });
  }

  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "El valor no puede ser menor a cero",
        email: () => "El correo no es válido",
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  obtenerModalidadColegio() {
    Axios()
      .get("listar_colegio_modalidad")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_modalidad = respuesta.data.results;
        }
      });
  }

  obtenerZonaColegio() {
    Axios()
      .get("listar_zona_colegio")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_zona = respuesta.data.results;
        }
      });
  }

  obtenerJornadaColegio() {
    Axios()
      .get("listar_jornada_colegio")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_jornada = respuesta.data.results;
        }
      });
  }

  obtenerDepartamento() {
    Axios()
      .get("listar_departamentos/57")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_departamentos = respuesta.data.results;
        } else {
          Swal.fire({
            title: respuesta.data.message,
          });
        }
      });
  }

  obtenerMunicipio(id) {
    Axios()
      .get("listar_municipios/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_municipios = respuesta.data.results.municipios;
        } else {
          Swal.fire({
            title: respuesta.data.message,
          });
        }
      });
  }

    obtenerSecretariaColegio() {
    Axios()
      .get("listar_secretaria_colegio")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_secretaria = respuesta.data.results;
        }
      });
  }

    obtenerSectorColegio() {
    Axios()
      .get("listar_sector_colegio")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.lista_sector = respuesta.data.results;
        }
      });
  }


}
</script>

<style>
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

.texto {
  text-align: center !important;
}
</style>
