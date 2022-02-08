<template>
  <q-layout view="hHr Lpr lff">
    <q-header
      v-scroll="onScroll"
      v-if="
        $route.name != 'login' &&
        $route.name != 'register' &&
        $route.name != 'assertion'
      "
      class="q-pt-md q-pb-md"
      :class="{
        'bg-transparent': isTransparent,
        'bg-white': !isTransparent,
        'text-primary': !isTransparent,
      }"
    >
      <q-toolbar class="" v-if="$route.name == 'navigator'">
        <q-toolbar-title>
          <q-icon name="report_problem" size="30px" /> WebAuthn Error
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar v-else class="q-pt-md">
        <div class="q-pl-md img-logo">
          <q-img src="vectors/logo-02.svg" v-if="isTransparent" />
          <q-img src="vectors/logo-01.svg" v-else />
        </div>
        <q-space />
        <div class="gt-xs">
          <menu-item :name="'INTRODUCTION'" class="q-mx-md" />
          <menu-item :name="'SOLUTIONS'" class="q-mx-md" />
          <menu-item :name="'CUSTOMERS'" class="q-mx-md" />
          <menu-item :name="'PROGRAMS'" class="q-mx-md" />
          <menu-item :name="'RESEARCHERS'" class="q-mx-md" />
        </div>
        <q-space />
        <div class="flex no-wrap btn-header-action">
          <q-btn-dropdown
            class="btn-dropdown bg-none q-pl-sm q-mr-xs"
            dense
            :label="language.value"
            flat
            :class="{
              'text-primary': !isTransparent,
              'text-white': isTransparent,
            }"
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
          <q-separator vertical inset color="white" v-if="isTransparent" />
          <q-separator vertical inset color="primary" v-else />

          <q-btn flat class="">
            <q-avatar size="22px" class="gt-xs">
              <img src="vectors/login-white.svg" v-if="isTransparent" />
              <img src="vectors/login-dark.svg" v-else />
            </q-avatar>
            <q-avatar size="17px" class="xs">
              <img src="vectors/login-white.svg" v-if="isTransparent" />
              <img src="vectors/login-dark.svg" v-else />
            </q-avatar>
            <q-menu
              :offset="[25, 10]"
              transition-show="jump-down"
              transition-hide="jump-up"
              class="menu-user relative-position bg-transparent"
              v-if="userData"
            >
              <div
                style="width: 100%; position: relative; min-height: 20px"
                class="relative-position"
              >
                <div class="triangle absolute"></div>
              </div>
              <q-list style="min-width: 200px" class="bg-white">
                <q-item clickable v-ripple class="q-pt-sm q-pb-sm">
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold text-primary"
                      >{{userData.attributes.name}}</q-item-label
                    >
                    <q-item-label caption lines="1"
                      >{{userData.attributes['custom:companyName']}}</q-item-label
                    >
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
              <div style="width: 100%; font-family: 'nunito'">
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
            <q-menu
              :offset="[25, 10]"
              transition-show="jump-down"
              transition-hide="jump-up"
              class="menu-user relative-position bg-transparent"
              v-else
            >
              <div
                style="width: 100%; position: relative; min-height: 20px"
                class="relative-position"
              >
                <div class="triangle absolute"></div>
              </div>
              <q-list style="min-width: 200px" class="bg-white">
                <q-item
                  clickable
                  v-ripple
                  class="q-pt-xs q-pb-xs"
                  to="/auth/register/2"
                >
                  <!-- <q-item-section avatar>
                    <q-avatar color="white" text-color="secondary" icon="person_outline" size="55px"/>
                  </q-item-section> -->
                  <q-item-section>
                    <q-item-label class="text-primary"
                      >Signup For Client</q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-separator color="info" />
                <q-item
                  clickable
                  v-ripple
                  class="q-pt-xs q-pb-xs"
                  to="/auth/register/1"
                >
                  <!-- <q-item-section avatar>
                    <q-avatar color="white" text-color="secondary" icon="settings" size="55px" />
                  </q-item-section> -->
                  <q-item-section>
                    <q-item-label class="text-primary"
                      >Signup For Hacker</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
              <div style="width: 100%; font-family: 'nunito'">
                <q-btn
                  flat
                  class="text-primary"
                  style="background-color: #eaf5ff; width: 100%"
                  label="Sign In"
                  no-caps
                  icon="login"
                  to="/auth/login"
                />
              </div>
            </q-menu>
          </q-btn>
          <q-separator vertical inset color="white" v-if="isTransparent" />
          <q-separator vertical inset color="primary" v-else />
          <q-btn dense flat class="q-ml-sm" @click="drawerRight = true">
            <q-avatar size="22px" class="gt-xs">
              <img src="vectors/burgermenu-white.svg" v-if="isTransparent" />
              <img src="vectors/burgermenu-dark.svg" v-else />
            </q-avatar>
            <q-avatar size="17px" class="xs">
              <img src="vectors/burgermenu-white.svg" v-if="isTransparent" />
              <img src="vectors/burgermenu-dark.svg" v-else />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-header v-else class="bg-container">
      <q-toolbar class="bg-container q-pt-md">
        <div class="q-pl-md">
          <q-img
            src="vectors/logo-01.svg"
            width="150px"
            @click="goHome()"
            class="cursor-pointer"
          />
        </div>
        <q-space />
        <q-btn-dropdown
          class="bg-grey-3 text-dark q-pl-sm btn-dropdown"
          dense
          :label="language.value"
          flat
        >
          <q-list>
            <q-item clickable v-close-popup @click="language.value = 'EN'">
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="language.value = 'AR'">
              <q-item-section>
                <q-item-label>Arabe</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="drawerRight"
      :width="$q.screen.width / 2"
      overlay
      :breakpoint="500"
      class="bg-primary"
      style=""
    >
      <div class="relative-position" style="height: 100%">
        <q-toolbar>
          <q-space />
          <q-btn
            class="text-white"
            flat
            icon="close"
            @click="drawerRight = false"
          />
        </q-toolbar>
        <div
          class="absolute flex-center"
          style="top: 0; margin-top: 50%; margin-bootom: 50%"
        >
          <div style="height: 100%" class="draw-menu">
            <q-list>
              <q-item clickable>ABOUT US</q-item>
              <q-item clickable>FAQ</q-item>
              <q-item clickable>CONTACT US</q-item>
            </q-list>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-footer
      v-if="
        $route.name != 'login' &&
        $route.name != 'register' &&
        $route.name != 'assertion'
      "
      class="bg-footer"
    >
      <div class="opacity-background2">
        <div class="content-box pt-box">
          <div class="row">
            <div class="flex flex-center col-sm-3 col-xs-12">
              <div>
                <div><q-img src="vectors/logo-02.svg" width="220px" /></div>
                <div class="text-center q-pt-md q-gutter-sm">
                  <q-btn outline round size="12px"
                    ><i class="fab fa-facebook-f"></i
                  ></q-btn>
                  <q-btn outline round size="12px"
                    ><i class="fab fa-twitter"></i
                  ></q-btn>
                  <q-btn outline round size="12px"
                    ><i class="fab fa-linkedin-in"></i
                  ></q-btn>
                </div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12 q-pl-lg contact-us" style="">
              <div class="footer-title">CONTACT US</div>
              <q-list class="text-grey-4" style="">
                <q-item clickable>
                  <q-item-section avatar class="text-secondary">
                    <q-icon name="place" size="30px" />
                  </q-item-section>
                  <q-item-section>
                    <div>Company, 24643 21B Ave</div>
                    <div>Langley, BC, Canada V2Z 1J3</div>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar class="text-secondary">
                    <q-icon name="call" size="30px" />
                  </q-item-section>
                  <q-item-section>
                    <div>Phone: +604 856 0303</div>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar class="text-secondary">
                    <q-icon name="mail" size="30px" />
                  </q-item-section>
                  <q-item-section>
                    <div>Email: info@company.com</div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-sm-5 col-xs-12 q-pl-lg top-quick-links" style="">
              <div class="footer-title">QUICK LINKS</div>
              <div class="flex quick-links q-gutter-lg">
                <q-list style="font-size: 18px" class="text-grey-4">
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Home</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class=""
                      >Contact Info & Dealer List</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Privacy Statement</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Service & Support</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class=""
                      >Size Recommendation</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Product</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="font-size: 18px" class="text-grey-4">
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">About Us</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Return Policy</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">FAQs</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Order Info</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Applications</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar class=""
                      ><q-icon name="navigate_next"
                    /></q-item-section>
                    <q-item-section class="">Site Map</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
          <q-separator color="grey-7" inset class="q-mt-md" />
          <div
            class="q-pt-md q-pb-md text-center text-grey-5"
            style="font-size: 16px"
          >
            <p>
              Copyright &copy; 2021 March1<sup>st</sup> Cybersecurity. All
              Rights Reserved. | Privicy Policy | Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// Amplify libraries
