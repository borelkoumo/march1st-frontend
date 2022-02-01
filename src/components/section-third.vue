<template>
    <div
      class="section pt-box pb-box relative-position"
      style="min-height: max-content"
    >
      <div
        class="header-section relative-position"
        style="z-index: 99; background-color: white; padding-bottom: 60px"
      >
        <div class="first-title">CUSTOMER?</div>
        <div class="second-title relative-position">
          HOW IT WORKS FOR CUSTOMERS?
          <div
            class="tiret-wrap relative-position"
            style="margin: auto; width: 376px"
          >
            <div
              class="tiret relative-position"
              style="margin-left: -142px; margin-top: -11px; width: 376px"
            ></div>
          </div>
        </div>
      </div>
      <!-- <div class="relative-position box-blanc" style="height:100px; background-color:white; z-index:999"></div> -->
      <div
        class="content-box flex flex-center"
        style="z-index: -99; margin-top: -330px; height: 800px"
      >
        <div>
          <!-- <canvas id="myCanvas" width="600" height="400" style="border:1px solid #000000;"></canvas> -->
          <div
            class="background-frame relative-position"
            style="font-famimy: 'nunito'"
          >
            <q-img
              class="relative-position"
              style="left: -48px; top: -13px"
              src="vectors/frame-02.svg"
              width="445px"
            >
            </q-img>
            <div
              class="absolute"
              style="top: 125px; left: -160px; text-align: center"
            >
              <q-img
                class="relative-position"
                src="steps/step1.svg"
                width="100px"
              />
              <div
                class="text-bold text-center"
                style="font-size: 18px; max-width: 130px"
              >
                Tailor your Bug BountyProgram
              </div>
            </div>
            <div
              class="absolute"
              style="top: 290px; left: -110px; text-align: center"
            >
              <q-img
                class="relative-position"
                src="steps/step2.svg"
                width="100px"
              />
              <div
                class="text-center"
                style="font-size: 18px; max-width: 150px"
              >
                All partis agree on Terms & Condition
              </div>
            </div>

            <div
              class="absolute"
              style="top: 390px; left: 25px; text-align: center"
            >
              <q-img
                class="relative-position"
                src="steps/step3.svg"
                width="100px"
              />
              <div
                class="text-center"
                style="font-size: 18px; max-width: 300px"
              >
                Researches search for and securely submit Vulnerabilities to
                march1st
              </div>
            </div>

            <div
              class="absolute"
              style="top: 312px; left: 260px; text-align: center"
            >
              <q-img
                class="relative-position"
                src="steps/step4.svg"
                width="100px"
              />
              <div class="text-center" style="font-size: 18px; width: 200px">
                March1st validates and Triages the submissions
              </div>
            </div>

            <div class="absolute" style="top: 120px; left: 350px">
              <q-img
                class="relative-position"
                src="steps/step4.svg"
                width="100px"
                style="margin-left: 45px"
              />
              <div
                class="text-center"
                style="text-align: center; font-size: 18px; width: 380px"
              >
                Client Receives Only Validated and Properly Documented
                Vulnerability Reports with Recommendation For Remediation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>