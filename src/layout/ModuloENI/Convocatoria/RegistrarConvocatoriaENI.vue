<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div v-if="!estadoCargando">
        <div class="card-header">
          <h1 class="text-azul-sena">REGISTRAR CAPACITACIÓN ENI</h1>
        </div>
        <div class="card-body"></div>
        <div class="text-center">
          <AnimacionCargando></AnimacionCargando>
        </div>
      </div>
      <div class="card" v-if="estadoCargando">
        <div class="card-header">
          <h1 class="text-azul-sena">REGISTRAR CONVOCATORIA ENI</h1>
        </div>
        <div class="card-body">
          <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
            <div>
              <label class="mt-2 font-weight-bold">
                Nombre de la Convocatoria
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
                <input
                  type="text"
                  name="convocatoria"
                  class="form-control"
                  id="convocatoria"
                  placeholder="Nombre de la convocatoria"
                  v-model="convocatoria.convocatoria"
                  v-validate="{ required: true }"
                />
              </div>
              <small
                v-show="errors.has('convocatoria')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("convocatoria") }}
              </small>
            </div>
            <div>
              <label class="mt-2 font-weight-bold">
                Modalidad
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
                  class="form-control mb-3"
                  v-model="convocatoria.modalidad_id"
                >
                  <option value="" selected disabled>
                    Seleccione modalidad
                  </option>
                  <option
                    v-for="(modalidad, index) of modalidades"
                    :key="index"
                    :value="modalidad.id_modalidad.toString()"
                  >
                    {{ modalidad.modalidad }}
                  </option>
                </select>
              </div>
              <small
                v-show="errors.has('modalidad')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("modalidad") }}
              </small>
            </div>

            <div>
              <label class="mt-2 font-weight-bold">
                Año
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
                  v-model="convocatoria.plan_institucional_id"
                  v-validate="{ required: true }"
                  id="año"
                  name="año"
                  class="form-control"
                  @change="listarCapacitacionesTipoAnio()"
                >
                  <option value="" selected disabled>Seleccione el año</option>
                  <option
                    v-for="(fecha, index) in fechas_pic"
                    :key="index"
                    :value="fecha.plan_institucional_id"
                  >
                    {{ fecha.plan_institucional_id }}
                  </option>
                </select>
              </div>
              <small
                v-show="errors.has('año')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("año") }}
              </small>
            </div>

            <div v-if="convocatoria.plan_institucional_id != ''">
              <label class="mt-2 font-weight-bold">
                Tipo Pic
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
                  v-model="convocatoria.id_pic_tipo"
                  v-validate="{ required: true }"
                  id="tipo"
                  name="tipo"
                  class="form-control"
                  @change="listarCapacitacionesTipoAnio()"
                >
                  <option value="" selected disabled>Seleccione el tipo</option>
                  <option
                    v-for="(tipo, index) in picTipos"
                    :value="tipo.id_pic_tipo"
                    :key="index"
                  >
                    {{ tipo.pic_tipo }}
                  </option>
                </select>
              </div>
              <small
                v-show="errors.has('tipo')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("tipo") }}
              </small>
            </div>

            <div v-if="convocatoria.id_pic_tipo">
              <label class="mt-2 font-weight-bold">
                Capacitación
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
                  v-model="convocatoria.id_pic"
                  name="capacitacion"
                  id="capacitacion"
                  v-validate="{ required: true }"
                  class="form-control mb-3"
                >
                  <option value="" selected disabled>
                    seleccione la capacitación
                  </option>
                  <template
                    v-for="(capacitacion, index) in lista_tipos_capacitaciones"
                  >
                    <option :value="capacitacion.id_pic" :key="index">
                      {{ capacitacion.capacitacion }}
                    </option>
                  </template>
                </select>
              </div>
              <small
                v-show="errors.has('capacitacion')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("capacitacion") }}
              </small>
            </div>

            <div v-if="convocatoria.id_pic_tipo">
              <label class="mt-2 font-weight-bold">
                Entidad Capacitadora
                <span class="text-danger">*</span>
                :
              </label>
              <div class="input-group">
                <select
                  v-model="convocatoria.entidad_capacitadora_id"
                  v-validate="{ required: true }"
                  id="linea_cap"
                  name="linea_cap"
                  class="form-control"
                >
                  <option value="" selected disabled>
                    Seleccione la entidad capacitadora
                  </option>
                  <option
                    v-for="(entidad, index) in listarEntidadCapacitadora"
                    :value="entidad.id_pic_entidad_capacitadora"
                    :key="index"
                  >
                    {{ entidad.entidad_capacitadora }}
                  </option>
                </select>
              </div>
              <small
                v-show="errors.has('linea_cap')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("linea_cap") }}
              </small>
            </div>
            <div>
              <label class="mt-2 font-weight-bold">
                Horas
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
                <input
                  type="number"
                  name="horas_capacitacion"
                  class="form-control"
                  id="horas_capacitacion"
                  placeholder="Horas capacitacion"
                  v-model="convocatoria.horas_capacitacion"
                  v-validate="{ required: true }"
                />
              </div>
              <small
                v-show="errors.has('horas_capacitacion')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("horas_capacitacion") }}
              </small>
            </div>
            <!-- Instructor responsable -->
            <div v-if="convocatoria.id_pic_tipo">
              <div
                class="mb-3"
                v-if="convocatoria.entidad_capacitadora_id == '1'"
              >
                <label class="mt-2 font-weight-bold">
                  Instructor Responsable
                  <span
                    class="text-danger font-weigth-bold"
                    tooltip="Campo Requerido"
                    tooltip-flow="top"
                  >
                    *
                  </span>
                  :
                </label>

                <div class="input-group" @click="modalBuscarInstructor = true">
                  <input
                    type="text"
                    name="identificacionInstructor"
                    class="form-control"
                    id="identificacionInstructor"
                    placeholder="Buscar responsable"
                    v-model="infoInstructorResponsable"
                    :disabled="true"
                    v-validate="{ required: true }"
                  />
                </div>

                <small
                  v-show="errors.has('identificacionInstructor')"
                  class="text-danger font-weigth-bold"
                >
                  {{ errors.first("identificacionInstructor") }}
                </small>
                <!-- modal -->
                <div class="container" id="modal">
                  <modal
                    :show.sync="modalBuscarInstructor"
                    body-classes="p-0"
                    modal-classes="justify-content-center modal-dialog-centered modal-sm-12"
                  >
                    <template slot="header">
                      <h2
                        class="text-azul-sena modal-title"
                        id="modalBuscarInstructor"
                      >
                        Buscar instructor
                      </h2>
                    </template>
                    <card
                      type="white"
                      shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-5"
                      class="border-0"
                    >
                      <div id="contenido">
                        <!-- formulario de busqueda de instructor -->
                        <div id="campo">
                          <label class="mt-2 font-weight-bold">
                            Identificación
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
                            <input
                              type="number"
                              name="identificacionInstructor"
                              class="form-control"
                              id="identificacionInstructor"
                              v-model="convocatoria.identificacion_responsable"
                              placeholder="Identificación Instructor"
                              v-validate="{ min_value: 9999999 }"
                              @keyup="validarInstructorBuscado()"
                            />
                          </div>
                          <small
                            v-show="errors.has('identificacionInstructor')"
                            class="text-danger font-weigth-bold"
                          >
                            {{ errors.first("identificacionInstructor") }}
                          </small>
                        </div>

                        <button
                          class="
                            btn btn-azul-sena
                            col-12 col-md-12 col-lg-12
                            mt-2
                          "
                          @click="buscarInstructor()"
                        >
                          Buscar instructor
                        </button>
                        <!-- formulario de busqueda de instructor -->
                      </div>
                    </card>
                  </modal>
                </div>
              </div>
              <!-- FIN FORMULARIO DE BUSQUEDA DE INSTRUCTOR -->
            </div>

            <!-- radio buttom para seleccionar nacional o internacional -->
            <div class="row">
              <div class="col-6">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="n"
                    v-model="convocatoria.nacional"
                    @click="convocatoria.lugar = null"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Capacitación nacional
                  </label>
                </div>
              </div>
              <div class="col-6">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="i"
                    v-model="convocatoria.nacional"
                    @click="
                      (convocatoria.id_municipio = null),
                        (departamento_actual = null)
                    "
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Capacitación internacional
                  </label>
                </div>
              </div>
            </div>
            <!-- fin radio button -->
            <div class="row" v-if="convocatoria.nacional == 'n'">
              <div class="col-sm-12 col-md-12 col-lg-6 col-lg-6">
                <!-- seleccion de departamentos -->
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
                <!-- seleccion de departamentos fin -->
              </div>

              <div class="col-sm-12 col-md-12 col-lg-6 col-lg-6">
                <div v-if="departamento_actual">
                  <label class="mt-2 font-weight-bold">
                    Selccione el municipio
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
                      v-validate="{ required: true }"
                      name="area"
                      id="area"
                      class="form-control mb-3"
                      v-model="convocatoria.id_municipio"
                    >
                      <option value="" selected disabled>
                        Seleccione el municipio
                      </option>
                      <template v-for="(municipio, index) in lista_municipios">
                        <option :value="municipio.id_municipio" :key="index">
                          {{ municipio.municipio }}
                        </option>
                      </template>
                    </select>
                  </div>
                  <small
                    v-show="errors.has('area')"
                    class="text-danger font-weigth-bold"
                  >
                    {{ errors.first("area") }}
                  </small>
                </div>
              </div>
            </div>
            <div v-if="convocatoria.nacional == 'i'">
              <label class="mt-2 font-weight-bold">
                Lugar
                <span class="text-danger">*</span>
                :
              </label>
              <div>
                <input
                  type="text"
                  class="form-control"
                  name="lugar"
                  id="lugar"
                  placeholder="Lugar"
                  v-model="convocatoria.lugar"
                  v-validate="{ required: true }"
                />
                <small v-show="errors.has('lugar')" class="text-danger">
                  {{ errors.first("lugar") }}
                </small>
              </div>
            </div>
            <!-- Options Fin -->
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Fecha inicio convocatoria
                  <span class="text-danger">*</span>
                  :
                </label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    :min="convocatoria.plan_institucional_id + '-01-01'"
                    :max="convocatoria.plan_institucional_id + '-12-31'"
                    name="fecha_inicio_conv"
                    id="fecha_inicio_conv"
                    v-model="convocatoria.fecha_inicio_conv"
                    v-validate="{ required: true }"
                  />
                  <small
                    v-show="errors.has('fecha_inicio_conv')"
                    class="text-danger"
                  >
                    {{ errors.first("fecha_inicio_conv") }}
                  </small>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Fecha fin convocatoria
                  <span class="text-danger">*</span>
                  :
                </label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    name="fecha_fin_conv"
                    id="fecha_fin_conv"
                    :min="convocatoria.fecha_inicio_conv"
                    :max="convocatoria.plan_institucional_id + '-12-31'"
                    v-model="convocatoria.fecha_fin_conv"
                    v-validate="{ required: true }"
                  />
                  <small
                    v-show="errors.has('fecha_fin_conv')"
                    class="text-danger"
                  >
                    {{ errors.first("fecha_fin_conv") }}
                  </small>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Fecha Inicio Capacitación
                  <span class="text-danger">*</span>
                  :
                </label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    :min="convocatoria.fecha_inicio_conv"
                    :max="convocatoria.plan_institucional_id + '-12-31'"
                    name="fecha_inicio"
                    id="fecha_inicio"
                    v-model="convocatoria.fecha_inicio"
                    v-validate="{ required: true }"
                  />
                  <small
                    v-show="errors.has('fecha_inicio')"
                    class="text-danger"
                  >
                    {{ errors.first("fecha_inicio") }}
                  </small>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold">
                  Fecha Fin Capacitación
                  <span class="text-danger">*</span>
                  :
                </label>
                <div>
                  <input
                    type="date"
                    class="form-control"
                    name="fecha_fin"
                    id="fecha_fin"
                    :min="convocatoria.fecha_inicio"
                    :max="convocatoria.plan_institucional_id + '-12-31'"
                    v-model="convocatoria.fecha_final"
                    v-validate="{ required: true }"
                  />
                  <small v-show="errors.has('fecha_fin')" class="text-danger">
                    {{ errors.first("fecha_fin") }}
                  </small>
                </div>
              </div>
            </div>

            <div>
              <label class="mt-2 font-weight-bold">
                Requisitos
                <span class="text-danger">*</span>
                :
              </label>
              <div v-if="!ver">
                <div class="d-flex">
                  <input
                    type="text"
                    placeholder="Requisitos"
                    class="form-control mr-2"
                    v-model="requisito"
                    v-validate="{ required: false }"
                  />
                  <button
                    class="
                      btn btn-sm btn-azul-sena
                      text-white
                      d-flex
                      align-items-center
                      px-3
                    "
                    :disabled="requisito == ''"
                    @click="agregarEliminarRequisito('agregar')"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <small
                  v-show="
                    lista_perfiles_requisitos.length == 0 &&
                    errorRequisito == true
                  "
                  class="text-danger"
                >
                  debe tener almenos 1 requisito
                </small>
              </div>
              <div
                class="col-12 table-responsive mt-3"
                v-if="lista_perfiles_requisitos.length > 0"
              >
                <table class="table" id="listado">
                  <thead class="bg-gradient-naranja-sena text-white">
                    <tr>
                      <th class="w-100">Requisitos</th>
                      <th v-if="!ver">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(requisito, index) in lista_perfiles_requisitos"
                      :key="index"
                    >
                      <td>{{ requisito }}</td>
                      <td>
                        <a
                          class="btn btn-sm btn-azul-sena text-white"
                          v-if="!ver"
                          @click="agregarEliminarRequisito('eliminar', index)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <label class="mt-2 font-weight-bold">
                Dirigido a:
                <span
                  class="text-danger font-weigth-bold"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                >
                  *
                </span>
                :
              </label>
              <div>
                <template>
                  <div>
                    <multiselect
                      v-model="convocatoria.tipos_funcionarios"
                      tag-placeholder="seleccione"
                      placeholder="Seleccione"
                      selectLabel="Seleccionar"
                      selectedLabel="Seleccionado"
                      deselectLabel="Borrar de la lista"
                      label="nombre"
                      track-by="id_dirigido_a"
                      :options="paraFuncionarios"
                      :multiple="true"
                      :taggable="true"
                      @tag="addTag"
                    ></multiselect>
                  </div>
                </template>
              </div>
              <small
                v-show="errors.has('funcionarios')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("funcionarios") }}
              </small>
            </div>

            <div>
              <label class="mt-2 font-weight-bold">
                Financiación
                <span class="text-danger">*</span>
                <small>(*COP)</small>
                :
              </label>
              <div>
                <input
                  type="number"
                  placeholder="Financiación (*COP)"
                  class="form-control"
                  name="financiacion"
                  id="financiacion"
                  v-model="convocatoria.financiacion"
                  v-validate="{ required: true, min_value: 0 }"
                />

                <small v-show="errors.has('financiacion')" class="text-danger">
                  {{ errors.first("financiacion") }}
                </small>
              </div>
            </div>
            <div>
              <label class="mt-2 font-weight-bold">
                Tipos Financiación
                <span class="text-danger">*</span>
                :
              </label>
              <div class="input-group">
                <select
                  v-model="convocatoria.tipo_financiacion"
                  v-validate="{ required: true }"
                  id="tipo_fin"
                  name="tipo_fin"
                  class="form-control"
                >
                  <option value="" selected disabled>
                    Seleccione el Tipo de Financiación
                  </option>
                  <option :value="1">Convenio</option>
                  <option :value="2">Contrato</option>
                  <option :value="3">Memorando de entendimiento</option>
                  <option :value="4">Proveedor SENA</option>
                </select>
              </div>
              <small
                v-show="errors.has('tipo_fin')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("tipo_fin") }}
              </small>
            </div>

            <!-- nuevo -->
            <div>
              <label class="mt-2 font-weight-bold">
                Línea Tecnologica
                <span class="text-danger">*</span>
                :
              </label>
              <div class="input-group">
                <select
                  v-model="convocatoria.linea_tecnologica_id"
                  v-validate="{ required: true }"
                  id="linea_tec"
                  name="linea_tec"
                  class="form-control"
                >
                  <option value="" selected disabled>
                    Seleccione la línea Tecnológica
                  </option>
                  <option
                    v-for="(linea, index) in listarLineaTecnologica"
                    :value="linea.id_pic_linea_tecnologica"
                    :key="index"
                  >
                    {{ linea.linea_tecnologica }}
                  </option>
                </select>
              </div>
              <small
                v-show="errors.has('linea_tec')"
                class="text-danger font-weigth-bold"
              >
                {{ errors.first("linea_tec") }}
              </small>
            </div>
            <!-- fin nuevo -->

            <!-- tabla aprendizaje -->
            <div>
              <label class="mt-2 font-weight-bold">
                Resultado Aprendizaje
                <span class="text-danger">*</span>
                :
              </label>
              <div v-if="!mostar_aprendizaje">
                <div class="d-flex">
                  <input
                    type="text"
                    placeholder="Aprendizaje"
                    class="form-control mr-2"
                    v-model="aprendizaje"
                    name="aprendizaje"
                    v-validate="{ required: false }"
                  />
                  <button
                    class="
                      btn btn-sm btn-azul-sena
                      text-white
                      d-flex
                      align-items-center
                      px-3
                    "
                    :disabled="aprendizaje == ''"
                    @click="agregarEliminarAprendizaje('agregar')"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <small
                  v-show="
                    lista_aprendizaje.length == 0 && errorRequisito == true
                  "
                  class="text-danger"
                >
                  debe tener almenos 1 requisisto
                </small>
              </div>
              <div
                class="col-12 table-responsive mt-3"
                v-if="lista_aprendizaje.length > 0"
              >
                <table class="table" id="listado">
                  <thead class="bg-gradient-naranja-sena text-white">
                    <tr>
                      <th class="w-100">Aprendizaje</th>
                      <th v-if="!mostar_aprendizaje">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(aprendizaje, index) in lista_aprendizaje"
                      :key="index"
                    >
                      <td>{{ aprendizaje }}</td>
                      <td>
                        <a
                          class="btn btn-sm btn-azul-sena text-white"
                          v-if="!mostar_aprendizaje"
                          @click="agregarEliminarAprendizaje('eliminar', index)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- tabla competencia -->
            <div>
              <label class="mt-2 font-weight-bold">
                Competencias Programadas
                <span class="text-danger">*</span>
                :
              </label>
              <div v-if="!mostar_oferta">
                <div class="d-flex">
                  <input
                    type="text"
                    placeholder="Ofertas"
                    class="form-control mr-2"
                    v-model="oferta"
                    name="oferta"
                    v-validate="{ required: false }"
                  />
                  <button
                    class="
                      btn btn-sm btn-azul-sena
                      text-white
                      d-flex
                      align-items-center
                      px-3
                    "
                    :disabled="oferta == ''"
                    @click="agregarEliminarOferta('agregar')"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <small
                  v-show="lista_oferta.length == 0 && errorRequisito == true"
                  class="text-danger"
                >
                  debe tener almenos 1 requisisto
                </small>
              </div>
              <div
                class="col-12 table-responsive mt-3"
                v-if="lista_oferta.length > 0"
              >
                <table class="table" id="listado">
                  <thead class="bg-gradient-naranja-sena text-white">
                    <tr>
                      <th class="w-100">Ofertas</th>
                      <th v-if="!mostar_oferta">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(oferta, index) in lista_oferta" :key="index">
                      <td>{{ oferta }}</td>
                      <td>
                        <a
                          class="btn btn-sm btn-azul-sena text-white"
                          v-if="!mostar_oferta"
                          @click="agregarEliminarOferta('eliminar', index)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- fin campos nuevos -->
            <!-- ---------------------------------------------------------------------------------------------------------- -->
            <!-- anexos -->
            <div v-if="anexos_convocatoria == 0 && ver">
              <p class="text-center mt-2 display-4">No hay anexos cargados</p>
            </div>
            <div v-else>
              <div v-if="!crear && ver" class="col-12 mt-3">
                <table class="table" id="listado">
                  <thead class="bg-gradient-naranja-sena text-white">
                    <tr>
                      <th @click="ordenar(0, 'str')">ID</th>
                      <th @click="ordenar(0, 'str')">Anexo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(anexo, index) in anexos_convocatoria"
                      :key="index"
                    >
                      <td>{{ anexo.id_pic_anexo_convocatoria }}</td>
                      <td>{{ anexo.anexo }}</td>
                      <td>
                        <span tooltip="Ver Anexo" tooltip-flow="top">
                          <b-button
                            class="btn btn-sm bg-azul-sena text-white"
                            @click="
                              (modalAnexo = true),
                                mostrarDocumento(
                                  anexo.id_pic_anexo_convocatoria
                                )
                            "
                          >
                            <i class="fas fa-eye"></i>
                          </b-button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- modal -->
                <modal
                  :show.sync="modalAnexo"
                  body-classes="p-0"
                  modal-classes="modal-dialog-centered modal-sm modal-lg"
                >
                  <template slot="header">
                    <h1
                      class="text-azul-sena modal-title"
                      id="modalNovedadesAprendiz"
                    >
                      Anexo
                    </h1>
                  </template>
                  <embed
                    :src="rutadocumento"
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                </modal>
              </div>
            </div>

            <!-- anexos fin -->

            <div v-show="false">
              <label class="mt-2 font-weight-bold">Subir documento:</label>
              <div class="d-flex justify-content-around flex-wrap">
                <input
                  ref="documento"
                  type="file"
                  v-show="false"
                  multiple
                  accept=".pdf"
                  @change="obtenerDocumento($event)"
                />
                <button
                  class="
                    btn
                    bg-azul-sena
                    mt-2
                    mr-0
                    text-white
                    col-12 col-lg-7
                    h-100
                    align-items-center
                  "
                  @click.prevent="$refs.documento.click()"
                >
                  Cargar Documentos
                </button>
                <p
                  v-if="docResolucon != null"
                  class="mt-3 mb-2 col-12 col-lg-5"
                >
                  <template v-for="(archivo, index) in docResolucon">
                    - {{ archivo.name }}
                    <br :key="index" />
                  </template>
                </p>
                <p v-else class="mt-3 mb-2 text-center">
                  Tipo de archivo (pdf)
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- _____________________________________________________ -->
        <div class="text-center card-footer" v-if="estadoPeticionRegistrar">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="card-footer" v-if="!estadoPeticionRegistrar">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1" v-if="crear && !ver">
              <base-button
                type="azul-sena"
                @click="registrarConvocatoria(), (errorRequisito = true)"
                class="btn btn-block bg-azul-sena text-white"
              >
                Registrar
              </base-button>
            </div>
            <div class="col-lg-4 col-sm-12 mt-1" v-if="!crear && !ver">
              <base-button
                type="azul-sena"
                @click="validarFormulario(), (errorRequisito = true)"
                class="btn btn-block bg-azul-sena text-white"
              >
                Modificar
              </base-button>
            </div>
            <div
              class="col-lg-4 col-sm-12 mt-1"
              v-if="!crear && ver && convocatoria.pic_fase_id == 1"
            >
              <base-button
                type="azul-sena"
                @click="cambiarPostuacion()"
                class="btn btn-block bg-azul-sena text-white"
              >
                Iniciar Postulaciones
              </base-button>
            </div>
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
  </div>
