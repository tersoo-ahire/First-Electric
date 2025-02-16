<template>
<main class="pt-4">
  <v-container class="boxed__container" id="referee">
    <div class="mb-8 d-flex align-center justify-lg-space-between">
      <Breadcrumb icon="rss" title="Subscribers" />

      <ExcelDownload />

      <div>
        <div class="font-weight-bold font__13">Total Subscribers</div>
        <div class="font-weight-bold display-2">{{ population }}</div>
      </div>
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="subscribers" hide-default-footer item-key="id" class="transparent" :loading="loading" loading-text="Loading... Please wait">
        <template v-slot:item.createdAt="{ item }">
          <div>{{ item.createdAt | formatDate }}</div>
        </template>
      </v-data-table>

      <div style="max-width: 600px" class="text-xs-center my-12 mx-auto">
        <v-pagination class="white--text caption" v-model="page" circle :length="result.totalPages" @input="pageChange"></v-pagination>
      </div>
    </template>
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
import ExcelDownload from '@/components/admin/Subscribers-Excel'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb,
    ExcelDownload
  },

  data: () => ({
    loading: false,
    page: 1,
    headers: [{
        text: 'Date',
        value: 'createdAt'
      },
      {
        text: 'Email Address',
        value: 'email',
      }
    ],

    subscribers: [],
    population: '',
    result: {}
  }),

  methods: {
    pageChange() {
      this.$axios.$get(`/subscribers/paginate?page=${this.page}&perPage=10`).then(subscribers => {
        this.subscribers = subscribers.data.subscribers

        this.population = subscribers.data.totalDocs

        this.result = subscribers.data

        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    }
  },

  async mounted() {
    this.loading = true

    this.$axios.$get('/subscribers/paginate?page=1&perPage=10').then(subscribers => {
      this.subscribers = subscribers.data.subscribers

      this.population = subscribers.data.totalDocs

      this.result = subscribers.data

      this.loading = false
    }).catch(e => {
      this.loading = false
    })
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('LL') : ''
    }
  }
}
</script>
