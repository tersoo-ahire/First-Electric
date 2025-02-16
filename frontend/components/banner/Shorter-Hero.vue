<template>
<main id="short-hero">
  <v-img :src="src" :lazy-src="lazySrc" class="bg">
    <v-container class="banner__content__container">
      <h1 v-html="bannerTitle" class="slide-in-bottom font-weight-bold text-center banner__content"></h1>
    </v-container>
  </v-img>
</main>
</template>

<style lang="scss" scoped>
.bg {
  height: 250px;
  padding-top: 130px;
}

.banner__content__container {
  max-width: 750px;
  margin-right: auto;
  margin-left: auto;
}

.banner__content {
  font-size: 40px;
  line-height: 55px;
  color: white;

  @media (max-width: 600px) {
    font-size: 27px;
    line-height: 35px;
  }

  @media (min-width: 600px) and (max-width: 1264px) {
    font-size: 34px;
    line-height: 45px;
  }
}
</style>

<script>
export default {
  props: ['bannerTitle', 'src', 'lazySrc']
}
</script>
