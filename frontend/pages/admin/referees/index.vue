<template>
<main class="pt-4">
  <v-container class="boxed__container referee">
    <div class="mb-8 d-flex align-end justify-lg-space-between">
      <Breadcrumb class="flex-grow-0" icon="account-group" title="Referees" />

      <v-form @submit.prevent="findReferee" class="flex-grow-1 px-12">
        <div class="d-flex mt-6">
          <v-text-field v-model="searchEntry" solo flat class="my-shadow" placeholder="Search by referral code"></v-text-field>

          <v-btn type="submit" :loading="loading2" depressed color="primary" class="secondary--text caption font-weight-bold search__btn" height="45" width="40">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </v-form>

      <ExcelDownload />
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="referees" item-key="id" class="transparent" :loading="loading" no-data-text="No Referee found" loading-text="Loading... Please wait">
        <template v-slot:[`item.action`]="{ item }">
          <v-btn nuxt :to="`/admin/referees/${item.referralCode}`" depressed small color="primary" class="secondary--text font-weight-bold">View Detail</v-btn>
        </template>
      </v-data-table>
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
        text: 'Referral Code',
        value: 'referralCode'
      },
      {
        text: 'First Name',
        value: 'firstName',
      },
      {
        text: 'Last Name',
        value: 'lastName',
      },
      {
        text: 'Email Address',
        value: 'email',
      },
      {
        text: 'Phone Number',
        value: 'phone'
      },
      {
        text: 'Action',
        value: 'action'
      }
    ],

    referees: []
  }),

  methods: {
    findReferee() {
      this.loading2 = true

      this.referees = []

      this.$axios.$get(`/referral/${this.searchEntry}`).then(referee => {
        this.loading2 = false

        const localReferees = []

        localReferees.push(referee.data.referee)

        this.referees = localReferees
      }).catch(() => this.loading2 = false)
    }
  },

  async mounted() {
    this.loading = true
    this.$axios.$get('/referral').then(referees => {
      this.referees = referees.data.referees
      this.loading = false
    }).catch(e => {
      this.loading = false
    })
  },

  async created() {

  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('LL') : ''
    }
  }
}
</script>
