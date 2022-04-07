<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">CREAR USUARIO</h1>
      </div>
      <div class="card-body">
        <div class="col-12 col-md-8 mx-auto">
          <div class="d-flex">
            <base-input
              @keyup.delete="limpiarDatosRepresentante()"
              v-model="persona.identificacion"
              class="input-group-alternative mb-3 p-0 col"
              placeholder="Numero de Documento*"
              addon-left-icon=""
              name="numero_document"
              id="numero_document"
              v-validate="'required'"
            >
            </base-input>
            <button
              class="btn btn-azul-sena col-1 p-0 mb-3"
              @click="
                estadoCargando = true;
                obtenerPersona(persona.identificacion),
                  obtenerUsario(persona.identificacion);
              "
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
          <small
            v-show="errors.has('identificacion')"
            class="text-danger font-weigth-bold"
          >
            {{ errors.first("identificacion") }}
          </small>
        </div>

        <div v-if="estadoCargando">
          <cargando></cargando>
        </div>

        <div v-if="!estadoCargando">
          <!-- SI EXISTE EN PERSONA Y EN USUARIO -->
          <div
            v-if="existePersona == true && existeUsuario == true"
            class="mt-4 container-fluid"
          >
            <div class="card-body">
              <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-3 offset-md-1">
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Nombres:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">
                        {{ persona.primer_nombre }}
                        {{ persona.segundo_nombre }}
                      </p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong> Apellidos:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">
                        {{
                          persona.primer_apellido +
                          " " +
                          persona.segundo_apellido
                        }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong> Numero de Documento:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.identificacion }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Fecha Expedicion:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.fecha_identificacion }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>fecha Nacimiento:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.fecha_nacimiento }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Direccion:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.direccion }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Correo:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.correo }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Correo Alternativo:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.correo_aternativo }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Teléfono Fijo:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.telefono_fijo }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Teléfono Móvil:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.telefono_movil }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Tipo de Sangre:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.tipo_sangre }}</p>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div>
                      <strong>Genero:</strong>
                    </div>
                    <div id="contenido">
                      <p id="texto">{{ persona.genero_id }}</p>
                    </div>
                  </div>
                </div>
                <!-- Volver lista de usuario -->
              </div>
            </div>
          </div>
          <!-- SI NO EXISTE EN PERSONA NI EN USUSARIO -->
          <div
            class="mt-4 container-fluid"
            v-if="existePersona == false && existeUsuario == false"
          >
            <div class="card">
              <!-- <div class="card-header">
              <h1 class="text-azul-sena">REGISTRAR USUARIO</h1>
            </div> -->
              <div class="card-body">
                <div
                  class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"
                >
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Primer nombre
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.primer_nombre"
                          placeholder="Primer nombre"
                          type="text"
                          class="form-control"
                          name="primer_nombre"
                          id="primer_nombre"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('primer_nombre')"
                          class="text-danger"
                        >
                          {{ errors.first("primer_nombre") }}
                        </small>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Segundo nombre
                        <!-- <span class="text-danger">*</span> -->
                        :
                      </label>
                      ,
                      <div>
                        <input
                          v-model="persona.segundo_nombre"
                          placeholder="Segundo nombre"
                          type="text"
                          class="form-control"
                          name="segundo_nombre"
                          id="segundo_nombre"
                        />
                        <small
                          v-show="errors.has('segundo_nombre')"
                          class="text-danger"
                        >
                          {{ errors.first("segundo_nombre") }}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Primer apellido
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.primer_apellido"
                          placeholder="Primer apellido"
                          type="text"
                          class="form-control"
                          name="primer_apellido"
                          id="primer_apellido"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('primer_apellido')"
                          class="text-danger"
                        >
                          {{ errors.first("primer_apellido") }}
                        </small>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Segundo apellido
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.segundo_apellido"
                          placeholder="Segundo apellido"
                          type="text"
                          class="form-control"
                          name="segundo_apellido"
                          id="segundo_apellido"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('segundo_apellido')"
                          class="text-danger"
                        >
                          {{ errors.first("segundo_apellido") }}
                        </small>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Genero
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
                          v-model="persona.genero_id"
                          v-validate="{ required: true }"
                          name="genero"
                          id="genero"
                          class="form-control mb-3"
                        >
                          <option value="" selected disabled>
                            Seleccione Genero
                          </option>

                          <option value="M">Hombre</option>
                          <option value="F">Mujer</option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('genero')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("genero") }}
                      </small>
                    </div>

                    <!-- Tipo identificacion -->
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Tipo Identificación
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
                          v-model="persona.tipo_identificacion_id"
                          v-validate="{ required: true }"
                          name="tipo_identificacion"
                          id="tipo_identificacion"
                          class="form-control mb-3"
                        >
                          <option value="">
                            Seleccione Tipo Identificación
                          </option>
                          <option value="CC">Cédula de Ciudadanía</option>
                          <option value="CE">Cédula de Extrangería</option>
                          <option value="DNI">Cédula</option>
                          <option value="NA">
                            No aplica si no tiene una identificación
                          </option>
                          <option value="NCS">Número ciego sena</option>
                          <option value="NIS">Migración</option>
                          <option value="PEP">PEP</option>
                          <option value="PR">PR</option>
                          <option value="PS">PS</option>
                          <option value="RC">Registro Civil</option>
                          <option value="RUI">Migración</option>
                          <option value="TI">Targeta Identidad</option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('tipo_identificacion')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("tipo_identificacion") }}
                      </small>
                    </div>

                    <!-- <div class="col-sm-12 col-md-6 col-lg-6">
                    <label class="mt-2 font-weight-bold">
                      Tipo identificacion
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
                        v-model="persona.tipo_identificacion_id"
                        v-validate="{ required: true }"
                        name="genero"
                        id="genero"
                        class="form-control mb-3"
                        @change="obtenerTipoIdentificacionPersona()"
                      >
                        <option value="" selected disabled>
                          Seleccione Tipo de identificacion
                        </option>

                        <option
                          v-for="(tipoIdentificacion, index) in listaTipoIddntificacion"
                          :value="tipoIdentificacion.id_tipo_identificacion"
                          :key="index"
                        >
                          {{ tipoIdentificacion.tipo_identificacion }}
                        </option>
                      </select>
                    </div>
                    <small
                      v-show="errors.has('genero')"
                      class="text-danger font-weigth-bold"
                    >
                      {{ errors.first("genero") }}
                    </small>
                  </div> -->

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Identificación
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.identificacion"
                          placeholder="Identificación"
                          type="text"
                          class="form-control"
                          name="identificacion"
                          id="identificacion"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('identificacion')"
                          class="text-danger"
                        >
                          {{ errors.first("identificacion") }}
                        </small>
                      </div>
                    </div>        

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Fecha de nacimiento
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.fecha_nacimiento"
                          type="date"
                          class="form-control"
                          name="fecha_nacimiento"
                          id="fecha_nacimiento"
                          :min="fecha_inicio_nacimiento + '-01-01'"
                          :max="fecha_fin_nacimiento + '-12-31'"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('fecha_nacimiento')"
                          class="text-danger"
                        >
                          {{ errors.first("fecha_nacimiento") }}
                        </small>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Fecha Expedición
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.fecha_identificacion"
                          type="date"
                          class="form-control"
                          name="fecha_identificacion"
                          id="fecha_identificacion"
                          :min="persona.fecha_nacimiento"
                          :max="fecha_fin_identificacion + '-12-31'"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('fecha_identificacion')"
                          class="text-danger"
                        >
                          {{ errors.first("fecha_identificacion") }}
                        </small>
                      </div>
                    </div>


                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Dirección
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.direccion"
                          placeholder="Direción"
                          type="text"
                          class="form-control"
                          name="direccion"
                          id="direccion"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('direccion')"
                          class="text-danger"
                        >
                          {{ errors.first("direccion") }}
                        </small>
                      </div>
                    </div>

                    <!-- Estado civil-->
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Estado Civil
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
                          v-model="persona.estado_civil_id"
                          v-validate="{ required: true }"
                          name="estado_civil"
                          id="estado_civil"
                          class="form-control mb-3"
                        >
                          <option value="">Seleccione Estado Civil</option>
                          <option value="C">Casado</option>
                          <option value="E">Separado</option>
                          <option value="I">Indifirente</option>
                          <option value="N">No ingresado</option>
                          <option value="S">Soltero</option>
                          <option value="U">Union libre</option>
                          <option value="V">Viudo</option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('estado_civil')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("estado_civil") }}
                      </small>
                    </div>

                    <!-- Tipo libreta miliatr-->
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Tipo libreta militar
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
                          v-model="persona.tipo_libreta_militar_id"
                          v-validate="{ required: true }"
                          name="tipo_libreta_militar"
                          id="tipo_libreta_militar"
                          class="form-control mb-3"
                        >
                          <option value="">Seleccione Estado Civil</option>
                          <option value="-1">No ingresado</option>
                          <option value="0">No tiene Libreta</option>
                          <option value="1">Libreta de Primera</option>
                          <option value="2">Libreta de Segunda</option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('tipo_libreta_militar')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("tipo_libreta_militar") }}
                      </small>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Correo
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.correo"
                          placeholder="Correo"
                          type="email"
                          class="form-control"
                          name="correo"
                          id="correo"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('correo')"
                          class="text-danger"
                        >
                          {{ errors.first("correo") }}
                        </small>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Correo alternativo
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.correo_aternativo"
                          placeholder="Correo alternativo"
                          type="email"
                          class="form-control"
                          name="correo_alternativo"
                          id="correo_alternativo"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('correo_alternativo')"
                          class="text-danger"
                        >
                          {{ errors.first("correo_alternativo") }}
                        </small>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Contraseña
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="usuarioDatos.contrasena"
                          placeholder="Contraseña"
                          type="password"
                          class="form-control"
                          name="contrasena"
                          id="contrasena"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('contrasena')"
                          class="text-danger"
                        >
                          {{ errors.first("contrasena") }}
                        </small>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Teléfono fijo
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.telefono_fijo"
                          placeholder="Teléfono fijo"
                          type="text"
                          class="form-control"
                          name="telefono_fijo"
                          id="telefono_fijo"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('telefono_fijo')"
                          class="text-danger"
                        >
                          {{ errors.first("telefono_fijo") }}
                        </small>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Teléfono móvil
                        <span class="text-danger">*</span>
                        :
                      </label>
                      <div>
                        <input
                          v-model="persona.telefono_movil"
                          placeholder="Teléfono móvil"
                          type="text"
                          class="form-control"
                          name="telefono_movil"
                          id="telefono_movil"
                          v-validate="{ required: true }"
                        />
                        <small
                          v-show="errors.has('telefono_movil')"
                          class="text-danger"
                        >
                          {{ errors.first("telefono_movil") }}
                        </small>
                      </div>
                    </div>
                    <!-- Tipo libreta miliatr-->
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Tipo Sangre
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
                          v-model="persona.tipo_sangre"
                          v-validate="{ required: true }"
                          name="tipo_sangre"
                          id="tipo_sangre"
                          class="form-control mb-3"
                        >
                          <option value="">Seleccione Tipo De Sangre</option>
                          <option value="O+">O Positivo (O+)</option>
                          <option value="O-">O Negativo (O-)</option>
                          <option value="A+">A Posiivo (A+)</option>
                          <option value="A-">A Negativo (A-)</option>
                          <option value="B+">B Posiivo (B+)</option>
                          <option value="B-">B Negativo (B+)</option>
                          <option value="AB+">AB Positivo (AB+)</option>
                          <option value="AB-">AB Negativo (AB-)</option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('tipo_sangre')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("tipo_sangre") }}
                      </small>
                    </div>

                    <!-- Centros formacion por regional -->
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Regional
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
                          v-model="regional_escogida"
                          v-validate="{ required: true }"
                          name="tipo_pic"
                          id="tipo_pic"
                          class="form-control mb-3"
                          @change="obtenerCentroPorRegional()"
                        >
                          <option value="" selected disabled>
                            Seleccione Regional
                          </option>

                          <option
                            v-for="(regional, index) in listaRegionales"
                            :value="regional.id_regional"
                            :key="index"
                          >
                            {{ regional.regional }}
                          </option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('tipo_pic')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("tipo_pic") }}
                      </small>
                    </div>

                    <!-- Centros formacion -->
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Centro formacion
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
                          v-model="usuarioDatos.centro_formacion_id"
                          v-validate="{ required: true }"
                          name="tipo_pic"
                          id="tipo_pic"
                          class="form-control mb-3"
                          @change="obtenerCentroPorRegional()"
                        >
                          <option value="" selected disabled>
                            Seleccione Centro Formación
                          </option>

                          <option
                            v-for="(centro, index) in listaCentroFormacion"
                            :value="centro.id_centro_formacion"
                            :key="index"
                          >
                            {{ centro.centro_formacion }}
                          </option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('tipo_pic')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("tipo_pic") }}
                      </small>
                    </div>

                    <!-- Perfiles -->
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <label class="mt-2 font-weight-bold">
                        Perfil
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
                          v-model="usuarioDatos.perfil_id"
                          v-validate="{ required: true }"
                          name="tipo_pic"
                          id="tipo_pic"
                          class="form-control mb-3"
                          @change="obtenerDatosCentroPerfilAreaRuta()"
                        >
                          <option value="" selected disabled>
                            Seleccione Perfil
                          </option>

                          <option
                            v-for="(perfil, index) in listaPerfiles"
                            :value="perfil.id_perfil"
                            :key="index"
                          >
                            {{ perfil.perfil }}
                          </option>
                        </select>
                      </div>
                      <small
                        v-show="errors.has('tipo_pic')"
                        class="text-danger font-weigth-bold"
                      >
                        {{ errors.first("tipo_pic") }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer">
                <div class="row justify-content-center">
                  <!-- v-if="crear && !ver" -->
                  <div class="col-lg-4 col-sm-12 mt-1" v-if="!estadoRegistrar">
                    <base-button
                      type="azul-sena"
                      @click="validarFormulario()"
                      class="btn btn-block bg-azul-sena text-white"
                      >Registrar</base-button
                    >
                  </div>
                  <div class="col-lg-2 col-sm-12 mt-1" v-if="estadoRegistrar">
                    <guardando></guardando>
                  </div>
                  <!-- v-if="!crear && ver && convocatoria.pic_fase_id == 1" -->

                  <div class="col-lg-4 col-sm-12 mt-1">
                    <router-link
                      class="btn btn-block bg-azul-sena text-white"
                      :to="{
                        name: 'GestionarConvocatoriaENI',
                      }"
                    >
                      Volver
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>


























          <!-- SI EXISTE EN PERSONA PERO NO EN USUSARIO -->
          <div
            v-if="existePersona == true && existeUsuario == false"
            class="col-12 col-md-8 mx-auto"
          >
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Nombres:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">
                    {{ persona.primer_nombre }}
                    {{ persona.segundo_nombre }}
                  </p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong> Apellidos:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">
                    {{
                      persona.primer_apellido + " " + persona.segundo_apellido
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong> Numero de Documento:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.identificacion }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Fecha Expedición:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.fecha_identificacion }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>fecha Nacimiento:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.fecha_nacimiento }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Direccion:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.direccion }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Correo:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.correo }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Correo Alternativo:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.correo_aternativo }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Teléfono Fijo:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.telefono_fijo }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Teléfono Móvil:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.telefono_movil }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Tipo de Sangre:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.tipo_sangre }}</p>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div>
                  <strong>Genero:</strong>
                </div>
                <div id="contenido">
                  <p id="texto">{{ persona.genero_id }}</p>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Contraseña
                  <span class="text-danger">*</span>
                  :
                </label>
                <div>
                  <input
                    v-model="usuarioDatos.contrasena"
                    placeholder="Contraseña"
                    addon-left-icon="ni ni-lock-circle-open"
                    type="password"
                    class="form-control"
                    name="contrasena"
                    id="contrasena"
                    v-validate="{ required: true }"
                  />
                  <small v-show="errors.has('contrasena')" class="text-danger">
                    {{ errors.first("contrasena") }}
                  </small>
                </div>
              </div>
              <!-- Centros formacion por regional -->
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Regional
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
                    v-model="regional_escogida"
                    v-validate="{ required: true }"
                    name="tipo_pic"
                    id="tipo_pic"
                    class="form-control mb-3"
                    @change="obtenerCentroPorRegional()"
                  >
                    <option value="" selected disabled>
                      Seleccione Regional
                    </option>

                    <option
                      v-for="(regional, index) in listaRegionales"
                      :value="regional.id_regional"
                      :key="index"
                    >
                      {{ regional.regional }}
                    </option>
                  </select>
                </div>
                <small
                  v-show="errors.has('tipo_pic')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("tipo_pic") }}
                </small>
              </div>

              <!-- Centros formacion -->
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Centro formacion
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
                    v-model="usuarioDatos.centro_formacion_id"
                    v-validate="{ required: true }"
                    name="tipo_pic"
                    id="tipo_pic"
                    class="form-control mb-3"
                    @change="obtenerCentroPorRegional()"
                  >
                    <option value="" selected disabled>
                      Seleccione Centro Formación
                    </option>

                    <option
                      v-for="(centro, index) in listaCentroFormacion"
                      :value="centro.id_centro_formacion"
                      :key="index"
                    >
                      {{ centro.centro_formacion }}
                    </option>
                  </select>
                </div>
                <small
                  v-show="errors.has('tipo_pic')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("tipo_pic") }}
                </small>
              </div>

              <!-- Perfiles -->
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Perfil
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
                    v-model="usuarioDatos.perfil_id"
                    v-validate="{ required: true }"
                    name="tipo_pic"
                    id="tipo_pic"
                    class="form-control mb-3"
                    @change="obtenerDatosCentroPerfilAreaRuta()"
                  >
                    <option value="" selected disabled>
                      Seleccione Perfil
                    </option>

                    <option
                      v-for="(perfil, index) in listaPerfiles"
                      :value="perfil.id_perfil"
                      :key="index"
                    >
                      {{ perfil.perfil }}
                    </option>
                  </select>
                </div>
                <small
                  v-show="errors.has('tipo_pic')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("tipo_pic") }}
                </small>
              </div>

              <div>
                <h1>
                  <!-- {{ this.usuarioDatos }} -->
                </h1>
              </div>
            </div>
            <div class="card-footer">
              <div class="row justify-content-center">
                <!-- v-if="crear && !ver" -->
                <div class="col-lg-4 col-sm-12 mt-1">
                  <base-button
                    type="azul-sena"
                    @click="validarFormulario()"
                    class="btn btn-block bg-azul-sena text-white"
                    >Registrar</base-button
                  >
                </div>
                <!-- v-if="!crear && ver && convocatoria.pic_fase_id == 1" -->

                <div class="col-lg-4 col-sm-12 mt-1">
                  <router-link
                    class="btn btn-block bg-azul-sena text-white"
                    :to="{
                      name: 'GestionarConvocatoriaENI',
                    }"
                  >
                    Volver
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Volver lista de usuario -->
          </div>


        </div>
      </div>
      <div
        class="card-footer"
        v-if="existePersona == true && existeUsuario == true"
      >
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-2">
            <a
              class="btn btn-block bg-azul-sena text-white"
              @click="$router.back()"
            >
              Volver
            </a>
          </div>
        </div>
      </div>

      <div
        class="card-footer"
        v-if="existePersona == null && existeUsuario == null"
      >
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-2">
            <a
              class="btn btn-block bg-azul-sena text-white"
              @click="$router.back()"
            >
              Volver
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import guardando from "@/components/animacionGuardando.vue";
import cargando from "@/components/animacionCargando.vue";
@Component({
  components: {
    guardando,
    cargando,
  },
})
export default class CrearUsuario extends Vue {
  crearUsuario: any = null;
  ver: any = true;
  crear: any = true;
  usuario = null;
  //id_usuario_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_usuario;

