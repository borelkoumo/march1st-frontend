<template>
  <q-page class="bg-home" v-if="program">
    <div class="main-content">
      <q-toolbar class="header">
        <q-toolbar-title class="title-header">Main Definition</q-toolbar-title>
        <q-space />
        <router-link
        v-if="getUser.role === 'hacker' && hasJoinProgram"
        :to="'/new-dashboard/submissions/add-submission/'+program.id"
        style="text-decoration:none"
        >
          <q-btn
            class="bg-white q-mr-lg"
            outline
            color="secondary"
            label="Submit a Report"
            no-caps

          />
        </router-link>
        <q-btn
          class="bg-secondary text-white"
          no-caps
          flat
          label="Edit"
          :to="'/new-dashboard/programs/edit-program/' + program.id"
          v-if="getUser.role == 'client'
          && program.company == getUser.company.id
          && getUser.type==='super_manager'"
        />
      </q-toolbar>
      <div class="grid-content q-pt-lg q-pb-lg">
        <div class="">
          <program-component :program="program" style="border-radius: 16px" />
          <div class="grid-element" style="padding-top: 16px">
            <q-card
              class="my-card"
              style="
                border-radius: 16px;
                padding-top: 20px;
                padding-bottom: 20px;
              "
              flat
            >
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="~assets/local/card/shadow-harbor.png" />
                  </q-avatar>
                </q-item-section>

                <q-item-section style="padding-left: 18px">
                  <q-item-label class="caption-element"
                    >Harbour Type</q-item-label
                  >
                  <q-item-label class="title-element q-pt-xs">{{
                    program.safe_harbour_type.charAt(0).toUpperCase() +
                    program.safe_harbour_type.slice(1)
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-card
              class="my-card"
              style="
                border-radius: 16px;
                padding-top: 20px;
                padding-bottom: 20px;
              "
              flat
            >
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="~assets/local/card/shadow-reward.png" />
                  </q-avatar>
                </q-item-section>

                <q-item-section style="padding-left: 18px">
                  <q-item-label class="caption-element"
                    >Reward Type</q-item-label
                  >
                  <q-item-label class="title-element q-pt-xs">{{
                    program.reward_type.charAt(0).toUpperCase() +
                    program.reward_type.slice(1)
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-card
              class="my-card"
              style="
                border-radius: 16px;
                padding-top: 20px;
                padding-bottom: 20px;
              "
              flat
            >
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="~assets/local/card/shadow-type.png" />
                  </q-avatar>
                </q-item-section>

                <q-item-section style="padding-left: 18px">
                  <q-item-label class="caption-element"
                    >Program Type</q-item-label
                  >
                  <q-item-label class="title-element q-pt-xs">{{
                    program.program_type.charAt(0).toUpperCase() +
                    program.program_type.slice(1)
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div>
            <q-list class="bg-white q-mt-md" style="border-radius: 16px">
              <q-item>
                <q-item-section class="first-element">P1</q-item-section>
                <q-item-section class="second-element">Critical</q-item-section>
                <q-item-section class="third-element"
                ><span v-if="program.reward_type==='cash'">$</span> {{ program.critical.min }} - <span v-if="program.reward_type==='cash'">$</span>
                  {{ program.critical.max }}<span v-if="program.reward_type==='points'"> Points</span> Per vulnerability</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="first-element">P2</q-item-section>
                <q-item-section class="second-element">Severe</q-item-section>
                <q-item-section class="third-element"
                  ><span v-if="program.reward_type==='cash'">$</span> {{ program.severe.min }} - <span v-if="program.reward_type==='cash'">$</span>
                  {{ program.severe.max }}<span v-if="program.reward_type==='points'"> Points</span> Per vulnerability</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="first-element">P3</q-item-section>
                <q-item-section class="second-element">Medium</q-item-section>
                <q-item-section class="third-element"
                  ><span v-if="program.reward_type==='cash'">$</span> {{ program.medium.min }} - <span v-if="program.reward_type==='cash'">$</span>
                  {{ program.medium.max }}<span v-if="program.reward_type==='points'"> Points</span> Per vulnerability</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="first-element">P4</q-item-section>
                <q-item-section class="second-element">Low</q-item-section>
                <q-item-section class="third-element"
                  ><span v-if="program.reward_type==='cash'">$</span> {{ program.low.min }} - <span v-if="program.reward_type==='cash'">$</span>
                  {{ program.low.max }}<span v-if="program.reward_type==='points'"> Points</span> Per vulnerability</q-item-section
                >
              </q-item>
            </q-list>
          </div>
          <div class="q-pt-md">
            <div class="bg-white q-pa-md q-pb-lg" style="border-radius: 16px">
              <div class="description-title q-pt-md q-pb-md">
                Detailed Description
              </div>
              <div class="description-subtitle q-pt-sm q-pb-sm">
                Program Guidelines
              </div>
              <q-card class="my-card shadow-3">
                <q-card-section class="description-content">
                  {{ program.program_guidelines_1 }}
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div>
          <submission-level
            :submissions="program.submissions"
            :progress="progress"
            class="q-pa-md"
            style="border-radius: 16px"
          />
          <div class="q-pt-lg">
            <q-card flat style="border-radius: 16px" class="card-recent">
              <q-card-section class="recent-title"
                >Recent Submissions</q-card-section
              >
              <q-separator />
              <div
                v-for="submission in program.submissions"
                :key="submission.id"
                class="cursor-pointer"
              >
                <q-card-section class="q-pt-none">
                  <div class="recent-time">2 day ago , 3:45 pm</div>
                  <div class="recent-content q-pb-md">
                    {{ submission.submission_title }}
                  </div>
                  <q-btn
                    flat
                    no-caps
                    :label="submission.submission_status"
                    style="
                      background: #fff5d9;
                      color: #ffbb38;
                      width: 100%;
                      font-family: 'inter';
                    "
                  />
                </q-card-section>
                <q-separator />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import programComponent from '../components/ProgramComponent.vue';
import submissionLevel from '../components/SubmissionLevel.vue';
import { mapGetters,mapActions } from 'vuex'
export default {
  components:{
    programComponent,
    submissionLevel
  },
  data() {
    return {
      idProgram:null,
      program:null,
      progress: [0.8, 0.2, 0.1]
    }
  },
  watch:{
    "$route.params.id":function(val){
      console.log(val);
    }
  },
  computed: {
    ...mapGetters('auth',[
      'getUser'
    ]),
    ...mapGetters('program',[
      'getOneProgram'
    ]),
    hasJoinProgram:function(){
      //const program = this.getOneProgram(this.idProgram);
      const program = this.program;
      if(program.hackers.includes(""+this.getUser.hacker.id)) return true;
      return false;
    }
  },
  methods: {
    ...mapActions('program',[
      'GET_ONE_PROGRAM'
    ])
  },
  async beforeMount(){
    try {
      this.$q.loading.show();
      this.idProgram = this.$route.params.id;
      this.program = await this.GET_ONE_PROGRAM(this.idProgram);
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-item {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.3px;
  color: #767676;
}
.active-badge {
  width: 85px;
  height: 22px;
  background: rgba(255, 172, 50, 0.1);
  border-radius: 100px;
  color: #ffb648;
}
.item-element .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.item-element .title {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: #1b2559;
}
.q-list .item-header {
  background: #eff0f6;
  box-shadow: 0px 1px 0px #dadbe4;
}
.card-invite {
  border-radius: 16px;
}
.q-card {
  border-radius: 16px;
}
.card-invite .q-toolbar {
  max-height: 10px;
}
.card-invite .toolbar .q-input {
  background: #fbfbfb;
  border-radius: 8px;
  min-width: 45%;
  padding-left: 15px;
  padding-right: 15px;
}
.card-description {
  border-radius: 16px;
}
.card-description .title {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.card-description .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.card-description .q-input {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.item-amount .first-element {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.item-amount .second-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.item-amount .q-input {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.item-amount .q-field__control {
  height: 32px;
}
.radio-element .q-radio,
.radio-element .q-toggle {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #a3aed0;
}
.radio-element div {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.title-card {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
  padding-bottom: 25px;
}
.subtitle-card {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.recent-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.recent-time {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 38px;
  letter-spacing: -0.015em;
  color: #838181;
}
.recent-content {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: rgba(0, 0, 0, 0.7);
}
.description-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.description-subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.description-content {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.first-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
  max-width: 13%;
}
.second-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 38px;
  letter-spacing: -0.015em;
  color: #46516d;
  max-width: 20%;
}
.third-element {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
  display: inline;
}
.caption-element {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #a3aed0;
}
.title-element {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.header .q-btn {
  min-width: 164px;
}
.header .title-header {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
}
.grid-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 24px;
}
.grid-element {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
}
</style>
