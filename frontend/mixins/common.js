export default {
  data: () => ({
    rules: {
      required: v => !!v || 'This field is required.',
      email: v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) ||
        'E-mail must be valid',
      min: v => (v && v.length > 5) || 'Must be at least 6 characters'
    }
  }),

  methods: {
    isNumber: function(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}