</template>

<script lang="ts">
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import AnimacionCargando from "../../../components/animacionCargando.vue";
import router from "@/router";
import Multiselect from "vue-multiselect";

@Component({
  components: {
    AnimacionCargando,
    Multiselect,
  },
})
export default class VerDetalleEvaluacionCpacitacion extends Vue {
  estadoCargando = false;
  ver: any = false;
  mostar_aprendizaje: any = false;
  mostar_oferta: any = false;
  crear: any = true;
  errorRequisito: any = false;
  docResolucon = null;
  docValido = false;
  estadoPeticion = false;
  modalBuscarInstructor = false;
  infoInstructorResponsable = "";
  estadobusquedainstructor = false;

  tipo_inter_nacio = "";
  otro = false;

  estadoPeticionRegistrar = false;
  convocatoria = {
    convocatoria: "",
    fecha_inicio: "",
    fecha_final: "",
    lugar: "",
    perfiles_requisitos: "",
    para_funcionarios: "",
    pertenece_a_red: "SI",
    plan_institucional_id: "",
    id_pic: "",
    id_usuario_autenticado: JSON.parse(sessionStorage.getItem("usuario"))
      .id_usuario, //esta quemado, verificar
    id_municipio: "",
    financiacion: "",
    id_pic_tipo: "",
    tipo_financiacion: "",
    nombre: "",
    dirigido_a_id: "",
    linea_tecnologica: "",
    linea_tecnologica_id: "",
    entidad_capacitadora_id: "",
    entidad_capacitadora: "",
    resultado_aprendizaje: "",
    competencia_programa_oferta: "",
    fecha_fin_conv: "",
    fecha_inicio_conv: "",
    horas_capacitacion: "",
    identificacion_responsable: "",
    modalidad_id: "",
    tipos_funcionarios: [],
  };

