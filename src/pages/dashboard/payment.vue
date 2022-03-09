<template>
  <q-page class="bg-home">
    <div class="main-content q-pt-lg q-pb-lg">
      <q-toolbar class="bg-none flex q-gutter-sm" style="padding-top: 40px">
        <q-space />
        <q-select
          bg-color="white"
          dense
          :options="options"
          v-model="option"
          style="min-width: 200px;"
          borderless
        />
      </q-toolbar>
      <div class="wrap-card q-gutter-md q-pt-lg">
        <q-card class="card-payment" flat>
          <q-item class="">
            <q-item-section avatar class="text-center flex flex-center">
              <q-avatar
                class="text-center flex flex-center"
                style="background-color: rgba(47, 73, 209, 0.1)"
              >
                <img
                  src="~assets/local/card/payment-made.svg"
                  class="q-pa-sm"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section class="q-pl-sm">
              <div class="title">$7500</div>
              <div class="subtitle">Payment Made</div>
            </q-item-section>
          </q-item>
        </q-card>
        <q-card class="card-payment" flat>
          <q-item class="">
            <q-item-section avatar class="text-center flex flex-center">
              <q-avatar
                class="text-center flex flex-center"
                style="background-color: rgba(255, 248, 237, 1)"
              >
                <img
                  src="~assets/local/card/pending-payment.svg"
                  class="q-pa-sm"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section class="q-pl-sm">
              <div class="title">$3500</div>
              <div class="subtitle">Pending Payments</div>
            </q-item-section>
          </q-item>
        </q-card>
        <q-card class="card-payment" flat>
          <q-item class="">
            <q-item-section avatar class="text-center flex flex-center">
              <q-avatar
                class="text-center flex flex-center"
                style="background-color: rgba(239, 234, 253, 1)"
              >
                <img
                  src="~assets/local/card/pending-tirage.svg"
                  class="q-pa-sm"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section class="q-pl-sm">
              <div class="title">$2000</div>
              <div class="subtitle">Pending Triage</div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

      <q-card class="card-list q-pa-lg q-pb-lg q-mt-lg" flat>
        <div class="q-pr-md q-pl-md">
          <q-toolbar class="q-pb-md">
            <div class="subtitle2">Programs</div>
            <q-space />
            <q-input
              outlined
              borderless
              v-model="search"
              label="Search"
              class="input-text"
              dense
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
          <q-list separator bordered>
            <q-item class="header">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box1" color="secondary" />
              </q-item-section>
              <q-item-section> Program Name </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 170px">
                <span
                  >Type <q-icon name="import_export" class="q-pl-lg"
                /></span>
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 140px">
                <span
                  >Date <q-icon name="import_export" class="q-pl-lg"
                /></span>
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                Actions
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box2 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box1" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_aQYgUYwnCsM.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box2 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box2" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_WUmb_eBrpjs.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box3 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box3" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_aQYgUYwnCsM.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box4 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box4" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_WUmb_eBrpjs.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box3 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box3" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_aQYgUYwnCsM.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box4 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box4" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_WUmb_eBrpjs.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box3 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box3" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_aQYgUYwnCsM.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box4 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box4" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_WUmb_eBrpjs.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box3 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box3" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_aQYgUYwnCsM.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
            <q-item :class="{ 'active-item': box4 == true }">
              <q-item-section class="flex flex-center" style="max-width: 40px">
                <q-checkbox v-model="box4" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item class="flex flex-center no-padding">
                  <q-item-section style="max-width: 70px">
                    <q-img
                      src="~assets/local/unsplash_WUmb_eBrpjs.png"
                      width="66px"
                    />
                  </q-item-section>
                  <q-item-section class="subtitle2">
                    Program Name atur aut odit aut fugit, sed onsequu n tur
                    magni dolore Nemo sed onsequu
                  </q-item-section>
                </q-item>
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 170px"
              >
                Mnc
              </q-item-section>
              <q-item-section
                class="subtitle5 flex flex-center"
                style="max-width: 140px"
              >
                12.12.2021
              </q-item-section>
              <q-item-section class="flex flex-center" style="max-width: 60px">
                <q-btn icon="more_horiz" flat />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      options: [{ label: "", value: "" }],
      option: { label: "All Time", value: 0 },

      search: null,

      box1: false,
      box2: false,
      box3: true,
      box4: false,
    };
  },
};
</script>
<style scoped>
.card-list .active-item {
  background: #f2f6ff;
}
.card-list .subtitle2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #1b2559;
}
.card-list .subtitle3 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #1b2559;
}
.card-list .subtitle4 {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.card-list .subtitle5 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #767676;
}
.card-list .q-toolbar {
  padding-left: 0;
  padding-right: 0;
}
.card-list .header {
  background: #eff0f6;
  box-shadow: 0px 1px 0px #dadbe4;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #767676;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.card-list .q-list {
  border-radius: 10px;
}
.card-list .input-text {
  background: #fbfbfb;
  border-radius: 8px;
  width: 520px;
}
.wrap-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;
}
.card-payment {
  border-radius: 10px;
}
.card-payment .q-item {
  padding-top: 38px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 38px;
}
.card-payment .title {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #5887ff;
}
.card-payment .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
  padding-top: 12px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
