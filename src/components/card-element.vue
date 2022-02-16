<template>
  <div class="wrap-card">
    <q-card
      class="my-card relative-position bg-transparent"
      style="
        padding-left: 24px;
        padding-rigth: 24px;
        padding-top: 20px;
        padding-bottom: 20px;
        height:100%
      "
    >
      <q-card-section class="flex">
        <q-card-section class="">
          <slot name="header" class="header"></slot>
        </q-card-section>
      </q-card-section>

      <div class="absolute" style="top: 30px; right: 19px">
        <slot name="icon"> </slot>
      </div>

      <q-card-section style="padding-top: 17px" class="text-footer">
        <slot name="footer">
        </slot>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.my-card {
  width: 100%;
  border-radius: 5px;
}

.q-card__section--vert {
  padding: 0px;
}
.text-footer {
  font-family: "nunito";
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0428571px;
  color: white;
}
</style>
