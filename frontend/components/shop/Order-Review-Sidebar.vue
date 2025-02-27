<template>
  <v-navigation-drawer
    v-model="show"
    fixed
    temporary
    right
    width="485"
    class="cart-sidebar"
  >
    <div class="pa-6">
      <div class="d-flex justify-space-between align-center mb-8">
        <h2 class="text-h6 font-weight-bold" style="color: #333333;">
          Order details
        </h2>
        <div class="d-flex align-center">
          <v-icon color="#333333" size="20">mdi-shopping-outline</v-icon>
          <span class="ml-2 font-weight-medium">{{ cartCount }}</span>
        </div>
      </div>

      <!-- Customer Details -->
      <div class="mb-8">
        <div class="d-flex align-center mb-4">
          <div
            class="rounded-circle primary mr-3"
            style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;"
          >
            <span class="white--text text-uppercase">{{
              customerInitials
            }}</span>
          </div>
          <div class="font-weight-bold" style="color: #333333;">
            {{ customerInfo?.firstName }} {{ customerInfo?.lastName }}
          </div>
        </div>
        <div class="d-flex align-center mb-3" style="color: #57584E;">
          <v-icon size="20" class="mr-3">mdi-email-outline</v-icon>
          {{ customerInfo?.email || '' }}
        </div>
        <div class="d-flex align-center" style="color: #57584E;">
          <v-icon size="20" class="mr-3">mdi-phone-outline</v-icon>
          {{ customerInfo?.phone }}
        </div>
      </div>

      <hr class="mb-8" style="border: 1px solid #f2f1f0" />

      <!-- Order Summary -->
      <div class="mb-8">
        <div
          v-for="(item, index) in cartItems"
          :key="getItemKey(item, index)"
          class="d-flex justify-space-between mb-4"
        >
          <div style="color: #57584E;">
            {{ item?.product?.name }} x {{ item?.quantity }}
          </div>
          <div style="color: #333333; font-weight: 600;">
            {{ currency === 'ngn' ? '₦' : '$'
            }}{{ formatPrice(item?.product?.price * item?.quantity) }}
          </div>
        </div>

        <hr class="mb-4" style="border: 1px solid #f2f1f0" />

        <!-- Price Breakdown -->
        <div class="d-flex justify-space-between mb-3">
          <div class="font-weight-medium" style="color: #57584E;">Subtotal</div>
          <div style="color: #333333; font-weight: 600;">
            {{ currency === 'ngn' ? '₦' : '$' }}{{ formatPrice(subtotal) }}
          </div>
        </div>

        <div class="d-flex justify-space-between mb-3">
          <div class="font-weight-medium" style="color: #57584E;">
            VAT (7.5%)
          </div>
          <div style="color: #333333; font-weight: 600;">
            {{ currency === 'ngn' ? '₦' : '$' }}{{ formatPrice(vat) }}
          </div>
        </div>

        <div class="d-flex justify-space-between mb-3">
          <div class="font-weight-medium" style="color: #57584E;">Delivery</div>
          <div style="color: #333333; font-weight: 600;">
            {{ currency === 'ngn' ? '₦' : '$' }}{{ formatPrice(shippingFee) }}
          </div>
        </div>

        <div class="d-flex justify-space-between">
          <div class="font-weight-bold" style="color: #333333;">Total</div>
          <div style="color: #C23737; font-weight: 600; font-size: 18px;">
            {{ currency === 'ngn' ? '₦' : '$' }}{{ formatPrice(totalAmount) }}
          </div>
        </div>
      </div>

      <!-- Discount Code -->
      <v-expansion-panels flat class="mb-8">
        <v-expansion-panel style="background: transparent;">
          <v-expansion-panel-header style="color: #57584E; padding: 0;">
            Have a discount code?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex gap-4">
              <v-text-field
                v-model="discountCode"
                placeholder="Enter code"
                outlined
                dense
                hide-details
                class="flex-1"
              ></v-text-field>
              <v-btn color="primary" outlined dense>Apply</v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Payment -->
      <paystack
        :amount="amount"
        :email="customerInfo?.email || ''"
        :firstname="customerInfo?.firstName"
        :lastname="customerInfo?.lastName"
        :channels="[
          'card',
          'bank',
          'ussd',
          'qr',
          'mobile_money',
          'bank_transfer'
        ]"
        :paystackkey="paystackKey"
        :reference="reference"
        :callback="handlePaystackSuccess"
        :close="handlePaystackClose"
        :embed="false"
        style="width:100%"
      >
        <v-btn
          block
          x-large
          color="primary"
          depressed
          class="mb-4 secondary--text font-weight-bold"
          height="48"
          :loading="loading"
          style="width:100%"
        >
          Pay {{ currency === 'ngn' ? '₦' : '$' }}{{ formatPrice(totalAmount) }}
        </v-btn>
      </paystack>

      <div
        @click="goBack"
        class="text-center secondary--text font-weight-bold"
        style="
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, .05);
            padding: 10px 20px;
            font-size: 14px;
            line-height: 20px;
            min-height: 50px;
            border-radius: 5px;
            outline: none;
            background: #fafafa;
            color: #57584e;
          "
      >
        Back
      </div>
    </div>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" persistent max-width="500">
      <v-sheet class="pa-8">
        <div class="headline font-weight-bold">Order placed successfully</div>
        <div class="mt-4">
          Your order has been placed successfully. We will process your order
          shortly
        </div>
        <div class="mt-6 text-center">
          <v-btn
            to="/shop"
            nuxt
            outlined
            color="secondary"
            height="42"
            class="primary--text dialog__btn font__11 font-weight-bold mr-2"
          >
            CONTINUE SHOPPING
          </v-btn>
          <v-btn
            :to="`/shop/orders/${customerId}`"
            nuxt
            depressed
            color="primary"
            height="42"
            class="secondary--text dialog__btn font__11 font-weight-bold"
          >
            VIEW ORDER
          </v-btn>
        </div>
      </v-sheet>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import paystack from 'vue-paystack'

