<template>
<main class="pb-8">
  <ShopShortHero :title="page_title" />

  <v-container class="boxed__container">
    <div v-if="!isLoading">
      <div v-if="products.length">
        <v-row class="mt-8">
          <v-col v-for="product in products" :key="product._id" cols="12" sm="4" md="3">
            <ProductCardOld :product="product" />
          </v-col>
        </v-row>

        <v-pagination v-if="!isLoading && totalPages > 1" v-model="currentPage" :length="totalPages" @input="handlePageChange" color="secondary" circle total-visible="5" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" class="mt-8"></v-pagination>
      </div>

      <div v-else class="title my-8 font-weight-medium blue--text">No product found</div>
    </div>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
  </v-container>
</main>
</template>

<script>
import ProductCardOld from '@/components/shop/Product-Card-Old.vue'
import ShopShortHero from '@/components/banner/Shop-Short-Hero'

export default {
  layout: 'shop',

  components: {
    ProductCardOld,
    ShopShortHero
  },

  data: () => ({
    products: [],
    page_title: 'All Products',
    isLoading: true,
    currentPage: 1,
    totalPages: 1,
    perPage: 20,
  }),

  methods: {
    fetchProducts() {
      this.$axios.$get(`/products/paginate?page=${this.currentPage}&perPage=${this.perPage}`).then(response => {
        this.products = response.data.products
        this.currentPage = response.data.page
        this.totalPages = response.data.totalPages

        this.isLoading = false
      }).catch(() => this.isLoading = false)
    },

    handlePageChange(value) {
      this.currentPage = value;
      this.fetchProducts()
    },
  },

  created() {
    this.fetchProducts()
  },
}
</script>
