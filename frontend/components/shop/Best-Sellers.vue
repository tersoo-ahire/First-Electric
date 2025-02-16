<template>
<section>
  <v-sheet height="65" tile dark class="py-4 px-6 d-flex flex-wrap align-center">
    <div class="title font-weight-bold">Best Sellers</div>
  </v-sheet>

  <v-row style="max-width: 350px" class="mt-8">
    <v-col v-for="(product, i) in products" :key="i" cols="12">
      <div class="d-flex">
        <nuxt-link :to="`/shop/${product.slug}`" style="border: 1px solid grey" class="pa-2">
          <v-img :src="product.thumbnail" max-width="120" class="" />
        </nuxt-link>

        <div class="ml-3 font__14">
          <nuxt-link :to="`/shop/${product.slug}`" class="font-weight-bold">{{ product.name }}</nuxt-link>
          <div class="red--text font-weight-bold mt-2">{{ currency == 'ngn' ? '₦' : '$' }}{{ product.price | currency }}</div>
        </div>
      </div>
    </v-col>
  </v-row>
</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    products: []
  }),

  computed: {
    ...mapState(['currency'])
  },

  created() {
    this.$axios.$get('/products/popular?page=1&perPage=4').then(response => {
      this.products = response.data.products
    })
  }
}
</script>
