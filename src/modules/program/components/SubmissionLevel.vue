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
      <q-item-section class="number" v-if="submissions.length>0">{{getPourcentage(accepted/submissions.length * 100)}}</q-item-section>
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
      <q-item-section class="number" v-if="submissions.length>0">{{getPourcentage(rejected/submissions.length * 100)}}</q-item-section>
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
      <q-item-section class="number" v-if="submissions.length>0">{{getPourcentage(pending/submissions.length * 100)}}</q-item-section>
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
        if(element.submission_status ==="accepted_unresolved || accepted_resolved") count++;
      });
      return count;
    },
    rejected:function(){
      let count = 0;
      this.submissions.forEach(element => {
        if(element.submission_status ==="rejected") count++;
      });
      return count;
    },
    pending:function(){
      let count = 0;
      this.submissions.forEach(element => {
        if(element.submission_status ==="new"||
        element.submission_status ==="triaged"||
        element.submission_status ==="m1_returned_for_review"||
        element.submission_status ==="client_returned_for_review"
        ) count++;
      });
      return count;
    }
  },
  methods:{
    getPourcentage(pourcentage){
      return pourcentage%1===0?parseInt(pourcentage)+"%":pourcentage.toFixed(2)+"%";
    }
  }
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
