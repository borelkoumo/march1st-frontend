<template>
  <q-page class="bg-home q-pl-md q-pr-md">
    <q-toolbar
      class="bg-none flex q-gutter-sm toolbar-submission"
      style="padding-top: 40px"
    >
      <q-select
        bg-color="white"
        filled
        dense
        :options="selectAllPrograms"
        v-model="selectProgram"
        label="Select Program Name"
        style="min-width: 400px"
        borderless
      />
      <q-select
        bg-color="white"
        dense
        filled
        label="Select Status"
        :options="allStatus"
        v-model="selectStatus"
        style="min-width: 200px"
        borderless
      />
      <q-space />
      <q-btn
        label="Submissions"
        flat
        no-caps
        icon-right="import_export"
        @click="isSorting = !isSorting"
      />
    </q-toolbar>
    <div class="main-content">
      <div
        class="q-mt-lg q-gutter-md"
        v-if="allMyPrograms.length > 0 && getMySubmissions.length > 0"
      >
        <submission-component
          :submission="submission"
          :program="submission.program"
          class="submission-component cursor-pointer"
          v-for="submission in allSubmissions"
          :key="submission.submission_title"
          ><!--  @click.prevent="showDetailsSubmission(submission.id)" -->
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
        <!--<div class="q-pa-lg flex flex-center">
          <q-pagination v-model="page" :max="totalPage" v-if="totalPage>1" color="secondary" />
        </div>-->
      </div>
      <div v-else class="flex flex-center">
        <div class="">
          <q-img src="~assets/empty-program.svg" width="600px" />
          <div class="title-1">No submission</div>
          <div class="subtitle-1">You have no submissions</div>
        </div>
        <!--<div class="q-pa-lg flex flex-center" v-if="totalPage>1">
          <q-pagination v-model="page" :max="totalPage" color="secondary" />
        </div>-->
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import submissionComponent from "../components/SubmissionComponent.vue";
export default {
  components: {
    submissionComponent,
  },
  data() {
    return {
      selectAllPrograms: [{ label: "All My Program", value: 0 }],
      allMyPrograms: [],
      selectProgram: null,

      allStatus: [
        { label: "New Report submission", value: "new" },
        { label: "Passed Triaged", value: "triaged" },
        { label: "Accept Unresolved", value: "accepted_unresolved" },
        { label: "Accept Resolved", value: "accepted_resolved" },
        {
          label: "Client returned for review",
          value: "client_returned_for_review",
        },
        {
          label: "March1st returned for review",
          value: "m1_returned_for_review",
        },
        { label: "Rejected", value: "rejected" },
      ],
      selectStatus: null,
      allSubmissions: [],
    };
  },
  watch: {
    selectProgram: function (val) {
      console.log("selectProgram/val = ", val);
      if (val.value == 0) this.allSubmissions = this.getMySubmissions;
      else {
        if (!this.selectStatus)
          this.allSubmissions = this.getMySubmissions.filter(
            (submission) => submission.program.id == val.value
          );
        else {
          this.allSubmissions = this.getMySubmissions.filter(
            (submission) =>
              submission.submission_status == this.selectStatus.value
          );
          this.allSubmissions = this.allSubmissions.filter(
            (submission) => submission.program.id == val.value
          );
        }
      }
    },
    selectStatus: function (val) {
      if (!this.selectProgram)
        this.allSubmissions = this.getMySubmissions.filter(
          (submission) => submission.submission_status == val.value
        );
      else {
        this.allSubmissions = this.getMySubmissions.filter(
          (submission) => submission.program.id == this.selectProgram.value
        );
        this.allSubmissions = this.allSubmissions.filter(
          (submission) => submission.submission_status == val.value
        );
      }
    },
  },
  computed: {
    ...mapGetters("submission", ["getMySubmissions"]),
    ...mapGetters("program", ["getMyPrograms", "getOneProgram"]),
  },
  methods: {
    ...mapActions("submission", ["GET_MY_SUBMISSIONS"]),
    showDetailsSubmission(idSubmission) {
      this.$router.push("submissions/submission-detail/" + idSubmission);
    },
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      if (this.getMySubmissions.length == 0) await this.GET_MY_SUBMISSIONS();
      this.allSubmissions = JSON.parse(JSON.stringify(this.getMySubmissions));
      this.allMyPrograms = await this.getMyPrograms.map(function (program) {
        let item = {
          label: program.program_title,
          value: program.id,
        };
        return item;
      });
      this.selectAllPrograms = [
        { label: "All My Program", value: 0 },
        ...this.allMyPrograms,
      ];
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  },
  async mounted() {
    this.allSubmissions = JSON.parse(JSON.stringify(this.getMySubmissions));
    try {
      this.$q.loading.show();
      await this.GET_MY_SUBMISSIONS();
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  },
};
</script>

<style lang="scss" scoped>
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
