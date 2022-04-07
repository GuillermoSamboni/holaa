/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import * as types from './mutation-types';

export const find = ({ commit }) => {
  /*
   * Normally you would use a proxy to fetch the account:
   *
   * new Proxy()
   *  .find()
   *  .then((response) => {
   *    commit(types.FIND, Transformer.fetch(response));
   *  })
   *  .catch(() => {
   *    console.log('Request failed...');
   *  });
   */
  const account = {
    id_perfil: "",
    id_usuario: "",
    perfil: "",
    primer_apellido: "",
    primer_nombre: "",
    segundo_apellido: "",
    segundo_nombre: ""
  };

  commit(types.FIND, account);
};

export default {
  find,
};
