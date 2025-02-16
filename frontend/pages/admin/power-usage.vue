<template>
<main class="pt-4">
  <v-container class="boxed__container">
    <div class="mb-8 d-flex align-end justify-space-between">
      <Breadcrumb class="flex-grow-0" icon="power-plug-outline" title="Power Usage" />
    </div>

    <Chart class="mb-8" :months="months" :powerConsumed="powerConsumed" :annualStats="annualStats" :isAnnualLoading="isAnnualLoading" />

    <template>
      <v-data-table :headers="headers" :items="consumptions" class="transparent" hide-default-footer :items-per-page="perPage" :loading="isLoading" loading-text="Loading... Please wait" no-data-text="No power usage yet">
        <template v-slot:[`item.loggedDate`]="{ item }">
          <div>{{ item.loggedDate | date }}</div>
        </template>
      </v-data-table>

      <v-pagination v-if="!isLoading && totalPages > 1" v-model="currentPage" :length="totalPages" @input="handlePageChange" circle total-visible="5" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" class="mt-8"></v-pagination>
    </template>
  </v-container>
</main>
</template>

<script>
import Breadcrumb from '@/components/navigation/Breadcrumb'
import Chart from '@/components/meters/powerUsageChart'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb,
    Chart
  },

  data: () => ({
    headers: [{
        text: 'Date',
        value: 'loggedDate',
        sortable: false
      },
      {
        text: 'Power Consumed (Watt)',
        value: 'powerConsumed',
        sortable: false
      },
      {
        text: 'Remaining Credit',
        value: 'remainingCredit',
        sortable: false
      }
    ],

    isLoading: true,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,

    consumptions: [],
    monthlyStats: null,
    annualStats: [],
    isAnnualLoading: true,
    isMonthlyLoading: true,
    months: [],
    powerConsumed: []
  }),

  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.fetchUsage()
    },

    fetchUsage() {
      const url = this.$route.query.meter ? `/paygo/power-usage?meterNumber=${this.$route.query.meter}&page=${this.currentPage}&perPage=${this.perPage}` : `/paygo/power-usage?page=${this.currentPage}&perPage=${this.perPage}`
      this.$axios.$get(url)
        .then(response => {
          this.consumptions = response.data.powerUsage
          this.currentPage = response.data.page
          this.totalPages = response.data.totalPages
          this.isLoading = false
        })
        .catch(() => this.isLoading = false)
    },

    fetchMonthlyStats() {
      this.$axios.$get(`/paygo/power-usage/monthly-stats?meterNumber=${this.$route.query.meter}`)
        .then(res => {
          res.data.map(el => {
            this.months.push(el.month)
            this.powerConsumed.push(el.powerConsumed)
          })
          this.isMonthlyLoading = false
        })
        .catch(() => this.isMonthlyLoading = false)
    },

    fetchAnnualStats() {
      this.$axios.$get(`/paygo/power-usage/annual-stats?meterNumber=${this.$route.query.meter}`)
        .then(res => {
          this.annualStats = res.data
          this.isAnnualLoading = false
        })
        .catch(() => this.isAnnualLoading = false)
    }
  },

  created() {
    this.fetchUsage()
    this.fetchMonthlyStats()
    this.fetchAnnualStats()
  },
}
</script>
