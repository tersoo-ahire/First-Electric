<template>
<main>
  <ShopShortHero title="Product Detail" />

  <v-container v-if="product" class="boxed__container">
    <v-row>
      <v-col :class="$vuetify.breakpoint.smAndDown ? 'order-1' : 'order-0'" cols="12" md="4" lg="3">
        <BestSellers />
      </v-col>

      <v-col :class="$vuetify.breakpoint.smAndDown ? 'order-0' : 'order-1'" cols="12" md="8" lg="9">
        <v-sheet class="pa-8">
          <v-row>
            <v-col cols="12" sm="6">
              <div id="product__gallery"></div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="font-weight-bold headline">{{ product.name }}</div>

              <div class="mt-2">
                <v-icon size="15" :color="product.stock > 0 ? 'green' : 'red'">{{ product.stock > 0 ? 'mdi-checkbox-marked' : 'mdi-close-circle' }}</v-icon>
                <span class="font__12 ml-2">{{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}</span>
              </div>

              <div class="headline red--text font-weight-medium my-5">{{ currency == 'ngn' ? '₦' : '$' }}{{ product.price | currency }}</div>

              <div>
                <div class="font-weight-bold title">Quick Overview</div>
                <div class="font__12 grey--text text--darken-2">{{ product.overview }}</div>
              </div>

              <div class="mt-6 d-flex">
                <div style="max-width: 90px" class="d-flex">
                  <!-- <v-text-field type="number" v-model="quantity" outlined color="grey" hide-details class="no__radius font-weight-bold" /> -->
                  <div class="quantity__box">{{ quantity }}</div>

                  <div class="d-flex flex-column">
                    <v-btn @click="inc" outlined small color="grey" class="inc__btn">+</v-btn>
                    <v-btn @click="dec" outlined small color="grey" class="inc__btn">-</v-btn>
                  </div>
                </div>

                <div style="width: 100%" class="ml-4">
                  <v-btn @click="addToCart" depressed block color="primary" height="100%" class="secondary--text font-weight-bold">ADD TO CART</v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-sheet>

        <v-sheet class="mt-6">
          <v-row>
            <v-col style="border-right: 1px #d3d3d3 solid" class="pr-0 pt-0" cols="12" sm="4" md="3">
              <v-btn depressed block color="primary" height="47" class="font-weight-bold secondary--text">DESCRIPTION</v-btn>
            </v-col>

            <v-col cols="12" sm="8" md="9">
              <div class="pa-2 font__12" v-html="product.description"></div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <v-overlay v-else>
    <v-progress-circular indeterminate></v-progress-circular>
  </v-overlay>

  <!-- DIALOGS  -->
  <v-dialog v-if="cart_dialog" v-model="cart_dialog" max-width="500">
    <v-sheet class="pa-8">
      <div class="headline font-weight-bold">Added to Cart</div>

      <div class="mt-4">{{ product.name }} added to Cart</div>

      <div class="mt-6 text-center">
        <v-btn @click="cart_dialog = false" :block="$vuetify.breakpoint.xsOnly" outlined color="secondary" height="42" class="primary--text font__11 font-weight-bold">CONTINUE SHOPPING</v-btn>
        <v-btn to="/shop/cart" nuxt :block="$vuetify.breakpoint.xsOnly" depressed color="primary" height="42" class="secondary--text font__11 font-weight-bold">VIEW CART AND CHECKOUT</v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</main>
</template>

<style lang="scss" scoped>
.v-btn {
  border-radius: 0 !important;
}

.inc__btn {
  min-width: 20px !important;
  width: 25px !important;
  font-size: 1.2rem;
  min-height: 20px !important;
  height: 25px !important;
}

.quantity__box {
  height: 50px;
  width: 55px;
  border: 1px solid grey;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { mapState } from 'vuex'
import BestSellers from '@/components/shop/Best-Sellers'
import ShopShortHero from '@/components/banner/Shop-Short-Hero'

export default {
  head() {
    return {
      titleTemplate: this.page_title || 'Shop',
      title: this.page_title || 'Shop',
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.page_description || ''
      }]
    }
  },

  layout: 'shop',

  components: {
    BestSellers,
    ShopShortHero
  },

  data: () => ({
    quantity: 1,
    product: null,
    cart_dialog: false
  }),

  methods: {
    inc() {
      this.quantity++
    },

    dec() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    addToCart() {
      this.$store.commit('ADD_TO_CART', {
        product: this.product,
        quantity: this.quantity
      })

      this.cart_dialog = true
    }
  },

  computed: {
    ...mapState(['currency']),

    page_title() {
      return this.product ? this.product.name : 'Shop'
    },

    page_description() {
      return this.product ? this.product.overview : 'Shop'
    }
  },

  async created() {
    await this.$axios.$get(`/products/${this.$route.params.slug}`).then(response => {
      this.product = response.data
    })

    window.cloudinary.galleryWidget({
      container: "#product__gallery",
      cloudName: "firstelectric",
      carouselLocation: "bottom",
      mediaAssets: [{
        tag: this.product._id
      }]
    }).render()
  }
}
</script>
