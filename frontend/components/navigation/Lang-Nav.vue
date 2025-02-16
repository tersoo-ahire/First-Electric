<template>
<section>
  <v-menu bottom left offset-y>
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center cursor__pointer" v-on="on">
        <img v-if="selected === 'en'" src="/icons/english.png" width="25">
        <img v-if="selected === 'fr'" src="/icons/french.png" width="25">
      </div>
    </template>

    <v-sheet>
      <div @click="changeToEn" :class="['py-5', 'px-5', 'menu__item', {'primary' : selected === 'en'}]">
        <div class="d-flex align-center menu__item__inner body-2 text-no-wrap">
          <img src="/icons/english.png" class="mr-4" width="25" alt="">
          <div class="ml-2 font-weight-bold">English</div>
        </div>
      </div>

      <div @click="changeToFr" :class="['py-5', 'px-5', 'menu__item', {'primary' : selected === 'fr'}]">
        <div class="d-flex align-center menu__item__inner body-2 text-no-wrap">
          <img src="/icons/french.png" class="mr-4" width="25" alt="">
          <div class="ml-2 font-weight-bold">French</div>
        </div>
      </div>
    </v-sheet>
  </v-menu>
</section>
</template>

<style lang="scss" scoped>
.menu__item {
  min-width: 150px;
  cursor: pointer;

  &__inner {
    color: rgb(73, 73, 73);
  }
}
</style>

<script>
export default {
  data: () => ({
    selected: JSON.parse(window.localStorage.getItem('firstElectric')).locale || 'en'
  }),

  methods: {
    changeToEn() {
      this.selected = 'en'

      this.$store.commit('SET_LANG', 'en')

      this.$router.push({
        path: `${this.$router.currentRoute.path}?lang=${'en'}`
      })
    },

    changeToFr() {
      this.selected = 'fr'

      this.$store.commit('SET_LANG', 'fr')

      this.$router.push({
        path: `${this.$router.currentRoute.path}?lang=${'fr'}`
      })
    }
  },

  // computed: {
  //   selected() {
  //     if (window.localStorage.getItem('firstElectric')) {
  //       return JSON.parse(window.localStorage.getItem('firstElectric')).locale
  //     } else {
  //       return 'en'
  //     }
  //   }
  // },
}
</script>
