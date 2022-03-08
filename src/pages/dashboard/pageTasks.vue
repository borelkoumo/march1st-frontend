<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar class="bg-none flex q-gutter-md" style="padding-top: 40px">
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">All</span>
          <span class="text-secondary q-pl-xs">120</span>
        </q-btn>
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">General</span>
          <span class="text-secondary q-pl-xs">12</span>
        </q-btn>
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">Submissions</span>
          <span class="text-secondary q-pl-xs">111</span>
        </q-btn>
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">Invitations</span>
          <span class="text-secondary q-pl-xs">111</span>
        </q-btn>
        <q-space />
        <q-btn
          dense
          no-caps
          label="Most recent"
          class="btn-filter q-pr-none"
          flat
          icon-right="import_export"
        />
      </q-toolbar>
      <div class="q-mt-lg q-gutter-lg q-pb-lg">
        <task-component>
          <template v-slot:image>
            <q-img src="~assets/local/unsplash_feXpdV001o4.png" width="130px" />
          </template>
        </task-component>
        <task-component>
          <template v-slot:image>
            <q-img src="~assets/local/unsplash_wrkNQmhmdvY.png" width="130px" />
          </template>
        </task-component>
        <task-component>
          <template v-slot:image>
            <q-img src="~assets/local/unsplash_feXpdV001o4.png" width="130px" />
          </template>
        </task-component>
      </div>
    </div>
  </q-page>
</template>
<script>
import TaskComponent from "../../components/task-component.vue";

export default {
  components: {
    TaskComponent,
  },
  data() {
    return {};
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
.btn-filter {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
.btn-element {
  background: #ffffff;
  border-radius: 40px;
  padding-left: 20px;
  padding-right: 20px;
}
.q-toolbar {
  padding: 0;
}
</style>
