<template>
  <q-page class="">
    <div class="section banner-header bg-primary" style="position:relative;">
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
          <div style="text-align:center">
            <q-img src="vectors/scrool down.svg" width="30px"/>
            <div class="text-white q-pt-sm q-pb-md">SCROLL</div>
          </div>
        </div>
      </div>
      <q-img src="static-banner.png" height="680px"/>
    </div>
    <div class="section">
      <div class="header-section">
        <div class="first-title">PROGRAM</div>
        <div class="second-title">A ANATOMY OF BUG BOUNTY PROGRAM</div>
      </div>
      <div class="content-box text-box">
        <p>Your Bug Bounty Program can take on many different forms depending on your organization's maturity, objectives, scope, testing timelines, and budget
        </p>
      </div>
      <div class="content-box">
        <q-tabs
          v-model="tabtype"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="public" label="Public vs Private" no-caps content-class="tab-elt"/>
          <q-tab name="scope" label="Scope" no-caps content-class="tab-elt"/>
          <q-tab name="time" label="Time" no-caps content-class="tab-elt"/>
          <q-tab name="budget" label="Budget" no-caps content-class="tab-elt"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabtype" animated>
          <q-tab-panel name="public">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="scope">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="time">
            <div class="header-section">
              <div class="first-title">TIME</div>
              <div class="second-title">TIME</div>
            </div>
            <div class="flex flex-center no-wrap">
              <div class="flex gt-xs" style="width:100%; margin-top:-70px;">
                <q-img src="vectors/frame.svg" width="200px"/>
                <q-img src="images/load-1.png" width="200px" style="left:120px; bottom:50px;" class="absolute"/>
              </div>
              <div>
                <div class="item-flex">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="100px"/>
                  </div>
                  <div class="second-elt">
                    <div>CONTINUOS</div>
                      <div caption>Continuos programs are recommanded for all customers, esp. for high value targets and dynamic/agile environnements.
                      </div>
                  </div>
                </div>
                <div class="item-flex">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="100px"/>
                  </div>
                  <div class="second-elt">
                    <div>PROJECT BASED</div>
                      <div caption>Project based programs are limited to an agreed duration, similar to a traditional penetration test.
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="budget">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <div class="section q-pt-lg q-pb-lg" style="background-color:#ebf5ff; font-family:'nunito'">
      <div class="content-box" style="font-family:'nunito'">
        <p class="q-pt-lg text-center">We recommend a <b>crawl/walk/run</b> approach to your bug bounty program by adjusting the above parameters. This allows you to streamline your patching processes and prepared, and equipped to promptly resolve discovered vulnerabilities.</p>
        <div class="flex flex-center no-wrap q-pb-lg q-pt-md gt-xs">
          <q-card class="my-card bg-transparent" flat>
            <group-frame style="text-align:center;"/>
            <q-card-section style="text-align:center; font-family:'good-time';">
              <div class="text-h6 q-pt-lg">CRAWL</div>
            </q-card-section>
            <q-card-section class="q-pt-none text-center text-grey-7">
              Launch private bug bounty with limited scope
            </q-card-section>
          </q-card>
          <q-card class="my-card bg-transparent" flat>
            <group-frame style="text-align:center;"/>
            <q-card-section style="text-align:center; font-family:'good-time';">
              <div class="text-h6 q-pt-lg">WALK</div>
            </q-card-section>
            <q-card-section class="q-pt-none text-center text-grey-7">
              Transition to public program
            </q-card-section>
          </q-card>
          <q-card class="my-card bg-transparent" flat>
            <group-frame style="text-align:center;"/>
            <q-card-section style="text-align:center; font-family:'good-time';">
              <div class="text-h6 q-pt-lg">RUN</div>
            </q-card-section>
            <q-card-section class="q-pt-none text-center text-grey-7">
              Increase rewards. add targets
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pt-md xs carousel-approach">
          <q-carousel
            v-model="slideApproach"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            control-color="primary"
            infinite
            :autoplay="true"
            class="bg-transparent"
          >
            <q-carousel-slide name="crawl" class="column no-wrap flex-center">
              <q-card class="my-card bg-transparent" flat>
                <group-frame style="text-align:center;"/>
                <q-card-section style="text-align:center; font-family:'good-time';">
                  <div class="text-h6 q-pt-lg">CRAWL</div>
                </q-card-section>
                <q-card-section class="q-pt-none text-center text-grey-7">
                  Launch private bug bounty with limited scope
                </q-card-section>
              </q-card>
            </q-carousel-slide>
            <q-carousel-slide name="walk" class="column no-wrap flex-center">
              <q-card class="my-card bg-transparent" flat>
                <group-frame style="text-align:center;"/>
                <q-card-section style="text-align:center; font-family:'good-time';">
                  <div class="text-h6 q-pt-lg">WALK</div>
                </q-card-section>
                <q-card-section class="q-pt-none text-center text-grey-7">
                  Transition to public program
                </q-card-section>
              </q-card>
            </q-carousel-slide>
            <q-carousel-slide name="run" class="column no-wrap flex-center">
              <q-card class="my-card bg-transparent" flat>
                <group-frame style="text-align:center;"/>
                <q-card-section style="text-align:center; font-family:'good-time';">
                  <div class="text-h6 q-pt-lg">RUN</div>
                </q-card-section>
                <q-card-section class="q-pt-none text-center text-grey-7">
                  Increase rewards. add targets
                </q-card-section>
              </q-card>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>
    <div class="section" style="height:500px">
      <div class="header-section">
        <div class="first-title">CUSTOMERS</div>
        <div class="second-title">HOW IT WORKS FOR CUSTOMERS?</div>
      </div>
      <div class="content-box flex flex-center">
        <div>
          <!-- <canvas id="myCanvas" width="600" height="400" style="border:1px solid #000000;"></canvas> -->
          <div class="background-frame relative-position">
            <q-img class="relative-position" style="left:-25px; top:-5px;" src="vectors/frame-02.svg" width="250px"/>
            
            <div class="relative-position" style="left:-100px; top:-150px;max-width:100px; text-align:center">
              <q-img class="relative-position" src="steps/step1.svg" width="50px"/>
              <div>Tailor your Bug BountyProgram</div>
            </div>

            <div class="relative-position" style="left:-70px; top:-150px;max-width:100px; text-align:center">
              <q-img class="relative-position" src="steps/step2.svg" width="50px"/>
              <div>All partis agree on Terms & Condition</div>
            </div>

            <div class="relative-position" style="left:15px; top:-215px;max-width:170px; text-align:center">
              <q-img class="relative-position" src="steps/step3.svg" width="50px"/>
              <div>Researches search for and securely submit Vulnerabilities to march1st</div>
            </div>

            <div class="relative-position" style="left:135px; top:-385px;max-width:170px; text-align:center">
              <q-img class="relative-position" src="steps/step4.svg" width="50px"/>
              <div>March1st validates and Triages the submissions</div>
            </div>

            <div class="relative-position" style="left:225px; top:-585px;min-width:300px;">
              <q-img class="relative-position" src="steps/step4.svg" width="50px"/>
              <div>Client Receives Only Validated and Properly Documented Vulnerability Reports with Recommendation For Remediation</div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="section q-pt-lg q-pb-lg" style="background-color:#ebf5ff; font-family:'nunito'">
      <div class="header-section q-pt-lg q-pb-lg">
        <div class="first-title-white">MARCH FIRST</div>
        <div class="second-title">CUSTOMERS THAT MARCH FIRST</div>
      </div>
      <div class="content-box flex-content">
        <div class="gt-xs" style="margin-top:-30px; margin-left:-20px; opacity:.5">
          <q-img src="vectors/Project Based.svg" width="150px"/>
        </div>
        <div style="font-size:15px;" class="text-center">
          <div style="margin: auto;">Proin eget tortor risus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</div>
          <q-carousel
            v-model="slide"
            swipeable
            animated
            control-color="secondary"
            navigation
            class="rounded-borders bg-transparent q-pt-lg q-pb-none"
            style="height:inherit;"
          >
            <q-carousel-slide name="style" class="q-pt-none">
              <div class="flex-content flex-center">
                <div>
                  <img src="vectors/Project Based.svg"/>
                </div>
                <div style="text-align:left;">
                  <div>HELPING EMIRATES AIRLINE TO SECURE THIER SYSTEM</div>
                  <ul>
                    <li>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</li>
                    <li>Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</li>
                    <li>Nulla porttitor accumsan tincidunt. Sed porttitor lectus nibh.</li>
                  </ul>
                  <q-btn flat class="bg-secondary text-white">READ STUDY CASE</q-btn>
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="header-section">
        <div class="first-title">SERVICE</div>
        <div class="second-title">ACTIVE PROGRAMS</div>
      </div>
      <div class="content-box">
        <q-toolbar>
          <q-input color="primary" outlined v-model="search" placeholder="Search To Provider Service" dense class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
          <div class="q-gutter-sm gt-xs">
            <q-btn label="PUBLIC (25)" class="bg-primary text-white" flat/>
            <q-btn label="PRIVATE (55)" class="bg-primary text-white" flat/>
            <q-btn label="POINONLY (55)" class="bg-primary text-white" flat/>
            <q-btn label="REWARD (55)" class="bg-primary text-white" flat/>
          </div>
          <q-btn label="ALL" icon-right="menu" dense no-wrap class="bg-primary text-white"/>
        </q-toolbar>
      </div>
      <div class="content-box grid-content q-pa-sm shadow-0" style="margin-bottom:0px;">
        <thumbnail/>
        <thumbnail/>
        <thumbnail/>
      </div>
    </div>
    <div class="section q-pl-md q-pr-md" style="background-color:#ebf5ff; font-family:'nunito';">
      <div class="header-section q-pb-lg">
        <div class="first-title-white">MARCH1STX</div>
        <div class="second-title">WHY HACK WITH MARCH<span class="text-secondary">1</span><sup>ST</sup>?</div>
      </div>
      <div class="item-block q-mb-lg">
        <div class="title">OUR PRIOGRAMS ARE NOT CROWDED</div>
        <div class="q-pt-sm">March1st is a new platform & we are very selective with the researchers we work with</div>
      </div>
      <div class="item-block q-mb-lg">
        <div class="title">THE MIDDLE EAST IS STILL AN ACENT MARKET FOR BUG BOUNTIES </div>
        <div class="q-pt-sm">March1st is a new platform & we are very selective with the researchers we work with</div>
      </div>
      <div class="item-block q-mb-lg">
        <div class="title">NO TAXES FORMS</div>
        <div class="q-pt-sm">March1st is a new platform & we are very selective with the researchers we work with</div>
      </div>
      <div class="item-block q-mb-lg">
        <div class="title">PROTECTION FOR UNSOLICITED DISCLOSURE</div>
        <div class="q-pt-sm">March1st is a new platform & we are very selective with the researchers we work with</div>
      </div>
    </div>
    <div class="section q-pt-lg q-pb-lg" style="background-color:#102540;">
      <div class="flex flex-center content-box-2">
        <div class="header-section">
          <div class="first-title">MAHACKER</div>
          <div class="second-title-2 text-white flex flex-center" no-wrap>
            ENLIST AS A <q-img src="vectors/logo.svg" width="80px" class="q-mr-sm q-ml-sm"/> HACKER</div>
        </div>
      </div>
      <div class="content-box-2 text-white" style="font-size:15px;">
        <p>Join march1st and make name for yourself as part of our distinguished community of ethical hackers protecting our clients.</p>
        <q-btn class="bg-secondary" flat>READ STUDY CASE</q-btn>
      </div>
    </div>
    <div class="section q-pb-lg">
      <div class="header-section">
        <div class="first-title">BOARD</div>
        <div class="second-title">LEADER BOARD</div>
      </div>
      <div class="content-box box-leader" style="">
        <div class="q-pt-md q-pb-md bg-secondary">
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
            <div class="q-pl-md text-white">
              <div>THOMAS EDISEON</div>
              <div>Rank : 1</div>
            </div>
          </q-toolbar>
          <q-separator color="grey-1" class="q-mt-md"/>
          <div class="" style="display:grid; grid-template-columns:1fr 1fr; grid-gap:5px;">
            <div class="text-center text-white">
              <div>
                <q-circular-progress
                  show-value
                  font-size="16px"
                  class="text-white q-ma-md"
                  value="75"
                  size="60px"
                  :thickness="0.05"
                  color="white"
                  track-color="primary"
                >
                  75%
                </q-circular-progress>
              </div>
              <div>ACCEPTANCE RATE</div>
            </div>
            <div class="text-center text-white">
              <div>
                <q-circular-progress
                  show-value
                  font-size="16px"
                  class="text-white q-ma-md"
                  value="50"
                  size="60px"
                  :thickness="0.05"
                  color="white"
                  track-color="primary"
                >
                  1500
                </q-circular-progress>
              </div>
              <div>TOTAL POINTS EARNED</div>
            </div>
            <div class="text-center text-white">
              <div>
                <q-circular-progress
                  show-value
                  font-size="16px"
                  class="text-white q-ma-md"
                  value="83"
                  size="60px"
                  :thickness="0.05"
                  color="white"
                  track-color="primary"
                >
                  30
                </q-circular-progress>
              </div>
              <div>TOTAL REPORTS</div>
            </div>
            <div class="text-center text-white">
              <div>
                <q-circular-progress
                  show-value
                  font-size="16px"
                  class="text-white q-ma-md"
                  value="20"
                  size="60px"
                  :thickness="0.05"
                  color="white"
                  track-color="primary"
                >
                  P2
                </q-circular-progress>
              </div>
              <div>AVERAGE SEVERITY</div>
            </div>
          </div>
        </div>
        <div style="">
          <q-card>
            <q-card-section>
              <q-toolbar class="bg-transparent btn-leader">
                <q-btn label="all time" flat class="text-white bg-primary"/>
                <q-space/>
                <q-btn label="Last 90 days" flat class="text-primary"/>
                <q-space/>
                <q-btn label="Last 30 days" flat class="text-primary"/>
              </q-toolbar>
            </q-card-section>
            <div class="separator"></div>
            <q-card-section class="q-gutter-sm">
              <q-toolbar class="bg-primary">
                <div class="bg-grey-2 text-primary text-center flex flex-center" style="width:30px; height:30px;">1</div>
                <div class="q-pr-md q-pl-md" style="width:100%;">
                  <div class="q-pb-xs">
                    <q-toolbar class="q-pa-none text-white" style="min-height:15px">
                      <div>Thoma Ediseon</div>
                      <q-space/>
                      <div>1500 POINTS</div>
                    </q-toolbar>
                  </div>
                  <div style="width:100%;">
                    <q-linear-progress size="sm"
                      :value="progress"
                      color="grey-3"
                      track-color="white"
                    />
                  </div>
                </div>
              </q-toolbar>
              <q-toolbar class="bg-transparent">
                <div class="bg-grey-2 text-primary text-center flex flex-center" style="width:30px; height:30px;">2</div>
                <div class="q-pr-md q-pl-md" style="width:100%;">
                  <div class="q-pb-xs">
                    <q-toolbar class="q-pa-none text-primary" style="min-height:15px">
                      <div>Thoma Ediseon</div>
                      <q-space/>
                      <div>800 POINTS</div>
                    </q-toolbar>
                  </div>
                  <div style="width:100%;">
                    <q-linear-progress size="sm"
                      :value="progress2"
                      color="secondary"
                    />
                  </div>
                </div>
              </q-toolbar>
              <q-toolbar class="bg-transparent">
                <div class="bg-grey-2 text-primary text-center flex flex-center" style="width:30px; height:30px;">3</div>
                <div class="q-pr-md q-pl-md" style="width:100%;">
                  <div class="q-pb-xs">
                    <q-toolbar class="q-pa-none text-primary" style="min-height:15px">
                      <div>Thoma Ediseon</div>
                      <q-space/>
                      <div>600 POINTS</div>
                    </q-toolbar>
                  </div>
                  <div style="width:100%;">
                    <q-linear-progress size="sm"
                      :value="progress3"
                      color="secondary"
                    />
                  </div>
                </div>
              </q-toolbar>
              <q-toolbar class="bg-transparent">
                <div class="bg-grey-2 text-primary text-center flex flex-center" style="width:30px; height:30px;">4</div>
                <div class="q-pr-md q-pl-md" style="width:100%;">
                  <div class="q-pb-xs">
                    <q-toolbar class="q-pa-none text-primary" style="min-height:15px">
                      <div>Thoma Ediseon</div>
                      <q-space/>
                      <div>600 POINTS</div>
                    </q-toolbar>
                  </div>
                  <div style="width:100%;">
                    <q-linear-progress size="sm"
                      :value="progress3"
                      color="secondary"
                    />
                  </div>
                </div>
              </q-toolbar>
              <q-toolbar class="bg-transparent">
                <div class="bg-grey-2 text-primary text-center flex flex-center" style="width:30px; height:30px;">5</div>
                <div class="q-pr-md q-pl-md" style="width:100%;">
                  <div class="q-pb-xs">
                    <q-toolbar class="q-pa-none text-primary" style="min-height:15px">
                      <div>Thoma Ediseon</div>
                      <q-space/>
                      <div>600 POINTS</div>
                    </q-toolbar>
                  </div>
                  <div style="width:100%;">
                    <q-linear-progress size="sm"
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
    <div class="section section-2 q-pb-lg q-pt-sm" style="background-color:#023577;">
      <div class="header-section-2 content-box">
        <div class="first-title">EAQ</div>
        <div class="second-title text-white">FREQUENTLY ASKED QUESTIONS</div>
      </div>
      <div class="content-box">
        <div class="text-grey-4 q-pl-sm box-text" style="">
          <p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
        </div>
        <q-list class="q-pt-sm q-gutter-md">
          <q-expansion-item
            group="somegroup"
            label="Is Anyone Can Register In The Program?"
            header-class="bg-white text-primary"
            expand-icon-class="text-secondary"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
          
          <q-expansion-item group="somegroup" label="How We Get The Awrd" default-opened header-class="bg-white text-primary" expand-icon-class="text-secondary">
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item group="somegroup" label="When It Will Be Last Day To Submit A Report" header-class="bg-white text-primary" expand-icon-class="text-secondary">
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            group="somegroup"
            label="Is Anyone Can Register In The Program ?"
            header-class="bg-white text-primary"
            expand-icon-class="text-secondary"
          >
            <q-card class="bg-teal-2">
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            group="somegroup"
            label="How We Get The Awd"
            header-class="bg-white text-primary"
            expand-icon-class="text-secondary"
          >
            <q-card class="bg-teal-2">
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="text-center">
        <q-btn label="View More" flat no-caps class="text-center bg-secondary text-white"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import thumbnail from 'src/components/thumbnail.vue';