  fechas_pic = [];

  lista_capacitaciones: any[] = [];
  modalidades: any[] = [];
  listarLineaTecnologica: any[] = [];
  listarEntidadCapacitadora: any[] = [];

  lineaTecnologica = {
    id_pic_linea_tecnologica: "",
    linea_tecnologica: "",
  };
  entidadCapacitadora = {
    id_pic_entidad_capacitadora: "",
    entidad_capacitadora: "",
  };

  requisito = "";
  aprendizaje = "";
  oferta = "";

  lista_perfiles_requisitos: any[] = [];
  lista_aprendizaje: any[] = [];
  lista_oferta: any[] = [];
  // anexos
  anexos_convocatoria: any[] = [];
  id_anexo = "";
  modalAnexo = false;
  rutadocumento = "";
  //departamentos
  lista_departamentos: any[] = [];
  id_pais = 57;
  lista_paises = null;
  //municipios
  lista_municipios = null;
  departamento_actual = null;

  lista_tipos_capacitaciones: any[] = [];
  picTipos: any[] = [];

  paraFuncionarios: any[] = [];
  paraFuncionariosEscogidos: any[] = [];

  fecha = "";

  async mounted() {
    await this.obtenerCapacitaciones();
    await this.ontenerPlanInstitucional();
    await this.obtenerDepartamento(57);
    await this.obtenerLineaTecnologica();
    await this.obtenerEntidadCapacitadora();
    await this.listarTiposPics();
    await this.listarCapacitacionesTipoAnio();
    await this.obtenerFuncionarios();
    this.estadoCargando = true;
  }

