<template>
<section style="overflow: hidden">
  <v-row>
    <v-col :class="[{'py-0' : $vuetify.breakpoint.mdAndUp}, {'order-last' : $vuetify.breakpoint.smAndDown}]" cols="12" md="6">
      <img width="100%" src="/img/home-about-section.png" alt="">
    </v-col>

    <v-col :class="[{'order-first' : $vuetify.breakpoint.smAndDown}, {'mt-7' : $vuetify.breakpoint.smAndDown}]" cols="12" md="6">
      <v-container class="second__column__wrapper ml-0">
        <div class="title font-weight-bold secondary--text">{{ $t('home.about') }}</div>

        <div class="section__title mt-3">
          <div class="font-weight-bold secondary--text text-capitalize">{{ $t('header.power') }}</div>
          <div class="font-weight-bold secondary--text"><span class="primary--text">{{ $t('home.about_subtitle_1') }}</span> {{ $t('home.about_subtitle_2') }}</div>
        </div>

        <div class="mt-5 secondary--text font-weight-bold">{{ $t('home.about_desc_1') }}</div>

        <div class="mt-5 secondary--text">{{ $t('home.about_desc_2') }}</div>
      </v-container>
    </v-col>
  </v-row>
</section>
</template>

<style lang="scss" scoped>
.second__column__wrapper {
  max-width: 570px;

  @media (min-width: 1264px) {
    margin-top: 60px;
  }
}
</style>
