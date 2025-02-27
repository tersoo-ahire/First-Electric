<template>
  <section>
    <v-sheet class="pt-8 text-center rounded-lg">
      <div
        class="px-5 py-3"
        style="background-color: lightgray;"
        :title="`View ${product?.name}`"
      >
        <v-img
          :src="product.thumbnail"
          max-width="300"
          height="auto"
          class="mx-auto rounded-lg cursor__pointer"
          @click="openProductModal"
        ></v-img>
      </div>

      <div class="d-flex flex-column justify-space-between">
        <div class="px-4 pb-4">
          <div
            :title="`View ${product?.name}`"
            class="text-left font-weight-bold mt-4 text-truncate cursor__pointer"
            style="color: #333333; font-size:16px"
            @click="openProductModal"
          >
            {{ product?.name }}
          </div>
          <div
            class="text-left"
            style="color: #C23737; font-size: 14px; font-weight: 600;"
          >
            {{ currency === 'ngn' ? '₦' : '$' }}{{ product?.price | currency }}
          </div>
        </div>
      </div>
    </v-sheet>

    <!-- Product Detail Modal -->
    <v-dialog v-model="productModal" max-width="1000">
      <v-card
        class="pt-7 pb-3 px-3 pt-lg-12 pb-lg-7 px-lg-5"
        style="min-height: 445px;"
      >
        <v-card-text>
          <v-row style="min-height: 366px;">
            <v-col
              cols="12"
              sm="7"
              class="d-flex align-center pa-0 pb-4 pb-sm-0 pr-sm-8"
            >
              <v-img
                :src="product?.thumbnail"
                max-width="100%"
                height="100%"
                cover
                class="rounded-md"
                style="max-height: 366px;"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="5" class="d-flex flex-column pa-0">
              <div class="mb-4">
                <v-card-title
                  class="font-weight-bold text-h6 text-sm-h5 pa-0 mb-2 text-secondary"
                  style="color: #333333;"
                  >{{ product?.name }}</v-card-title
                >
                <div
                  class="font-weight-bold mb-1"
                  style="color: #919191; font-size: 14px;"
                >
                  By First Electric
                </div>
              </div>
              <div
                class="mb-6"
                style="font-size: 15px; font-weight: 300; color: #333333;"
              >
                {{ product?.overview }}
              </div>
              <div class="mb-6">
                <div
                  class="font-weight-bold mb-2"
                  style="color: #919191; font-size: 14px;"
                >
                  How Many
                </div>
                <div class="quantity-selector">
                  <button
                    class="stepper-btn"
                    @click="decrease"
                    :disabled="quantity <= 1"
                  >
                    -
                  </button>
                  <div class="quantity-display">{{ quantity }}</div>
                  <button class="stepper-btn" @click="increase">
                    +
                  </button>
                </div>
              </div>
              <div class="mb-6">
                <div
                  class="font-weight-bold mb-1"
                  style="color: #919191; font-size: 14px;"
                >
                  Price
                </div>
                <div style="color: #57584E; font-size: 16px; font-weight: 600;">
                  {{ currency === 'ngn' ? '₦' : '$'
                  }}{{ formatPrice(product?.price) | currency }}
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0;">
                <!-- Add this condition to show "Item already added" message -->
                <p
                  v-if="isProductInCart(product?._id)"
                  class=""
                  style="color: #C23737; font-weight: 600; font-size: 12px;"
                >
                  Item already added to cart
                </p>
                <v-card-actions class="d-flex pa-0">
                  <div style="width: 100%">
                    <v-btn
                      color="primary"
                      height="100%"
                      @click="addToCart(product)"
                      depressed
                      class="secondary--text font-weight-bold px-4 py-4"
                      style="font-size: 14px;"
                    >
                      {{
                        isProductInCart(product?._id)
                          ? 'Update Cart'
                          : 'Add to Cart'
                      }}
                    </v-btn>
                    <v-btn
                      v-if="!isCartEmpty"
                      @click="
                        productModal = false
                        showCart = true
                      "
                      height="100%"
                      depressed
                      class="secondary--text font-weight-bold px-4 py-4 ml-4"
                      style="
                      border: 1px solid rgba(0, 0, 0, .05);
                      background: #fafafa;
                      color: #57584e;
                      font-size: 14px;"
                    >
                      View Cart
                    </v-btn>
                  </div>
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Cart Dialog -->
    <CartSidebar v-model="showCart" />
  </section>
</template>

<style lang="scss" scoped>
.actions__container {
  border-top: 1px solid #d6d6d6;
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
</style>

<script>
import { mapState } from 'vuex'
import CartSidebar from './Cart-Sidebar.vue'

export default {
  components: {
    CartSidebar
  },

  props: ['product'],

  data: () => ({
    quantity: 1,
    productModal: false,
    showCart: false
  }),

  computed: {
    ...mapState(['currency', 'cart']),

    isCartEmpty() {
      return this.$store.state.cart.length === 0
    }
  },

  methods: {
    formatPrice(price) {
      if (!price) return '0.00'
      return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    increase() {
      this.quantity++
    },

    decrease() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    addToCart() {
      this.$store.commit('ADD_TO_CART', {
        product: this.product,
        quantity: this.quantity
      })
      this.productModal = false // Close product modal
      this.showCart = true // Open cart sidebar
    },

    openProductModal() {
      this.productModal = true
    },

    isProductInCart() {
      return this.$store.getters.isProductInCart(this.product._id)
    }
  }
}
</script>
