<template>
<section class="bg">
  <v-container class="boxed__container">
    <div class="section__title white--text text-center mb-12">{{ $t('power.why_choose_us') }}</div>

    <div class="d-flex flex-wrap column__wrapper">
      <div v-for="item in items" :key="item.title" class="card__container">
        <v-sheet tile height="100%" class="content__card">
          <div class="font__13">{{ $t(item.pretitle) }}</div>

          <div class="headline font-weight-bold">{{ $t(item.title) }}</div>

          <v-divider style="max-width: 80px" class="my-7 grey lighten-1" />

          <div class="font__13">{{ $t(item.description) }}</div>
        </v-sheet>
      </div>
    </div>
  </v-container>
</section>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('/img/why-choose-us-bg.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  height: 100%;
  overflow-x: hidden;
  padding: 50px 0;
}

.column__wrapper {
  margin: -40px;

  @media (max-width: 600px) {
    margin: -18px
  }

  @media (min-width: 600px) and (max-width: 1264px) {
    margin: -10px
  }

  .card__container {
    padding: 40px;
    width: calc(100% / 3);

    @media (max-width: 600px) {
      padding: 18px;
      width: 100%;
    }

    @media (min-width: 600px) and (max-width: 1264px) {
      padding: 10px;
    }
  }
}

.content__card {
  padding: 40px 45px 130px 45px;

  @media (max-width: 1264px) {
    padding: 30px 30px 80px 30px;
  }
}
</style>

<script>
export default {
  data: () => ({
    items: [{
        pretitle: "home.what_we_do",
        title: "power.services",
        description: "power.services_desc"
      },
      {
        pretitle: "power.what_we_offer",
        title: "power.classes",
        description: "power.classes_desc"
      },
      {
        pretitle: "power.professional_help",
        title: "power.power_quality",
        description: "power.power_quality_desc"
      }
    ]
  })
}
</script>
