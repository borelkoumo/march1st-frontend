<template>
  <q-list class="bg-white">
    <q-item>
      <q-item-section class="text-bold text-submission"
        >Total Submissions</q-item-section
      >
      <q-item-section class="number text-bold">110</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">{{submissions[0].label}}</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="submissions[0].value"
          class=""
          color="positive"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number">{{submissions[0].value * 100}}</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">{{submissions[1].label}}</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="submissions[1].value"
          class=""
          color="negative"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number">{{submissions[1].value * 100}}</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">{{submissions[2].label}}</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="submissions[2].value"
          class=""
          color="amber"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number">{{submissions[2].value * 100}}</q-item-section>
    </q-item>
    <slot name="bottom">

    </slot>
  </q-list>
</template>
<script>
export default {
  props: ["progress","submissions"],
};
</script>
<style scoped>
.q-item {
  padding: 0px;
}
.text-submission {
  font-family: "inter";
  font-style: normal;
  font-size: 12.61px;
  line-height: 32px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.q-item .number {
  font-family: "inter";
  font-style: normal;
  font-size: 12.61px;
  line-height: 32px;
  text-align: right;
  letter-spacing: -0.015em;
  color: #46516d;
}
</style>
