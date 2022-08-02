<template>
  <q-page class="flex flex-center" v-if="getMyPrograms.length <= 0">
    <div class="main-content">
      <q-img src="~assets/empty-program.svg" width="600px" />
      <div class="title-1">Not have any programs</div>
      <div class="subtitle-1" v-if="getUser.role==='client'">
        Currently you have not yet create any programs
      </div>
      <div class="subtitle-1" v-if="getUser.role==='hacker'">
        Currently you have not yet join any programs
      </div>
      <div class="flex flex-center">
        <q-btn
          label="Create a program"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="programs/add-program"
          v-if="getUser.role==='client' && getUser.type=='super_manager'"
        />
        <q-btn
          label="Browse all programs"
          class="title-btn text-white bg-secondary"
          no-caps
          flat
          to="programs/all-programs"
          v-else
        />
      </div>
    </div>
  </q-page>
  <q-page v-else class="bg-home q-pl-md q-pr-md">
    <div class="main-content">
      <q-toolbar
        class="bg-none flex q-gutter-sm q-pl-none q-pr-none"
        style="padding-top: 40px"
      >
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
          :options="getCompanies"
          v-model="company"
          label="All Companies"
          style="min-width: 200px"
          v-if="getUser.role=='march1st'"
        />
        <q-btn-dropdown
          class="bg-white text-dark"
          flat
          label="Filters"
          style="min-width: 200px"
          :menu-offset="[0,3]"
        >
          <q-list dense separator>
            <q-item clickable v-close-popup @click="isAllFilters=!isAllFilters">
              <q-item-section side>
                <q-checkbox v-model="isAllFilters" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>All</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getMyPrograms.length }}
              </q-item-section>
            </q-item>
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
            <q-item clickable v-close-popup @click="checkPoint = !checkPoint">
              <q-item-section side>
                <q-checkbox v-model="checkPoint" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Points Only</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ getPointPrograms.length }}
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
        </q-btn-dropdown>
        <q-space />
        <q-btn
          label="Create Program"
          no-caps
          flat
          class="bg-secondary text-white"
          to="programs/add-program"
          v-if="getUser.role === 'client' && getUser.type==='super_manager'"
        />
        <q-btn label="Programs" flat no-caps icon-right="import_export" @click="isAscending=!isAscending"/>
      </q-toolbar>
      <div class="q-mt-lg q-gutter-md q-pb-lg" v-if="getUser.role==='client' || getUser.role==='march1st'">
        <program-component v-for="program in allMyPrograms" :key="program.id" :program="program">
          <template v-slot:level>
            <q-card-section class="col-3 q-pl-lg q-pr-none">
              <submission-level
                :submissions="program.submissions"
                :progress="progress"
              />
            </q-card-section>
          </template>
        </program-component>
      </div>
      <div class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
            grid-gap: 15px;
          "
          v-if="getUser.role==='hacker'">
        <program-card-component
            :program="program"
            v-for="program in allMyPrograms"
            :key="program.id"
            class="cursor-pointer"
          />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import programComponent from '../components/ProgramComponent.vue';
