<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar
        class="bg-none flex q-gutter-sm header"
        style="padding-top: 40px"
      >
        <q-toolbar-title class="title-header">Edit A Program</q-toolbar-title>
        <q-space />
        <!-- <q-btn
          no-caps
          outline
          class="bg-white text-secondary"
          label="Cancel"
          style="min-width: 160px"
        />
        <q-btn
          no-caps
          label="Save"
          class="bg-positive text-white"
          flat
          style="min-width: 160px"
        />
        <q-btn
          no-caps
          label="Publish"
          class="bg-secondary text-white"
          flat
          style="min-width: 160px"
        /> -->
      </q-toolbar>
      <q-card
        class="card-user q-mt-lg bg-transparent"
        flat
        style="border-radius: 10px"
      >
        <div class="wrap-card q-pa-lg flex flex-center bg-white">
          <div class="wrap-image flex flex-center">
            <div class="card-image">
              <q-img src="~assets/local/file_copy.png" width="32px" />
              <div class="subtitle">Program picture</div>
              <div class="subtitle-2">Drop your file here</div>
            </div>
          </div>
          <div class="flex col content-card">
            <div style="width: 100%">
              <div class="form-elt q-pb-lg">
                <div class="subtitle q-pb-sm">Program Title</div>
                <div class="">
                  <q-input
                    type=""
                    v-model="formData.program_title"
                    label="Enter Title"
                    borderless
                    class="q-pl-sm q-pr-sm"
                  />
                </div>
              </div>
              <div class="form-elt q-pb-lg">
                <div class="subtitle q-pb-sm">Program Description</div>
                <div class="">
                  <q-input
                    type="textarea"
                    v-model="formData.program_description"
                    label="Enter description"
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
              </div>
            </div>
          </div>
        </div>
      </q-card>
      <div
        class="q-pt-lg"
        style="display: grid; grid-template-columns: 3fr 2fr; grid-gap: 24px"
      >
        <div class="bg-white q-pa-lg" style="border-radius: 16px">
          <q-list>
            <q-item class="q-pl-none q-pr-none">
              <q-item-section class="radio-element">
                <div class="q-pb-md">Program Type</div>
                <q-radio
                  name="program-type"
                  v-model="formData.program_type"
                  val="private"
                  label="Private"
                  color="secondary"
                />
                <q-radio
                  name="program-type"
                  v-model="formData.program_type"
                  val="public"
                  label="Public"
                  color="secondary"
                />
              </q-item-section>
              <q-item-section class="radio-element">
                <div class="q-pb-md">Safe Harbour Type</div>
                <q-radio
                  name="program-type"
                  v-model="formData.safe_harbour_type"
                  val="full"
                  label="Full Safe Harbor"
                  color="secondary"
                />
                <q-radio
                  name="program-type"
                  v-model="formData.safe_harbour_type"
                  val="partial"
                  label="Partial Safe Harbor"
                  color="secondary"
                />
              </q-item-section>
              <q-item-section class="radio-element">
                <div class="q-pb-md">Reward Type</div>
                <q-radio
                  name="program-type"
                  v-model="formData.reward_type"
                  val="cash"
                  label="Cash Payment"
                  color="secondary"
                />
                <q-radio
                  name="program-type"
                  v-model="formData.reward_type"
                  val="points"
                  label="Points"
                  color="secondary"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <!-- <div class="radio-element">
            <div class="q-pb-xs q-pt-sm">Reward Range</div>
            <q-toggle
              v-model="formData.reward_range"
              color="secondary"
              label="Points Only"
            />
          </div> -->
        </div>
        <div class="bg-white q-pa-lg" style="border-radius: 16px">
          <q-list>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P1</q-item-section
              >
              <q-item-section class="second-element">Critical</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.critical"
                  :min="formData.severe.min"
                  :max="5000"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P2</q-item-section
              >
              <q-item-section class="second-element">Severe</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.severe"
                  :min="formData.medium.min"
                  :max="formData.critical.max"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P3</q-item-section
              >
              <q-item-section class="second-element">Medium</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.medium"
                  :min="formData.low.min"
                  :max="formData.severe.max"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
            <q-item class="item-amount">
              <q-item-section class="first-element" style="max-width: 60px"
                >P4</q-item-section
              >
              <q-item-section class="second-element">Low</q-item-section>
              <q-item-section class="q-pl-sm q-pr-sm">
                <q-range
                  v-model="formData.low"
                  :min="0"
                  :max="formData.medium.max"
                  label
                  color="secondary"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="q-pt-lg q-pb-lg">
        <q-card class="my-card card-description" flat>
          <q-card-section class="title q-pt-lg q-pb-md"
            >Detailed Description</q-card-section
          >
          <q-card-section class="q-pb-sm">
            <div class="subtitle q-pb-sm">Program Guidelines</div>
            <div class="">
              <q-input
                type=""
                v-model="formData.program_guidelines_1"
                label=""
                borderless
              />
            </div>
          </q-card-section>
          <q-card-section class="q-pb-sm">
            <div class="subtitle q-pb-sm">Rewards Guidelines</div>
            <div class="">
              <q-input
                type=""
                v-model="formData.program_guidelines_2"
                label=""
                borderless
              />
            </div>
          </q-card-section>
          <q-card-section class="q-pb-sm">
            <div class="subtitle q-pb-sm">Legal Terms</div>
            <div class="">
              <q-input
                type=""
                v-model="formData.legal_terms"
                label=""
                borderless
              />
            </div>
          </q-card-section>
          <q-card-section class="q-pb-sm">
            <div class="subtitle q-pb-sm">Program Scope</div>
            <div class="">
              <q-input
                type=""
                v-model="formData.program_scope"
                label=""
                borderless
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="card-invite" v-if="program">
        <list-update
          :users="getManagers"
          :assignUsers="program.managers"
          @onUpdateUser="updateManager"
        />
      </div>

      <div class="card-invite q-mt-lg" v-if="program">
        <list-update-hacker
          :users="getAllHacker"
          :assignUsers="program.invitations"
          @onUpdateUser="updateUser"
        />
      </div>
      <q-card flat class="bg-transparent q-pb-lg">
        <q-card-actions align="right" class="q-pt-lg q-gutter-md btn-actions">
          <q-btn label="Cancel" no-caps outline color="secondary" />
          <q-btn
            label="Save"
            no-caps
            flat
            class="bg-secondary text-white"
            @click="onEditProgram()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import submissionComponent from "../../components/submission-component.vue";
