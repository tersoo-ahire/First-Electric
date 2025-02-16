<template>
<section class="bg">
  <v-container class="boxed__container">
    <div class="title font-weight-bold primary--text text-center mb-3">{{ $t('automation.why') }}</div>
    <div class="section__title white--text text-center mb-12">{{ $t('automation.why_subtitle') }}</div>

    <!-- <div style="max-width: 620px" class="font__13 white--text mx-auto text-center mb-12 mt-5">{{ $t('automation.why_desc') }}</div> -->

    <div class="d-flex flex-wrap column__wrapper pt-6">
      <div v-for="item in items" :key="item.title" class="card__container text-center">
        <img :src="item.icon" width="55px" class="mx-auto" alt="">

        <div class="headline font-weight-bold mt-8">{{ $t(item.title) }}</div>

        <div class="font__13  text-left mt-4">{{ $t(item.description) }}</div>
      </div>
    </div>
  </v-container>
</section>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('/img/auto-why-bg.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  height: 100%;
  overflow-x: hidden;
  padding: 50px 0;
}

.column__wrapper {
  margin: -40px;
  color: #FFF;

  @media (max-width: 600px) {
    margin: -18px
  }

  @media (min-width: 600px) and (max-width: 1264px) {
    margin: -10px
  }

  .card__container {
    padding: 40px 40px 70px 40px;
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
</style>

<script>
export default {
  data: () => ({
    items: [{
        icon: "/icons/support.svg",
        title: "automation.support",
        description: "automation.support_desc"
      },
      {
        icon: "/icons/affordable.svg",
        title: "automation.affordable_price",
        description: "automation.affordable_price_desc"
      },
      {
        icon: "/icons/durable.svg",
        title: "automation.durable_product",
        description: "automation.durable_product_desc"
      }
    ]
  })
}
</script>