  nombresPrueba = "";

  persona = {
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    identificacion: "",
    tipo_identificacion_id: "",
    fecha_identificacion: "",
    fecha_nacimiento: "",
    direccion: "",
    correo: "",
    correo_aternativo: "",
    telefono_fijo: "",
    telefono_movil: "",
    tipo_sangre: "",
    genero_id: "",
    estado_civil_id: "",
    tipo_libreta_militar_id: "",
  };

  usuarioDatos = {
    persona_id: "",
    perfil_id: "",
    centro_formacion_id: "",
    nombres: "",
    apellidos: "",
    identificacion: "",
    correo: "",
    contrasena: "",
  };

  btnbuscar = false;
  listaRegionales: any[] = [];
  regional_escogida = "";
  lista_regionales_escogidas_centro: any[] = [];

  idPersonaObtenido = "";
  correoPersonaObtenido = "";
  identificacionPerosonaObtenido = "";
  nombresPersonaObtenido = "";
  apellidosPersonaObtenido = "";
  idCentroFormacionObtenido = "";

  existePersona = null;
  existeUsuario = null;

  listaCentroFormacion: any[] = [];
  listaPerfiles: any[] = [];
  listaAreaRuta: any[] = [];
  listaTipoIddntificacion: any[] = [];
  listaGenero: any[] = [];
  perfil = "";
  contrasena = "";

