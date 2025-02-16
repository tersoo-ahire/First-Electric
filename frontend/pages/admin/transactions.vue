<template>
<main class="pt-4">
  <v-container class="boxed__container referee">
    <div class="mb-8 d-flex align-end justify-lg-space-between">
      <Breadcrumb class="flex-grow-0" icon="finance" title="Transactions" />
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="transactions" :search="searchEntry" item-key="id" class="transparent" :loading="loading" no-data-text="No Transaction found" loading-text="Loading... Please wait">

        <template v-slot:item.createdAt="{ item }">
          <div>{{ item.createdAt | formatDate }}</div>
        </template>

        <template v-slot:item.amount="{ item }">
          <div>{{ item.amount | formatCurrency }}</div>
        </template>

        <template v-slot:item.status="{ item }">
          <v-icon :color="item.status == 'success' ? 'green' : 'red'">mdi-circle-medium</v-icon>
          <span class="text-capitalize">{{ item.status }}</span>
        </template>

        <template v-slot:item.customer="{ item }">
          <div v-if="item.customer">{{ item.customer.firstname }} {{ item.customer.lastname }}</div>
        </template>

      </v-data-table>
    </template>
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.v-btn {
  border-radius: 0 !important;
}
</style>

<script>
import moment from 'moment'
import Breadcrumb from '@/components/navigation/Breadcrumb'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb
  },

  data: () => ({
    emailRules: [
      v =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) ||
      ''
    ],
    email: '',
    formValid: false,
    loading: false,
    loading2: false,
    searchEntry: '',

    headers: [{
        text: 'Reference',
        value: 'reference'
      },
      {
        text: 'Customer',
        value: 'customer'
      },
      {
        text: 'Amount (₦)',
        value: 'amount',
      },
      {
        text: 'Date',
        value: 'createdAt'
      },
      {
        text: 'Status',
        value: 'status',
      }
    ],

    transactions: []
  }),

  created() {
    this.loading = true

    this.$axios.$get('/transactions/payments?page=1&perPage=10').then(response => {
      this.transactions = response.data.payments
      this.loading = false
    }).catch(() => this.loading = false)
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('lll') : ''
    },

    formatCurrency: function (value) {
      if (isNaN(value)) {
        return value
      } else {
        value = parseFloat(value.toString().replace(/,/g, ""))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value
      }
    }
  }
}
</script>
