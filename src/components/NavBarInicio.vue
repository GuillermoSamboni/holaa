<template>
  <div id="nav">
    <nav
      class="
        navbar navbar-expand-lg navbar-dark
        bg-oscuro-sena
        d-flex
        barra
        py-2
      "
    >
      <a class="navbar-brand col-1 p-1 m-0" href="#">
        <img
          src="../assets/logosenablanco.png"
          alt=""
          style="max-width: 50px"
        />
      </a>
      <nav class="navbar d-none d-lg-flex p-0 col-4 col-md-8">
        <div
          class="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          <ul
            class="my-2 p-0 d-flex justify-content-between w-100 mt-2"
            style="list-style: none"
          >
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700" href="">Inicio</a>
            </li>
            <li class="mt-2 mx-2">
              <!-- <a class="text-white font-weight-700" href="../assets/descargas/Poliza.pdf" download>Seguro Estudiantil</a> -->
              <a class="text-white font-weight-700" @click="mostrarPoliza()"
                >Seguro Estudiantil</a
              >
            </li>
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700">Metodologia</a>
            </li>
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700" href="">Manual</a>
            </li>
            <li class="mt-2 mx-2">
              <a class="text-white font-weight-700" href="">Acerca de</a>
            </li>
            <li class="nav-item mr-4">
              <a class="nav-link p-0 d-inline">
                <div
                  class="btn-group btn-spc"
                  tooltip="Inicio sesión"
                  tooltip-flow="right"
                >
                  <router-link to="/login">
                    <i
                      class="fas fa-user text-white"
                      style="font-size: 35px; color: #ed7d31 !important"
                    ></i>
                  </router-link>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="d-lg-none">
        <base-dropdown>
          <base-button
            slot="title"
            type=""
            class="dropdown-toggle-no-caret icon-hamburguer"
          >
            <i class="fas fa-bars text-white icono-completo"></i>
          </base-button>
          <a class="dropdown-item" href="">Inicio</a>
          <a class="dropdown-item" @click="mostrarPoliza()">
            Seguro Estudiantil</a
          >
          <a class="dropdown-item" href="">Metodologia</a>
          <a class="dropdown-item" href="">Manual</a>
          <a class="dropdown-item" href="">Acerca de</a>
          <router-link to="/login" class="dropdown-item">
            Iniciar Sesion
          </router-link>
        </base-dropdown>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-12">
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
                    <strong class="font-weight-bold"
                      >990-2 - 994000000001</strong
                    >
                  </p>
                </div>
                <embed
                  src="/descargas/Poliza.pdf"
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
                <!-- <iframe
                  src="/descargas/Poliza.pdf"
                  style="width: 600px; height: 800px"
                  frameborder="0"
                ></iframe> -->
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

@Component
export default class NavBarInicio extends Vue {
  modalPoliza = false;

  mostrarPoliza() {
    this.modalPoliza = true;
  }
}
</script>

<style>
.icono-completo {
  font-size: 25px;
}
.iconoHome {
  color: orange;
}

@media (min-width: 991px) {
  .barra {
    -webkit-box-pack: center !important;
    justify-content: center !important;
  }
}
</style>