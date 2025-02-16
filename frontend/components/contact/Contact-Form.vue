<template>
<v-container class="second__column__content__wrapper">
  <div class="second__column__content">
    <div class="title font-weight-bold primary--text">{{ $t('btn.contact_us') }}</div>

    <div class="SECONDARY--text section__title mt-3">{{ $t('contact.drop_us_a_line') }}</div>

    <div class="mt-12">
      <v-form ref="contactForm" v-model="formValid" @submit.prevent="sendInquiry">
        <v-text-field v-model="name" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Full Name" rounded></v-text-field>

        <v-text-field type="email" v-model="email" :rules="emailRules" solo flat background-color="grey lighten-3" placeholder="Email Address" rounded></v-text-field>

        <v-text-field type="tel" v-model="phone" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Phone Number" rounded></v-text-field>

        <v-textarea v-model="message" :rules="generalRules" rows="7" solo flat background-color="grey lighten-3" placeholder="Message" rounded></v-textarea>

        <div class="d-flex justify-end mt-2">
          <v-btn type="submit" :loading="loading" depressed rounded width="170" color="primary" class="caption font-weight-bold secondary--text">{{ $t('btn.contact_us') }}</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</v-container>
</template>

<style lang="scss" scoped>
.second__column__content__wrapper {
  max-width: 650px;
  margin-left: 0;
  margin-right: auto;
}

.second__column__content {
  max-width: 500px;
  margin-left: auto;
  margin-top: 90px;
  margin-bottom: 100px;

  @media (max-width: 600px) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>


<script>
import toast from '@/helpers/toast'

export default {
  data: () => ({
    emailRules: [
      v =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) ||
      'E-mail must be valid'
    ],
    generalRules: [v => !!v || 'This field is required'],
    name: '',
    email: '',
    phone: '',
    message: '',
    loading: false,
    formValid: false
  }),

  methods: {
    sendInquiry() {
      if (this.$refs.contactForm.validate()) {
        this.loading = true
        toast.info('Processing...')

        const data = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
        }

        this.$axios.$post('/contact', data).then(response => {
          this.loading = false
          toast.success(response.message)

          setTimeout(() => {
            location.reload()
          }, 5000);
        }).catch(e => {
          this.loading = false
        })
      }
    }
  },
}
</script>