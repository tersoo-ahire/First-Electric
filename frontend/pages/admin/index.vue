<template>
<main id="main-contact" class="bg">
  <v-container fill-height>
    <v-container class="boxed__container">
      <div class="d-flex flex-wrap justify-space-between align-center">
        <div :class="{'mb-10' : $vuetify.breakpoint.smAndDown}">
          <nuxt-link to="/">
            <img src="/logo-black.png" class="logo" alt="">
          </nuxt-link>

          <div v-if="$vuetify.breakpoint.smAndUp" class="auth__title">{{ $t('auth.administrative_area') }}</div>
        </div>

        <v-form ref="authForm" v-model="authValid" class="form__wrapper" @submit.prevent="login">
          <div class="section__title font-weight-black">{{ $t('btn.sign_in') }}</div>

          <v-text-field :rules="emailRules" v-model="email" type="email" name="email" placeholder="Email"></v-text-field>

          <v-text-field autocomplete="new-password" :rules="passwordRules" v-model="password" type="password" name="password" placeholder="Password"></v-text-field>

          <!-- <div class="text-right font__13 font-weight-bold">Forgot Password</div> -->

          <v-btn :loading="loading" type="submit" depressed block rounded color="primary" height="40" class="secondary--text caption font-weight-bold mt-9 text-uppercase">{{ $t('btn.sign_in') }}</v-btn>

        </v-form>
      </div>
    </v-container>
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('/img/auth-bg.png');
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}

.logo {
  width: 180px;

  @media (max-width: 600px) {
    width: 150px;
  }
}

.auth__title {
  font-size: 2.2rem;
  line-height: 35px;
  font-weight: 900;
  margin-top: 15px;

  @media (max-width: 600px) {
    margin-top: 10px;
  }
}

.form__wrapper {
  width: 100%;
  max-width: 350px;
}
</style>

<script>
import toast from '@/helpers/toast'

export default {
  layout: 'auth',
  data: () => ({
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v.length > 3) || 'Must be at least 4 characters'
    ],

    email: '',
    password: '',
    authValid: false,
    loading: false
  }),

  methods: {
    async login() {
      if (this.$refs.authForm.validate()) {
        this.loading = true

        const data = {
          email: this.email,
          password: this.password
        }
        await this.$axios.$post('/users/login', data).then(response => {
          this.loading = false

          this.$store.commit('SET_TOKEN', response.token)
          this.$store.commit('SET_USER', response.data.user)
          this.$axios.setHeader('Authorization', "Bearer " + response.token)

          this.$router.push('/admin/products')
        }).catch(e => {
          this.loading = false
        })
      }

    }
  }
}
</script>
