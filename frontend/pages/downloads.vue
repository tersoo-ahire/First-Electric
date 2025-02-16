<template>
<main>
  <div class="bg">
    <v-container class="banner__content__container">
      <h1 class="slide-in-bottom font-weight-bold white--text text-center banner__content">Downloads</h1>
    </v-container>
  </div>

  <section class="pt-8 pb-4">
    <v-container class="boxed__container">
      <div v-if="!isLoading">
        <div v-for="(doc, i) in documents" :key="i" class="doc__card d-flex mx-auto mb-3 justify-space-between align-center">
          <div class="font-weight-medium mr-5">{{ doc.docName }}</div>
          <v-btn :href="doc.docLink" target="_blank" depressed small rounded color="primary" width="90" class="font__10 font-weight-bold secondary--text">Download</v-btn>
        </div>
      </div>

      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-overlay>
    </v-container>

    <!-- DIALOGS -->
    <v-dialog max-width="300" persistent v-model="loadingDialog">
      <v-sheet class="radius__10 text-center pa-12">
        <v-progress-circular indeterminate color="primary" size="50" class="mx-auto"></v-progress-circular>

        <div class="font__14 mt-6">Downloading document</div>
      </v-sheet>
    </v-dialog>
  </section>
</main>
</template>

<script>
export default {
  head: {
    title: 'Downloads'
  },

  data: () => ({
    isLoading: true,
    loadingDialog: false,
    documents: []
  }),

  created() {
    this.$axios.$get('/documents').then(response => {
      this.documents = response.data
      this.isLoading = false
    }).catch(() => this.isLoading = false)
  },
}
</script>

<style lang="scss" scoped>
.doc__card {
  max-width: 800px;
  background-color: #eeeeee;
  border-radius: 10px;
  padding: 15px 20px;
}

.bg {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('/img/downloads-banner.jpg');
  height: 400px;
  padding-top: 270px;
  background-color: grey;

}

.banner__content__container {
  max-width: 750px;
  margin-right: auto;
  margin-left: auto;
}

.banner__content {
  font-size: 40px;
  line-height: 55px;

  @media (max-width: 600px) {
    font-size: 27px;
    line-height: 35px;
  }

  @media (min-width: 600px) and (max-width: 1264px) {
    font-size: 34px;
    line-height: 45px;
  }
}
</style>
