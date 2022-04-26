<template>
  <q-page class="bg-home" v-if="programs.length>0">
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
          :options="companies"
          v-model="company"
          label="All Companies"
          style="min-width: 200px"
          v-if="user.typeUser=='admin'"
        />
        <q-btn-dropdown
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
        </q-btn-dropdown>

        <q-space />
        <q-btn label="Most Recent" flat no-caps icon-right="import_export" />
      </q-toolbar>
      <div class="q-mt-lg">
        <!-- @click="showDetails(program)" -->
        <div
          class="q-mt-lg q-pb-lg"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 15px;
          "
        >
          <program-component-2
            :program="program"
            v-for="program in filterPrograms"
            :key="program.id"
            @click="goto(program.id)"
            class="cursor-pointer"
          >
            <template v-slot:button v-if="user.typeUser=='hacker'">
              <q-card-actions align="center" class="q-pt-md q-pb-md">
                <q-btn
                  no-caps
                  flat
                  class="text-action-3"
                  style="background: #5887ff; width: 100%"
                  v-if="program.can_join"
                  @click.stop="onJoinProgram(program.id)"
                  >Join Program</q-btn
                >
                <q-btn
                  no-caps
                  flat
                  class="text-action-3"
                  style="background: #F55B5D; width: 100%"
                  v-if="program.has_join"
                  @click.stop="onLeaveProgram(program.id)"
                  >Leave Program</q-btn
                >
              </q-card-actions>
            </template>
          </program-component-2>
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
          to="/dashboard"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import programComponent2 from "../../components/program-component-2.vue";
import { mapActions, mapGetters, mapState } from "vuex";
let allPrograms = [];
export default {
  components: { programComponent2 },
  data() {
    return {
      search: null,
      
      programs: [],
      companies:[],
      company:null,

      checkPublic: true,
      checkPrivate: true,
      checkPoint: true,
      checkCash: true,
      isAllFilters: true,
      filterPrograms: [],
    };
  },
  watch: {
    isAllFilters: function (val) {
      if (val) {
        this.checkPublic = true;
        this.checkPrivate = true;
        this.checkPoint = true;
        this.checkCash = true;
        this.filterPrograms=this.getAllPrograms;
      } 
      this.checkAllFilters();
    },
    checkPublic: function (val) {
      this.checkAllFilters();
      if(val){
        this.filterPrograms = this.getAllPrograms.filter(program => program.program_type=='public');
        if(this.checkPrivate) this.filterPrograms = this.getAllPrograms;
      }
      else{
        if(this.checkPrivate) this.filterPrograms = this.getPrivatePrograms;
        else this.filterPrograms =[];
      }
      if(!(this.checkPoint && this.checkCash)){
        if(this.checkPoint) this.filterPrograms = this.filterPrograms.filter(program => program.reward_type=="points")
        if(this.checkCash) this.filterPrograms = this.filterPrograms.filter(program => program.reward_type=="cash")
      }
    },
    checkPrivate: function (val) {
      this.checkAllFilters();
      if(val){
        this.filterPrograms = this.getAllPrograms.filter(program => program.program_type=='private');
        if(this.checkPublic) this.filterPrograms = this.getAllPrograms;
      }
      else{
        if(this.checkPublic) this.filterPrograms = this.getPublicPrograms;
        else this.filterPrograms =[];
      }
      if(!(this.checkPoint && this.checkCash)){
        if(this.checkPoint) this.filterPrograms = this.filterPrograms.filter(program => program.reward_type=="points")
        if(this.checkCash) this.filterPrograms = this.filterPrograms.filter(program => program.reward_type=="cash")
      }
    },
    checkPoint: function (val) {
      this.checkAllFilters();
      if(val){
        this.filterPrograms = this.getAllPrograms.filter(program => program.reward_type=='points');
        if(this.checkCash) this.filterPrograms = this.getAllPrograms;
      }
      else{
        if(this.checkCash) this.filterPrograms = this.getCashPrograms;
        else this.filterPrograms =[];
      }
      if(!(this.checkPublic && this.checkPrivate)){
        if(this.checkPublic) this.filterPrograms = this.filterPrograms.filter(program => program.program_type=="public")
        if(this.checkPrivate) this.filterPrograms = this.filterPrograms.filter(program => program.program_type=="private")
      }
    },
    checkCash: function (val) {
      this.checkAllFilters();
      if(val){
        this.filterPrograms = this.getAllPrograms.filter(program => program.reward_type=='cash');
        if(this.checkPoint) this.filterPrograms = this.getAllPrograms;
      }
      else{
        if(this.checkPoint) this.filterPrograms = this.getPointOnlyPrograms;
        else this.filterPrograms =[];
      }
      if(!(this.checkPublic && this.checkPrivate)){
        if(this.checkPublic) this.filterPrograms = this.filterPrograms.filter(program => program.program_type=="public")
        if(this.checkPrivate) this.filterPrograms = this.filterPrograms.filter(program => program.program_type=="private")
      }
    },
    company:function(val){
      this.programs = [];
      allPrograms.forEach((p)=>{
        if(p.user_id == val.value){
          this.programs.push(p);
        }
      })
    }
  },
  
  computed: {
    ...mapState('dashboard',['user']),
    ...mapGetters('dashboard',[
      'getAllCompanies'
    ]),
    ...mapGetters("program", [
      'getAllPrograms',
      "getClientPrograms",
      "getPublicPrograms",
      "getPrivatePrograms",
      "getCashPrograms",
      "getPointOnlyPrograms",
      "getMyPrograms",
    ]),
    totalProgram: function () {
      return this.getPublicPrograms.length + this.getPrivatePrograms.length;
    },
  },
  methods: {
    ...mapActions('program',[
      'joinProgram',
      'leaveProgram'
    ]),
    goto(id) {
      let route = { name: "program-detail", params: { id: id } };
      this.$router.push(route);
    },
    checkAllFilters() {
      this.isAllFilters =
        this.checkPublic &&
        this.checkPrivate &&
        this.checkPoint &&
        this.checkCash;
    },
    async onJoinProgram(id){
      await this.joinProgram(id);
      this.$router.push('/main/my-programs');
    },
    async onLeaveProgram(id){
      await this.leaveProgram(id);
      this.$router.push('/main/my-programs');
    },
    async showDetails(program){
      let route = {name:'program-detail', params:{id:program.id}}
      this.$router.push(route);
    }
  },
  beforeMount() {
    allPrograms = this.getAllPrograms;

    this.filterPrograms = this.getAllPrograms;
    this.programs = allPrograms;
    this.companies = this.getAllCompanies;
  },
};
</script>
<style scoped>
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
