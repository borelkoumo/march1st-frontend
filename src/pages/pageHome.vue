<template>
  <q-page class="">
    <div class="section banner-header bg-primary" style="position: relative">
      <div class="absolute-banner">
        <div class="text-banner flex flex-center">
          <div class="text-center">
            <p class="text-banner-1">DO YOU BELIEVE</p>
            <p class="text-banner-2">YOUR SYSTEMS</p>
            <p class="text-banner-3">ARE SECURE?</p>
            <p class="text-banner-4">LETS DO A REALITY CHECK</p>
          </div>
        </div>
      </div>
      <div class="absolute-scroll">
        <div class="scroll-btn flex flex-center">
          <div style="text-align: center">
            <q-img src="vectors/scrool down.svg" width="30px" />
            <div class="text-white q-pt-sm q-pb-md">SCROLL</div>
          </div>
        </div>
      </div>
      <q-img src="static-banner.png" height="680px" />
    </div>
    <section-first />
    <section-second />
    <section-third />
    <section-four />
    <section-five />
    <section-six />
    <section-seven/>
    <div class="section pt-box pb-box">
    <div class="header-section" style="padding-bottom: 40px">
      <div class="first-title">BOARD</div>
      <div class="second-title relative-position">
        LEADER BOARD
        <div
          class="tiret-wrap relative-position"
          style="margin: auto; width: 145px; display: block"
        >
          <div
            class="tiret relative-position"
            style="margin-left: -80px; margin-top: -11px; width: 145px"
          ></div>
        </div>
      </div>
    </div>
    <div class="content-box box-leader" style="">
      <div class="q-pt-md bg-secondary" style="padding-bottom: 50px">
        <q-toolbar>
          <q-avatar style="border: 1px solid white">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="q-pl-md text-white">
            <div style="font-family: 'good-time'; font-size: 22px">
              THOMAS EDISEON
            </div>
            <div style="font-size: 18px; font-family: 'nunito'">Rank : 1</div>
          </div>
        </q-toolbar>
        <q-separator color="grey-1" class="q-mt-md" />
        <div
          class="q-pl-md q-pr-md q-pt-md"
          style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 5px"
        >
          <div class="text-center text-white">
            <div>
              <q-circular-progress
                show-value
                font-size="24px"
                class="text-white q-ma-md"
                value="75"
                size="100px"
                :thickness="0.05"
                color="white"
                track-color="primary"
              >
                75%
              </q-circular-progress>
            </div>
            <div style="font-size: 14px; max-width: 100px; margin: auto">
              ACCEPTANCE RATE
            </div>
          </div>
          <div class="text-center text-white">
            <div>
              <q-circular-progress
                show-value
                font-size="24px"
                class="text-white q-ma-md"
                value="50"
                size="100px"
                :thickness="0.05"
                color="white"
                track-color="primary"
              >
                1500
              </q-circular-progress>
            </div>
            <div style="font-size: 14px; max-width: 100px; margin: auto">
              TOTAL POINTS EARNED
            </div>
          </div>
          <div class="text-center text-white">
            <div>
              <q-circular-progress
                show-value
                font-size="24px"
                class="text-white q-ma-md"
                value="83"
                size="100px"
                :thickness="0.05"
                color="white"
                track-color="primary"
              >
                30
              </q-circular-progress>
            </div>
            <div style="font-size: 14px; max-width: 100px; margin: auto">
              TOTAL REPORTS
            </div>
          </div>
          <div class="text-center text-white">
            <div>
              <q-circular-progress
                show-value
                font-size="24px"
                class="text-white q-ma-md"
                value="20"
                size="100px"
                :thickness="0.05"
                color="white"
                track-color="primary"
              >
                P2
              </q-circular-progress>
            </div>
            <div style="font-size: 14px; max-width: 100px; margin: auto">
              AVERAGE SEVERITY
            </div>
          </div>
        </div>
      </div>
      <div style="">
        <q-card>
          <q-card-section>
            <q-toolbar class="bg-transparent btn-leader">
              <q-btn
                label="all time"
                flat
                class="text-white"
                style="
                  background-color: #333333;
                  min-width: 170px;
                  font-size: 16px;
                "
              />
              <q-space />
              <q-btn
                label="Last 90 days"
                flat
                class=""
                style="font-size: 16px; color: black"
              />
              <q-space />
              <q-btn
                label="Last 30 days"
                flat
                class=""
                style="font-size: 16px; color: black"
              />
            </q-toolbar>
          </q-card-section>
          <div class="separator"></div>
          <q-card-section class="q-gutter-sm">
            <q-toolbar class="bg-primary" style="min-height: 75px">
              <div
                class="bg-grey-2 text-center flex flex-center"
                style="
                  font-size: 24px;
                  color: #1d5976;
                  width: 30px;
                  height: 30px;
                  font-family: 'nunito';
                "
              >
                1
              </div>
              <div class="q-pr-md q-pl-md" style="width: 100%">
                <div class="q-pb-xs">
                  <q-toolbar
                    class="q-pa-none text-white"
                    style="min-height: 15px"
                  >
                    <div style="font-size: 16px">Thoma Ediseon</div>
                    <q-space />
                    <div>1500 POINTS</div>
                  </q-toolbar>
                </div>
                <div style="width: 100%">
                  <q-linear-progress
                    size="sm"
                    :value="progress"
                    color="grey-3"
                    track-color="white"
                  />
                </div>
              </div>
            </q-toolbar>
            <q-toolbar class="bg-transparent" style="min-height: 75px">
              <div
                class="bg-grey-2 text-center flex flex-center"
                style="
                  font-size: 24px;
                  color: #1d5976;
                  width: 30px;
                  height: 30px;
                  font-family: 'nunito';
                "
              >
                2
              </div>
              <div class="q-pr-md q-pl-md" style="width: 100%">
                <div class="q-pb-xs">
                  <q-toolbar
                    class="q-pa-none text-primary"
                    style="min-height: 15px"
                  >
                    <div style="font-size: 16px">Thoma Ediseon</div>
                    <q-space />
                    <div>800 POINTS</div>
                  </q-toolbar>
                </div>
                <div style="width: 100%">
                  <q-linear-progress
                    size="sm"
                    :value="progress2"
                    color="secondary"
                  />
                </div>
              </div>
            </q-toolbar>
            <q-toolbar class="bg-transparent" style="min-height: 75px">
              <div
                class="bg-grey-2 text-center flex flex-center"
                style="
                  font-size: 24px;
                  color: #1d5976;
                  width: 30px;
                  height: 30px;
                  font-family: 'nunito';
                "
              >
                3
              </div>
              <div class="q-pr-md q-pl-md" style="width: 100%">
                <div class="q-pb-xs">
                  <q-toolbar
                    class="q-pa-none text-primary"
                    style="min-height: 15px"
                  >
                    <div style="font-size: 16px">Thoma Ediseon</div>
                    <q-space />
                    <div>600 POINTS</div>
                  </q-toolbar>
                </div>
                <div style="width: 100%">
                  <q-linear-progress
                    size="sm"
                    :value="progress3"
                    color="secondary"
                  />
                </div>
              </div>
            </q-toolbar>
            <q-toolbar class="bg-transparent" style="min-height: 75px">
              <div
                class="bg-grey-2 text-center flex flex-center"
                style="
                  font-size: 24px;
                  color: #1d5976;
                  width: 30px;
                  height: 30px;
                  font-family: 'nunito';
                "
              >
                4
              </div>
              <div class="q-pr-md q-pl-md" style="width: 100%">
                <div class="q-pb-xs">
                  <q-toolbar
                    class="q-pa-none text-primary"
                    style="min-height: 15px"
                  >
                    <div style="font-size: 16px">Thoma Ediseon</div>
                    <q-space />
                    <div>600 POINTS</div>
                  </q-toolbar>
                </div>
                <div style="width: 100%">
                  <q-linear-progress
                    size="sm"
                    :value="progress3"
                    color="secondary"
                  />
                </div>
              </div>
            </q-toolbar>
            <q-toolbar class="bg-transparent" style="min-height: 75px">
              <div
                class="bg-grey-2 text-center flex flex-center"
                style="
                  font-size: 24px;
                  color: #1d5976;
                  width: 30px;
                  height: 30px;
                  font-family: 'nunito';
                "
              >
                5
              </div>
              <div class="q-pr-md q-pl-md" style="width: 100%">
                <div class="q-pb-xs">
                  <q-toolbar
                    class="q-pa-none text-primary"
                    style="min-height: 15px"
                  >
                    <div style="font-size: 16px">Thoma Ediseon</div>
                    <q-space />
                    <div>600 POINTS</div>
                  </q-toolbar>
                </div>
                <div style="width: 100%">
                  <q-linear-progress
                    size="sm"
                    :value="progress3"
                    color="secondary"
                  />
                </div>
              </div>
            </q-toolbar>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
    <section-nine/>
  </q-page>
