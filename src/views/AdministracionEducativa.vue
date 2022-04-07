<template>
  <div class="d-flex justify-content-center flex-column">
    <div class="bg-oscuro-sena py-2 px-2 borde-t-p2 menu d-flex justify-content-around navbar navbar-expand-lg navbar-light">
      <a @click="volverInicio()" class="inicio col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="inicio"><img src="../assets/bienestar/home.svg" class="w-100 h-auto" alt=""></a>
        <a href="#quienessomos"  @click="contenido(0)" class="col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="Quienes Somos"><img src="../assets/bienestar/quienes-somos.svg" class="w-100 h-auto" alt=""><p class="mb-0 text-center text-white d-none d-lg-block">Quienes Somos</p></a>
        <a href="#funciones" @click="contenido(1)" class="col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="Funciones"><img src="../assets/bienestar/funciones.svg" class="w-100 h-auto" alt=""><p class=" mb-0 text-center text-white d-none d-lg-block">Funciones</p></a>
        <a href="#estructura" @click="contenido(2)" class="col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="Estructura Organizacional"><img src="../assets/bienestar/estructura-org.svg" class="w-100 h-auto" alt=""><p class="mb-0 text-center text-white d-none d-lg-block">Estructura Organizacional</p></a>
        <a href="#directorio" @click="contenido(3)" class="col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="Directorio"><img src="../assets/bienestar/directorio.svg" class="w-100 h-auto" alt=""><p class="mb-0 text-center text-white d-none d-lg-block">Directorio</p></a>
        <a href="#noticias" @click="contenido(4)" class="col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="Noticias"><img src="../assets/bienestar/noticias.svg" class="w-100 h-auto" alt=""><p class="mb-0 text-center text-white d-none d-lg-block">Noticias</p></a>
        <a href="#video" @click="contenido(5)" class="col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="Video"><img src="../assets/bienestar/video.svg" class="w-100 h-auto" alt=""><p class=" mb-0 text-center text-white d-none d-lg-block">Video</p></a>
        <a href="#planeacion" @click="contenido(6)" class="col-1 p-1 text-center" data-toggle="tooltip" data-placement="bottom" title="Planeacion"><img src="../assets/bienestar/planeacion-est.svg" class="w-100 h-auto" alt=""><p class="mb-0 text-center text-white d-none d-lg-block">Planeacion</p></a>
        
    </div>
    <div class="separador">
      <div v-if="contenidoSection == 0">
        <quienes-somos id="quienessomos" class="py-md-8 p-3 px-md-3 px-lg-7"/>
        <div class="d-flex justify-content-center flex-column bg-azul-sena">
          <div class="d-flex justify-content-center">
            <hr class="border col-1 mx-3">
            <h4 class="text-white mt-4">Dimensiones de Bienestar al Aprendiz</h4>
            <hr class="border col-1 mx-3">
          </div>
          <p class="text-center text-white-50 mt--3">Resolución 1228 de 2018</p>
          <img src="../assets/bienestar/dimensiones-b-a.png" class="col-7 mx-auto mb-4" alt="">
        </div>
      </div>
      <funciones id="funciones" v-if="contenidoSection == 1" class="p-3 py-md-8 px-md-3 px-lg-7"/>
      <estructura-organizacional id="estructura" v-if="contenidoSection == 2" class="p-3 py-md-8 px-md-3 px-lg-7"/>
      <directorio id="directorio" v-if="contenidoSection == 3" class="p-3 py-md-8 px-md-3 px-lg-7"/>
      <noticias id="noticias" v-if="contenidoSection == 4" class="p-3 py-md-8 px-md-3 px-lg-7"/>
      <Video id="video" v-if="contenidoSection == 5" class="p-3 py-md-8 px-md-3 px-lg-7"/>
      <planeacion id="planeacion" v-if="contenidoSection == 6" class="p-3 py-md-8 px-md-3 px-lg-7"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Slider from '../components/Slider.vue';
import QuienesSomos from './componentes-a-e/QuienesSomos.vue';
import Funciones from './componentes-a-e/Funciones.vue';
import EstructuraOrganizacional from './componentes-a-e/EstructuraOrganizacional.vue';
import Directorio from './componentes-a-e/Directorio.vue';
import Noticias from './componentes-a-e/Noticias.vue';
import Planeacion from './componentes-a-e/Planeacion.vue';
import Video from './componentes-a-e/Video.vue';

@Component({
  components: {
    Slider,
    QuienesSomos,
    Funciones,
    EstructuraOrganizacional,
    Directorio,
    Noticias,
    Planeacion,
    Video
  }
})
export default class ENI extends Vue{
  contenidoSection = 0;
  
  constructor(){
    super();
    const elemento: any = document.getElementsByClassName('menu');
    const separador = document.getElementsByClassName('separador');
    let altura: any = 0;
    window.onscroll = function(){
      if(elemento[0].offsetTop != 0){
        altura = elemento[0].offsetTop;
      }
      if (window.scrollY > (altura)) {
          elemento[0].classList.add('menu-h')
          elemento[0].classList.remove('py-4')
          separador[0].classList.add('pt-6')
      } else if (window.scrollY <= (altura)) {
          elemento[0].classList.remove('menu-h')
          elemento[0].classList.add('py-4')
          separador[0].classList.remove('pt-6')
      }
    };
  }
  contenido(pos: number){
    this.contenidoSection = pos;
  }
  //metodo para volver al inicio 
  volverInicio(){
    this.$router.push({ name: "home" });
  }
}
</script>

<style>
.inicio{
  cursor: pointer;
}
.menu-h {
  background-color:#ccc;
  width: 100%;
  z-index: 1000;
  position:fixed !important;
  height: 80px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 5px solid #59b548;
  top: 0;
}
.menu a {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
.menu a {
  background-color: transparent;
  min-width: 45px;
  max-width: 80px !important;
}
.menu-h a {
  background-color: transparent;
  max-width: 50px !important;
}
.menu-h a img {
  height: 50px;
}
.menu a p {
  display: none !important;
}
.titulo {
  font-size: 50px;
}
.borde {
  border-radius: 50px;
  max-height: 307px;
}
</style>