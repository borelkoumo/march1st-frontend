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
      <q-toolbar class="header-btn q-pr-none q-pl-none">
        <div class="title">Basic Information</div>
        <q-space />
        <q-btn
          label="Reset Password"
          no-caps
          outline
          class="bg-white text-secondary q-mr-md"
        />
        <q-btn
          label="Edit Profile"
          no-caps
          flat
          class="bg-secondary text-white"
        />
      </q-toolbar>
      <q-card class="card-user bg-transparent" flat style="border-radius: 10px">
        <div
          class="wrap-card q-pt-lg q-pb-lg q-pl-lg flex flex-center bg-white"
        >
          <div class="wrap-image flex flex-center">
            <div class="card-image">
              <q-img src="~assets/local/file_copy.png" width="32px" />
              <div class="subtitle">Profile Image</div>
              <div class="subtitle-2">Drop you files here</div>
            </div>
          </div>
          <div class="flex col content-card">
            <div style="width: 100%">
              <div class="form-elt q-pb-lg">
                <div class="subtitle q-pb-sm">User Name</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="model"
                    label="Enter Name"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
              <div class="flex q-gutter-md">
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">First Name</div>
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Enter First Name"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Last Name</div>
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Enter Last Name"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="flex q-gutter-md">
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Email</div>
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Enter Email"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Phone</div>
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Enter Phone"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
      <q-toolbar class="header-btn q-pr-none q-pl-none">
        <div class="title">Additional Information</div>
      </q-toolbar>
      <q-card class="card-user bg-transparent" flat style="border-radius: 10px">
        <div class="wrap-card q-pt-lg q-pb-lg flex flex-center bg-white">
          <div class="flex col content-card">
            <div style="width: 100%">
              <div class="subtitle q-pb-sm">Date of Birth</div>
              <div class="q-pb-lg flex q-gutter-md">
                <div class="form-elt col">
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Day"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
                <div class="form-elt col">
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Month"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
                <div class="form-elt col">
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Year"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="q-pb-lg flex q-gutter-md">
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Country</div>
                  <div class="">
                    <q-select
                      :options="locations"
                      v-model="location"
                      label="Select Country"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">City</div>
                  <div class="">
                    <q-select
                      :options="sizes"
                      v-model="size"
                      label="Select City"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="q-pb-lg flex q-gutter-md">
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Address</div>
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Entrer Address"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="q-pb-lg flex q-gutter-md">
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Linkedin Profile Url</div>
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Entrer Url"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Web Site</div>
                  <div class="">
                    <q-input
                      type=""
                      v-model="model"
                      label="Web Site"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="q-pb-lg flex q-gutter-md">
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Country</div>
                  <div class="">
                    <q-select
                      :options="locations"
                      v-model="location"
                      label="Select Country"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-center q-gutter-lg">
                <div class="wrap-image flex flex-center col">
                  <div class="card-image">
                    <q-img src="~assets/local/file_copy.png" width="32px" />
                    <div class="subtitle">Profile Image</div>
                    <div class="subtitle-2">Drop you files here</div>
                  </div>
                </div>
                <div class="wrap-image flex flex-center col">
                  <div class="card-image">
                    <q-img src="~assets/local/file_copy.png" width="32px" />
                    <div class="subtitle">Profile Image</div>
                    <div class="subtitle-2">Drop you files here</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
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
.wrap-image {
  width: 300px;
  min-height: 300px;
  background: #f5f5f5;
  border: 1px dashed #b0b0b0;
  box-sizing: border-box;
  border-radius: 12px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.content-card .wrap-image{
    min-height: 200px;
}
.wrap-image .card-image {
  text-align: center;
}
.wrap-image .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #46516d;
}
.wrap-image .subtitle-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #838181;
}
.wrap-card {
  border-radius: 10px;
  width: 100%;
}
.content-card {
  padding-left: 40px;
  padding-right: 40px;
}
.wrap-card .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.wrap-card .q-input,
.wrap-card .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
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
.title {
  font-family: "inter";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: #46516d;
}
.header-btn {
  padding-bottom: 20px;
  padding-top: 45px;
}
.header-btn .q-btn {
  width: 178px;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.015em;
}

.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
