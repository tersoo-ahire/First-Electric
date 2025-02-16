import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', function(value) {
  if (!value) return ''
  return value ? moment(value).format('ll') : ''
})

Vue.filter('dateLong', function(value) {
  if (!value) return ''
  return value ? moment(value).format('LLL') : ''
})

Vue.filter('currencyFormat', function(value) {
  if (isNaN(value) || !value) {
    return value
  } else {
    value = parseFloat(value.toString().replace(/,/g, ''))
      // .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return value
  }
})

Vue.filter('currency', function(value) {
  const currency = JSON.parse(window.localStorage.getItem('firstElectric'))
    .currency

  const convRate = JSON.parse(window.localStorage.getItem('firstElectric'))
    .conversionRate

  if (currency == 'usd') {
    value = (value / convRate).toFixed(2)
  }

  if (isNaN(value)) {
    return value
  } else {
    value = parseFloat(value.toString().replace(/,/g, ''))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return value
  }
})
