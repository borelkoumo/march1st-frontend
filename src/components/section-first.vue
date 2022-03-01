<template>
  <div class="section section-pt section-first">
    <div class="header-section">
      <div class="first-title">PROGRAM</div>
      <div class="second-title relative-position">
        A ANATOMY OF BUG BOUNTY PROGRAM
        <div
          class="tiret-wrap relative-position"
          style="margin: auto; width: 523px"
        >
          <div
            class="tiret relative-position"
            style="margin-left: -148px; margin-top: -11px; width: 523px"
          ></div>
        </div>
      </div>
    </div>
    <div class="content-box text-box pt-box pb-box">
      <p>
        Your Bug Bounty Program can take on many different forms depending on
        your organization's maturity, objectives, scope, testing timelines, and
        budget
      </p>
    </div>
    <div class="content-box content-box-xs">
      <q-tabs
        v-model="tabtype"
        dense
        class="tab-box-elt"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="public"
          label="Public vs Private"
          no-caps
          class="tab-elt"
        />
        <q-tab name="scope" label="Scope" no-caps class="tab-elt" />
        <q-tab name="time" label="Time" no-caps class="tab-elt" />
        <q-tab name="budget" label="Budget" no-caps class="tab-elt" />
      </q-tabs>
      <q-separator />
    </div>
    <div class="pb-box wrap-tabs">
      <q-tab-panels v-model="tabtype" animated>
        <q-tab-panel name="public">
          <div class="header-section pb-box pt-box">
            <div class="first-title">PUBLIC VS PRIVATE</div>
            <div class="second-title relative-position">
              PUBLIC VS PRIVATE
              <div
                class="tiret-wrap relative-position"
                style="margin: auto; width: 40px"
              >
                <div
                  class="tiret relative-position"
                  style="margin-left: -21px; margin-top: -11px; width: 40px"
                ></div>
              </div>
            </div>
          </div>
          <div class="content-panel">
            <div class="flex gt-xs" style="margin-top: -95px">
              <q-img src="vectors/frame.svg" width="400px" />
            </div>
            <div class="content-box relative-position">
              <q-img
                src="images/load-1.png"
                width="520px"
                style=""
                class="gt-xs"
              />
              <div class="content-box-item" style="">
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">CONTINUOS</div>
                    <div caption class="content">
                      Continuos programs are recommanded for all customers, esp.
                      for high value targets and dynamic/agile environnements.
                    </div>
                  </div>
                </div>
                <div
                  class=""
                  style="
                    height: 1px;
                    border-bottom: 0px;
                    border-style: dashed;
                    border-color: #a3c8d4;
                  "
                ></div>
                <div class="box-vs absolute text-secondary text-bold" style="">
                  VS.
                </div>
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">PROJECT BASED</div>
                    <div caption class="content">
                      Project based programs are limited to an agreed duration,
                      similar to a traditional penetration test.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="scope">
          <div class="header-section pb-box pt-box">
            <div class="first-title">SCOPE</div>
            <div class="second-title relative-position">
              SCOPE
              <div
                class="tiret-wrap relative-position"
                style="margin: auto; width: 40px"
              >
                <div
                  class="tiret relative-position"
                  style="margin-left: -21px; margin-top: -11px; width: 40px"
                ></div>
              </div>
            </div>
          </div>
          <div class="content-panel">
            <div class="flex gt-xs" style="margin-top: -95px">
              <q-img src="vectors/frame.svg" width="400px" />
            </div>
            <div class="content-box relative-position">
              <q-img
                src="images/load-1.png"
                width="520px"
                style=""
                class="gt-xs"
              />
              <div class="content-box-item" style="">
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">CONTINUOS</div>
                    <div caption class="content">
                      Continuos programs are recommanded for all customers, esp.
                      for high value targets and dynamic/agile environnements.
                    </div>
                  </div>
                </div>
                <div
                  class=""
                  style="
                    height: 1px;
                    border-bottom: 0px;
                    border-style: dashed;
                    border-color: #a3c8d4;
                  "
                ></div>
                <div class="box-vs absolute text-secondary text-bold" style="">
                  VS.
                </div>
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">PROJECT BASED</div>
                    <div caption class="content">
                      Project based programs are limited to an agreed duration,
                      similar to a traditional penetration test.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="time">
          <div class="header-section pb-box pt-box">
            <div class="first-title">TIME</div>
            <div class="second-title relative-position">
              TIME
              <div
                class="tiret-wrap relative-position"
                style="margin: auto; width: 40px"
              >
                <div
                  class="tiret relative-position"
                  style="margin-left: -21px; margin-top: -11px; width: 40px"
                ></div>
              </div>
            </div>
          </div>
          <div class="content-panel">
            <div class="flex gt-xs" style="margin-top: -95px">
              <q-img src="vectors/frame.svg" width="400px" />
            </div>
            <div class="content-box relative-position">
              <q-img
                src="images/load-1.png"
                width="520px"
                style=""
                class="gt-xs"
              />
              <div class="content-box-item" style="">
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">CONTINUOS</div>
                    <div caption class="content">
                      Continuos programs are recommanded for all customers, esp.
                      for high value targets and dynamic/agile environnements.
                    </div>
                  </div>
                </div>
                <div
                  class=""
                  style="
                    height: 1px;
                    border-bottom: 0px;
                    border-style: dashed;
                    border-color: #a3c8d4;
                  "
                ></div>
                <div class="box-vs absolute text-secondary text-bold" style="">
                  VS.
                </div>
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Project Based.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">PROJECT BASED</div>
                    <div caption class="content">
                      Project based programs are limited to an agreed duration,
                      similar to a traditional penetration test.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="budget">
          <div class="header-section pb-box pt-box">
            <div class="first-title">BUDGET</div>
            <div class="second-title relative-position">
              BUDGET
              <div
                class="tiret-wrap relative-position"
                style="margin: auto; width: 40px"
              >
                <div
                  class="tiret relative-position"
                  style="margin-left: -21px; margin-top: -11px; width: 40px"
                ></div>
              </div>
            </div>
          </div>
          <div class="content-panel">
            <div class="flex gt-xs" style="margin-top: -95px">
              <q-img src="vectors/frame.svg" width="400px" />
            </div>
            <div class="content-box relative-position">
              <q-img
                src="images/load-1.png"
                width="520px"
                style=""
                class="gt-xs"
              />
              <div class="content-box-item" style="">
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">CONTINUOS</div>
                    <div caption class="content">
                      Continuos programs are recommanded for all customers, esp.
                      for high value targets and dynamic/agile environnements.
                    </div>
                  </div>
                </div>
                <div
                  class=""
                  style="
                    height: 1px;
                    border-bottom: 0px;
                    border-style: dashed;
                    border-color: #a3c8d4;
                  "
                ></div>
                <div class="box-vs absolute text-secondary text-bold" style="">
                  VS.
                </div>
                <div class="item-flex flex-center">
                  <div class="first-elt">
                    <q-img src="vectors/Continuous.svg" width="135px" />
                  </div>
                  <div class="second-elt">
                    <div class="title">PROJECT BASED</div>
                    <div caption class="content">
                      Project based programs are limited to an agreed duration,
                      similar to a traditional penetration test.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabtype: "time",
    };
  },
};
</script>

