<template>
  <q-card>
    <div class="title-chart q-pa-md">
      <slot> </slot>
    </div>
    <apexchart
      type="bar"
      height="290"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </q-card>
</template>
<script>
export default {
  props: ["columns"],
  data: function () {
    return {
      series: [],
      chartOptions: {},
    };
  },
  beforeMount() {
    let columns = JSON.parse(JSON.stringify(this.columns));
    this.series = columns.series;
    this.chartOptions = columns.chartOptions;
  },
  mounted() {},
};
</script>
<style scoped>
.title-chart {
  font-family: "nunito";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.05px;
  color: #3a3b3f;
}
</style>
