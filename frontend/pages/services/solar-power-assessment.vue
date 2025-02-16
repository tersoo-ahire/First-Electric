<template>
<main>
  <Banner lazySrc="/img/calculator-banner-placeholder.jpg" src="/img/calculator-banner.jpg" :bannerTitle="$t('calculator.banner_title')" />

  <v-row no-gutters>
    <v-col cols="12" md="4">
      <div class="text-center px-8 py-12">
        <img src="/img/inverter.png" width="180">

        <div class="first__col__title mx-auto mt-5">
          <div>{{ $t('calculator.inverter_selection') }}</div>
          <div>/ {{ $t('calculator.capacity_guide') }}</div>
        </div>

        <div class="first__col__subtitle">
          <div>{{ $t('calculator.calculate_power') }}</div>
          <div>{{ $t('calculator.select_package') }}</div>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="8" class="primary p__relative">
      <img src="/icons/arrow-right.svg" class="side__icon">

      <v-container class="boxed__container">
        <div class="py-12" :class="{'px-4': $vuetify.breakpoint.smAndUp}">
          <InverterTypes @setInverter="setInverter" />

          <LoadMix :inverter="inverter" class="mt-12" />

          <BatteryUptime :inverter="inverter" class="mt-12" />
        </div>
      </v-container>
    </v-col>
  </v-row>
</main>
</template>

<script>
import Banner from '@/components/banner/Shorter-Hero'
import InverterTypes from '@/components/services/Calculator/Inverter-Types'
import LoadMix from '@/components/services/Calculator/Load-Mix'
import BatteryUptime from '@/components/services/Calculator/Battery-Uptime'

export default {
  head: {
    title: 'Free Solar Power Assessment'
  },

  data: () => ({
    inverter: '1kVA'
  }),

  methods: {
    setInverter(value) {
      this.inverter = value
    }
  },

  components: {
    Banner,
    InverterTypes,
    LoadMix,
    BatteryUptime
  }
}
</script>

<style lang="scss" scoped>
.first__col {
  &__title {
    font-size: 1.8rem;
    line-height: 2.7rem;
    font-weight: bold;
    max-width: 270px;
  }

  &__subtitle {
    font-size: 0.9rem;
    line-height: 1.4rem;
    margin-top: 1rem;
  }
}

.side__icon {
  position: absolute;
  left: 0;
  top: 250px;
  width: 13px;

  @media (max-width: 960px) {
    display: none;
  }
}
</style>
