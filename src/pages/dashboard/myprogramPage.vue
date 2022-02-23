<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar class="bg-none flex q-gutter-sm" style="padding-top: 40px">
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
        <q-btn label="Most Recent" flat no-caps icon-right="lock" />
      </q-toolbar>
      <div class="q-mt-lg">
        <div class="q-pb-sm head-title">Running (5)</div>
        <q-separator />
        <div
          class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 15px;
          "
        >
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
        </div>
      </div>
      <div class="q-mt-lg">
        <div class="q-pb-sm head-title">Closed (5)</div>
        <q-separator />
        <div
          class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 15px;
          "
        >
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
          <program-component-2 :program="null" ></program-component-2>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import programComponent2 from "../../components/program-component-2.vue";
export default {
  components: { programComponent2 },
  data() {
    return {
      search: null,
      filters: [{ label: "fgfgfgfg", value: "3" }],
      filter: null,
    };
  },
};
</script>
<style scoped>
.q-toolbar{
    padding-left:0px;
    padding-right:0px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
.head-title {
  font-family: 'inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
</style>
