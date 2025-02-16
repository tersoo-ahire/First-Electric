<template>
<main>
  <ShopShortHero title="Checkout" />

  <v-container class="boxed__container">
    <v-form ref="checkoutForm" v-model="formValid" @submit.prevent="">
      <v-row class="py-10">
        <v-col cols="12" lg="7">
          <v-sheet id="main-contact" class="pa-6">
            <div class="d-flex flex-wrap align-end justify-space-between mb-4">
              <div class="display-1 font-weight-bold">Billing Details</div>

              <!-- <div>
                <span class="font__13 font-weight-medium">Returning customer?</span>
                <v-btn small text :ripple="false" class="font__13 font-weight-medium pa-0">Click here to login</v-btn>
              </div> -->
            </div>

            <v-row>
              <v-col cols="12" sm="6">
                <div class="font__13 font-weight-bold mb-1">First Name*</div>
                <v-text-field color="secondary" :rules="generalRules" v-model="first_name" height="38" solo flat hide-details="auto" background-color="grey lighten-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <div class="font__13 font-weight-bold mb-1">Last Name*</div>
                <v-text-field color="secondary" :rules="generalRules" v-model="last_name" solo flat hide-details="auto" background-color="grey lighten-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <div class="font__13 font-weight-bold mb-1">Email*</div>
                <v-text-field color="secondary" :rules="emailRules" v-model="email" solo flat hide-details="auto" background-color="grey lighten-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <div class="font__13 font-weight-bold mb-1">Phone Number*</div>
                <v-text-field color="secondary" :rules="generalRules" v-model="phone" solo flat hide-details="auto" background-color="grey lighten-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <div>
                  <div class="font__13 font-weight-bold mb-1">State*</div>
                  <v-select color="secondary" :rules="generalRules" :items="states" v-model="state" solo flat hide-details="auto" item-color="secondary" background-color="grey lighten-3" class="font__12 font-weight-bold" />
                </div>

                <div class="mt-5">
                  <div class="font__13 font-weight-bold mb-1">Town/City*</div>
                  <v-text-field color="secondary" :rules="generalRules" v-model="city" solo flat hide-details="auto" background-color="grey lighten-3" />
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="font__13 font-weight-bold mb-1">Address*</div>
                <v-textarea color="secondary" :rules="generalRules" v-model="address" solo flat hide-details="auto" background-color="grey lighten-3" />
              </v-col>

              <v-col cols="12">
                <div class="font__13 font-weight-bold mb-1">Additional Information (Optional)</div>
                <v-textarea color="secondary" v-model="additional_info" solo flat hide-details="auto" background-color="grey lighten-3" />
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>

        <v-col cols="12" lg="5">
          <v-sheet class="pa-6">
            <div class="display-1 font-weight-bold">Your Order</div>

            <div class="font-weight-bold title mt-5">Products</div>

            <div v-for="(product, i) in order.products" :key="i" class="d-flex justify-space-between flex-wrap mt-3">
              <div>
                <span>{{ product.name }}</span>
                <span class="ml-3 font-weight-bold">x {{product.quantity }}</span>
              </div>

              <div :class="['text-right', $vuetify.breakpoint.smAndUp ? 'title' : '']">{{ currency == 'ngn' ? '₦' : '$' }}{{ product.price * product.quantity | currency }}</div>
            </div>

            <v-divider style="margin-top: 150px" class="mb-4" />

            <div class="d-flex justify-space-between title">
              <div class="font-weight-bold">Subtotal</div>

              <div class="text-right">{{ currency == 'ngn' ? '₦' : '$' }}{{ order.subtotal | currency }}</div>
            </div>

            <div class="d-flex justify-space-between title mt-2">
              <div class="font-weight-bold">VAT</div>

              <div class="text-right">{{ currency == 'ngn' ? '₦' : '$' }}{{ vat | currency }}</div>
            </div>

            <div class="d-flex justify-space-between title mt-2">
              <div class="font-weight-bold">Delivery</div>

              <div class="text-right">{{ currency == 'ngn' ? '₦' : '$' }}{{ shipping_fee | currency }}</div>
            </div>

            <div class="d-flex justify-space-between title mt-2">
              <div class="font-weight-bold">Total</div>

              <div class="text-right red--text">{{ currency == 'ngn' ? '₦' : '$' }}{{ total_amount | currency }}</div>
            </div>
          </v-sheet>

          <paystack :disabled="!formValid" style="width: 100%" :amount="amount" :email="email" :firstname="first_name" :lastname="last_name" :channels="['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']" :paystackkey="paystackKey" :reference="reference" :callback="callback" :close="close" :embed="false">
            <v-btn :disabled="!formValid" :loading="loading" depressed block color="primary" height="50" class="secondary--text font-weight-bold">PLACE ORDER</v-btn>
          </paystack>
        </v-col>
      </v-row>
    </v-form>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>

     <!-- DIALOGS  -->
  <v-dialog v-if="notification" persistent v-model="notification" max-width="500">
    <v-sheet class="pa-8">
      <div class="headline font-weight-bold">Order placed successfully</div>

      <div class="mt-4">Your order has been placed successfully. We will process your order shortly</div>

      <div class="mt-6 text-center">
        <v-btn nuxt to="/shop" :block="$vuetify.breakpoint.xsOnly" outlined color="secondary" height="42" class="primary--text dialog__btn font__11 font-weight-bold">CONTINUE SHOPPING</v-btn>
        <v-btn :to="`/shop/orders/${customer_id}`" nuxt :block="$vuetify.breakpoint.xsOnly" depressed color="primary" height="42" class="secondary--text dialog__btn font__11 font-weight-bold">VIEW ORDER</v-btn>
      </div>
    </v-sheet>
  </v-dialog>
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.product__container {
  margin-bottom: 15px;
  padding-bottom: 15px;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(214, 214, 214);
  }
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
</style>

