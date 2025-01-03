import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import global from './global'
//import program from './program'
import dashboard from './dashboard'
//import submission from './submission'
import task from './task'

// import example from './module-example'
import program from '../modules/program/store'
import submission from '../modules/submission/store'
import auth from '../modules/auth/store'
import company from '../modules/company/store'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const Store = createStore({
    modules: {
        // example
        global,
        task,
        dashboard,

        program,
        submission,
        auth,
        company
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
})

export default function (/* { ssrContext } */) {
    return Store
}
export { Store }
