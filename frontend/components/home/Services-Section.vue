<template>
<section class="py-12">
  <div :class="{'text-center' : $vuetify.breakpoint.smAndUp}">
    <div class="title font-weight-bold primary--text text-uppercase">{{ $t('home.what_we_do') }}</div>

    <div class="secondary--text section__title mt-5">{{ $t('home.what_we_do_subtitle') }}</div>
  </div>

  <v-row class="mt-12">
    <v-col v-for="service in services" :key="service.title" cols="12" md="4">
      <div class="d-flex align-start">
        <img width="55" :src="service.icon" :alt="service.title">

        <div class="ml-5">
          <div v-html="$t(service.title)" class="headline font-weight-bold text-capitalize secondary--text"></div>

          <div style="font-size: 13px" class="mt-2 font-weight-medium">{{ $t(service.discription) }}</div>
        </div>
      </div>
    </v-col>
  </v-row>
</section>
</template>

<script>
export default {
  data: () => ({
    services: [{
        icon: '/icons/power.svg',
        title: 'home.power',
        discription: 'home.power_desc'
      },
      {
        icon: '/icons/automation.svg',
        title: 'home.automation',
        discription: 'home.automation_desc'
      },
      {
        icon: '/icons/ev.svg',
        title: 'home.ev',
        discription: 'home.ev_desc'
      }
    ]
  })
}
</script>
