<template>
  <router-link :to="'/new-dashboard/programs/program-detail/' + program.id" style="text-decoration:none">
    <q-card class="my-card bg-white q-pt-lg q-pr-lg q-pl-lg q-pb-md" flat>
      <q-card-section horizontal>
        <div class="box-image" style="width: 200px; height: 200px">
          <q-img :src="program.program_picture_url">
            <div class="absolute">
              <q-badge
                rounded
                class="q-pl-md q-pr-md program-type"
                :class="{
                  'access-positive': program.program_type === 'public',
                  'access-negative': program.program_type === 'private',
                }"
                >{{
                  program.program_type.charAt(0).toUpperCase() +
                  program.program_type.slice(1)
                }}</q-badge
              >
            </div>
            <div class="absolute safe_type">
              <q-btn flat dense no-caps>
                <q-avatar
                  size="24px"
                  style="background: rgba(103, 58, 182, 0.5)"
                >
                  <img src="~assets/local/card/safe-harbor-1.png" />
                </q-avatar>
                <div class="q-pl-sm">
                  {{
                    program.safe_harbour_type.charAt(0).toUpperCase() +
                    program.safe_harbour_type.slice(1)
                  }}
                </div>
              </q-btn>
            </div>
          </q-img>
        </div>
        <q-card-section class="q-pl-lg q-pr-lg col">
          <div>
            <q-badge
              class="q-pt-xs q-pb-xs negative-class"
              v-if="program.is_closed"
              >Close</q-badge
            >
            <q-badge class="q-pt-xs q-pb-xs active-class" v-else
              >Active</q-badge
            >
            <q-badge class="q-pt-xs q-pb-xs bg-transparent time-program"
              >Active since 9 days ago</q-badge
            >
          </div>
          <div class="title-program">
            {{ program.program_title }}
          </div>
          <div class="content-title">
            {{ program.program_description }}
          </div>
          <div class="price-program">
            <span v-if="program.reward_type == 'cash'">$</span>
            {{ program.low.min }} -
            <span v-if="program.reward_type == 'cash'">$</span>
            {{ program.critical.max }}
            <span v-if="program.reward_type == 'points'">&nbsp;Points </span>
            <span>&nbsp; Per vulnerability</span>
          </div>
          <div class="flex no-wrap">
            <div
              class="q-pr-md no-wrap flex flex-center"
              style="padding-left: 12px"
            >
              <q-btn
                round
                flat
                class="text-white"
                style="
                  z-index: 99;
                  border: 1px solid white;
                  margin-left: -12px;
                  width: 8px;
                  height: 8px;
                "
                size="8px"
                v-for="(manager, i) in program.managers"
                :key="manager.id"
                :label="getFirstCharacter(manager.first_name)"
                :style="'background-color:' + colors[i]"
              />
            </div>
            <div class="title-program-2">
              {{ getManagersText }}
            </div>
          </div>
        </q-card-section>
        <slot name="level"> </slot>
      </q-card-section>
    </q-card>
  </router-link>
</template>
<script>
export default {
  components: {},
  props: ["program"],
  data() {
    return {
      colors: ["#26bfbf", "#ee8e12", "#26bfbf"],
    };
  },
  computed: {
    getManagersText: function () {
      let managers = this.program.managers;
      let text1 = "";
      let text2 = "";
      if (managers.length <= 1) {
        text1 = managers.length + " Manager (";
      } else {
        text1 = managers.length + " Managers (";
      }
      managers.forEach((element) => {
        if (text2 == "") text2 = element.first_name;
        else text2 = text2 + " , " + element.first_name;
      });
      text2 = text2 + ")";
      text1 = text1 + text2;
      return text1;
    },
    getFirstCharacter: function () {
      return (manager) => {
        return manager.charAt(0).toUpperCase();
      };
    },
  },
  beforeMount() {},
};
</script>
<style scoped>
.access-positive,
.access-negative {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #5887ff;
  background: rgba(88, 135, 255, 0.1);
}
.access-negative {
  color: #f55b5d;
  background: #f7d5d5;
}

.accepted {
  color: linear-gradient(90.32deg, #5eeea8 0%, #4cd291 100%);
  border-radius: 10px;
}
.rejected {
  background: linear-gradient(140.6deg, #fff6b7 -76.93%, #f6416c 100%);
  border-radius: 5px;
}
.pending {
  background: linear-gradient(135deg, #ffe985 -50%, #fa742b 150%);
  border-radius: 10px;
}

.active-class {
  background: #cafac9;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  align-items: center;
  letter-spacing: -0.015em;

  color: #47b881;
  padding-left: 16px;
  padding-right: 16px;
}
.negative-class {
  background: #fac9c9;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  align-items: center;
  letter-spacing: -0.015em;

  color: #fb0606;
  padding-left: 16px;
  padding-right: 16px;
}
.time-program {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  align-items: center;
  letter-spacing: -0.015em;
  color: #838181;
  padding-left: 16px;
  padding-right: 16px;
}
.price-program {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  align-items: center;
  letter-spacing: -0.015em;
  color: #838181;
  padding-bottom: 12px;
  padding-top: 12px;
}
.title-program,
.title-program-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
  padding-top: 8px;
  padding-bottom: 8px;
}
.title-program-2 {
  font-size: 12px;
}
.subtitle-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
  margin-top: 9px;
  padding-bottom: 15px;
}
.subtitle-3 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #838181;
  margin-top: 29px;
}
.content-title {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #838181;

  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
  height: 65px;
}
.box-image {
  border-radius: 10px;
  position: relative;
}
.box-image .q-img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.q-img__content > div {
  background: none;
}
.program-type {
  top: 12px;
  left: 12px;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  align-items: center;
  text-align: center;
  background: rgba(88, 135, 255, 0.7);
  border-radius: 100px;

  color: #ffffff;
}
.safe_type {
  bottom: -8px;
  left: 0px;
}
.title {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;

  padding-top: 18px;
  padding-bottom: 15px;
}
.q-toolbar {
  padding-left: 0;
  padding-right: 0;
  min-height: 0;
}
.title-badge {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
  color: #f55b5d;
}
.title-badge-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.015em;
  color: #838181;
}
.box-badge {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 16px;
  width: 169px;
  height: 26px;
  background: #f7d5d5;
  border-radius: 5px;
}
</style>
