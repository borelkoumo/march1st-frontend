<template>
  
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
</template>
<script>
export default {
  data() {
    return {
      progress: 0.85,
      progress2: 0.65,
      progress3: 0.55,
    };
  },
};
</script>
