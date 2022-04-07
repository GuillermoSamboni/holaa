<template>
    <div>
       <div class="row">
        
        <p class="ml-4 mt-1 mr-1"></p><div class="preloader"></div>
            
       </div>
    </div>
</template>

<script>
export default {
    name: "AnimacionGuardando"
}
</script>

<style>
.preloader {
  width: 40px;
  height: 40px;
  border: 6px solid rgba(0,0,0, 0.2);
  border-top: 6px solid #238276;
  border-radius: 100%;
  animation-name: girar;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>