<template>
  <div style="background-color: #238276 !important">
    <footer
      class="text-center text-white marge"
    >
      <div class="container pt-4">
        <section class="mb-4">
          <ul class="social-icons">
            <li>
              <a
                href="https://www.facebook.com/Fabrica-de-software-111879517826208"
                target="_blank"
                ><i class="fab fa-facebook-f is"></i
              ></a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCwnQfkYhxjJWCKyJnbl4zgw/featured"
                target="_blank"
                ><i class="fab fa-youtube is"></i
              ></a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/fabrica_software_ctpi/"
                target="_blank"
                ><i class="fab fa-instagram is"></i
              ></a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
    <footer class="py-5 d-flex justify-content-center bga-default site-footer">
      <div class="col-7 d-flex justify-content-around flex-wrap">
        <div class="copyright text-center m-0">
          <p class="copyright-text">
            Copyright &copy; 2021
            <a href="#">Fábrica de software</a> - Centro de Teleinformática y
            Producción Industrial - Regional Cauca
          </p>
        </div>
      </div>
    </footer>

    <!-- otra opcion -->   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FooterPer extends Vue {}
</script>

<style>
.marge {
  margin-bottom: -4.5%;
  background-color: #238276 !important;
}

.is {
  font-size: 22px;
  padding-top: 9px;
}

.fot{
  background-color: #238276;
}

.site-footer {
  background-color: #238276;
  padding: 45px 0 20px;
  font-size: 15px;
  line-height: 24px;
  color: #eee;
}

.site-footer hr {
  border-top-color: #eee;
  opacity: 0.5;
}

.site-footer hr.small {
  margin: 20px 0;
}

.site-footer h6 {
  color: #eee;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}

.site-footer a {
  color: #eee;
}

.site-footer a:hover {
  color: #333;
  text-decoration: none;
}

.footer-links {
  padding-left: 0;
  list-style: none;
}

.footer-links li {
  display: block;
}

.footer-links.inline li {
  display: inline-block;
}

.site-footer .social-icons {
  text-align: right;
  margin-bottom: 10px;
}

.site-footer .social-icons a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  /* margin-top: -30px; */
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
}

.copyright-text {
  margin: 0;
}

@media (max-width: 991px) {
  .site-footer [class^="col-"] {
    margin-bottom: 30px;
  }
}

@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .copyright-text,
  .site-footer .social-icons {
    text-align: center;
  }
}

.social-icons {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.social-icons li {
  display: inline-block;
  margin-bottom: 2px;
}

.social-icons li.title {
  margin-right: 15px;
  text-transform: uppercase;
  color: #96a2b2;
  font-weight: 700;
  font-size: 13px;
}

.social-icons a {
  color: #eee;
  font-size: 15px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
}
.social-icons a:hover {
  color: #333;
  font-size: 15px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
}

@media (max-width: 767px) {
  .social-icons li.title {
    display: block;
    margin-right: 0;
    font-weight: 600;
  }
}
</style>
