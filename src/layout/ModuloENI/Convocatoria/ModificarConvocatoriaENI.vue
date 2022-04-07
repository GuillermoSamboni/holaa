<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div v-if="!estadoPeticionCargando">
        <div class="card-header">
          <h1 class="text-azul-sena">MODIFICAR CONVOCATORIA ENI</h1>
        </div>
        <div class="card-body"></div>
        <div class="text-center">
          <AnimacionCargando></AnimacionCargando>
        </div>
      </div>
      <div class="card" v-if="estadoPeticionCargando">
        <div class="card-header">
          <h1 class="text-azul-sena">MODIFICAR CONVOCATORIA ENI</h1>
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
                  >*</span
                >:
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
                <option value="" selected disabled>Seleccione modalidad</option>
                <option
                  v-for="(modalidad, index) in modalidades"
                  :key="index"
                  :value="modalidad.id_modalidad"
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
                <option value="" selected disabled>seleccione el año</option>
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

          <div>
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
                v-validate="{ required: true }"
                v-model="convocatoria.id_pic_tipo"
                name="tipo_pic"
                id="tipo_pic"
                class="form-control mb-3"
                @change="listarCapacitacionesTipoAnio()"
              >
                <option :value="convocatoria.tipo_pic" selected disabled>
                  {{ convocatoria.tipo_pic }}
                </option>
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

            <div>
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
                  v-validate="{ required: true }"
                  v-model="convocatoria.id_pic"
                  name="capacitacion"
                  id="capacitacion"
                  class="form-control mb-3"
                >
                  <option :value="convocatoria.id_pic" selected disabled>
                    {{ convocatoria.capacitacion }}
                  </option>
                  <template
                    v-for="(capacitacion, index) in lista_tipos_capacitaciones"
                  >
                    <option
                      v-if="
                        capacitacion.plan_institucional_id ==
                        convocatoria.plan_institucional_id
                      "
                      :value="capacitacion.id_pic"
                      :key="index"
                    >
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
            <div>
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
                  class="text-danger"
                  tooltip="Campo Requerido"
                  tooltip-flow="top"
                  >*
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
                class="text-danger"
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
                    placeholder="Instructor Responsable"
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
                              v-validate="{ min_value: 9999999 }"
                              placeholder="Identificación Instructor"
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
            <div
              class="row"
              v-if="
                convocatoria.nacional == 'n' ||
                (convocatoria.id_municipio != null &&
                  convocatoria.id_municipio != '')
              "
            >
              <div class="col-sm-12 col-md-12 col-lg-6 col-lg-6">
                <!-- seleccion de departamentos -->
                <div>
                  <label class="mt-2 font-weight-bold">
                    Departamento
                    <span
                      class="text-danger font-weigth-bold"
                      tooltip="Campo Requerido"
                      tooltip-flow="top"
                      >*</span
                    >:
                  </label>
                  <div class="input-group">
                    <select
                      v-model="convocatoria.id_departamento"
                      name="departamento"
                      id="departamento"
                      v-validate="{ required: true }"
                      class="form-control mb-3"
                      @change="obtenerMunicipio(convocatoria.id_departamento)"
                    >
                      <option :value="departamento_actual" selected disabled>
                        {{ convocatoria.departamento }}
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
                <div>
                  <label class="mt-2 font-weight-bold">
                    Selccione el municipio
                    <span
                      class="text-danger font-weigth-bold"
                      tooltip="Campo Requerido"
                      tooltip-flow="top"
                      >*</span
                    >:
                  </label>
                  <div class="input-group">
                    <select
                      v-validate="{ required: true }"
                      v-model="convocatoria.id_municipio"
                      name="area"
                      id="area"
                      class="form-control mb-3"
                    >
                      <option :value="convocatoria.municipio" selected disabled>
                        {{ convocatoria.municipio }}
                      </option>
                      <option
                        v-for="(municipio, index) in lista_municipios"
                        :value="municipio.id_municipio"
                        :key="index"
                      >
                        {{ municipio.municipio }}
                      </option>
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
            <div
              v-if="
                convocatoria.nacional == 'i' ||
                (convocatoria.lugar != '' && convocatoria.lugar != null)
              "
            >
              <label class="mt-2 font-weight-bold"
                >Lugar<span class="text-danger">*</span>:</label
              >
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

            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <label class="mt-2 font-weight-bold"
                  >Fecha Inicio Convocatoria<span class="text-danger">*</span
                  >:</label
                >
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
                <label class="mt-2 font-weight-bold"
                  >Fecha Fin Convocatoria<span class="text-danger">*</span
                  >:</label
                >
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
                <label class="mt-2 font-weight-bold"
                  >Fecha Inicio Capacitación<span class="text-danger">*</span
                  >:</label
                >
                <div>
                  <input
                    type="date"
                    class="form-control"
                    :min="convocatoria.plan_institucional_id + '-01-01'"
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
                <label class="mt-2 font-weight-bold"
                  >Fecha Fin Capacitación<span class="text-danger">*</span
                  >:</label
                >
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
              <label class="mt-2 font-weight-bold"
                >Requisitos<span class="text-danger">*</span>:</label
              >
              <div>
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
                      <th>Acciones</th>
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

            <!-- PENDIENTE POR AGREGAR, DEBE TENER SERVICIOS DEL BACK Y MAS INCONVENIENTES-->

            <!-- <div>
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
          </div> -->

            <!-- PENDIENTE POR AGREGAR, DEBE TENER SERVICIOS DEL BACK Y MAS INCONVENIENTES-->

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
                  placeholder="Financiacion "
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

            <!-- campos nuevos -->
            <div>
              <label class="mt-2 font-weight-bold"
                >Tipos Financiación<span class="text-danger">*</span>:</label
              >
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

            <!-- fin campo otro -->
            <!-- entidad capacitacion -->
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
                    Seleccione la línea Tecnologica
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

            <!-- <div>
            <label class="mt-2 font-weight-bold"
              >Línea Tecnologica<span class="text-danger">*</span>:</label
            >
            <div class="input-group">
              <select
                v-model="convocatoria.linea_tecnologica_id"
                v-validate="{ required: true }"
                id="linea_tec"
                name="linea_tec"
                class="form-control"
              >
                <option value="" selected disabled>
                  Seleccione la línea Tecnologica
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
              {{ errors.first('linea_tec') }}
            </small>
          </div> -->
            <!-- campo otro -->

            <!-- entidad capacitacion -->
            <!-- <div>
            <label class="mt-2 font-weight-bold">
              Entidad Capacitación
              <span
                class="text-danger font-weigth-bold"
                v-b-tooltip.hover.top
                title="Campo Requerido"
                >*</span
              >:
            </label>
            <div class="input-group">
              <input
                type="text"
                v-validate="{ required: true }"
                name="entidad_cap"
                class="form-control"
                id="entidad_cap"
                placeholder="Entidad Capacitación"
                v-model="convocatoria.entidad_capacitacion"
              />
            </div>
            <small v-show="errors.has('entidad_cap')" class="text-danger">
              {{ errors.first("entidad_cap") }}
            </small>
          </div> -->

            <!-- tabla aprendizaje -->
            <div>
              <label class="mt-2 font-weight-bold"
                >Resultado Aprendizaje<span class="text-danger">*</span>:</label
              >
              <div>
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
                      <th>Acciones</th>
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
              <label class="mt-2 font-weight-bold"
                >Competencias Programadas<span class="text-danger">*</span
                >:</label
              >
              <div>
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
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(oferta, index) in lista_oferta" :key="index">
                      <td>{{ oferta }}</td>
                      <td>
                        <a
                          class="btn btn-sm btn-azul-sena text-white"
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
                    - {{ archivo.name }} <br :key="index" />
                  </template>
                </p>
                <p v-else class="mt-3 mb-2 text-center">
                  Tipo de archivo (pdf)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center card-footer" v-if="estadoPeticionModificar">
          <AnimacionCargando></AnimacionCargando>
        </div>
        <div class="card-footer" v-if="!estadoPeticionModificar">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-sm-12 mt-1">
              <base-button
                type="azul-sena"
                @click="validarFormulario(), (errorRequisito = true)"
                class="btn btn-block bg-azul-sena text-white"
                >Modificar</base-button
              >
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

