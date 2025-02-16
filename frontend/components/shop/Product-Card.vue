<template>
  <section>
    <v-sheet class="pt-8 text-center">
      <div class="px-4">
        <v-img :src="product.thumbnail" max-width="150" height="auto" class="mx-auto cursor__pointer"
          @click="openProductModal"></v-img>
      </div>

      <div class="d-flex flex-column justify-space-between">
        <div class="px-4">
          <div :title="product.name" class="title font-weight-bold mt-4 text-truncate">
            {{ product.name }}
          </div>

          <div class="mt-4 font__12 overview">{{ product.overview }}</div>

          <div class="red--text font-weight-bold title my-5">
            {{ currency === 'ngn' ? '₦' : '$' }}{{ product.price | currency }}
          </div>
        </div>

        <div class="d-flex actions__container">
          <div @click="addToCart(product)" class="action__btn">ADD TO CART</div>

          <v-divider vertical style="background-color: #e0e0e0" />

          <div class="action__btn" @click="openProductModal">VIEW</div>
        </div>
      </div>
    </v-sheet>

    <!-- Product Detail Modal -->
    <v-dialog v-model="productModal" max-width="800">
      <v-card class="pt-7 pb-3 px-3 pt-lg-10 pb-lg-5 px-lg-5">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="7" class="d-flex align-center pa-0 pb-3 pb-sm-0 pr-sm-5">
              <v-img :src="product.thumbnail" max-width="100%" height="auto" contain class="rounded-md"></v-img>
            </v-col>
            <v-col cols="12" sm="5" class="d-flex flex-column pa-0">
              <v-card-title class="font-weight-bold text-h6 text-sm-h5 pa-0 mb-2 text-secondary" style="color: #333333;">{{
                product.name }}</v-card-title>
              <div class="font__12 grey--text text--darken-2 mb-4">{{ product.overview }}</div>
              <div class="mb-4">
                <div class="font-weight-bold mb-1" style="color: #919191; font-size: 14px;">
                  Price
                </div>
                <div style="color: #57584E; font-size: 16px; font-weight: 600;">
                  {{ currency === 'ngn' ? '₦' : '$' }}{{ product.price | currency }}
                </div>
              </div>
              <v-card-actions class="d-flex pa-0">
                <div style="max-width: 90px" class="d-flex">
                  <div class="quantity__box">{{ quantity }}</div>

                  <div class="d-flex flex-column">
                    <v-btn @click="inc" outlined small color="grey" class="inc__btn">+</v-btn>
                    <v-btn @click="dec" outlined small color="grey" class="inc__btn">-</v-btn>
                  </div>
                </div>
                <div style="width: 100%" class="ml-4">
                  <v-btn color="primary" height="100%" @click="addToCart(product)" depressed
                    class="secondary--text font-weight-bold px-4 py-4" style="font-size: 14px;">Add to Cart</v-btn>
                </div>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Cart Dialog -->
    <v-dialog v-if="cart_dialog" v-model="cart_dialog" max-width="500">
      <v-sheet class="pa-8">
        <div class="headline font-weight-bold">Added to Cart</div>
        <div class="mt-4">{{ product.name }} added to Cart</div>
        <div class="mt-6 text-center">
          <v-btn @click="cart_dialog = false" :block="$vuetify.breakpoint.xsOnly" outlined color="secondary" height="42"
            class="primary--text dialog__btn font__11 font-weight-bold">CONTINUE SHOPPING</v-btn>
          <v-btn to="/shop/cart" nuxt :block="$vuetify.breakpoint.xsOnly" depressed color="primary" height="42"
            class="secondary--text dialog__btn font__11 font-weight-bold">VIEW CART AND CHECKOUT</v-btn>
        </div>
      </v-sheet>
    </v-dialog>
  </section>
</template>

<style lang="scss" scoped>
.actions__container {
  border-top: 1px solid #d6d6d6;
}

.action__btn {
  height: 47px;
  text-align: center;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #F8C422;
    color: #1E2632;
  }
}

.dialog__btn {
  border-radius: unset !important;
}

.overview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 32px;
}

.cursor__pointer {
  cursor: pointer;
}

.v-btn {
  border-radius: 0 !important;
}

.inc__btn {
  min-width: 20px !important;
  width: 25px !important;
  font-size: 1.2rem;
  min-height: 20px !important;
  height: 25px !important;
}

.quantity__box {
  height: 50px;
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
import { mapState } from 'vuex'

export default {
  props: ['product'],

  data: () => ({
    quantity: 1,
    productModal: false,
    cart_dialog: false,
  }),

  computed: {
    ...mapState(['currency'])
  },

  methods: {
    inc() {
      this.quantity++
    },

    dec() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    addToCart() {
      this.$store.commit('ADD_TO_CART', {
        product: this.product,
        quantity: this.quantity
      })
      this.cart_dialog = true;
    },
    openProductModal() {
      this.productModal = true;
    }
  }
}
</script>