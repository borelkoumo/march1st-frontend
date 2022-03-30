<template>
  <q-page class="bg-home">
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
        <q-select
          bg-color="white"
          filled
          dense
          :options="filters"
          v-model="filter"
          label="Filter"
          style="min-width: 200px"
        />
        <q-space />
        <q-btn label="Most Recent" flat no-caps icon-right="import_export" />
      </q-toolbar>
      <div class="q-mt-lg">
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
            v-for="program in programs"
            :key="program.id"
            @click="showDetails(program)"
          >
            <template v-slot:button v-if="user.typeUser=='hacker' && isHackerHasInvitation(program.id)">
              <q-card-actions align="center" class="q-pt-md q-pb-md">
                <q-btn
                  no-caps
                  flat
                  class="text-action-3"
                  style="background: #5887ff; width: 100%"
                  v-if="!isHackerJoined(program.id)"
                  @click="onJoinProgram(program.id)"
                  >Join Program</q-btn
                >
                <q-btn
                  no-caps
                  flat
                  class="text-action-3"
                  style="background: #F55B5D; width: 100%"
                  v-else
                  >Leave Program</q-btn
                >
              </q-card-actions>
            </template>
          </program-component-2>
        </div>
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
      filters: [{ label: "fgfgfgfg", value: "3" }],
      filter: null,
      programs: [],
      companies:[],
      company:null
    };
  },
  watch:{
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
    ...mapGetters("program", ["getPrograms","isHackerJoined", "isHackerHasInvitation"]),
    ...mapState('dashboard',['user']),
    ...mapGetters('dashboard',[
      'getAllCompanies'
    ])
  },
  methods: {
    ...mapActions('program',[
      'joinProgram'
    ]),
    async onJoinProgram(id){
      await this.joinProgram(id);
      this.$router.push('/main/my-programs');
    },
    async showDetails(program){
      let route = {name:'program-detail', params:{id:program.id}}
      this.$router.push(route);
    }
  },
  beforeMount() {
    allPrograms = this.getPrograms;
    this.programs = allPrograms;
    this.companies = this.getAllCompanies;
    console.log(this.companies);
  },
};
</script>
<style scoped>
.q-toolbar {
  padding-left: 0px;
  padding-right: 0px;
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
