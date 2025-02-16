<template>
<main>
  <v-app-bar class="my-shadow fe__toolbar" color="white" height="90" app :clipped-left="$vuetify.breakpoint.lgAndUp">

    <img v-if="$vuetify.breakpoint.lgAndUp" src="/logo-black.png" width="180" alt="First Electric logo">

    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" @click.stop="$emit('openNav')" />

    <div class="d-flex flex-grow-1"></div>

    <div class="d-flex align-center">
      <!-- <v-badge class="mt-2 main__nav" overlap color="#e6570a">
        <template v-slot:badge>
          <span class="white--text font-weight-bold">5</span>
        </template>
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>

      <v-badge class="ml-7 mt-2 main__nav" overlap color="#e6570a">
        <template v-slot:badge>
          <span class="white--text font-weight-bold">3</span>
        </template>
        <v-icon>mdi-email-outline</v-icon>
      </v-badge> -->

      <div class="ml-12">
        <ProfileDropdown :user="user" />
      </div>
    </div>
  </v-app-bar>
</main>
</template>

<style lang="scss" scoped>
.fe__toolbar {
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: 600px) {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>

<script>
import ProfileDropdown from '@/components/navigation/Profile-Dropdown'
export default {
  props: ['user'],

  components: {
    ProfileDropdown
  },

  data: () => ({
    drawer: null
  })
}
</script>
