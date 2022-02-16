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
        <q-list class="pt-box" style="font-family: 'nunito'">
          <div v-for="menu in menus" :key="menu.id">
            <q-item-label header v-if="menu.hasLabel">{{
              menu.label
            }}</q-item-label>
            <q-item
              v-for="child in menu.children"
              :key="child.text"
              :icon="child.icon"
            >
              <q-item-section avatar>
                <q-icon color="white" :name="child.icon" />
              </q-item-section>
              <q-item-section>
                {{ child.text }}
              </q-item-section>
            </q-item>
            <q-separator inset :class="{ 'mt-box': menu.hasLabel }" />
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
      <q-toolbar>
        <q-space />
        <div class="q-gutter-sm">
          <q-btn label="SIGNOUT" class="bg-primary text-white" flat />
          <q-btn label="PROFILE" class="bg-secondary text-white" flat />
        </div>
      </q-toolbar>
      <q-card flat>
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
          <q-tab-panel name="task">
            <q-list>
              <list-item>
                <template v-slot:title>
                  Submissions required clarifications
                </template>
                <template v-slot:caption>
                  Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
                </template>
                <template v-slot:time>
                  2 years ago
                </template>
                <template v-slot:indicator>
                  <q-badge rounded color="secondary" />
                </template>
              </list-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="notification">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <q-scroll-area class="fit"> </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import ListItem from "../components/list-item.vue";

export default {
  name: "MyLayout",
  components:{
    ListItem
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const rightDrawerOpen = ref(true);
    const tabElement = ref("task");

    return {
      rightDrawerOpen,

      leftDrawerOpen,
      tabElement,

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
      menus: [
        {
          label: "",
          hasLabel: false,
          id: 1,
          children: [{ icon: "dashboard", text: "Dashboard" }],
        },
        {
          label: "Personnal Menu",
          hasLabel: true,
          id: 2,
          children: [
            { icon: "dashboard", text: "My Account" },
            { icon: "shopping_basket", text: "My Tasks" },
            { icon: "dashboard", text: "My Account" },
            { icon: "dashboard", text: "My Programs" },
            { icon: "dashboard", text: "My Submissions" },
            { icon: "dashboard", text: "Payments" },
          ],
        },
        {
          label: "General Menu",
          hasLabel: true,
          id: 2,
          children: [
            { icon: "dashboard", text: "Leader Board" },
            { icon: "shopping_basket", text: "All Programs" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="sass">
.q-tab
  .q-badge
    right: -22px
    top:2px
.pt-box
  padding-top:70px
.mt-box
  margin-top:70px

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
