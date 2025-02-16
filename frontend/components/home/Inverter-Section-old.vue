<template>
<section class="bg">
  <v-container class="boxed__container">
    <v-row>
      <v-col :class="{'order-last' : $vuetify.breakpoint.xsOnly}" cols="12" sm="6">
        <div class="mt-4">
          <div class="title font-weight-bold primary--text">{{ $t('home.why_us') }}</div>

          <div class="secondary--text section__title mt-3">{{ $t('home.solar_inverter') }}</div>
        </div>

        <div style="max-width: 550px" class="font-weight-medium">{{ $t('home.solar_inverter_desc') }}</div>
      </v-col>

      <v-col :class="{'order-first' : $vuetify.breakpoint.xsOnly}" cols="12" sm="6">
        <div class="d-flex justify-end">
        <img class="inverter shake-vertical" src="/img/solar-inverter.png" alt="">
        </div>
      </v-col>
    </v-row>
  </v-container>
</section>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('/img/home-inverter-bg.png');
  background-size: cover;
  height: 660px;
  position: relative;

  @media (max-width: 600px) {
    height: 1000px;
  }
}

.inverter {
  position: absolute;
  top: -45px;
  width: 450px;

  @media (max-width: 600px) {
    position: unset;
    width: auto;
    height: 220px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    position: unset;
    width: 350px;
    margin-top: 80px;
  }
}
</style>
