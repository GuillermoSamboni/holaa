<template>
    <div class="bg-oscuro-sena noticias">
        <h3 class="blod text-azul-sena text-capitalize titulo mb-5">Noticias</h3>
        <div class="slider">
            <ul class="my-0">
                <li class="">
                    <img src="../../assets/imagen.png" alt="">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor tempora, veritatis atque officiis praesentium dolorem culpa ab enim minima beatae odit aliquid molestiae asperiores.</p>
                </li>
                <li class="m-i">
                    <img src="../../assets/imagen.png" alt="">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor tempora, veritatis atque officiis praesentium dolorem culpa ab enim minima beatae odit aliquid molestiae asperiores.</p>
                </li>
                <li class="">
                    <img src="../../assets/imagen.png" alt="">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor tempora, veritatis atque officiis praesentium dolorem culpa ab enim minima beatae odit aliquid molestiae asperiores.</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Noticias extends Vue{

}
</script>

<style>
.noticias .slider {
	width: 100%;
	overflow: hidden;
}
.noticias .slider ul {
	display: flex;
	padding: 0;
	width: 150%;
	animation: cambio 15s infinite alternate linear;
}
.noticias .slider li {
	width: 50%;
	list-style: none;
}
.noticias .slider img {
	width: 100%;
}
@keyframes cambio {
	0% {margin-left: 0;}
    75% {margin-left: 0;}
	
	50% {margin-left: -50%;}
	100% {margin-left: -50%;}
}
.m-i{
    margin-left: 2%;
    margin-right: 2%;
}
</style>