<template>
  <q-header>
    <q-toolbar class="bg-white q-pl-lg q-pr-lg">
      <q-toolbar-title class="title-header">{{ title }}</q-toolbar-title>
      <q-space />
      <q-btn-dropdown
        class="btn-dropdown bg-none q-pl-sm q-mr-xs"
        dense
        :label="language.value"
        flat
      >
        <q-list style="min-width: 150px" separator>
          <q-item
            class="q-pt-sm q-pb-sm"
            clickable
            v-close-popup
            @click="language.value = 'EN'"
          >
            <q-item-section>
              <q-img src="flag1.png" width="40px" />
            </q-item-section>
            <q-item-section>
              <q-item-label>English</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            class="q-pt-sm q-pb-sm"
            clickable
            v-close-popup
            @click="language.value = 'AR'"
          >
            <q-item-section>
              <q-img src="flag2.png" width="40px" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Arabe</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn round class="text-dark" flat>
        <q-avatar v-if="getUser.role === 'client'" size="30px">
          <img :src="getUser.companyUser.profile_picture_url" v-if="getUser.companyUser.profile_picture_url"/>
          <q-icon name="person" v-else/>
        </q-avatar>
        <q-avatar v-if="getUser.role === 'hacker'" size="30px">
          <img :src="getUser.hacker.profile_picture_url" v-if="getUser.hacker.profile_picture_url"/>
          <q-icon name="person" v-else/>
        </q-avatar>
        <q-avatar v-if="getUser.role === 'march1st'" size="30px">
          <img :src="getUser.march1st.profile_picture_url" v-if="getUser.march1st.profile_picture_url"/>
          <q-icon name="person" v-else/>
        </q-avatar>
        <q-menu
          :offset="[20, 0]"
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 200px" class="bg-white">
            <q-item clickable v-ripple class="q-pt-sm q-pb-sm">
              <q-item-section avatar>
                <q-avatar v-if="getUser.role === 'client'">
                  <img :src="getUser.companyUser.profile_picture_url" />
                </q-avatar>

                <q-avatar v-if="getUser.role === 'hacker'">
                  <img :src="getUser.hacker.profile_picture_url" />
                </q-avatar>
              </q-item-section>
              <q-item-section v-if="getUser.role === 'client'">
                <q-item-label class="text-bold text-primary">{{
                  getUser.companyUser.first_name
                }}</q-item-label>
                <q-item-label caption lines="1">{{
                  getUser.company.company_name
                }}</q-item-label>
              </q-item-section>
              <q-item-section v-if="getUser.role === 'hacker'">
                <q-item-label class="text-bold text-primary">{{
                  getUser.hacker.first_name
                }}</q-item-label>
                <q-item-label caption lines="1">{{
                  getUser.hacker.last_name
                }}</q-item-label>
              </q-item-section>
              <q-item-section v-if="getUser.role === 'march1st'">
                <q-item-label class="text-bold text-primary">{{
                  getUser.march1st.name
                }}</q-item-label>
                <!--<q-item-label caption lines="1">{{
                      getUser.march1st.last_name
                    }}</q-item-label>-->
              </q-item-section>
            </q-item>
            <q-separator color="info" />
            <q-item
              clickable
              v-ripple
              class="q-pt-xs q-pb-xs"
              to="/new-dashboard"
            >
              <q-item-section avatar>
                <q-avatar
                  color="white"
                  text-color="secondary"
                  icon="person_outline"
                  size="55px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary">Dashboard</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator color="info" />
            <q-item clickable v-ripple class="q-pt-xs q-pb-xs">
              <q-item-section avatar>
                <q-avatar
                  color="white"
                  text-color="secondary"
                  icon="person_outline"
                  size="55px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary">My Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator color="info" />
            <q-item clickable v-ripple class="q-pt-xs q-pb-xs">
              <q-item-section avatar>
                <q-avatar
                  color="white"
                  text-color="secondary"
                  icon="settings"
                  size="55px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-primary">Settings</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <div style="min-width: 150px; font-family: 'nunito'">
            <q-btn
              flat
              class="text-primary"
              style="background-color: #eaf5ff; width: 100%"
              label="Sign out"
              no-caps
              icon="logout"
              @click="logout()"
            />
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
  <!--<router-view
    v-if="getMyPrograms.length > 0 && getMySubmissions.length >= 0"
  />-->
  <router-view
    v-if="getUser"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "My Submissions",
      language: {
        value: "EN",
      },
    };
  },
  watch: {
    "$route.name": function (val) {
      switch (val) {
        case "my-submissions":
          this.title = "My Submissions";
          break;
        case "add-submission":
          this.title = "Submit a report";
          break;
        case "submission-detail":
          this.title = "Submission Detail";
          break;
      }
    },
  },
  computed: {
    ...mapGetters("auth",[
      'getUser'
    ]),
    ...mapGetters("submission", ["getMySubmissions"]),
    ...mapGetters("program", ["getMyPrograms"]),
  },
  methods: {
    ...mapActions("auth", ["logOutUser"]),
    ...mapActions("submission", ["GET_MY_SUBMISSIONS"]),
    ...mapActions("program", ["GET_MY_PROGRAMS"]),
    async logout() {
      try {
        await this.logOutUser();
        this.$q.notify({
          message: `User logged out`,
          type: "positive",
          position: "top",
        });
        this.$router.push("/auth/login");
      } catch (error) {}
    },
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      await this.GET_MY_SUBMISSIONS();
      await this.GET_MY_PROGRAMS();
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
    }
  },
};
</script>

<style lang="scss" scoped>
.q-toolbar {
  .title-header {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
    /* identical to box height, or 142% */

    display: flex;
    align-items: center;
    letter-spacing: 1px;

    color: #1b2559;
  }
  .btn-dropdown {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    letter-spacing: 0.75px;

    /* Body */

    color: #767676;
  }
}
</style>
