<template>
<section class="pb-12">
  <v-row class="align-center">
    <v-col :class="$vuetify.breakpoint.smAndUp ? 'order-0' : 'order-1'" cols="12" sm="6">
      <div style="max-width: 530px" class="secondary--text custom__section__title mt-3">{{ $t('services.solar_power_assessment_title') }}</div>

      <div style="max-width: 450px" class="font-weight-medium">{{ $t('services.solar_power_assessment_desc') }}</div>

      <v-btn nuxt to="/services/solar-power-assessment" depressed color="primary" width="200" height="45" class="mt-12 secondary--text caption font-weight-bold">{{ $t('btn.start_assessment') }}</v-btn>
    </v-col>

    <v-col :class="$vuetify.breakpoint.smAndUp ? 'order-1' : 'order-0'" cols="12" sm="6">
      <v-img src="/img/power-assessment.png" max-width="450" alt="" />
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
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 35px;
    line-height: 39px;
  }
}
</style>
