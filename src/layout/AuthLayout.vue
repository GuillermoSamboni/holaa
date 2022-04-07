<template>
  <div class="main-content bg-white">
    <!-- Navbar -->
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-oscuro-sena d-flex barra py-2"
    >
      <a class="navbar-brand col-1 p-1 m-0" href="">
        <img
          src="../assets/logosenablanco.png"
          alt=""
          style="max-width: 50px;"
        />
      </a>
      <nav class="navbar d-none d-lg-flex p-0 col-4 col-md-8 mr-3">
        <div
          class="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          <ul
            class="my-2 p-0 d-flex justify-content-between w-100 mt-2"
            style="list-style: none;"
          >
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700" href="">Inicio</a>
            </li>
            <li class="mt-2 mx-2">
              <!-- <a
                class="text-white font-weight-700"
                href="../assets/descargas/Poliza.pdf"
                download
                >Seguro Estudiantil</a
              > -->
              <a class="text-white font-weight-700" @click="mostrarPoliza()">
                Seguro Estudiantil
              </a>
            </li>
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700" href="">Metodología</a>
            </li>
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700" href="">Manual</a>
            </li>
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700" href="">Acerca de</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="d-lg-none">
        <base-dropdown>
          <base-button slot="title" type="" class="dropdown-toggle-no-caret">
            <i class="fas fa-bars text-white icono-completo"></i>
          </base-button>
          <a class="dropdown-item" href="">Inicio</a>
          <a class="dropdown-item" @click="mostrarPoliza()">
            Seguro Estudiantil
          </a>
          <a class="dropdown-item" href="">Metodologia</a>
          <a class="dropdown-item" href="">Manual</a>
          <a class="dropdown-item" href="">Acerca de</a>
        </base-dropdown>
      </div>
    </nav>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-azul-sena" id="exampleModalLabel">
              Seguro Estudiantil
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <embed
              src="../assets/descargas/Poliza.pdf#toolbar=0&navpanes=0&scrollbar=0"
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-azul-sena"
              data-dismiss="modal"
            >
              cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="header bg-azul-sena py-7 py-lg-8">
      <!-- Header  <div class="container">
        <div class="header-body text-center mb-4">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6 d-none d-md-block">
              <h1 class="text-white">Bienvenido</h1>
            </div>
          </div>
        </div>
      </div> -->
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon> -->
        </svg>
      </div>
    </div>
    <!-- Page content -->

    <div class="container mt--8 pb-2">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-6">
          <div class="row">
            <div class="col-md-6 offset-3 d-none d-md-block">
              <!-- <div class="col-sm-4 col-md-6  offset-sm-4 offset-md-0 offset-md-3 "> -->
              <img
                src="../assets/logoSena.png"
                class="img-fluid transparent-10"
                style="border-radius: 15px;"
                alt=""
              />
            </div>
          </div>
          <!-- aqui va a ir contenido(imagen) -->
          <h1 class="text-center text-azul-sena texto-login d-none d-md-block">
            Bienvenido al Sistema de Dirección de Formación Profesional Sena
          </h1>
          <h1 class="text-center text-white texto-login d-md-none d-sm-block">
            Bienvenido al Sistema de Dirección de Formación Profesional Sena
          </h1>
        </div>

        <slide-y-up-transition mode="out-in" origin="center top">
          <router-view></router-view>
        </slide-y-up-transition>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <modal
          :show.sync="modalPoliza"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm modal-lg"
        >
          <template slot="header">
            <h1 class="text-azul-sena modal-title" id="modalInscribirAprendiz">
              Seguro Estudiantil
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
              <div class="row justify-content-center">
                <div class="text-center">
                  <p>
                    Id entificación:
                    <strong class="font-weight-bold">899999034-1</strong>
                  </p>
                  <p>
                    Póliza No:
                    <strong class="font-weight-bold">
                      990-2 - 994000000001
                    </strong>
                  </p>
                </div>
                <embed
                  src="/descargas/Poliza.pdf"
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
    <FooterPer></FooterPer>
  </div>
</template>
<script>
import { SlideYUpTransition } from 'vue2-transitions'
import FooterPer from '../components/FooterPer'
export default {
  name: 'auth-layout',
  components: {
    SlideYUpTransition,
    FooterPer,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false,
      modalPoliza: false,
    }
  },
  methods: {
    mostrarPoliza() {
      this.modalPoliza = true
    },
  },
}
</script>
<style>
footer div a i {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .texto-login {
    color: white !important;
  }
}

@media (min-width: 991px) {
  .barra {
    -webkit-box-pack: center !important;
    justify-content: center !important;
  }
}
</style>
