<template>
<section>
  <div class="guide__title">{{ $t('calculator.uptime_guide') }}</div>

  <div class="guide__subtitle mt-1">
    <div>{{ $t('calculator.uptime_period') }}</div>
  </div>

  <div class="overflow-x-auto">
    <table style="width:100%" class="mt-5">
      <tr>
        <th>Load(kVA)</th>
        <td v-for="(load, i) in loads" :key="i">{{ load }}</td>
      </tr>
      <tr>
        <th>
          <div>Basic {{ inverter == '1kVA' ? '12V' : inverter == '5kVA/5kW' ? '48V' : '24V' }}</div>
          <div class="font__10">200Ah (mins)</div>
        </th>
        <td v-for="(value, i) in basic" :key="i">{{ value }}</td>
      </tr>
      <tr>
        <th>
          <div>Extended {{ inverter == '1kVA' ? '12V' : inverter == '5kVA/5kW' ? '48V' : '24V' }}</div>
          <div class="font__10">400Ah (mins)</div>
        </th>
        <td v-for="(value, i) in extended" :key="i">{{ value }}</td>
      </tr>
    </table>
  </div>
</section>
</template>

<script>
export default {
  props: ['inverter'],

  computed: {
    loads() {
      switch (this.inverter) {
        case '1kVA':
          return [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
          break;

        case '3kVA':
          return [300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000]
          break;

        case '3kVA/3kW':
          return [300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000]
          break;

        case '5kVA/5kW':
          return [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
          break;
      }
    },

    basic() {
      switch (this.inverter) {
        case '1kVA':
          return [1610, 766, 503, 339, 269, 227, 176, 140, 125, 112]
          break;

        case '3kVA':
          return [1100, 525, 303, 227, 164, 126, 108, 94, 74, 67]
          break;

        case '3kVA/3kW':
          return [1100, 525, 303, 227, 164, 126, 108, 94, 74, 67]
          break;

        case '5kVA/5kW':
          return [1288, 613, 402, 271, 215, 182, 141, 112, 100, 90]
          break;
      }
    },

    extended() {
      switch (this.inverter) {
        case '1kVA':
          return [3220, 1532, 1006, 678, 538, 454, 352, 280, 250, 224]
          break;

        case '3kVA':
          return [2200, 1050, 606, 454, 328, 252, 216, 188, 148, 134]
          break;

        case '3kVA/3kW':
          return [2200, 1050, 606, 454, 328, 252, 216, 188, 148, 134]
          break;

        case '5kVA/5kW':
          return [2576, 1226, 804, 542, 430, 364, 282, 224, 200, 180]
          break;
      }
    }
  }
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
  max-width: 350px;
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
  line-height: 1.2rem;
}

td {
  font-size: 0.8rem;
  font-weight: 500;
}
</style>
