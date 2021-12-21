<template>
    <div>
        <q-card class="my-card bg-container" flat bordered style="min-width:320px">
            <q-card-section>
                <div class="title-header q-pb-md q-pt-md">
                    <p class="text-center" v-if="formData.typeUser==1">Sign up for hacker</p>
                    <p class="text-center" v-else>Sign up for client</p>
                </div>
                <q-form @submit="onSendEmailValidation()" class="q-col-gutter-sm q-pb-sm" v-if="step==1">
                    <div class="form-control" v-if="formData.typeUser==2">
                        <div>Company Name</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter your company name" v-model="formData.companyName" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control" v-if="formData.typeUser==2">
                        <div>Full Name</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter your full name" v-model="formData.fullName" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control" v-if="formData.typeUser==2">
                        <div>Title</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter your title" v-model="formData.title" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control" v-if="formData.typeUser==1">
                        <div>Username/Pseudonym</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter your username" v-model="formData.username" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control">
                        <div>Email</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter your email" v-model="formData.email" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control">
                        <q-btn
                            outlined
                            label="Check my email"
                            class="bg-primary col text-white"
                            no-caps
                            type="submit"
                            style="width:100%"
                        />
                    </div>
                </q-form>
                <q-form @submit="onCheckEmail()" class="q-col-gutter-lg q-pb-sm" v-if="step==2">
                    <div class="form-control">
                        <div>Code verification</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter the code" v-model="formData.code" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control">
                        <q-btn
                            outlined
                            label="Check the code"
                            class="bg-primary col text-white"
                            no-caps
                            type="submit"
                            style="width:100%"
                        />
                    </div>
                </q-form>
                <div class="q-pt-xs">
                    <q-toolbar class="">
                        <span>Already have an account?</span>
                        <div class="q-pl-sm">
                        <q-btn flat label="Sign in" class="text-primary" no-caps to="/auth/login" />
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
                    email:null,
                    username:null,
                    code:null,
                    companyName:null,
                    fullName:null,
                    title:null,
                    typeUser:2
                },
                step:1
            }
        },
        methods: {
            ...mapActions('global',[
                ''
            ]),
            onSendEmailValidation(){

                this.step=2;
            },
            onCheckEmail(){

            }
        },
    }
</script>

<style scoped>
    
</style>