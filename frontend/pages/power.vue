<template>
  <main>
    <Banner lazySrc="/img/power-banner-placeholder.jpg" src="/img/power-banner.jpg" :bannerTitle="$t('power.banner_title')" />

    <v-container class="boxed__container">
      <Overview />

      <WhatWeOffer />
    </v-container>

    <WhyChooseUs data-aos="fade-up" data-aos-duration="2000" id="why-choose-us" />
  </main>
</template>

<script>
import Banner from '@/components/banner/Short-Hero'
import Overview from '@/components/power/Overview'
import WhatWeOffer from '@/components/power/What-We-Offer'
import WhyChooseUs from '@/components/power/Why-Choose-Us'

export default {
  head: {
    title: 'Power'
  },

  components: {
    Banner,
    Overview,
    WhatWeOffer,
    WhyChooseUs
  }
}
</script>