import { defineComponent } from 'vue';
import GroupFrame from '../components/group-frame.vue';
import {drawImage, drawLine} from './utils/draw.js';

export default defineComponent({
  components: { thumbnail,GroupFrame },
  name: 'PageIndex',
  data(){
    return{
      tabtype:'time',
      search:null,
      slide:"style",
      progress:0.85,
      progress2:0.65,
      progress3:0.55,
      slideApproach:"crawl"
    }
  },
  mounted(){
    /* const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    //drawLine(ctx);
    drawImage(ctx); */
  }
})
</script>
<style>
  .absolute-banner{
    background-color: rgba(7, 0, 28, .8);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    color:white;
    padding-left:10px;
    padding-right:10px;
  }
  .absolute-scroll{
    position: absolute;
    z-index: 999;
    bottom: 20px;
    width: 100%;
  }
  .text-banner{
    position: relative;
    top: 50%;
    transform: perspective(1px) translateY(-50%);
    font-family: 'good-time';
    font-size: 40px;
  }
  .scroll-btn{
    position: relative;
    bottom: 5%;
    font-family: 'nunito';
    letter-spacing: 5px;
    font-size: 10px;
  }

  .text-banner .text-banner-2{
    color: #ababab;
    opacity: 0.6;
  }
  .text-banner .text-banner-3{
    color: #ababab;
    opacity: 0.3;
  }
  .text-banner .text-banner-4{
    color: #ababab;
    opacity: 0.1;
  }

  .header-section{
    font-family: 'good-time';
    text-align: center;
    padding-top: 25px;
  }
  
  .header-section .first-title{
    font-size: 40px;
    color: #ababab;
    opacity: .3;
    font-weight: bold;
  }
  .header-section .first-title-white{
    font-size: 40px;
    color:white;
    opacity: .6;
    font-weight: bold;
  }
  .header-section .second-title{
    font-size: 20px;
    font-weight: bold;
    margin-top: -30px;
  }
  .header-section .second-title-2{
    font-weight: bold;
    margin-top: -30px;
  }
  .flex-content{
    display:flex;
    flex-wrap:nowrap;
  }
  .content-box{
    width: 768px;
    margin: 30px auto;
    font-family: 'nunito';
  }
  .content-box-2{
    width: 480px;
    margin: 30px auto;
    font-family: 'nunito';
    text-align:center;
  }
  .content-box.text-box{
    font-size: 17px;
    text-align: center;
  }
  .item-flex{
    display: flex;
    flex-wrap:nowrap;
  }
  .item-flex .first-elt{
    padding-right:20px;
  }
  .tab-elt{
    font-size: 30px;
    font-weight: bold;
  }

  .header-section-2{
    font-family: 'good-time';
    padding-top: 25px;
  }
  .header-section-2 .first-title{
    font-size: 40px;
    color: #ababab;
    opacity: .3;
    font-weight: bold;
  }
  .header-section-2 .second-title{
    font-size: 15px;
    margin-top: -25px;
  }
  .section-2 .box-text{
    max-height:min-content; 
    font-size:13px; 
    width:600px; 
    border-left:3px solid #0676e2;
  }
  .separator{
    border:1px dashed #ababab;
  }

  .background-frame{
    background-image:url("~assets/bg-01.png");
    background-size: cover;
     height:200px; 
     width:200px; 
     border-radius:50%
  }
  .grid-content{
    display:grid; 
    grid-template-columns:1fr 1fr 1fr; 
    grid-gap:15px; 
    background-color:#f2f6f7; 
    border-radius:5px;
  }
  .item-block{
    border-left:2px solid #0676e2;
    padding-left:10px;
    font-family:'nunito';
  }
  .item-block .title{
    font-weight: bolder;
    font-family:'good-time';
  }
  .box-leader{
    display:grid; 
    grid-template-columns:2fr 4fr;
  }
  @media (max-width: 599px){
    .text-banner{
      font-size: 20px;
    }
    .content-box{
      width: 100%;
      padding-left:10px;
      padding-right:10px;
    }
    .item-flex{
      display: flex;
      flex-wrap:wrap;
      text-align: center;
      padding-top:20px;
    }
    .item-flex .first-elt{
      padding-right:20px;
      margin:auto;
    }
    .item-flex .second-elt{
      padding-top:15px;
    }
    .carousel-approach .q-carousel{
      height: inherit;
    }
    .flex-content{
      display:block;
      flex-wrap:wrap;
    }
    .grid-content{
      grid-template-columns:1fr; 
    }
    .content-box-2{
      width: 100%;
      margin: auto;
      text-align:left;
      padding-left:10px;
      padding-right: 10px;
    }
    .content-box-2 p{
      padding-top:12px;
      font-size:12px;
      font-family: 'nunito';
      color:lightgray;
    }
    .content-box-2 .header-section {
        padding-top: 0px;
    }
    .box-leader{
      grid-template-columns:1fr;
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
    .box-leader .q-card{
      padding-left:0;
      padding-right:0;
      margin-left:0;
      margin-right:0;
    }
    .box-leader .q-card__section--vert {
        padding-left: 0px;
        padding-right:0px;
    }
    .box-leader .q-gutter-sm > * {
        margin-left: 0px;
    }
    .btn-leader .q-btn{
      font-size:11px;
    }
    .q-toolbar.btn-leader{
      padding-left:5px;
      padding-right: 5px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
    .header-section-2{
      padding-top:0px;
    }
    .header-section-2.content-box{
      margin-top:0px;
      margin-bottom: 0px;
    }
    .section-2 .box-text{
      max-height:min-content; 
      font-size:10px; 
      width:100%; 
      border-left:3px solid #0676e2;
    }
  }
</style>