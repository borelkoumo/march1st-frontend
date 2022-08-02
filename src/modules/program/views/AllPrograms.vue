<template>
  <q-page class="bg-home q-pl-lg q-pr-lg" v-if="getAllPrograms.length>0">
    <div class="main-content">
      <q-toolbar class="bg-none flex q-gutter-sm" style="padding-top: 40px">
        <q-input
          dense
          bg-color="white"
          filled
          v-model="search"
          input-class="text-right"
          class=""
          style="min-width: 400px"
        >
          <template v-slot:prepend> Search </template>
          <template v-slot:append>
            <q-icon v-if="search === null" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = null"
            />
          </template>
        </q-input>
        <q-select
          bg-color="white"
          filled
          dense
          :options="allCompanies"
          v-model="company"
          label="All Companies"
          style="min-width: 200px"
          v-if="getUser.role==='march1st'"
        />
        <!--<q-btn-dropdown
          class="bg-white text-dark"
          flat
          label="Filters"
          style="min-width: 200px"
        >
          <q-list dense>
            <q-item clickable v-close-popup @click="onFilterClick(0)">
              <q-item-section side>
                <q-checkbox v-model="isAllFilters" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>All</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ totalProgram }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="checkPublic = !checkPublic">
              <q-item-section side>
                <q-checkbox v-model="checkPublic" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Public</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getPublicPrograms.length }}
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="checkPrivate = !checkPrivate"
            >
              <q-item-section side>
                <q-checkbox v-model="checkPrivate" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Private</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getPrivatePrograms.length }}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="checkPoint = !checkPoint">
              <q-item-section side>
                <q-checkbox v-model="checkPoint" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Points Only</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getPublicPrograms.length }}
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="checkCash = !checkCash">
              <q-item-section side>
                <q-checkbox v-model="checkCash" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cash Only</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getCashPrograms.length }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>-->

        <q-space />
        <q-btn label="Most Recent" flat no-caps icon-right="import_export" @click="isAscending=!isAscending"/>
      </q-toolbar>
      <div class="q-mt-lg">
        <div
          class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
            grid-gap: 15px;
          "
        >
          <program-card-component
            :program="program"
            v-for="program in allPrograms"
            :key="program.id"
            class="cursor-pointer"
          >
            <template v-slot:button v-if="getUser.role=='hacker'">
              <q-card-actions align="center" class="q-pt-md q-pb-md">
                <q-btn
                  no-caps
                  flat
                  class="text-action-3"
                  style="background: #5887ff; width: 100%"
                  v-if="canJoinProgram(program)"
                  @click.prevent="onJoinProgram(program.id)"
                  >Join Program</q-btn
                >
                <q-btn
                  no-caps
                  flat
                  class="text-action-3"
                  style="background: #F55B5D; width: 100%"
                  v-if="hasJoinProgram(program)"
                  @click.prevent="onLeaveProgram(program.id)"
                  >Leave Program</q-btn
                >
              </q-card-actions>
            </template>
          </program-card-component>
        </div>
      </div>
    </div>
  </q-page>
  <q-page v-else class="flex flex-center">
    <div class="main-content">
      <q-img src="~assets/empty-program.svg" width="600px" />
      <div class="title-1">No programs found</div>
      <div class="subtitle-1">
        There is no program
      </div>
      <div class="flex flex-center">
        <q-btn
          label="Back to home"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="/new-dashboard"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import programCardComponent from '../components/ProgramCardComponent.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import {StringManager} from '../../../helpers/StringManager';
export default {
  components:{
    programCardComponent
  },
  data() {
    return {
      search:null,
      isSorting:false,

      allCompanies:[],
      company:null,
      allPrograms:[],
      isAscending:false
    }
  },
  watch:{
    programs: function(val){
      this.allPrograms=val.map(function(program){
        return JSON.parse(JSON.stringify(program));
      })
      val.forEach(element => {
        console.log(element.program_title+" : "+element.hackers)
      });
    },
    search:function(val){
      if(val==""|| val==null) {
        this.allPrograms=this.getAllPrograms;
      }
      else{
        this.allPrograms=[];
        this.programs.forEach(element => {
          let chaine = element.program_title.toLowerCase();
          let description = element.program_description.toLowerCase();
          if(chaine.includes(val.toLowerCase()) || description.includes(val.toLowerCase())){
            this.allPrograms.push(element);
          }
        });
      }
    },
    isAscending:function(val){
      if(val){
        StringManager.ascendingOrder(this.allPrograms,'createdAt');
      }
      else{
        StringManager.descendingOrder(this.allPrograms,'createdAt');
      }
    }
  },
  computed: {
    ...mapState('program',[
      'programs'
    ]),
    ...mapGetters('auth',[
      'getUser',
      'getCompanies'
    ]),
    ...mapGetters('program',[
      'getAllPrograms'
    ]),
    canJoinProgram(){
      return (program)=>{
        const result = program.invitations.find(invitation => invitation.hackerId==this.getUser.hacker.id);
        if((result || program.program_type==='public') &&
        !program.hackers.includes(""+this.getUser.hacker.id)
         ){
          return true;
         }
         else{
          return false;
         }
      }
    },
    hasJoinProgram(){
      return(program)=>{
        if(program.hackers.includes(""+this.getUser.hacker.id)){
          return true;
        }
        return false;
      }
    }
  },
  methods: {
    ...mapActions('program',[
      'JOIN_PROGRAM',
      'LEAVE_PROGRAM',
      'GET_MY_PROGRAMS',
      'GET_PROGRAMS'
    ]),
    async onJoinProgram(progranId){
      try {
        this.$q.loading.show();
        await this.JOIN_PROGRAM(progranId);
        await this.GET_MY_PROGRAMS();
        await this.GET_PROGRAMS();
        this.$q.loading.hide();
        //this.$router.push('programs');
      } catch (error) {
        console.log(error)
        this.$q.loading.hide();
      }
    },
    async onLeaveProgram(programId){
      try {
        this.$q.loading.show();
        this.LEAVE_PROGRAM(programId);
        await this.GET_MY_PROGRAMS();
        this.$q.loading.hide();
        //this.$router.push('programs');
      } catch (error) {
        console.log(error)
        this.$q.loading.hide();
      }
    },


  },
  async mounted(){
    this.allPrograms=this.getAllPrograms.map(function(program){
      return JSON.parse(JSON.stringify(program));
    });
    this.allCompanies = this.getCompanies.map(function(company){
      let item={
        label:company.company_name,
        value:company.id
      }
      return item;
    })

  }
}
</script>

<style lang="scss" scoped>
  .q-toolbar {
  padding-left: 0px;
  padding-right: 0px;
}
.title-1 {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 34px;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;
  color: #171717;
  padding-top: 50px;
  padding-bottom: 12px;
}
.subtitle-1 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  align-items: center;
  text-align: center;
  color: #767676;
  padding-bottom: 12px;
}
.title-btn {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  width: 338px;
}
.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
.head-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
.text-action-3 {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: #ffffff;
}
</style>
