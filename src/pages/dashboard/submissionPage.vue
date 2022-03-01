<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar class="bg-none flex q-gutter-sm" style="padding-top: 40px">
        <q-select
          bg-color="white"
          filled
          dense
          :options="programs"
          v-model="program"
          label="Select Program Name"
          style="min-width: 400px"
        />
        <q-select
          bg-color="white"
          filled
          dense
          :options="status"
          v-model="stat"
          label="Status"
          style="min-width: 200px"
        />
        <q-space />
        <q-btn label="Submissions" flat no-caps icon-right="lock" />
      </q-toolbar>
      <div class="q-mt-lg">
        <submission-component :submission="null" class="submission-component">
          <template v-slot:header>
            <q-card-section class="q-pa-none" style="padding-bottom: 27px">
              <q-toolbar>
                <div class="box-badge">
                  <span class="title-badge">Submission Rejected</span>
                </div>
                <q-space />
                <div class="title-badge-2"><span>2 day ago, 3:45 pm</span></div>
              </q-toolbar>
              <div class="title">Submission title Submission</div>
              <q-separator color="#E4E4E4" />
            </q-card-section>
          </template>
        </submission-component>
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
.submission-component .q-toolbar {
  padding-left: 0;
  padding-right: 0;
  min-height: 0;
}
.submission-component .title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;

  padding-top: 18px;
  padding-bottom: 15px;
}
.submission-component .title-badge {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #f55b5d;
}
.submission-component .title-badge-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.015em;
  color: #838181;
}
.submission-component .box-badge {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 16px;
  width: 169px;
  height: 26px;
  background: #f7d5d5;
  border-radius: 5px;
}
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
