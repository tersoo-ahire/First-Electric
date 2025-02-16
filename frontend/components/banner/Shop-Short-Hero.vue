<template>
<section id="shop-short-hero">
  <v-img src="/img/shop-banner.png" lazy-src="/img/shop-banner.png" class="bg">
    <v-container class="banner__content__container text-center">
      <h1 class="slide-in-bottom font-weight-bold white--text text-center banner__content">{{ title }}</h1>

      <div class="font__12 white--text font-weight-medium">
        <nuxt-link to="/shop"><span class="white--text">Shop</span></nuxt-link>
        <v-icon size="14" color="white">mdi-chevron-right</v-icon>
        <span>{{ title }}</span>
      </div>
    </v-container>
  </v-img>
</section>
</template>

<style lang="scss" scoped>
.bg {
  height: 450px;
  padding-top: 310px;
  background-color: rgba(30, 38, 50, 0.8);
}

.banner__content__container {
  max-width: 700px;
  margin-right: auto;
  margin-left: auto;
}

.banner__content {
  font-size: 40px;
  line-height: 55px;

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
  props: ['title']
}
</script>
