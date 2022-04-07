<template>
  <div class="mt-4 container-fluid">
    <div class="card">
      <div class="card-header">
        <h1 class="text-azul-sena">GESTIONAR PERMISO</h1>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            v-if="!estadoPeticion"
            class="table table table-hover table-inverse table-striped"
          >
            <thead class="text-white">
              <tr>
                <th>&nbsp;</th>
                <th v-for="(perfil, index) in listaPerfiles" :key="index">
                  {{ perfil.perfil }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(modulo, key) in listaModulos" :key="key">
                <td
                  v-bind:style="{
                    'padding-left': modulo.padding + 'px !important',
                  }"
                >
                  <span v-html="modulo.item_modulo" class="font-weight-bold">
                  </span>
                </td>
                <td v-for="(perfil, index) in listaPerfiles" :key="index">
                  <div>
                    <label
                      tooltip="Modificar Permiso"
                      tooltip-flow="top"
                      class="custom-toggle text-azul-sena"
                    >
                      <input
                        type="checkbox"
                        :id="modulo.id_item_modulo + '.' + perfil.id_perfil"
                        @click="
                          asignarPermiso(
                            modulo.id_item_modulo,
                            perfil.id_perfil
                          )
                        "
                      />
                      <span
                        class="custom-toggle-slider rounded-circle"
                        data-label-off="NO"
                        data-label-on="SI"
                      ></span>
                    </label>
                  </div>
                  <!-- <input
                    type="checkbox"
                    :id="modulo.id_item_modulo + '.' + perfil.id_perfil"
                    @click="
                      asignarPermiso(modulo.id_item_modulo, perfil.id_perfil)
                    "
                  /> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";
import Swal from "sweetalert2";

@Component
export default class PermisosXModulo extends Vue {
  estadoPeticion = false;
  listaPerfiles = [];
  listaModulos = [];
  listaModulosPerfilesPermisos = [];
  constructor() {
    super();
  }

  mounted() {
    this.obtenerModulosPerfiles();
    this.obtenerPermisosPerfilModulo();
  }

  obtenerModulosPerfiles() {
    Axios()
      .get("listar_modulos_perfiles")
      .then((respuesta) => {
        this.listaPerfiles = respuesta.data.results.perfiles;
        const modulosCargados = respuesta.data.results.modulos;
        this.recorreArrary(modulosCargados);
      })
      .catch((error) => {
       

        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }

  activarCheck() {
    // this.listaModulosPerfilesPermisos.forEach((permiso) => {
    //   const idCheck = permiso.id_item_modulo + "." + permiso.id_perfil;

    //   // const check = document.getElementById(idCheck).querySelector("input");
    //   // if (check.type == "checkbox") {
    //   //   check.checked = false;
    //   // }

    //   const check = document.getElementById(idCheck).querySelector("input");
    //   if (check.type == "checkbox") {
    //     check.checked = false;
    //   }
    // });

    this.listaModulosPerfilesPermisos.forEach((permiso) => {
      const idCheck = permiso.id_item_modulo + "." + permiso.id_perfil;
      // document.getElementById(idCheck).checked = true;
      let checks = document.getElementsByTagName("input");
      for (let i = 0; i < checks.length; i++) {
        const element = checks[i];
        if (element.id == idCheck) {
          element.checked = true;
        }
      }

      // const pp =document.getElementsByName;

      // document.querySelector("input[id='"+idCheck+"']').
    });
  }

  async obtenerPermisosPerfilModulo() {
    await Axios()
      .get("listar_permisos_mod_per")
      .then((respuesta) => {
        this.listaModulosPerfilesPermisos = respuesta.data.results;
        return true;
      })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            this.activarCheck();
          }, 100);
        }
      })
      .catch(() => {
        //  Swal.fire((respuesta.data.status+"!").toString().toUpperCase(), respuesta.data.message, respuesta.data.status);
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor!",
          "error"
        );
      });
  }
  recorreArrary(modulos, nivel = "", padding = 5) {
    modulos.forEach((modulo) => {
      modulo.padding = padding;
      modulo.item_modulo = nivel + modulo.item_modulo;
      this.listaModulos.push(modulo);
      if (modulo.hijos.length > 0) {
        this.recorreArrary(modulo.hijos, nivel + "", padding + 20);
      }
    });
  }

  asignarPermiso(modulo, pefi) {
    Axios()
      .post("almacenar_permisos_mod_per", {
        perfil_id: pefi,
        item_modulo_id: modulo,
      })
      .then((respuesta) => {
        // respuesta.data.results.perfiles;
        if (respuesta.data.status != "success") {
          Swal.fire(
            (respuesta.data.status + "!").toString().toUpperCase(),
            respuesta.data.message,
            respuesta.data.status
          );
        } else {
          // Swal.fire(
          //   (respuesta.data.status + "!").toString().toUpperCase(),
          //   respuesta.data.message,
          //   respuesta.data.status
          // );

          this.recargarMatrizCheckBox();
          this.$router.push({ name: "GestionarPermiso" });
        }
      })
      .catch(() => {
        Swal.fire(
          "ERROR!",
          "Se ha presentado un error en el servidor! aaa",
          "error"
        );
      });
    // /crear_permisos_mod_per
  }

  recargarMatrizCheckBox() {
    let checks = document.getElementsByTagName("input");
    for (let i = 0; i < checks.length; i++) {
      const element = checks[i];
      if (element.type == "checkbox") {
        element.checked = false;
      }
    }

    this.obtenerPermisosPerfilModulo();
  }
}
</script>

// https://www.lawebera.es/xhtml-css/centrar-vertical-con-css.php
