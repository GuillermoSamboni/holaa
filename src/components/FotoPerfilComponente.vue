<template>
  <figure>
    <img class="" alt="" v-if="usuario.ruta_foto" :src="fotoPerfil" />

    <img
      v-if="!usuario.ruta_foto"
      class=""
      src="../assets/logosenanegro.png"
      alt=""
    />
    <div class="capa" @click.prevent="$refs.botonFotoPerfil.click()">
      <h3><i class="fa fa-camera"></i></h3>
      <p>Cargar foto nueva</p>
    </div>
    <input
      v-show="false"
      name="botonFotoPerfil"
      type="file"
      ref="botonFotoPerfil"
      id="botonFotoPerfil"
      class="input-file"
      accept="application/img"
      required="true"
      @change="obtenerFoto($event)"
      fluid
    />
    <div id="campo" v-if="fotoPerfilTemp == null"></div>
    <div id="campo" v-else>
      <button class="btn bg-azul-sena mt-2 text-white" @click="subirFoto()">
        Subir Foto
      </button>
    </div>
  </figure>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { mapState, mapActions} from "vuex"
import Axios from "@/Axios";
import Swal from "sweetalert2";

@Component({
  components: {},
})
export default class FotoPerfilComponente extends Vue {
  fotoPerfilTemp = null;
  fotoPerfil = null;
  usuario = JSON.parse(sessionStorage.getItem("usuario"));
  idUsuario = JSON.parse(sessionStorage.getItem("usuario")).id_usuario;

  mounted() {
    this.verFoto(this.usuario.id_usuario);
    this.obtenerUsuario(this.usuario.id_usuario);
  }
  obtenerUsuario(idUsuario) {
    Axios()
      .get("listar_usuario/" + idUsuario)
      .then((respuesta) => {
        if (respuesta.data.status == "success") {
          this.usuario = respuesta.data.results;
        } else {
          Swal.fire("ERROR!", "No se ha encontrado", "error");
        }
        
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  verFoto(id_usuario) {
    this.fotoPerfil =
      "https://develdfp.cloudsenactpi.net/api/ver_foto/" + id_usuario;
  }

  subirFoto() {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    //Creamos el formData
    var data = new FormData();
    //Añadimos la docinscrip seleccionada
    data.append("imagen", this.fotoPerfilTemp);
    data.append("id_usuario_autenticado", this.idUsuario);

    //Enviamos la petición
    Axios()
      .post("almacenar_foto", data, { headers: headers })
      .then((respuesta) => {
        if ((respuesta.data.status = "success")) {
          Swal.fire({
            title: "Se subió la Foto!",
            text: "Foto de Perfil cargado exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#238276",
          });
        } else {
          Swal.fire(
            "ERROR!",
            "Se ha presentado un error en el servidor!",
            "error"
          );
        }
      }).finally(() => {
        //   this.$router.push({name: 'GestionarHojaDeVidaENI'})
        this.$router.go(0)
        //   this.obtenerUsuario(this.idUsuario)
        //   this.verFoto(this.idUsuario)
      });
  }
  //---------------------------------------------------------------
  obtenerFoto(event) {
    if (event.target.files[0].size <= 2000000) {
      //2mb tope
      let extDoc = event.target.files[0].name
        .toString()
        .substring(event.target.files[0].name.toString().lastIndexOf(".")); //extension del archivo
      if (extDoc == ".jpeg" || extDoc == ".jpg" || extDoc == ".png") {
        this.fotoPerfilTemp = event.target.files[0];
        Swal.fire({
          title: "Foto De Perfil Cargada!",
          text: "La foto a sido cargado exitosamente, presiona el botón subir foto para que sea guardada!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#238276",
        });
        
      } else {
        this.fotoPerfilTemp = null;
        Swal.fire(
          "Algo salió mal!",
          "El archivo cargado no es una foto!",
          "error"
        );
      }
    } else {
      this.fotoPerfilTemp = null;
      Swal.fire(
        "Algo salió mal!",
        "El archivo cargado pesa más de 2 MegaBytes!",
        "error"
      );
    }
  }
}
</script>
<style>