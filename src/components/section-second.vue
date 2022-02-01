<template>
  <div
    class="section pt-box pb-box"
    style="background-color: #ebf5ff; font-family: 'nunito'"
  >
    <div class="content-box" style="font-family: 'nunito'">
      <div class="q-pt-lg text-center text-content">
        We recommend a <b>crawl/walk/run</b> approach to your bug bounty program
        by adjusting the above parameters. This allows you to streamline your
        patching processes and prepared, and equipped to promptly resolve
        discovered vulnerabilities.
      </div>
      <div class="flex no-wrap justify-between q-pb-lg gt-xs card-content">
        <q-card class="my-card bg-transparent" flat>
          <group-frame style="text-align: center" />
          <q-card-section style="text-align: center; font-family: 'good-time'">
            <div style="padding-top: 50px; font-size: 24px">CRAWL</div>
          </q-card-section>
          <q-card-section
            class="q-pt-none text-center text-grey-7"
            style="font-size: 20px; max-width: 275px"
          >
            Launch private bug bounty with limited scope
          </q-card-section>
        </q-card>
        <q-card class="my-card bg-transparent" flat>
          <group-frame style="text-align: center" />
          <q-card-section style="text-align: center; font-family: 'good-time'">
            <div style="padding-top: 50px; font-size: 24px">WALK</div>
          </q-card-section>
          <q-card-section
            class="q-pt-none text-center text-grey-7"
            style="font-size: 20px; max-width: 200px"
          >
            Transition to public program
          </q-card-section>
        </q-card>
        <q-card class="my-card bg-transparent" flat>
          <group-frame style="text-align: center" />
          <q-card-section style="text-align: center; font-family: 'good-time'">
            <div style="padding-top: 50px; font-size: 24px">RUN</div>
          </q-card-section>
          <q-card-section
            class="q-pt-none text-center text-grey-7"
            style="font-size: 20px; max-width: 200px"
          >
            Increase rewards, add targets
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
              <group-frame style="text-align: center" />
              <q-card-section
                style="text-align: center; font-family: 'good-time'"
              >
                <div class="text-h6 q-pt-lg">CRAWL</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center text-grey-7">
                Launch private bug bounty with limited scope
              </q-card-section>
            </q-card>
          </q-carousel-slide>
          <q-carousel-slide name="walk" class="column no-wrap flex-center">
            <q-card class="my-card bg-transparent" flat>
              <group-frame style="text-align: center" />
              <q-card-section
                style="text-align: center; font-family: 'good-time'"
              >
                <div class="text-h6 q-pt-lg">WALK</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center text-grey-7">
                Transition to public program
              </q-card-section>
            </q-card>
          </q-carousel-slide>
          <q-carousel-slide name="run" class="column no-wrap flex-center">
            <q-card class="my-card bg-transparent" flat>
              <group-frame style="text-align: center" />
              <q-card-section
                style="text-align: center; font-family: 'good-time'"
              >
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
</template>
<script>
import GroupFrame from "./group-frame.vue";
export default {
  components: { GroupFrame },
  data() {
    return {
      slideApproach: "crawl",
    };
  },
};
</script>
<style scoped>
.content-box .text-content {
  font-size: 15px;
  max-width: 100%;
  text-align: center;
  padding-bottom: 20px;
  margin: auto;
}
</style>