<script lang='ts'>
import Axios from "@/Axios";
import Swal from "sweetalert2";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import router from "@/router";
import AnimacionCargando from "@/components/animacionCargando.vue";
import Multiselect from "vue-multiselect";

@Component({
  components: {
    AnimacionCargando,
    Multiselect,
  },
})
export default class ModificarConvocatoriaENI extends Vue {
  estadoPeticionCargando = false;
  errorRequisito: any = false;
  docResolucon = null;
  docValido = false;
  estadoPeticion = false;
  infoInstructorResponsable = "";
  // variables para capacitacion nacional e internacional
  estadoPeticionModificar = false;
  tipo_inter_nacio = "";

  listarLineaTecnologica: any[] = [];
  listarEntidadCapacitadora: any[] = [];

  convocatoria = {
    convocatoria: "",
    fecha_inicio: "",
    fecha_final: "",
    lugar: "",
    perfiles_requisitos: "",
    financiacion: "",
    id_pic_convocatoria: "",
    para_funcionarios: "",
    pertenece_a_red: "SI", //dato quemado
    pic_id: "",
    plan_institucional_id: "",
    id_pic: "",
    pic_fase_id: 0,
    id_usuario_autenticado: JSON.parse(sessionStorage.getItem("usuario"))
      .id_usuario, //esta quemado, verificar
    nacional: "",
    id_departamento: "",
    id_municipio: "",
    municipio: "",
    id_pic_tipo: "",
    tipo_financiacion: "",
    linea_tecnologica: "",
    linea_tecnologica_id: "",
    entidad_capacitadora_id: "",
    entidad_capacitadora: "",
    resultado_aprendizaje: "",
    competencia_programa_oferta: "",
    tipo_pic: "",
    //nuevos
    fecha_fin_conv: "",
    fecha_inicio_conv: "",
    horas_capacitacion: "",
    identificacion_responsable: "",
    modalidad_id: "",
    tipos_funcionarios: [],
  };

