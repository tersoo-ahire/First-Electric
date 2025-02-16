<template>
<section class="bg">
  <v-container class="boxed__container">
    <div class="section__title white--text text-center mb-12">{{ $t('power.why_choose_us') }}</div>

    <div class="d-flex flex-wrap column__wrapper">
      <div v-for="item in items" :key="item.title" class="card__container">
        <v-sheet tile height="100%" class="content__card text-center">
          <img :src="item.icon" width="70">

          <div class="title my-4 font-weight-bold">{{ item.title }}</div>

          <div class="font__13">{{ item.description }}</div>
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
  padding: 40px 45px;

  @media (max-width: 1264px) {
  padding: 40px 25px;
  }
}
</style>

<script>
export default {
  data: () => ({
    items: [{
        icon: "/icons/support.png",
        title: "24/7 SUPPORT",
        description: "Our team of engineers are always on standby to provide support to customers. You can reach us via email. Web Chat or telephone."
      },
      {
        icon: "/icons/price.png",
        title: "AFFORDABLE PRICE",
        description: "We believe price should not be a barrier towards adoptions of sustainable power. Speak to us to understand the various financing schemes available to you."
      },
      {
        icon: "/icons/product.png",
        title: "DURABLE PRODUCT",
        description: "We trust in the quality of our products so we offer up to 5 years unlimited warranty to ensure peace of mind to our customers"
      }
    ]
  })
}
</script>
