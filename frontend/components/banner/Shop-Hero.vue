<template>
  <section id="short-hero">
    <v-img
      src="/img/solar-banner.png"
      lazy-src="/img/solar-banner.png"
      class="bg"
    >
      <div class="overlay"></div>
      <v-container class="banner__content__container text-center">
        <h1
          class="slide-in-bottom font-weight-bold white--text text-center banner__content"
        >
          {{ $t('shop.banner_title') }}
        </h1>
        <v-btn
          href="/shop#products"
          depressed
          color="primary"
          class="mt-10 secondary--text font-weight-bold"
          width="200"
          height="45"
        >
          {{ $t('btn.shop_now') }}
        </v-btn>
      </v-container>
    </v-img>
  </section>
</template>

<style lang="scss" scoped>
.bg {
  position: relative;
  height: 600px;
  padding-top: 350px;
  @media (max-width: 1024px) {
    height: 550px;
    padding-top: 290px;
  }
}

/* Dark overlay */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.68); /* Adjust opacity for darkness */
}

.banner__content__container {
  position: relative;
  z-index: 2;
  max-width: 900px;
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
