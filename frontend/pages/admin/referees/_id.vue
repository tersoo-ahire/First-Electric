<template>
<main class="pt-4">
  <v-container class="boxed__container" id="referee">
    <RefereeProfile :refereeProfile="refereeProfile" :referralCode="$route.params.id" />

    <RefereeTransactions :refereeProfile="refereeProfile" :transactions="transactions" class="mt-10" />
  </v-container>
</main>
</template>

<script>
import RefereeProfile from '@/components/admin/Referee-Profile'
import RefereeTransactions from '@/components/admin/Referee-Transactions'

export default {
  layout: 'admin',

  components: {
    RefereeProfile,
    RefereeTransactions
  },

  data: () => ({
    loading: false,
    refereeProfile: null,
    transactions: []
  }),

  async mounted() {
    this.loading = true

    await this.$axios.$get(`/referral/${this.$route.params.id}`).then(referee => {
      this.loading = false

      this.refereeProfile = referee.data.referee

      this.$axios.$get(`/transactions/${referee.data.referee._id}`).then(response => {
        this.transactions = response.data.transactions
      })
    }).catch(() => this.loading = false)
  },
}
</script>