  arrayDatos = "";
  idPersona = "";

  estadoRegistrar = false;
  estadoCargando = false;

  //           'tipo_libreta_militar_id' => 'required', //foranea

  async mounted() {
    this.obtenerDatosCentroPerfilAreaRuta();
    this.obtenerRegionales();
    // this.obtenerCentroPorRegional()
    //this.obtenerGeneroPersona();
    //this.obtenerTipoIdentificacionPersona();
    // this.obtenerUsario(this.persona.identificacion)
  }
  vaciar() {
    this.persona = {
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      identificacion: "",
      tipo_identificacion_id: "",
      fecha_identificacion: "",
      fecha_nacimiento: "",
      direccion: "",
      correo: "",
      correo_aternativo: "",
      telefono_fijo: "",
      telefono_movil: "",
      tipo_sangre: "",
      genero_id: "",
      estado_civil_id: "",
      tipo_libreta_militar_id: "",
    };

    this.usuarioDatos = {
      persona_id: "",
      perfil_id: "",
      centro_formacion_id: "",
      nombres: "",
      apellidos: "",
      identificacion: "",
      correo: "",
      contrasena: "",
    };
  }
  obtenerPersona(id) {
    Axios()
      .post("buscar_persona_por_identificacion", { identificacion: id })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.persona = respuesta.data.results;
          this.existePersona = true;

          this.idPersonaObtenido = respuesta.data.results.id_persona;
          this.usuarioDatos.persona_id = this.idPersonaObtenido;
          // alert(this.idPersonaObtenido);

          this.identificacionPerosonaObtenido =
            respuesta.data.results.identificacion;
          // alert(this.identificacionPerosonaObtenido);

          this.nombresPersonaObtenido =
            respuesta.data.results.primer_nombre +
            " " +
            respuesta.data.results.segundo_nombre;
          // alert(this.nombresPersonaObtenido);

          this.apellidosPersonaObtenido =
            respuesta.data.results.primer_apellido +
            " " +
            respuesta.data.results.segundo_apellido;
          // alert(this.apellidosPersonaObtenido);
          this.correoPersonaObtenido = respuesta.data.results.correo;
          // alert(this.correoPersonaObtenido)
          this.idCentroFormacionObtenido =
            respuesta.data.results.centro_formacion_id;
          this.estadoCargando = false;
        } else {
          this.existePersona = false;
        }
      })
      .finally(() => {
        this.estadoCargando = false;
      });
  }

  obtenerUsario(id) {
    // si no te registra comentalo y sale
    this.estadoCargando = true;
    Axios()
      .post("buscar_usuario", { identificacion: id })
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.usuario = respuesta.data.results;
          this.existeUsuario = true;
          // this.estadoCargando = false;
          this.btnbuscar = true;
          this.estadoCargando = false;
        } else {
          this.existeUsuario = false;
        }
      });
    // .finally(() => {
    //   this.estadoCargando = true;
    // });
  }

  data() {
    return {
      id_usuario: JSON.parse(sessionStorage.getItem("usuario")).id_usuario,
      centros: [],
      centro_formacion_id: "",
    };
  }

  obtenerRegionales() {
    Axios()
      .get("listar_regionales")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaRegionales = respuesta.data.results;
          // this.lista_regionales_escogidas_centro= respuesta.data.results.id_regional;
          this.regional_escogida = respuesta.data.results.id_regional;
        } else {
          Swal.fire({
            title: "No se encontró regionales",
            text: respuesta.data.message,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        }
      });
  }

  obtenerCentroPorRegional() {
    Axios()
      .get("listar_centro_formacion_regional/" + this.regional_escogida)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaCentroFormacion = respuesta.data.results;
        } else {
          Swal.fire({
            title: "No se encontró regionales",
            text: respuesta.data.message,
            icon: respuesta.data.status,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        }
      });
  }

  obtenerDatosCentroPerfilAreaRuta() {
    Axios()
      .get("/crear_usuario")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaCentroFormacion = respuesta.data.results.centrosFormacion;
          this.listaAreaRuta = respuesta.data.results.areasRuta;
          this.listaPerfiles = respuesta.data.results.perfiles;
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

  async almacenarPersona() {
    this.estadoRegistrar = true;
    Axios()
      .post("almacenar_persona", this.persona)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          // Swal.fire({
          //   title: "Persona guardada",
          //   icon: "success",
          //   confirmButtonText: "Aceptar",
          //   confirmButtonColor: "#238276",
          // });
          this.obtenerPersona(this.persona.identificacion);
          this.estadoRegistrar = false;

          // this.$router.push({ name: "GestionarUsuario" });
        } else if (respuesta.data.status == "info") {
          Swal.fire({
            title: "Campo Invalido",
            text: "El valor del campo identificación o correo ya está en uso",
            icon: "info",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          
          this.estadoRegistrar=false

        } else {
          Swal.fire("ERROR!", "Persona no registrado", "error");
        }
        return respuesta;
      })
      .then((res) => {
        this.idPersona = res.data.results.id_persona;
        this.usuarioDatos.persona_id = this.idPersona;
        this.almacenarUsuario();
        return res;
      })
      .catch((resp) => {
        if (resp.data.status == "info") {
          Swal.fire({
            title: "no",
            icon: "info",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        } else {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        }
      });
  }

  async almacenarUsuario() {
    Axios()
      .post("almacenar_usuario", this.usuarioDatos)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Usuario guardado",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.estadoRegistrar = false;

          this.$router.push({ name: "GestionarUsuario" });
        } else {
          Swal.fire("ERROR!", "Usuario no registrado", "error");
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

  // limpiarDatosRepresentante() {
  //   this.btnbuscar = false;
  //   this.persona.id_persona = null;
  //   this.persona.primer_nombre = "";
  //   this.persona.segundo_nombre = "";
  //   this.persona.primer_apellido = "";
  //   this.persona.segundo_apellido = "";
  // }

  updated() {
    // this.usuarioDatos.persona_id=this.idPersona
    this.usuarioDatos.nombres =
      this.persona.primer_nombre + " " + this.persona.segundo_nombre;
    this.usuarioDatos.apellidos =
      this.persona.primer_apellido + " " + this.persona.segundo_apellido;
    this.usuarioDatos.identificacion = this.persona.identificacion;
    this.usuarioDatos.correo = this.persona.correo;
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        // if (this.existePersona == true && this.existeUsuario == false) {
        //   this.almacenarUsuario();
        // } else
        if (this.existePersona == false && this.existeUsuario == false) {
          this.almacenarPersona();
        } else if (this.existePersona == true && this.existeUsuario == false) {
          this.almacenarUsuario();
        }
      }else{
        this.estadoCargando=false
      }
    });
  }
}
</script>

<style scoped></style>

