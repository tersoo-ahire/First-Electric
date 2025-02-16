<template>
<section :class="$vuetify.breakpoint.xsOnly ? 'pb-12' : 'py-12'">
  <div class="title font-weight-bold primary--text text-uppercase">{{ $t('power.what_we_offer') }}</div>

  <div style="max-width: 530px" class="secondary--text section__title mt-3">{{ $t('power.what_we_offer_title') }}</div>

  <v-row>
    <v-col v-for="item in items" :key="item.title" cols="12" sm="6" lg="3">
      <v-sheet tile color="grey lighten-3" height="100%">
        <v-img :src="item.src" width="100%" height="180" />

        <div class="py-5 px-4">
          <div class="headline font-weight-bold text-center">{{ item.title }}</div>

          <div class="font-weight-medium font__13 mt-4">{{ item.description }}</div>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</section>
</template>

<script>
export default {
  data: () => ({
    items: [{
        title: 'Mini Grids',
        src: '/img/solar-mini-grids.jpeg',
        description: "We design, construct, and operate isolated and interconnected mini grid solutions in rural and urban areas which provide clean, sustainable, and affordable electricity."
      },
      {
        title: "Commercial & Industrial",
        src: '/img/commercialsolar.jpeg',
        description: "Our commercial and industrial solutions provide clean and reliable electricity to power business and reduce overall cost of electricity significantly compared to traditional generator solutions."
      },
      {
        title: "Residential/SMEs",
        src: '/img/residential.jpeg',
        description: "We deliver cost effective and reliable solar and inverter solutions for residential customers and SMEs."
      },
      {
        title: "Solar Products",
        src: '/img/solar-products.jpeg',
        description: "We provide high quality integrated solar products such as portable solar generator, solar streetlights, solar lanterns and many more."
      }
    ]
  })
}
</script>
