<template>
<main id="short-hero">
  <ShopHero />

  <v-row no-gutters>
    <v-col cols="4">
      <v-img src="/img/shop-short-banner-1.svg" height="auto" width="100%" alt />
    </v-col>

    <v-col cols="4">
      <v-img src="/img/shop-short-banner-2.svg" height="auto" width="100%" alt />
    </v-col>

    <v-col cols="4">
      <v-img src="/img/shop-short-banner-3.svg" height="auto" width="100%" alt />
    </v-col>
  </v-row>

  <div v-if="new_products">
    <v-container class="boxed__container">
      <div id="products" class="headline font-weight-bold mt-12">{{$t('shop.new_products')}}</div>

      <v-row class="mt-8">
        <v-col v-for="product in new_products" :key="product._id" cols="12" sm="6" md="4" lg="3">
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>

    <div class="best__buy__bg my-10 py-12">
      <v-container class="boxed__container">
        <v-sheet tile max-width="600" class="pa-6">
          <div class="headline font-weight-bold">{{$t('shop.best_buy')}}</div>

          <v-row class="mt-8">
            <v-col v-for="(product, i) in best_buy" :key="i" cols="12" sm="6">
              <SmallProductCard :product="product" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </div>

    <v-container class="boxed__container mb-10">
      <div class="headline font-weight-bold">{{$t('shop.featured_products')}}</div>

      <v-row class="mt-8">
        <v-col v-for="(product, i) in featured_product" :key="i" cols="12" sm="6" md="4" lg="3">
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>

  <v-overlay v-else>
    <v-progress-circular indeterminate></v-progress-circular>
  </v-overlay>
</main>
</template>

<style lang="scss" scoped>
.best__buy__bg {
  background-image: url('/img/best-buy-bg.png');
  // height: 600px;
  background-size: cover;
}
</style>

<script>
import ProductCard from '@/components/shop/Product-Card'
import SmallProductCard from '@/components/shop/Small-Product-Card'
import ShopHero from '@/components/banner/Shop-Hero'

export default {
  layout: 'shop',

  components: {
    ShopHero,
    ProductCard,
    SmallProductCard
  },

  data: () => ({
    new_products: null,

    best_buy: null,

    featured_product: null
  }),

  created() {
    this.$axios.$get('/products/paginate?page=1&perPage=8').then(response => {
      this.new_products = response.data.products
    })

    this.$axios.$get('/products/popular?page=1&perPage=6').then(response => {
      this.best_buy = response.data.products
    })

    this.$axios.$get('/products/featured?page=1&perPage=4').then(response => {
      this.featured_product = response.data.products
    })
  }
}
</script>