<script>
import ShopShortHero from '@/components/banner/Shop-Short-Hero'
import paystack from 'vue-paystack'

import {
  mapGetters
} from 'vuex'

import { mapState } from 'vuex'

export default {
  layout: 'shop',

  components: {
    paystack,
    ShopShortHero
  },

  data: () => ({
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) || 'E-mail must be valid'
    ],
    generalRules: [
      v => !!v || 'This field is required'
    ],

    paystackKey: 'pk_live_58a16b62f48e36a8869e138be953fc52c7edb15e',
    // paystackKey: 'pk_test_35417f2d98c29a80396076565776f61a7e9ead08',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    address: '',
    additional_info: '',
    formValid: false,
    loading: false,
    customer_id: '',
    notification: false,

    states: ['Lagos', 'Abia', 'Adamawa', 'Anambra', 'Akwa Ibom', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Enugu', 'Edo', 'Ekiti', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara']
  }),

  methods: {
    callback: function (response) {
      this.loading = true

      const data = {
        reference: response.trxref,
        firstname: this.first_name,
        lastname: this.last_name,
        email: this.email,
        phone: this.phone,
        state: this.state,
        city: this.city,
        address: this.address,
        additionalInfo: this.additional_info,
        total: this.total_amount,
        vat: this.vat,
        subTotal: this.order.subtotal,
        delivery: this.shipping_fee,
        products: this.products
      }

      this.$axios.$post('/orders', data).then(response => {
        this.customer_id = response.data.customer
        this.loading = false

        this.$store.commit('CLEAR_CART')

        this.notification = true
      }).catch(() => this.loading = false)
    },

    close: function () {
      this.$router.go()
    },
  },

  computed: {
    ...mapGetters(['order']),
    ...mapState(['currency']),

    reference() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },

    vat() {
      return Math.ceil(this.order.subtotal * 0.075)
    },

    total_weight() {
      let weight = 0

      this.order.products.map(el => {
        weight += el.weight * el.quantity
      })

      return weight
    },

    shipping_fee() {
      if (this.state == 'Lagos') {
        const fee = (this.total_weight - 10) * 2 * 144 + 4530
        return Math.ceil(fee)
      }

      else if (this.state == 'Ogun' || this.state == 'Ekiti' || this.state == 'Ondo' || this.state == 'Delta' || this.state == 'Edo' || this.state == 'Osun' || this.state == 'Kwara' || this.state == 'Oyo') {
        const fee = (this.total_weight - 10) * 2 * 156 + 5070
        return Math.ceil(fee)
      }

      else if (this.state == 'Abia' || this.state == 'Enugu' || this.state == 'FCT - Abuja' || this.state == 'Kogi' || this.state == 'Anambra' || this.state == 'Imo') {
        const fee = (this.total_weight - 10) * 2 * 168 + 5310
        return Math.ceil(fee)
      }

      else if (this.state == 'Bauchi' || this.state == 'Rivers' || this.state == 'Cross River' || this.state == 'Akwa Ibom' || this.state == 'Plateau' || this.state == 'Kaduna' || this.state == 'Kano' || this.state == 'Katsina' || this.state == 'Nasarawa' || this.state == 'Benue' || this.state == 'Borno' || this.state == 'Niger' || this.state == 'Sokoto' || this.state == 'Bayelsa' || this.state == 'Adamawa' || this.state == 'Yobe' || this.state == 'Kebbi' || this.state == 'Taraba' || this.state == 'Zamfara' || this.state == 'Jigawa' || this.state == 'Gombe' || this.state == 'Ebonyi') {
        const fee = (this.total_weight - 10) * 2 * 180 + 5670
        return Math.ceil(fee)
      }

      else {
        return 0
      }
    },

    total_amount() {
      return this.order.subtotal + this.vat + this.shipping_fee
    },

    products() {
      const data = []

      this.order.products.map(el => {
        const product = {
          product: el._id,
          quantity: el.quantity
        }
        data.push(product)
      })

      return data
    },

    amount() {
      return this.total_amount * 100
    },
  }
}
</script>
