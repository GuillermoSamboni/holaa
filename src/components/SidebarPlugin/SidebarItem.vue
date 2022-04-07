<template>
    <li class="nav-item px-0">
        <a v-if="link.path == null"
                :href="'#' + link.modulo.id_item_modulo"
                 data-toggle="collapse"
                class="nav-link px-2 m-0" 
                :target="link.target">
            <template>
              <!-- {{link}} -->
                <i :class="link.icon + ' text-white'" style="font-size: 1.5em;"></i>
                <span :class="'nav-link-text ' + estilo" style="font-size: 1rem;">{{ link.name }}</span>
            </template>
        </a>
        <router-link v-else
                :to="link.path"
                @click.native="linkClick"
                class="nav-link pl-2"
                :target="link.target"
                :href="link.path">
            <template>
                <i :class="link.icon" style="font-size: 1.5em;"></i>
                <span :class="'nav-link-text ' + estilo" style="font-size: 1rem;">{{ link.name }}</span>
            </template>
        </router-link>
        <ul :id="link.modulo.id_item_modulo" class="collapse pl-3">
          <sidebar-item v-for="modulo in  link.modulo.hijos" :key="modulo.id_item_modulo"
            :estilo="'text-white'"
            class=""
            :link="{
              name: modulo.item_modulo,
              icon: 'text-white ' + modulo.icono,
              path: modulo.componente,
              modulo: modulo
            }"/>
        </ul>
    </li>
</template>
<script>
  export default {
    name: 'sidebar-item',
    props: {
      link: {
        type: Object,
        default: () => {
          return {
            name: '',
            path: '',
            children: [],
            modulo: {}
          };
        },
        description:
          'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
      },
      estilo: ''
    },
    inject: {
      autoClose: {
        default: true
      }
    },
    data() {
      return {
        children: [],
        collapsed: true
      };
    },
    methods: {
      linkClick() {
        if (
          this.autoClose &&
          this.$sidebar &&
          this.$sidebar.showSidebar === true
        ) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>

<style scoped>

li {
  list-style-type: none;
}
</style>
