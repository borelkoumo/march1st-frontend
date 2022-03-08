<template>
  <q-card class="card-task" flat>
    <div class="flex">
      <div class="flex flex-center image-task">
        <slot name="image"></slot>
      </div>
      <div class="flex flex-center content-task col">
        <div style="min-width:100%">
          <q-toolbar>
            <q-badge class="open">Open</q-badge>
            <q-space />
            <q-badge class="time">2 day ago , 3:45 pm</q-badge>
          </q-toolbar>
          <div class="title">
            A reminder to update your profile was sent to you
          </div>
          <div class="subtitle">
            Update your banking information from your Profile
          </div>
          <div class="link">Submission Update</div>
        </div>
      </div>
    </div>
    <q-card-section>
        <slot name="submission">
            
        </slot>
    </q-card-section>
  </q-card>
</template>
<script>
export default {};
</script>
<style scoped>
.card-task{
    padding-top:24px;
    padding-bottom: 24px;
    padding-right: 24px;
    border-radius: 10px;
}
.image-task{
    padding-left: 24px;
}
.content-task{
    padding-left: 32px;
}
.q-toolbar{
    padding:0px;
    min-height: 30px;
}
.open {
  background: rgba(71, 184, 129, 0.2);
  border-radius: 5px;
  font-family: "inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.015em;
  color: #47b881;
  padding-left:30px;
  padding-right:30px;
}
.time {
  font-family: 'inter';
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
  padding-bottom: 5px;
  padding-top:14px;
}
.subtitle {
  font-family: "inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.015em;
  color: #838181;
  padding-top:6px;
  padding-bottom: 6px;
}
.link {
  font-family: "inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.015em;
  color: #5887ff;
  padding-top: 5px;
  padding-bottom: 14px;
}
</style>
