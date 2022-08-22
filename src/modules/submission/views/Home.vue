<template>
  <q-page
    class="bg-home"
    v-if="allMyPrograms.length > 0 && getMySubmissions.length > 0"
  >
    <div class="main-content">
      <div class="q-pb-lg">
        <q-toolbar
          class="q-pr-none q-pl-none q-pb-lg q-gutter-sm bg-none flex toolbar-submission"
          style="padding-top: 50px"
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
            filled
            dense
            :options="companies"
            v-model="company"
            label="Select Company"
            style="min-width: 200px"
            v-if="getUser.role == 'march1st'"
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
          <!--<q-btn
            label="Submissions"
            flat
            no-caps
            icon-right="import_export"
            @click="isSorting = !isSorting"
          />-->
        </q-toolbar>
        <div class="q-pl-sm q-pr-sm q-gutter-sm">
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
                  <div class="box-badge" :style="{backgroundColor:getBoxColor(submission.submission_status)}">
                    <span class="title-badge" :style="{color:getTitleColor(submission.submission_status)}">{{
                      submission.submission_status_title
                    }}</span>
                  </div>
                  <q-space />
                  <div class="title-badge-2">
                    <span>{{getDuration(submission.createdAt)}} ago</span>
                  </div>
                </q-toolbar>
                <div class="title">{{ submission.submission_title }}</div>
                <q-separator color="#E4E4E4" />
              </q-card-section>
            </template>
          </submission-component>
        </div>
      </div>
    </div>
  </q-page>
  <q-page v-else class="bg-home flex flex-center">
    <div>
      <div class="">
        <q-img src="~assets/empty-program.svg" width="600px" />
        <div class="title-1">No submission</div>
        <div class="subtitle-1">You have no submissions</div>
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
      companies: [],
      company: null,
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
    company: function (val) {
      if (val.value == 0) {
        this.allSubmissions = JSON.parse(JSON.stringify(this.getMySubmissions));
      } else {
        this.allSubmissions = this.getMySubmissions.filter(
          (submission) => submission.program.company.data.id == val.value
        );
      }
    },
  },
  computed: {
    ...mapGetters("submission", ["getMySubmissions"]),
    ...mapGetters("program", ["getMyPrograms", "getOneProgram"]),
    ...mapGetters("auth", ["getUser", "getCompanies","getDuration"]),
    getBoxColor() {
      return (status) => {
        let color = "";
        switch (status) {
          case "new":
            color = "#ffb648";
            break;
          case "triaged":
            color = "#ffb648";
            break;
          case "accepted_unresolved":
            color = "rgba(71, 184, 129, 0.2)";
            break;
          case "accepted_resolved":
            color = "rgba(71, 184, 129, 0.2)";
            break;
          case "client_returned_for_review":
            color = "#ffb648";
            break;
          case "m1_returned_for_review":
            color = "#ffb648";
            break;
          case "rejected":
            color = "#f7d5d5";
            break;
          default:
            break;
        }
        return color;
      };
    },
    getTitleColor() {
      return (status) => {
        let color = "";
        switch (status) {
          case "new":
            color = "#ffdfac";
            break;
          case "triaged":
            color = "#ffdfac";
            break;
          case "accepted_unresolved":
            color = "#47b881";
            break;
          case "accepted_resolved":
            color = "#47b881";
            break;
          case "client_returned_for_review":
            color = "#ffdfac";
            break;
          case "m1_returned_for_review":
            color = "#ffdfac";
            break;
          case "rejected":
            color = "#f55b5d";
            break;
          default:
            break;
        }
        return color;
      };
    },

  },
  methods: {
    ...mapActions("submission", ["GET_MY_SUBMISSIONS"]),
    ...mapActions("auth", ["GET_COMPAGNIES"]),
    showDetailsSubmission(idSubmission) {
      this.$router.push("submissions/submission-detail/" + idSubmission);
    },
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      await this.GET_COMPAGNIES();
      this.companies = this.getCompanies.map(function (element) {
        return {
          ...element,
          label: element.company_name,
          value: element.id,
        };
      });
      this.companies = [
        { label: "All Companies", value: 0 },
        ...this.companies,
      ];

      await this.GET_MY_SUBMISSIONS();
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
    await this.GET_MY_SUBMISSIONS();
    this.allSubmissions = JSON.parse(JSON.stringify(this.getMySubmissions));

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
  /*color: #f55b5d;*/
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
  /*background: #f7d5d5;*/
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
  padding-top: 24px;
}
</style>
