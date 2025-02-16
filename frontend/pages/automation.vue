<template>
<main>
  <Banner lazySrc="/img/automation-banner-placeholder.jpg" src="/img/automation-banner.jpg" :bannerTitle="$t('automation.banner_title')" />

  <v-container class="boxed__container">
    <Our />
  </v-container>

  <Why />
</main>
</template>

<script>
import Banner from '@/components/banner/Short-Hero'
import Our from '@/components/automation/Our'
import Why from '@/components/automation/Why'

export default {
  head: {
    title: 'Automation'
  },

  components: {
    Banner,
    Our,
    Why
  }
}
</script>
