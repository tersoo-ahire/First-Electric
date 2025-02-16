<template>
<main class="pt-4">
  <v-container class="boxed__container">
    <div class="mb-8 d-flex align-end justify-lg-space-between">
      <Breadcrumb class="flex-grow-0" icon="file-document-multiple-outline" title="Documents" />

      <v-btn @click="create_dialog = true" depressed color="primary" height="45" class="secondary--text no__radius caption font-weight-bold flex-grow-0">
        <v-icon size="15" color="secondary">mdi-plus</v-icon>
        <span class="ml-1">NEW DOCUMENT</span>
      </v-btn>
    </div>

    <template>
      <v-data-table caption :headers="headers" :items="documents" :search="searchEntry" item-key="id" class="transparent" :loading="loading" no-data-text="No Document found" loading-text="Loading... Please wait">

        <template v-slot:[`item.docLink`]="{ item }">
          <div style="max-width: 350px" class="text-truncate">
            <a :href="item.docLink" target="_blank" class="text-decoration-underline">{{ item.docLink }}</a>
          </div>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn @click="open_delete_dialog(item)" depressed small color="red" class="white--text no__radius font-weight-bold">Delete</v-btn>
        </template>

      </v-data-table>
    </template>

    <!-- DIALOGS  -->
    <v-dialog persistent v-model="create_dialog" max-width="400">
      <v-sheet class="pa-8">
        <div class="headline font-weight-bold mb-7">NEW DOCUMENT</div>

        <div class="font-weight-medium mb-1">Document Name</div>
        <v-text-field v-model="docName" autofocus solo flat color="secondary" background-color="grey lighten-3" class="font-weight-bold font__13" rounded />

        <div class="font-weight-medium mb-1">Document Link</div>
        <v-text-field v-model="docLink" autofocus solo flat color="secondary" background-color="grey lighten-3" class="font-weight-bold font__13" rounded />

        <div class="mt-3">
          <v-btn @click="create_dialog = false" rounded outlined color="secondary" width="100" class="font__13 font-weight-bold">cancel</v-btn>

          <v-btn @click="add__doc" :loading="loading2" rounded depressed color="primary" width="100" class="font__13 font-weight-bold secondary--text">Submit</v-btn>
        </div>
      </v-sheet>
    </v-dialog>

    <v-dialog v-model="delete_dialog" max-width="350">
      <v-sheet class="pa-6 text-center">
        <div class="font-weight-bold">Are you sure you want to delete this document?</div>

        <div class="mt-6">
          <v-btn @click="delete_dialog = false" depressed outlined width="90" class="font__13 font-weight-bold">NO</v-btn>
          <v-btn @click="delete_doc" :loading="btn_loading" depressed color="red" width="90" class="font__13 font-weight-bold white--text">YES</v-btn>
        </div>
      </v-sheet>
    </v-dialog>
  </v-container>
</main>
</template>

<style lang="scss" scoped>
.no__radius.v-btn {
  border-radius: unset !important;
}
</style>

<script>
import moment from 'moment'
import Breadcrumb from '@/components/navigation/Breadcrumb'

export default {
  layout: 'admin',

  middleware: 'auth',

  components: {
    Breadcrumb
  },

  data: () => ({
    docName: '',
    docLink: '',
    loading: false,
    loading2: false,
    searchEntry: '',
    create_dialog: false,
    selected_doc_index: null,
    selected_doc: {},
    delete_dialog: false,
    btn_loading: false,

    headers: [{
        text: 'Doc Name',
        value: 'docName'
      },
      {
        text: 'Doc Link',
        value: 'docLink'
      },
      {
        text: 'Action',
        value: 'action'
      }
    ],

    documents: []
  }),

  methods: {
    add__doc() {
      this.loading2 = true

      this.$axios.$post('/documents', {
        docName: this.docName,
        docLink: this.docLink
      }).then(response => {
        this.documents.push(response.data)

        this.create_dialog = false
        this.loading2 = false
        this.docName = ''
        this.docLink = ''
      }).catch(() => this.loading2 = false)
    },

    open_delete_dialog(doc) {
      const index = this.documents.indexOf(doc)
      this.selected_doc_index = index
      this.selected_doc = doc
      this.delete_dialog = true
    },

    delete_doc() {
      this.btn_loading = true

      this.$axios.$delete(`/documents/${this.selected_doc._id}`).then(response => {
        this.documents.splice(this.selected_doc_index, 1)

        this.delete_dialog = false
        this.btn_loading = false

        toast.success('Document deleted successfully')
      }).catch(() => this.btn_loading = false)
    }
  },

  created() {
    this.loading = true

    this.$axios.$get('/documents').then(response => {
      this.documents = response.data
      this.loading = false
    }).catch(() => this.loading = false)
  },

  filters: {
    formatDate: function (date) {
      if (!date) return ''
      return date ? moment(date).format('lll') : ''
    }
  }
}
</script>
