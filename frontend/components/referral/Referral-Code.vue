<template>
<section>
  <div class="secondary--text title font-weight-bold mb-12">{{ $t('referral.your_referral_code') }}</div>

  <div class="d-flex flex-wrap">
    <div class="ref__code__wrapper mr-6">
      <!-- <div class="ref__code">{{ referralCode }}</div> -->
      <input type="text" disabled v-model="referralCode">
    </div>

    <v-btn @click="copyCode(referralCode)" depressed rounded width="100" color="primary" :class="{'mt-8' : $vuetify.breakpoint.xsOnly}" class="font-weight-bold caption secondary--text">COPY</v-btn>
  </div>

  <div class="secondary--text text--lighten-4 caption font-weight-bold mt-12">{{ $t('referral.share_referral_code') }}</div>

  <social-sharing url="https://firstelectricco.com/" :title="`Hello Friend. Kindly use my referral code (${referralCode}) to purchase your solar panel and get rewarded.`" description="Clean, Safe, Renewable Energy" :quote="`Hello Friend. Kindly use my referral code (${referralCode}) to purchase your solar panel and get rewarded.`" hashtags="SolarPower,FirstElectric,Electricity" twitter-user="firstelctricco" inline-template>

    <div class="d-flex mt-4">
      <network network="facebook">
        <button style="width: 40px; height: 40px; align-items: center" class="v-btn fab primary title">
          <i class="mdi mdi-facebook secondary--text"></i>
        </button>
      </network>

      <network network="twitter">
        <button style="width: 40px; height: 40px; align-items: center" class="v-btn fab primary title ml-2">
          <i class="mdi mdi-twitter secondary--text"></i>
        </button>
      </network>

      <network network="whatsapp">
        <button style="width: 40px; height: 40px; align-items: center" class="v-btn fab primary title ml-2">
          <i class="mdi mdi-whatsapp secondary--text"></i>
        </button>
      </network>
    </div>
  </social-sharing>

  <div @click="goBack" class="d-flex mt-9 cursor__pointer">
    <v-icon color="secondary" size="16">mdi-arrow-left</v-icon>

    <span class="ml-2 secondary--text caption font-weight-bold">BACK</span>
  </div>
</section>
</template>

<style lang="scss" scoped>
.ref__code__wrapper {
  position: relative;
  width: 230px;
}

input {
  font-size: 1.8rem;
  font-weight: bold;
}

.ref__code__wrapper::before {
  position: absolute;
  bottom: -7px;
  height: 1px;
  width: 230px;
  content: ' ';
  background-color: #868585;
}
</style>

<script>
import toast from '@/helpers/toast'
import SocialSharing from 'vue-social-sharing'

export default {
  components: {
    SocialSharing
  },

  props: ['referralCode'],

  methods: {
    async copyCode(code) {
      try {
        await this.$copyText(code);
        toast.success('Referral code copied')
      } catch (e) {
        console.error(e);
      }
    },

    goBack() {
      this.$router.back()
    }
  },
}
</script>
