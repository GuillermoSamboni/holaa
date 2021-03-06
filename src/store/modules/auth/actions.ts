/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import store from '@/store';
import * as types from './mutation-types';
import router from '@/router';

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const login = ({ commit }) => {
  /*
   * Normally you would use a proxy to log the user in:
   *
   * new Proxy()
   *  .login(payload)
   *  .then((response) => {
   *    commit(types.LOGIN, response);
   *    store.dispatch('account/find');
   *    Vue.router.push({
   *      name: 'home.index',
   *    });
   *  })
   *  .catch(() => {
   *    console.log('Request failed...');
   *  });
   */
  commit(types.LOGIN, 'RandomGeneratedToken');
  store.dispatch('account/find');

  router.push({
    name: 'home.index',
  });
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  router.push({
    name: 'login.index',
  });
};

export const cerrarSesion = ({ commit }) => {
  commit(types.LOGOUT);
  console.log("entro a cerrar");
  sessionStorage.clear()
  console.log(JSON.parse(sessionStorage.getItem("usuario")));
};

export default {
  check,
  login,
  logout,
  cerrarSesion
};
