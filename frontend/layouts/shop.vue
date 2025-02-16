<template>
<v-app id="shop__layout">
  <Header />

  <v-main class="bg">
    <nuxt />
  </v-main>

  <Footer />
</v-app>
</template>

<style lang="scss" scoped>
.bg {
  background-color: #ebebeb !important;
}

.main__footer {
  margin-top: 100px;

  @media (max-width: 1240px) {
    margin-top: unset;
  }
}
</style>

<script>
import Header from '@/components/navigation/Shop-Header'
import Footer from '@/components/footer/Footer'

export default {
  components: {
    Header,
    Footer
  },

  created() {
    this.$axios.$get('https://openexchangerates.org/api/latest.json?app_id=995e3ee88dc241409350c3223a4ef773&base=USD&symbols=NGN')
    .then(response => {
      this.$store.commit('SET_CONVERSION_RATE', response.rates.NGN)
    })
  },
}
</script>
