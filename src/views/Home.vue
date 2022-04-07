<template>
  <div>
    <div class="capa">
      <div class="bg-image">
        <div class="container">
          <div class="margei">
            <h1 class="display-3">Dirección de Formación Profesional</h1>
            <hr class="my-4 col-2 col-md-2" />
            <div class="text-center">
              <p class="lead text-light">
                Le corresponde diseñar, administrar y orientar formación
                profesional integral a través de estrategias Programas de
                formación por componentencias, asegurando el acceso, pertinencia
                y calidad, y además funciones a que hace referencia el art. 11
                del Decreto 249 de 2004.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div name="home" class="d-flex justify-content-center flex-column bg-home">
      <!-- antiguo -->
      <!-- <div class="bga-primary2 py-2 borde-t-p2">
        <div
          class="
            col-10 col-sm-10 col-md-7 col-lg-6
            d-flex
            justify-content-between
            flex-wrap
            mx-auto
          "
        >
          <div class="col-12 col-sm-6 d-flex p-0">
            <router-link to="/bienestar-aprendiz" class="w-50 px-2"
              ><img src="../assets/inicio/bienestar-apren.svg" alt=""
            /></router-link>
            <router-link to="/servicios-egresados" class="w-50 px-2"
              ><img src="../assets/inicio/servicio-egre.svg" alt=""
            /></router-link>
          </div>
          <div class="col-12 col-sm-6 d-flex p-0 mt-3 mt-sm-0">
            <router-link to="/servicios-ENI" class="w-50 px-2"
              ><img src="../assets/inicio/escuela-nac-ins.svg" alt=""
            /></router-link>
            <a href="" class="w-50 px-2"
              ><img src="../assets/inicio/gestion-curr.svg" alt=""
            /></a>
          </div>
        </div>
        <div
          class="
            col-10 col-sm-10 col-md-7 col-lg-6
            d-flex
            justify-content-between
            flex-wrap
            mx-auto
            mt-4
          "
        >
          <div class="col-12 col-sm-6 d-flex p-0">
            <a href="" class="w-50 px-2"
              ><img src="../assets/inicio/ejecucion-form.svg" alt=""
            /></a>
            <a href="" class="w-50 px-2"
              ><img src="../assets/inicio/sennova.svg" alt=""
            /></a>
          </div>
          <div class="col-12 col-sm-6 d-flex p-0 mt-3 mt-sm-0">
            <a href="" class="w-50 px-2"
              ><img src="../assets/inicio/gestion-est-form.svg" alt=""
            /></a>
            <a href="" class="w-50 px-2"
              ><img src="../assets/inicio/administracion-edu.svg" alt=""
            /></a>
          </div>
        </div>
      </div> -->

      <!-- manuel -->
      <div class="bg-home py-6 borde-t-p2">
        <!-- sena -->

        <!-- 1fila -->
        <div
          class="
            col-10 col-sm-10 col-md-7 col-lg-6
            d-flex
            justify-content-between
            flex-wrap
            mx-auto
            mt-4
          "
        >
          <div class="col-12 col-sm-12 col-md-9 center d-flex p-0 mt-3 mt-sm-0">
            <router-link to="/bienestar-aprendiz" class="w-50 pr-5"
              ><img
                class="transaped"
                src="../assets/inicio/bienestar.svg"
                alt=""
            /></router-link>
            <router-link to="/servicios-egresados" class="w-50 pr-4 pl-4"
              ><img
                class="transaped"
                src="../assets/inicio/servicio-egre.svg"
                alt=""
            /></router-link>
            <router-link to="/servicios-ENI" class="w-50 pl-5"
              ><img class="transaped" src="../assets/inicio/eni.svg" alt=""
            /></router-link>
          </div>
        </div>
        <!-- 2fila -->
        <div
          class="
            col-10 col-sm-10 col-md-7 col-lg-6
            d-flex
            justify-content-between
            flex-wrap
            mx-auto
            mt-4
          "
        >
          <div class="col-12 col-sm-12 col-md-9 center d-flex p-0 mt-3 mt-sm-0">
            <router-link to="/gestion-curricular" class="w-50 pr-5"
              ><img
                class="transaped"
                src="../assets/inicio/gestion-curr.svg"
                alt=""
            /></router-link>
            <router-link to="/ejecucion-formacion" class="w-50 pr-4 pl-4"
              ><img
                class="transaped"
                src="../assets/inicio/ejecucion-form.svg"
                alt=""
            /></router-link>
            <router-link to="/sennova" class="w-50 pl-5"
              ><img class="transaped" src="../assets/inicio/sennova.svg" alt=""
            /></router-link>
          </div>
        </div>
        <!-- 3fila -->
        <div
          class="
            col-10 col-sm-10 col-md-7 col-lg-6
            d-flex
            justify-content-between
            flex-wrap
            mx-auto
            mt-4
          "
        >
          <div class="col-12 col-sm-12 col-md-9 center d-flex p-0 mt-3 mt-sm-0">
            <router-link to="/gestion-estrategica-formacion" class="w-50 pr-5"
              ><img
                class="transaped"
                src="../assets/inicio/gestion-est-form.svg"
                alt=""
            /></router-link>
            <router-link to="/AdministracionEducativa" class="w-50 pr-4 pl-4"
              ><img
                class="transaped"
                src="../assets/inicio/administracion-edu.svg"
                alt=""
            /></router-link>
            <a
              href="https://gambientedev.cloudsenactpi.net/"
              target="_blank"
              class="w-50 pl-5"
              ><img class="transaped" src="../assets/inicio/sigpa.svg" alt=""
            /></a>
          </div>
        </div>
        <!-- fin sena -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  constructor() {
    super();
  }
}
</script>
<style scoped>
.transaped {
  border-radius: 20px;
  background-color: #333;
}
/* .transaped:hover{
  background-color: #238276;
  transition: .4s ease;
} */

.transaped:hover {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  transition: 0.4s ease;
}
.transaped {
  overflow: hidden;
  transition: 0.4s ease;
}

.capa {
  background: url("https://cdn.forbes.co/2020/09/Sena-Guaviare-foto-Sena-scaled.jpg");
  background-size: 100vw 90vh;
  background-repeat: no-repeat;
}

.texto {
  width: 100%;
  height: 100vh;
  background-color: #333;
  opacity: 0.8;
  padding: 10rem 0;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 90vh;
  opacity: 0.8;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: #333;
}

.margei {
  margin-top: 10em;
}

h1 {
  font-size: 30px;
}
h2 {
  color: #fff;
  font-size: 20px;
}

hr {
  background: var(--naranja-sena) !important;
  padding: 2px 0;
}

.bg-home {
  background: #2d2d2d;
}
</style>
