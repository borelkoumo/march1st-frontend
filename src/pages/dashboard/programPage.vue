<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar class="bg-none flex q-gutter-sm q-pl-none q-pr-none" style="padding-top: 40px">
        <q-input
          dense
          bg-color="white"
          filled
          v-model="search"
          input-class="text-right"
          class=""
          style="min-width: 400px"
        >
          <template v-slot:prepend> Search </template>
          <template v-slot:append>
            <q-icon v-if="search === null" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = null"
            />
          </template>
        </q-input>
        <q-select
          bg-color="white"
          filled
          dense
          :options="filters"
          v-model="filter"
          label="Filter"
          style="min-width: 200px"
        />
        <q-space />
        <q-btn
          label="Create Program"
          no-caps
          flat
          class="bg-secondary text-white"
        />
        <q-btn label="Submissions" flat no-caps icon-right="lock" />
      </q-toolbar>
      <div class="q-mt-lg q-gutter-md q-pb-lg">
        <program-component :program="null">
          <template v-slot:level>
            <q-card-section class="col-3 q-pl-lg q-pr-none">
              <submission-level :progress="progress" />
            </q-card-section>
          </template>
        </program-component>
        <program-component :program="null">
          <q-card-section class="col-3 q-pl-lg q-pr-none">
            <submission-level :progress="progress" />
          </q-card-section>
        </program-component>
      </div>
    </div>
  </q-page>
</template>
<script>
import ProgramComponent2 from "../../components/program-component-2.vue";
import programComponent from "../../components/program-component.vue";
import SubmissionLevel from '../../components/submission-level.vue';
export default {
  components: { programComponent, ProgramComponent2, SubmissionLevel },
  data() {
    return {
      search: null,
      filters: [{ label: "fgfgfgfg", value: "3" }],
      filter: null,
      progress: [0.8, 0.2, 0.1],
    };
  },
};
</script>
<style scoped>
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