</template>

<script>
import sectionFirst from "src/components/section-first.vue";
import sectionSecond from "src/components/section-second.vue";
import sectionThird from "src/components/section-third.vue";
import sectionFour from "src/components/section-four.vue";
import sectionFive from "src/components/section-five.vue";
import sectionSix from "src/components/section-six.vue";
import sectionSeven from "src/components/section-seven.vue";
import sectionEigth from "src/components/section-eight.vue";
import sectionNine from "src/components/section-nine.vue";
import { defineComponent } from "vue";

import { drawImage, drawLine } from "./utils/draw.js";

export default defineComponent({
  components: {
    sectionFirst,
    sectionSecond,
    sectionThird,
    sectionFour,
    sectionFive,
    sectionSix,
    sectionSeven,
    sectionEigth,
    sectionNine
  },
  name: "PageIndex",
  data() {
    return {
      progress: 0.85,
      progress2: 0.65,
      progress3: 0.55,
    };
  },
  mounted() {
    /* const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    //drawLine(ctx);
    drawImage(ctx); */
  },
});
</script>
<style>
.absolute-banner {
  background-color: rgba(7, 0, 28, 0.8);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
}
.absolute-scroll {
  position: absolute;
  z-index: 999;
  bottom: 20px;
  width: 100%;
}
.text-banner {
  position: relative;
  top: 50%;
  transform: perspective(1px) translateY(-50%);
  font-family: "good-time";
  font-size: 40px;
}
.scroll-btn {
  position: relative;
  bottom: 5%;
  font-family: "nunito";
  letter-spacing: 5px;
  font-size: 10px;
}

