<template>
<section>
  <downloadexcel title="List of Referees on First Electric" :fetch="fetchData" worksheet="Referees" :name="`fe-referees-${todayDate}.xls`" :fields="json_fields">
    <v-btn depressed color="primary" height="45" class="secondary--text caption font-weight-bold flex-grow-0">DOWNLOAD AS EXCEL</v-btn>
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
        'Referral Code': 'referralCode',

        'First Name': 'firstName',

        'Last Name': 'lastName',

        'Email Address': 'email',

        'Phone Number': 'phone',

        'Bank Name': 'bank',

        'Account Number': 'accountNumber'
      }
    }
  },

  methods: {
    async fetchData() {
      toast.info('Downloading...')

      const response = await this.$axios.$get('/referral').catch(e => {})

      toast.success("File downloaded successfully")
      return response.data.referees;
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
