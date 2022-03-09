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
          <div class="form-elt col">
            <div class="subtitle q-pb-sm">Status</div>
            <div class="">
              <q-select
                :options="status"
                v-model="stat"
                label="Select Status"
                borderless
                class="q-pl-sm q-pr-sm select-input"
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
      </q-card>
      <q-card class="card-list q-pa-lg q-pb-lg q-mt-lg" flat>
        <div class="q-pr-md q-pl-md">
          <q-toolbar>
            <div>Client</div>
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
          <q-list bordered>
            <q-item>
              <q-item-section
                class="flex flex-center"
                style="max-width: 30px"
              ></q-item-section>
              <q-item-section>
                  Clients
              </q-item-section>
              <q-item-section>
                  Type <span><q-icon name="import_export"/></span>
              </q-item-section>
              <q-item-section>
                  Date <q-icon name="import_export"/>
              </q-item-section>
              <q-item-section>
                  Actions
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
      username: null,
      userId: null,
      status: [],
      stat: null,
      locations: [],
      location: null,
      search: null,
    };
  },
};
</script>
<style scoped>
.card-list .q-toolbar {
  padding-left: 0;
  padding-right: 0;
}
.card-list {
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
