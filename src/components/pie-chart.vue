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
  data: function () {
    return {
      series: [44, 55, 41],
      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [
          "Accepted submissions",
          "Pending for verifications",
          "Rejected submissions",
        ],
        legend: {
          position: "bottom",
          horizontalAlign: 'left',
        },
        dataLabels: {
          enabled: false,
        },
      },
    };
  },
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
