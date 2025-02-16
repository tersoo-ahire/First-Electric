<template>
<section class="bg py-12">
  <v-container class="boxed__container">
    <v-row class="align-center">
      <v-col cols="12" sm="6">
        <img src="/img/energy-audit.png" width="100%" alt="">
      </v-col>

      <v-col cols="12" sm="6">
        <div style="max-width: 500px" class="secondary--text custom__section__title mt-3">{{ $t('services.energy_audit_title') }}</div>

        <div style="max-width: 450px" class="font-weight-medium">
          <p>{{ $t('services.energy_audit_desc') }}</p>

          <p>{{ $t('services.energy_audit_desc_2') }}</p>
        </div>

        <v-btn nuxt to="/contact" depressed color="primary" width="200" height="45" class="mt-6 secondary--text caption font-weight-bold">{{ $t('btn.make_a_request') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</section>
</template>

<style lang="scss" scoped>
.bg {
  background-color: #FFFCF5;
}

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
