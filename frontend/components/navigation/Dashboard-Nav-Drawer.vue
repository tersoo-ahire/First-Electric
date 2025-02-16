<template>
<main class="py-7 pl-7">
  <div class="nav__wrapper white">
    <div class="d-flex flex-wrap align-center mx-5 mt-4">
      <img style="background-color: #556080" src="/img/user.png" width="45" class="radius-5 my-shadow" alt="">

      <div class="ml-3">
        <div class="font-weight-bold body-1">Welcome, {{ user.firstName }}</div>
        <div class="caption grey--text text--darken-3">Platform Admin</div>
      </div>
    </div>

    <div class="mt-3 mb-2">
      <v-divider class="grey lighten-2"></v-divider>
    </div>

    <v-list>
      <div v-for="(nav, i) in navItems" :key="i">
        <v-list-item active-class="nav__control" class="mb-1 pl-10" nuxt :to="nav.to">
          <v-list-item-action class="mr-4">
            <v-icon color="black">mdi-{{ nav.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ nav.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <div class="mt-12 mb-5">
        <v-divider class="grey lighten-2"></v-divider>
      </div>

      <div>
        <v-list-item active-class="nav__control" class="mb-1 pl-10" @click="logout">
          <v-list-item-action class="mr-4">
            <v-icon color="black">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>

  </div>
</main>
</template>

<style lang="scss" scoped>
.nav__wrapper {
  overflow-y: scroll !important;
  height: 100vh;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
}

.profile__wrapper {
  max-width: 200px;
}

.profile__image {
  border: 1px solid rgb(182, 182, 182);

  img {
    padding: 10px;
  }
}

.other__nav {
  margin-bottom: 60px;
}
</style>

<script>
export default {
  props: ['user'],

  data: () => ({
    navItems: [{
        title: 'Products',
        to: '/admin/products',
        icon: 'cube'
      },
      {
        title: 'New Product',
        to: '/admin/new-product',
        icon: 'plus-box-multiple'
      },
      {
        title: 'Categories',
        to: '/admin/categories',
        icon: 'shape'
      },
      {
        title: 'Orders',
        to: '/admin/orders',
        icon: 'cart'
      },
      {
        title: 'Customers',
        to: '/admin/customers',
        icon: 'card-account-phone'
      },
      {
        title: 'Transactions',
        to: '/admin/transactions',
        icon: 'finance'
      },
      {
        title: 'Subscribers',
        to: '/admin/subscribers',
        icon: 'rss'
      },

      {
        title: 'Referees',
        to: '/admin/referees',
        icon: 'account-group',
      },
      {
        title: 'Meters',
        to: '/admin/meters',
        icon: 'gauge',
      },
      {
        title: 'PayGo Payments',
        to: '/admin/paygo-payments',
        icon: 'chart-bar-stacked',
      },
      {
        title: 'Documents',
        to: '/admin/documents',
        icon: 'file-document-multiple-outline',
      }
    ]
  }),

  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
