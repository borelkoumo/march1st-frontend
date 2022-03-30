<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar
        class="bg-none flex q-gutter-sm toolbar-submission"
        style="padding-top: 40px"
      >
        <q-select
          bg-color="white"
          dense
          :options="programs"
          v-model="program"
          label="Select Program Name"
          input-class="special-select"
          style="min-width: 400px"
          borderless
        />
        <q-select
          bg-color="white"
          dense
          :options="status"
          v-model="stat"
          style="min-width: 200px"
          borderless
        />
        <q-space />
        <q-btn label="Submissions" flat no-caps icon-right="import_export" />
      </q-toolbar>
      <div class="q-mt-lg">
        <submission-component
          :program="submission.program"
          class="submission-component cursor-pointer"
          v-for="submission in submissions"
          :key="submission.submission_title"
          @click.prevent="showDetails(submission)"
        >
          <template v-slot:header>
            <q-card-section class="q-pa-none" style="padding-bottom: 27px">
              <q-toolbar>
                <div class="box-badge">
                  <span class="title-badge">Submission Rejected</span>
                </div>
                <q-space />
                <div class="title-badge-2"><span>2 day ago, 3:45 pm</span></div>
              </q-toolbar>
              <div class="title">{{ submission.submission_title }}</div>
              <q-separator color="#E4E4E4" />
            </q-card-section>
          </template>
        </submission-component>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import submissionComponent from "../../components/submission-component.vue";

let allSubmissions = [];
export default {
  
  components: { submissionComponent },
  data() {
    return {
      programs: [],
      program: null,
      status: [
        { label: "All Type", value: 1 },
        { label: "New Report Submission", value: 2 },
        { label: "M1 Returned for clarifications", value: 3 },
        { label: "Resubmitted with clarifications", value: 4 },
        { label: "Passed triage", value: 5 },
        { label: "Client returned for clarification", value: 6 },
        { label: "Submission Accepted n", value: 7 },
        { label: "M1 made payment", value: 8 },
      ],
      stat: { label: "Any", value: 0 },

      submissions: [],
    };
  },
  watch:{
    program:function(val){
      this.submissions = [];
      allSubmissions.forEach((s)=>{
        if(s.program_id == val.value){
          this.submissions.push(s);
        }
      })
    }
  },
  computed: {
    ...mapState("dashboard", ["user"]),
    ...mapGetters("submission", ["getMySubmissions"]),
    ...mapGetters("program", ["getProgram","getPrograms"]),
  },
  methods: {
    async showDetails(submission) {
      let route = { name: "submission-detail", params: { id: submission.id } };
      if (this.user.typeUser !== "hacker") this.$router.push(route);
    },
  },
  async beforeMount() {
    try {
      allSubmissions = await this.getMySubmissions;
      this.submissions = allSubmissions;
      this.submissions.forEach((submission) => {
        let program = this.getProgram(submission.program_id);
        submission.program = program;
      });
      this.programs = this.getPrograms;
      this.programs.forEach((p)=>{
        p.label = p.title,
        p.value = p.id
      })
    } catch (error) {}
  },
};
</script>
<style>
.toolbar-submission .q-field--dense .q-field__label {
  padding-left: 15px;
}
.toolbar-submission .q-field__native {
  padding-left: 15px;
}
.toolbar-submission .special-select {
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 8px;
}

.submission-component .q-toolbar {
  padding-left: 0;
  padding-right: 0;
  min-height: 0;
}
.submission-component .title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;

  padding-top: 18px;
  padding-bottom: 15px;
}
.submission-component .title-badge {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #f55b5d;
}
.submission-component .title-badge-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.015em;
  color: #838181;
}
.submission-component .box-badge {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 16px;
  width: 169px;
  height: 26px;
  background: #f7d5d5;
  border-radius: 5px;
}
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
