<template>
  <div class="wrap-list">
    <div class="list-item bg-white" v-if="notAssign.length>0">
      <q-card class="my-card" flat >
        <q-toolbar class="toolbar q-pt-md">
          <div class="title">Uninvited Hackers</div>
          <q-space />
          <q-input dense v-model="search" placeholder="Search" borderless>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-card-section>
          <q-list class="q-pb-md" separator>
            <q-separator />
            <q-item v-for="user in notAssign" :key="user.id">
              <q-item-section side>
                <q-checkbox
                  v-model="selectList"
                  :val="user"
                  color="secondary"
                />
              </q-item-section>
              <q-item-section>{{ user.username }}</q-item-section>
              <q-item-section>{{ user.email }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions class="flex flex-center">
          <q-btn
            flat
            class="bg-secondary text-white"
            style="min-width: 170px"
            label="Assign"
            no-caps
            @click="onAssignUser()"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div class="list-item bg-white" v-if="resultList.length > 0">
      <q-card class="my-card" flat>
        <q-toolbar class="toolbar q-pt-md">
          <div class="title">Invited Hackers</div>
          <q-space />
          <q-input dense v-model="search" placeholder="Search" borderless>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
        <q-card-section>
          <q-list class="q-pb-md" separator>
            <q-separator />
            <q-item v-for="invitation in resultList" :key="invitation.hacker.id">
              <q-item-section side>
                <q-checkbox
                  v-model="selectList"
                  :val="invitation"
                  color="secondary"
                />
              </q-item-section>
              <q-item-section>{{ invitation.hacker.first_name }}</q-item-section>
              <q-item-section>{{ invitation.hacker.email }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-actions class="flex flex-center">
          <q-btn
            outline
            class="bg-white text-secondary"
            style="min-width: 170px"
            label="Unassign"
            no-caps
            @click="onUnAssignUser()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["hackers", "assignHackers"],
  data() {
    return {
      selectList: [],
      baseList: [],
      resultList: [],
    };
  },
  computed: {
    ...mapGetters('auth',[
      'getHacker'
    ]),
    notAssign: function () {
      let hackers = this.baseList.map((hacker) => {
        let result = this.resultList.filter((invitation) => invitation.hacker.id == hacker.id);
        if (result.length == 0) hacker.isAssign = false;
        else hacker.isAssign = true;
        return hacker;
      });
      return hackers.filter((u) => u.isAssign == false);
    },
  },
  methods: {
    onAssignUser() {
      const newInvitations = this.selectList.map(function(hacker){
        return{
          id:null,
          hacker:hacker
        }
      })
      this.resultList = this.resultList.concat(newInvitations);
      this.selectList = [];
      this.$emit("onUpdateUser", this.resultList);
    },
    onUnAssignUser() {
      this.selectList.forEach((u) => {
        this.resultList = this.resultList.filter((r) => r.hacker.id != u.hacker.id);
      });
      this.selectList = [];
      this.$emit("onUpdateUser", this.resultList);
    },
  },
  beforeMount() {
    this.baseList = JSON.parse(JSON.stringify(this.hackers));
    let vm = this;
    this.resultList=this.assignHackers.map(function(invitation){
      return {
        id:invitation.id!=null?invitation.id:null,
        hacker:vm.getHacker(invitation.hackerId)
      };
    })

  },
};
</script>
<style scoped>
.wrap-list {
  display: flex;
  flex-direction: row;
  margin-left: -24px;
}
.wrap-list .list-item {
  border-radius: 16px;
  flex: auto;
  margin-left: 24px;
}
.my-card {
  border-radius: 16px;
}
.q-toolbar {
  max-height: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.toolbar .q-input {
  background: #fbfbfb;
  border-radius: 8px;
  min-width: 45%;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
