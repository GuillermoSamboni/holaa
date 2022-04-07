<template>
  <base-nav
    class="navbar-top navbar-ligth"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <a class="text-azul-sena mouse-hover" @click="$router.back()">
      <i class="fas fa-arrow-left"></i>
    </a>
    <div class="nav justify-content-end">
      <div v-if="usuario.ruta_foto">
        <img class="imagen-nav" :src="fotoPerfil" alt="" />
      </div>

      <div v-if="!usuario.ruta_foto">
        <img
          class="imagen-nav"
          src="../assets/logosenanegro.png"
          alt=""
        />
      </div>

      <ul class="navbar-nav align-items-center">
        <li class="nav-item dropdown">
          <base-dropdown class="nav-link pr-0">
            <div class="media align-items-center" slot="title">
              <!-- <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
                  <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
                </span> -->
              <div
                class="
                  media-body
                  ml-2
                  d-none d-md-block
                  text-azul-sena
                  mouse-hover
                "
              >
                <span class="mb-0 text-sm font-weight-bold">
                  {{ getNombre() }}
                </span>
                <i class="ni ni-bold-down"></i>
              </div>
            </div>

            <template>
              <a @click="cerrarSesion()" class="dropdown-item">
                <i class="ni ni-user-run"></i>
                <span>Cerrar sesión</span>
              </a>
            </template>
          </base-dropdown>
        </li>
      </ul>
    </div>
  </base-nav>
</template>
<script>
import Axios from '@/Axios'
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      usuario: "",
      fotoPerfil: null,
    };
  },
  methods: {
    cerrarSesion() {
      sessionStorage.clear();
      this.$router.push({ name: "home" });
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    getNombre() {
      const user = JSON.parse(sessionStorage.getItem("usuario"));
      if (user) {
        return user.primer_nombre + " " + user.primer_apellido;
      } else {
        // this.$router.push("/login");
      }
      return "";
    },
    verFoto(id_usuario) {
      this.fotoPerfil =
        "https://develdfp.cloudsenactpi.net/api/ver_foto/" + id_usuario;
    },
    async obtenerUsuario(idUsuario) {
      await Axios()
        .get("listar_usuario/" + idUsuario)
        .then((respuesta) => {
          if (respuesta.data.status == "success") {
            this.usuario = respuesta.data.results;
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
    },
  },
  mounted() {
    this.verFoto(JSON.parse(sessionStorage.getItem("usuario")).id_usuario);
    this.obtenerUsuario(
      JSON.parse(sessionStorage.getItem("usuario")).id_usuario
    );
  },
};
</script>

<style>
.mouse-hover {
  cursor: pointer;
}
.imagen-nav {
  width: 30px;
  height: 30px;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 100%;
  display: inline-block;
  border: 2px solid #dee2e6;
}
</style>
