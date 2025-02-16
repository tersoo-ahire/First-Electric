<template>
<section>
  <v-btn @click="goBack" text class="font-weight-bold mb-3">
    <v-icon size="20" color="black">mdi-arrow-left</v-icon>
    <span class="ml-1 font-weight-bold title">Back</span>
  </v-btn>

  <v-sheet class="my-shadow py-10 px-8">
    <div v-if="refereeProfile" class="d-flex flex-wrap justify-space-between">

      <div class="d-flex flex-wrap">
        <v-avatar class="profile__image flex-grow-0" size="100">
          <img src="/img/user.png" width="92" alt="">
        </v-avatar>

        <div :class="[{'ml-6' : $vuetify.breakpoint.smAndUp}, 'align-self-center']">
          <div class="headline font-weight-bold">
            <span class="secondary--text">{{ refereeProfile.firstName }}</span>
            <span class="primary--text">{{ refereeProfile.lastName }}</span>
          </div>

          <div class="caption grey--text text--darken-1">Joined on {{ refereeProfile.createdAt | formatDate }}</div>

          <div class="body-2 mt-2">
            <span class="font-weight-bold">Email: </span>
            <span>{{ refereeProfile.email }}</span>
          </div>

          <div class="body-2 mt-1">
            <span class="font-weight-bold">Phone: </span>
            <span>{{ refereeProfile.phone }}</span>
          </div>
        </div>
      </div>

      <div :class="['d-flex', 'flex-wrap', {'mt-7' : $vuetify.breakpoint.smAndDown}]">
        <v-card :min-width="$vuetify.breakpoint.smAndUp ? '170' : '100%'" class="pa-5">
          <div class="font__11 grey--text font-weight-medium">REFERRAL CODE</div>

          <div class="title font-weight-bold mt-3">{{ referralCode }}</div>
        </v-card>

        <v-card :min-width="$vuetify.breakpoint.smAndUp ? '170' : '100%'" color="secondary" :class="['pa-5', {'ml-5' : $vuetify.breakpoint.smAndUp}, {'mt-4' : $vuetify.breakpoint.xsOnly}]">
          <div class="font__11 grey--text font-weight-medium">BANK DETAILS</div>

          <div class="white--text caption mt-3">{{ refereeProfile.bank }}</div>
          <div class="title font-weight-bold primary--text">{{ refereeProfile.accountNumber }}</div>
        </v-card>
      </div>
    </div>

    <div style="min-height: 120px" v-else class="d-flex justify-center">

      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-sheet>
</section>
</template>

<style lang="scss" scoped>
.profile__image {
  border: 3px solid #F8C422;

  img {
    padding: 7px;
  }
}
</style>

<script>
import moment from 'moment'

export default {
  props: ['refereeProfile', 'referralCode'],

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('LL') : ''
    }
  },

  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>
