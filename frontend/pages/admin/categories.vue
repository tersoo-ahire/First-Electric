<template>
<main class="pt-4">
  <v-container class="boxed__container">
    <div class="mb-8 d-flex align-end justify-lg-space-between">
      <Breadcrumb class="flex-grow-0" icon="shape" title="Categories" />

      <v-btn @click="create_dialog = true" depressed color="primary" height="45" class="secondary--text no__radius caption font-weight-bold flex-grow-0">
        <v-icon size="15" color="secondary">mdi-plus</v-icon>
        <span class="ml-1">NEW CATEGORY</span>
      </v-btn>
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="categories" :search="searchEntry" item-key="id" class="transparent" :loading="loading" no-data-text="No Category found" loading-text="Loading... Please wait">

        <template v-slot:[`item.createdAt`]="{ item }">
          <div>{{ item.createdAt | formatDate }}</div>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn @click="open_delete_dialog(item)" depressed small color="red" class="white--text no__radius font-weight-bold">Delete</v-btn>
        </template>

      </v-data-table>
    </template>

    <!-- DIALOGS  -->
    <v-dialog persistent v-if="create_dialog" v-model="create_dialog" max-width="400">
      <v-sheet class="pa-8">
        <div class="headline font-weight-bold mb-7">NEW CATEGORY</div>

        <div class="font-weight-medium mb-1">Category Name</div>
        <v-text-field v-model="name" autofocus solo flat color="secondary" background-color="grey lighten-3" class="font-weight-bold font__13" rounded />

        <div class="mt-3">
          <v-btn @click="create_dialog = false" rounded outlined color="secondary" width="100" class="font__13 font-weight-bold">cancel</v-btn>

          <v-btn @click="create_category" :loading="loading2" rounded depressed color="primary" width="100" class="font__13 font-weight-bold secondary--text">Submit</v-btn>
        </div>
      </v-sheet>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="350">
      <v-sheet class="pa-6 text-center">
        <div class="font-weight-bold">Are you sure you want to delete this category?</div>

        <div class="mt-6">
          <v-btn @click="delete_dialog = false" depressed outlined width="90" class="font__13 font-weight-bold">NO</v-btn>
          <v-btn @click="delete_category" :loading="btn_loading" depressed color="red" width="90" class="font__13 font-weight-bold white--text">YES</v-btn>
        </div>
      </v-sheet>
    </v-dialog>
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.no__radius.v-btn {
  border-radius: unset !important;
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
    name: '',
    loading: false,
    loading2: false,
    searchEntry: '',
    create_dialog: false,
    selected_category_index: null,
    selected_category: {},
    delete_dialog: false,
    btn_loading: false,

    headers: [{
        text: 'Category',
        value: 'name'
      },
      {
        text: 'Slug',
        value: 'slug'
      },
      {
        text: 'Action',
        value: 'action'
      }
    ],

    categories: []
  }),

  methods: {
    create_category() {
      this.loading2 = true

      this.$axios.$post('/categories', {
        name: this.name
      }).then(response => {
        this.categories.push(response.data)

        this.create_dialog = false
        this.loading2 = false
      }).catch(() => this.loading2 = false)
    },

    open_delete_dialog(category) {
      const index = this.categories.indexOf(category)
      this.selected_category_index = index
      this.selected_category = category
      this.delete_dialog = true
    },

    delete_category() {
      this.btn_loading = true

      this.$axios.$delete(`/categories/${this.selected_category._id}`).then(response => {
        this.categories.splice(this.selected_category_index, 1)

        this.delete_dialog = false
        this.btn_loading = false

        toast.success('Category deleted successfully')
      }).catch(() => this.btn_loading = false)
    }
  },

  created() {
    this.loading = true

    this.$axios.$get('/categories').then(response => {
      this.categories = response.data
      this.loading = false
    }).catch(() => this.loading = false)
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('lll') : ''
    }
  }
}
</script>
