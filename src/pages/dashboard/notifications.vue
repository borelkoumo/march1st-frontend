<template>
  <q-page class="bg-home">
    <div class="main-content q-pt-lg q-pb-lg">
      <q-toolbar
        class="bg-none flex q-gutter-md q-pt-lg q-pl-none q-pr-none q-pb-lg"
        style=""
      >
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">All</span>
          <span class="text-secondary q-pl-xs">120</span>
        </q-btn>
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">General</span>
          <span class="text-secondary q-pl-xs">12</span>
        </q-btn>
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">Submissions</span>
          <span class="text-secondary q-pl-xs">111</span>
        </q-btn>
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">Invitations</span>
          <span class="text-secondary q-pl-xs">140</span>
        </q-btn>
        <q-btn
          flat
          class="bg-white text-secondary btn-element"
          no-caps
          style=""
        >
          <span style="color: #767676">Rewards</span>
          <span class="text-secondary q-pl-xs">133</span>
        </q-btn>
        <q-space />
        <q-btn
          dense
          no-caps
          label="Most recent"
          class="btn-filter q-pr-none"
          flat
          icon-right="import_export"
        />
      </q-toolbar>
      <div class="q-gutter-lg q-pt-lg">
        <q-card class="card-task" flat>
          <div class="flex">
            <div class="flex flex-center image-task">
              <q-img
                src="~assets/local/image17.png"
                width="130px"
              />
            </div>
            <div class="flex flex-center content-task col">
              <div style="min-width: 100%">
                <q-toolbar class="q-pa-none">
                  <q-badge class="accepted">Accepted</q-badge>
                  <span class="q-pl-lg subtitle"
                    >Your submission was accepted</span
                  >
                  <q-space />
                  <q-badge class="time text-secondary">2 day ago</q-badge>
                </q-toolbar>
                <div class="title q-pt-md q-pb-md">
                  Name of the program Nemo enim ipsamvolup do tatem ipsam ta
                  voluptatem aut f....
                </div>
                <div class="link">Submission Status Change</div>
              </div>
            </div>
          </div>
        </q-card>
        <q-card class="card-task" flat>
          <div class="flex">
            <div class="flex flex-center image-task">
              <q-img
                src="~assets/local/unsplash_feXpdV001o4.png"
                width="130px"
              />
            </div>
            <div class="flex flex-center content-task col">
              <div style="min-width: 100%">
                <q-toolbar class="q-pa-none">
                  <q-badge class="rejected">Rejected</q-badge>
                  <span class="q-pl-lg subtitle"
                    >Your submission was accepted</span
                  >
                  <q-space />
                  <q-badge class="time text-secondary">2 day ago</q-badge>
                </q-toolbar>
                <div class="title q-pt-md q-pb-md">
                  Name of the program Nemo enim ipsamvolup do tatem ipsam ta
                  voluptatem aut f....
                </div>
                <div class="link">Submission Status Change</div>
              </div>
            </div>
          </div>
        </q-card>
        <q-card class="card-task" flat>
          <div class="flex">
            <div class="flex flex-center image-task">
              <q-img
                src="~assets/local/image17.png"
                width="130px"
              />
            </div>
            <div class="flex flex-center content-task col">
              <div style="min-width: 100%">
                <q-toolbar class="q-pa-none">
                  <q-badge class="invitation">Invitation</q-badge>
                  <span class="q-pl-lg subtitle"
                    >Your submission was accepted</span
                  >
                  <q-space />
                  <q-badge class="time text-secondary">2 day ago</q-badge>
                </q-toolbar>
                <div class="title q-pt-md q-pb-md">
                  Name of the program Nemo enim ipsamvolup do tatem ipsam ta
                  voluptatem aut f....
                </div>
                <div class="link">Submission Status Change</div>
              </div>
            </div>
          </div>
        </q-card>
        <q-card class="card-task" flat>
          <div class="flex">
            <div class="flex flex-center image-task">
              <q-img
                src="~assets/local/unsplash_feXpdV001o4.png"
                width="130px"
              />
            </div>
            <div class="flex flex-center content-task col">
              <div style="min-width: 100%">
                <q-toolbar class="q-pa-none">
                  <q-badge class="accepted">Accepted</q-badge>
                  <span class="q-pl-lg subtitle"
                    >Your submission was accepted</span
                  >
                  <q-space />
                  <q-badge class="time text-secondary">2 day ago</q-badge>
                </q-toolbar>
                <div class="title q-pt-md q-pb-md">
                  Name of the program Nemo enim ipsamvolup do tatem ipsam ta
                  voluptatem aut f....
                </div>
                <div class="link">Submission Status Change</div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.btn-filter {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 34px;
  color: #767676;
}
.btn-element {
  background: #ffffff;
  border-radius: 40px;
  padding-left: 20px;
  padding-right: 20px;
}

.card-task {
  padding-top: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
  border-radius: 10px;
}
.image-task {
  padding-left: 24px;
}
.content-task {
  padding-left: 32px;
}
.q-toolbar {
  padding: 0px;
  min-height: 30px;
}
.accepted, .rejected, .invitation{
  background: rgba(71, 184, 129, 0.2);
  border-radius: 5px;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #47b881;
  padding-left: 30px;
  padding-right: 30px;
}
.rejected{
    background:rgba(247, 213, 213, 1);
    color: #F55B5D;
}
.invitation{
    background:rgba(255, 247, 235, 1);
    color: #FFAC32;
}
.time {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  text-align: right;
  letter-spacing: -0.015em;
  color: #838181;
  background-color: white;
}
.title {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
  max-width: 535px;
}
.subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.link {
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}

.bg-home {
  background-color: #eaf5ff;
}
.main-content {
  padding-left: 24px;
  padding-right: 24px;
}
</style>
