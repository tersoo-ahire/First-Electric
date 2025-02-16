<template>
<footer id="footer" class="accent footer__wrapper">
  <v-container class="boxed__container caption">

    <v-row>

      <v-col cols="12" sm="4" lg="3">
        <nuxt-link to="/">
          <v-img width="220" src="/logo.png"></v-img>
        </nuxt-link>

        <div style="max-width: 200px">
          <div class="mt-4"><span class="white--text font-weight-bold mr-1">NIGERIA:</span> First Electric, 41, Addo-Langbasa Road, Ajah, Lagos, Nigeria.</div>

          <div class="mt-4"><span class="white--text font-weight-bold mr-1 text-uppercase">Côte d'Ivoire:</span> Cocody, Abidjan , Côte d’Ivoire</div>

          <div class="mt-4">
            <div>+234 (0) 145 30 413</div>
            <div>‭+234 (0) 908 291 9774‬</div>
          </div>

          <div class="mt-4">info@firstelectricco.com</div>
        </div>
      </v-col>

      <v-col cols="12" sm="4" lg="5">
        <div class="title white--text font-weight-bold mb-3">{{ $t('footer.customer_care') }}</div>

        <nuxt-link to="/contact">
          <div class="white--text capitalize__text">{{ $t('footer.contact') }}</div>
        </nuxt-link>

        <nuxt-link to="/downloads">
          <div class="white--text capitalize__text mt-3">Downloads</div>
        </nuxt-link>

      </v-col>

      <v-col cols="12" sm="4" lg="4">
        <div class="title white--text font-weight-bold mb-3">{{ $t('btn.subscribe') }}</div>

        <div style="max-width: 300px">{{ $t('footer.keep_up_to_date') }}</div>

        <v-form ref="subscriptionForm" v-model="formValid" @submit.prevent="subscribe">
          <div class="d-flex mt-6">
            <v-text-field type="email" :rules="emailRules" v-model="email" solo flat placeholder="Your email address"></v-text-field>

            <v-btn type="submit" :loading="loading" depressed color="primary" class="secondary--text caption font-weight-bold" height="37px" width="100">{{ $t('btn.subscribe') }}</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

  <v-divider class="grey darken-2" />

  <v-container class="boxed__container caption">
    <div class="font-weight-bold py-1">Copyright &copy; {{ currentYear }} First Electric</div>
  </v-container>
</footer>
</template>

<style lang="scss" scoped>
.footer__wrapper {
  padding-top: 15px;
  color: rgb(231, 231, 231) !important;
}

.v-btn {
  border-radius: 0 !important;
}
</style>

<script>
import toast from '@/helpers/toast'

export default {
  data: () => ({
    emailRules: [
      v =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) ||
      ''
    ],
    email: '',
    formValid: false,
    loading: false
  }),

  methods: {
    async subscribe() {
      try {
        this.loading = true
        toast.info('Processing...')

        if (this.$refs.subscriptionForm.validate()) {
          const data = {
            email: this.email
          }

          const response = await this.$axios.$post('/subscribers', data)
          this.loading = false
          toast.success('Your subscription to First Electric is successful')

          setTimeout(() => {
            location.reload()
          }, 5000);
        }
      } catch (error) {
        this.loading = false
      }
    }
  },

  computed: {
    currentYear() {
      var dt = new Date
      return dt.getFullYear()
    }
  }
}
</script>
