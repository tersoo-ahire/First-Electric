<template>
<main>
  <ShopShortHero title="My Orders" />

  <v-container class="boxed__container">
    <v-row v-if="orders" class="my-6">
      <v-col cols="12" md="4">
        <v-sheet class="pa-6 text-center">
          <v-avatar size="130">
            <img src="/img/user.png" alt="">
          </v-avatar>

          <div class="secondary--text font-weight-bold title mt-3">{{ orders[0].user.firstname }} {{ orders[0].user.lastname }}</div>

          <div class="secondary--text font__13">{{ orders[0].user.email }}</div>

          <div class="grey--text font-weight-bold font__13">{{ orders[0].user.phone }}</div>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="8">
        <v-sheet v-for="order in orders" :key="order._id" class="pa-6 mb-5">
          <v-sheet color="grey lighten-4">
            <div class="d-flex flex-wrap justify-space-between align-center">
              <div class="date__container font-weight-bold font__13 mb-6 text-uppercase">{{ order.status }}</div>

              <div :class="{'ml-4': $vuetify.breakpoint.xsOnly}">
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

                      <div class="mt-3 red--text font-weight-bold">{{ currency == 'ngn' ? '₦' : '$' }}{{ product.product.price | currency }}</div>

                      <div class="font-weight-medium mt-3">QTY: {{ product.quantity }}</div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row class="mt-5">
                <v-col cols="12" sm="6">
                  <div class="font-weight-bold mb-2">PAYMENT DETAILS</div>

                  <div class="grey--text text--darken-1">
                    <div>Subtotal: {{ currency == 'ngn' ? '₦' : '$' }}{{ order.subTotal | currency }}</div>
                    <div>VAT: {{ currency == 'ngn' ? '₦' : '$' }}{{ order.vat | currency }}</div>
                    <div>Shipping: {{ currency == 'ngn' ? '₦' : '$' }}{{ order.delivery | currency }}</div>
                    <div class="font-weight-bold">Total: {{ currency == 'ngn' ? '₦' : '$' }}{{ order.amount | currency }}</div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6">
                  <div class="font-weight-bold mb-2">SHIPPING DETAILS</div>

                  <div class="grey--text text--darken-1">{{ order.address }}, {{ order.city }}, {{ order.user.state }}</div>
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

    <v-overlay v-else>
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
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
import { mapState } from 'vuex'
import ShopShortHero from '@/components/banner/Shop-Short-Hero'

export default {
  layout: 'shop',

  components: {
    ShopShortHero
  },

  data: () => ({
    orders: null
  }),

  computed: {
    ...mapState(['currency']),
  },

  created() {
    this.$axios.$get(`/orders/user-orders/${this.$route.params.id}`).then(response => {
      this.orders = response.data
    })
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('lll') : ''
    }
  }
}
</script>
