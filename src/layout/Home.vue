<template>
  <div>
    <nav-bar-inicio></nav-bar-inicio>
    <slider></slider>
    <router-view></router-view>
    <footer-per></footer-per>
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import Slider from '../components/Slider.vue';
import { Vue } from 'vue-property-decorator';
import FooterPer from '../components/FooterPer.vue';
import NavBarInicio from '../components/NavBarInicio.vue';

@Component({
  components: {
    Slider,
    FooterPer,
    NavBarInicio
  }
})
export default class Home extends Vue {

}
</script>
<style lang="scss">
#nav{
  border-bottom: 3px solid #fc7323;
}
</style>
