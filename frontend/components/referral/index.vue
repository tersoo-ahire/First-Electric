<template>
<section class="pt-6 pb-12">
  <v-row class="align-center">
    <v-col class="text-center" cols="12" md="6">
      <img class="referral__lady" src="/img/referral-lady.png" alt="">
    </v-col>

    <v-col cols="12" md="6">
      <div style="max-width: 530px" class="secondary--text custom__section__title mt-3">{{ $t('referral.referral_title') }}</div>

      <div style="max-width: 450px" class="font-weight-medium mb-12">{{ $t('referral.referral_subtitle') }}</div>

      <ReferralForm />
    </v-col>
  </v-row>
</section>
</template>

<style lang="scss" scoped>
.custom__section__title {
  letter-spacing: -1px;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  margin-bottom: 5px;

  @media (max-width: 600px) {
    font-size: 35px;
    line-height: 39px;
  }
}

.referral__lady {
  @media (max-width: 960px) {
    height: 350px;
  }
}
</style>

<script>
import ReferralForm from '@/components/referral/Referral-Form'

export default {
  components: {
    ReferralForm
  }
}
</script>
