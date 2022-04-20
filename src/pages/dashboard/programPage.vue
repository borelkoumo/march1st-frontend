<template>
  <q-page class="bg-home" v-if="getMyPrograms.length > 0">
    <div class="main-content">
      <q-toolbar
        class="bg-none flex q-gutter-sm q-pl-none q-pr-none"
        style="padding-top: 40px"
      >
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
          label="Filters"
          multiple
          emit-value
          map-options
          style="min-width: 200px"
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section side>
                <q-checkbox
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                />
              </q-item-section>
              <q-item-section>
                <div class="flex no-wrap">
                  <q-item-label v-html="opt.label" />
                  <span class="q-pl-md">{{ getLength(opt.value) }}</span>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-space />
        <q-btn
          label="Create Program"
          no-caps
          flat
          class="bg-secondary text-white"
          to="/main/add-program"
        />
        <q-btn label="Submissions" flat no-caps icon-right="import_export" />
      </q-toolbar>
      <div class="q-mt-lg q-gutter-md q-pb-lg">
        <program-component
          :program="program"
          v-for="program in filterPrograms"
          :key="program.id"
          class="cursor-pointer"
          @click.stop="goto(program.id)"
        >
          <template v-slot:level>
            <q-card-section class="col-3 q-pl-lg q-pr-none">
              <submission-level
                :submissions="program.submissions"
                :progress="progress"
              />
            </q-card-section>
          </template>
        </program-component>
      </div>
    </div>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div class="main-content">
      <q-img src="~assets/empty-program.svg" width="600px" />
      <div class="title-1">Not have any programs</div>
      <div class="subtitle-1">
        Currently you have not yet create any programs
      </div>
      <div class="flex flex-center">
        <q-btn
          label="Create a program"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="/main/add-program"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import ProgramComponent2 from "../../components/program-component-2.vue";
import programComponent from "../../components/program-component.vue";
import SubmissionLevel from "../../components/submission-level.vue";

import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: { programComponent, ProgramComponent2, SubmissionLevel },
  data() {
    return {
      search: null,
      filters: [
        { label: "Public", value: "1" },
        { label: "Private", value: "2" },
        { label: "Points Only", value: "3" },
        { label: "Reward", value: "4" },
      ],
      filter: null,
      progress: [0.8, 0.2, 0.1],
      filterPrograms: [],
    };
  },
  watch: {
    filter: function (val) {
      //this.filterPrograms=this.programs;
      //console.log(Object.keys(val));
      let data = [];
      Object.keys(val).forEach((key) => {
        data.push(val[key]);
      });
      if (data.includes(1)) {
        this.filterPrograms = this.getPublicPrograms;
        if (data.includes(2))
        this.filterPrograms = this.filterPrograms.concat(
          this.getPrivatePrograms
        );
      }
      else{
        if (data.includes(2))
        this.filterPrograms = this.getPrivatePrograms;
      }
      
      if (data.includes(3)) {
        this.filterPrograms = this.filterPrograms.filter(
          (program) => program.reward_type == "points"
        );
        if (data.includes(4))
          this.filterPrograms = this.filterPrograms.concat(
            this.filterPrograms.filter(
              (program) => program.reward_type == "cash"
            )
          );
      }
      else{
        if (data.includes(4))
          this.filterPrograms = this.filterPrograms.filter(
          (program) => program.reward_type == "cash"
        );
      }

      /* Object.keys(val).forEach((key) => {
        if (val[key] == 1) {
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.program_type == "public"
          );
        } else if (val[key] == 2) {
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.program_type == "private"
          );
        } else if (val[key] == 3) {
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.reward_type == "points"
          );
        } else {
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.reward_type == "cash"
          );
        }
      }); */
    },
  },
  computed: {
    ...mapState("program", ["programs"]),
    ...mapGetters("program", [
      "getClientPrograms",
      "getPublicPrograms",
      "getPrivatePrograms",
      "getRewardPrograms",
      "getPointOnlyPrograms",
      "getMyPrograms"
    ]),
  },
  methods: {
    getLength(element) {
      let val = 0;
      switch (element) {
        case "1":
          val = this.getPublicPrograms.length;
          break;
        case "2":
          val = this.getPrivatePrograms.length;
          break;
        case "3":
          val = this.getPointOnlyPrograms.length;
          break;
        case "4":
          val = this.getRewardPrograms.length;
          break;
      }
      return val;
    },
    goto(id) {
      let route = { name: "program-detail", params: { id: id } };
      this.$router.push(route);
    },
  },
  beforeMount() {
    //this.programs = this.getClientPrograms;
    this.filterPrograms = this.getMyPrograms;
  },
  async mounted() {
    //console.log(this.getClientPrograms);
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
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
