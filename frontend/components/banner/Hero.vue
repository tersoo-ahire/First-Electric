<template>
<main>
  <v-carousel v-model="heroCarousel" interval="7500" cycle :show-arrows="false" delimiter-icon="mdi-minus" hide-delimiters :height="$vuetify.breakpoint.smAndDown ? '600px' : '100vh'">
    <v-carousel-item v-for="(heroItem,i) in heroItems" :key="i" :src="heroItem.src" :lazy-src="heroItem.lazySrc">
      <v-container fill-height class="boxed__container">
        <div :class="{'text-center' : $vuetify.breakpoint.xsOnly}" class="d-flex align-center">
          <div>
            <div class="banner__title slide-in-bottom" :class="`${heroItem.textColor}--text`">
              <div v-html="$t(heroItem.title)"></div>
            </div>

            <div class="banner__subtitle slide-in-left" :class="`${heroItem.textColor}--text`">{{ $t(heroItem.subtitle) }}</div>

            <v-btn :to="heroItem.btnLink" depressed height="40" min-width="150" class="slide-in-bottom font-weight-bold mt-4 secondary--text caption" color="primary">{{$t(heroItem.btnText)}}</v-btn>
          </div>
        </div>
      </v-container>
    </v-carousel-item>

    <div class="carousel__action d-flex justify-space-between align-end">
      <div class="d-flex flex-column">
        <a href="https://web.facebook.com/First-Electric-108544147214661/" target="_blank">
          <v-icon size="18" class="mb-3" color="white">mdi-facebook</v-icon>
        </a>

        <a href="https://www.instagram.com/firstelectricco/" target="_blank">
          <v-icon size="18" class="mb-3" color="white">mdi-instagram</v-icon>
        </a>

        <v-icon size="18" color="white">mdi-twitter</v-icon>
      </div>

      <nuxt-link to="#partners">
        <img src="/icons/scroll-icon.png" width="90px" height="100%" alt="">
      </nuxt-link>

      <div>
        <img @click="heroCarousel--" src="/icons/active-carousel.png" class="cursor__pointer" width="40px" height="100%" alt="">

        <v-icon @click="heroCarousel++" color="white">mdi-circle-medium</v-icon>
      </div>
    </div>
  </v-carousel>
</main>
</template>

<style lang="scss" scoped>
.banner__subtitle {
  font-size: 21px;
  line-height: 28px;
  font-weight: 500;
  /* color: #FFF; */
  max-width: 670px;

  @media (max-width: 600px) {
    font-size: 17px;
    line-height: 25px;
    margin-top: 17px;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    font-size: 19px;
    line-height: 27px;
    margin-top: 5px;
  }
}

.banner__title {
  font-weight: bold;
  font-weight: 700;
  font-size: 65px;
  letter-spacing: -1px;
  line-height: 70px;
  padding: 10px 0;
  /* color: #FFF; */

  @media (max-width: 600px) {
    font-size: 30px;
    line-height: 30px;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    font-size: 38px;
    line-height: 45px;
  }
}

.carousel__action {
  position: absolute;
  width: 100%;
  z-index: 2;
  bottom: 20px;
  padding: 0 40px;

  @media (max-width: 960px) {
    padding: 0 10px;
  }
}
</style>

<script>
export default {
  data: () => ({
    heroCarousel: 0,

    heroItems: [
      {
        src: '/img/hero-banner-3.png',
        lazySrc: '/img/hero-banner-placeholder-1.jpg',
        title: 'home.banner_title_3',
        subtitle: 'home.banner_subtitle_3',
        btnText: 'btn.sign_up_here',
        btnLink: '/contact',
        textColor: "black"
      },
      {
        src: '/img/hero-banner-1.jpg',
        lazySrc: '/img/hero-banner-placeholder-1.jpg',
        title: 'home.banner_title_1',
        subtitle: 'home.banner_subtitle_1',
        btnText: 'btn.shop_now',
        btnLink: '/shop',
        textColor: "white"
      },
      {
        src: '/img/hero-banner-2.jpg',
        lazySrc: '/img/hero-banner-placeholder-2.jpg',
        title: 'home.banner_title_2',
        subtitle: 'home.banner_subtitle_2',
        btnText: 'btn.shop_now',
        btnLink: '/shop',
        textColor: "white"
      },
    ]
  })
}
</script>
