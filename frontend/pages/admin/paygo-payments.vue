<template>
<main class="pt-4">
  <v-container class="boxed__container">
    <div class="mb-8 d-flex align-end justify-space-between">
      <Breadcrumb class="flex-grow-0" icon="chart-bar-stacked" title="PayGo Payments" />
    </div>

    <template>
      <v-data-table :headers="headers" :items="transactions" class="transparent" hide-default-footer :items-per-page="perPage" :loading="isLoading" loading-text="Loading... Please wait" no-data-text="No transactions yet">
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>{{ item.createdAt | date }}</div>
        </template>

        <template v-slot:[`item.amount`]="{ item }">
          <div>{{ item.amount | currency }}</div>
        </template>

        <template v-slot:[`item.modeOfPayment`]="{ item }">
          <div class="text-capitalize">{{ item.modeOfPayment }}</div>
        </template>

        <template v-slot:[`item.topupStatus`]="{ item }">
          <div style="max-width: 200px">{{ item.topupStatus }}</div>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <div class="text-capitalize font-weight-bold" :class="item.status == 'success' ? 'green--text' : item.status == 'pending' ? 'orange--text' : 'red--text'">{{ item.status }}</div>
        </template>
      </v-data-table>

      <v-pagination v-if="!isLoading && totalPages > 1" v-model="currentPage" :length="totalPages" @input="handlePageChange" circle total-visible="5" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" class="mt-8"></v-pagination>
    </template>
  </v-container>
</main>
</template>

<script>
import Breadcrumb from '@/components/navigation/Breadcrumb'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb
  },

  data: () => ({
    headers: [{
        text: 'Reference',
        value: 'paymentReference',
        sortable: false
      },
      {
        text: 'Customer',
        value: 'meter.meterName',
      },
      {
        text: 'Email',
        value: 'meter.email',
      },
      {
        text: 'Date',
        value: 'createdAt',
      },
      {
        text: 'Amount (₦)',
        value: 'amount'
      },
      {
        text: 'Token',
        value: 'token'
      },
      {
        text: 'Mode of Payment',
        value: 'modeOfPayment'
      },
      {
        text: 'Payment Status',
        value: 'paymentGatewayMessage',
      },
      {
        text: 'Top up Status',
        value: 'topupStatus',
      }
    ],

    isLoading: true,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,

    transactions: []
  }),

  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.fetchPayments()
    },

    fetchPayments() {
      const url = this.$route.query.meter ? `/paygo/payments?meterNumber=${this.$route.query.meter}&page=${this.currentPage}&perPage=${this.perPage}` : `/paygo/payments?page=${this.currentPage}&perPage=${this.perPage}`
      this.$axios.$get(url)
        .then(response => {
          this.transactions = response.data.payments
          this.currentPage = response.data.page
          this.totalPages = response.data.totalPages
          this.isLoading = false
        })
        .catch(() => this.isLoading = false)
    }
  },

  created() {
    this.fetchPayments()
  },
}
</script>
