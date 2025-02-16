<template>
<section class="py-12">
  <v-row class="align-center">
    <v-col cols="12" sm="6">
      <img src="/img/ev-vehicle.png" width="100%" alt="">
    </v-col>

    <v-col cols="12" sm="6">
      <div style="max-width: 530px" class="secondary--text custom__section__title mt-3">{{ $t('ev.title') }}</div>

      <div style="max-width: 450px" class="font-weight-medium">{{ $t('ev.ev_desc') }}</div>

      <v-btn nuxt to="/contact" depressed color="primary" width="145" class="mt-7 secondary--text caption font-weight-bold">{{ $t('btn.get_in_touch') }}</v-btn>
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

