<template>
  <q-layout view="lHh lpp fff" class="bg-grey-1">
    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary text-white q-pt-lg"
      :width="292"
      style="overflow-y: hidden"
    >
      <div style="margin: auto; text-align: center; padding-top: 15px">
        <q-img src="vectors/logo-02.svg" width="200px" />
      </div>
      <q-scroll-area class="fit">
        <q-list class="pt-box menu-item" style="font-family: 'nunito'">
          <div v-for="menu in getMenus" :key="menu.id">
            <q-item-label header v-if="menu.hasLabel" class="menu-label">{{
                menu.label
              }}</q-item-label>
            <q-item
              v-for="child in menu.children"
              :key="child.name"
              :icon="child.icon"
              class="q-mr-sm text-white"
              :class="{ 'active-menu': child.slug == $route.name }"
              clickable
              :to="child.link"
            >
              <q-item-section avatar>
                <q-icon color="white" :name="child.icon" />
              </q-item-section>
              <q-item-section>
                {{ child.name }}
              </q-item-section>
            </q-item>
            <q-separator
              inset
              :class="{ 'mt-box': menu.hasLabel }"
              style="background: rgba(228, 231, 235, 0.25)"
            />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      style="overflow-y: hidden"
      class="bg-white"
      :width="450"
    >
      <q-card class="my-card q-pt-lg card-identification" flat>
        <q-card-section horizontal>
          <q-card-section class="col-4 flex flex-center">
            <q-img
              class="rounded-borders"
              :src="connectUser.company.company_logo"
              v-if="connectUser && connectUser.typeUser == 'client'"
            />
            <q-img
              v-if="connectUser && connectUser.typeUser == 'hacker'"
              class="rounded-borders"
              :src="connectUser.hacker.profile_picture_url"
            />
          </q-card-section>
          <q-card-section
            class="q-pt-xs"
            v-if="connectUser && connectUser.typeUser == 'client'"
          >
            <div class="q-mt-sm title">
              {{ connectUser.company.company_name }}
            </div>
            <div class="subtitle">Joined 6 months ago</div>
          </q-card-section>
          <q-card-section
            class="q-pt-xs"
            v-if="connectUser && connectUser.typeUser == 'hacker'"
          >
            <div class="q-mt-sm title">
              {{ connectUser.hacker.first_name }} {{ connectUser.hacker.last_name }}
            </div>
            <div class="subtitle">Joined 6 months ago</div>
            <div class="subtitle">Current Rank: 70</div>
            <div class="subtitle">Average Rank: 7</div>
            <div class="subtitle">Average Vulnerability Severity</div>
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right" class="q-pt-none">
          <q-btn label="SIGNOUT" class="bg-primary text-white" flat @click="onSignout()"/>
          <q-btn label="PROFILE" class="bg-secondary text-white" flat />
        </q-card-actions>
      </q-card>

      <q-card flat class="card-panel">
        <q-tabs
          v-model="tabElement"
          dense
          class="text-secondary pt-box"
          active-color="secondary"
          indicator-color="secondary"
          align="justify"
        >
          <q-tab name="task" label="TASK">
            <q-badge
              color="secondary"
              rounded
              floating
              text-color="white"
              label="10"
            />
          </q-tab>
          <q-tab name="notification" label="NOTIFICATION" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabElement" animated>
          <q-tab-panel name="task" style="height: calc(100vh - 50px)">
            <q-scroll-area class="fit">
              <q-list separator padding>
                <list-item
                  v-for="task in tasks"
                  :key="task.id"
                  class="q-pt-lg q-pb-lg"
                  :class="{
                    'close-item': task.indicator == false,
                    'active-item': activeTask == task.id,
                  }"
                >
                  <template v-slot:title>
                    {{ task.title }}
                  </template>
                  <template v-slot:caption>
                    {{ task.content }}
                  </template>
                  <template v-slot:time>
                    {{ task.time }}
                  </template>
                  <template v-slot:indicator v-if="task.indicator">
                    <q-badge rounded color="secondary" />
                  </template>
                </list-item>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="notification" style="height: calc(100vh - 50px)">
            <q-scroll-area class="fit">
              <q-list separator padding>
                <list-item
                  v-for="task in tasks"
                  :key="task.id"
                  class="q-pt-lg q-pb-lg"
                  :class="{
                    'close-item': task.indicator == false,
                    'active-item': activeTask == task.id,
                  }"
                >
                  <template v-slot:title>
                    {{ task.title }}
                  </template>
                  <template v-slot:caption>
                    {{ task.content }}
                  </template>
                  <template v-slot:time>
                    {{ task.time }}
                  </template>
                  <template v-slot:indicator v-if="task.indicator">
                    <q-badge rounded color="secondary" />
                  </template>
                </list-item>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <q-scroll-area class="fit"> </q-scroll-area>
    </q-drawer>

    <!-- inserer le dialog d'user ici -->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Type d'utilisateur</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-sm">
          <q-select
            v-model="selectuser"
            :options="users"
            label="Sélectionnez un utilisateur"
            outlined
          />
          <q-input
            type="password"
            v-model="password"
            outlined
            label="Mot de passe"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Save" v-close-popup @click="onCreateUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import ListItem from "../components/list-item.vue";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "MyLayout",
  components: {
    ListItem,
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const rightDrawerOpen = ref(true);
    const tabElement = ref("task");
    const activeTask = ref(3);

    return {
      rightDrawerOpen,

      leftDrawerOpen,
      tabElement,
      activeTask,

      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },

      tasks: [
        {
          title: "Submissions required clarifications",
          content:
            "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Pellentesque in ipsum id orci porta dapibus.",
          id: 1,
          time: "1 hours ago",
          indicator: true,
        },
        {
          title: "Vestibulum ac diam sit amet quam vehicula",
          content:
            "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
          id: 2,
          time: "2 hours ago",
          indicator: true,
        },
        {
          title: "Submissions required clarifications",
          content:
            "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
          id: 3,
          time: "2 hours ago",
          indicator: false,
        },
        {
          title: "Vivamus suscipit tortor eget felis porttitor volutpat.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
          id: 4,
          time: "2 hours ago",
          indicator: false,
        },
      ],
    };
  },
  data() {
    return {
      selectuser: null,
      connectUser: null,
      manager: null,
      password: "March1st@2022",
      users: [],
      prompt: false,
      newuser: {},
    };
  },
  watch: {
    manager: function (val) {
      console.log(val);
    },
    user: function (val) {
      /* console.log(val);
      this.connectUser={
        email:val.email,
        id:val.id,
        company:{
          company_name:val.company.company_name,
          company_logo:val.company.company_logo
        }
      } */
      //console.log(data);
      //this.connectUser=data;
      //console.log(this.connectUser);
      this.connectUser = val;
    },
  },
  computed: {
    ...mapState("dashboard", ["menus", "user"]),
    ...mapGetters("dashboard", ["getMenus", "getUsers"]),
  },
  methods: {
    ...mapActions("dashboard", ["createUser", "allUsers"]),
    ...mapActions("program", ["allPrograms"]),
    onSignout(){
      localStorage.removeItem('m_user');
      this.prompt=true;
    },
    async onCreateUser() {
      let payload = {
        email: this.selectuser.email,
        password: this.password,
      };

      try {
        this.$q.loading.show();
        await this.createUser(payload);
        await this.allPrograms();
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        this.$q.notify({
          message: "Erreur d'authentification",
          type: "negative",
          position: "top",
          icon: "error",
        });
        this.prompt = true;
      }
    },
  },
  async beforeMount() {
    try {
      await this.allUsers();
    } catch (error) {}

    //this.prompt = true;
    this.getUsers.forEach((element) => {
      if (element.typeUser == "hacker") {
        element.label = element.first_name;
      } else if (element.typeUser == "client") {
        element.label = element.company_name;
      } else if (element.typeUser == "admin") {
        element.label = element.first_name;
      }
      element.value = element.id;
      this.users.push(element);
    });
  },
};
</script>

