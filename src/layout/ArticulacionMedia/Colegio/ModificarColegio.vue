<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MODIFICAR COLEGIO</h1>
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
                        <option
                          :value="colegio.zona_id"
                          selected
                          disabled
                        >
                          {{ colegio.zona }}
                        </option>

                        <option
                          v-for="(listaZo, index) in lista_zona"
                          :key="index"
                          :value="listaZo.zona_id"
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
                    <!-- dpartamento -->
                    <!-- <div>
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
                    </div> -->
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
                        <option
                          :value="colegio.municipio_id"
                          selected
                          disabled
                        >
                          {{ colegio.municipio }}
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

                    <!-- coordinador -->
                    <!-- <div>
                      <label class="font-weight-bold">Coordinador</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="coordinador"
                          class="form-control"
                          id="coordinador"
                          placeholder="Coordinador"
                          v-model="colegio.coord_persona_id"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('coordinador')"
                        class="text-danger"
                      >
                        {{ errors.first("coordinador") }}
                      </small>
                    </div> -->

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

                    <!-- nit -->
                    <!-- <div>
                      <label class="font-weight-bold">Nit</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="nit"
                          class="form-control"
                          id="nit"
                          placeholder="Nit"
                          v-model="colegio.nit"
                          v-validate="{ required }"
                        />
                      </div>
                      <small v-show="errors.has('nit')" class="text-danger">
                        {{ errors.first("nit") }}
                      </small>
                    </div> -->
                    <!-- fin nit -->

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

                    <!-- certificado licencia -->
                    <!-- <div id="campo">
                      <label class="mt-2 font-weight-bold"> Licencia </label
                      ><span
                        class="text-danger font-weigth-bold"
                        title="Campo Requerido"
                        >*</span
                      >:
                      <div class="container-input">
                        <input
                          v-show="false"
                          type="file"
                          ref="botonResolución"
                          name="urlResolucion"
                          class="form-control inputfile-1"
                          id="certificado"
                          @change="obtenerLicencia($event)"
                        />
                        <label
                          for="urlResolucion"
                          @click.prevent="$refs.botonResolución.click()"
                          class="btn bg-azul-sena"
                        >
                          <i class="fas fa-file-upload"></i>
                          <span>Certificado</span>
                        </label>
                      </div>
                    </div> -->
                    <!-- fin certificado licencia -->

                    <!-- sector colegio -->
                    <div>
                      <label class="font-weight-bold">Sector colegio</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="sector_colegio"
                          class="form-control"
                          id="sector_colegio"
                          placeholder="Sector colegio"
                          v-model="colegio.sector"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('sector_colegio')"
                        class="text-danger"
                      >
                        {{ errors.first("sector_colegio") }}
                      </small>
                    </div>
                    <!-- fin sector colegio -->
                    <!-- secretaria -->
                    <div>
                      <label class="font-weight-bold">Secretaria</label
                      ><span
                        class="text-danger"
                        tooltip="Campo Requerido"
                        tooltip-flow="top"
                        >*</span
                      >:
                      <div class="input-group">
                        <input
                          type="text"
                          name="secretaria_id"
                          class="form-control"
                          id="secretaria_id"
                          placeholder="Sector colegio"
                          v-model="colegio.secretaria"
                          v-validate="{ required }"
                        />
                      </div>
                      <small
                        v-show="errors.has('secretaria_id')"
                        class="text-danger"
                      >
                        {{ errors.first("secretaria_id") }}
                      </small>
                    </div>
                    <!-- fin secretaria -->

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
                      <small
                        v-show="errors.has('resguardo')"
                        class="text-danger"
                      >
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
                      <small
                        v-show="errors.has('calendario')"
                        class="text-danger"
                      >
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
                  </div>
                </div>
                 <div class="text-center card-footer"  v-if="estadoPeticionModificar" >
                 <AnimacionCargando></AnimacionCargando>
                  </div>
                <div class="card-footer"  v-if="!estadoPeticionModificar">
                  <div class="row justify-content-center">
                    <div class="col-lg-4 col-sm-12 mt-1">
                      <base-button
                        type="azul-sena"
                        @click="validarFormulario()"
                        class="btn btn-block bg-azul-sena text-white"
                        >Modificar</base-button
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

  estadoPeticionModificar = false;
  listarIdiomas: any[] = [];
  listarIdiomasString: any[] = [];
  lista_modalidad: any[] = [];
  lista_zona: any[] = [];
  lista_jornada: any[] = [];
  lista_municipio: any[] = [];
  lista_departamentos: any[] = [];
  departamento_actual = null;

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
    colegio_modalidad_id: "",
    colegio_modalidad: "",
    zona_id: "",
    zona: "",
    jornada_id: "",
    jornada: "",
    municipio_id: "",
    municipio: "",
    coord_persona_id: "",
    rector_persona_id: "",
    colegio: "",
    nit: "",
    direccion: "",
    telefono: "",
    cod_dane: "",
    licencia: null,
    sector_colegio: "",
    secretaria_id: "",
    estado: "",
    resguardo: "",
    correo: "",
    calendario: "",
    genero: "",
    sedes: "",
    jornadas: "",
    rector: "",
  };

  mounted() {
    this.obtenerModalidadColegio();
    this.obtenerZonaColegio();
    this.obtenerJornadaColegio();
    this.obtenerDepartamento();
    this.obtenerColegio(this.$route.params.id);
  }

  obtenerColegio(id) {
    Axios()
      .get("ver_detalle_colegio/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.colegio = respuesta.data.results;
          //   this.mostrarDocumento(id);
        }
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  //--------------------------------------------------------------------
  modificarColegio(id) {

   
    this.estadoPeticion = true;
    this.estadoPeticionModificar = true;
    // var data = new FormData();

    //Añadimos la docinscrip seleccionada
    //   data.append("colegio_modalidad_id", this.colegio.colegio_modalidad_id);
    // data.append("zona_id", this.colegio.zona_id);
    // //   data.append("jornada_id", this.colegio.jornada_id);
    // data.append("municipio_id", this.colegio.municipio_id);
    // //   data.append("coord_persona_id", this.colegio.coord_persona_id);
    // //   data.append("rector_persona_id", this.colegio.rector_persona_id);
    // data.append("colegio", this.colegio.colegio);
    // //data.append("nit", this.colegio.nit);
    // data.append("direccion", this.colegio.direccion);
    // data.append("telefono", this.colegio.telefono);
    // data.append("cod_dane", this.colegio.cod_dane);
    // //data.append("licencia", this.colegio.licencia);
    // data.append("sector_colegio", this.colegio.sector_colegio);
    // data.append("secretaria_id", this.colegio.secretaria_id);
    // data.append("estado", this.colegio.estado);
    // data.append("resguardo", this.colegio.resguardo);
    // data.append("correo", this.colegio.correo);
    // data.append("calendario", this.colegio.calendario);
    // data.append("genero", this.colegio.genero);
    // data.append("sedes", this.colegio.sedes);
    // data.append("jornadas", this.colegio.jornadas);
    // data.append("rector", this.colegio.rector);

    const headers = {
      "Content-Type": "multipart/form-data",
    };
    Axios()
      .post("modificar_colegios/" + id, this.colegio)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire(
            "Se subió el colegio!",
            "Colegio Modificado",
            respuesta.data.status
          );
          this.estadoPeticion = false;
          //   this.eliminarConvenioColegios();
          //   this.modificarColegios(this.convenio.id_convenio);
          // this.eliminarColegiosEscogidos();
          this.$router.push({ name: "GestionarColegio" });
        } else {
          Swal.fire("ERROR!", "No se Modifico el colegio", "error");
        }
        // this.estadoPeticion = false;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!modficar",
          "error"
        );
      })
      .finally(() => {
        this.estadoPeticionModificar = false;
      });
  }

  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        this.modificarColegio(this.$route.params.id);
        
      }
    });
  }

  //-----------------------------------------------------------
  obtenerLicencia(event) {
    if (event.target.files[0].size <= 5000000) {
      //5mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".pdf") {
        this.colegio.licencia = event.target.files[0];
        Swal.fire(
          "Certificación Cargada!",
          "Archivo cargado exitosamente!",
          "success"
        );
        this.docValido = true;
        // this.docResolucon = null;
      } else {
        this.docValido = false;
        this.colegio.licencia = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es un PDF!",
          "error"
        );
      }
    } else {
      this.docValido = false;
      this.colegio.licencia = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 5 MegaBytes!",
        "error"
      );
    }
  }

  //--------------------------------------------------------------------
  //   registrarColegio() {
  //     this.estadoPeticion = true;
  //     var data = new FormData();

  //     //Añadimos la docinscrip seleccionada
  //     data.append("colegio_modalidad_id", this.colegio.colegio_modalidad_id);
  //     data.append("zona_id", this.colegio.zona_id);
  //     data.append("jornada_id", this.colegio.jornada_id);
  //     data.append("municipio_id", this.colegio.municipio_id);
  //     data.append("coord_persona_id", this.colegio.coord_persona_id);
  //     data.append("rector_persona_id", this.colegio.rector_persona_id);
  //     data.append("colegio", this.colegio.colegio);
  //     data.append("nit", this.colegio.nit);
  //     data.append("direccion", this.colegio.direccion);
  //     data.append("telefono", this.colegio.telefono);
  //     data.append("cod_dane", this.colegio.cod_dane);
  //     data.append("licencia", this.colegio.licencia);
  //     data.append("sector_colegio", this.colegio.sector_colegio);

  //     const headers = {
  //       "Content-Type": "multipart/form-data",
  //     };
  //     Axios()
  //       .post("almacenar_colegios", data, {
  //         headers: headers,
  //       })
  //       .then((respuesta) => {
  //         if ((respuesta.data.status = "success")) {
  //           // this.modalBuscarColegio = false;
  //           Swal.fire({
  //             title: "colegio Guardado",
  //             text: "Se guardo el colegio",
  //             icon: "success",
  //             confirmButtonText: "Aceptar",
  //             confirmButtonColor: "#238276",
  //           });
  //           //   this.$router.push({ name: "GestionarHojaDeVidaENI" });
  //         } else {
  //           Swal.fire("ERROR!", "No se Guardo El colegio", "error");
  //         }
  //         // this.estadoPeticion = false;
  //       })
  //       .catch(() => {
  //         Swal.fire(
  //           "ERROR!",
  //           "Se ha presentado un error en el servidor!",
  //           "error"
  //         );
  //       });
  //   }

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

  buscarUsuario() {
    Axios()
      .post("buscar_usuario", {
        identificacion: this.colegio.coord_persona_id,
      })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.buscarSenaPersona = respuesta.data.results;
          this.infoSenaPersona =
            this.buscarSenaPersona.primer_nombre +
            " " +
            this.buscarSenaPersona.segundo_nombre +
            " " +
            this.buscarSenaPersona.primer_apellido +
            " " +
            this.buscarSenaPersona.segundo_apellido +
            " - " +
            this.buscarSenaPersona.identificacion;
          this.modalSenaPersona = false;
          Swal.fire({
            title: "Sena Persona encontrada",
            text:
              this.buscarSenaPersona.primer_nombre +
              " " +
              this.buscarSenaPersona.segundo_nombre +
              " " +
              this.buscarSenaPersona.primer_apellido +
              " " +
              this.buscarSenaPersona.segundo_apellido,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });
        } else {
          Swal.fire({
            title: "Sena Persona no existe",
            text: "Ingrese una identificación correcta",
            icon: "error",
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
