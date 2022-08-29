<template>
  <q-page class="bg-home">
    <div class="content-page" v-if="submission">
      <div class="main-content">
        <q-toolbar class="bg-none flex q-pr-none" style="padding-top: 40px">
          <q-space />
          <q-btn-dropdown
            color="secondary"
            class="bg-white"
            no-caps
            label="Actions"
            outline
            v-if="
              (getUser.role == 'client' || getUser.role == 'march1st') &&
              nextStatuses.length > 0
            "
          >
            <q-list separator>
              <q-item
                v-for="status in nextStatuses"
                :key="status.key"
                clickable
                @click="onActionClick(status)"
              >
                {{ status.action }}
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
        <div class="q-mt-lg q-mb-lg submission-elt">
          <submission-component
            :submission="submission"
            class="submission-component"
          >
            <template v-slot:header>
              <q-card-section class="q-pa-none" style="padding-bottom: 27px">
                <q-toolbar>
                  <div class="box-badge">
                    <span class="title-badge"
                      >Severity Level : {{ submission.submission_level }}</span
                    >
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
        <div class="submission-target">
          <q-card class="my-card" flat>
            <q-card-section>
              <div class="submission-title">Submission Target</div>
              <div class="submission-link">
                {{ submission.submission_target }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="submission-title">Submission Text</div>
              <div class="submission-content" v-html="submission.submission_text">
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="submission-attachment q-pt-md flex q-gutter-md">
          <div class="q-pa-sm bg-white cursor-pointer" style="border-radius: 10px" v-for="attachment in submission.attachments" :key="attachment.id">
            <q-card class="card-attachment flex" flat @click="openFile(attachment.url)">
              <div>
                <q-img src="~assets/file-pdf.svg" width="50px" />
              </div>
              <div class="q-pl-md q-pr-md flex flex-center" style="">
                <div>
                  <div class="attachment-name">{{attachment.name}}</div>
                  <div class="attachment-size">{{convertToMB(attachment.size)}}</div>
                </div>
              </div>
            </q-card>
          </div>

        </div>
        <div class="submission-form q-pt-md" >
          <div class="submission-title q-pb-sm" v-if="nextStatuses.length > 0">Leave your comment</div>
          <div class="submission-title q-pb-sm" v-else>Comments</div>
          <q-editor
            v-if="nextStatuses.length > 0"
            v-model="message"
            min-height="8rem"
            style="
              background: white;
              border: 1px solid #f3f3f3;
              padding-left: 10px;
              width: 100%;
              border-radius: 12px;
            "
            class="q-mb-md"
            placeholder=""
          />

          <div
            class="all-message bg-white q-pt-md q-pb-md q-mb-lg"
            style="border-radius: 16px"
            v-if="submissionStatusComment.length > 0"
          >
            <q-list>
              <div
                v-for="submissionStatus in submissionStatusComment"
                :key="submissionStatus.id"
              >
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>User</q-item-label>
                    <q-item-label caption>{{
                      submissionStatus.comment
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator/>
              </div>
            </q-list>
          </div>
          <div>
            <q-btn
              label="Save"
              flat
              no-caps
              class="bg-secondary text-white"
              style="width: 160px"
              v-if="getUser.role == 'hacker' && nextStatuses.length > 0"
              @click="onActionClick(0)"
            />
            <q-space />
            <q-btn-dropdown
              color="secondary"
              class="bg-white"
              no-caps
              label="Actions"
              outline
              v-if="
                (getUser.role == 'client' || getUser.role == 'march1st') &&
                nextStatuses.length > 0
              "
            >
              <q-list separator>
                <q-item
                  v-for="status in nextStatuses"
                  :key="status.key"
                  clickable
                  @click="onActionClick(status)"
                >
                  {{ status.action }}
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </div>
      <div class="right-content bg-white">
        <q-card class="card-timeline q-pt-sm q-pb-sm q-pl-md q-pr-md" flat>
          <q-timeline color="secondary">
            <q-timeline-entry tag="div" heading class="title-timeline">
              Status timeline
            </q-timeline-entry>
            <q-timeline-entry
              tag="div"
              v-for="timeline in submissionStatus.reverse()"
              :key="timeline.id"
            >
              <div class="subtitle-timeline">{{ timeline.createdAt }}</div>
              <div class="content-timeline">
                {{ timeline.status_title }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card>
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
      idSubmission: null,
      submission: null,
      message: null,
      submissionStatus: [],
      nextStatuses: [],
      submissionStatusComment:[]
    };
  },
  watch: {
    "$route.params.id": function (val) {
      this.idSubmission = Number(val);
      this.submission = this.getOneSubmission(this.idSubmission);
    },
  },
  computed: {
    ...mapGetters("auth", ["getUser","getDuration"]),
    ...mapGetters("submission", ["getOneSubmission"]),
    getComments() {
      return [];
    },
  },
  methods: {
    ...mapActions("submission", [
      "GET_SUBMISSIONSTATUS_BY_SUBMISSION",
      "GET_ONE_SUBMISSION",
      "CREATE_SUBMISSION_STATUS",
    ]),
    async onActionClick(statusSubmission) {
      let param = {
        submission: this.submission.id,
        comment: this.message,
        status: statusSubmission.key,
        status_title: statusSubmission.label,
      };
      try {
        this.$q.loading.show();
        await this.CREATE_SUBMISSION_STATUS(param);
        this.$router.push("/new-dashboard");
        this.$q.notify({
          message: "The submission: " + param.status_title,
          type: "positive",
          position: "top",
        });
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
      }
    },
    getNextStatuses(role, currentSubmissionStatus) {
      const statuseLabels = {
        new: {
          key: "new",
          label: "New submission report",
          action: "New submission report",
        },
        triaged: {
          key: "triaged",
          label: "Passed triage",
          action: "Pass triage",
        },
        m1_returned_for_review: {
          key: "m1_returned_for_review",
          label: "March1st returned for review",
          action: "Returned for review",
        },
        accepted_unresolved: {
          key: "accepted_unresolved",
          label: "Accepted but still Unresolved",
          action: "Accept as Unresolved",
        },
        accepted_resolved: {
          key: "accepted_resolved",
          label: "Accepted and Resolved",
          action: "Accept and Resolve",
        },
        client_returned_for_review: {
          key: "client_returned_for_review",
          label: "Returned for review",
          action: "Return for review",
        },
        rejected: {
          key: "rejected",
          label: "Rejected",
          action: "Reject submission",
        },
      };
      const statusTransitions = {
        march1st: {
          new: [
            statuseLabels.triaged,
            statuseLabels.m1_returned_for_review,
            statuseLabels.rejected,
          ],
          client_returned_for_review: [
            statuseLabels.triaged,
            statuseLabels.m1_returned_for_review,
            statuseLabels.rejected,
          ],
        },
        client: {
          triaged: [
            statuseLabels.accepted_unresolved,
            statuseLabels.client_returned_for_review,
          ],
          accepted_unresolved: [statuseLabels.accepted_resolved],
        },
        /*program_manager: {
          triaged: [
            statuseLabels.accepted_unresolved,
            statuseLabels.client_returned_for_review,
          ],
          accepted_unresolved: [statuseLabels.accepted_resolved],
        },*/
        hacker: {
          m1_returned_for_review: [statuseLabels.new],
        },
      };

      return statusTransitions[role]?.[currentSubmissionStatus] !== undefined
        ? statusTransitions[role]?.[currentSubmissionStatus]
        : [];
    },
    convertToMB(octet){
      let result =octet;
      if(1024*1024<octet && octet<1024*1024*1024){
        //on met en mo
        result = octet/1024/1024;
        return result.toFixed(2)+"mo";
      }
      else if(octet>=1024*1024*1024){
        //on met en Go
        result = octet/1024/1024/1024;
        return result.toFixed(2)+"go"
      }
      else{
        return result.toFixed(2)+"ko"
      }
    },
    openFile(url){
      window.open(url,"_blank");
    }
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      this.idSubmission = Number(this.$route.params.id);
      this.submission = await this.GET_ONE_SUBMISSION(this.idSubmission);
      this.submissionStatusComment = this.submission.submission_statuses.filter((submissionStatus)=> submissionStatus.comment!=="" || submissionStatus.comment!==" ").reverse();
      this.submissionStatus = await this.GET_SUBMISSIONSTATUS_BY_SUBMISSION(
        this.idSubmission
      );
      this.nextStatuses = this.getNextStatuses(
        this.getUser.role,
        this.submission.submission_status
      ).map(function (status) {
        return {
          label: status.label,
          key: status.key,
          action: status.action,
        };
      });

      console.log("beforeMount/nextStatuses = ", this.nextStatuses);
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  },
};
</script>

<style lang="scss" scoped>
.select-action {
  border: 1px solid #5887ff;
  box-sizing: border-box;
  border-radius: 8px;
  min-width: 300px;
}
.subtitle-timeline {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
  /*color: #ffdfac;*/
}
.content-timeline {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.title-timeline {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #5887ff;
}
.card-attachment {
  width: 200px;
  padding-left: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 10px;
}
.attachment-name,
.attachment-size {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.attachment-size {
  color: #949090;
}
.active-badge {
  width: 85px;
  height: 22px;
  background: rgba(255, 172, 50, 0.1);
  border-radius: 100px;
  color: #ffb648;
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
.submission-title {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
  padding-top: 24px;
  padding-bottom: 12px;
}
.submission-link {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  letter-spacing: -0.015em;
  text-decoration-line: underline;
  color: #5887ff;
  cursor: pointer;
}
.submission-content {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.submission-form .q-input,
.submission-form .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
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
  color: #47b881;
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

  height: 26px;
  /*background: #f7d5d5;*/
  background: rgba(71, 184, 129, 0.2);
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
.content-page {
  display: flex;
}
.content-page .right-content {
  min-width: 322px;
}
</style>
