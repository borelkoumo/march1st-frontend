<template>
  <q-page class="bg-home">
    <div class="main-content">
      <q-toolbar class="header">
        <q-toolbar-title class="title-header">Main Definition</q-toolbar-title>
        <q-space />
        <q-btn
          class="bg-white q-mr-lg"
          outlined
          color="secondary"
          flat
          label="Submit a Report"
          no-caps
        />
        <q-btn
          class="bg-secondary text-white"
          no-caps
          flat
          label="Edit"
          v-if="typeuser == 'admin'"
        />
        <q-btn
          class="bg-positive text-white q-mr-lg"
          no-caps
          flat
          label="Save"
          v-if="typeuser == 'client'"
        />
        <q-btn
          class="bg-secondary text-white"
          no-caps
          flat
          label="Publish"
          v-if="typeuser == 'client'"
        />
      </q-toolbar>
      <div class="grid-content q-pt-lg q-pb-lg" v-if="typeuser == 'admin'">
        <div class="">
          <program-component :program="null" style="border-radius: 16px" />
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
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section style="padding-left: 18px">
                  <q-item-label class="caption-element"
                    >Harbour Type</q-item-label
                  >
                  <q-item-label class="title-element q-pt-xs"
                    >Safe Harbor</q-item-label
                  >
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
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section style="padding-left: 18px">
                  <q-item-label class="caption-element"
                    >Reward Type</q-item-label
                  >
                  <q-item-label class="title-element q-pt-xs"
                    >Points</q-item-label
                  >
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
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section style="padding-left: 18px">
                  <q-item-label class="caption-element"
                    >Program Type</q-item-label
                  >
                  <q-item-label class="title-element q-pt-xs"
                    >Private</q-item-label
                  >
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
                  >$ 100 - $ 1000 Per vulnerability</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="first-element">P2</q-item-section>
                <q-item-section class="second-element">Severe</q-item-section>
                <q-item-section class="third-element"
                  >$ 1000 - $ 2500 Per vulnerability</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="first-element">P3</q-item-section>
                <q-item-section class="second-element">Medium</q-item-section>
                <q-item-section class="third-element"
                  >$ 2500 - $ 3500 Per vulnerability</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="first-element">P4</q-item-section>
                <q-item-section class="second-element">Low</q-item-section>
                <q-item-section class="third-element"
                  >$ 3500 - $ 5000 Per vulnerability</q-item-section
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
                  Program requirement Nemo enim ipsam voluptatem ipsam ta
                  voluptatem per natur aut odit aut fugit, sed onsequu n tur
                  magni dolore Nemo enim Neo
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div>
          <submission-level
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
              <q-card-section class="q-pt-none">
                <div class="recent-time">2 day ago , 3:45 pm</div>
                <div class="recent-content q-pb-md">
                  Submission Title Nemo enim ipsam voluptatem ipsam ta
                  voluptatem per natur aut odit aut fugit,
                </div>
                <q-btn
                  flat
                  no-caps
                  label="Waiting for M1 Review"
                  style="
                    background: #fff5d9;
                    color: #ffbb38;
                    min-width: 175px;
                    font-family: 'inter';
                  "
                />
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pt-none">
                <div class="recent-time">2 day ago , 3:45 pm</div>
                <div class="recent-content q-pb-md">
                  Submission Title Nemo enim ipsam voluptatem ipsam ta
                  voluptatem per natur aut odit aut fugit,
                </div>
                <q-btn
                  flat
                  no-caps
                  label="Waiting for M1 Review"
                  style="
                    background: #fff5d9;
                    color: #ffbb38;
                    min-width: 175px;
                    font-family: 'inter';
                  "
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-else class="q-pt-lg">
        <div>
          <q-card class="my-card" flat style="border-radius: 16px">
            <q-card-section horizontal class="q-pa-lg">
              <div
                style="
                  min-width: 200px;
                  min-height: 200px;
                  background: #fbfbfb;
                  border: 1px solid #f3f3f3;
                  box-sizing: border-box;
                  border-radius: 12px;
                "
                class="col-3 flex flex-center"
              >
                <q-img src="~assets/no-image.svg" width="60px" />
              </div>
              <div
                class="flex col"
                style="padding-left: 32px; align-items: center"
              >
                <div style="max-width: 466px">
                  <div class="title-card" style="">
                    Program Tiltle Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </div>
                  <div class="subtitle-card">
                    Prgram Description Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
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
                    v-model="programType"
                    val="private"
                    label="Private"
                    color="secondary"
                  />
                  <q-radio
                    name="program-type"
                    v-model="programType"
                    val="public"
                    label="Public"
                    color="secondary"
                  />
                </q-item-section>
                <q-item-section class="radio-element">
                  <div class="q-pb-md">Program Type</div>
                  <q-radio
                    name="program-type"
                    v-model="programType"
                    val="private"
                    label="Private"
                    color="secondary"
                  />
                  <q-radio
                    name="program-type"
                    v-model="programType"
                    val="public"
                    label="Public"
                    color="secondary"
                  />
                </q-item-section>
                <q-item-section class="radio-element">
                  <div class="q-pb-md">Program Type</div>
                  <q-radio
                    name="program-type"
                    v-model="programType"
                    val="private"
                    label="Private"
                    color="secondary"
                  />
                  <q-radio
                    name="program-type"
                    v-model="programType"
                    val="public"
                    label="Public"
                    color="secondary"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <div class="radio-element">
              <div class="q-pb-xs q-pt-sm">Reward Range</div>
              <q-toggle
                v-model="pointOnly"
                color="secondary"
                label="Points Only"
              />
            </div>
          </div>
          <div class="bg-white q-pa-lg" style="border-radius: 16px">
            <q-list>
              <q-item class="item-amount items-baseline">
                <q-item-section class="first-element" style="max-width: 60px"
                  >P1</q-item-section
                >
                <q-item-section class="second-element">Critical</q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.min"
                    borderless
                    class="q-pl-xs q-pr-xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.max"
                    borderless
                    class="q-pl-xs q-pr-xs"
                  />
                </q-item-section>
              </q-item>
              <q-item class="item-amount items-baseline">
                <q-item-section class="first-element" style="max-width: 60px"
                  >P1</q-item-section
                >
                <q-item-section class="second-element">Servere</q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.min"
                    borderless
                    class="q-pl-xs q-pr-xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.max"
                    borderless
                    class="q-pl-xs q-pr-xs"
                  />
                </q-item-section>
              </q-item>
              <q-item class="item-amount items-baseline">
                <q-item-section class="first-element" style="max-width: 60px"
                  >P1</q-item-section
                >
                <q-item-section class="second-element">Medium</q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.min"
                    borderless
                    class="q-pl-xs q-pr-xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.max"
                    borderless
                    class="q-pl-xs q-pr-xs"
                  />
                </q-item-section>
              </q-item>
              <q-item class="item-amount items-baseline">
                <q-item-section class="first-element" style="max-width: 60px"
                  >P1</q-item-section
                >
                <q-item-section class="second-element">Low</q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.min"
                    borderless
                    class="q-pl-xs q-pr-xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-input
                    v-model="critical.max"
                    borderless
                    class="q-pl-xs q-pr-xs"
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
                <q-input type="" v-model="model" label="" borderless />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Rewards Guidelines</div>
              <div class="">
                <q-input type="" v-model="model" label="" borderless />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Legal Terms</div>
              <div class="">
                <q-input type="" v-model="model" label="" borderless />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-sm">
              <div class="subtitle q-pb-sm">Program Scope</div>
              <div class="">
                <q-input type="" v-model="model" label="" borderless />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="card-invite">
          <q-card class="my-card" flat>
            <q-toolbar class="toolbar" style="padding-top:40px; padding-bottom:15px;">
              <div class="title">Invite Hackers</div>
              <q-space />
              <q-input dense v-model="search" placeholder="Search" borderless>
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-toolbar>
            <q-card-section>
              <q-list separator>
                <q-item class="item-header">
                  <q-item-section style="max-width: 50px"
                    ><q-checkbox v-model="box1" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section> Username / Email </q-item-section>
                  <q-item-section class="text-center" style="max-width: 18%">
                    Rank
                  </q-item-section>
                  <q-item-section class="text-center" style="max-width: 18%">
                    Acceptance Rate
                  </q-item-section>
                  <q-item-section class="text-center" style="max-width: 18%">
                    Severity Level
                  </q-item-section>
                  <q-item-section class="text-center" style="max-width: 50px">
                    Action
                  </q-item-section>
                </q-item>
                <q-item class="item-element">
                  <q-item-section style="max-width: 50px"
                    ><q-checkbox v-model="box1" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section>
                    <q-item-label class="title">Hacker Name</q-item-label>
                    <q-item-label caption class="subtitle"
                      >managerHackermail@gmail.com</q-item-label
                    >
                  </q-item-section>
                  <q-item-section
                    class="text-center flex flex-center"
                    style="max-width: 18%"
                  >
                    <div class="active-badge">67%</div>
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    24
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    P1
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 50px"
                  >
                    <q-btn flat icon="more_horiz" />
                  </q-item-section>
                </q-item>
                <q-item class="item-element">
                  <q-item-section style="max-width: 50px"
                    ><q-checkbox v-model="box1" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section>
                    <q-item-label class="title">Hacker Name</q-item-label>
                    <q-item-label caption class="subtitle"
                      >managerHackermail@gmail.com</q-item-label
                    >
                  </q-item-section>
                  <q-item-section
                    class="text-center flex flex-center"
                    style="max-width: 18%"
                  >
                    <div class="active-badge">67%</div>
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    24
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    P1
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 50px"
                  >
                    <q-btn flat icon="more_horiz" />
                  </q-item-section>
                </q-item>
                <q-item class="item-element">
                  <q-item-section style="max-width: 50px"
                    ><q-checkbox v-model="box1" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section>
                    <q-item-label class="title">Hacker Name</q-item-label>
                    <q-item-label caption class="subtitle"
                      >managerHackermail@gmail.com</q-item-label
                    >
                  </q-item-section>
                  <q-item-section
                    class="text-center flex flex-center"
                    style="max-width: 18%"
                  >
                    <div class="active-badge">67%</div>
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    24
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    P1
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 50px"
                  >
                    <q-btn flat icon="more_horiz" />
                  </q-item-section>
                </q-item>
                <q-item class="item-element">
                  <q-item-section style="max-width: 50px"
                    ><q-checkbox v-model="box1" class="q-mr-sm"
                  /></q-item-section>
                  <q-item-section>
                    <q-item-label class="title">Hacker Name</q-item-label>
                    <q-item-label caption class="subtitle"
                      >managerHackermail@gmail.com</q-item-label
                    >
                  </q-item-section>
                  <q-item-section
                    class="text-center flex flex-center"
                    style="max-width: 18%"
                  >
                    <div class="active-badge">67%</div>
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    24
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 18%"
                  >
                    P1
                  </q-item-section>
                  <q-item-section
                    class="text-center text-item"
                    style="max-width: 50px"
                  >
                    <q-btn flat icon="more_horiz" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import programComponent from "../../components/program-component.vue";
import SubmissionLevel from "../../components/submission-level.vue";
export default {
  components: { programComponent, SubmissionLevel },
  data() {
    return {
      progress: [0.8, 0.2, 0.1],
      typeuser: "client",
      programType: "public",
      pointOnly: true,
      critical: {
        min: null,
        max: null,
      },
      model: null,
      search: null,
      box1: false,
      box2: true,
      box3: false,
    };
  },
};
</script>
<style scoped>
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
.q-card{
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
