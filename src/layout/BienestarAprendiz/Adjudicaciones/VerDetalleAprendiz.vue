<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">
          Detalle aprendiz (Pendiente servicio web)
        </h1>
      </div>
      <div class="card-body">
        <div class="col-lg-8 col-sm-12 center row">
          <div class="col-lg-6 col-sm-12 py-2">
            <label class="mt-2 font-weight-bold"
              >Cédula Aprendiz <span class="text-danger">*</span>:</label
            >
            <div>
              <!-- {{ aprendiz }} -->
              <input
                v-model="aprendiz.identificacion"
                type="number"
                class="form-control"
                placeholder="Nueva cédula"
                name="cedula"
                id="cedula"
                required
                v-validate="'required'"
                disabled
              />
              <small v-show="errors.has('cedula')" class="text-danger">{{
                errors.first("cedula")
              }}</small>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 py-2">
            <label class="mt-2 font-weight-bold"
              >Nombre Completo <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                v-model="aprendiz.primer_nombre"
                type="text"
                class="form-control"
                placeholder="Nombre"
                name="primer_nombre"
                :id="primer_nombre"
                required
                v-validate="'required'"
                disabled
              />
              <small v-show="errors.has('primer_nombre')" class="text-danger">{{
                errors.first("primer_nombre")
              }}</small>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 py-2">
            <label class="mt-2 font-weight-bold"
              >Ficha <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                v-model="aprendiz.id_ficha_caracterizacion"
                type="number"
                class="form-control"
                placeholder="Ficha caracterización"
                name="cedula"
                id="cedula"
                required
                v-validate="'required'"
                disabled
              />
              <small v-show="errors.has('cedula')" class="text-danger">{{
                errors.first("cedula")
              }}</small>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 py-2">
            <label class="mt-2 font-weight-bold"
              >Cédula Aprendiz <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                v-model="aprendiz.identificacion"
                type="number"
                class="form-control"
                placeholder="Nueva cédula"
                name="cedula"
                id="cedula"
                required
                v-validate="'required'"
                disabled
              />
              <small v-show="errors.has('cedula')" class="text-danger">{{
                errors.first("cedula")
              }}</small>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 py-2">
            <label class="mt-2 font-weight-bold"
              >Cédula Aprendiz <span class="text-danger">*</span>:</label
            >
            <div>
              <input
                v-model="aprendiz.identificacion"
                type="number"
                class="form-control"
                placeholder="Nueva cédula"
                name="cedula"
                id="cedula"
                required
                v-validate="'required'"
                disabled
              />
              <small v-show="errors.has('cedula')" class="text-danger">{{
                errors.first("cedula")
              }}</small>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table table-hover table-inverse">
              <thead class="text-white">
                <tr>
                  <th>Id</th>
                  <th>Criterio</th>
                  <th>Puntaje</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(criterio, key) in aprendiz.criterios" :key="key">
                  <td>{{ criterio.id_criterio_priorizacion }}</td>
                  <td>{{ criterio.criterio_priorizacion }}</td>
                  <td>{{ criterio.puntaje }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Volver lista de Aprendices inscritos -->
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-sm-12 mt-1">
            <router-link
              class="btn btn-block bg-azul-sena text-white"
              :to="{
                name: 'Inscribir',
                params: {
                  id: 48,
                },
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


<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class VerDetalleAprendiz extends Vue {
  aprendiz = {
    id_persona: 7919709,
    identificacion: "71779825",
    primer_nombre: "JUAN",
    segundo_nombre: "CARLOS",
    primer_apellido: "MISAS",
    segundo_apellido: "AGUIAR",
    id_ficha_caracterizacion: 1140205,
    id_programa_formacion: 17,
    programa_formacion: "PANADERÍA",
    criterios: [
      {
        id_criterio_priorizacion: 1,
        criterio_priorizacion: "SISBEN 1",
        puntaje: 15,
      },
      {
        id_criterio_priorizacion: 2,
        criterio_priorizacion: "Madre cabeza de familia",
        puntaje: 15,
      },
      {
        id_criterio_priorizacion: 3,
        criterio_priorizacion: "Victima del conflicto Armado",
        puntaje: 10,
      },
    ],
  };

  mounted() {
  }
}
</script>

<style>
</style>