<template>
  <q-card class="my-card bg-white q-pt-lg q-pr-lg q-pl-lg q-pb-md" flat>
    <q-card-section horizontal>
      <div class="box-image col-2">
        <q-img :src="program.picture" />
      </div>
      <q-card-section class="q-pl-lg q-pr-lg col">
        <div>
          <q-badge class="q-pt-xs q-pb-xs active-class">{{program.status2}}</q-badge>
          <q-badge class="q-pt-xs q-pb-xs bg-transparent time-program"
            >Active since 9 days ago</q-badge
          >
        </div>
        <div class="title-program">
          {{program.title}}
        </div>
        <div class="content-title">
          {{program.description}}
        </div>
        <div class="price-program">$ {{program.min}} - $ {{program.max}} Per vulnerability</div>
        <div class="flex no-wrap">
          <div class="q-pr-md">
            <q-btn
              label="M"
              round
              flat
              class="text-white"
              style="z-index: 99; background: #26bfbf; border: 1px solid white"
              size="12px"
            />
            <q-btn
              label="D"
              round
              flat
              class="text-white"
              style="
                background: #ee8e12;
                margin-left: -12px;
                border: 1px solid white;
              "
              size="12px"
            />
          </div>
          <div class="title-program">
            2 Managers (Franck Lambpard, Roberto Carlors)
          </div>
        </div>
      </q-card-section>
      <slot name="level"> </slot>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  components: {  },
  props: ["program"],
  data() {
    return {
      
    };
  },
};
</script>
<style scoped>
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
.title-program {
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
}
.box-image {
  border-radius: 10px;
}
.box-image .q-img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
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
