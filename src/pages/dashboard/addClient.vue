<template>
  <q-page class="bg-home q-pt-lg">
    <div class="main-content">
      <q-card class="card-user bg-transparent" flat style="border-radius:10px;">
        <div class="wrap-card q-pa-lg flex flex-center bg-white">
          <div class="wrap-image"></div>
          <div class="flex col q-pl-lg q-pr-lg">
            <div style="width:100%;">
              <div class="form-elt q-pb-lg">
                <div class="subtitle q-pb-sm">Company Name</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="model"
                    label="Enter Target"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
              <div class="flex q-gutter-md">
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Location</div>
                  <div class="">
                    <q-select
                      :options="locations"
                      v-model="location"
                      label="Select Location"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
                <div class="form-elt col">
                  <div class="subtitle q-pb-sm">Size</div>
                  <div class="">
                    <q-select
                      :options="sizes"
                      v-model="size"
                      label="Select Size"
                      borderless
                      class="q-pl-sm q-pr-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-card-actions align="right" class="q-pt-lg q-gutter-md btn-actions">
            <q-btn label="Cancel" no-caps outline color="secondary"/>
            <q-btn label="Add Client" no-caps flat class="bg-secondary text-white"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
    data() {
        return {
            model:null,
            size:{label:"Sample", value:1},
            location:{label:"Sample", value:1},
            sizes:[{label:"Sample", value:1}],
            locations:[{label:"Sample", value:1}]
        }
    },
};
</script>
<style scoped>
.wrap-image{
    width: 300px;
}
.wrap-card{
    border-radius:10px;
    width:100%;
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
.wrap-card .q-input, .wrap-card .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.btn-actions .q-btn{
    width: 160px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
