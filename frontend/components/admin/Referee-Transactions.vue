<template>
<section id="main-contact">
  <v-sheet class="my-shadow py-10 px-8">
    <div class="title mb-3 secondary--text font-weight-bold">Create New Transaction</div>

    <v-form ref="referralForm" v-model="formValid" @submit.prevent="createTransaction">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="customerName" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Customer's Name" rounded></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="price" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Customer's Payment (₦)" rounded></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="commission" :rules="generalRules" solo flat background-color="grey lighten-3" placeholder="Commission (₦)" rounded></v-text-field>
        </v-col>
      </v-row>

      <v-btn type="submit" :loading="loading2" rounded depressed color="primary" height="43" width="180" class="secondary--text caption font-weight-bold">Create Transaction</v-btn>
    </v-form>
  </v-sheet>

  <div class="title mb-3 mt-10 secondary--text font-weight-bold">List of Transactions</div>

  <v-data-table caption :headers="headers" :items="transactions" item-key="_id" class="transparent" no-data-text="No transaction made on this account yet" :loading="loading" loading-text="Loading... Please wait">
    <template v-slot:item.createdAt="{ item }">
      <div>{{ item.createdAt | formatDate }}</div>
    </template>

    <template v-slot:item.price="{ item }">
      <div>{{ item.price | formatCurrency }}</div>
    </template>

    <template v-slot:item.commission="{ item }">
      <div>{{ item.commission | formatCurrency }}</div>
    </template>
  </v-data-table>
</section>
</template>

<script>
import moment from 'moment'
import toast from '@/helpers/toast'

export default {
  props: ['refereeProfile', 'transactions'],

  data: () => ({
    formValid: false,
    generalRules: [v => !!v || 'This field is required'],
    customerName: '',
    price: '',
    commission: '',
    loading: false,
    loading2: false,

    headers: [{
        text: 'Date',
        value: 'createdAt'
      },
      {
        text: 'Reference',
        value: 'txRef'
      },
      {
        text: "Customer's Name",
        value: 'customerName',
      },
      {
        text: "Customer's Payment (₦)",
        value: 'price',
      },
      {
        text: 'Commission (₦)',
        value: 'commission',
      },
    ]
  }),

  methods: {
    createTransaction() {
      if (this.$refs.referralForm.validate()) {
        this.loading2 = true

        const data = {
          customerName: this.customerName,
          price: this.price,
          commission: this.commission,
          refereeId: this.refereeProfile._id
        }

        this.$axios.$post('/transactions', data).then(response => {
          toast.success(response.message)
          this.loading2 = false

          setTimeout(() => {
            location.reload()
          }, 5000);
        }).catch(() => this.loading2 = false)
      }
    }
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('LL') : ''
    },

    formatCurrency: function (value) {
      if (isNaN(value)) {
        return value
      } else {
        value = parseFloat(value.toString().replace(/,/g, ""))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value
      }
    }
  }
}
</script>
