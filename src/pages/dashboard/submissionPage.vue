<template>
  <!-- <q-page v-if="submissions.length <=0 && allSubmissions.length===0" class="flex flex-center">
    <div class="main-content">
      <q-img src="~assets/empty-program.svg" width="600px" />
      <div class="title-1">No submission</div>
      <div class="subtitle-1">You have no submissions</div>
      <div class="flex flex-center">
        <q-btn
          v-if="user.typeUser == 'hacker'"
          label="Back to my programs"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="/main/my-programs/"
        />
        <q-btn
          v-else
          label="Back to my programs"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="/main/programs/"
        />
      </div>
    </div>
  </q-page> -->
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
        <q-btn label="Submissions" flat no-caps icon-right="import_export" @click="isSorting=!isSorting"/>
      </q-toolbar>
      <div class="q-mt-lg" v-if="submissions.length > 0">
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
                  <span class="title-badge">{{
                    submission.submission_status
                  }}</span>
                </div>
                <q-space />
                <div class="title-badge-2"><span>2 day ago, 3:45 pm</span></div>
              </q-toolbar>
              <div class="title">{{ submission.submission_title }}</div>
              <q-separator color="#E4E4E4" />
            </q-card-section>
          </template>
        </submission-component>
        <div class="q-pa-lg flex flex-center">
          <q-pagination v-model="page" :max="totalPage" v-if="totalPage>1" color="secondary" />
        </div>
      </div>
      <div v-else class="flex flex-center">
        <div class="">
          <q-img src="~assets/empty-program.svg" width="600px" />
          <div class="title-1">No submission</div>
          <div class="subtitle-1">You have no submissions</div>
        </div>
        <div class="q-pa-lg flex flex-center" v-if="totalPage>1">
          <q-pagination v-model="page" :max="totalPage" color="secondary" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
import submissionComponent from "../../components/submission-component.vue";
import {compareAsc, compareDesc} from "pages/utils/sorting";

let allSubmissions = [];
export default {
  components: { submissionComponent },
  data() {
    return {
      isSorting:false,

      page: 1,
      pageSize: 10,
      total: 0,
      totalPage: 0,

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
  watch: {
    isSorting:function(val){
      if(val){
        this.submissions.sort(compareAsc);
      }
      else{
        this.submissions.sort(compareDesc);
      }
    },
    program: function (val) {
      this.submissions = [];
      if (val.value === 0) {
        this.submissions = allSubmissions;
      } else {
        allSubmissions.forEach((s) => {
          if (s.program.id === val.value) {
            this.submissions.push(s);
          }
        });
      }
    },
    page: async function (val) {
      try {
        this.$q.loading.show();
        let submissionsWithPagination = await this.mySubmissions({
          page: val,
          pageSize: this.pageSize,
        });
        allSubmissions = submissionsWithPagination.submissions;
        this.total = submissionsWithPagination.pagination.total;
        //console.log(this.program);
        if (this.program && this.program.value!==0) {
          this.submissions = [];
          allSubmissions.forEach((s) => {
            if (s.program.id == program.value) {
              this.submissions.push(s);
            }
          });
        } else {
          this.submissions = allSubmissions;
        }
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
      }
    },
  },
  computed: {
    ...mapState("dashboard", ["user"]),
    ...mapGetters("submission", ["getMySubmissions", "getStatusSubmission"]),
    ...mapGetters("program", ["getProgram", "getMyPrograms"]),
    totalPage() {
      //let entier;
      if(this.total/this.pageSize<1) return 1;
      if (this.total % this.pageSize === 0) return this.total / this.pageSize;
      else return this.total / this.pageSize + 1;
    },
  },
  methods: {
    ...mapActions("submission", ["mySubmissions"]),
    async showDetails(submission) {
      let route = { name: "submission-detail", params: { id: submission.id } };
      //if (this.user.typeUser !== "hacker")
      this.$router.push(route);
    },
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      let submissionsWithPagination = await this.mySubmissions({
        page: this.page,
        pageSize: this.pageSize,
      });
      allSubmissions = submissionsWithPagination.submissions;
      this.total = submissionsWithPagination.pagination.total;

      this.submissions = JSON.parse(JSON.stringify(allSubmissions));

      this.programs.push({ id: 0, label: "All Programs", value: 0 });
      this.programs = this.programs.concat(
        this.getMyPrograms.map(function (p) {
          let program = {
            id: p.id,
            label: p.program_title,
            value: p.id,
          };
          return program;
        })
      );

      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
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
  min-width: 169px;
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