.text-banner .text-banner-2 {
  color: #ababab;
  opacity: 0.6;
}
.text-banner .text-banner-3 {
  color: #ababab;
  opacity: 0.3;
}
.text-banner .text-banner-4 {
  color: #ababab;
  opacity: 0.1;
}

.header-section {
  font-family: "good-time";
  text-align: center;
}
.header-section .tiret {
  height: 4px;
  background-color: #0377e0;
}
.header-section-2 .tiret {
  height: 4px;
  background-color: #0377e0;
}

.header-section .first-title {
  font-size: 80px;
  color: #eee;
  opacity: 1;
  font-weight: bold;
  letter-spacing: 2.75px;
}
.header-section .first-title-white {
  font-size: 80px;
  color: white;
  opacity: 0.5;
  font-weight: bold;
}
.header-section .second-title {
  font-size: 29px;
  font-weight: bold;
  margin-top: -50px;
  letter-spacing: 2.75px;
}
.header-section .second-title-2 {
  font-weight: bold;
  margin-top: -30px;
}

.content-box {
  width: 1170px;
  margin: auto;
  font-family: "nunito";
}
.content-box-2 {
  margin: auto;
  font-family: "nunito";
  text-align: center;
}
.content-box-2 .first-title {
  opacity: 0.2;
}
.content-box-2 .second-title-2 {
  margin-top: -50px;
  font-size: 31px;
}
.pt-box {
  padding-top: 60px;
}
.pb-box {
  padding-bottom: 60px;
}
.content-box.text-box {
  font-size: 24px;
  text-align: center;
  max-width: 1024px;
}

