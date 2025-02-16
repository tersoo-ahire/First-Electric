<template>
<section>
  <v-row>
    <v-col cols="12" lg="9">
      <v-sheet class="my-shadow radius-8 pt-6 pr-3">
        <div class="font-weight-bold mb-4 ml-5">Monthly Power Usage</div>

        <div id="chart">
          <apexchart style="min-height: 200px" type="bar" height="200" :options="chartOptions" :series="series"></apexchart>
        </div>
      </v-sheet>
    </v-col>

    <v-col cols="12" lg="3">
      <v-sheet height="280" class="my-shadow radius-8 pa-6">
        <div class="font-weight-bold mb-7">Annual Power Usage</div>

        <v-data-table :headers="headers" hide-default-footer :loading="isAnnualLoading" loading-text="Loading... Please wait" no-data-text="No data found" :items="annualStats" item-key="_id"></v-data-table>
      </v-sheet>
    </v-col>
  </v-row>

</section>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },

  props: ['annualStats', 'isAnnualLoading', 'powerConsumed', 'months'],

  data: () => ({
    annualHistoryDialog: false,

    headers: [{
        text: 'Year',
        value: 'year'
      },
      {
        text: 'Power Consumed',
        value: 'powerConsumed'
      }
    ],
  }),

  computed: {
    series() {
      const ser = [{
        name: 'Power Consumed',
        data: this.powerConsumed
      }]

      return ser
    },

    chartOptions: function () {
      return {
        colors: ['#e6eef0'],

        chart: {
          type: 'bar',
          toolbar: {
            show: false,
          }
        },

        plotOptions: {
          bar: {
            columnWidth: '70%',
            distributed: true,
          },
        },

        fill: {
          type: 'solid',
        },

        dataLabels: {
          enabled: false,
        },

        legend: {
          show: false,
        },

        labels: this.months,

        xaxis: {
          categories: this.months,

          axisBorder: {
            show: false,
          },

          axisTicks: {
            show: false,
          },

          crosshairs: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false,
            formatter: (val) => {
              return val + ' Watt'
            },
          }
        }
      }
    }
  },
}
</script>
