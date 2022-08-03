<template>
  <router-link :to="'submissions/submission-detail/'+submission.id"
  v-if="submission"
  style="text-decoration:none"
  >
    <q-card class="my-card bg-white q-pt-lg q-pr-lg q-pl-lg q-pb-md" flat v-if="program">
      <slot name="header"> </slot>
      <q-card-section horizontal>
        <div class="box-image col-3">
          <div style="max-width: 300px; height: 250px;">
            <q-img :src="program.program_picture_url"/>
          </div>
        </div>
        <q-card-section class="q-pl-lg">
          <div class="subtitle"><router-link :to="'/new-dashboard/programs/program-detail/'+program.id">Related Program</router-link></div>
          <div class="subtitle-2">
            {{program.program_title}}
          </div>
          <div class="content-title">
            {{program.program_description}}
          </div>
          <q-toolbar class="subtitle-3">
            <div>Submitted on 22 May 2021 , 3:45 pm</div>
            <q-space />
            <div>$ {{program.low.min}} - $ {{program.critical.max}} Per vulnerability</div>
          </q-toolbar>
        </q-card-section>
      </q-card-section>
    </q-card>
  </router-link>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: ["submission","programRequest"],
  data(){
    return{
      program:null
    }
  },
  methods:{
    ...mapActions('program',[
      'GET_ONE_PROGRAM'
    ])
  },
  async beforeMount(){
    if(this.programRequest) this.program=this.programRequest;
    else this.program = await this.GET_ONE_PROGRAM(this.submission.program.id);
  }
};
</script>
<style scoped>
.subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #5887ff;
  padding-bottom: 24px;
}
.subtitle-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
  margin-top: 9px;
  padding-bottom: 15px;
}
.subtitle-3 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #838181;
  margin-top: 29px;
}

.content-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  color: #838181;
  align-items: center;
  letter-spacing: -0.015em;
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
  height: 70px;
}
.box-image {
  border-radius: 10px;
}
.box-image .q-img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;

  padding-top: 18px;
  padding-bottom: 15px;
}
.q-toolbar {
  padding-left: 0;
  padding-right: 0;
  min-height: 0;
}
.title-badge {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #f55b5d;
}
.title-badge-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.015em;
  color: #838181;
}
.box-badge {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 16px;
  width: 169px;
  height: 26px;
  background: #f7d5d5;
  border-radius: 5px;
}
</style>
