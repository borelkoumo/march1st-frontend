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
                {{
                  getPublicPrograms.filter((program) =>
                    program.hackers.includes(this.user.id)
                  ).length
                }}
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
                {{
                  getPrivatePrograms.filter((program) =>
                    program.hackers.includes(this.user.id)
                  ).length
                }}
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
                {{
                  getPublicPrograms.filter((program) =>
                    program.hackers.includes(this.user.id)
                  ).length
                }}
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
                {{
                  getCashPrograms.filter((program) =>
                    program.hackers.includes(this.user.id)
                  ).length
                }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
            @click="goto(program.id)"
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

      showProgram: true, //verify if the length of program is > 0
      programs: [],
      checkPublic: true,
      checkPrivate: true,
      checkPoint: true,
      checkCash: true,
      isAllFilters: true,
      filterPrograms: [],
    };
  },
  watch: {
    isAllFilters: function (val) {
      if (val) {
        this.checkPublic = true;
        this.checkPrivate = true;
        this.checkPoint = true;
        this.checkCash = true;
        this.filterPrograms = this.programs;
      }
      this.checkAllFilters();
    },
    checkPublic: function (val) {
      this.checkAllFilters();
      if (val) {
        this.filterPrograms = this.programs.filter(
          (program) => program.program_type == "public"
        );
        if (this.checkPrivate) this.filterPrograms = this.programs;
      } else {
        if (this.checkPrivate)
          this.filterPrograms = this.getPrivatePrograms.filter((program) =>
            program.hackers.includes(this.user.id)
          );
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
        this.filterPrograms = this.programs.filter(
          (program) => program.program_type == "private"
        );
        if (this.checkPublic) this.filterPrograms = this.programs;
      } else {
        if (this.checkPublic)
          this.filterPrograms = this.getPublicPrograms.filter((program) =>
            program.hackers.includes(this.user.id)
          );
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
        this.filterPrograms = this.programs.filter(
          (program) => program.reward_type == "points"
        );
        if (this.checkCash) this.filterPrograms = this.programs;
      } else {
        if (this.checkCash)
          this.filterPrograms = this.getCashPrograms.filter((program) =>
            program.hackers.includes(this.user.id)
          );
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
        this.filterPrograms = this.programs.filter(
          (program) => program.reward_type == "cash"
        );
        if (this.checkPoint) this.filterPrograms = this.programs;
      } else {
        if (this.checkPoint)
          this.filterPrograms = this.getPointOnlyPrograms.filter((program) =>
            program.hackers.includes(this.user.id)
          );
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
    ...mapState("program", ["myPrograms"]),
    ...mapGetters("program", [
      "getClientPrograms",
      "getPublicPrograms",
      "getPrivatePrograms",
      "getCashPrograms",
      "getPointOnlyPrograms",
      "getMyPrograms",
    ]),
    totalProgram: function () {
      return (
        this.getPublicPrograms.filter(
          (program) => program.program_type == "private"
        ).length +
        this.getPrivatePrograms.filter(
          (program) => program.program_type == "private"
        ).length
      );
    },
    running: function () {
      return this.filterPrograms.filter((program) => program.is_closed == 0);
    },
    closed: function () {
      return this.filterPrograms.filter((program) => program.is_closed == 1);
    },
  },
  methods: {
    checkAllFilters() {
      this.isAllFilters =
        this.checkPublic &&
        this.checkPrivate &&
        this.checkPoint &&
        this.checkCash;
    },
    goto(id){
      this.$router.push('/main/program-detail/' +id)
    }
  },
  async beforeMount() {
    this.programs = await this.getMyPrograms;
    this.filterPrograms = this.programs;
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
