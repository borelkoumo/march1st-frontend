<template>
  <q-page class="flex flex-center">
        <div class="q-pa-lg">
            <div class="title-erro text-bold text-grey-8" style="font-size:25px;">
                <q-icon name="report_problem" class="text-negative" size="35px"/> Oups! WebAuthn error settings
            </div>
            <div class="description-erro text-grey-8 q-pt-lg q-pb-lg">
                The Web Authentication API is an extension of the Credential Management API that enables strong authentication with public key cryptography, enabling password-less authentication and / or secure second-factor authentication without SMS texts.
                <p class="text-bold q-pt-md text-center">
                    Find the list of browsers that support WebAuthn
                </p>
                <p class="flex flex-center"><q-btn label="Browsers WebAuthn" class="q-ml-md bg-secondary text-white" @click="openUrl()"/></p>
            </div>
        </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  methods:{
      openUrl(){
          window.open("https://caniuse.com/?search=webauthn","_blank")
      }
  }
})
</script>
