<template>
<section>
  <v-sheet height="65" tile dark class="py-4 px-6 d-flex flex-wrap align-center">
    <div class="title font-weight-bold">Filter by Brand</div>
  </v-sheet>

  <div class="mt-8">
    <v-checkbox v-model="selected_brands" v-for="brand in brands" :key="brand.name" :value="brand.name" hide-details="auto">
      <div slot="label" class="font__14 font-weight-medium">{{ brand.display_name }}</div>
    </v-checkbox>
  </div>
</section>
</template>

<script>
export default {
  data: () => ({
    brands: [{
        name: 'teco',
        display_name: 'Teco'
      },
      {
        name: 'auxano',
        display_name: 'Auxano'
      },
      {
        name: 'flames',
        display_name: 'Flames'
      },
      {
        name: 'ortus',
        display_name: 'Ortus'
      }
    ],
    selected_brands: []
  })
}
</script>
