<template>
  <div style="width: 100%" class="d-flex items-center justify-center mt-10">
    <div class="d-flex ext__wrapper">
      <v-sheet dark tile color="rgba(51, 51, 51, 0.8)" width="100%" height="90">
        <div id="shop__search__field" class="d-flex">
          <v-sheet
            :width="$vuetify.breakpoint.smAndUp ? '300' : '50'"
            height="40"
            tile
            color="transparent"
            class="d-flex align-center pl-5"
          >
            <nuxt-link to="/shop/all-products">
              <v-icon size="17">mdi-store</v-icon>
              <span v-if="$vuetify.breakpoint.smAndUp" class="ml-2"
                >All Products</span
              >
            </nuxt-link>
          </v-sheet>

          <div style="position: relative; width: 100%">
            <ais-instant-search
              index-name="dev_PRODUCTS"
              v-bind:search-client="searchClient"
            >
              <ais-index index-name="dev_PRODUCTS">
                <ais-configure
                  :hits-per-page.camel="6"
                  :min-word-sizefor-1-typo.camel="6"
                ></ais-configure>

                <ais-search-box>
                  <input
                    @keyup="is_typing = !is_typing"
                    @blur="change_focus"
                    class="search__field"
                    slot-scope="{ currentRefinement, refine }"
                    :value="currentRefinement"
                    @input="refine($event.currentTarget.value)"
                    placeholder="Search here..."
                    type="search"
                  />

                  <!-- <i aria-hidden="true" class="v-icon notranslate mdi mdi-magnify theme--dark"></i> -->
                </ais-search-box>

                <ais-hits
                  v-show="is_typing"
                  style="position: absolute; width: 100%; z-index: 4"
                >
                  <v-list
                    dense
                    :ripple="false"
                    slot-scope="{ items }"
                    color="rgba(30, 38, 50, 0.95)"
                  >
                    <div v-for="item in items" :key="item.objectID">
                      <v-list-item
                        class="mb-1 pl-10"
                        nuxt
                        :to="`/shop/${item.slug}`"
                      >
                        <!-- <v-list-item-action class="mr-4">
                            <img :src="item.thumbnail" width="40" alt="">
                          </v-list-item-action> -->
                        <v-list-item-content>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list>
                </ais-hits>
              </ais-index>
            </ais-instant-search>
          </div>
        </div>

        <div style="height: 47px" class="d-flex align-center">
          <div v-if="$vuetify.breakpoint.mdAndUp" class="d-flex align-center">
            <v-btn
              :to="`/shop/categories/${category.slug}`"
              v-for="category in main_categories"
              :key="category.slug"
              :ripple="false"
              nuxt
              class="mr-1 font-weight-medium font__13"
              text
              >{{ category.name }}</v-btn
            >
          </div>

          <v-menu
            v-if="$vuetify.breakpoint.mdAndUp && more_categories.length"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <div style="width: 100%" class="d-flex align-center px-4">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  :ripple="false"
                  nuxt
                  class="mr-1 font-weight-medium font__13"
                  text
                >
                  <span>More</span>
                  <v-icon color="white">mdi-chevron-down</v-icon>
                </v-btn>
              </div>
            </template>

            <v-list color="rgba(51, 51, 51, 0.97)" dark>
              <v-list-item
                :to="`/shop/categories/${item.slug}`"
                v-for="(item, index) in more_categories"
                :key="index"
              >
                <v-list-item-title class="font-weight-medium">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-if="$vuetify.breakpoint.smAndDown"
                style="width: 100%"
                class="d-flex align-center px-4"
              >
                <v-icon v-bind="attrs" v-on="on">mdi-menu</v-icon>
                <div class="ml-3 font-weight-bold">Categories</div>
              </div>
            </template>

            <v-list color="rgba(51, 51, 51, 0.97)" dark>
              <v-list-item
                :to="`/shop/categories/${category.slug}`"
                v-for="category in categories"
                :key="category._id"
              >
                <v-list-item-title class="font-weight-medium">{{
                  category.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <CurrencyNav v-if="$vuetify.breakpoint.smAndDown" class="mr-4" />
        </div>
      </v-sheet>

      <v-sheet
        @click="$router.push('/shop/cart')"
        v-if="$vuetify.breakpoint.lgAndUp"
        tile
        color="primary"
        height="90"
        width="160"
        class="text-center secondary--text d-flex cursor__pointer align-center justify-center"
      >
        <div>
          <v-icon size="19" color="secondary">mdi-cart</v-icon>
          <div class="font-weight-bold mt-1 font__13">
            {{ $t('shop.my_cart') }}
          </div>
          <div class="font__11 font-weight-medium">
            {{ cart.length }} {{ $t('shop.item') }}(s)
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-btn {
  transition: 0.7s;
  color: white !important;

  &--active:before,
  &:hover:before,
  &:focus:before {
    background-color: transparent;
    opacity: 0;
  }

  &--active,
  &:hover,
  &:focus {
    color: #f8c422 !important;
    background-color: transparent;
    opacity: 1;

    .v-icon {
      color: #f8c422 !important;
    }
  }
}

.menu__item {
  min-width: 180px;
  cursor: pointer;

  &__inner {
    color: black;
  }

  &:hover {
    background-color: #f8c422;
  }
}

.v-icon {
  color: white !important;
}

.logo {
  width: 300px;

  @media (max-width: 600px) {
    width: 200px;
  }
}

.ext__wrapper {
  @media (max-width: 960px) {
    width: 100%;
  }
}

.search__field {
  width: 100%;
  background-color: rgba(30, 38, 50, 0.8);
  border-color: rgba(30, 38, 50, 0.8);
  outline: none;
  padding: 0 12px;
  height: 43px;
  font-size: 0.85rem;
  border-radius: 0;
  color: white;
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  letter-spacing: normal;
  max-width: 100%;
  text-align: left;
  cursor: text;
  transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  position: relative;
}
</style>

<script>
import LangNav from '@/components/navigation/Lang-Nav.vue'
import CurrencyNav from '@/components/navigation/Currency-Nav'

import algoliasearch from 'algoliasearch/lite'

import { mapState } from 'vuex'

export default {
  components: {
    CurrencyNav
  },

  data: () => ({
    categories: [],
    is_typing: false,
    searchClient: algoliasearch(
      'ISUK75S5CD',
      '32ac8a34aaa14415bb014390d4bacd61'
    )
  }),

  methods: {
    change_focus() {
      setTimeout(() => {
        this.is_typing = false
      }, 300)
    }
  },

  computed: {
    ...mapState(['cart']),

    main_categories() {
      let ar = this.categories
      return ar.slice(0, 6)
    },

    more_categories() {
      let ar = this.categories
      return ar.slice(6)
    }
  },

  created() {
    this.$axios.$get('/categories').then(response => {
      this.categories = response.data
    })
  }
}
</script>
