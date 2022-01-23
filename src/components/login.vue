<template>
    <div class="wrap-auth">
        <q-card class="my-card bg-container" flat bordered style="min-width:320px; border-radius:3px;">
            <q-card-section>
                <div class="title-header q-pb-md q-pt-md">
                    <p class="text-center" style="font-size:18px;">Welcome Back!</p>
                </div>
                <q-form @submit="login()" class="q-col-gutter-lg q-pb-sm">
                    <div class="form-control">
                        <div>Enter Your Email Address</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="John Doe@gmail.com" v-model="formData.email" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control">
                        <q-btn
                            flat
                            outlined
                            label="Passwordless Login"
                            class="bg-secondary col text-white"
                            no-caps
                            type="submit"
                            style="width:100%; border-radius:3px;"
                        />
                    </div>
                </q-form>
                <div class="q-pt-xs">
                    <q-toolbar class="">
                        <span>Don't have an account?</span>
                        <div class="q-pl-sm">
                        <q-btn flat label="Create account" class="text-secondary" no-caps to="/auth/register" />
                        </div>
                    </q-toolbar>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "login",
        data(){
            return{
                formData:{
                    email:null
                }
            }
        },
        methods: {
            ...mapActions('global',[
                'onSubmitLoginForm',
                'getCredentialInNavigator'
            ]),
            login() {
                /* let data = {
                    email: this.email
                }; */
                
                this.$q.loading.show({
                    message: "Getting sign in authentication challenge ...",
                });
                
                this.onSubmitLoginForm(this.formData)
                    .then((user) => {
                    console.log(`result 1`);
                    this.$q.loading.show({
                        message: `Sign in authentication challenge available ...`,
                    });
                    this.getCredentialInNavigator(user)
                        .then((result) => {
                        console.log(`result 2`);
                        this.$q.loading.hide();
                        this.$q.notify({
                            message: `User is logged in`,
                            type: "positive",
                            position: "top",
                        });
                        this.$router.push("/");
                        })
                        .catch((err) => {
                        console.log(`err 2 ${err}`);
                        this.$q.loading.hide();
                        this.$q.notify({
                            message: err,
                            type: "negative",
                            position: "top",
                            icon: "error",
                        });
                        // return Promise.reject(err);
                        });
                    return Promise.resolve(1);
                    })
                    .catch((err) => {
                    console.log(`err 1`);
                    this.$q.loading.hide();
                    this.$q.notify({
                        message: err,
                        type: "negative",
                        position: "top",
                        icon: "error",
                    });
                    });
            },
        },
    }
</script>

<style scoped>
    .wrap-auth{
        font-family: 'nunito';
        color:#333333; 
    }
</style>