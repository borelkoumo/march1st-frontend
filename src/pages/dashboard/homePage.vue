<template>
  <q-page class="bg-home">
    <div class="pl-box pr-box container-dashboard">
      <q-toolbar
        class="q-pr-none q-pl-none"
        style="padding-top: 20px; padding-bottom: 40px"
      >
        <div class="title-toolbar">Dashboard</div>
        <q-space />
        <div class="flex q-gutter-md">
          <select-component
            :options="programs"
            :model="program"
            style="min-width: 220px"
          >
            <template v-slot:default> Programs </template>
          </select-component>
          <select-component
            :options="periods"
            :model="period"
            style="min-width: 220px"
          >
            <template v-slot:default> Filter by period </template>
          </select-component>
        </div>
      </q-toolbar>
      <div
        class=""
        style="
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 12px;
        "
      >
        <card-element
          class="card-element"
          style="border-radius: 5px; background-color: #0377e0"
        >
          <template v-slot:header>
            <div class="title-element text-white">{{ cards[0].label }}</div>
            <div class="number-element text-white">{{ cards[0].data }}</div>
          </template>
          <template v-slot:icon>
            <q-btn round flat class="bg-white" size="20px">
              <img src="images/admin/money 1.png" />
            </q-btn>
          </template>
          <template v-slot:footer>
            <span class="">{{ cards[0].percentage }} {{ cards[0].time }}</span>
          </template>
        </card-element>
        <card-element
          class="card-element"
          style="border-radius: 5px; background-color: white"
        >
          <template v-slot:header>
            <div class="title-element" style="color: #66788a">
              {{ cards[1].label }}
            </div>
            <div class="number-element" style="color: #212529">
              {{ cards[1].data }}
            </div>
          </template>
          <template v-slot:icon>
            <q-btn
              round
              flat
              class=""
              size="20px"
              style="background-color: #ec4c47"
            >
              <img src="images/admin/profit-report 1.png" />
            </q-btn>
          </template>
          <template v-slot:footer>
            <span class="" style="color: #66788a"
              >{{ cards[1].percentage }} {{ cards[1].time }}</span
            >
          </template>
        </card-element>
        <card-element
          class="card-element"
          style="border-radius: 5px; background-color: white"
        >
          <template v-slot:header>
            <div class="title-element" style="color: #66788a">
              {{ cards[2].label }}
            </div>
            <div class="number-element" style="color: #212529">
              {{ cards[2].data }}
            </div>
          </template>
          <template v-slot:icon>
            <q-btn
              round
              flat
              class=""
              size="20px"
              style="background-color: #1665d8"
            >
            </q-btn>
          </template>
          <template v-slot:footer>
            <div class="flex q-pt-md q-pr-lg" style="">
              <q-linear-progress :value="cards[2].progress" color="secondary" />
            </div>
          </template>
        </card-element>
        <card-element
          class="card-element"
          style="border-radius: 5px; background-color: white"
        >
          <template v-slot:header>
            <div class="title-element" style="color: #66788a">
              {{ cards[3].label }}
            </div>
            <div class="number-element" style="color: #212529">
              {{ cards[3].data }}
            </div>
          </template>
          <template v-slot:icon>
            <q-btn
              round
              flat
              class=""
              size="20px"
              style="background-color: #ec4c47"
            >
              <img src="images/admin/star 1.png" />
            </q-btn>
          </template>
          <template v-slot:footer>
            <span class="" style="color: #66788a"
              >{{ cards[3].percentage }} {{ cards[3].time }}</span
            >
          </template>
        </card-element>
      </div>
      <div class="q-pt-lg q-pb-lg">
        <div class="bg-white">
          <columnChart :columns="columnChart">
            <template v-slot:default>
              <div>Submission Activities</div>
            </template>
          </columnChart>
        </div>
      </div>
      <div>
        <div
          class="q-pb-lg"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 29px;
          "
        >
          <div class="bg-white" v-for="value in pieData" :key="value.title">
            <pieChart :value="value">
              <template v-slot:default>
                <div>{{ value.title }}</div>
              </template>
            </pieChart>
          </div>
          <!-- <div class="bg-white">
            <pieChart>
              <template v-slot:default>
                <div>Vulnerability Severity</div>
              </template>
            </pieChart>
          </div>
          <div class="bg-white">
            <pieChart>
              <template v-slot:default>
                <div>Acceptance Rate</div>
              </template>
            </pieChart>
          </div>
          <div class="bg-white">
            <pieChart>
              <template v-slot:default>
                <div>Remaining Budget</div>
              </template>
            </pieChart>
          </div> -->
        </div>
      </div>
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Type d'utilisateur</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="typeuser"
            :options="options"
            label="Type d'utilisateur"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Save" v-close-popup @click="createUser(typeuser)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineAsyncComponent } from "vue";

import CardElement from "../../components/card-element.vue";
import SelectComponent from "../../components/select-component.vue";

import { mapActions, mapState } from "vuex";

const columnChart = defineAsyncComponent(() =>
  import("components/column-chart.vue")
);
const pieChart = defineAsyncComponent(() => import("components/pie-chart.vue"));

export default {
  components: { CardElement, columnChart, pieChart, SelectComponent },
  data() {
    return {
      progress: 0.1,
      programs: [{ label: "All Programs", value: "1" }],
      program: { label: "All Programs", value: "1" },
      periods: [{ label: "All time", value: "1" }],
      period: { label: "All time", value: "1" },

      prompt:true,
      typeuser:{ label: "Client", value: "client" },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Client", value: "client" },
        { label: "Hacker", value: "hacker" },
      ],
    };
  },
  computed: {
    ...mapState("dashboard", ["cards", "columnChart", "pieData"]),
  },
  methods: {
    ...mapActions('dashboard',['createUser'])
  },
};
</script>
<style lang="sass" scoped>
.container-dashboard
    width:1172px
    margin:0px auto
.bg-home
    background-color : #eaf5ff
.pl-box
    padding-left:70px
.pr-box
    padding-right:70px
.title-toolbar
    font-family: 'nunito'
    font-style: normal
    font-weight: bold
    font-size: 32px
    line-height: 44px
    letter-spacing: -0.0555556px
    color: #163053
.card-element
    .title-element
        font-family: "nunito"
        font-style: normal
        font-weight: 700
        font-size: 12px
        line-height: 16px
        letter-spacing: 0.996px
        text-transform: uppercase
    .number-element
        font-family: "nunito"
        font-style: normal
        font-weight: 600
        font-size: 24px
        line-height: 28px
        letter-spacing: -0.06px
        padding-top: 8px
</style>