<style lang="sass">
.active-menu
  color:white
  border-right:1px solid white

.card-identification
  height:200px
  .title
    font-family: 'nunito'
    font-style: normal
    font-weight: bold
    font-size: 18px
    line-height: 20px
    letter-spacing: -0.05px
    color: #163053
  .subtitle
    font-family: 'nunito'
    font-style: normal
    font-weight: bold
    font-size: 14px
    line-height: 20px
    letter-spacing: -0.05px
    color: #66788A

.card-panel
  .q-tab-panel
    padding-left: 0px
    padding-right: 0px
.close-item
  background: rgba(232, 239, 242, 0.75)
.active-item
  background: rgba(40, 106, 194, 0.15)
.q-tab
  .q-badge
    right: -22px
    top:2px
.pt-box
  padding-top:70px
.mt-box
  margin-top:70px

.menu-item
  font-family: 'nunito'
  font-style: normal
  font-weight: 500
  font-size: 14px
  line-height: 20px
  letter-spacing: -0.05px
  color: rgba(255, 255, 255, 0.87)

.menu-label
  font-family: 'nunito'
  font-style: normal
  font-weight: 500
  font-size: 14px
  line-height: 20px
  letter-spacing: -0.05px
  color: #FFFFFF

.q-item__section
  &--avatar
    min-width: 0px
  &--side
    padding-right: 8px
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
