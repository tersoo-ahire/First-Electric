<template>
<main>
  <v-navigation-drawer class="" width="300" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app color="#F4F4F4">
    <NavDrawer :user="user" />
  </v-navigation-drawer>

  <Toolbar :user="user" @openNav="drawer = !drawer" />
</main>
</template>

<script>
import {
  mapState
} from 'vuex'

import Toolbar from '@/components/navigation/Dashboard-Toolbar'
import NavDrawer from '@/components/navigation/Dashboard-Nav-Drawer'

export default {
  components: {
    Toolbar,
    NavDrawer
  },

  data: () => ({
    drawer: null
  }),

  computed: {
    ...mapState(['user'])
  },
}
</script>
