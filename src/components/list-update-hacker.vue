<template>
  <div class="wrap-list">
    <div class="list-item bg-white">
      <q-card class="my-card" flat>
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
            <q-item v-for="user in resultList" :key="user.id">
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
  props: ["users", "assignUsers"],
  data() {
    return {
      selectList: [],
      baseList: [
        /* { username: "William", email: "william@gmail.com", id: 1 },
        { username: "Steve", email: "steve@gmail.com", id: 2 },
        { username: "Franck", email: "franck@gmail.com", id: 3 }, */
      ],
      resultList: [],
    };
  },
  computed: {
    ...mapGetters("dashboard", ["getUser"]),
    notAssign: function () {
      //let users=[];
      let users = this.baseList.map((user) => {
        let result = this.resultList.filter((r) => r.id == user.id);
        if (result.length == 0) user.isAssign = false;
        else user.isAssign = true;
        return user;
      });
      return users.filter((u) => u.isAssign == false);
    },
  },
  methods: {
    
    onAssignUser() {
      this.resultList = this.resultList.concat(this.selectList);
      this.selectList = [];
      this.$emit("onUpdateUser", this.resultList);
    },
    onUnAssignUser() {
      this.selectList.forEach((u) => {
        this.resultList = this.resultList.filter((r) => r.id != u.id);
      });
      this.selectList = [];
      this.$emit("onUpdateUser", this.resultList);
    },
  },
  beforeMount() {
    this.baseList = this.users;
    this.resultList = this.assignUsers;
    let vm=this;
    /*this.resultList = this.assignUsers.map(function (id) {
      return this.getUser(id);
    });*/
    console.log(this.users);
    this.resultList=this.assignUsers.map(function(id){
      return vm.getUser(id);
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
