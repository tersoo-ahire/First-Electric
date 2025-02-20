<template>
  <div>
    <v-navigation-drawer
      v-model="show"
      fixed
      temporary
      right
      width="485"
      class="cart-sidebar"
    >
      <div class="pa-6" style="height: 100%;">
        <!-- Header -->
        <div class="d-flex justify-space-between align-center mb-8">
          <div class="d-flex align-center">
            <v-icon color="#333333">mdi-shopping-outline</v-icon>
            <span class="ml-2 font-weight-medium">{{ cartCount }}</span>
          </div>
          <div class="font-weight-bold" style="color: #333333;">
            {{ currency === 'ngn' ? '₦' : '$' }}{{ formatPrice(cartTotal) }}
          </div>
        </div>

        <hr class="mb-8" style="border: 1px solid #f2f1f0" />

        <!-- Cart Items -->
        <div class="cart-items mb-8 h-full" style="min-height: 280px;">
          <template v-if="cartItems && cartItems.length">
            <div
              v-for="(item, index) in cartItems"
              :key="getItemKey(item, index)"
              class="mb-6"
            >
              <div class="d-flex">
                <div
                  class="d-flex justify-space-between align-center"
                  style="width: 100%;"
                >
                  <v-img
                    :src="item?.product?.thumbnail || ''"
                    width="60"
                    height="50"
                    class="rounded-lg"
                    style="
                        background-color: lightgray; 
                        max-width: 60px; 
                    "
                  ></v-img>
                  <div class="ml-4 flex-grow-1">
                    <p
                      class="mb-0"
                      style="color: #333333; font-weight: 600; font-size: 14px;"
                    >
                      {{ item?.product?.name || 'Product Name Unavailable' }}
                    </p>
                    <span
                      style="color: #C23737; font-size: 14px; font-weight: 600; margin-top: -4px;"
                    >
                      {{ currency === 'ngn' ? '₦' : '$'
                      }}{{ formatPrice(item?.product?.price) }}
                    </span>
                  </div>
                  <div class="d-flex justify-space-end align-center">
                    <div class="quantity-selector">
                      <button
                        class="stepper-btn"
                        @click="updateQuantity(item, item?.quantity - 1)"
                        :disabled="item?.quantity <= 1"
                      >
                        -
                      </button>
                      <div class="quantity-display">{{ item?.quantity }}</div>
                      <button
                        class="stepper-btn"
                        @click="updateQuantity(item, item?.quantity + 1)"
                      >
                        +
                      </button>
                    </div>
                    <v-btn
                      icon
                      small
                      @click="removeFromCart(item)"
                      class="ml-2"
                      title="Remove Product"
                    >
                      <v-icon size="20" color="#666">mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="text-center py-8 grey--text">
            Your cart is empty
          </div>
        </div>

        <hr class="mb-8" style="border: 1px solid #f2f1f0" />

        <!-- Actions -->
        <div
          v-if="cartItems?.length"
          class="cart-actions"
          style="height: fit-content"
        >
          <v-btn
            block
            x-large
            color="primary"
            depressed
            class="secondary--text font-weight-bold mb-4"
            height="48"
            :disabled="!cartItems.length"
            @click="handleCheckout"
          >
            Checkout
          </v-btn>
          <div
            class="text-center secondary--text"
            @click="show = false"
            style="
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border: 1px solid rgba(0, 0, 0, .05);
                padding: 10px 20px;
                font-weight: 700;
                font-size: 14px;
                line-height: 20px;
                min-height: 50px;
                border-radius: 5px;
                outline: none;
                background: #fafafa;
                color: #57584e;"
          >
            Keep Shopping
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Add the customer info modal -->
    <CustomerInfoSidebar
      v-model="showCustomerInfo"
      @back="handleCustomerInfoBack"
      @submit="handleCustomerInfoSubmit"
    />

    <OrderReviewSidebar
      v-model="showOrderReview"
      :customerInfo="customerInfo"
      @back="handleOrderReviewBack"
      @payment="handlePayment"
    />
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { mapState, mapGetters } from 'vuex'
import CustomerInfoSidebar from './Customer-Info-Sidebar.vue'
import OrderReviewSidebar from './Order-Review-Sidebar.vue'

export default {
  name: 'CartSidebar',

  components: {
    CustomerInfoSidebar,
    OrderReviewSidebar
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    show: false,
    showCustomerInfo: false,
    showOrderReview: false,
    customerInfo: null
  }),

  computed: {
    ...mapState(['currency', 'cart']),
    ...mapGetters(['cartTotal', 'cartCount']),

    cartItems() {
      return this.$store.state.cart || []
    }
  },

  watch: {
    value(newVal) {
      this.show = newVal
    },
    show(newVal) {
      this.$emit('input', newVal)
    }
  },

  methods: {
    handleCheckout() {
      this.show = false // Close cart sidebar
      this.showCustomerInfo = true // Open customer info modal
    },

    handleCustomerInfoBack() {
      this.showCustomerInfo = false
      this.show = true
    },

    handleCustomerInfoSubmit(customerInfo) {
      this.customerInfo = customerInfo
      this.showCustomerInfo = false
      this.showOrderReview = true
    },

    handleOrderReviewBack() {
      this.showOrderReview = false
      this.showCustomerInfo = true
    },

    async handlePayment(orderData) {
      try {
        // Process payment
        // Navigate to success page or show error
      } catch (error) {
        console.error('Payment error:', error)
      }
    },

    getItemKey(item, index) {
      return item?.product?.id || `cart-item-${index}`
    },

    formatPrice(price) {
      return price ? price.toFixed(2) : '0.00'
    },

    updateQuantity(item, quantity) {
      try {
        if (!item?.product || quantity < 1) return

        this.$store.commit('UPDATE_CART_QUANTITY', {
          product: item.product,
          quantity
        })
      } catch (error) {
        console.error('Error updating quantity:', error)
      }
    },

    removeFromCart(item) {
      try {
        if (!item?.product) return

        this.$store.commit('REMOVE_FROM_CART', item.product)
      } catch (error) {
        console.error('Error removing item from cart:', error)
      }
    }
  }
}
</script>