export default {
  name: 'OrderReviewSidebar',

  components: {
    paystack
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    customerInfo: {
      required: true
    }
  },

  data: () => ({
    show: false,
    loading: false,
    discountCode: '',
    showSuccessDialog: false,
    customerId: '',
    paystackKey: 'pk_live_58a16b62f48e36a8869e138be953fc52c7edb15e'
  }),

  computed: {
    ...mapState(['currency']),

    cartItems() {
      return this.$store.state.cart || []
    },

    customerInitials() {
      return (
        (this.customerInfo?.firstName?.[0] || '') +
        (this.customerInfo?.lastName?.[0] || '')
      )
    },

    reference() {
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let text = ''
      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    },

    cartCount() {
      return this.cartItems.reduce(
        (total, item) => total + (item?.quantity || 0),
        0
      )
    },

    subtotal() {
      return this.cartItems.reduce((total, item) => {
        const price = item?.product?.price || 0
        const quantity = item?.quantity || 0
        return total + price * quantity
      }, 0)
    },

    vat() {
      return Math.ceil(this.subtotal * 0.075)
    },

    totalWeight() {
      return this.cartItems.reduce((total, item) => {
        const weight = item?.product?.weight || 0
        const quantity = item?.quantity || 0
        return total + weight * quantity
      }, 0)
    },

    shippingFee() {
      const state = this.customerInfo?.state
      const weight = this.totalWeight

      if (!state || weight <= 0) return 0

      if (state === 'Lagos') {
        return Math.ceil((weight - 10) * 2 * 144 + 4530)
      } else if (
        [
          'Ogun',
          'Ekiti',
          'Ondo',
          'Delta',
          'Edo',
          'Osun',
          'Kwara',
          'Oyo'
        ].includes(state)
      ) {
        return Math.ceil((weight - 10) * 2 * 156 + 5070)
      } else if (
        ['Abia', 'Enugu', 'FCT - Abuja', 'Kogi', 'Anambra', 'Imo'].includes(
          state
        )
      ) {
        return Math.ceil((weight - 10) * 2 * 168 + 5310)
      } else if (
        [
          'Bauchi',
          'Rivers',
          'Cross River',
          'Akwa Ibom',
          'Plateau',
          'Kaduna',
          'Kano',
          'Katsina',
          'Nasarawa',
          'Benue',
          'Borno',
          'Niger',
          'Sokoto',
          'Bayelsa',
          'Adamawa',
          'Yobe',
          'Kebbi',
          'Taraba',
          'Zamfara',
          'Jigawa',
          'Gombe',
          'Ebonyi'
        ].includes(state)
      ) {
        return Math.ceil((weight - 10) * 2 * 180 + 5670)
      }
      return 0
    },

    totalAmount() {
      return this.subtotal + this.vat + this.shippingFee
    },

    amount() {
      return this.totalAmount * 100
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
    formatPrice(price) {
      if (!price) return '0.00'
      return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    getItemKey(item, index) {
      return item?.product?.id || `cart-item-${index}`
    },

    goBack() {
      this.$emit('back')
    },

    async handlePaystackSuccess(response) {
      this.loading = true
      try {
        const orderData = {
          reference: response.trxref,
          firstname: this.customerInfo?.firstName,
          lastname: this.customerInfo?.lastName,
          email: this.customerInfo?.email || '',
          phone: this.customerInfo?.phone,
          state: this.customerInfo?.state,
          city: this.customerInfo?.city,
          address: this.customerInfo?.address,
          additionalInfo: this.customerInfo?.additionalInfo,
          total: this.totalAmount,
          vat: this.vat,
          subTotal: this.subtotal,
          delivery: this.shippingFee,
          products: this.cartItems
            .map(item => ({
              product: item?.product?._id,
              quantity: item?.quantity || 0
            }))
            .filter(item => item.product && item.quantity > 0)
        }

        const response = await this.$axios.$post('/orders', orderData)
        this.customerId = response.data.customer
        this.$store.commit('CLEAR_CART')
        this.showSuccessDialog = true
        this.show = false // Close the sidebar after successful order
      } catch (error) {
        console.error('Payment error:', error)
      } finally {
        this.loading = false
      }
    },

    handlePaystackClose() {
      this.$router.go()
    }
  }
}
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
.flex-1 {
  flex: 1;
}
.dialog__btn {
  border-radius: 0 !important;
}
</style>