  //varios dirigido a
  // multiselect funcionarios
  obtenerFuncionarios() {
    Axios()
      .get("listar_pic_dirigida")
      .then((respuesta) => {
        this.paraFuncionarios = respuesta.data.results;
      });
  }

  addTag(newTag) {
    const tag = {
      para_funcionarios: newTag,
      nombre: "",
      id_dirigido_a:
        newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
    };
    this.paraFuncionarios.push(tag);
    this.paraFuncionariosEscogidos.push(tag);
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (valid) {
        if (
          this.convocatoria.entidad_capacitadora_id == "1" &&
          this.infoInstructorResponsable == ""
        ) {
          Swal.fire({
            title: "Error no se encontro la identificación",
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });
        } else if (
          this.infoInstructorResponsable != "" &&
          this.convocatoria.entidad_capacitadora_id == "1"
        ) {
          this.registrarConvocatoria();
        } else {
          this.registrarConvocatoria();
        }
      }
    });
  }
  registrarConvocatoria() {
    this.estadoPeticionRegistrar = true;

    for (const perfil of this.lista_perfiles_requisitos) {
      this.convocatoria.perfiles_requisitos =
        this.convocatoria.perfiles_requisitos + perfil + ",";
    }
    for (const aprend of this.lista_aprendizaje) {
      this.convocatoria.resultado_aprendizaje =
        this.convocatoria.resultado_aprendizaje + aprend + ",";
    }
    for (const ofert of this.lista_oferta) {
      this.convocatoria.competencia_programa_oferta =
        this.convocatoria.competencia_programa_oferta + ofert + ",";
    }

    Axios()
      .post("/almacenar_convocatoria_pic", this.convocatoria)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          // this.estadoPeticionRegistrar = false;
          // this.registrarDirigidoA(506);
          Swal.fire({
            title: "Convocatoria Creada",
            text: "Se guardó la convocatoria exitosamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });

          this.$router.push({ name: "GestionarConvocatoriaENI" });
        } else {
          Swal.fire({
            title: "Error convocatoria no creada",
            text: respuesta.data.message,
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });
        }
      })
      .catch((err) => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
        Swal.fire({
          title: "Error de Servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-azul-sena",
          },
        });
        this.$router.push({ name: "GestionarConvocatoriaENI" });
      })
      .finally(() => {
        this.estadoPeticionRegistrar = false;
      });
  }

  obtenerOtro() {
    if (this.convocatoria.linea_tecnologica == "Otro") {
      this.otro = true;
    } else {
      this.otro = false;
    }
  }

  obtenerCapacitaciones() {
    Axios()
      .get("/crear_convocatoria_pic")
      .then((respuesta) => {
        this.lista_capacitaciones = respuesta.data.results.pics;
        this.modalidades = respuesta.data.results.modalidades;
      });
  }
  listarCapacitacionesTipoAnio() {
    Axios()
      .post("listar_capacitaciones_anio_tipo", {
        pic_tipo_id: this.convocatoria.id_pic_tipo,
        plan_institucional_id: this.convocatoria.plan_institucional_id,
      })
      .then((respuesta) => {
        this.lista_tipos_capacitaciones = respuesta.data.results;
      });
  }
  async listarTiposPics() {
    await Axios()
      .get("/crear_pic")
      .then((respuesta) => {
        this.picTipos = respuesta.data.results.picTipos;
      });
  }
  //obtener municipios inicio
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
  //obtener municipios fin

  //obtener departamentos inicio
  obtenerDepartamento(id_pais) {
    Axios()
      .get("listar_departamentos/" + id_pais)
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
  //obtener departamentos fin
  updated() {
    // if (this.convocatoria.id_pic_tipo == "1") {
    //   this.convocatoria.identificacion_responsable = "";
    //   this.infoInstructorResponsable = "";
    // }
  }
  constructor() {
    super();
    const dict = {
      messages: {
        required: () => "Campo obligatorio",
        date_format: () => "Campo obligatorio",
        decimal: () => "Campo obligatorio",
        min_value: () => "Valor no valido en este campo",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }
  ontenerPlanInstitucional() {
    Axios()
      .get("listar_plan_institucional")
      .then((respuesta) => {
        this.fechas_pic = respuesta.data.results;
      });
  }

  agregarEliminarRequisito(tipo, pos?) {
    if (tipo == "agregar") {
      this.lista_perfiles_requisitos.push(this.requisito);
      this.requisito = "";
    } else {
      this.lista_perfiles_requisitos.splice(pos, 1);
    }
  }

  agregarEliminarAprendizaje(tipo, pos?) {
    if (tipo == "agregar") {
      this.lista_aprendizaje.push(this.aprendizaje);
      this.aprendizaje = "";
    } else {
      this.lista_aprendizaje.splice(pos, 1);
    }
  }
  agregarEliminarOferta(tipo, pos?) {
    if (tipo == "agregar") {
      this.lista_oferta.push(this.oferta);
      this.oferta = "";
    } else {
      this.lista_oferta.splice(pos, 1);
    }
  }

  validarInstructorBuscado() {
    if (this.estadobusquedainstructor) {
      this.buscarInstructor();
      this.convocatoria.identificacion_responsable = "";
      this.estadobusquedainstructor = false;
    }
  }

  buscarInstructor() {
    if (this.convocatoria.identificacion_responsable != "") {
      Axios()
        .get("buscar_usuario/" + this.convocatoria.identificacion_responsable)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.infoInstructorResponsable =
              respuesta.data.results.identificacion +
              " - " +
              respuesta.data.results.nombres +
              " " +
              respuesta.data.results.apellidos;
            this.modalBuscarInstructor = false;
            this.estadobusquedainstructor = true;
            Swal.fire({
              title: "Instructor encontrado",
              text:
                "Instructor resposable escogido: " +
                respuesta.data.results.nombres +
                " " +
                respuesta.data.results.apellidos,
              icon: respuesta.data.status,
              confirmButtonText: "Aceptar",
              customClass: {
                confirmButton: "btn btn-azul-sena",
              },
            });
          } else {
            this.convocatoria.identificacion_responsable = "";
            this.infoInstructorResponsable = "";
            Swal.fire({
              title: "Instructor no encontrado",
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
    } else {
      //campo vacio
      Swal.fire({
        title: "Campo vacío",
        text: "Por favor ingresa una identificación",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "btn btn-azul-sena",
        },
      });
    }
  }
  obtenerLineaTecnologica() {
    Axios()
      .get("/listar_lineas_tecnologica")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listarLineaTecnologica = respuesta.data.results;
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
  registrarLineaTecnologica() {
    Axios()
      .post("almacenar_linea_tecnologica", this.lineaTecnologica)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Linea Tecnologica Guardada",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          //   this.estadoPeticion = false;
          this.$router.push({ name: "GestionarLineasTecnologicas" });
        } else {
          Swal.fire("ERROR!", "No Se Modifico La Linea Tecnologica", "error");
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
  obtenerEntidadCapacitadora() {
    Axios()
      .get("listar_entidad_capacitadora")
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.listarEntidadCapacitadora = respuesta.data.results;
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
  registrarEntidadCapacitadora() {
    Axios()
      .post("almacenar_entidad_capacitadora", this.entidadCapacitadora)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Entidad Capacitadora Guardada",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
          this.$router.push({ name: "GestionarEntidadCapacitadora" });
        } else {
          Swal.fire("ERROR!", "No Se Modifico La Linea Tecnologica", "error");
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>