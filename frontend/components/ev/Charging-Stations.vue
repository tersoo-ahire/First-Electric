<template>
<section class="pb-12">
  <v-row class="mb-12">
    <v-col :class="{'order-1': $vuetify.breakpoint.xsOnly}" cols="12" sm="6">
      <div style="max-width: 530px" class="secondary--text custom__section__title mt-3">{{ $t('ev.cs_title') }}</div>

      <div style="max-width: 450px" class="font-weight-medium">{{ $t('ev.cs_desc') }}</div>
    </v-col>

    <v-col cols="12" sm="6" class="d-flex justify-end" :class="{'order-0': $vuetify.breakpoint.xsOnly}">
      <img src="/img/charging-stations.png" :height="$vuetify.breakpoint.smAndUp ? 320 : '100%'" :width="$vuetify.breakpoint.xsOnly ? '100%' : 'auto'" alt="">
    </v-col>
  </v-row>

  <div class="iframe__container">
    <iframe src='https://www.plugshare.com/widget2.html?plugs=1,2,3,4,5,6,42,13,7,8,9,10,11,12,14,15,16,17' width='100%' height='100%' allow='geolocation'></iframe>
  </div>
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
