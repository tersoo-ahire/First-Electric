<template>
<section>
  <div class="guide__title">{{ $t('calculator.load_mix') }}</div>

  <div class="guide__subtitle mt-1">
    <div>{{ $t('calculator.selected_inverter') }}</div>
    <div>* {{ $t('calculator.fair_usage') }}</div>
  </div>

  <div class="overflow-x-auto">
    <table style="width:100%" class="mt-5">
      <tr>
        <th>Appliance</th>
        <td v-for="(appliance, i) in appliances" :key="i">{{ appliance }}</td>
      </tr>
      <tr>
        <th>Unit Watt</th>
        <td v-for="(wattage, i) in wattages" :key="i">{{ wattage }}</td>
      </tr>
      <tr>
        <th>Qty</th>
        <td v-for="(quantity, i) in quantities" :key="i">{{ quantity }}</td>
      </tr>
    </table>
  </div>
</section>
</template>

<script>
export default {
  props: ['inverter'],

  data: () => ({
    appliances: ['Energy Saving Bulbs', 'Television', 'Fan', 'Home Theatre', 'Laptop', 'Refrigerator', 'Freezer', '1HP Air Conditioner'],
    wattages: ['10W', '50W', '60W', '150W', '65W', '200W', '300W', '750W']
  }),

  computed: {
    quantities() {
      switch (this.inverter) {
        case '1kVA':
          return [10, 1, 2, 1, 1, 0, 0, 0]
          break;

        case '3kVA':
          return [18, 2, 2, 1, 3, 1, 0, 0]
          break;

        case '3kVA/3kW':
          return [18, 2, 4, 2, 3, 1, 0, 0]
          break;

        case '5kVA/5kW':
          return [26, 4, 5, 3, 4, 1, 1, 1]
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.guide__title {
  font-size: 1.2rem;
  line-height: 1.7rem;
  font-weight: 600;
}

.guide__subtitle {
  font-size: 0.85rem;
  line-height: 1rem;
  color: rgba(51, 51, 51, 0.5);
}

table,
th,
td {
  white-space: nowrap;
  border-collapse: collapse;
}

tr:nth-child(odd) {
  background-color: #f9d04e;
}

tr:nth-child(even) {
  background-color: #fbde84;
}

th,
td {
  padding: 0.8rem;
  text-align: left;
}

th {
  font-size: 0.9rem;
}

td {
  font-size: 0.8rem;
  font-weight: 500;
}
</style>
