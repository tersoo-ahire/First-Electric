<template>
<v-container class="boxed__container">
  <section style="max-width: 1100px" class="mx-auto partners__wrapper">
    <div class="title font-weight-bold secondary--text section__header mb-8">PARTNERS</div>

    <!-- <div class="d-flex flex-wrap justify-space-between">
      <img v-for="(logo, i) in logos" :key="i" :src="`/partners-logo/${logo}`" class="partner__logo">
    </div> -->

    <v-row>
      <v-col cols="4" sm="2" lg="2" v-for="(logo, i) in logos" :key="i">
        <img :src="`/partners-logo/${logo}`" class="partner__logo d-block mx-auto">

      </v-col>
    </v-row>
  </section>
</v-container>
</template>

<script>
export default {
  data: () => ({
    logos: ['abb.png', 'deveote.png', 'allon.png', 'teco.png', 'usadf.png', 'coollink.jpeg']
  })
}
</script>

<style lang="scss" scoped>
.partner__logo {
  max-height: 45px;
  max-width: 90%;
}

.partners__wrapper {
  padding: 40px 0;

  @media (max-width: 960px) {
    padding: 20px 0 0 0;
  }
}

.section__header {
  text-align: center;

  @media (max-width: 600px) {
    text-align: left;
  }
}
</style>
