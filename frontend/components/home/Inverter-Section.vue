<template>
<section>
  <div class="bg" />

  <v-container class="boxed__container">
    <v-row>
      <v-col cols="12" sm="4" v-for="(item, i) in items" :key="i" class="text-center">
        <img :src="item.icon" width="130">

        <div class="font__14 font-weight-bold mx-auto">{{ item.firstTitle }}</div>
        <div class="font__14 font-weight-bold mx-auto">{{ item.secondTitle }}</div>

        <div class="mx-auto text-center">
          <img src="/icons/line.png" height="5" width="70">
        </div>

        <div style="max-width: 290px" class="font__13 mx-auto">{{ item.discription }}</div>
      </v-col>
    </v-row>
  </v-container>
</section>
</template>

<script>
export default {
  data: () => ({
    items: [{
        firstTitle: 'LOCAL KNOWLEDGE &',
        secondTitle: 'NATIONAL DISTRIBUTION',
        icon: '/icons/africa.png',
        discription: 'With over 10+ years experience in doing business in the Nigerian power sector, the First Electric team has built the necessary knowledge, experience and network to deliver effective results in the energy space. We have built a broad distribution network enabling us to offer our products and services to customers Nationwide.'
      },
      {
        firstTitle: 'IN-HOUSE TECHNICAL &',
        secondTitle: 'COMMERCIAL EXPERTISE',
        icon: '/icons/expertise.png',
        discription: 'Our team of engineers are passionate about providing sustainable solutions to address the diverse needs of our customers. First Electric implements cutting-edge technology to ensure our customers receive the best long-term benefits at competitive prices.'
      },
      {
        firstTitle: 'CUSTOMER',
        secondTitle: 'FOCUS',
        icon: '/icons/customer-focus.png',
        discription: 'One of the cardinal beliefs of the company is that customer satisfaction will yield sustainable positive business outcomes. First Electric is therefore committed to providing excellent customer service while delivering solutions that truly add value to customers operations.'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.bg {
  background-image: url('/img/lights.png');
  background-size: cover;
  height: 250px;
  position: relative;
  z-index: -1;

  @media (max-width: 600px) {
    height: 170px;
  }
}

.boxed__container {
  margin-top: -90px;
}
</style>
