<template>
    <div>
        <q-card class="my-card bg-container" flat bordered style="min-width:320px">
            <q-card-section>
                <div class="title-header q-pb-md q-pt-md">
                    <p class="text-center">Welcome Back!</p>
                </div>
                <q-form @submit="onSubmit()" class="q-col-gutter-lg q-pb-sm">
                    <div class="form-control">
                        <div>Enter Your Email Address</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="John Doe@gmail.com" v-model="formData.email" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control">
                        <q-btn
                            outlined
                            label="Passwordless Login"
                            class="bg-primary col text-white"
                            no-caps
                            type="submit"
                            style="width:100%"
                        />
                    </div>
                </q-form>
                <div class="q-pt-xs">
                    <q-toolbar class="">
                        <span>Don't have an account?</span>
                        <div class="q-pl-sm">
                        <q-btn flat label="Create account" class="text-primary" no-caps to="/auth/register" />
                        </div>
                    </q-toolbar>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
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
            onSubmit(){

            }
        },
    }
</script>

<style scoped>
    
</style>