import { Auth } from "@aws-amplify/auth";

import menuItem from "src/components/menu-item.vue";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  components: { menuItem },
  name: "PageIndex",
  data() {
    return {
      language: {
        label: "English",
        value: "EN",
      },
      isTransparent: true,
      drawerRight: false
    };
  },
  computed: {
    ...mapState("global", ["userData"]),
  },
  methods: {
    ...mapActions("global", ["logoutUser"]),
    logout() {
      this.logoutUser()
        .then((r) => {
          this.$q.notify({
            message: `User logged out`,
            type: "positive",
            position: "top",
          });
          this.$router.push("/auth/login");
        })
        .catch((err) => {
          this.$q.notify({
            message: err.toString(),
            type: "negative",
            position: "top",
            icon: "error",
          });
        });
    },
    goHome() {
      this.$router.push("/");
    },
    onScroll(position) {
      if (position > 150) {
        this.isTransparent = false;
      } else {
        this.isTransparent = true;
      }
      console.log(position);
    },
  },
  async beforeMount() {
    try {
      this.userData = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
    } catch (error) {
      console.log(error)
    }
  },
  
});
</script>
<style>
.img-logo .q-img {
  width: 150px;
}
.q-page-container {
  padding-top: 0 !important;
}
.q-btn.q-focusable:focus .q-focus-helper,
.q-hoverable:hover .q-focus-helper {
  background: inherit !important;
  opacity: 0 !important;
}
.btn-dropdown.q-btn-dropdown--simple * + .q-btn-dropdown__arrow {
  margin-left: 0px;
}

