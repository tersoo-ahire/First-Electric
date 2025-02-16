<template>
<section>
  <v-dialog persistent v-model="newMeterDialog" max-width="580">
    <v-sheet class="pa-12">
      <div class="font-weight-bold mb-10 headline">New Meter</div>

      <v-form v-model="formValid" ref="Form" @submit.prevent="addMeter">
        <v-row>
          <v-col cols="12" class="pt-0">
            <div class="font-weight-medium font__13 mb-1 ml-3">Meter Name</div>
            <v-text-field v-model="meterName" :rules="[rules.required]" validate-on-blur solo flat color="secondary" hide-details="auto" dense height="40" background-color="grey lighten-3" class="font-weight-bold font__12" rounded />
          </v-col>

          <v-col cols="12" sm="6" class="pt-0">
            <div class="font-weight-medium font__13 mb-1 ml-3">Meter Number</div>
            <v-text-field v-model="meterNumber" :rules="[rules.required]" validate-on-blur solo flat color="secondary" hide-details="auto" dense height="40" background-color="grey lighten-3" class="font-weight-bold font__12" rounded />
          </v-col>

          <v-col cols="12" sm="6" class="pt-0">
            <div class="font-weight-medium font__13 mb-1 ml-3">Tariff (Amount per unit)</div>
            <v-text-field v-model="meterTariff" :rules="[rules.required]" @keypress="isNumber($event)" prefix="₦" validate-on-blur solo flat color="secondary" hide-details="auto" dense height="40" background-color="grey lighten-3" class="font-weight-bold font__12" rounded />
          </v-col>

          <v-col cols="12" class="pt-0">
            <div class="font-weight-medium font__13 mb-1 ml-3">Address</div>
            <v-text-field v-model="address" :rules="[rules.required]" validate-on-blur solo flat color="secondary" hide-details="auto" dense height="40" background-color="grey lighten-3" class="font-weight-bold font__12" rounded />
          </v-col>

          <v-col cols="12" sm="6" class="pt-0">
            <div class="font-weight-medium font__13 mb-1 ml-3">Email</div>
            <v-text-field v-model="email" type="email" :rules="[rules.required, rules.email]" validate-on-blur solo flat color="secondary" hide-details="auto" dense height="40" background-color="grey lighten-3" class="font-weight-bold font__12" rounded />
          </v-col>

          <v-col cols="12" sm="6" class="pt-0">
            <div class="font-weight-medium font__13 mb-1 ml-3">Phone Number</div>
            <v-text-field v-model="phone" type="tel" :rules="[rules.required]" validate-on-blur solo flat color="secondary" hide-details="auto" dense height="40" background-color="grey lighten-3" class="font-weight-bold font__12" rounded />
          </v-col>
        </v-row>

        <div class="mt-10">
          <v-btn @click="$emit('closeNewMeterDialog')" rounded outlined height="40" width="150" class="font__12 font-weight-bold">Cancel</v-btn>

          <v-btn type="submit" :loading="isLoading" rounded depressed color="primary" height="40" width="150" class="font__12 font-weight-bold black--text">Submit</v-btn>
        </div>

      </v-form>
    </v-sheet>
  </v-dialog>
</section>
</template>

<script>
import commonMixins from '@/mixins/common'
import toast from '@/helpers/toast'

export default {
  mixins: [commonMixins],

  props: ['newMeterDialog'],

  data: () => ({
    meterName: '',
    meterNumber: '',
    meterTariff: '',
    address: '',
    email: '',
    phone: '',

    formValid: false,
    isLoading: false
  }),

  methods: {
    addMeter() {
      if (this.$refs.Form.validate()) {

        this.isLoading = true

        const data = {
          meterName: this.meterName,
          meterNumber: this.meterNumber,
          meterTariff: this.meterTariff,
          address: this.address,
          email: this.email,
          phone: this.phone
        }

        this.$axios.$post('/paygo/meters', data)
          .then(response => {
            this.isLoading = false
            toast.success(response.message)
            this.$emit('endMeterCreation')
          })
          .catch(() => this.isLoading = false)
      }
    }
  },
}
</script>
