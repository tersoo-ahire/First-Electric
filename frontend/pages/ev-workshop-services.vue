<template>
<main>
  <Banner lazySrc="/img/ev-banner-placeholder.jpg" src="/img/ev-banner.jpg" :bannerTitle="$t('ev.banner_title')" />

  <v-container class="boxed__container">
    <ElectricVehicle />

    <ChargingStations />
  </v-container>
</main>
</template>

<script>
import Banner from '@/components/banner/Short-Hero'
import ElectricVehicle from '@/components/ev/Electric-Vehicle'
import ChargingStations from '@/components/ev/Charging-Stations'

export default {
  head: {
    title: 'EV Workshop Services'
  },

  components: {
    Banner,
    ElectricVehicle,
    ChargingStations
  }
}
</script>
