<template>
  <q-header>
    <q-toolbar class="bg-white q-pl-lg q-pr-lg">
      <q-toolbar-title class="title-header">{{title}}</q-toolbar-title>
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
    </q-toolbar>
  </q-header>
  <router-view v-if="getUser && getAllPrograms.length >= 0" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "My Programs",
      language: {
        value: "EN",
      },
    };
  },
  watch: {
    "$route.name": function (val) {
      switch (val) {
        case "my-programs":
          this.title = "My Programs";
          break;
        case "add-program":
          this.title = "Add Program";
          break;
        case "edit-program":
          this.title = "Edit Program";
          break;
        case "all-programs":
          this.title = "All Programs";
          break;
        case "program-detail":
          this.title = "Program Details";
          break;
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
    ...mapGetters("program", ["getAllPrograms"]),
  },
  methods: {
    ...mapActions("program", ["GET_PROGRAMS", "GET_MY_PROGRAMS"]),
  },
  async beforeMount() {
    try {
      this.$q.loading.show();
      await this.GET_PROGRAMS();
      await this.GET_MY_PROGRAMS();
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
      console.log(error);
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
