<template>
  <q-page class="bg-home">
    <q-toolbar class="bg-white q-pl-lg q-pr-lg">
      <q-toolbar-title class="title-submission">Submissions</q-toolbar-title>
      <q-space />
      <q-btn-dropdown
        class="btn-dropdown bg-none q-pl-sm q-mr-xs"
        dense
        :label="language.value"
        flat
      >
        <q-list style="min-width: 150px" separator>
          <q-item
            class="q-pt-sm q-pb-sm"
            clickable
            v-close-popup
            @click="language.value = 'EN'"
          >
            <q-item-section>
              <q-img src="flag1.png" width="40px" />
            </q-item-section>
            <q-item-section>
              <q-item-label>English</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            class="q-pt-sm q-pb-sm"
            clickable
            v-close-popup
            @click="language.value = 'AR'"
          >
            <q-item-section>
              <q-img src="flag2.png" width="40px" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Arabe</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
    <div class="main-content">
      <q-toolbar class="bg-none" style="padding-top:40px">
        <div
          class="q-gutter-sm flex"
        >
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
        </div>
        <q-space />
        <q-btn label="Submissions" flat no-caps icon-right="straight"/>
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
      language: {
        label: "English",
        value: "EN",
      },
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
