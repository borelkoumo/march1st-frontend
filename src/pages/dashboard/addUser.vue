<template>
  <q-page class="bg-home">
    <div class="main-content q-pt-lg q-pb-lg">
      <q-card class="card-info q-pb-lg q-pb-lg q-mt-lg" flat>
        <div class="flex q-gutter-lg q-pb-md">
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">User Name</div>
            <div class="">
              <q-input
                type=""
                v-model="username"
                label="Enter Name"
                borderless
                class="q-pl-sm q-pr-sm"
              />
            </div>
          </div>
        </div>
        <div class="flex q-gutter-lg q-pb-md">
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">User ID</div>
            <div class="">
              <q-input
                type=""
                v-model="userId"
                label="Enter Name"
                borderless
                class="q-pl-sm q-pr-sm"
              />
            </div>
          </div>
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Location</div>
            <div class="">
              <q-select
                :options="locations"
                v-model="location"
                label="Select Role"
                borderless
                class="q-pl-sm q-pr-sm select-input"
              />
            </div>
          </div>
        </div>
        <div class="flex q-gutter-lg q-pb-md">
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Status</div>
            <div class="">
              <q-select
                :options="locations"
                v-model="location"
                label="Select Status"
                borderless
                class="q-pl-sm q-pr-sm select-input"
              />
            </div>
          </div>
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Role</div>
            <div class="">
              <q-select
                :options="locations"
                v-model="location"
                label="Select Role"
                borderless
                class="q-pl-sm q-pr-sm select-input"
              />
            </div>
          </div>
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Privilege</div>
            <div class="">
              <q-select
                :options="locations"
                v-model="location"
                label="Select Privilege"
                borderless
                class="q-pl-sm q-pr-sm select-input"
              />
            </div>
          </div>
        </div>
      </q-card>
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
          </q-list>
        </div>
      </q-card>
      <div class="flex q-pt-lg q-pb-lg q-gutter-lg">
        <q-space />
        <q-btn
          label="Cancel"
          outline
          class="text-center text-secondary bg-white"
          no-caps
          style="width: 160px"
        />
        <q-btn
          label="Add Client"
          flat
          class="text-center text-white bg-secondary"
          no-caps
          style="width: 160px"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      userId: null,
      status: [],
      stat: null,
      locations: [],
      location: null,
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
.card-info {
  padding-left: 40px;
  padding-right: 30px;
}
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
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
