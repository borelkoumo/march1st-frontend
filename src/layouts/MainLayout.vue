<template>
  <q-layout view="hHr Lpr lff">
    <q-header v-scroll="onScroll" v-if="$route.name!='login' && $route.name!='register'" class="q-pt-md q-pb-md" :class="{'bg-transparent':isTransparent, 'bg-white':!isTransparent, 'text-primary':!isTransparent}">
      <q-toolbar class="" v-if="$route.name=='navigator'">
        <q-toolbar-title>
          <q-icon name="report_problem" size="30px"/> WebAuthn Error
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="" v-else>
        <div>
          <q-img src="vectors/logo-02.svg" width="150px" v-if="isTransparent"/>
          <q-img src="vectors/logo-01.svg" width="150px" v-else/>
        </div>
        <q-space/>
        <div class="gt-xs">
          <menu-item :name="'INTRODUCTION'"/>
          <menu-item :name="'SOLUTIONS'"/>
          <menu-item :name="'CUSTOMERS'"/>
          <menu-item :name="'PROGRAMS'"/>
          <menu-item :name="'RESEARCHERS'"/>
        </div>
        <q-space/>
        <div class="flex no-wrap">
          <q-btn-dropdown class="btn-dropdown bg-none q-pl-sm q-mr-xs" dense :label="language.value" flat :class="{'text-primary':!isTransparent, 'text-white':isTransparent}">
            <q-list>
              <q-item clickable v-close-popup @click="language.value='EN'">
                <q-item-section>
                  <q-item-label>English</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="language.value='AR'">
                <q-item-section>
                  <q-item-label>Arabe</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-separator vertical inset color="white" v-if="isTransparent"/>
          <q-separator vertical inset color="primary" v-else />
          <q-btn flat class="">
            <q-avatar size="22px">
              <img src="vectors/login-white.svg" v-if="isTransparent">
              <img src="vectors/login-dark.svg" v-else>
            </q-avatar>
            <q-menu
              :offset="[25, 10]"
              transition-show="jump-down"
              transition-hide="jump-up"
              class="menu-user"
            >
              <q-list style="min-width: 200px">
                <q-item clickable v-ripple class="q-pt-sm q-pb-sm">
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold text-primary">Nom d'utilisateur</q-item-label>
                    <q-item-label caption lines="1">Lorem ipsum dolor sit amet</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator color="info"/>
                <q-item clickable v-ripple class="q-pt-xs q-pb-xs">
                  <q-item-section avatar>
                    <q-avatar color="white" text-color="secondary" icon="person_outline" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-primary">My Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator color="info"/>
                <q-item clickable v-ripple class="q-pt-xs q-pb-xs">
                  <q-item-section avatar>
                    <q-avatar color="white" text-color="secondary" icon="settings" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-primary">Settings</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <div style="width:100%; font-family:'nunito';">
                <q-btn flat class="text-primary" style="background-color:#eaf5ff; width:100%" label="Sign out" no-caps icon="logout"/>
              </div>
            </q-menu>
          </q-btn>
          <q-separator vertical inset color="white" v-if="isTransparent"/>
          <q-separator vertical inset color="primary" v-else />
          <q-btn dense flat class="" @click="drawerRight=true">
            <q-avatar size="22px">
              <img src="vectors/burgermenu-white.svg" v-if="isTransparent">
              <img src="vectors/burgermenu-dark.svg" v-else>
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-header v-else class="bg-container">
      <q-toolbar class="bg-container">
        <div>
          <q-img src="vectors/logo-01.svg" width="150px"/>
        </div>
        <q-space/>
        <q-btn-dropdown class="bg-grey-3 text-dark q-pl-sm btn-dropdown" dense :label="language.value" flat>
          <q-list>
            <q-item clickable v-close-popup @click="language.value='EN'">
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="language.value='AR'">
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
        bordered
        :width="600"
        overlay
        :breakpoint="500"
        class="bg-primary"
      >
        <div class="relative-position" style="height:100%;">
          <q-toolbar>
            <q-space/>
            <q-btn class="text-white" flat icon="close" @click="drawerRight=false"/>
          </q-toolbar>
          <div class="absolute flex-center" style="top:0; margin-top:50%; margin-bootom:50%">
            <div style="height:100%;" class="draw-menu">
              <q-list>
                <q-item clickable>ABOUT US</q-item>
                <q-item clickable>FAQ</q-item>
                <q-item clickable>CONTACT US</q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-drawer>

    <q-footer v-if="$route.name!='login' && $route.name!='register'">
      <div class="content-box">
        <div class="row">
          <div class="flex flex-center col-sm-3 col-xs-12">
            <div>
              <div><q-img src="vectors/logo-02.svg" width="150px"/></div>
              <div class="text-center q-pt-md q-gutter-sm">
                <q-btn outline round size="9px"><i class="fab fa-facebook-f"></i></q-btn>
                <q-btn outline round size="9px"><i class="fab fa-twitter"></i></q-btn>
                <q-btn outline round size="9px"><i class="fab fa-linkedin-in"></i></q-btn>
              </div>
            </div>
          </div>
          <div class="col-sm-4 col-xs-12 q-pl-lg contact-us" style="">
            <div class="footer-title">CONTACT US</div>
            <q-list class="text-grey-4" style="">
              <q-item
                clickable
              >
                <q-item-section avatar class="text-secondary">
                  <q-icon name="place" size="18px"/>
                </q-item-section>
                <q-item-section>
                  <div>Company, 24643 21B Ave</div>
                  <div>Langley, BC, Canada V2Z 1J3</div>
                </q-item-section>
              </q-item>
              <q-item
                clickable
              >
                <q-item-section avatar class="text-secondary">
                  <q-icon name="call" size="18px"/>
                </q-item-section>
                <q-item-section>
                  <div>Phone: +604 856 0303</div>
                </q-item-section>
              </q-item>
              <q-item
                clickable
              >
                <q-item-section avatar class="text-secondary">
                  <q-icon name="mail" size="18px"/>
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
              <q-list style="font-size:10px;" class="text-grey-4">
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Home</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Contact Info & Dealer List</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Privacy Statement</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Service & Support</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Size Recommendation</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Product</q-item-section>
                </q-item>
              </q-list>
              <q-list style="font-size:10px;" class="text-grey-4">
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">About Us</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Return Policy</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">FAQs</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Order Info</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Applications</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar class=""><q-icon name="navigate_next"/></q-item-section>
                  <q-item-section class="">Site Map</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
        <q-separator color="grey-7" inset class="q-mt-md"/>
        <div class="q-pt-md q-pb-md text-center text-grey-5" style="font-size:12px;"><p>Copyright &copy; 2021 March1<sup>st</sup> Cybersecurity. All Rights Reserved. | Privicy Policy | Terms & Conditions</p></div>
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import menuItem from "src/components/menu-item.vue";
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  components: { menuItem },
  name: "PageIndex",
  data() {
    return {
      language:{
        label:"English",
        value:"EN"
      },
      isTransparent:true,
      drawerRight:false
    }
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
    onScroll(position){
      if(position>150){
        this.isTransparent=false;
      }
      else{
        this.isTransparent=true;
      }
      console.log(position)
    }
  },
});
</script>
<style>
.q-page-container {
  padding-top: 0 !important;
}
  .q-btn.q-focusable:focus .q-focus-helper, .q-hoverable:hover .q-focus-helper {
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
  .quick-links{
    flex-wrap: nowrap;
  }
  .quick-links .q-item {
    min-height: 0px;
    padding: 0px;
  }
  .contact-us .q-item{
    min-height: 0px;
  }
  .contact-us .q-list{
    font-family:'nunito'; 
    font-size:10px;
  }
  .contact-us, .top-quick-links{
    border-left:1px solid grey;
  }
  .footer-title{
    font-family: 'good-time';
    padding: 10px;
    padding-bottom: 15px;
  }
  .q-footer .content-box{
    margin-bottom: 0px;
  }
  .q-footer p{
    margin-bottom: 0px;
  }
  .draw-menu{
    padding-left:25px;
  }
  .draw-menu .q-item{
    color:white;
    font-family: 'good-time';
    font-size:24px;
    padding-bottom: 25px;
  }
  .menu-user{
    font-family: 'nunito';
  }
  @media (max-width: 599px){
    .quick-links{
      display: block;
      padding-top:24px;
    }
    .quick-links.q-gutter-lg > * {
        margin-top: 0px;
    }
    .contact-us{
      padding-left: 5px;
      border-bottom:1px solid grey;
      border-left:none;
    }
    .contact-us .q-list{
      font-size:12px;
    }
    .contact-us .q-item{
      padding-left: 0px;
    }
    .top-quick-links{
      border-left:none;
    }
    .quick-links.q-gutter-lg > * {
        margin-left: 0px;
    }
    .quick-links .q-list{
      display: block;
    }
  }
</style>

