<template>
<main class="pt-4" id="main-contact">
  <v-container class="boxed__container">
    <div class="mb-8 d-flex align-end justify-space-between">
      <Breadcrumb class="flex-grow-0" icon="cart" title="Orders" />
    </div>

    <v-row v-if="order" class="my-6">
      <v-col cols="12" md="4">
        <v-sheet class="pa-6 text-center">
          <v-avatar size="130">
            <img src="/img/user.png" alt="">
          </v-avatar>

          <div class="secondary--text font-weight-bold title mt-3">{{ order.user.firstname }} {{ order.user.lastname }}</div>

          <div class="secondary--text font__13">{{ order.user.email }}</div>

          <div class="grey--text font-weight-bold font__13">{{ order.user.phone }}</div>
        </v-sheet>

        <v-sheet class="pa-6 mt-4">
          <div class="font-weight-bold mb-5">CHANGE ORDER STATUS</div>

          <v-select rounded solo flat background-color="grey lighten-3" v-model="order.status" :items="status" item-text="name" item-value="value" hide-details class="font__12 font-weight-bold" placeholder="-- Select --" />

          <v-btn @click="change_status" :loading="loading" rounded depressed width="180" height="40" color="primary" class="mt-8 font__12 secondary--text font-weight-bold">Submit</v-btn>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="8">
        <v-sheet class="pa-6">
          <v-sheet color="grey lighten-4">
            <div class="d-flex flex-wrap justify-space-between align-center">
              <div class="date__container font-weight-bold font__13 mb-6 text-uppercase">{{ order.status }}</div>

              <div>
                <div class="font-weight-bold">#{{ order.ref }}</div>
                <div>{{ order.createdAt | formatDate }}</div>
              </div>
            </div>

            <div class="pa-4">
              <div class="font-weight-bold mb-3">ITEMS ORDERED</div>

              <v-row>
                <v-col v-for="(product, i) in order.products" :key="i" cols="12" sm="6">
                  <v-row>
                    <v-col cols="6">
                      <v-img :src="product.product.thumbnail" />
                    </v-col>

                    <v-col cols="6">
                      <div class="font-weight-bold">{{ product.product.name }}</div>

                      <div class="mt-3 red--text font-weight-bold">&#8358;{{ product.product.price | formatCurrency }}</div>

                      <div class="font-weight-medium mt-3">QTY: {{ product.quantity }}</div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row class="mt-5">
                <v-col cols="12" sm="6">
                  <div class="font-weight-bold mb-2">PAYMENT DETAILS</div>

                  <div class="grey--text text--darken-1">
                    <div>Subtotal: &#8358;{{ order.subTotal | formatCurrency }}</div>
                    <div>VAT: &#8358;{{ order.vat | formatCurrency }}</div>
                    <div>Shipping: &#8358;{{ order.delivery | formatCurrency }}</div>
                    <div class="font-weight-bold">Total: &#8358;{{ order.amount | formatCurrency }}</div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6">
                  <div class="font-weight-bold mb-2">SHIPPING DETAILS</div>

                  <div class="grey--text text--darken-1">{{ order.address }}, {{ order.city }}, {{ order.state }}</div>
                </v-col>
              </v-row>

              <div class="mt-5">
                <div class="font-weight-bold mb-2">EXTRA NOTE</div>

                <div class="grey--text text--darken-1">{{ order.additionalInfo }}</div>
              </div>
            </div>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.date__container {
  background-color: #F8C422;
  color: #1E2632;
  padding: 8px 12px;
  width: 190px;
  border-radius: 0 25px 25px 0;
}
</style>

<script>
import moment from 'moment'
import toast from '@/helpers/toast'
import Breadcrumb from '@/components/navigation/Breadcrumb'

export default {
  layout: 'admin',

  components: {
    Breadcrumb
  },

  data: () => ({
    order: null,
    loading: false,

    status: [{
        name: "Processing",
        value: "processing"
      },
      {
        name: "Packaged",
        value: "packaged"
      },
      {
        name: "Shipped",
        value: "shipped"
      },
      {
        name: "Delivered",
        value: "delivered"
      }
    ]
  }),

  methods: {
    change_status() {
      this.loading = true

      this.$axios.$patch(`/orders/${this.order._id}`, {
        status: this.order.status
      }).then(response => {
        this.loading = false
        toast.success("Order status changed successfully")
      }).catch(() => this.loading = false)
    }
  },

  created() {
    this.$axios.$get(`/orders/${this.$route.params.id}`).then(response => {
      this.order = response.data
    })
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