  fechas_pic = [];

  otro = false;
  modalBuscarInstructor = false;
  estadobusquedainstructor = false;
  lista_capacitaciones: any[] = [];
  modalidades: any[] = [];

  requisito = "";
  aprendizaje = "";
  oferta = "";

  mostar_aprendizaje: any = false;
  mostar_oferta: any = false;

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

  async mounted() {
    await Axios()
      .get("/crear_convocatoria_pic")
      .then((respuesta) => {
        this.lista_capacitaciones = respuesta.data.results.pics;
        this.modalidades = respuesta.data.results.modalidades;
      });

    this.convocatoria.id_pic_convocatoria = this.$route.params.id;
    await this.listarTiposPics();

    await this.obtenerPic(this.convocatoria.id_pic_convocatoria);

    await this.ontenerPlanInstitucional();
    await this.obtenerDepartamento(57);
    await this.listarCapacitacionesTipoAnio();
    await this.obtenerLineaTecnologica();
    await this.obtenerEntidadCapacitadora();
    this.obtenerFuncionarios();
    this.obtenerMunicipio(this.convocatoria.id_departamento);
    // await this.buscarInstructor();
    this.estadoPeticionCargando = true;
  }
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
  obtenerOtro() {
    if (this.convocatoria.linea_tecnologica == "Otro") {
      this.otro = true;
    } else {
      this.otro = false;
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
            // Swal.fire({
            //   title: 'Instructor encontrado',
            //   text:
            //     'Instructor resposable escogido: ' +
            //     respuesta.data.results.nombres +
            //     ' ' +
            //     respuesta.data.results.apellidos,
            //   icon: respuesta.data.status,
            //   confirmButtonText: 'Aceptar',
            //   customClass: {
            //     confirmButton: 'btn btn-azul-sena',
            //   },
            // })
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
  updated() {
    //revisar muchas peticiones error 429
    // this.listarTiposPics();
    // if (this.convocatoria.id_pic_tipo == "1") {
    //   this.convocatoria.identificacion_responsable = "";
    //   this.infoInstructorResponsable = "";
    // }
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
          this.picTipos = respuesta.data.results.picTipos;          
        this.picTipos = respuesta.data.results.picTipos;
          this.picTipos = respuesta.data.results.picTipos;          
        this.picTipos = respuesta.data.results.picTipos;
          this.picTipos = respuesta.data.results.picTipos;          
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
        this.picTipos = respuesta.data.results.picTipos;
      });
  }

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

