<template>
<section>
  <div class="d-flex">
    <nuxt-link :to="`/shop/${product.slug}`" style="border: 1px solid grey" class="pa-2">
      <v-img :src="product.thumbnail" max-width="90" class="" />
    </nuxt-link>

    <div class="ml-3 font__12">
      <nuxt-link :to="`/shop/${product.slug}`" class="font-weight-bold">{{ product.name }}</nuxt-link>
      <div class="red--text font-weight-bold mt-2">{{ currency == 'ngn' ? '₦' : '$' }}{{ product.price | currency }}</div>
    </div>
  </div>
</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['product'],

  computed: {
    ...mapState(['currency'])
  }
}
</script>
