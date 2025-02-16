<template>
<section class="py-12">
  <div class="title font-weight-bold primary--text">{{ $t('automation.our') }}</div>

  <div style="max-width: 530px" class="secondary--text section__title mt-3">{{ $t('automation.automation_devices') }}</div>

  <v-row class="mt-7">
    <v-col v-for="firstItem in firstItems" :key="firstItem.title" cols="12" md="6">
      <v-row>
        <v-col cols="12" sm="6">
          <img :src="firstItem.src" width="100%" height="400px" alt="">
        </v-col>

        <v-col cols="12" sm="6">
          <div class="secondary--text our__section__title__1 headline font-weight-bold">{{ $t(firstItem.title) }}</div>

          <div class="font__13 mt-4 font-weight-medium">{{ $t(firstItem.description) }}</div>

          <v-btn to="/shop" nuxt depressed min-width="120" color="primary" class="mt-7 secondary--text caption font-weight-bold">{{ $t('btn.buy_now') }}</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</section>
</template>

<style lang="scss" scoped>
.our__section__title__1 {
  @media (min-width: 600px) {
    margin-top: 120px;
  }
}

.our__section__title__2 {
  @media (min-width: 600px) {
    margin-top: 80px;
  }
}
</style>


<script>
export default {
  data: () => ({
    firstItems: [
      {
        src: '/img/auto-variable-speed-drive.png',
        title: 'automation.variable_speed_drive',
        description: 'automation.variable_speed_drive_desc'
      },
      {
        src: '/img/auto-electric-motors.png',
        title: 'automation.electric_motors',
        description: 'automation.electric_motors_desc'
      },
    ]
  })
}
</script>
