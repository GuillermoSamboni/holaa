<template>
    <div class="slider">
      <ul class="my-0">
         <li>
          <img src="../assets/1.png" alt="">
        </li>
        <li>
          <img src="../assets/sena8.png" alt="">
        </li> 
		<li>
          <img src="../assets/sena6.png" alt="">
        </li>
		<li>
          <img src="../assets/sena9.png" alt="">
        </li> 
		<li>
          <img src="../assets/sena7.png" alt="">
        </li>
		<li>
          <img src="../assets/sena10.png" alt="">
        </li>
		<li>
          <img src="../assets/sena11.png" alt="">
        </li>				
      </ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Slider extends Vue {}
</script>
<style>
.slider {
	width: 100%;
	overflow: hidden;
}
.slider ul {
	display: flex;
	padding: 0;
	width: 700%;
	animation: mover 20s infinite alternate linear;
}
.slider li {
	width: 500%;
	list-style: none;
}
.slider img {
	width: 100%;
}
@keyframes mover {
	0% {margin-left: 0;}
	10% {margin-left: 0;}
	
	15% {margin-left: -100%;}
	25% {margin-left: -100%;}
	
	30% {margin-left: -200%;}
	40% {margin-left: -200%;}
	
	45% {margin-left: -300%;}
	55% {margin-left: -300%;}

	60% {margin-left: -400%;}
	70% {margin-left: -400%;}

	75% {margin-left: -500%;}
	85% {margin-left: -500%;}

	90% {margin-left: -600%;}
	100% {margin-left: -600%;}
}
</style>