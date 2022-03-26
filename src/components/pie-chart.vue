<template>
  <q-card class="q-pb-md">
    <div class="title-chart q-pa-md">
      <slot> </slot>
    </div>
    <q-separator />
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </q-card>
</template>
<script>
export default {
  props:['value'],
  data: function () {
    return {
      series: [],
      chartOptions: {
        
      },
    };
  },
  beforeMount(){
    console.log(this.value);
    let data = JSON.parse(JSON.stringify(this.value));
    this.series = data.series;
    this.chartOptions = data.chartOptions;
  }
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
