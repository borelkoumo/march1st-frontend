<template>
  <div
    class="section q-pt-lg q-pb-lg"
    style="background-color: #ebf5ff; font-family: 'nunito'"
  >
    <div class="header-section q-pt-lg q-pb-lg">
      <div class="first-title-white">MARCH FIRST</div>
      <div class="second-title relative-position">
        CUSTOMERS THAT MARCH FIRST
        <div
          class="tiret-wrap relative-position"
          style="margin: auto; width: 334px"
        >
          <div
            class="tiret relative-position"
            style="margin-left: -149px; margin-top: -11px; width: 334px"
          ></div>
        </div>
      </div>
    </div>
    <div class="content-box flex-content relative-position">
      <div
        class="gt-xs absolute"
        style="top: 100px; left: -150px; opacity: 0.5"
      >
        <q-img src="vectors/Project Based.svg" width="200px" />
      </div>
      <div class="" style="margin: auto">
        <div class="text-center text-customer-1">
          march1st is the the first cyber security company in the Middle East to
          provide managed bug bounty and vulnerability disclosure programs. Our
          customers realize that a bug bounty program has the highest ROI of any
          cyber security investment. It is the reality check for their defenses
          and keeps thier IS teams on thier toes...
        </div>
        <q-carousel
          v-model="slide"
          swipeable
          animated
          control-color="secondary"
          navigation
          class="rounded-borders bg-transparent q-pt-lg q-pb-none"
          style="height: inherit"
        >
          <q-carousel-slide name="style" class="q-pt-none">
            <div class="flex-content flex-center">
              <q-img src="emirate.png" width="" />
              <div class="content-carousel">
                <div class="title-custumer-1">
                  HELPING EMIRATES AIRLINE TO SECURE THIER SYSTEM
                </div>
                <ul style="">
                  <li>
                    Vivamus magna justo, lacinia eget consectetur sed, convallis
                    at tellus.
                  </li>
                  <li>
                    Pellentesque in ipsum id orci porta dapibus. Curabitur arcu
                    erat, accumsan id imperdiet et, porttitor at sem.
                  </li>
                  <li>
                    Nulla porttitor accumsan tincidunt. Sed porttitor lectus
                    nibh.
                  </li>
                </ul>
                <q-btn flat class="bg-secondary text-white"
                  >READ STUDY CASE</q-btn
                >
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="style2" class="q-pt-none">
            <div class="flex-content flex-center">
              <q-img src="emirate.png" width="" />
              <div class="content-carousel">
                <div class="title-custumer-1">
                  HELPING EMIRATES AIRLINE TO SECURE THIER SYSTEM
                </div>
                <ul style="">
                  <li>
                    Vivamus magna justo, lacinia eget consectetur sed, convallis
                    at tellus.
                  </li>
                  <li>
                    Pellentesque in ipsum id orci porta dapibus. Curabitur arcu
                    erat, accumsan id imperdiet et, porttitor at sem.
                  </li>
                  <li>
                    Nulla porttitor accumsan tincidunt. Sed porttitor lectus
                    nibh.
                  </li>
                </ul>
                <q-btn flat class="bg-secondary text-white"
                  >READ STUDY CASE</q-btn
                >
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: "style",
    };
  },
};
</script>
<style scoped>
.text-customer-1 {
  font-family: "nunito";
  font-size: 22px;
  max-width: 960px;
  margin: auto;
  padding-top: 20px;
}
.title-custumer-1 {
  font-size: 23px;
  font-family: "good-time";
}
.flex-content {
  display: flex;
  flex-wrap: nowrap;
}
.content-carousel {
  text-align: left;
  padding-left: 140px;
}
.content-carousel ul{
  font-size: 22px; color: #555555;
}
@media (max-width: 599px) {
  .text-customer-1 {
    font-size: 15px;
    max-width: 100%;
    padding-top: 20px;
  }
  .title-custumer-1 {
    font-size: 16px;
    font-family: "good-time";
    padding-top:25px;
  }
  .flex-content {
    display: block;
    flex-wrap: wrap;
  }
  .content-carousel {
    text-align: left;
    padding-left: 0px;
  }
  .q-carousel__slide{
    padding-left:0;
    padding-right:0
  }
  .content-carousel ul{
    font-size: 14px;
  }
  .content-carousel ul li{
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