<style scoped>
.wrap-tabs {
  padding-right: 0px;
  padding-left: 0px;
}
.content-panel {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.content-panel .content-box {
  display: flex;
  flex-wrap: nowrap;
  left: -190px;
  margin-top: 15px;
  align-items: center;
}
.content-panel .content-box-item {
  padding-left: 100px;
}

.item-flex {
  display: flex;
  flex-wrap: nowrap;
  padding-right: 100px;
  padding-bottom: 30px;
  padding-top: 30px;
}
.item-flex .first-elt {
  padding-right: 35px;
}
.item-flex .second-elt .title {
  font-family: "good-time";
  font-size: 22px;
  padding-bottom: 10px;
}
.item-flex .second-elt .content {
  font-family: "nunito";
  font-size: 20px;
  padding-left: 5px;
  color: grey;
  max-width: 710px;
}
.box-vs {
  font-family: "good-time";
  font-size: 25px;
  right: -60px;
  margin-top: -20px;
}
@media (max-width: 599px) {
  .content-panel {
    display: block;
    margin: auto;
  }
  .content-panel .content-box {
    display: block;
    left: 0px;
    margin-top: 15px;
    align-items: center;
  }
  .content-panel .content-box-item {
    padding-left: 0px;
  }
  .q-tab-panel {
    padding-left: 0;
    padding-right: 0;
  }
  .item-flex {
    display: block;
    margin: auto;
    padding-right: 0;
    text-align: center;
  }
  .item-flex .second-elt .content {
    font-size: 15px;
    padding-left: 5px;
    max-width: 100%;
  }
  .box-vs {
    margin-right: auto;
    margin-left: auto;
    right: 0;
    left: 0;
    width: max-content;
    background-color: white;
  }
}
</style>
