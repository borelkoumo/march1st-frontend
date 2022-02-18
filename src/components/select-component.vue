<template>
  <q-select
    outlined
    v-model="model"
    :options="options"
    class="relative-position"
    input-class="content-select"
  >
    <div class="absolute title-select">
      <slot></slot>
    </div>
  </q-select>
</template>
<script>
export default {
  props: ["options", "model"],
};
</script>
<style scoped>
.title-select {
  top: -6px;
  left: -3px;
  background-color: #eaf5ff;
  padding-left: 8px;
  padding-right: 8px;

  font-family: "nunito";
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.54);
}
.content-select{
    color:red;
}
</style>
