<template>
    <div class="wrap-auth">
        <q-card class="my-card bg-container" flat bordered style="min-width:320px; border-radius:3px;">
            <q-card-section>
                <div class="title-header q-pb-md q-pt-md">
                    <p class="text-center" style="font-size:18px;" v-if="formData.typeUser==1">Sign up for hacker</p>
                    <p class="text-center" style="font-size:18px;" v-else>Sign up for client</p>
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
                            flat
                            label="Check my email"
                            class="bg-secondary col text-white"
                            no-caps
                            type="submit"
                            style="width:100%; border-radius:3px;"
                        />
                    </div>
                </q-form>
                <q-form @submit="verifyCode()" class="q-col-gutter-lg q-pb-sm" v-if="step==2">
                    <div class="form-control">
                        <div>Code verification</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter the code" v-model="code" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div>
                    <div class="form-control">
                        <q-btn
                            outlined
                            flat
                            label="Check the code"
                            class="bg-secondary col text-white"
                            no-caps
                            type="submit"
                            style="width:100%; border-radius:3px;"
                        />
                    </div>
                </q-form>
                <q-form @submit="generatePublicKey()" class="q-col-gutter-lg q-pb-sm" v-if="step==3">
                    <!-- <div class="form-control">
                        <div>Code verification</div>
                        <div class="q-pt-sm">
                            <q-input dense placeholder="Enter the code" v-model="code" color="grey-3" bg-color="white" outlined />
                        </div>
                    </div> -->
                    <div class="form-control">
                        <q-btn
                            outlined
                            flat
                            label="Generate public key"
                            class="bg-secondary col text-white"
                            no-caps
                            type="submit"
                            style="width:100%; border-radius:3px;"
                        />
                    </div>
                </q-form>
                <div class="" v-if="step==4">
                    <div>good</div>
                </div>
                <div class="q-pt-xs" v-if="step!=4">
                    <q-toolbar class="">
                        <span>Already have an account?</span>
                        <div class="q-pl-sm">
                        <q-btn flat label="Sign in" class="text-secondary" no-caps to="/auth/login" />
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
                    companyName:"Test",
                    fullName:"Steve william",
                    title:"Test title",
                    email:"williamsteve216@gmail.com",
                    typeUser:2
                },
                code:null,
                credentialOptions:null,
                step:1
            }
        },
        methods: {
            ...mapActions('global',[
                'onSubmitSignUpForm',
                'onSubmitValidationCode',
                'callAuthenticator'
            ]),
            async onSendEmailValidation(){
                this.$q.loading.show();
                if(this.formData.typeUser==2){
                    try {
                        const result = await this.onSubmitSignUpForm(this.formData);
                        if(result!=-1){
                            this.step=2;
                        }
                        this.$q.loading.hide();
                    } catch (error) {
                        //console.log("error")
                        this.$q.notify({
                            message:"Network Error",
                            type:"negative",
                            position:"top",
                            icon:"error"
                        })
                    }
                }
            },
            async verifyCode() {
                this.$q.loading.show({
                    message: "Checking code ...",
                });
                try{
                    const res = await this.onSubmitValidationCode(this.code);
                    //debugger;
                    this.$q.loading.hide();
                    console.log(`Resultat = ${JSON.stringify(res)}`);
                    this.credentialOptions=res;
                    this.$q.notify({
                        message: "Cognito Account Created",
                        type: "positive",
                        position: "top",
                    });
                    console.log("Code ok");
                    this.step=3;
                }
                catch(err){
                    this.$q.loading.hide();
                    this.$q.notify({
                        message: err,
                        type: "negative",
                        position: "top",
                        icon: "error",
                    });
                    this.step = 2;
                };
            },
            generatePublicKey(){
                this.$q.loading.show({
                    message: "Public keys generation ...",
                });
                this.callAuthenticator(this.credentialOptions)
                .then((userData) => {
                    this.$q.loading.hide();
                    this.$q.notify({
                        message: `Account created for ${userData.username}. You can Login`,
                        type: "positive",
                        position: "top",
                    });
                    this.step = 4;
                })
                .catch((err) => {
                        this.$q.notify({
                            message: err,
                            type: "negative",
                            position: "top",
                        });
                        this.$q.loading.hide();
                    });
            }
        },
    }
</script>

<style scoped>
    .wrap-auth{
        font-family: 'nunito';
        color:#333333; 
    }
</style>