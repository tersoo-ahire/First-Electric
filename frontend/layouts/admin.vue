<template>
<v-app id="user__layout">
  <Header />

  <v-main style="background-color: #f4f4f4">
    <nuxt />
  </v-main>
</v-app>
</template>

<script>
import Header from '@/components/navigation/Dashboard-Header'

export default {
  components: {
    Header
  }
}
</script>
