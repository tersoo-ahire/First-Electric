<template>
<main class="pt-4">
  <v-container class="boxed__container referee">
    <div class="mb-8 d-flex align-end justify-lg-space-between">
      <Breadcrumb class="flex-grow-0" icon="cart" title="Orders" />

      <div class="flex-grow-1 pl-12">
        <v-form @submit.prevent="search_order" class="d-flex mt-6">
          <v-text-field v-model="searchEntry" solo flat class="my-shadow" placeholder="Search by order ID"></v-text-field>

          <v-btn type="submit" :loading="loading2" depressed color="primary" class="secondary--text caption font-weight-bold search__btn" height="45" width="40">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-form>
      </div>
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="orders" item-key="id" class="transparent" :loading="loading" no-data-text="No Order found" loading-text="Loading... Please wait">

        <template v-slot:[`item.createdAt`]="{ item }">
          <div>{{ item.createdAt | formatDate }}</div>
        </template>

        <template v-slot:[`item.amount`]="{ item }">
          <div>{{ item.amount | formatCurrency }}</div>
        </template>

        <template v-slot:[`item.user`]="{ item }">
          <div v-if="item.user">{{ item.user.firstname }} {{ item.user.lastname }}</div>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <div class="text-capitalize">{{ item.status }}</div>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn nuxt :to="`/admin/orders/${item.ref}`" depressed small color="primary" class="secondary--text font-weight-bold">View Detail</v-btn>
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
    searchEntry: null,

    headers: [{
        text: 'Reference',
        value: 'ref',
        sortable: false
      },
      {
        text: 'Order Total (₦)',
        value: 'amount',
      },
      {
        text: 'Status',
        value: 'status',
      },
      {
        text: 'Customer',
        value: 'user',
      },
      {
        text: 'Date',
        value: 'createdAt'
      },
      {
        text: 'Action',
        value: 'action'
      }
    ],

    orders: []
  }),

  methods: {
    search_order() {
      this.loading = true

      this.$axios.$get(`/orders/${this.searchEntry}`).then(response => {
        this.loading = false

        this.orders = [response.data]

        this.searchEntry = null
      }).catch(() => this.loading = false)
    }
  },

  created() {
    this.loading = true

    this.$axios.$get('/orders?page=1&perPage=10').then(response => {
      this.orders = response.data.orders
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
