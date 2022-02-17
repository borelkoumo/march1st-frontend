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
  data: function () {
    return {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58],
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "25%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        fill: {
          opacity: 1,
          colors: ["#1665D8", "#EDF0F2"],
        },
        legend: {
          show: false,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },
    };
  },
};
</script>
<style scoped>
.title-chart {
  font-family: 'nunito';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.05px;
  color: #3a3b3f;
}
</style>
