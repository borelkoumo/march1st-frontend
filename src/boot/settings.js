import { boot } from 'quasar/wrappers'
//
// // "async" is optional;
// // more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async ({ app, router}) => {
//   // something to do
//     console.log(app)
// })

import { Notify } from 'quasar'

function goToError (next) {
    Notify.create({
        message: 'Your browser does not support webAuthn',
        type: 'negative'
    })
    next('/error/navigator')
}

export default async ({ app, router, store }) => {
    router.beforeEach(async (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresSettings)) {
            try {
                const isNavigatorSupporte = typeof(PublicKeyCredential) == "undefined" ? false : true;
                if (isNavigatorSupporte) {
                    next()
                } else {
                    goToError(next)
                }
            } catch (error) {
                throw error
            }
        } else {
            next()
        }
    })
}