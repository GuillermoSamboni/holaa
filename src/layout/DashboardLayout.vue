<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      class="bg-oscuro-sena"
      short-title="Opción Menú"
      title="Opción Menú">
      <ul slot="links" class="list-unstyled components">
        <router-link to="/dashboard" class="nav-link pl-2">
        <i data-v-61fadc8f="" class="fas fa-home text-white text-white" style="font-size: 1.5em;"></i>
          <span class="nav-link-text text-white" style="font-size: 1rem;">Inicio</span>
        </router-link>
        
        <div v-for="(modulo, index) in  modulos" :key="index" >
          <sidebar-item :key="modulo.id_item_modulo"
            :estilo="'text-white'"
            :link="{
              name: modulo.item_modulo,
              icon: modulo.icono,
              path: modulo.componente,
              modulo: modulo}"/>
        </div>
        <a @click="cerrarSesion()" class="nav-link pl-2">
              <i class="ni ni-user-run text-white text-white" style="font-size: 1.5em;"></i>
              <span class="nav-link-text text-white" style="font-size: 1rem;">Cerrar sesión</span>
            </a>
      </ul>
    </side-bar>
    <!-- bottom volver pantalla movil -->
      <a type="submit" class="button-movil bt-sm" v-if="window.width <768" onclick="window.history.back()"><i class="fas fa-arrow-left text-azul-sena"></i></a>
    <!-- fin bottom pantalla movil -->
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition class="padding" :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
      modulos: JSON.parse(sessionStorage.getItem('modulos')) ,
      window: {
            width: 0  
        }
    };
    
  },
  created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
  destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
  methods: {
    cerrarSesion(){
      sessionStorage.clear()
      this.$router.push({name: 'home'})
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    handleResize() {
            this.window.width = window.innerWidth;
            
    }
  },
};
</script>
<style lang="scss">
.padding{
  padding-bottom: 10px;
}
.button-movil{
  font-size: 25px;
  margin-bottom: 0%;
  border: none;
  position: fixed;
  z-index: 1;
  background-color: transparent;
  float: left;
  box-shadow: 2px 2px 5px #999;
  border-radius: 5px;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  width: 40px;
}

.button-movil i{
  color: black;
  padding-left: 5px;
  
}

</style>
