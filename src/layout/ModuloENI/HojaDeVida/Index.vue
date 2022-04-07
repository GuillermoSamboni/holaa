<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">MI HOJA DE VIDA</h1>

        <hr />

        <!-- <router-link
          class="btn btn-sm bg-azul-sena text-white"
          :to="{
            name: 'RgRoa',
          }"
        >
          Jefferson
        </router-link> -->

        <!-- Ruta del boton REGISTRAR EDUCACION GUILLERMO
        <router-link
          class="btn btn-sm bg-azul-sena text-white"
          :to="{
            name: 'RegEduGuillermoSamboni',
          }"
        >
          Registrar educacion Guillermo
        </router-link>
        FIN BOTON -->

        <div class="row">
          <!-- Contenido -->
          <div class="container">
            <div class="main-body">
              <div class="row gutters-sm">
                <div class="col-md-4 mb-3">
                  <!-- Hoja de vida -->
                  <div class="card">
                    <div class="card-body">
                      <div
                        class="
                          d-flex
                          flex-column
                          align-items-center
                          text-center
                          mt-2
                        "
                      >
                        <div class="row">
                          <div
                            class="
                              d-flex
                              flex-column
                              align-items-center
                              text-center
                              col-sm-12
                            "
                          >
                            <div class="contenedor">
                              <FotoPerfilComponente></FotoPerfilComponente>
                            </div>
                          </div>
                        </div>

                        <div id="campo" v-if="fotoPerfilTemp == null"></div>
                        <div id="campo" v-else>
                          <button
                            class="btn bg-azul-sena mt-2 text-white"
                            @click="subirFoto()"
                          >
                            Subir Foto
                          </button>
                        </div>
                      </div>
                      <!-- Opciones de ver -->
                      <div class="opciones mt-3">
                        <div
                          class="nav flex-column nav-pills"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <a
                            class="nav-link active"
                            id="v-pills-home-tab"
                            data-toggle="pill"
                            href="#v-pills-home"
                            role="tab"
                            aria-controls="v-pills-home"
                            aria-selected="true"
                          >
                            Mis Datos Personales
                          </a>
                          <br />
                          <a
                            class="nav-link"
                            id="v-pills-profile-tab"
                            data-toggle="pill"
                            href="#v-pills-profile"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="false"
                          >
                            Mi Educación
                          </a>
                          <br />
                          <a
                            class="nav-link"
                            id="v-pills-messages-tab"
                            data-toggle="pill"
                            href="#v-pills-messages"
                            role="tab"
                            aria-controls="v-pills-messages"
                            aria-selected="false"
                          >
                            Mi Experiencia Laboral
                          </a>
                          <br />
                          <a
                            class="nav-link"
                            id="v-pills-settings-tab"
                            data-toggle="pill"
                            href="#v-pills-settings"
                            role="tab"
                            aria-controls="v-pills-settings"
                            aria-selected="false"
                          >
                            Red de Conocimiento y Área Temática
                          </a>
                        </div>
                      </div>
                      <!-- Fin Opciones de ver -->
                    </div>
                  </div>
                </div>
                <!-- Informacion -->
                <div class="col-md-8">
                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="clearfix"></div>
                      <div id="contenido">
                        <div class="tab-content" id="v-pills-tabContent">
                          <!-- Datos Personales -->
                          <div
                            class="tab-pane fade show active"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                          >
                          <div>
                            <tabs fill class="flex-column flex-sm-row">
                              <tab-pane>
                                <span slot="title">
                                  Mis datos personales
                                </span>
                              </tab-pane>
                            </tabs>
                          </div>
                            <router-link
                              class="
                                btn btn-sm
                                bg-azul-sena
                                text-white
                                float-right
                              "
                              :to="{
                                name: 'ModificarDatosPersonalesENI',
                              }"
                            >
                              <i
                                class="fas fa-edit sizep"
                                title="Modificar Perfil"
                              ></i>
                            </router-link>
                            <div class="espaciado"><br /></div>
                            <!-- Datos Personales-->
                            <div class="text-center" v-if="!estadoPeticion">
                              <AnimacionCargando></AnimacionCargando>
                            </div>
                            <div v-if="estadoPeticion">
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Nombre completo
                                  </h4>
                                </div>
                                <div class="col-sm-9 text-dark">
                                  <div>
                                    {{ datosPersonales.primer_nombre }}
                                    {{ datosPersonales.segundo_nombre }}
                                    {{ datosPersonales.primer_apellido }}
                                    {{ datosPersonales.segundo_apellido }}
                                  </div>
                                  <!--
                                  {{
                                    datosPersonales.primer_nombre +
                                    " " +
                                    datosPersonales.segundo_nombre +
                                    " " +
                                    datosPersonales.primer_apellido +
                                    " " +
                                    datosPersonales.segundo_apellido
                                  }}-->
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Cédula</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.identificacion == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.identificacion }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Teléfono Móvil</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.telefono_movil == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.telefono_movil }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Teléfono Fijo</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.telefono_fijo == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.telefono_fijo }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    E-Mail Personal
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.correo_aternativo == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.correo_aternativo }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">E-Mail SENA</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.correo == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.correo }}
                                </div>
                              </div>

                              <!-- content -->
                              <hr />
                              <div class="row">
                                <div class="col-sm-3 mt-1">
                                  <h4 class="mb-0 text-dark">Dirección</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.direccion == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.direccion }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Lugar Expedición Documento
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.municipio_expedicion == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{
                                    datosPersonales.municipio_expedicion +
                                    ", " +
                                    datosPersonales.depto_expedicion
                                  }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Departamento</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.depto_expedicion == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.depto_expedicion }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Municipio</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.municipio_expedicion == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.municipio_expedicion }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Localidad</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.localidad == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.localidad }}
                                </div>
                              </div>
                              <!-- Fin content -->

                              <!-- content -->
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    País de Residencia
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.pais_residencia == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.pais_residencia }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Departamento De Residencia
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.depto_residencia == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.depto_residencia }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Municipio De Residencia
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.municipio_residencia == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.municipio_residencia }}
                                </div>
                              </div>
                              <!-- Fin content -->

                              <!-- content -->
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Fecha de Expedición del Documento
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.fecha_identificacion == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.fecha_identificacion }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Nacionalidad</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.nacionalidad == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.nacionalidad }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Género</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.genero == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.genero }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Fecha Nacimiento
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.fecha_nacimiento == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.fecha_nacimiento }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    País Nacimiento
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.pais_nacimiento == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.pais_nacimiento }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Departamento De Nacimiento
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.depto_nacimiento == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.depto_nacimiento }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Municipio De Nacimiento
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.municipio_nacimiento == null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.municipio_nacimiento }}
                                </div>
                              </div>
                              <!-- content -->
                              <hr />

                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">Discapacidad</h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="datosPersonales.discapacidad == null"
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.discapacidad }}
                                </div>
                              </div>
                              <hr />
                              <div class="row">
                                <div class="col-sm-3">
                                  <h4 class="mb-0 text-dark">
                                    Porcentaje Discapacidad
                                  </h4>
                                </div>
                                <div
                                  class="col-sm-9 text-dark"
                                  v-if="
                                    datosPersonales.porcentaje_discapacidad ==
                                    null
                                  "
                                >
                                  Dato no registrado
                                </div>
                                <div class="col-sm-9 text-dark" v-else>
                                  {{ datosPersonales.porcentaje_discapacidad }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Fin Datos Personales -->

                          <!-- Mi Educacion -->
                          <div
                            class="tab-pane fade"
                            id="v-pills-profile"
                            role="tabpanel"
                            aria-labelledby="v-pills-profile-tab"
                          >
                            <!-- tabs -->
                            <tabs fill class="flex-column flex-sm-row">
                              <!-- Educacion -->
                              <tab-pane>
                                <span slot="title">Educación</span>
                                <div>
                                  <div class="clearfix">
                                    <router-link
                                      class="
                                        btn btn-sm
                                        bg-azul-sena
                                        text-white
                                        float-right
                                      "
                                      :to="{
                                        name: 'RegistrarEducacionPersona',
                                      }"
                                    >
                                      <i
                                        class="fas fa-plus size"
                                        title="Registrar Nuevo"
                                      ></i>
                                    </router-link>
                                  </div>
                                  <div
                                    v-if="listaEducacionFiltrado.length == 0"
                                  >
                                    <div class="justify-content-center">
                                      <div class="center col-lg-4 col-sm-12">
                                        <h3
                                          class="
                                            margens
                                            font-weight-bold
                                            text-center text-azul-sena
                                          "
                                        >
                                          No hay Educaciones
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    v-if="listaEducacionFiltrado.length != 0"
                                  >
                                    <div class="col-9 mb-1">
                                      <input
                                        type="text"
                                        class="form-control col-lg-3 col-sm-12"
                                        placeholder="Buscar Institución"
                                        v-model="filterEdu"
                                        @keyup.prevent="
                                          lineaEducacionFiltrado()
                                        "
                                      />
                                    </div>
                                    <br />
                                    <div
                                      class="text-center"
                                      v-if="!estadoPeticion"
                                    >
                                      <AnimacionCargando></AnimacionCargando>
                                    </div>
                                    <div
                                      class="table-responsive col-sm-12"
                                      v-if="estadoPeticion"
                                    >
                                      <table class="table table-hoverble">
                                        <thead id="listado">
                                          <tr>
                                            <th scope="col">Institución</th>
                                            <th scope="col">
                                              Tipo de Formación
                                            </th>
                                            <th scope="col">Título</th>
                                            <th scope="col">Acciones</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr
                                            v-for="(
                                              institucion, key
                                            ) in listaEducacionFiltrado"
                                            :key="key"
                                          >
                                            <td>
                                              {{ institucion.institucion }}
                                            </td>
                                            <td
                                              v-if="
                                                institucion.tipo_educacion == 1
                                              "
                                            >
                                              Formal
                                            </td>
                                            <td v-else>No Formal</td>
                                            <td>
                                              {{ institucion.titulo_obtenido }}
                                            </td>
                                            <td class="campos">
                                              <div class="acciones">
                                                <div
                                                  tooltip="Ver Educación"
                                                  tooltip-flow="top"
                                                >
                                                  <router-link
                                                    class="
                                                      btn btn-sm
                                                      bg-azul-sena
                                                      text-white
                                                    "
                                                    :to="{
                                                      name: 'VerDetalleEducacionPersona',
                                                      params: {
                                                        id: institucion.id_educacion,
                                                      },
                                                    }"
                                                  >
                                                    <i class="fas fa-eye"></i>
                                                  </router-link>
                                                </div>

                                                <div
                                                  tooltip="Modificar Educación"
                                                  tooltip-flow="top"
                                                >
                                                  <router-link
                                                    class="
                                                      btn btn-sm
                                                      bg-azul-sena
                                                      text-white
                                                    "
                                                    :to="{
                                                      name: 'ModificarEducacionPersona',
                                                      params: {
                                                        id: institucion.id_educacion,
                                                      },
                                                    }"
                                                  >
                                                    <i class="fas fa-edit"></i>
                                                  </router-link>
                                                </div>
                                                <div
                                                  tooltip="Eliminar Educación"
                                                  tooltip-flow="top"
                                                >
                                                  <a
                                                    @click="
                                                      eliminarEducacion(
                                                        datosPersonales.id_educacion,
                                                        key
                                                      )
                                                    "
                                                    class="
                                                      btn btn-sm
                                                      bg-azul-sena
                                                      text-white
                                                    "
                                                  >
                                                    <i class="fas fa-trash"></i>
                                                  </a>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </tab-pane>
                              <!-- Ingles -->
                              <tab-pane>
                                <span slot="title">Idiomas</span>
                                <div>
                                  <div class="clearfix">
                                    <router-link
                                      class="
                                        btn btn-sm
                                        bg-azul-sena
                                        text-white
                                        float-right
                                      "
                                      :to="{
                                        name: 'RegistrarIdiomaPersona',
                                      }"
                                    >
                                      <i
                                        class="fas fa-plus size"
                                        title="Registrar Nuevo"
                                      ></i>
                                    </router-link>
                                  </div>
                                  <div v-if="listarIdiomasPersona.length == 0">
                                    <div class="justify-content-center">
                                      <div class="center col-lg-4 col-sm-12">
                                        <h3
                                          class="
                                            margens
                                            font-weight-bold
                                            text-center text-azul-sena
                                          "
                                        >
                                          No hay Idiomas
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-if="listarIdiomasPersona.length != 0">
                                    <div>
                                      <div class="col-9 mb-1">
                                        <input
                                          type="text"
                                          class="
                                            form-control
                                            col-lg-3 col-sm-12
                                          "
                                          placeholder="Buscar Idioma"
                                          v-model="filterIdioma"
                                          @keyup.prevent="
                                            lineaIdiomasFiltrado()
                                          "
                                        />
                                      </div>
                                      <br />
                                      <div
                                        class="text-center"
                                        v-if="!estadoPeticion"
                                      >
                                        <AnimacionCargando></AnimacionCargando>
                                      </div>
                                      <div
                                        class="table-responsive col-sm-12"
                                        v-if="estadoPeticion"
                                      >
                                        <table class="table table-hoverble">
                                          <thead id="listado">
                                            <tr>
                                              <th scope="col">Idioma</th>
                                              <th scope="col">Nivel</th>
                                              <th scope="col">Institución</th>
                                              <th scope="col">Acción</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr
                                              v-for="(
                                                idiomas, key
                                              ) in listarIdiomasFiltrado"
                                              :key="key"
                                            >
                                              <td>{{ idiomas.idioma }}</td>
                                              <td v-if="idiomas.nivel == 'A1'">
                                                Nivel elemental
                                              </td>
                                              <td v-if="idiomas.nivel == 'A2'">
                                                Nivel elemental superior
                                              </td>
                                              <td v-if="idiomas.nivel == 'B1'">
                                                Nivel intermedio
                                              </td>
                                              <td v-if="idiomas.nivel == 'B2'">
                                                Nivel intermedio superiorl
                                              </td>
                                              <td v-if="idiomas.nivel == 'C1'">
                                                Nivel avanzado
                                              </td>
                                              <td v-if="idiomas.nivel == 'C2'">
                                                Nivel cercano a la lengua
                                                materna
                                              </td>
                                              <td>{{ idiomas.institucion }}</td>
                                              <td class="campos">
                                                <div class="acciones">
                                                  <div
                                                    tooltip="Ver Idioma"
                                                    tooltip-flow="top"
                                                  >
                                                    <router-link
                                                      class="
                                                        btn btn-sm
                                                        bg-azul-sena
                                                        text-white
                                                      "
                                                      :to="{
                                                        name: 'VerDetalleIdiomaPersona',
                                                        params: {
                                                          id: idiomas.id_idioma_persona,
                                                        },
                                                      }"
                                                    >
                                                      <i class="fas fa-eye"></i>
                                                    </router-link>
                                                  </div>
                                                  <div
                                                    tooltip="Modificar Idioma"
                                                    tooltip-flow="top"
                                                  >
                                                    <router-link
                                                      class="
                                                        btn btn-sm
                                                        bg-azul-sena
                                                        text-white
                                                      "
                                                      :to="{
                                                        name: 'ModificarIdiomaPersona',
                                                        params: {
                                                          id: idiomas.id_idioma_persona,
                                                        },
                                                      }"
                                                    >
                                                      <i
                                                        class="fas fa-edit"
                                                      ></i>
                                                    </router-link>
                                                  </div>
                                                  <div
                                                    tooltip="Eliminar Idioma"
                                                    tooltip-flow="top"
                                                  >
                                                    <a
                                                      @click="
                                                        eliminarIdioma(
                                                          idiomas.id_idioma_persona,
                                                          key
                                                        )
                                                      "
                                                      class="
                                                        btn btn-sm
                                                        bg-azul-sena
                                                        text-white
                                                      "
                                                    >
                                                      <i
                                                        class="fas fa-trash"
                                                      ></i>
                                                    </a>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </tab-pane>
                            </tabs>

                            <!-- fin tabs -->
                          </div>
                          <!-- Fin Mi Educacion -->

                          <!-- Mi Mi Experiencia -->
                          <div
                            class="tab-pane fade"
                            id="v-pills-messages"
                            role="tabpanel"
                            aria-labelledby="v-pills-messages-tab"
                          >
                            <div>
                              <div>
                                  <tabs fill class="flex-column flex-sm-row">
                                    <tab-pane>
                                      <span slot="title">
                                        Mi experiencia laboral
                                      </span>
                                    </tab-pane>
                                  </tabs>
                                </div>
                              <div class="clearfix">
                                <router-link
                                  class="
                                    btn btn-sm
                                    bg-azul-sena
                                    text-white
                                    float-right
                                  "
                                  :to="{
                                    name: 'RegistrarExperienciaPersona',
                                  }"
                                >
                                  <i
                                    class="fas fa-plus size"
                                    title="Registrar Nuevo"
                                  ></i>
                                </router-link>
                              </div>
                              <div v-if="listaExperienciaPersona.length == 0">
                                <div class="justify-content-center">
                                  <div class="center col-lg-4 col-sm-12">
                                    <h3
                                      class="
                                        margens
                                        font-weight-bold
                                        text-center text-azul-sena
                                      "
                                    >
                                      No hay Experiencias
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div v-if="listaExperienciaPersona.length != 0">
                                
                                <div class="col-9 mb-1">
                                  <input
                                    type="text"
                                    class="form-control col-lg-3 col-sm-12"
                                    placeholder="Buscar Empresa"
                                    v-model="filterExp"
                                    @keyup.prevent="lineaExperienciaFiltrado()"
                                  />
                                </div>
                                <br />
                                <div class="text-center" v-if="!estadoPeticion">
                                  <AnimacionCargando></AnimacionCargando>
                                </div>
                                <div
                                  class="table-responsive col-sm-12"
                                  v-if="estadoPeticion"
                                >
                                  <table class="table table-hoverble">
                                    <thead id="listado">
                                      <tr>
                                        <th scope="col">Empresa</th>
                                        <th scope="col">Tipo Contrato</th>
                                        <th scope="col">Salario</th>
                                        <th scope="col">Actividad</th>
                                        <th scope="col">Acción</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr
                                        v-for="(
                                          empresa, key
                                        ) in listaExperienciaFiltrado"
                                        :key="key"
                                      >
                                        <td>{{ empresa.empresa }}</td>
                                        <td v-if="empresa.tipo_contrato == D">
                                          Definido
                                        </td>
                                        <td v-else>Indefinido</td>
                                        <td>{{ empresa.salario }}</td>
                                        <td>
                                          {{ empresa.actividad_empresa }}
                                        </td>

                                        <td class="campos">
                                          <div class="acciones">
                                            <div
                                              tooltip="Ver Experiencia"
                                              tooltip-flow="top"
                                            >
                                              <router-link
                                                class="
                                                  btn btn-sm
                                                  bg-azul-sena
                                                  text-white
                                                "
                                                :to="{
                                                  name: 'VerDetalleExperienciaPersona',
                                                  params: {
                                                    id: empresa.id_experiencia,
                                                  },
                                                }"
                                              >
                                                <i class="fas fa-eye"></i>
                                              </router-link>
                                            </div>
                                            <div
                                              tooltip="Modificar Experiencia"
                                              tooltip-flow="top"
                                            >
                                              <router-link
                                                class="
                                                  btn btn-sm
                                                  bg-azul-sena
                                                  text-white
                                                "
                                                :to="{
                                                  name: 'ModificarExperienciaPersona',
                                                  params: {
                                                    id: empresa.id_experiencia,
                                                  },
                                                }"
                                              >
                                                <i class="fas fa-edit"></i>
                                              </router-link>
                                            </div>
                                            <div
                                              tooltip="Eliminar Experiencia"
                                              tooltip-flow="top"
                                            >
                                              <a
                                                @click="
                                                  eliminarExperienciaPersona(
                                                    experienciaPersona.id_experiencia,
                                                    key
                                                  )
                                                "
                                                class="
                                                  btn btn-sm
                                                  bg-azul-sena
                                                  text-white
                                                "
                                              >
                                                <i class="fas fa-trash"></i>
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Fin Mi Experiencia -->

                          <!-- Mi Formacion -->
                          <div
                            class="tab-pane fade"
                            id="v-pills-settings"
                            role="tabpanel"
                            aria-labelledby="v-pills-settings-tab"
                          >
                            <div class="card-body">
                              <tabs fill class="flex-column flex-sm-row">
                                <tab-pane>
                                  <span slot="title">
                                    Red de conocimiento y Área Temática
                                  </span>
                                </tab-pane>
                              </tabs>

                              <div
                                class="col-sm-12 col-md-12 col-lg-12"
                                v-if="usuario.area_ruta_id == null"
                              >
                                <small
                                  class="col-sm-12 text-dark row text-center"
                                >
                                  Aún no tienes asignado una red de
                                  conocimiento, ni un área temática, por favor
                                  solicite al subdirector de su centro la información que debe tener para que se le asigne una
                                </small>

                                <br />

                                <div class="text-center">
                                  <base-button
                                    title="Ver PDF"
                                    type="azul-sena"
                                    @click="modalPasosAsignacionRed = true"
                                    class="btn btn-sm bg-azul-sena text-white"
                                  >
                                    Ver pasos
                                    <!-- modal finnnnnnnnnn-->
                                  </base-button>
                                </div>

                                <!-- modal -->
                                <div class="row">
                                  <div class="col-md-12">
                                    <modal
                                      :show.sync="modalPasosAsignacionRed"
                                      body-classes="p-0"
                                      modal-classes="modal-dialog-centered modal-sm modal-lg"
                                    >
                                      <template slot="header">
                                        <h1 class="text-azul-sena modal-title">
                                          Pasos para registrar una red
                                        </h1>
                                      </template>
                                      <card
                                        type="white"
                                        shadow
                                        header-classes="bg-white pb-5"
                                        body-classes="px-lg-5 py-lg-5"
                                        class="border-0"
                                      >
                                        <template>
                                          <div
                                            class="row justify-content-center"
                                          >
                                            <embed
                                              src="/descargas/pasosPrueba.pdf"
                                              type="application/pdf"
                                              width="100%"
                                              height="600px"
                                            />
                                          </div>
                                        </template>
                                      </card>
                                    </modal>
                                  </div>
                                </div>
                              </div>

                              <div class="row float-left" v-else>
                                <div class="col-sm-12 col-md-12 col-lg-12">
                                  <!-- capacitación -->
                                  <div>
                                    <strong>Red de conocimiento:</strong>
                                  </div>
                                  <div id="contenido">
                                    <p id="texto">
                                      {{ areaRuta.red_conocimiento.toUpperCase() }}
                                    </p>
                                  </div>
                                </div>
                                <div class="col-sm-12 col-md-12 col-lg-12">
                                  <!-- nombre de la convocatoria -->
                                  <div>
                                    <strong>Área Ruta:</strong>
                                  </div>
                                  <div id="contenido">
                                    <p id="texto">
                                      {{ areaRuta.area_ruta.toUpperCase() }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Fin Mi Formacion -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    id="show-more"
                    @click="datosDesplegables()"
                    class="btn btn-sm bg-azul-sena text-white"
                  >
                    Ver más
                  </a>
                </div>
                <!-- Fin Informacion -->
              </div>
            </div>
          </div>
          <!-- Fin Contenido -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swal from "sweetalert2";
import Axios from "@/Axios";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import FotoPerfilComponente from "@/components/FotoPerfilComponente.vue";

@Component({
  components: {
    AnimacionCargando,
    FotoPerfilComponente,
  },
})
export default class Index extends Vue {
  estadoPeticion = false;
  filterExp = "";
  filterEdu = "";
  filterIdioma = "";

  fotoPerfil = null;
  fotoPerfilTemp = null;

  usuario = null;

  modalPasosAsignacionRed = false;

  areaRuta = {
    id_usuario: null,
    persona_id: null,
    id_area_ruta: null,
    area_ruta: "",
    red_conocimiento: "",
    id_red_conocimiento: null,
  };

  // Servicios
  listarIdiomasPersona: any[] = [];
  listarIdiomasFiltrado: any[] = [];

  listaEducacionPersona: any[] = [];
  listaEducacionFiltrado: any[] = [];

  listaExperienciaPersona: any[] = [];
  listaExperienciaFiltrado: any[] = [];

  id_persona_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_persona;
  id_usuario_logeada = JSON.parse(sessionStorage.getItem("usuario")).id_usuario;

  datosPersonales = {
    correo: "",
    correo_aternativo: "",
    depto_expedicion: "",
    depto_nacimiento: "",
    depto_residencia: "",
    direccion: "",
    discapacidad: "",
    id_discapacidad: "",
    fecha_identificacion: "",
    fecha_nacimiento: "",
    genero: "",
    id_depto_expedicion: "",
    id_depto_nacimiento: "",
    id_depto_residencia: "",
    id_genero: "",
    id_municipio_expedicion: "",
    id_municipio_nacimiento: "",
    id_municipio_residencia: "",
    id_persona: "",
    id_tipo_identificacion: "",
    identificacion: "",
    localidad: "",
    municipio_expedicion: "",
    municipio_nacimiento: "",
    municipio_residencia: "",
    nacionalidad: "",
    pais_nacimiento: "",
    pais_residencia: "",
    porcentaje_discapacidad: "",
    primer_apellido: "",
    primer_nombre: "",
    segundo_apellido: "",

    segundo_nombre: "",
    telefono_fijo: "",
    telefono_movil: "",
  };

  experienciaPersona = {
    id_experiencia: "",
    persona_id: "",
    empresa: "",
    direccion_empresa: "",
    correo_empresa: "",
    salario: "",
    fecha_ingreso_empresa: "",
    fecha_retiro_empresa: "",
    cargo: "",
    area: "",
    tipo_contrato: "",
    jefe_inmediato: "",
    cargo_jefe: "",
    funciones: "",
    actividad_empresa: "",
    certificado: "",
    id_tipo_empresa: "",
    tipo_empresa: "",
    municipio: "",
    id_municipio: "",
    departamento: "",
    id_departamento: "",
    pais: "",
    id_pais: "",
  };

  datosEducacion = {
    actualizado: "",
    certificado: "",
    creado: "",
    fecha_fin: "",
    fecha_inicio: "",
    id_educacion: "",
    institucion: "",
    persona_id: "",
    tipo_educacion: "",
    titulo_obtenido: "",
  };

  idiomas = {
    id_idioma_persona: "",
    persona_id: "",
    idioma_id: "",
    idioma: "",
    institucion: "",
    nivel: "",
    certificado: null,
  };

  mounted() {
    this.mostrarDatosPersonales(this.id_persona_logeada);
    this.obtenerEducacionesPersona(this.id_persona_logeada);
    this.obtenerExperienciaPersona(this.id_persona_logeada);
    this.obtenerUsuario(this.id_usuario_logeada);
    this.obtenerIdiomasPersonales(this.id_persona_logeada);
    this.verFoto(this.id_usuario_logeada);
  }

  obtenerAreaRuta(idUsuario) {
    Axios()
      .get("ver_area_red_usuario/" + idUsuario)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.areaRuta = respuesta.data.results;
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

  obtenerUsuario(idUsuario) {
    Axios()
      .get("listar_usuario/" + idUsuario)
      .then((respuesta) => {
        
        if (respuesta.data.status == "success") {
          this.usuario = respuesta.data.results;
          if (this.usuario.area_ruta_id != null) {
            this.obtenerAreaRuta(idUsuario);
          }
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

  obtenerExperienciaPersona(id_xp) {
    Axios()
      .get("listar_experiencia_persona/" + id_xp)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaExperienciaPersona = respuesta.data.results;
          this.listaExperienciaFiltrado = respuesta.data.results;
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
  verDetallleExperienciaPersona(id_xe) {
    Axios()
      .get("ver_detalle_experiencia_persona/" + id_xe)
      .then((respuesta) => {})
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  mostrarDatosPersonales(id) {
    Axios()
      .get("ver_detalle_persona/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.datosPersonales = respuesta.data.results;
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
      })
      .finally(() => {
        this.estadoPeticion = true;
      });
  }

  eliminarExperienciaPersona(id, index) {
    Swal.fire({
      title: "Eliminar Experiencia ",
      text: this.listaExperienciaPersona[index].empresa + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete(
            "eliminar_experiencia_persona/" +
              this.listaExperienciaPersona[index].id_experiencia
          )
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Experiencia Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaExperienciaPersona.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar la experiencia",
                text: respuesta.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
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
    });
  }

  //Idiomas
  obtenerIdiomasPersonales(idPersona) {
    Axios()
      .get("listar_idiomas_persona/" + idPersona)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listarIdiomasPersona = respuesta.data.results;
          this.listarIdiomasFiltrado = respuesta.data.results;
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
  eliminarIdioma(id, index) {
    Swal.fire({
      title: "Eliminar Idioma ",
      text: this.listarIdiomasPersona[index].idioma + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete(
            "eliminar_idioma_persona/" +
              this.listarIdiomasPersona[index].id_idioma_persona
          )
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Idioma Eliminado",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listarIdiomasPersona.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar el idioma",
                text: respuesta.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
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
    });
  }
  //Fin de idiomas

  // Animacion despliegue
  datosDesplegables() {
    var contenido = document.getElementById("contenido");
    var button = document.getElementById("show-more");

    button.onclick = function () {
      if (contenido.className == "open") {
        contenido.className = "";
        button.innerHTML = "Ver más";
      } else {
        contenido.className = "open";
        button.innerHTML = "Ver menos";
      }
    };
  }
  obtenerEducacionesPersona(id_p) {
    Axios()
      .get("listar_educacion_persona/" + id_p)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listaEducacionPersona = respuesta.data.results;
          this.listaEducacionFiltrado = respuesta.data.results;
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
  verDetalleEducacionPersona(id_e) {
    Axios()
      .get("ver_detalle_educacion_persona/" + id_e)
      .then((respuesta) => {})
      .finally(() => {
        this.estadoPeticion = true;
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }
  //------------------------------------------------------------------

  lineaExperienciaFiltrado() {
    let picFilter = [];
    // this.listaConvocatoriasFiltrado = []

    for (let experiencia of this.listaExperienciaPersona) {
      let empresa = experiencia.empresa.toLowerCase();
      let actividad = experiencia.actividad_empresa.toLowerCase();

      if (
        empresa.indexOf(this.filterExp) >= 0 ||
        actividad.indexOf(this.filterExp) >= 0
      ) {
        picFilter.push(experiencia);
      }
    }

    this.listaExperienciaFiltrado = picFilter;
    if (this.listaExperienciaFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró la experiencia, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filterExp = "";
      this.listaExperienciaFiltrado = this.listaEducacionPersona;
    }
  }
  //------------------------------------------------------------------
  lineaEducacionFiltrado() {
    let picFilter = [];

    for (let educacion of this.listaEducacionPersona) {
      let institucion = educacion.institucion.toLowerCase();
      let titulo = educacion.titulo_obtenido.toLowerCase();

      if (
        institucion.indexOf(this.filterEdu) >= 0 ||
        titulo.indexOf(this.filterEdu) >= 0
      ) {
        picFilter.push(educacion);
      }
    }

    this.listaEducacionFiltrado = picFilter;
    if (this.listaEducacionFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró la educación, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filterEdu = "";
      this.listaEducacionFiltrado = this.listaEducacionPersona;
    }
  }

  //------------------------------------------------------------------
  //------------------------------------------------------------------
  lineaIdiomasFiltrado() {
    let picFilter = [];

    for (let idiomas of this.listarIdiomasPersona) {
      let institucion = idiomas.institucion.toLowerCase();
      let idioma = idiomas.idioma.toLowerCase();

      if (
        institucion.indexOf(this.filterIdioma) >= 0 ||
        idioma.indexOf(this.filterIdioma) >= 0
      ) {
        picFilter.push(idiomas);
      }
    }

    this.listarIdiomasFiltrado = picFilter;
    if (this.listarIdiomasFiltrado.length == 0) {
      //busco no encontro
      Swal.fire({
        title: "No hay coincidencias",
        position: "center",
        timer: 1000,
        text: "No se encontró el idioma, que coincida con la búsqueda",
        showConfirmButton: false,
        // confirmButtonText: "Aceptar",
        // confirmButtonColor: "#238276",
        backdrop: "rgba(0,0,0,0)",
        background: "#eeeeee",
      });
      this.filterIdioma = "";
      this.listarIdiomasFiltrado = this.listarIdiomasPersona;
    }
  }
  //------------------------------------------------------------------
  eliminarEducacion(id, index) {
    Swal.fire({
      title: "Eliminar Educación ",
      text: this.listaEducacionPersona[index].titulo_obtenido + "?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#238276",
      cancelButtonColor: "#2d2d2d",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Axios()
          .delete(
            "eliminar_educacion_persona/" +
              this.listaEducacionPersona[index].id_educacion
          )
          .then((respuesta) => {
            if (respuesta.data.status == "success") {
              Swal.fire({
                title: "Educación Eliminada",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
              });
              this.listaEducacionPersona.splice(index, 1);
            } else {
              Swal.fire({
                title: "No se pudo eliminar la educación",
                text: respuesta.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-azul-sena",
                },
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
    });
  }
  //---------------------------------------------------------------

  verFoto(id_usuario) {
    this.fotoPerfil =
      "https://develdfp.cloudsenactpi.net/api/ver_foto/" + id_usuario;
  }
  //---------------------------------------------------------------
  subirFoto() {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("imagen", this.fotoPerfilTemp);
    data.append("id_usuario_autenticado", this.id_usuario_logeada);

    //Enviamos la petición
    Axios()
      .post("almacenar_foto", data, { headers: headers })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire({
            title: "Se subió la Foto!",
            text: "Foto de Perfil cargado exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.verFoto(this.id_usuario_logeada);
        } else {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        }
        this.$router.push({ name: "GestionarHojaDeVidaENI" });
      });
  }
  //---------------------------------------------------------------
  obtenerFoto(event) {
    if (event.target.files[0].size <= 2000000) {
      //2mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".jpeg" || extDoc == ".jpg" || extDoc == ".png") {
        this.fotoPerfilTemp = event.target.files[0];
        Swal.fire({
          title: "Foto De Perfil Cargada!",
          text: "La foto a sido cargado exitosamente, presiona el botón subir foto para que sea guardada!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
        });
      } else {
        this.fotoPerfilTemp = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es una foto!",
          "error"
        );
      }
    } else {
      this.fotoPerfilTemp = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 2 MegaBytes!",
        "error"
      );
    }
  }
}
</script>

<style>
/* .profile-img {
  text-align: center;
}
.profile-img img {
  width: 40%;
  height: 100%;
  border: 3.5px solid #dfdfdf;
  border-radius: 100%;
  transition: 0.2s all;
}

.profile-img img:hover {
  border: 3.5px solid #238276;
} */

/*-------------------*/
.text-blank {
  color: #fff;
}

.text-blank:hover {
  color: #eee;
}

#contenido {
  max-height: 459px;
  overflow: hidden;
  /* transicion */
  transition: max-height 0.9s;
}

#contenido.open {
  max-height: 5000px;

  /* transicion */
  transition: max-height 0.9s;
}

#show-more {
  width: 20%;
  display: block;
  cursor: pointer;
  text-align: center;
  margin: auto;
}

#show-more:hover {
  background-color: #20514b;
  color: #fff;
}

/*download-pdf*/
#download-pdf {
  width: 80%;
  display: block;
  cursor: pointer;
  text-align: center;
  margin: auto;
}

#download-pdf:hover {
  background-color: #20514b;
  color: #fff;
}

/* estilo de opciones a elegir */
.opciones {
  margin-left: 20px;
  margin-right: 20px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #238276;
}

.nav-pills .nav-link {
  color: #333;
}

.size {
  font-size: 2em;
}

.sizep {
  font-size: 2em;
  margin-right: -3px;
}

.clearfix {
  margin-bottom: -40px;
  margin-top: 20px;
  margin-right: 15px;
}

.campos .actividad {
  width: 400px;
}

.campos .acciones {
  width: 100px;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
}

@media (min-width: 992px) {
  .col-lg-3 {
    max-width: 85%;
  }
}

.espaciado {
  margin-bottom: 20px;
  margin-top: 20px;
}

.margens {
  margin-top: 10px;
}

/* .input-file {
  padding-left: 15px;
  width: 330px;
  margin: 0 auto;
  background: transparent;
  -webkit-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.04);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0);
}
.upload-img {
  border-radius: 100%;
  display: inline-block;
  width: 130px;
  height: 130px;
  object-fit: cover;
  object-position: 50% 50%;
  margin-right: 35px;
  vertical-align: middle;
  border: 4px solid #dee2e6;
} */

.contenedor figure {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 100%;
  border: 4px solid #dee2e6;
}

.contenedor figure img {
  display: inline-block;
  width: 130px;
  height: 130px;
  object-fit: cover;
  object-position: 50% 50%;
  transition: all 400ms ease-out;
  will-change: transform;
}

.contenedor figure .capa {
  position: absolute;
  top: 0;
  width: 130px;
  height: 130px;
  background: rgba(44, 45, 47, 0.7);
  transition: all 400ms ease-out;
  opacity: 0;
  visibility: hidden;
  text-align: center;
}

.contenedor figure:hover > .capa {
  opacity: 1;
  visibility: visible;
}

.contenedor figure:hover > .capa h3 {
  margin-top: 30px;
  margin-bottom: 15px;
}

.contenedor figure .capa h3 {
  color: #fff;
  font-weight: 400;
  margin-bottom: 120px;
  transition: all 400ms ease-out;
  margin-top: 30px;
}

.contenedor figure .capa p {
  color: #fff;
  font-size: 15px;
  line-height: 1.5;
  width: 100%;
  max-width: 220px;
  margin: auto;
}
</style>