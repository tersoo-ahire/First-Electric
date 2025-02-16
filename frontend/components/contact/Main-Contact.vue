<template>
<section id="main-contact">
  <v-row>
    <v-col :class="{'order-last' : $vuetify.breakpoint.xsOnly}" class="first__column" cols="12" sm="6">
      <ContactAddress />
    </v-col>

    <v-col :class="{'order-first' : $vuetify.breakpoint.xsOnly}" cols="12" sm="6">
      <ContactForm />
    </v-col>
  </v-row>
</section>
</template>

<style lang="scss" scoped>
.first__column {
  background-color: #1e2632;
}
</style>

<script>
import ContactAddress from '@/components/contact/Contact-Address'
import ContactForm from '@/components/contact/Contact-Form'

export default {
  components: {
    ContactAddress,
    ContactForm
  }
}
</script>
