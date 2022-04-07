/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { FIND } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [FIND](state, account) {
    state.id_perfil = account.id_perfil;
    state.id_usuario = account.id_usuario;
    state.perfil = account.perfil;
    state.primer_apellido = account.primer_apellido;
    state.primer_nombre = account.primer_nombre;
    state.segundo_apellido = account.segundo_apellido;
    state.segundo_nombre = account.segundo_nombre;
    state.id_centro_formacion = account.id_centro_formacion;
    state.centro_formacion = account.centro_formacion;
  },
};
