<template>
<section>
  <div class="guide__title mb-5">{{ $t('calculator.select_inverter') }}</div>

  <div class="inv__types__wrapper">
    <v-row>
      <v-col cols="6" sm="4" lg="3" v-for="(inverter, i) in inverters" :key="i">
        <v-sheet @click="toggleItem(i)" :color="inverter.selected ? 'white' : 'transparent'" class="px-4 pt-6 pb-1 radius-10 mx-auto inverter__card cursor__pointer text-center">
          <div class="px-4 image__wrapper">
            <img :src="inverter.image" class="inv__image">
          </div>

          <div class="font-weight-bold mt-3">{{ inverter.title }}</div>

          <div class="caption">{{ $t(inverter.desc) }}</div>

          <v-btn depressed rounded small height="34" block :color="inverter.selected ? '#f1f1f1' : '#eaba25'" class="font__10 mt-4">
            <v-icon v-if="inverter.selected" size="15" color="green">mdi-check</v-icon>
            <span class="ml-1">{{ inverter.selected ? $t('btn.selected') : $t('btn.select') }}</span>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</section>
</template>

<script>
export default {
  data: () => ({
    inverters: [{
        title: '1kVA 12V',
        desc: 'calculator.hybrid_inverter',
        image: '/img/hybrid-inverter.png',
        value: '1kVA',
        selected: true
      },
      {
        title: '3kVA 24V',
        desc: 'calculator.hybrid_inverter',
        image: '/img/hybrid-inverter.png',
        value: '3kVA',
        selected: false
      },
      {
        title: '3kVA/3kW 24V',
        desc: 'calculator.hybrid_inverter',
        image: '/img/inverter.png',
        value: '3kVA/3kW',
        selected: false
      },
      {
        title: '5kVA/5kW 48V',
        desc: 'calculator.hybrid_inverter',
        image: '/img/hybrid-inverter.png',
        value: '5kVA/5kW',
        selected: false
      }
    ]
  }),

  methods: {
    toggleItem(index) {
      const items = JSON.parse(JSON.stringify(this.inverters))
      items.forEach(item => (item.selected = false))
      items[index].selected = true
      this.inverters = items

      this.$emit('setInverter', items[index].value)
    }
  },
}
</script>

<style lang="scss" scoped>
.guide__title {
  font-size: 1.2rem;
  line-height: 1.7rem;
  font-weight: 600;
}

.inverter__card {
  @media (max-width: 600px) {
    max-width: 230px;
  }
}

.inv__image {
  max-height: 8rem;
  width: auto;

  @media (max-width: 600px) {
    width: 100%;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    max-height: 10rem;
    width: 100%;
  }
}

.image__wrapper {
  height: 8rem;

  @media (max-width: 600px) {
    height: 6rem;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    height: 10rem;
  }
}

.inv__types__wrapper {
  @media (min-width: 1264px) {
    max-width: 85%;
  }
}
</style>
