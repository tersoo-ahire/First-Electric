<template>
<v-app id="default-layout">
  <Header />

  <v-main class="white">
    <nuxt />
  </v-main>

  <Footer />
</v-app>
</template>

<style lang="scss" scoped>
.main__footer {
  margin-top: 100px;

  @media (max-width: 1240px) {
    margin-top: unset;
  }
}
</style>

<script>
import Header from '@/components/navigation/Header'
import Footer from '@/components/footer/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
