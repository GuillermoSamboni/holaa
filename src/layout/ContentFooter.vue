<template>
  <footer class="site-footer2">
    <div class="container">
      <div class="row">
        <div class="col-md-9 col-sm-12 col-xs-12 center">
          <p class="copyright-text2">
            Copyright &copy; 2021
            <a href="#">Fábrica de software</a> - Centro de Teleinformática y
            Producción Industrial - Regional Cauca
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FooterTodo extends Vue {}
</script>
<style>

.site-footer2 {
  background-color: #fff;
  padding: 45px 0 40px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
}

.site-footer2 hr {
  border-top-color: #bbb;
  opacity: 0.5;
}

.site-footer2 hr.small {
  margin: 20px 0;
}

.site-footer2 h6 {
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}

.site-footer2 a {
  color: #737373;
}

.site-footer2 a:hover {
  color: #217c70;
  text-decoration: none;
}

.footer-links2 {
  padding-left: 0;
  list-style: none;
}

.footer-links2 li {
  display: block;
}

.footer-links2.inline li {
  display: inline-block;
}

.site-footer2 .social-icons2 {
  text-align: right;
  margin-bottom: 10px;
}

.site-footer2 .social-icons2 a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  /* margin-top: -30px; */
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
}

.copyright-text2 {
  margin: 0;
}

@media (max-width: 991px) {
  .site-footer2 [class^="col-"] {
    margin-bottom: 30px;
  }
}

@media (max-width: 767px) {
  .site-footer2 {
    padding-bottom: 0;
  }
  .site-footer2.copyright-text2,
  .site-footer2 .social-icons2 {
    text-align: center;
  }
}


</style>
