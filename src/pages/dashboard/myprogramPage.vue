<template>
  <q-page class="bg-home" v-if="programs.length > 0">
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

        <q-btn label="Most Recent" flat no-caps icon-right="import_export" />
      </q-toolbar>
      <div class="q-mt-lg">
        <div class="q-pb-sm head-title">Running ({{ running.length }})</div>
        <q-separator />
        <div
          class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 15px;
          "
        >
          <program-component-2
            :program="program"
            v-for="program in running"
            :key="program.title"
            class="cursor-pointer"
          />
        </div>
      </div>
      <div class="q-mt-lg">
        <div class="q-pb-sm head-title">Closed ({{ closed.length }})</div>
        <q-separator />
        <div
          class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 15px;
          "
        >
          <program-component-2
            :program="program"
            v-for="program in closed"
            :key="program.title"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div class="main-content">
      <q-img src="~assets/empty-program.svg" width="600px" />
      <div class="title-1">Not joined any programs</div>
      <div class="subtitle-1">
        Currently you have not yet joined any programs
      </div>
      <div class="flex flex-center">
        <q-btn
          label="Browse Programs"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="/main/all-programs"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import programComponent2 from "../../components/program-component-2.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: { programComponent2 },
  data() {
    return {
      search: null,
      filters: [{ label: "fgfgfgfg", value: "3" }],
      filter: null,
      showProgram: true, //verify if the length of program is > 0
      programs: [],
      running: [],
      closed: [],
    };
  },
  computed: {
    ...mapState("program", ["myPrograms"]),
    ...mapGetters("program", ["getMyPrograms"]),
  },
  async beforeMount() {
    this.programs = await this.getMyPrograms;
    if (this.programs.length > 0) {
      this.programs.forEach((p) => {
        if (p.is_closed == 0) {
          this.running.push(p);
        } else {
          this.running.push(p);
        }
      });
    }
  },
};
</script>
<style scoped>
.title-1 {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 34px;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;
  color: #171717;
  padding-top: 50px;
  padding-bottom: 12px;
}
.subtitle-1 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  align-items: center;
  text-align: center;
  color: #767676;
  padding-bottom: 12px;
}
.title-btn {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  width: 338px;
}
.q-toolbar {
  padding-left: 0px;
  padding-right: 0px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
.head-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
</style>
