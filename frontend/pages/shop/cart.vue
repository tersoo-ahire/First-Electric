<template>
<main>
  <ShopShortHero title="Cart" />

  <v-container v-if="!loading" class="boxed__container">
    <v-row v-if="modified_cart.length" class="py-10">
      <v-col cols="12" lg="7">
        <v-sheet class="pa-6 cart__container">
          <section v-for="product in modified_cart" :key="product._id" class="product__container d-flex justify-space-between align-end flex-wrap">
            <div class="d-flex flex-wrap">
              <div class="mr-10">
                <v-img :src="product.thumbnail" max-width="125" />
              </div>

              <div>
                <div style="max-width: 380px" class="font-weight-bold title">{{ product.name }}</div>

                <div class="d-flex align-center mt-8">
                  <div class="title red--text font-weight-medium mr-5">{{ currency == 'ngn' ? '₦' : '$' }}{{ product.price | currency }}</div>

                  <div style="max-width: 83px;" class="d-flex quantity__input">
                    <!-- <v-text-field v-model="product.quantity" readonly outlined color="grey" hide-details class="no__radius font-weight-bold" /> -->
                    <div class="quantity__box">{{ product.quantity }}</div>

                    <div class="d-flex flex-column">
                      <v-btn @click="inc(product)" outlined small color="grey" class="inc__btn">+</v-btn>
                      <v-btn @click="dec(product)" outlined small color="grey" class="inc__btn">-</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span class="title font-weight-medium mr-5">{{ currency == 'ngn' ? '₦' : '$' }}{{ product.price * product.quantity | currency }}</span>

              <v-icon @click="del(product)" color="red">mdi-delete</v-icon>
            </div>
          </section>
        </v-sheet>
      </v-col>

      <v-col cols="12" lg="5">
        <v-sheet class="pa-6">
          <div class="display-1 font-weight-bold">Cart totals</div>

          <div class="d-flex justify-space-between title mt-5">
            <div class="font-weight-medium">Subtotal</div>

            <div class="text-right">{{ currency == 'ngn' ? '₦' : '$' }}{{ subtotal | currency }}</div>
          </div>

          <div class="d-flex justify-space-between title mt-8">
            <div class="font-weight-medium">Total</div>

            <div class="text-right font-weight-black">{{ currency == 'ngn' ? '₦' : '$' }}{{ total_price | currency }}</div>
          </div>
        </v-sheet>

        <v-btn @click="go_to_checkout" depressed block color="primary" height="50" class="secondary--text font-weight-bold">PROCEED TO CHECKOUT</v-btn>
      </v-col>
    </v-row>

    <div v-else class="px-8 py-12 text-center">
      <v-img class="mx-auto" width="150" src="/icons/empty-cart.png" />

      <div class="headline grey--text font-weight-bold mt-5">Your cart is empty!</div>

      <div class="mt-3">Browse our categories and discover our best deals!</div>

      <v-btn @click="$router.push('/shop')" depressed color="primary" height="42" width="150" class="secondary--text font__11 font-weight-bold mt-8">START SHOPPING</v-btn>
    </div>
  </v-container>

  <v-overlay v-else>
    <v-progress-circular indeterminate></v-progress-circular>
  </v-overlay>
</main>
</template>

<style lang="scss" scoped>
.product__container {
  margin-bottom: 15px;
  padding-bottom: 15px;
}

.cart__container .product__container:not(:last-child) {
  border-bottom: 1px solid rgb(214, 214, 214);
}

.v-btn {
  border-radius: 0 !important;
}

.inc__btn {
  min-width: 10px !important;
  width: 15px !important;
  min-height: 20px !important;
  height: 23px !important;
  font-size: 1.2rem;
}

.quantity__box {
  height: 46px;
  width: 55px;
  border: 1px solid grey;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import ShopShortHero from '@/components/banner/Shop-Short-Hero'

import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'shop',

  components: {
    ShopShortHero
  },

  data: () => ({
    modified_cart: [],
    loading: false
  }),

  methods: {
    inc(product) {
      this.$store.commit('CART_INC', product)
      product.quantity++
    },

    dec(product) {
      if (product.quantity > 1) {
        this.$store.commit('CART_DEC', product)
        product.quantity--
      }
    },

    del(product) {
      const index = this.cart.findIndex(p => p.id === product._id)

      this.$store.commit('CART_DEL', index)

      const index2 = this.modified_cart.indexOf(product)
      this.modified_cart.splice(index2, 1)
    },

    go_to_checkout() {
      const data = {
        products: this.modified_cart,
        subtotal: this.subtotal,
        total_price: this.total_price
      }

      this.$store.commit('SET_ORDER', data)

      this.$router.push('/shop/checkout')
    }
  },

  computed: {
    ...mapGetters(['cart']),
    ...mapState(['currency']),

    subtotal() {
      let pc = 0

      if (this.modified_cart.length) {
        this.modified_cart.map(el => pc += el.price * el.quantity)
      }

      return pc
    },

    total_price() {
      return this.subtotal
    }
  },

  // mounted() {
  //   this.$store.commit('CLEAR_CART')
  // },

  async created() {
    if (this.$store.getters.cart.length) {
      let arr = []

      this.$store.getters.cart.map(el => {
        arr.push(el.id)
      })

      this.loading = true

      this.$axios.$post('/products/get-details', {
        products: arr
      }).then(response => {

        response.data.missing_products.map(mp => {
          const index = this.cart.findIndex(p => p.id == mp)
          this.$store.commit('CART_DEL', index)
        })

        this.$store.getters.cart.map(el => {
          let record = response.data.products.find(p => p._id == el.id)

          if (record) {
            let cart = {
              ...record,
              quantity: el.quantity
            }

            this.modified_cart.push(cart)
          }
        })

        this.loading = false
      }).catch(() => this.loading = false)
    }
  }
}
</script>