.tab-elt {
  padding-bottom: 30px;
}
.tab-box-elt .q-tab__label {
  font-size: 24px;
  font-weight: 600;
}
.content-box .q-tab__indicator {
  height: 2px;
  top: 77px;
  background: currentColor;
}

.content-box .card-content {
  max-width: 1024px;
  margin: auto;
}

.header-section-2 {
  font-family: "good-time";
}
.header-section-2 .first-title {
  font-size: 80px;
  color: #345f94;
}
.header-section-2 .second-title {
  font-size: 32px;
  color: white;
  margin-top: -50px;
}
.section-2 .box-text {
  max-height: min-content;
  max-width: 850px;
  border-left: 3px solid #0676e2;
  font-size: 22px;
  font-family: "nunito";
  color: white;
}
.separator {
  border: 1px dashed #ababab;
}

.background-frame {
  background-image: url("~assets/bg-01.png");
  background-size: cover;
  border-radius: 50%;
  width: 350px;
  height: 350px;
}
.background-frame .q-img__content > div {
  pointer-events: all;
  position: absolute;
  padding: 16px;
  color: black;
  background: transparent;
}

.box-leader {
  display: grid;
  grid-template-columns: 2fr 4fr;
}
ul.march-list li::before {
  content: "\2022";
  width: 1em;
  margin-left: -1.05em;
  color: #0676e2;
  font-weight: bold;
  display: inline-block;
}
.background-image2 {
  background-image: url("~assets/bg-image-1.png");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position-x: 120%;
  background-position-y: -30px;
}
.background-image3 {
  background-image: url("~assets/bg-image-2.png");
  background-repeat: no-repeat;
}
.opacity-background3 {
  background-color: rgba(3, 119, 224, 0.4);
}

@media (max-width: 599px) {
  .text-banner {
    font-size: 20px;
  }
  .content-box {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
  .item-flex {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding-top: 20px;
  }
  .item-flex .first-elt {
    padding-right: 20px;
    margin: auto;
  }
  .item-flex .second-elt {
    padding-top: 15px;
  }
  .carousel-approach .q-carousel {
    height: inherit;
  }
  
  .content-box-2 {
    width: 100%;
    margin: auto;
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
  }
  .content-box-2 p {
    padding-top: 12px;
    font-size: 12px;
    font-family: "nunito";
    color: lightgray;
  }
  .content-box-2 .header-section {
    padding-top: 0px;
  }
  .box-leader {
    grid-template-columns: 1fr;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
  .box-leader .q-card {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }
  .box-leader .q-card__section--vert {
    padding-left: 0px;
    padding-right: 0px;
  }
  .box-leader .q-gutter-sm > * {
    margin-left: 0px;
  }
  .btn-leader .q-btn {
    font-size: 11px;
  }
  .q-toolbar.btn-leader {
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .header-section-2 {
    padding-top: 0px;
  }
  .header-section-2.content-box {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .section-2 .box-text {
    max-height: min-content;
    font-size: 10px;
    width: 100%;
    border-left: 3px solid #0676e2;
  }

  .pt-box {
    padding-top: 15px;
  }
  .pb-box {
    padding-bottom: 20px;
  }

  .tab-box-elt .q-tab__label {
    font-size: 12px;
  }
  .content-box-xs {
    padding-left: 0px;
  }
  .content-box .q-tab__indicator {
    height: 2px;
    top: 34px;
    background: currentColor;
  }
  
  .tab-elt {
    padding-bottom: 0px;
  }
  .content-box.text-box {
    font-size: 15px;
    text-align: left;
  }
  .header-section {
    padding-left: 15px;
  }
  .header-section .first-title {
    font-size: 30px;
    letter-spacing: 1px;
    text-align: left;
  }
  .header-section .first-title-white {
    font-size: 30px;
    color: white;
    opacity: 0.5;
    font-weight: bold;
  }
  .header-section .second-title {
    font-size: 18px;
    margin-top: -20px;
    letter-spacing: 1px;
    text-align: left;
  }
  .header-section .second-title-2 {
    font-weight: bold;
    margin-top: -30px;
  }
}
</style>
