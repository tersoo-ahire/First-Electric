<template>
<section>
  <v-menu bottom left offset-y>
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center cursor__pointer" v-on="on">
        <img v-if="selected === 'ngn'" src="/icons/ngn.png" width="25">
        <img v-if="selected === 'usd'" src="/icons/usd.png" width="25">
      </div>
    </template>

    <v-sheet>
      <div @click="changeToNgn" :class="['py-5', 'px-5', 'menu__item', {'primary' : selected === 'ngn'}]">
        <div class="d-flex align-center menu__item__inner body-2 text-no-wrap">
          <img src="/icons/ngn.png" class="mr-4" width="25" alt="">
          <div class="ml-2 font-weight-bold">Naira</div>
        </div>
      </div>

      <div @click="changeToUsd" :class="['py-5', 'px-5', 'menu__item', {'primary' : selected === 'usd'}]">
        <div class="d-flex align-center menu__item__inner body-2 text-no-wrap">
          <img src="/icons/usd.png" class="mr-4" width="25" alt="">
          <div class="ml-2 font-weight-bold">US Dollar</div>
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
    selected: JSON.parse(window.localStorage.getItem('firstElectric')).currency || 'ngn'
  }),

  methods: {
    changeToNgn() {
      this.selected = 'ngn'

      this.$store.commit('SET_CURRENCY', 'ngn')
    },

    changeToUsd() {
      this.selected = 'usd'

      this.$store.commit('SET_CURRENCY', 'usd')
    }
  }
}
</script>
