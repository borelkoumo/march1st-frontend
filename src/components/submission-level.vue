<template>
  <q-list class="bg-white">
    <q-item>
      <q-item-section class="text-bold text-submission"
        >Total Submissions</q-item-section
      >
      <q-item-section class="number text-bold">{{submissions.length}}</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">Accepted</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="accepted"
          class=""
          color="positive"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number" v-if="submissions.length>0">{{accepted/submissions.length * 100}}</q-item-section>
      <q-item-section class="number" v-else>0</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">Rejected</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="rejected"
          class=""
          color="negative"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number" v-if="submissions.length>0">{{rejected/submissions.length * 100}}</q-item-section>
      <q-item-section class="number" v-else>0</q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="text-submission">Pending</q-item-section>
      <q-item-section>
        <q-linear-progress
          :value="pending"
          class=""
          color="amber"
          track-color="white"
        />
      </q-item-section>
      <q-item-section class="number" v-if="submissions.length>0">{{pending/submissions.length * 100}}</q-item-section>
      <q-item-section class="number" v-else>0</q-item-section>
    </q-item>
    <slot name="bottom">

    </slot>
  </q-list>
</template>
<script>
export default {
  props: ["progress","submissions"],
  data() {
    return {
      
    }
  },
  computed: {
    accepted:function(){
      let count = 0;
      this.submissions.forEach(element => {
        if(element.submission_status ==="Accepted") count++;
      });
      return count;
    },
    rejected:function(){
      let count = 0;
      this.submissions.forEach(element => {
        if(element.submission_status ==="Rejected") count++;
      });
      return count;
    },
    pending:function(){
      let count = 0;
      this.submissions.forEach(element => {
        if(element.submission_status ==="Pending") count++;
      });
      return count;
    }
  },
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
