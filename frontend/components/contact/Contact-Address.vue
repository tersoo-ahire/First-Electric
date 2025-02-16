<template>
<v-container class="first__column__content__wrapper">
  <div class="first__column__content">
    <div class="title font-weight-bold primary--text">{{ $t('btn.get_in_touch') }}</div>

    <div class="white--text section__title mt-3">{{ $t('contact.contact_details') }}</div>

    <v-divider style="max-width: 80px" class="my-7 grey lighten-1" />

    <div class="font__13 white--text">{{ $t('contact.contact_subtitle') }}</div>

    <div style="margin-top: 80px" class="white--text">
      <div class="d-flex align-center">
        <img src="/icons/map-marker.svg" width="35px" alt="">

        <div class="title font-weight-medium ml-6">
          <div class="primary--text headline font-weight-bold">NIGERIA:</div>
          <div>First Electric, 41, Addo-Langbasa Road, Ajah, Lagos, Nigeria.</div>

          <div class="primary--text mt-5 text-uppercase headline font-weight-bold">Côte d'Ivoire:</div>
          <div>Cocody, Abidjan , Côte d’Ivoire</div>
        </div>
      </div>

      <div class="d-flex align-center mt-12">
        <img src="/icons/envelope.svg" width="35px" alt="">

        <div class="headline font-weight-medium ml-6">info@firstelectricco.com</div>
      </div>

      <div class="d-flex align-center mt-12">
        <img src="/icons/phone-call.svg" width="35px" alt="">

        <div class="headline font-weight-medium ml-6">
          <a target="_blank" href="https://wa.me/2349082919774">+234 (0) 908 291 9774</a>
        </div>
      </div>
    </div>
  </div>
</v-container>
</template>

<style lang="scss" scoped>
.first__column__content__wrapper {
  max-width: 650px;
  margin-left: auto;
  margin-right: 0;
}

.first__column__content {
  max-width: 500px;
  margin-top: 90px;
  margin-bottom: 100px;

  @media (max-width: 600px) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