import programCardComponent from '../components/ProgramCardComponent.vue';
import submissionLevel from '../components/SubmissionLevel.vue';
import { StringManager } from '../../../helpers/StringManager';
export default {
  components: { programComponent,programCardComponent, submissionLevel },
  data() {
    return {
      search:null,
      isSorting:false,
      company:null,
      allMyPrograms:[],
      progress: [0.8, 0.2, 0.1],
      isAllFilters:true,
      totalProgram:0,
      checkPublic:true,
      checkPrivate:true,
      checkPoint:true,
      checkCash:true,
      isAscending:false
    };
  },
  watch:{
    myPrograms:function(val){
      this.allMyPrograms=JSON.parse(JSON.stringify(val));
    },
    search:function(val){
      this.isAllFilters=true;
      if(val===""|| val==null) {
        this.allMyPrograms=JSON.parse(JSON.stringify(this.getMyPrograms));
      }
      else{
        this.allMyPrograms=[];
        this.getMyPrograms.forEach(element => {
          let chaine = element.program_title.toLowerCase();
          let description = element.program_description.toLowerCase();
          if(chaine.includes(val.toLowerCase()) || description.includes(val.toLowerCase())){
            this.allMyPrograms.push(element);
          }
        });
      }
    },
    isAllFilters:function(val){
      if(val){
        this.checkPublic=true,
        this.checkPrivate=true,
        this.checkPoint=true,
        this.checkCash=true
      }
    },
    checkPublic:function(val){
      if(val){
        if(this.checkPrivate && this.checkPoint && this.checkCash) this.isAllFilters=true;
        this.allMyPrograms = this.getMyPrograms.filter((program)=>program.program_type==="public");
        if(this.checkPrivate) this.allMyPrograms = JSON.parse(JSON.stringify(this.getMyPrograms));
        if(this.checkPoint && !this.checkCash) {
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.reward_type==="points");
        }
        else if(this.checkCash && !this.checkPoint){
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.reward_type==="cash");
        }
      }
      else{
        this.isAllFilters=false;
        this.allMyPrograms = this.allMyPrograms.filter((program)=>program.program_type!=="public");
      }
    },
    checkPrivate:function(val){
      if(val){
        if(this.checkPublic && this.checkPoint && this.checkCash) this.isAllFilters=true;
        this.allMyPrograms = this.getMyPrograms.filter((program)=>program.program_type==="private");
        if(this.checkPublic) this.allMyPrograms = JSON.parse(JSON.stringify(this.getMyPrograms));
        if(this.checkPoint && !this.checkCash) {
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.reward_type==="points");
        }
        else if(this.checkCash && !this.checkPoint){
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.reward_type==="cash");
        }
      }
      else{
        this.isAllFilters=false;
        this.allMyPrograms = this.allMyPrograms.filter((program)=>program.program_type!=="private");
      }
    },
    checkPoint:function(val){
      if(val){
        if(this.checkPublic && this.checkPrivate && this.checkCash) this.isAllFilters=true;
        this.allMyPrograms = this.getMyPrograms.filter((program)=>program.reward_type==="points");
        if(this.checkCash) this.allMyPrograms = JSON.parse(JSON.stringify(this.getMyPrograms));
        if(this.checkPublic && !this.checkPrivate) {
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.program_type==="public");
        }
        else if(this.checkPrivate && !this.checkPublic){
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.program_type==="private");
        }
      }
      else{
        this.isAllFilters=false;
        this.allMyPrograms = this.allMyPrograms.filter((program)=>program.reward_type!=="points");
      }
    },
    checkCash:function(val){
      if(val){
        if(this.checkPublic && this.checkPrivate && this.checkPoint) this.isAllFilters=true;
        this.allMyPrograms = this.getMyPrograms.filter((program)=>program.reward_type==="cash");
        if(this.checkPoint) this.allMyPrograms = JSON.parse(JSON.stringify(this.getMyPrograms));
        if(this.checkPublic && !this.checkPrivate) {
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.program_type==="public");
        }
        else if(this.checkPrivate && !this.checkPublic){
          this.allMyPrograms = this.allMyPrograms.filter((program)=>program.program_type==="private");
        }
      }
      else{
        this.isAllFilters=false;
        this.allMyPrograms = this.allMyPrograms.filter((program)=>program.reward_type!=="cash");
      }
    },
    isAscending:function(val){
      if(val){
        StringManager.ascendingOrder(this.allMyPrograms,'createdAt');
      }
      else{
        StringManager.descendingOrder(this.allMyPrograms,'createdAt');
      }
    }
  },
  computed: {
    ...mapState("program",[
      'myPrograms'
    ]),
    ...mapGetters("program", ["getMyPrograms"]),
    ...mapGetters('auth',[
      'getUser',
      'getCompanies'
    ]),
    getPublicPrograms:function(){
      return this.getMyPrograms.filter((program)=>program.program_type==="public");
    },
    getPrivatePrograms:function(){
      return this.getMyPrograms.filter((program)=>program.program_type==="private");
    },
    getCashPrograms:function(){
      return this.getMyPrograms.filter((program)=>program.reward_type==="cash");
    },
    getPointPrograms:function(){
      return this.getMyPrograms.filter((program)=>program.reward_type==="points");
    }
  },
  methods: {
    ...mapActions('program',["GET_MY_PROGRAMS"]),
    onFilterClick(num){

    }
  },

  async beforeMount() {
    this.allMyPrograms = JSON.parse(JSON.stringify(this.getMyPrograms));
    //console.log(localStorage.getItem('programs'))
  },
  async mounted(){
    this.allMyPrograms = JSON.parse(JSON.stringify(this.getMyPrograms));
    try {
      this.$q.loading.show();
      await this.GET_MY_PROGRAMS();
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
