<template>
  <q-list class="bg-white">
    <q-item>
      <q-item-section class="text-bold text-submission"
        >Total Submissions</q-item-section
      >
      <q-item-section class="number text-bold">110</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">Accepted</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="progress[0]"
          class=""
          color="positive"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number">80</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">Rejected</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="progress[1]"
          class=""
          color="negative"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number">20</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">Pending</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="progress[2]"
          class=""
          color="amber"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number">10</q-item-section>
    </q-item>
    <slot name="bottom">

    </slot>
  </q-list>
</template>
<script>
export default {
  props: ["progress"],
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
