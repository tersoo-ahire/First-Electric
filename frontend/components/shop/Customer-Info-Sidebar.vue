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
      <div class="mb-8">
        <h2 class="text-h6 font-weight-bold" style="color: #333333;">
          Customer Information
        </h2>
      </div>

      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label class="mb-2 d-block" style="color: #57584E; font-weight: 500;"
            >Your name</label
          >
          <div class="d-flex gap-4">
            <v-text-field
              v-model="firstName"
              placeholder="First name"
              :rules="[v => !!v || 'First name is required']"
              outlined
              dense
              class="flex-1"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              placeholder="Last name"
              :rules="[v => !!v || 'Last name is required']"
              outlined
              dense
              class="flex-1"
              hide-details="auto"
            ></v-text-field>
          </div>
        </div>

        <div class="mb-6">
          <label class="mb-2 d-block" style="color: #57584E; font-weight: 500;"
            >Your email address</label
          >
          <v-text-field
            v-model="email"
            placeholder="you@mail.com"
            :rules="emailRules"
            outlined
            dense
            hide-details="auto"
          ></v-text-field>
        </div>

        <div class="mb-8">
          <label class="mb-2 d-block" style="color: #57584E; font-weight: 500;"
            >Your phone number</label
          >
          <div class="d-flex gap-4">
            <v-select
              v-model="phoneCode"
              :items="phoneCodes"
              outlined
              dense
              hide-details="auto"
              style="max-width: 120px"
            ></v-select>
            <v-text-field
              v-model="phoneNumber"
              placeholder="Phone number"
              :rules="[v => !!v || 'Phone number is required']"
              outlined
              dense
              class="flex-1"
              hide-details="auto"
            ></v-text-field>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="d-flex justify-space-between align-center mb-8">
          <div class="d-flex align-center">
            <v-icon color="#333333">mdi-shopping-outline</v-icon>
            <span class="ml-2 font-weight-medium">
              {{ formatPrice(cartCount) || 0 }}
            </span>
          </div>
          <div class="font-weight-bold" style="color: #333333;">
            {{ currency === 'ngn' ? '₦' : '$'
            }}{{ formatPrice(cartTotal) || 0 }}
          </div>
        </div>

        <v-btn
          block
          x-large
          color="primary"
          depressed
          class="mb-4 secondary--text font-weight-bold"
          height="48"
          type="submit"
          :loading="loading"
        >
          Review and pay
        </v-btn>

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
            color: #57584e;"
        >
          Back
        </div>
      </v-form>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important; /* Set background to white */
  box-shadow: 0 0 0 1000px white inset !important;
  -webkit-text-fill-color: #000 !important; /* Ensures text color stays black */
  border-radius: 4px; /* Ensure same border radius as input if used */
}

/* Resetting margins and paddings for full fill */
input {
  border: 1px solid #ccc;
  padding: 8px; /* Ensure padding consistency */
  border-radius: 4px; /* Match autofill styling */
  width: 100%; /* Optional, ensures responsiveness */
}
</style>

<script>
import { mapState, mapGetters } from 'vuex'
import phoneCodes from '~/locales/phoneCodes'
// import { formatPrice } from '~/helpers/client'

export default {
  name: 'CustomerInfoSidebar',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    show: false,
    valid: false,
    loading: false,
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+234',
    phoneNumber: '',
    phoneCodes: phoneCodes,
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ]
  }),

  computed: {
    ...mapState(['currency']),
    ...mapGetters(['cartTotal', 'cartCount'])
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

    goBack() {
      this.show = false
      this.$emit('back')
    },

    async handleSubmit() {
      const isValid = this.$refs.form.validate()
      if (!isValid) return

      this.loading = true
      try {
        const customerInfo = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: `${this.phoneCode}${this.phoneNumber}`
        }

        this.show = false // Close customer info sidebar
        this.$emit('submit', customerInfo) // This will be handled by parent to show order review
      } catch (error) {
        console.error('Error submitting form:', error)
      } finally {
        this.loading = false
      }
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
</style>
