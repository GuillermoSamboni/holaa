<template>
  <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidenav-main">
    <div class="container-fluid">
      <!--Toggler
      <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>-->
      <router-link to="dashboard" class="justify-content-center d-flex col-3 col-md-10">
          <img src="../../assets/logosenablanco.png" class="w-50">
      </router-link>
      <!-- <slot name="mobile-left">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="left">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg"/>
                </span>
              </div>
            </a>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/login" class="dropdown-item">
                <i class="ni ni-user-run"></i>
                <span>Cerrar sesión</span>
            </router-link>
          </base-dropdown>
        </ul>
      </slot>-->
      <navbar-toggle-button @click.native="showSidebar">
        <i class="fas fa-bars text-white"></i>
      </navbar-toggle-button>
      <slot></slot>
      <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show " id="sidenav-collapse-main">
        <div class="navbar-collapse-header d-md-none">
            <div class="row">
                <div class="col-12 collapse-brand d-flex justify-content-between">
                  <ul class="navbar-nav align-items-center">
                    <li class="nav-item dropdown">
                      <base-dropdown class="nav-link pr-0">
                        <div class="media align-items-center" slot="title">
                          <div class="media-body ml-2 text-azul-sena mouse-hover">
                            <span class="mb-0 text-sm font-weight-bold">{{ getNombre() }}
                            </span>
                            <i class="ni ni-bold-down"></i>
                          </div>
                        </div>
                        <a class="dropdown-item" @click="cerrarSesion()">
                          <i class="ni ni-user-run"></i>
                          <span>Cerrar sesión</span>
                        </a>
                      </base-dropdown>
                    </li>
                  </ul>
                  <!--  <router-link to="/">
                      <img src="../../assets/logosenablanco.png">
                  </router-link>-->
                  <div class="col-6 collapse-close">
                    <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                    </div>
                </div>
              <!--  <div class="col-6 collapse-close">
                    <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                </div>-->
            </div>
        </div>
        <ul class="navbar-nav">
          <slot name="links" class=""></slot>
        </ul>
        </div>
      </div>
      <!--Divider
      <hr class="my-3" />
      Heading
      <h6 class="navbar-heading text-muted">Documentation</h6>
      <ul class="navbar-nav mb-md-3">
        <li class="nav-item">
          <a class="nav-link text-white"
            href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/components/alerts.html">
            <i class="ni ni-ui-04 text-white"></i> Components
          </a>
        </li>
      </ul>-->
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default: "../../assets/logosenablanco.png",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    cerrarSesion(){
      sessionStorage.clear()
      this.$router.push({name: 'home'})
    },
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
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
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>
<style scoped>
#sidenav-collapse-main,
#sidenav-main {
  background-color: var(--oscuro-sena);
}

#sidenav-collapse-main {
  margin-top: 20px;
  border-top: 1px solid var(--naranja-sena);
}
.mouse-hover{
    cursor: pointer;
}
</style>
