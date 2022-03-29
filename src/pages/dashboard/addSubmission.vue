<template>
  <q-page class="bg-home">
    <div class="content-page">
      <div class="main-content">
        <q-toolbar class="bg-none flex q-gutter-sm" style="padding-top: 40px">
          <q-space />
          <q-btn
            no-caps
            outline
            class="bg-white text-secondary"
            label="Log In"
            style="min-width: 160px"
          />
          <q-btn
            no-caps
            label="Submit"
            class="bg-secondary text-white"
            flat
            style="min-width: 160px"
            @click.prevent="onAddReport()"
          />
        </q-toolbar>
        <div class="q-mt-lg submission-elt">
          <submission-component :program="program"></submission-component>
        </div>
        <div class="q-mt-lg">
          <q-card class="my-card card-description q-pb-md" flat>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Title</div>
              <div class="">
                <q-input
                  type=""
                  v-model="formData.submission_title"
                  label="Vulnerablity in User Private Information Leak"
                  borderless
                  class="q-pl-sm q-pr-sm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Severity Level</div>
              <div class="">
                <q-select
                  :options="levels"
                  v-model="formData.severety_level"
                  label="Select Severity Level"
                  borderless
                  class="q-pl-sm q-pr-sm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Target</div>
              <div class="">
                <q-input
                  type=""
                  v-model="formData.submission_target"
                  label="Enter Target"
                  borderless
                  class="q-pl-sm q-pr-sm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Submission Text</div>
              <div class="">
                <q-input
                  type="textarea"
                  v-model="formData.submission_text"
                  label=""
                  borderless
                  class="q-pl-sm q-pr-sm"
                  style="
                    background: #fbfbfb;
                    border: 1px solid #f3f3f3;
                    box-sizing: border-box;
                    border-radius: 12px;
                  "
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-mt-lg q-pb-lg">
          <q-card class="my-card q-pa-md" flat>
            <div class="flex flex-center attachment">
              <div>
                <div class="title">Attachments</div>
                <div class="subtitle">Drop your files here</div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div class="right-content bg-white">
        <q-card class="card-timeline q-pt-sm q-pb-sm q-pl-md q-pr-md" flat>
          <q-timeline color="secondary">
            <q-timeline-entry tag="div" heading class="title-timeline">
              Status timeline
            </q-timeline-entry>
            <q-timeline-entry tag="div">
              <div class="subtitle-timeline">4 June 2021 5:00pm</div>
              <div class="content-timeline">
                Waiting for hacker clarifications
              </div>
            </q-timeline-entry>

            <q-timeline-entry tag="div">
              <div class="subtitle-timeline">5 June 2021 5:00pm</div>
              <div class="content-timeline">M1 Returned for clarifications</div>
            </q-timeline-entry>

            <q-timeline-entry tag="div">
              <div class="subtitle-timeline">4 June 2021 5:00pm</div>
              <div class="content-timeline">New Report Submission</div>
            </q-timeline-entry>
          </q-timeline>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import submissionComponent from "../../components/submission-component.vue";
export default {
  components: { submissionComponent },
  data() {
    return {
      programs: [{ label: "dfdffdf", value: "1" }],
      program: null,
      status: [{ label: "fgfgfgfg", value: "3" }],
      stat: null,
      formData: {
        submission_title: "Curabitur non nulla sit amet nisl",
        severety_level: { label: "Severe", value: "Severe" },
        submission_target: "http://localhost:8080/main/my-submissions",
        submission_text:
          "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
        program_id: null,
        hacker_id: null,
        client_id:null
      },
      model: null,
      content:
        "Program text Nemo enim ipsam voluptatem ipsam ta Program text Nemo enim ipsam voluptatem ipsam ta Program text Nemo enim ipsam voluptatem ipsam ta",
      levels: [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "Severe", value: "Severe" },
        { label: "High", value: "High" },
      ],
      level: null,
    };
  },
  computed: {
    ...mapState("dashboard", ["user"]),
    ...mapGetters("program", ["getProgram"]),
  },
  methods: {
    ...mapActions("submission", ["addReport"]),
    async onAddReport() {
      try {
        this.formData.program_id = this.program.id;
        this.formData.hacker_id = this.user.id;
        this.formData.client_id = this.program.user_id;
        await this.addReport(this.formData);
        this.$router.push({ name: "my-submissions" });
      } catch (error) {}
    },
  },
  beforeMount() {
    this.program = this.getProgram(this.$route.params.id);
    console.log(this.program);
  },
};
</script>
<style scoped>
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

.attachment .title {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #46516d;
}
.attachment .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #838181;
}
.attachment {
  background: #f5f5f5;
  border: 1px dashed #b0b0b0;
  box-sizing: border-box;
  border-radius: 12px;
  padding-bottom: 32px;
  padding-top: 32px;
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
.card-description .q-input,
.card-description .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.submission-elt {
  border-radius: 10px;
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
.content-page {
  display: flex;
}
.content-page .right-content {
  max-width: 322px;
}
</style>
