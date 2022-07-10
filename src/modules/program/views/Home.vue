<template>
  <q-page class="flex flex-center" v-if="getMyPrograms.length <= 0">
    <div class="main-content">
      <q-img src="~assets/empty-program.svg" width="600px" />
      <div class="title-1">Not have any programs</div>
      <div class="subtitle-1" v-if="getUser.role==='client'">
        Currently you have not yet create any programs
      </div>
      <div class="subtitle-1" v-if="getUser.role==='hacker'">
        Currently you have not yet join any programs
      </div>
      <div class="flex flex-center">
        <q-btn
          label="Create a program"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="programs/add-program"
          v-if="getUser.role==='client' && getUser.type=='super_manager'"
        />
        <q-btn
          label="Browse all programs"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="programs/all-programs"
          v-else
        />
      </div>
    </div>
  </q-page>
  <q-page v-else class="bg-home q-pl-md q-pr-md">
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
          :options="getCompanies"
          v-model="company"
          label="All Companies"
          style="min-width: 200px"
          v-if="getUser.role=='march1st'"
        />
        <q-btn-dropdown
          class="bg-white text-dark"
          flat
          label="Filters"
          style="min-width: 200px"
        >
          <!--<q-list dense>
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
          </q-list>-->
        </q-btn-dropdown>
        <q-space />
        <q-btn
          label="Create Program"
          no-caps
          flat
          class="bg-secondary text-white"
          to="programs/add-program"
          v-if="getUser.role === 'client' && getUser.type==='super_manager'"
        />
        <q-btn label="Programs" flat no-caps icon-right="import_export" @click="isSorting=!isSorting"/>
      </q-toolbar>
      <div class="q-mt-lg q-gutter-md q-pb-lg" v-if="getUser.role==='client' || getUser.role==='march1st'">
        <program-component v-for="program in getMyPrograms" :key="program.id" :program="program">
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
      <div class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
            grid-gap: 15px;
          "
          v-if="getUser.role==='hacker'">
        <program-card-component
            :program="program"
            v-for="program in getMyPrograms"
            :key="program.id"
            class="cursor-pointer"
          />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import programComponent from '../components/ProgramComponent.vue';
import programCardComponent from '../components/ProgramCardComponent.vue';
import submissionLevel from '../components/SubmissionLevel.vue';
export default {
  components: { programComponent,programCardComponent, submissionLevel },
  data() {
    return {
      search:null,
      isSorting:false,
      company:null,

      progress: [0.8, 0.2, 0.1],
    };
  },
  computed: {
    ...mapGetters("program", ["getMyPrograms"]),
    ...mapGetters('auth',[
      'getUser',
      'getCompanies'
    ])
  },
  methods: {},
  async beforeMount() {
    //console.log(localStorage.getItem('programs'))
  },
};
</script>

<style lang="scss" scoped>
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
