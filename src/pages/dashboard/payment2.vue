<template>
  <q-page class="bg-home">
    <div class="main-content q-pt-lg q-pb-lg">
      <div
        class="header q-gutter-md"
        style="padding-left: 0px; padding-right: 0px"
      >
        <q-btn class="bg-secondary text-white col" flat no-caps>
          <q-avatar size="32px">
            <img src="~assets/local/bx_bxs-user-account.svg" />
          </q-avatar>
          <div class="q-pl-sm">Profile</div>
        </q-btn>
        <q-btn class="bg-secondary text-white col" flat no-caps>
          <q-avatar size="32px">
            <img src="~assets/local/bx_bxs-user-account.svg" />
          </q-avatar>
          <div class="q-pl-sm">Payment Details</div>
        </q-btn>
        <q-btn class="bg-secondary text-white col" flat no-caps>
          <q-avatar size="32px">
            <img src="~assets/local/bx_bxs-user-account.svg" />
          </q-avatar>
          <div class="q-pl-sm">Identify verification</div>
        </q-btn>
      </div>
      <div class="btn-payment">
        <q-btn
          label="PayPal"
          flat
          no-caps
          :class="{ 'active-payment': payment == 'paypal' }"
          @click="payment = 'paypal'"
        />
        <q-btn
          label="Bank Account"
          flat
          no-caps
          :class="{ 'active-payment': payment == 'bank' }"
          @click="payment = 'bank'"
        />
      </div>
      <div class="card-info">
        <q-tab-panels
          v-model="payment"
          animated
          class="rounded-borders q-mt-md"
        >
          <q-tab-panel name="paypal">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="bank">
            <div class="flex q-gutter-lg q-pb-md">
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Bank Name</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="name"
                    label="Enter Name"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Bank Address</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="address"
                    label="Enter Name"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
            </div>
            <div class="flex q-gutter-lg q-pb-md">
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Bank Country</div>
                <div class="">
                  <q-select
                    :options="locations"
                    v-model="location"
                    label="Select Country"
                    borderless
                    class="q-pl-sm q-pr-sm select-input"
                  />
                </div>
              </div>
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">City</div>
                <div class="">
                  <q-select
                    :options="locations"
                    v-model="location"
                    label="Select City"
                    borderless
                    class="q-pl-sm q-pr-sm select-input"
                  />
                </div>
              </div>
            </div>
            <div class="flex q-gutter-lg q-pb-md">
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Account Holder Name</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="name"
                    label="Enter Name"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Account Number</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="number"
                    label="Enter Account Number"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
            </div>
            <div class="flex q-gutter-lg q-pb-md">
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Account Address</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="address"
                    label="Enter Account Address"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Account IBAN</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="number"
                    label="Enter Account IBAN"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
            </div>
            <div class="flex q-gutter-lg q-pb-md">
              <div class="form-elt col">
                <div class="subtitle q-pb-sm">Currency</div>
                <div class="">
                  <q-select
                    :options="locations"
                    v-model="location"
                    label="Select Country"
                    borderless
                    class="q-pl-sm q-pr-sm select-input"
                  />
                </div>
              </div>
              <div class="col"></div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      payment: "bank",
      name: null,
      address: null,
      number: null,
      location: null,
      locations: [],
    };
  },
};
</script>
<style scoped>
.card-info .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.form-elt .q-input,
.form-elt .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.active-payment {
  /* background: #e4ecff; */
  border-radius: 8px;
  background: #e4ecff;
}
.btn-payment .q-btn {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  color: #5887ff;
}
.btn-payment {
  background: #fbfbfb;
  border-radius: 8px;
  border: 1px solid white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-top: 35px;
}
.header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;
}
.header .q-btn {
  background: #5887ff;
  border-radius: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
