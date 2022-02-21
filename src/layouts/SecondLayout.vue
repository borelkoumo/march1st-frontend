<template>
  <q-layout view="lHh lpp fff" class="bg-grey-1">
    <q-header>
      <q-toolbar class="bg-white q-pl-lg q-pr-lg">
      <q-toolbar-title class="title-submission">Submissions</q-toolbar-title>
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
          <div v-for="menu in menus" :key="menu.id">
            <q-item-label header v-if="menu.hasLabel" class="menu-label">{{
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
            <q-separator
              inset
              :class="{ 'mt-box': menu.hasLabel }"
              style="background: rgba(228, 231, 235, 0.25)"
            />
          </div>
        </q-list>
      </q-scroll-area>
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
  components: {
    ListItem,
  },

  setup() {
    const leftDrawerOpen = ref(true);
  
    return {
      language: {
        label: "English",
        value: "EN",
      },
      leftDrawerOpen,

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
            { icon: "people", text: "My Account" },
            { icon: "shopping_basket", text: "My Tasks" },
            { icon: "lock_open", text: "My Programs" },
            { icon: "dashboard", text: "My Submissions" },
            { icon: "format_size", text: "Payments" },
          ],
        },
        {
          label: "General Menu",
          hasLabel: true,
          id: 2,
          children: [
            { icon: "people", text: "Leader Board" },
            { icon: "shopping_basket", text: "All Programs" },
          ],
        },
      ],
      
    };
  },
};
</script>

<style lang="sass">

.close-item
  background: rgba(232, 239, 242, 0.75)
.active-item
  background: rgba(40, 106, 194, 0.15)

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
