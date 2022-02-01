<template>
  <q-card class="my-card bg-white relative-position" flat style="height: 500px">
    <div
      class="flex flex-center"
      style="width: 100%; height: 190px"
      :style="{ 'background-color': service.color }"
    >
      <img :src="'images/' + service.image" />
    </div>

    <q-card-section class="q-pt-lg q-pb-lg">
      <div class="flex no-wrap q-gutter-sm">
        <q-btn
          no-wrap
          flat
          class="q-pa-xs bg-secondary text-white"
          style="font-size: 14px"
        >
          <q-icon class="q-pr-sm">
            <q-img
              src="~assets/public-white.svg"
              style="margin-top: -8px; vertical-align: middle" /></q-icon
          >PUBLIC
        </q-btn>
        <q-btn
          no-wrap
          flat
          class="q-pa-xs bg-primary text-white"
          style="font-size: 14px"
        >
          <q-icon class="q-pr-sm"
            ><q-img src="~assets/safe-harbour-white.svg"
          /></q-icon>
          SAFE HARBOUR
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none thumbnail-title" style="">
      {{ service.title }}
    </q-card-section>
    <q-card-section
      class="q-pt-none thumbnail-description"
      style=""
    >
      {{ service.description }}
    </q-card-section>
    <q-card-actions
      class="flex justify-around absolute"
      v-if="service.isProgram"
      style="bottom: 10px; font-family: 'nunito'; width: 100%"
    >
      <div
        class="flex flex-center justify-around relative-position"
        style="width: 100%"
      >
        <div
          v-if="service.hasPrice"
          style="font-family: 'nunito'; line-height: 16px"
        >
          <div class="text-bold">{{ service.price }}</div>
          <div style="color: #555555">Per vulnerability</div>
        </div>
        <div>
          <q-btn
            label="Join Program"
            no-caps
            flat
            class="bg-primary text-white"
            style="font-size: 16px; padding-right: 15px; padding-left: 15px"
          />
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  props: ["service"],
  data() {
    return {};
  },
};
</script>
<style>
.q-btn--rectangle {
  border-radius: 0px;
  vertical-align: middle;
}
.q-card {
  border-radius: 1px;
}
.thumbnail-title {
  font-family: "good-time";
  font-size: 19px;
}
.thumbnail-description{
  color: #555555; font-family: 'nunito'; font-size: 20px
}
@media (max-width: 599px) {
  .thumbnail-title {
    font-family: "good-time";
    font-size: 13px;
  }
  .thumbnail-description{
  font-size: 15px
}
}
</style>
