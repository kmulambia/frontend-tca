import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import navigation from './navigation';
import session from './session';
import user from './user';
import role from './role';
import log from './log';
import report from './report';
import partner from './partner';
import partnerType from './partnerType';
import admin0 from './admin0';
import admin1 from './admin1';
import admin2 from './admin2';
import admin3 from './admin3';
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      navigation,
      session,
      user,
      role,
      log,
      partner,
      partnerType,
      report,
      admin0,
      admin1,
      admin2,
      admin3
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
