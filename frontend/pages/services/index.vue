<template>
<main>
  <Banner lazySrc="/img/services-banner-placeholder.jpg" src="/img/services-banner.jpg" :bannerTitle="$t('services.banner_title')" />

  <v-container id="free-solar-power-assessment" class="boxed__container">
    <PowerAssessment />
  </v-container>

  <EnergyAudit id="energy-audit" />

  <v-container id="solar-equipment-installation" class="boxed__container">
    <SolarEquipment />
  </v-container>

  <ElectricMotor id="electric-motor-installation" />

  <v-container id="engineering-consultation" class="boxed__container">
    <EngineeringConsultation />
  </v-container>
</main>
</template>

<script>
import Banner from '@/components/banner/Services-Hero'
import PowerAssessment from '@/components/services/Power-Assessment'
import EnergyAudit from '@/components/services/Energy-Audit'
import SolarEquipment from '@/components/services/Solar-Equipment'
import ElectricMotor from '@/components/services/Electric-Motor'
import EngineeringConsultation from '@/components/services/Engineering-Consultation'

export default {
  head: {
    title: 'Services'
  },

  components: {
    Banner,
    PowerAssessment,
    EnergyAudit,
    SolarEquipment,
    ElectricMotor,
    EngineeringConsultation
  }
}
</script>