.q-item__section--avatar {
  color: inherit;
  min-width: 0px;
  padding-right: 10px;
}
.quick-links {
  flex-wrap: nowrap;
}
.quick-links .q-item {
  min-height: 0px;
  padding: 0px;
  padding-top: 5px;
}
.contact-us .q-item {
  min-height: 0px;
}
.contact-us .q-list {
  font-family: "nunito";
  font-size: 18px;
}
.contact-us,
.top-quick-links {
  border-left: 1px solid grey;
}
.footer-title {
  font-family: "good-time";
  padding: 10px;
  padding-bottom: 15px;
  font-size: 24px;
}
.q-footer .content-box {
  margin-bottom: 0px;
}
.q-footer p {
  margin-bottom: 0px;
}
.draw-menu {
  padding-left: 25px;
}
.draw-menu .q-item {
  color: white;
  font-family: "good-time";
  font-size: 24px;
  padding-bottom: 25px;
}
.menu-user {
  font-family: "nunito";
}
.triangle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid white;
  right: 40px;
}
.bg-footer {
  background-image: url("~assets/bg-footer.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.opacity-background2 {
  background-color: rgba(22, 48, 83, 0.85);
}
@media (max-width: 599px) {
  .img-logo .q-img {
    width: 100px;
  }
  .btn-header-action .q-btn-dropdown,
  .btn-header-action .q-btn {
    font-size: 12px;
  }
  .quick-links {
    display: block;
    padding-top: 24px;
  }
  .quick-links.q-gutter-lg > * {
    margin-top: 0px;
  }
  .contact-us {
    padding-left: 5px;
    border-bottom: 1px solid grey;
    border-left: none;
  }
  .contact-us .q-list {
    font-size: 12px;
  }
  .contact-us .q-item {
    padding-left: 0px;
  }
  .top-quick-links {
    border-left: none;
  }
  .quick-links.q-gutter-lg > * {
    margin-left: 0px;
  }
  .quick-links .q-list {
    display: block;
  }
}
</style>
