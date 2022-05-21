<template>
  <q-page class="bg-home" v-if="getMyPrograms.length > 0 || search != null">
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
        <q-btn-dropdown
          class="bg-white text-dark"
          flat
          label="Filters"
          style="min-width: 200px"
        >
          <q-list dense>
            <q-item clickable v-close-popup @click="onFilterClick(0)">
              <q-item-section side>
                <q-checkbox v-model="isAllFilters" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>All</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ totalProgram }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="checkPublic = !checkPublic">
              <q-item-section side>
                <q-checkbox v-model="checkPublic" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Public</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getPublicPrograms.length }}
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="checkPrivate = !checkPrivate"
            >
              <q-item-section side>
                <q-checkbox v-model="checkPrivate" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Private</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getPrivatePrograms.length }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="checkPoint = !checkPoint">
              <q-item-section side>
                <q-checkbox v-model="checkPoint" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Points Only</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getPublicPrograms.length }}
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="checkCash = !checkCash">
              <q-item-section side>
                <q-checkbox v-model="checkCash" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cash Only</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getCashPrograms.length }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-space />
        <q-btn
          label="Create Program"
          no-caps
          flat
          class="bg-secondary text-white"
          to="/main/add-program"
          v-if="user.typeUser === 'client' && user.role==='super_manager'"
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
        <!-- :submissions="getSubmissionsProgram(program.id)" -->
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

      progress: [0.8, 0.2, 0.1],
      filterPrograms: [],

      filters: ["1", "2", "3", "4"],
      checkPublic: true,
      checkPrivate: true,
      checkPoint: true,
      checkCash: true,
      isAllFilters: true,
    };
  },
  watch: {
    search: function (val) {
      if (val != null) {
        val = val.trim();
        this.filterPrograms = this.getMyPrograms.filter(
          (p) => p.program_title.toLowerCase().search(val.toLowerCase()) != -1
        );
        
      }

      /* console.log(this.programs); */
    },
    isAllFilters: function (val) {
      if (val) {
        this.checkPublic = true;
        this.checkPrivate = true;
        this.checkPoint = true;
        this.checkCash = true;
        this.filterPrograms = this.getMyPrograms;
      }
      this.checkAllFilters();
    },
    checkPublic: function (val) {
      this.checkAllFilters();
      if (val) {
        this.filterPrograms = this.getMyPrograms.filter(
          (program) => program.program_type == "public"
        );
        if (this.checkPrivate) this.filterPrograms = this.getMyPrograms;
      } else {
        if (this.checkPrivate) this.filterPrograms = this.getPrivatePrograms;
        else this.filterPrograms = [];
      }
      if (!(this.checkPoint && this.checkCash)) {
        if (this.checkPoint)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.reward_type == "points"
          );
        if (this.checkCash)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.reward_type == "cash"
          );
      }
    },
    checkPrivate: function (val) {
      this.checkAllFilters();
      if (val) {
        this.filterPrograms = this.getMyPrograms.filter(
          (program) => program.program_type == "private"
        );
        if (this.checkPublic) this.filterPrograms = this.getMyPrograms;
      } else {
        if (this.checkPublic) this.filterPrograms = this.getPublicPrograms;
        else this.filterPrograms = [];
      }
      if (!(this.checkPoint && this.checkCash)) {
        if (this.checkPoint)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.reward_type == "points"
          );
        if (this.checkCash)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.reward_type == "cash"
          );
      }
    },
    checkPoint: function (val) {
      this.checkAllFilters();
      if (val) {
        this.filterPrograms = this.getMyPrograms.filter(
          (program) => program.reward_type == "points"
        );
        if (this.checkCash) this.filterPrograms = this.getMyPrograms;
      } else {
        if (this.checkCash) this.filterPrograms = this.getCashPrograms;
        else this.filterPrograms = [];
      }
      if (!(this.checkPublic && this.checkPrivate)) {
        if (this.checkPublic)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.program_type == "public"
          );
        if (this.checkPrivate)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.program_type == "private"
          );
      }
    },
    checkCash: function (val) {
      this.checkAllFilters();
      if (val) {
        this.filterPrograms = this.getMyPrograms.filter(
          (program) => program.reward_type == "cash"
        );
        if (this.checkPoint) this.filterPrograms = this.getMyPrograms;
      } else {
        if (this.checkPoint) this.filterPrograms = this.getPointOnlyPrograms;
        else this.filterPrograms = [];
      }
      if (!(this.checkPublic && this.checkPrivate)) {
        if (this.checkPublic)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.program_type == "public"
          );
        if (this.checkPrivate)
          this.filterPrograms = this.filterPrograms.filter(
            (program) => program.program_type == "private"
          );
      }
    },
  },
  computed: {
    ...mapState("dashboard", ["user"]),
    ...mapState("program", ["programs"]),
    ...mapGetters("program", [
      "getClientPrograms",
      "getPublicPrograms",
      "getPrivatePrograms",
      "getCashPrograms",
      "getPointOnlyPrograms",
      "getMyPrograms",
      "getSubmissionsProgram",
    ]),
    ...mapGetters("submission", ["getSubmissionsProgram"]),
    totalProgram: function () {
      return this.getPublicPrograms.length + this.getPrivatePrograms.length;
    },
  },
  methods: {
    goto(id) {
      let route = { name: "program-detail", params: { id: id } };
      this.$router.push(route);
    },
    checkAllFilters() {
      this.isAllFilters =
        this.checkPublic &&
        this.checkPrivate &&
        this.checkPoint &&
        this.checkCash;
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
