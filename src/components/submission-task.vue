<template>
  <div class="relative-position">
    <q-separator />
    <div class="title q-pb-md q-pt-md">
      Submission Name Submission title Submission title
    </div>
    <div class="content q-pb-lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est
    </div>
    <div class="author q-pb-sm">
      Submitted by: <span class="text-secondary">XYZ Hacker</span>
    </div>
    <div class="author q-pb-lg">
      Submitted Target:
      <span class="text-secondary">www.Nemoenimipsam.com/123345/ggjn</span>
    </div>
    <q-separator />
    <div class="text-secondary q-pt-lg q-pb-sm">Related Program</div>
    <div class="title-2 q-pb-sm">Program Tiltle Lorem ipsum dolor sit amet</div>
    <div class="content-2 q-pb-lg">
      Prgram Description Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
    <div class="submission-attachment q-pt-md flex q-gutter-md">
      <div class="q-pa-sm" style="border-radius: 10px; background: #f8f8f8">
        <q-card class="card-attachment flex" flat>
          <div>
            <q-img src="~assets/file-pdf.svg" width="50px" />
          </div>
          <div class="q-pl-md q-pr-md flex flex-center" style="">
            <div>
              <div class="attachment-name">abc.pdf</div>
              <div class="attachment-size">2.2mb</div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="q-pa-sm" style="border-radius: 10px; background: #f8f8f8">
        <q-card class="card-attachment flex" flat>
          <div>
            <q-img src="~assets/file-pdf.svg" width="50px" />
          </div>
          <div class="q-pl-md q-pr-md flex flex-center" style="">
            <div>
              <div class="attachment-name">abc.pdf</div>
              <div class="attachment-size">2.2mb</div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="submission-action q-gutter-md absolute">
      <q-btn label="Reject" outline color="secondary" no-caps />
      <q-btn label="Accept" flat class="text-white bg-secondary" no-caps />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.submission-action{
  right: 0;
  bottom: 3px;
}
.submission-action .q-btn {
  width: 160px;
}
.title {
  font-family: "inter";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #46516d;
}
.content {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #838181;
}
.author {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.title-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.content-2 {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.015em;
  color: #838181;
}
.card-attachment {
  width: 200px;
  padding-left: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 10px;
  background: #f8f8f8;
}
.attachment-name,
.attachment-size {
  font-family: "inter";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.015em;
  color: #46516d;
}
.attachment-size {
  color: #949090;
}
</style>
