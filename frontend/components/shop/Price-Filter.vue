<template>
<section>
  <v-sheet height="65" tile dark class="py-4 px-6 d-flex flex-wrap align-center">
    <div class="title font-weight-bold">Filter by Price (₦)</div>
  </v-sheet>

  <div class="mt-8">
    <v-range-slider max="500000" min="20000" color="secondary" track-color="grey" v-model="price_range"></v-range-slider>

    <div id="price__range" class="d-flex justify-space-between">
      <div class="d-flex">
        <v-text-field :value="price_range[0]" @change="$set(price_range, 0, $event)" outlined flat hide-details="auto" />
        <v-text-field :value="price_range[1]" @change="$set(price_range, 1, $event)" outlined flat hide-details="auto" class="ml-3" />
      </div>

      <v-btn depressed color="primary" height="38" width="100" class="secondary--text font__12 font-weight-bold">FILTER</v-btn>
    </div>
  </div>
</section>
</template>

<script>
export default {
  data: () => ({
    price_range: [20000, 500000]
  })
}
</script>
