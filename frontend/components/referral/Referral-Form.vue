<template>
<section>
  <div v-if="show">
    <div class="secondary--text title font-weight-bold mb-6">{{ $t('referral.form_title') }}...</div>

    <v-form ref="referralForm" v-model="formValid" @submit.prevent="register">
      <v-text-field v-model="firstName" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="First Name" rounded></v-text-field>

      <v-text-field v-model="lastName" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Last Name" rounded></v-text-field>

      <v-text-field type="email" v-model="email" :rules="emailRules" solo flat background-color="grey lighten-3" placeholder="Email Address" rounded></v-text-field>

      <v-text-field type="tel" v-model="phone" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Phone Number" rounded></v-text-field>

      <v-text-field oninput="this.value=this.value.slice(0,this.maxLength)" type="number" maxlength="10" v-model="accountNumber" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Your Account Number" rounded></v-text-field>

      <v-autocomplete v-model="bankName" :items="banks" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Your Bank" rounded></v-autocomplete>

      <div class="d-flex justify-end mt-2">
        <v-btn type="submit" :loading="loading" depressed rounded width="200" color="primary" class="caption font-weight-bold secondary--text">
          {{ $t('btn.register') }}

          <v-icon class="ml-2" size="14">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>

  <ReferralCode :referralCode="referralCode" v-if="!show" />
</section>
</template>

<script>
import toast from '@/helpers/toast'
import ReferralCode from '@/components/referral/Referral-Code'

export default {
  data: () => ({
    emailRules: [
      v =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) ||
      'E-mail must be valid'
    ],
    generalRules: [v => !!v || 'This field is required'],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    accountNumber: '',
    loading: false,
    formValid: false,
    bankName: '',
    show: true,
    referralCode: '',
    banks: ['Access Bank Plc', 'Citibank', 'Diamond Bank', 'Dynamic Standard Bank', 'Ecobank Nigeria', 'Fidelity Bank Nigeria', 'First Bank of Nigeria', 'First City Monument Bank', 'Guaranty Trust Bank', 'Heritage Bank Plc', 'Jaiz Bank', 'Keystone Bank Limited', 'Providus Bank Plc', 'Polaris Bank', 'Stanbic IBTC Bank Nigeria Limited', 'Standard Chartered Bank', 'Sterling Bank', 'Suntrust Bank Nigeria Limited', 'Union Bank of Nigeria', 'United Bank for Africa', 'Unity Bank Plc', 'Wema Bank', 'Zenith Bank']
  }),

  components: {
    ReferralCode
  },

  methods: {
    register() {
      if (this.$refs.referralForm.validate()) {
        this.loading = true

        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          bank: this.bankName,
          accountNumber: this.accountNumber
        }

        this.$axios.$post('/referral', data).then(response => {
          this.referralCode = response.referee.referralCode

          toast.success('Registration was successful')

          this.loading = false
          this.show = false
        }).catch(() => this.loading = false)
      }
    }
  },
}
</script>
