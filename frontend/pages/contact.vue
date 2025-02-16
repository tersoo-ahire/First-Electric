<template>
<main>
  <Banner lazySrc="/img/contact-banner-placeholder.jpg" src="/img/contact-banner.jpg" :bannerTitle="$t('contact.banner_title')" />

  <MainContact />
</main>
</template>

<script>
import Banner from '@/components/banner/Short-Hero'
import MainContact from '@/components/contact/Main-Contact'

export default {
  head: {
    title: 'Contact'
  },

  components: {
    Banner,
    MainContact
  }
}
</script>
