<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar style="background-color:#BDBDBD">
          <img src="images/admin/Vector.png" alt=""/>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="title">
        <slot name="title"></slot>
      </q-item-label>
      <q-item-label class="caption" lines="3">
        <slot name="caption"></slot>
      </q-item-label>
      <q-item-label class="time">
        <slot name="time"></slot>
      </q-item-label>
    </q-item-section>
    <q-item-section side top>
      <slot name="indicator"></slot>
    </q-item-section>
  </q-item>
</template>
<style scoped>
.title {
  font-family: "nunito";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #3a3b3f;
}
.caption {
  font-family: "nunito";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 125%;
  align-items: center;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.46);
}
.time {
  font-family: "nunito";
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;

  color: rgba(0, 0, 0, 0.6);
}
</style>