import { mapActions, mapGetters } from "vuex";
import ListUpdate from "../../components/list-update.vue";
import ListUpdateHacker from "../../components/list-update-hacker.vue";
export default {
  components: { submissionComponent, ListUpdate, ListUpdateHacker },
  name: "programs",
  data() {
    return {
      formData: {
        id: null,
        user_id: 1,
        program_picture_url: "https://cdn.quasar.dev/img/parallax2.jpg",
        program_title: "Lorem ipsum dolor sit amet,",
        program_description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta.",
        program_type: "public",
        safe_harbour_type: "full",
        reward_type: "points",
        reward_range: false,
        program_guidelines_1:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada.",
        program_guidelines_2:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada.",
        legal_terms:
          "Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit.",
        program_scope: 4,
        hackers: [],
        managers: [],
        critical: { min: 150, max: 1400 },
        severe: { min: 25, max: 1000 },
        medium: { min: 50, max: 1200 },
        low: { min: 100, max: 1300 },
        is_closed: false,
        close_at: null,
        status: "Active",
        date_post: "10/04/2021",
        invitations: [],
      },
      privileges: [
        { label: "Can Edit", value: 1 },
        { label: "Can view", value: 2 },
      ],
      programs: [{ label: "dfdffdf", value: "1" }],
      program: null,
      status: [{ label: "fgfgfgfg", value: "3" }],
      stat: null,
      content: "",
      levels: [
        { label: "Low", value: "0" },
        { label: "Medium", value: "1" },
        { label: "Severe", value: "2" },
        { label: "High", value: "3" },
      ],
      level: null,

      critical: {
        min: null,
        max: null,
      },
      model: null,
      search: null,

      hackers: [],
      managers: [],

      allManagers: false,
      allHackers: false,
    };
  },
  watch: {
    allManagers: function (val) {
      if (val) {
        Object.keys(this.managers).forEach((key) => {
          this.formData.managers.push(this.managers[key]);
        });
      } else {
        this.formData.managers = [];
      }
    },
    allHackers: function (val) {
      if (val) {
        Object.keys(this.hackers).forEach((key) => {
          this.formData.invitations.push(this.hackers[key].id);
        });
      } else {
        this.formData.invitations = [];
      }
    },
  },
  computed: {
    ...mapGetters("dashboard", ["getAllHacker", "getManagers"]),
    ...mapGetters("program", ["getProgram"]),
  },
  methods: {
    ...mapActions("program", ["editProgram",'oneProgram']),
    ...mapActions("dashboard", ["getAllHackers","getAllManagers"]),
    onEditProgram() {
      this.editProgram(this.formData);
      this.$router.push("/main/programs");
    },
    updateManager(element) {
      console.log(element);
      this.formData.managers = element;
    },
    updateUser(element) {
      //console.log(element);
      this.formData.invitations = element.map(function (e) {
        return e.id;
      });
    },
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      await this.getAllHackers();
      await this.getAllManagers();
      this.hackers = this.getAllHacker;
      //console.log(this.hackers);
      this.managers = this.getManagers;

      this.program_id = this.$route.params.id;
      this.program = await this.oneProgram(this.program_id);
      if (!this.program) this.program = {};
      else {
        //console.log(this.program);
        this.formData = {
          id: this.program.id,
          user_id: this.program.user_id,
          client_id: this.program.client_id,

          program_picture_url: this.program.program_picture_url,
          program_title: this.program.program_title,
          program_description: this.program.program_description,
          program_type: this.program.program_type,
          safe_harbour_type: this.program.safe_harbour_type,
          reward_type: this.program.reward_type,
          reward_range: this.program.reward_range,
          program_guidelines_1: this.program.program_guidelines_1,
          program_guidelines_2: this.program.program_guidelines_2,
          legal_terms: this.program.legal_terms,
          program_scope: this.program.program_scope,
          is_closed: this.program.is_closed,
          close_at: this.program.close_at,
          date_post: this.program.date_post,

          hackers: this.program.hackers,
          managers: this.program.managers,

          critical: this.program.critical,
          severe: this.program.severe,
          medium: this.program.medium,
          low: this.program.low,

          invitations: this.program.invitations,
        };
        console.log(program);
      }
      this.$q.loading.hide();
    } catch (e) {
      console.log("Error dans before mount");
      this.$q.loading.hide();
    }
  },
};
</script>
<style scoped>
.wrap-image {
  width: 300px;
  background: #f5f5f5;
  border: 1px dashed #b0b0b0;
  box-sizing: border-box;
  border-radius: 12px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.wrap-image .card-image {
  text-align: center;
}
.wrap-image .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #46516d;
}
.wrap-image .subtitle-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #838181;
}
.wrap-card {
  border-radius: 10px;
  width: 100%;
}
.content-card {
  padding-left: 40px;
  padding-right: 30px;
}
.wrap-card .subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.wrap-card .q-input,
.wrap-card .q-select {
  background: #fbfbfb;
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  border-radius: 12px;
  width: 100%;
}
.btn-actions .q-btn {
  width: 160px;
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
  padding-left: 20px;
  padding-top: 0;
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
.header .title-header {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}

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
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
