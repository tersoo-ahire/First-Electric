<template>
<main>
  <ShopShortHero :title="page_title" />

  <v-container class="boxed__container">
    <v-row>
      <v-col cols="12" md="9">
        <v-sheet height="65" tile class="py-4 px-6 d-flex flex-wrap align-center" id="shop__filter">
          <div class="d-flex align-center">
            <div class="mr-5 font-weight-medium">Sort by</div>

            <v-select @change="sort_product" item-color="secondary" outlined flat :items="sort_items" item-text="name" item-value="value" v-model="sort_item" hide-details="auto" />
          </div>

          <!-- <div v-if="$vuetify.breakpoint.smAndUp" id="page__spec" class="d-flex align-center ml-10">
            <div class="mr-5 font-weight-medium">Show</div>

            <v-text-field outlined flat hide-details="auto" />
          </div> -->
        </v-sheet>

        <div v-if="!loading">
          <v-row v-if="products.length" class="mt-8">
            <v-col v-for="product in products" :key="product._id" cols="12" sm="6" md="4">
              <ProductCard :product="product" />
            </v-col>
          </v-row>

          <div v-else class="title my-8 font-weight-medium blue--text">No product found under this category</div>
        </div>

        <v-overlay :value="loading">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-overlay>
      </v-col>

      <v-col cols="12" md="3">
        <v-sheet height="65" tile dark class="py-4 px-6 d-flex flex-wrap align-center">
          <div class="title font-weight-bold">Filter by Price (₦)</div>
        </v-sheet>

        <div class="mt-8">
          <v-range-slider max="500000" min="20000" color="secondary" track-color="grey" v-model="price_range"></v-range-slider>

          <div id="price__range" class="d-flex justify-space-between">
            <div class="d-flex">
              <v-text-field :value="price_range[0]" @change="$set(price_range, 0, $event)" outlined flat hide-details="auto" />
              <v-text-field :value="price_range[1]" @change="$set(price_range, 1, $event)" outlined flat hide-details="auto" class="ml-3" />
            </div>

            <v-btn @click="filter_by_price" :loading="btn_loading" depressed color="primary" height="38" width="100" class="secondary--text font__12 font-weight-bold">FILTER</v-btn>
          </div>
        </div>

        <!-- <BrandFilter class="mt-8" /> -->

        <BestSellers class="mt-8" />
      </v-col>
    </v-row>
  </v-container>
</main>
</template>

<script>
import ProductCard from '@/components/shop/Product-Card'
import BestSellers from '@/components/shop/Best-Sellers'
import ShopShortHero from '@/components/banner/Shop-Short-Hero'

export default {
  layout: 'shop',

  components: {
    ProductCard,
    BestSellers,
    ShopShortHero
  },

  data: () => ({
    products: [],
    page_title: '',
    price_range: [20000, 500000],
    loading: false,
    btn_loading: false,
    sort_items: [{
        name: "Date",
        value: 'recent'
      },
      {
        name: "Popularity",
        value: 'popularity'
      }
    ],
    sort_item: 'recent'
  }),

  methods: {
    filter_by_price() {
      this.btn_loading = true

      this.$axios.$get(`/products/filter-price/${this.$route.params.slug}?min=${this.price_range[0]}&max=${this.price_range[1]}`).then(response => {
        this.products = response.data
        this.btn_loading = false
      }).catch(() => this.btn_loading = false)
    },

    sort_product() {
      this.loading = true

      this.$axios.$get(`/products/category/${this.$route.params.slug}?page=1&perPage=9&sort=${this.sort_item}`).then(response => {
        this.products = response.data.products
        this.loading = false
      }).catch(() => this.loading = false)
    }
  },

  created() {
    this.loading = true

    this.$axios.$get(`/products/category/${this.$route.params.slug}?page=1&perPage=9`).then(response => {
      this.products = response.data.products
      this.page_title = response.category.name

      this.loading = false
    }).catch(() => this.loading = false)
  },
}
</script>
