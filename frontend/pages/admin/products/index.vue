<template>
<main class="pt-4">
  <v-container class="boxed__container referee">
    <div class="mb-8 d-flex align-end justify-space-between">
      <Breadcrumb class="flex-grow-0" icon="cube" title="Products" />
      
      <v-btn nuxt to="/admin/new-product" depressed color="primary" height="45" class="secondary--text caption font-weight-bold flex-grow-0">
        <v-icon size="15" color="secondary">mdi-plus</v-icon>
        <span class="ml-1">NEW PRODUCT</span>
      </v-btn>
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="products" item-key="id" class="transparent" :loading="loading" no-data-text="No Product found" loading-text="Loading... Please wait">
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>{{ item.createdAt | date }}</div>
        </template>

        <template v-slot:[`item.price`]="{ item }">
          <div>{{ item.price | currencyFormat }}</div>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-icon :color="item.status == 'draft' ? 'primary' : 'green'">mdi-circle-medium</v-icon>
          <span class="text-capitalize">{{ item.status }}</span>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <div style="max-width: 200px">{{ item.name }}</div>
        </template>

        <template v-slot:[`item.stock`]="{ item }">
          <v-icon size="15" :color="item.available ? 'green' : 'red'">{{ item.available ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
          <span class="ml-1">{{ item.stock > 0 ? item.stock : 'Out of stock' }}</span>
        </template>

        <template v-slot:[`item.thumbnail`]="{ item }">
          <img :src="item.thumbnail" width="30" class="my-1" alt="">
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <div class="d-flex justify-center">
            <v-icon @click="$router.push(`/admin/products/${item.slug}`)" color="blue" size="18">mdi-pencil</v-icon>
            <v-icon @click="open_delete_dialog(item)" color="red" size="18" class="ml-2">mdi-delete</v-icon>
          </div>
        </template>
      </v-data-table>
    </template>

    <!-- DIALOGS -->
    <v-dialog v-model="delete_dialog" max-width="350">
      <v-sheet class="pa-6 text-center">
        <div class="font-weight-bold">Are you sure you want to delete this product?</div>

        <div class="mt-6">
          <v-btn @click="delete_dialog = false" depressed outlined width="90" class="font__13 font-weight-bold">NO</v-btn>
          <v-btn @click="delete_product" :loading="btn_loading" depressed color="red" width="90" class="font__13 font-weight-bold white--text">YES</v-btn>
        </div>
      </v-sheet>
    </v-dialog>
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.v-btn {
  border-radius: 0 !important;
}
</style>

<script>
import moment from 'moment'
import Breadcrumb from '@/components/navigation/Breadcrumb'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb
  },

  data: () => ({
    emailRules: [
      v =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) ||
      ''
    ],
    email: '',
    formValid: false,
    loading: false,
    loading2: false,
    searchEntry: '',

    headers: [{
        text: 'Thumbnail',
        value: 'thumbnail'
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Stock',
        value: 'stock',
      },
      {
        text: 'Price (₦)',
        value: 'price',
      },
      {
        text: 'Categories',
        value: 'category.name'
      },
      {
        text: 'Date',
        value: 'createdAt'
      },
      {
        text: 'Status',
        value: 'status'
      },
      {
        text: 'Action',
        value: 'action',
        align: 'center'
      }
    ],

    products: [],
    selected_product_index: null,
    selected_product: {},
    delete_dialog: false,
    btn_loading: false
  }),

  methods: {
    open_delete_dialog(product) {
      const index = this.products.indexOf(product)
      this.selected_product_index = index
      this.selected_product = product
      this.delete_dialog = true
    },

    delete_product() {
      this.btn_loading = true

      this.$axios.$delete(`/products/${this.selected_product._id}`).then(response => {
        this.products.splice(this.selected_product_index, 1)

        this.delete_dialog = false
        this.btn_loading = false

        toast.success('Product deleted successfully')
      }).catch(() => this.btn_loading = false)
    }
  },

  created() {
    this.loading = true

    this.$axios.$get('/products').then(response => {
      this.loading = false
      this.products = response.data
    })
  },
}
</script>