  async obtenerPic(id) {
    await Axios()
      .get("editar_convocatoria_pic/" + id)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.convocatoria = respuesta.data.results;
          if (this.convocatoria.entidad_capacitadora == "SENA") {
            this.buscarInstructor();
          }
          this.lista_perfiles_requisitos =
            this.convocatoria.perfiles_requisitos.split(",");
          this.lista_perfiles_requisitos.splice(
            this.lista_perfiles_requisitos.length - 1,
            1
          );

          this.lista_aprendizaje =
            this.convocatoria.resultado_aprendizaje.split(",");
          this.lista_aprendizaje.splice(this.lista_aprendizaje.length - 1, 1);

          this.lista_oferta =
            this.convocatoria.competencia_programa_oferta.split(",");
          this.lista_oferta.splice(this.lista_oferta.length - 1, 1);

          this.convocatoria.id_pic = respuesta.data.results.pic_id;

        } else {
          Swal.fire({
            title: respuesta.data.message,
          }).then(() => {
            this.$router.push("GestionarConvocatoriaENI");
          });
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
        min_value: () => "No pude ser negativo",
        // max: () => "La suma de los cupos no puede ser mayor a " + this.convocatoria.cupo_total,
        alpha_spaces: () => "No permite numeros ni caracteres especiales",
        alpha_num: () => "No permite caracteres especiales",
      },
    };
    this.$validator.localize("es", dict);
  }

  // anexos

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
  modificarPIC() {
    this.estadoPeticionModificar = true;
    this.convocatoria.perfiles_requisitos = "";
    this.convocatoria.resultado_aprendizaje = "";
    this.convocatoria.competencia_programa_oferta = "";

    for (const perfil of this.lista_perfiles_requisitos) {
      this.convocatoria.perfiles_requisitos =
        this.convocatoria.perfiles_requisitos + perfil + ",";
    }
    for (const perfil of this.lista_aprendizaje) {
      this.convocatoria.resultado_aprendizaje =
        this.convocatoria.resultado_aprendizaje + perfil + ",";
    }
    for (const perfil of this.lista_oferta) {
      this.convocatoria.competencia_programa_oferta =
        this.convocatoria.competencia_programa_oferta + perfil + ",";
    }
  
    // this.convocatoria.id_pic = this.convocatoria.pic_id; //el paso se realiza porque en el modificar no sabemos cual de las dos variables recoge el metodo
    Axios()
      .put(
        "actualizar_convocatoria_pic/" + this.convocatoria.id_pic_convocatoria,
        this.convocatoria
      )
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          Swal.fire({
            title: "Convocatoria Modificada",
            text: "Se modificó la convocatoria exitosamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });
          this.estadoPeticionModificar = true;
          this.$router.back();
        } else {
          Swal.fire({
            title: "Error no se pudo modificar",
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-azul-sena",
            },
          });
          this.$router.back();
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
        this.estadoPeticionModificar = false;
      });
  }
  validarFormulario() {
    this.$validator.validate().then((valid) => {
      if (
        valid &&
        this.lista_aprendizaje.length != 0 &&
        this.lista_perfiles_requisitos.length != 0 &&
        this.lista_oferta.length != 0
      ) {
        this.modificarPIC();
      }
    });
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
