<template>
  <q-card class="my-card bg-white q-pt-lg q-pr-md q-pl-md q-pb-md">
    <q-card-section class="q-pb-none q-pt-none">
      <div class="flex justify-between">
        <div>
          <q-avatar rounded>
            <img :src="program.program_picture_url" />
          </q-avatar>
        </div>
        <div>
          <div class="text-right">
            <q-badge rounded class="q-pl-md q-pr-md access-positive"
              >{{program.program_type}}</q-badge
            >
          </div>
          <div class="q-pt-md q-pb-sm">
            <q-btn flat dense no-caps>
              <q-avatar size="24px" style="background: rgba(103, 58, 182, 0.5)">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
              <div class="q-pl-sm">{{program.safe_harbour_type}}</div>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="title-program">{{program.program_title}}</div>
      <div class="content-program">
        {{program.program_description}}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="between" class="q-pt-md q-pb-md q-pr-none q-pl-none">
      <q-btn no-caps flat class="text-action-1"
        >$ {{program.min}} - $ {{program.max}} Per vulnerability</q-btn
      >
      <q-btn no-caps flat class="text-action-2">{{program.scope}} scopes</q-btn>
    </q-card-actions>
    <slot name="button">
      <!-- <q-card-actions align="center" class="q-pt-md q-pb-md">
        <q-btn
          no-caps
          flat
          class="text-action-3"
          style="background: #5887ff; width: 100%"
          >Join Program</q-btn
        >
      </q-card-actions> -->
    </slot>
  </q-card>
</template>
<script>
export default {
  props: ["program"],
  data() {
    return {
      progress: [0.8, 0.2, 0.1],
    };
  },
};
</script>
<style scoped>
.access-positive {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #5887ff;
  background: rgba(88, 135, 255, 0.1);
}

.title-program {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #171717;
}
.content-program {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #767676;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text-action-1 {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 36px;
  letter-spacing: -0.015em;
  color: rgba(0, 0, 0, 0.65);
}
.text-action-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: #f26464;
}
/* .text-action-3 {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: #ffffff;
} */

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
</style>
