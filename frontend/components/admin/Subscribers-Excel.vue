<template>
<section>
  <downloadexcel title="List of Subscribers on First Electric" :fetch="fetchData" worksheet="Subscribers" :name="`fe-subscribers-${todayDate}.xls`" :fields="json_fields">
    <v-btn large depressed color="primary" class="secondary--text caption font-weight-bold">DOWNLOAD AS EXCEL</v-btn>
  </downloadexcel>
</section>
</template>

<style lang="scss" scoped>
.v-btn {
  border-radius: 0 !important;
}
</style>

<script>
import toast from '@/helpers/toast'
import downloadexcel from "vue-json-excel";
import moment from 'moment'

export default {
  components: {
    downloadexcel: downloadexcel
  },

  data() {
    return {
      statuses: [],
      selectedLoan: null,
      loans: null,

      json_fields: {
        'Date': {
          field: 'createdAt',
          callback: (value) => {
            return `${moment(value).format('LL')}`
          }
        },

        'Email Address': 'email'
      }
    }
  },

  methods: {
    async fetchData() {
      toast.info('Downloading...')

      const response = await this.$axios.$get('/subscribers').catch(e => {})

      toast.success("File downloaded successfully")
      return response.data.subscribers;
    },
  },

  computed: {
    todayDate() {
      const date = Date.now()
      return moment(date).format('l')
    }
  },
}
</script>
