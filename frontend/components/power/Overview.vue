<template>
<section class="py-12">
  <v-row>
    <v-col :class="{'order-last' : $vuetify.breakpoint.xsOnly}" cols="12" md="6">
      <div class="title font-weight-bold primary--text">{{ $t('power.overview') }}</div>

      <div style="max-width: 530px" class="secondary--text section__title mt-3">{{ $t('power.overview_title') }}</div>

      <div class="font-weight-medium">{{ $t('power.overview_desc') }}</div>

      <v-btn to="/contact" depressed color="primary" width="150" height="45" class="mt-7 secondary--text caption font-weight-bold">{{ $t('btn.contact_us') }}</v-btn>
    </v-col>

    <v-col :class="[{'order-first' : $vuetify.breakpoint.xsOnly}, {'mb-8' : $vuetify.breakpoint.xsOnly}]" cols="12" sm="6">
      <img src="/img/power-bulb.png" width="100%" alt="">
    </v-col>
  </v-row>
</section>
</template>
