<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar class="bg-none flex q-gutter-sm" style="padding-top:40px">
        <q-select
            bg-color="white"
            filled
            dense
            :options="programs"
            v-model="program"
            label="Select Program Name"
            style="min-width:400px"
          />
          <q-select
            bg-color="white"
            filled
            dense
            :options="status"
            v-model="stat"
            label="Status"
            style="min-width:200px"
          />
        <q-space />
        <q-btn label="Submissions" flat no-caps icon-right="lock"/>
      </q-toolbar>
      <div class="q-mt-lg">
        <submission-component :submission="null"></submission-component>
      </div>
    </div>
  </q-page>
</template>
<script>
import submissionComponent from "../../components/submission-component.vue";
export default {
  components: { submissionComponent },
  data() {
    return {
      programs: [{ label: "dfdffdf", value: "1" }],
      program: null,
      status: [{ label: "fgfgfgfg", value: "3" }],
      stat: null,
    };
  },
};
</script>
<style>
.title-submission {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  color: #1b2559;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
