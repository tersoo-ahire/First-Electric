<template>
  <section>
    <v-sheet class="pt-8 text-center">
      <div class="px-4">
        <nuxt-link :to="`/shop/${product.slug}`">
          <v-img
            :src="product.thumbnail"
            max-width="150"
            height="auto"
            class="mx-auto cursor__pointer"
          ></v-img>
        </nuxt-link>
      </div>

      <div class="d-flex flex-column justify-space-between">
        <div class="px-4">
          <div
            :title="product.name"
            class="title font-weight-bold mt-4 text-truncate"
          >
            {{ product.name }}
          </div>

          <div class="mt-4 font__12 overview">{{ product.overview }}</div>

          <div class="red--text font-weight-bold title my-5">
            {{ currency == 'ngn' ? '₦' : '$' }}{{ product.price | currency }}
          </div>
        </div>

        <div class="d-flex actions__container">
          <div @click="addToCart(product)" class="action__btn">ADD TO CART</div>

          <v-divider vertical style="background-color: #e0e0e0" />

          <nuxt-link :to="`/shop/${product.slug}`" class="action__btn"
            >VIEW</nuxt-link
          >
        </div>
      </div>
    </v-sheet>

    <!-- DIALOGS  -->
    <v-dialog v-if="cart_dialog" v-model="cart_dialog" max-width="500">
      <v-sheet class="pa-8">
        <div class="headline font-weight-bold">Added to Cart</div>

        <div class="mt-4">{{ product.name }} added to Cart</div>

        <div class="mt-6 text-center">
          <v-btn
            @click="cart_dialog = false"
            :block="$vuetify.breakpoint.xsOnly"
            outlined
            color="secondary"
            height="42"
            class="primary--text dialog__btn font__11 font-weight-bold"
            >CONTINUE SHOPPING</v-btn
          >
          <v-btn
            to="/shop/cart"
            nuxt
            :block="$vuetify.breakpoint.xsOnly"
            depressed
            color="primary"
            height="42"
            class="secondary--text dialog__btn font__11 font-weight-bold"
            >VIEW CART AND CHECKOUT</v-btn
          >
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
    background-color: #f8c422;
    color: #1e2632;
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
</style>

<script>
import { mapState } from 'vuex'

export default {
  props: ['product'],

  data: () => ({
    cart_dialog: false
  }),

  computed: {
    ...mapState(['currency'])
  },

  methods: {
    addToCart(product) {
      this.$store.commit('ADD_TO_CART', {
        product: product,
        quantity: 1
      })

      this.cart_dialog = true
    }
  }
}
</script>
