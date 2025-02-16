<template>
<main class="pt-4">
  <v-container class="boxed__container referee">
    <div class="mb-8 d-flex align-end justify-lg-space-between">
      <Breadcrumb class="flex-grow-0" icon="card-account-phone" title="Customers" />

      <div class="flex-grow-1 pl-12">
        <div class="d-flex mt-6">
          <v-text-field v-model="searchEntry" solo flat class="my-shadow" placeholder="Search Name, Email, Phone Number"></v-text-field>

          <v-btn depressed color="primary" class="secondary--text caption font-weight-bold search__btn" height="45" width="40">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- <ExcelDownload /> -->
    </div>

    <template>
      <v-data-table caption :search="searchEntry" :headers="headers" :items="customers" item-key="id" class="transparent" :loading="loading" no-data-text="No Referee found" loading-text="Loading... Please wait"></v-data-table>
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
import ExcelDownload from '@/components/admin/Referees-Excel'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb,
    ExcelDownload
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
        text: 'First Name',
        value: 'firstname',
      },
      {
        text: 'Last Name',
        value: 'lastname',
      },
      {
        text: 'Email Address',
        value: 'email',
      },
      {
        text: 'Phone Number',
        value: 'phone'
      }
    ],

    customers: []
  }),

  created() {
    this.loading = true

    this.$axios.$get('/customers?page=1&perPage=10').then(customers => {
      this.customers = customers.data.customers
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
