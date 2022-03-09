<template>
  <q-card class="card-client flex flex-center" flat>
    <div class="card-image">
      <q-img src="~assets/local/image17.png" />
    </div>
    <div class="col card-content">
      <q-list dense>
        <q-item class="subtitle">16 days Old</q-item>
        <q-item class="title">Client Name Lorem ipsum dolor sit amet,</q-item>
        <q-item class="element">
          <q-item-section>Total programs :</q-item-section>
          <q-item-section class="text-secondary">12</q-item-section></q-item
        >
        <q-item class="element"
          ><q-item-section>Total payments :</q-item-section> <q-item-section class="text-secondary">$2000</q-item-section></q-item
        >
        <q-item class="element"
          ><q-item-section>Location :</q-item-section> <q-item-section class="text-secondary">UAE</q-item-section></q-item
        >
        <q-item class="element"
          ><q-item-section>Company Size :</q-item-section> <q-item-section class="text-secondary">Small</q-item-section></q-item
        >
      </q-list>
    </div>
    <div class="card-level">
      <submission-level :progress="progress" />
    </div>
  </q-card>
</template>
<script>
import submissionLevel from "./submission-level.vue";
export default {
  components: { submissionLevel },
  data() {
    return {
      progress: [0.8, 0.2, 0.1],
    };
  },
};
</script>
<style scoped>
.card-client {
  background: #ffffff;
  border-radius: 10px;
}
.card-image {
  width: 200px;
}
.card-level {
  width: 290px;
}
.card-content {
  padding-left: 34px;
}
.title {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.element {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.015em;
  color: #46516d;
}
</style>
