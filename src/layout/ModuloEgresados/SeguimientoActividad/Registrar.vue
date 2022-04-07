<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">SEGUIMIENTO DE ACTIVIDAD:</h1>
      </div>

      <div class="d-flex justify-content-around mt-3">
        <h3 class="circulo circulo-selecionado">1</h3>
        <h3
          class="circulo"
          :class="{ 'circulo-selecionado': paginaFormulario > 0 }"
        >
          2
        </h3>
        <!-- <h3
          class="circulo"
          :class="{ 'circulo-selecionado': paginaFormulario == 2 }"
        >
          3
        </h3> -->
      </div>
      <!-- //pruebas -->
      <div class="card-body">
        <div class="col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1">
          <template v-if="paginaFormulario == 0">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <div>
                  <strong
                    >Descripción del seguimiento<span class="text-danger"
                      >*</span
                    >:</strong
                  >
                </div>
                <div id="contenido">
                  <div id="texto">
                    <textarea
                      class="form-control mb-2"
                      v-model="gestion_actividad"
                      name="gestion_actividad"
                      id="gestion_actividad"
                      v-validate="'required: true'"
                    ></textarea>
                    <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <div>
                  <strong>Evidencia<span class="text-danger">*</span>:</strong>
                </div>
                <div id="contenido">
                  <div id="texto">
                    <input
                      type="text"
                      v-validate="'required'"
                      name="evidencia"
                      id="evidencia"
                      v-model="evidencia"
                      placeholder="ingrese el nombre de la evidencia"
                      class="form-control mb-3"
                    />
                    <small v-show="errors.has('evidencia')" class="text-danger"
                      >{{ errors.first("evidencia") }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <div>
                  <strong
                    >Fecha Programada para la ejecución de la actividad:</strong
                  >
                </div>
                <div id="contenido">
                  <p id="texto">
                    {{ fechaProgramacion }}
                  </p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-5 col-md-6 col-sm-6 mt-1">
                <input
                  type="file"
                  v-validate="'required'"
                  name="cargar_archivo"
                  id="cargar_archivo"
                  class="cargar-archivo d-none"
                  @change="obtenerDocumento($event)"
                  accept="application/pdf"
                />
                <label class="btn btn-azul-sena" for="cargar_archivo"
                  >cargar evidencia</label
                >
                <small v-show="errors.has('cargar_archivo')" class="text-danger"
                  >{{ errors.first("cargar_archivo") }}
                </small>
              </div>

              <div class="col-lg-7 col-md-6 col-sm-12 mt-2">
                <base-button
                  v-b-tooltip.hover.top
                  title="Ver Evidencia"
                  type="azul-sena"
                  @click="mirarModal()"
                  class="btn ver-evidencia btn-block bg-azul-sena text-white"
                  ><i class="fas fa-eye"></i
                ></base-button>
              </div>
            </div>

            <div class="row"></div>

            <!-- modal  -->

            <div class="container" id="modal">
              <modal
                :show.sync="verModal"
                body-classes="p-0"
                modal-classes="justify-content-center modal-dialog-centered modal-sm-12  "
              >
                <template slot="header">
                  <h2
                    class="text-azul-sena modal-title"
                    id="modalNovedadesAprendiz"
                  >
                    EVIDENCIA
                  </h2>
                </template>
                <card
                  type="white"
                  shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0"
                >
                  <template class="row">
                    <div v-if="docVista != null">
                      <embed
                        :src="docVista"
                        type="application/pdf"
                        width="100%"
                        height="450px"
                      />
                    </div>
                    <p v-else>no hay evidencia cargada</p>
                  </template>
                </card>
              </modal>
            </div>
          </template>
          <!-- modal finnnnnnnnnn -->
          <template v-if="paginaFormulario == 1">
            <!-- Espacio de nuevos campos -->
            <div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Niños, niñas - adolescentes<span class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="nino_nina_adolecente"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Jóvenes<span class="text-danger">*</span>:</strong>
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="jovenes"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Adulto mayor<span class="text-danger">*</span>:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="adulto_mayor"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Adolescente en conflicto con la ley penal<span
                        class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="adolescente_conflicto_ley_penal"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Víctimas de conflicto armado<span class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="victima_conflicto_armado"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Adolescente trabajador<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="adolescente_trabajador"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Cabeza de familia<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="cabeza_familia"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Víctimas desplazamiento natural<span class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="victima_desplazamiento_natural"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Reincorporados y Excombatientes<span class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="reincorporado_excombatiente"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Personas privadas de la libertad<span class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="persona_privada_libertad"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Fuerzas Militares y la Policía Nacional<span
                        class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="fuerza_militar_policia_nacional"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Soldados campesinos<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="soldado_campesino"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Indígena<span class="text-danger">*</span>:</strong>
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="indigena"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Gitano<span class="text-danger">*</span>:</strong>
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="gitano"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Raizal del Archipiélago de San Andrés, Providencia y
                      Santa Catalina<span class="text-danger">*</span>:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="raizal_san_andres"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Palenquero(a) de San Basilio o descendiente<span
                        class="text-danger"
                        >*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="palenquero_descendiente"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Negro(a)<span class="text-danger">*</span>:</strong>
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="negro"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Mulato(a)<span class="text-danger">*</span>:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="mulato"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Afrocolombiano(a)<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="afrocolombiano"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Afrodescendiente<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="afrodescendiente"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Discapacidad física<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="dis_fisica"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Discapacidad auditiva<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="dis_auditiva"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Discapacidad visual<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="dis_visual"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Sordoceguera<span class="text-danger">*</span>:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="sordoceguera"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Discapacidad intelectual<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="dis_intelectual"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Discapacidad psicosocial<span class="text-danger">*</span
                      >:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="dis_psicosocial"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong
                      >Discapacidad múltiple (física, sensorial, mental,
                      intelectual)<span class="text-danger">*</span>:</strong
                    >
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="dis_multiple"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div>
                    <strong>Otros<span class="text-danger">*</span>:</strong>
                  </div>
                  <div id="contenido">
                    <div id="texto">
                      <input
                        type="number"
                        v-model="otros"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- fin Espacio de nuevos campos -->
          </template>
          <!-- <template v-if="paginaFormulario == 2"> -->
            <!-- eje1 -->
            <!-- <h1>eje 1</h1>
            <div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold"
                      >NÚMERO DE EGRESADOS QUE HAN PARTICIPADO EN ACTIVIDADES
                      CON IES<span class="text-danger">*</span>:</label
                    >
                    <div>
                      <input
                        type="number"
                        v-model="n_egresados_ies"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      /> -->
                      <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                    <!-- </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold"
                      >NÚMERO DE EGRESADOS QUE HAN CONTINUADO SU CADENA DE
                      FORMACIÓN<span class="text-danger">*</span>:</label
                    >
                    <div>
                      <input
                        type="number"
                        v-model="n_egresados_formacion"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      /> -->
                      <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                    <!-- </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold"
                      >NÚMERO DE EGRESADOS QUE HAN PARTICIPADO EN CONFERENCIAS Y
                      TALLERES DE DIFERENTES TEMAS.<span class="text-danger"
                        >*</span
                      >:</label
                    >
                    <div>
                      <input
                        type="number"
                        v-model="n_egresados_temas"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      /> -->
                      <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                    <!-- </div>
                  </div>
                </div>
              </div>
            </div> -->
            <!-- eje2 -->
            <!-- <h1>eje 2</h1>
            <div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold">
                      NÚMERO DE EGRESADOS QUE HAN PARTICIPADO EN VACANTES CON LA
                      APE (MICRORUEDAS)<span class="text-danger">*</span
                      >:</label
                    >
                    <div>
                      <input
                        type="number"
                        v-model="n_egresados_ape"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      /> -->
                      <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                    <!-- </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold"
                      >NÚMERO DE EGRESADOS QUE HAN ACTUALIZADO SU HV DE VIDA EN
                      LA APE <span class="text-danger">*</span>:</label
                    >
                    <div>
                      <input
                        type="number"
                        v-model="n_egresados_hv"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      /> -->
                      <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                    <!-- </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold">
                      NÚMERO DE EGRESADOS QUE HAN PARTICIPADO EN ACTIVIDADES -
                      MICRORUEDAS<span class="text-danger">*</span>:</label
                    >
                    <div>
                      <input
                        type="number"
                        v-model="n_egresados_actividades"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      /> -->
                      <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                    <!-- </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                  <div id="campo">
                    <label class="mt-2 font-weight-bold"
                      >NÚMERO DE EGRESADOS QUE HAN PARTICIPADO EN TALLERES,
                      SECCIONES RELACIONADAS CON HABILIDADES PARA EL MUNDO
                      LABORAL<span class="text-danger">*</span>:</label
                    >
                    <div>
                      <input
                        type="number"
                        v-model="n_egresados_mundo_laboral"
                        placeholder="ingrese el"
                        class="form-control mb-3"
                      /> -->
                      <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                    <!-- </div>
                  </div>
                </div>
              </div>
            </div> -->
            <!-- eje3 -->
            <!-- <h1>eje 3</h1>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div id="campo">
                  <label class="mt-2 font-weight-bold"
                    >NÚMERO DE EGRESADOS QUE HAN PARTICIPADO EN LAS SESIONES DE
                    EMPRENDIMIENTO <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="number"
                      v-model="n_egresados_emprendimiento"
                      placeholder="ingrese el"
                      class="form-control mb-3"
                    /> -->
                    <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                  <!-- </div>
                </div>
              </div>
            </div> -->
            <!-- eje5 -->
            <!-- <h1>eje 5</h1>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div id="campo">
                  <label class="mt-2 font-weight-bold"
                    >NÚMERO DE EGRESADOS QUE HAN PARTICIPADO EN ENCUENTROS
                    REGIONALES <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="number"
                      v-model="n_egresados_regionales"
                      placeholder="ingrese el"
                      class="form-control mb-3"
                    /> -->
                    <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                  <!-- </div>
                </div>
              </div>
            </div> -->
            <!-- eje6 -->
            <!-- <h1>eje 6</h1>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div id="campo">
                  <label class="mt-2 font-weight-bold"
                    >NÚMERO DE EGRESADOS QUE HAN ACTUALIZADOS SUS DATOS
                    <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="number"
                      v-model="n_egresados_datos"
                      placeholder="ingrese el"
                      class="form-control mb-3"
                    /> -->
                    <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                  <!-- </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div id="campo">
                  <label class="mt-2 font-weight-bold"
                    >NÚMERO DE EGRESADOS QUE PARTICIPARON EN LA ENCUESTA
                    <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="number"
                      v-model="n_egresados_encuesta"
                      placeholder="ingrese el"
                      class="form-control mb-3"
                    /> -->
                    <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                  <!-- </div>
                </div>
              </div>
            </div> -->
            <!-- eje7 -->
            <!-- <h1>eje 7</h1>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div id="campo">
                  <label class="mt-2 font-weight-bold"
                    >NÚMERO DE EGRESADOS QUE HAN RECIBIDO COMUNICACIONES SOBRE
                    LOS SERVICIOS DE EGRESADOS
                    <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="number"
                      v-model="n_egresados_comunicaciones"
                      placeholder="ingrese el"
                      class="form-control mb-3"
                    /> -->
                    <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                  <!-- </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-6">
                <div id="campo">
                  <label class="mt-2 font-weight-bold"
                    >NÚMERO DE EGRESADOS A LOS QUE SE LES HA ORIENTADO EN
                    INQUIETUDES. <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="number"
                      v-model="n_egresados_inquietudes"
                      placeholder="ingrese el"
                      class="form-control mb-3"
                    /> -->
                    <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                  <!-- </div>
                </div>
              </div>
            </div> -->
            <!-- ???? -->
            <!-- <h1>eje desconocido</h1>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div id="campo">
                  <label class="mt-2 font-weight-bold"
                    >NÚMERO DE EGRESADOS ATENDIDOS, QUE SE ENCUENTREN
                    CARACTERIZADOS DENTRO DE LA POLÍTICA DE ATENCIÓN CON ENFOQUE
                    PLURALISTA Y DIFERENCIAL EN EL SENA
                    <span class="text-danger">*</span>:</label
                  >
                  <div>
                    <input
                      type="number"
                      v-model="n_egresados_enfoque"
                      placeholder="ingrese el"
                      class="form-control mb-3"
                    /> -->
                    <!-- <small
                      v-show="errors.has('gestion_actividad')"
                      class="text-danger"
                      >{{ errors.first("gestion_actividad") }}
                    </small> -->
                  <!-- </div>
                </div>
              </div>
            </div>
          </template> -->
        </div>
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
          <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario != 1">
            <button
              @click="validarFormularioPantalla()"
              class="btn btn-azul-sena w-100"
            >
              Siguiente
            </button>
          </div>
          <div class="col-lg-4 col-sm-12 mt-1" v-if="paginaFormulario == 1">
            <button
              class="btn btn-azul-sena w-100"
              @click.prevent="validarFormulario()"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from "@/Axios";
  import Swal from "sweetalert2";
  import AnimacionGuardando from "@/components/animacionGuardando.vue";
  export default {
    components: {
      AnimacionGuardando
    },
    mounted() {
      this.id_actividad = this.$route.params.actividad_id; //id de la actividad
      this.actividad = this.$route.params.nombreActividad; //nombre de la actividad
      this.fechaProgramacion = this.$route.params.fechaFinal; //fecha final de la actividad
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
          alpha_num: () => "No permite caracteres especiales"
        }
      };
      this.$validator.localize("es", dict);
    },
    data: function() {
      return {
        paginaFormulario: 0,
        id_actividad: "",
        actividad: "",
        fechaProgramacion: "",
        gestion_actividad: "",
        docResolucon: "",
        evidencia: "",
        docVista: null,
        verModal: false,
        animacionGuardando: false,
        // enfoque
        nino_nina_adolecente: 0,
        jovenes: 0,
        adulto_mayor: 0,
        adolescente_conflicto_ley_penal: 0,
        victima_conflicto_armado: 0,
        adolescente_trabajador: 0,
        cabeza_familia: 0,
        victima_desplazamiento_natural: 0,
        reincorporado_excombatiente: 0,
        persona_privada_libertad: 0,
        fuerza_militar_policia_nacional: 0,
        soldado_campesino: 0,
        indigena: 0,
        gitano: 0,
        raizal_san_andres: 0,
        palenquero_descendiente: 0,
        negro: 0,
        mulato: 0,
        afrocolombiano: 0,
        afrodescendiente: 0,
        dis_fisica: 0,
        dis_auditiva: 0,
        dis_visual: 0,
        sordoceguera: 0,
        dis_intelectual: 0,
        dis_psicosocial: 0,
        dis_multiple: 0,
        otros: 0,
        // relacion con los ejes
        // eje1
        n_egresados_ies: 0,
        n_egresados_formacion: 0,
        n_egresados_temas: 0,

        // eje2
        n_egresados_ape: 0,
        n_egresados_hv: 0,
        n_egresados_actividades: 0,
        n_egresados_mundo_laboral: 0,

        // eje3
        n_egresados_emprendimiento: 0,

        // eje5
        n_egresados_regionales: 0,

        // eje6
        n_egresados_datos: 0,
        n_egresados_encuesta: 0,

        // eje7
        n_egresados_comunicaciones: 0,
        n_egresados_inquietudes: 0,

        // eje ??
        n_egresados_enfoque: 0
      };
    },
    methods: {
      vistaPreviaEvidencia() {
        if (this.docResolucon != "") {
          this.docVista = URL.createObjectURL(this.docResolucon);
        }
      },

      validarFormulario() {
        this.$validator.validate().then(valid => {
          if (valid) {
            this.almacenarSeguimiento();
            this.animacionGuardando = true;
          }
        });
      },

      obtenerDocumento(event) {
        let newFileList = Array.from(event);
        if (event.target.files[0].size <= 2000000) {
          //5mb tope
          let extDoc = event.target.files[0].name
            .toString()
            .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
          if (extDoc == ".pdf") {

            this.docResolucon = event.target.files[0];
            this.docVista = null;

            Swal.fire("Pdf Cargado!", "Archivo cargado exitosamente!", "success");

            this.docValido = true;
            // this.docResolucon = null;
          } else {
            this.docValido = false;
            this.docResolucon = null;
            Swal.fire(
              "Algo salió mal!",
              "El archivo cargado no es un PDF!",
              "error"
            );
          }
        } else {
          this.docValido = false;
          this.docResolucon = null;
          Swal.fire(
            "Algo salió mal!",
            "El archivo cargado pesa más de 2 MegaBytes!",
            "error"
          );
        }
      },
      mirarModal() {
        this.verModal = true;
        this.vistaPreviaEvidencia();
      },
      moverPantalla() {
        window.scrollTo(0, 0);
      },
      validarFormularioPantalla() {
        if (this.docResolucon == ""  || this.gestion_actividad== "" || this.evidencia== "") {
         Swal.fire({
                title: "Descripción del seguimiento, Evidencia y docuento vacios",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276"
              });
        }else{
          this.moverPantalla();
          this.paginaFormulario += 1;
        }
      },

      almacenarSeguimiento() {
        const headers = {
          "Content-Type": "multipart/form-data"
        };
        //Creamos el formData
        var data = new FormData();

        data.append("documento", this.docResolucon);
        data.append("gestion_actividad", this.gestion_actividad);
        data.append("evidencia", this.evidencia);

        // enfoque
        data.append("nino_nina_adolecente", this.nino_nina_adolecente);
        data.append("jovenes", this.jovenes);
        data.append("adulto_mayor", this.adulto_mayor);
        data.append(
          "adolescente_conflicto_ley_penal",
          this.adolescente_conflicto_ley_penal
        );
        data.append("victima_conflicto_armado", this.victima_conflicto_armado);
        data.append("adolescente_trabajador", this.adolescente_trabajador);
        data.append("cabeza_familia", this.cabeza_familia);
        data.append(
          "victima_desplazamiento_natural",
          this.victima_desplazamiento_natural
        );
        data.append(
          "reincorporado_excombatiente",
          this.reincorporado_excombatiente
        );
        data.append("persona_privada_libertad", this.persona_privada_libertad);
        data.append(
          "fuerza_militar_policia_nacional",
          this.fuerza_militar_policia_nacional
        );
        data.append("soldado_campesino", this.soldado_campesino);
        data.append("palenquero_descendiente", this.palenquero_descendiente);

        data.append("indigena", this.indigena);
        data.append("gitano", this.gitano);
        data.append("raizal_san_andres", this.raizal_san_andres);
        data.append("negro", this.negro);
        data.append("mulato", this.mulato);
        data.append("afrocolombiano", this.afrocolombiano);
        data.append("afrodescendiente", this.afrodescendiente);

        data.append("dis_fisica", this.dis_fisica);
        data.append("dis_auditiva", this.dis_auditiva);
        data.append("dis_visual", this.dis_visual);
        data.append("sordoceguera", this.sordoceguera);
        data.append("dis_intelectual", this.dis_intelectual);
        data.append("dis_psicosocial", this.dis_psicosocial);
        data.append("dis_multiple", this.dis_multiple);
        data.append("otros", this.otros);
        Axios()
          .post("almacenar_seguimiento_actividad/" + this.id_actividad, data, {
            headers: headers
          })
          .then(respuesta => {
            if ((respuesta.data.status = "success")) {
              Swal.fire({
                title: "Seguimiento Registrado",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276"
              });
              this.$router.push("GestionarActividadCentro");
            } else {
              Swal.fire({
                title: "Seguimiento No Registrado",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#238276"
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
  };
</script>

<style scoped>
  .ver-evidencia {
    display: flex;
    width: 60px;
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
</style>
