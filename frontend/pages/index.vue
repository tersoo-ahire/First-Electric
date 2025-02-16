<template>
<main>
  <Hero />

  <Partners id="partners" />

  <AboutSection data-aos="fade-up" data-aos-duration="2000" />

  <v-container class="boxed__container">
    <ServicesSection data-aos="fade-up" data-aos-duration="2000" />
  </v-container>

  <InverterSection data-aos="fade-up" data-aos-duration="2000" />

  <ContactSection data-aos="fade-up" data-aos-duration="2000" />
</main>
</template>

<script>
import Hero from '@/components/banner/Hero'
import Partners from '@/components/home/Partners'
import AboutSection from '@/components/home/About-Section'
import ServicesSection from '@/components/home/Services-Section'
import InverterSection from '@/components/home/Inverter-Section'
import ContactSection from '@/components/home/Contact-Section'

export default {
  components: {
    Hero,
    Partners,
    AboutSection,
    ServicesSection,
    InverterSection,
    ContactSection
  }
}
</script>
