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
            v-if="getUser.role == 'client' || getUser.role == 'march1st'"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="onActionClick(1)"
                v-if="getUser.role == 'march1st'"
              >
                <q-item-section>
                  <q-item-label>Passed Triage</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="onActionClick(2)"
                v-if="getUser.role == 'client'"
              >
                <q-item-section>
                  <q-item-label>Accept but still unresolve</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="onActionClick(3)"
                v-if="getUser.role == 'client'"
              >
                <q-item-section>
                  <q-item-label>Accept and resolve</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="onActionClick(4)"
                v-if="getUser.role == 'client'"
              >
                <q-item-section>
                  <q-item-label>Return For Clarification</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="onActionClick(5)"
                v-if="getUser.role == 'march1st'"
              >
                <q-item-section>
                  <q-item-label>Return For Clarification</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="onActionClick(6)"
                v-if="getUser.role == 'march1st'"
              >
                <q-item-section>
                  <q-item-label>Reject</q-item-label>
                </q-item-section>
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
                    <span>2 day ago, 3:45 pm</span>
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
              <div class="submission-content">
                {{ submission.submission_text }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="submission-attachment q-pt-md flex q-gutter-md">
          <div class="q-pa-sm bg-white" style="border-radius: 10px">
            <q-card class="card-attachment flex" flat>
              <div>
                <q-img src="~assets/file-pdf.svg" width="50px" />
              </div>
              <div class="q-pl-md q-pr-md flex flex-center" style="">
                <div>
                  <div class="attachment-name">abc.pdf</div>
                  <div class="attachment-size">2.2mb</div>
                </div>
              </div>
            </q-card>
          </div>
          <div class="q-pa-sm bg-white" style="border-radius: 10px">
            <q-card class="card-attachment flex" flat>
              <div>
                <q-img src="~assets/file-pdf.svg" width="50px" />
              </div>
              <div class="q-pl-md q-pr-md flex flex-center" style="">
                <div>
                  <div class="attachment-name">abc.pdf</div>
                  <div class="attachment-size">2.2mb</div>
                </div>
              </div>
            </q-card>
          </div>
        </div>

        <div class="submission-form q-pt-md">
          <div class="submission-title q-pb-sm">Leave your comment</div>
          <q-editor
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
            v-if="getComments.length>0"
          >

            <q-list>
              <q-item
                clickable
                v-ripple
                v-for="comment in getComments"
                :key="comment.id"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                    getUser(comment.user_id).username
                  }}</q-item-label>
                  <q-item-label caption>{{ comment.message }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-btn
            label="Save"
            flat
            no-caps
            class="bg-secondary text-white"
            style="width: 160px"
            v-if="getUser.role == 'hacker'"
            @click="onActionClick(0)"
          />
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
              v-for="timeline in submissionStatus"
              :key="timeline.id"
            >
              <div class="subtitle-timeline">{{timeline.createdAt}}</div>
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
import { mapActions, mapGetters } from 'vuex'
import submissionComponent from '../components/SubmissionComponent.vue';
export default {
  components:{
    submissionComponent
  },
  data() {
    return {
      idSubmission:null,
      submission:null,
      message:null,
      submissionStatus:[]
    }
  },
  watch:{
    "$route.params.id":function(val){
      this.idSubmission = Number(val);
      this.submission = this.getOneSubmission(this.idSubmission);
    }
  },
  computed: {
    ...mapGetters('auth',[
      'getUser'
    ]),
    ...mapGetters('submission',[
      'getOneSubmission'
    ]),
    getComments(){
      return [];
    }
  },
  methods: {
    ...mapActions('submission',[
      'GET_SUBMISSIONSTATUS_BY_SUBMISSION'
    ]),
    onActionClick(num){
      switch(num){
        case 1: break;
        case 2: break;
        case 3: break;
        case 4: break;
        case 5: break;
        case 6: break;
        default:  break;
      }
    }
  },
  async beforeMount(){
    this.idSubmission = Number(this.$route.params.id);
    this.submission = await this.getOneSubmission(this.idSubmission);
    this.submissionStatus = await this.GET_SUBMISSIONSTATUS_BY_SUBMISSION(this.idSubmission);
  },
}
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
