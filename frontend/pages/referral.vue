<template>
<main id="main-contact">
  <Banner lazySrc="/img/referral-banner-placeholder.png" src="/img/referral-banner.png" :bannerTitle="$t('referral.banner_title')" />

  <v-container class="referral__container">
    <Referral />
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.referral__container {
  @media (min-width: 1264px) {
    max-width: 1100px !important;
    margin: 0 auto;
  }
}
</style>

<script>
import Banner from '@/components/banner/Short-Hero'
import Referral from '@/components/referral'

export default {
  head: {
    title: 'Referral'
  },

  components: {
    Banner,
    Referral
  }
}
</script>
