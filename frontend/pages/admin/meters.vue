<template>
<main class="pt-4">
  <v-container class="boxed__container">
    <div class="mb-8 d-flex align-end justify-space-between">
      <Breadcrumb class="flex-grow-0" icon="gauge" title="Meters" />

      <v-btn @click="newMeterDialog = true" depressed color="primary" height="45" width="150" class="secondary--text new__btn caption font-weight-bold flex-grow-0">
        <v-icon size="15" color="secondary">mdi-plus</v-icon>
        <span class="ml-1">NEW METER</span>
      </v-btn>
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="meters" item-key="id" class="transparent" :loading="isLoading" hide-default-footer :items-per-page="perPage" no-data-text="No meter found" loading-text="Loading... Please wait">
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>{{ item.createdAt | date }}</div>
        </template>

        <template v-slot:[`item.meterName`]="{ item }">
          <div class="text-capitalize">{{ item.meterName }}</div>
        </template>

        <template v-slot:[`item.address`]="{ item }">
          <div style="max-width: 300px">{{ item.address }}</div>
        </template>

        <template v-slot:[`item.actions`]="{item}">
          <v-menu bottom transition="slide-y-transition" offset-y>
            <template v-slot:activator="{ on }">
              <v-icon size="20" color="secondary" v-on="on">mdi-cog</v-icon>
            </template>

            <v-sheet color="#f2f2f2" min-width="140" class="px-3 py-2">
              <div @click="$router.push(`/admin/power-usage?meter=${item.meterNumber}`)" class="dropdown__item">View Power Usage</div>
              <div @click="$router.push(`/admin/paygo-payments?meter=${item.meterNumber}`)" class="dropdown__item mb-2">View Transactions</div>

              <v-divider class="grey lighten-1" />

              <div @click="selectMeterForEdit(item)" class="dropdown__item mt-1">Edit Meter</div>
              <div @click="openDeleteConfirmation(item)" class="dropdown__item mt-1">Delete Meter</div>
            </v-sheet>
          </v-menu>
        </template>
      </v-data-table>

      <v-pagination v-if="!isLoading && totalPages > 1" v-model="currentPage" :length="totalPages" @input="handlePageChange" circle total-visible="5" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" class="mt-8"></v-pagination>
    </template>

    <!-- DIALOGS -->
    <NewMeter v-if="newMeterDialog" :newMeterDialog="newMeterDialog" @closeNewMeterDialog="newMeterDialog = false" @endMeterCreation="endMeterCreation" />

    <EditMeter :editMeterDialog="editMeterDialog" @closeEditMeterDialog="editMeterDialog = false" @endEditMeter="endEditMeter" :selectedMeter="selectedMeter" />

    <v-dialog v-model="deleteConfirmation" max-width="350">
      <v-sheet class="pa-12 text-center">
        <div class="font-weight-bold mb-5 headline">Delete Meter</div>
        <div>Are you sure you want to delete this meter?</div>

        <div class="mt-5">
          <v-btn @click="deleteConfirmation = false" rounded outlined height="40" width="120" class="font__12 font-weight-bold">Cancel</v-btn>

          <v-btn @click="deleteMeter" :loading="btnLoading" rounded depressed color="red" height="40" width="120" class="font__12 font-weight-bold white--text">Yes</v-btn>
        </div>
      </v-sheet>
    </v-dialog>
  </v-container>
</main>
</template>

<script>
import Breadcrumb from '@/components/navigation/Breadcrumb'
import NewMeter from '@/components/meters/NewMeter'
import EditMeter from '@/components/meters/EditMeter'
import toast from '~/helpers/toast'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb,
    NewMeter,
    EditMeter
  },

  data: () => ({
    isLoading: true,
    newMeterDialog: false,
    editMeterDialog: false,
    selectedMeter: {},
    selectedMeterIndex: null,
    deleteConfirmation: false,
    btnLoading: false,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,

    headers: [{
        text: 'Meter Number',
        value: 'meterNumber'
      },
      {
        text: 'Meter Name',
        value: 'meterName',
      },
      {
        text: 'Address',
        value: 'address',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Phone No',
        value: 'phone'
      },
      {
        text: 'Tariff',
        value: 'meterTariff'
      },
      {
        text: 'Date',
        value: 'createdAt'
      },
      {
        text: 'Actions',
        value: 'actions',
      }
    ],

    meters: [],
  }),

  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.fetchMeters()
    },

    fetchMeters() {
      this.$axios.$get(`/paygo/meters?page=${this.currentPage}&perPage=${this.perPage}`)
        .then(response => {
          this.isLoading = false
          this.meters = response.data.meters
          this.currentPage = response.data.page
          this.totalPages = response.data.totalPages
        })
        .catch(() => this.isLoading = false)
    },

    endMeterCreation() {
      this.fetchMeters()
      this.newMeterDialog = false
    },

    selectMeterForEdit(meter) {
      this.selectedMeter = meter
      this.editMeterDialog = true
    },

    endEditMeter() {
      this.fetchMeters()
      this.editMeterDialog = false
    },

    openDeleteConfirmation(meter) {
      this.selectedMeter = meter
      this.selectedMeterIndex = this.meters.indexOf(meter)
      this.deleteConfirmation = true
    },

    deleteMeter() {
      this.btnLoading = true

      this.$axios.$delete(`/paygo/meters/${this.selectedMeter._id}`)
        .then(() => {
          this.meters.splice(this.selectedMeterIndex, 1)

          toast.success('Meter deleted successfully')

          this.deleteConfirmation = false
          this.btnLoading = false
        })
        .catch(() => this.btnLoading = false)
    }
  },

  created() {
    this.fetchMeters()
  },
}
</script>

<style lang="scss" scoped>
.new__btn {
  border-radius: 0 !important;
}

.dropdown__item {
  font-size: 0.78rem;
  padding: 4px 15px;
  font-weight: 500;
  cursor: pointer;
  color: #555555;

  &:hover {
    color: orange;
  }
}
</style>
