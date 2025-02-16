<template>
<section class="py-8">
  <v-row class="align-center">
    <v-col :class="$vuetify.breakpoint.smAndUp ? 'order-0' : 'order-1'" cols="12" sm="6">
      <div style="max-width: 530px" class="secondary--text custom__section__title mt-3">{{ $t('services.solar_equipment_title') }}</div>

      <div style="max-width: 450px" class="font-weight-medium">{{ $t('services.solar_equipment_desc') }}</div>

      <v-btn nuxt to="/contact" depressed color="primary" width="200" height="45" class="mt-12 secondary--text caption font-weight-bold">{{ $t('btn.contact_us') }}</v-btn>
    </v-col>

    <v-col :class="$vuetify.breakpoint.smAndUp ? 'order-1' : 'order-0'" cols="12" sm="6">
      <img src="/img/solar-equipment.png" width="100%" alt="">
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
