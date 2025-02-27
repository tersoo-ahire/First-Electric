import toast from '@/helpers/toast'

// **************************** STATES ****************************
export const state = () => ({
  user: null,
  token: null,
  verificationSuccessMessage: '',
  verificationErrorMessage: '',
  locales: ['en', 'fr'],
  locale: 'en',
  cart: [],
  order: null,
  currency: 'ngn',
  conversionRate: null
})

// **************************** MUTATIONS ****************************
export const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload
  },

  SET_USER: (state, payload) => {
    state.user = payload
  },

  LOGOUT: state => {
    state.token = ''
  },

  SET_VERIFICATION_SUCCESS: (state, payload) => {
    state.verificationSuccessMessage = payload
  },

  SET_VERIFICATION_ERROR: (state, payload) => {
    state.verificationErrorMessage = payload
  },

  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },

  ADD_TO_CART: (state, { product, quantity }) => {
    const record = state.cart.find(p => p.id === product._id)

    if (!record) {
      state.cart.push({
        id: product._id,
        product: product,
        quantity
      })
    } else {
      record.quantity += quantity
    }
  },

  UPDATE_CART_QUANTITY(state, { product, quantity }) {
    const item = state.cart.find(item => item?.product?._id === product?._id)
    if (item) {
      item.quantity = quantity
    }
  },

  REMOVE_FROM_CART(state, product) {
    const index = state.cart.findIndex(
      item => item?.product._id === product?._id
    )
    if (index > -1) {
      state.cart.splice(index, 1)
    }
  },

  CART_DEL: (state, index) => {
    state.cart.splice(index, 1)
  },

  CART_INC: (state, product) => {
    const record = state.cart.find(p => p.id === product._id)
    record.quantity++
  },

  CART_DEC: (state, product) => {
    const record = state.cart.find(p => p.id === product._id)

    if (record.quantity > 1) record.quantity--
  },

  CLEAR_CART: state => {
    state.cart = []
  },

  SET_ORDER: (state, payload) => {
    state.order = payload
  },

  SET_CURRENCY: (state, payload) => {
    state.currency = payload
  },

  SET_CONVERSION_RATE: (state, payload) => {
    state.conversionRate = payload
  }
}

// **************************** ACTIONS ****************************
export const actions = {
  async logout({ state, commit }) {
    commit('LOGOUT')
    localStorage.removeItem('firstElectric')
    delete this.$axios.defaults.headers.common['Authorization']

    await this.$router.push('/admin')
    await toast.success('Logged out successfully')
  }
}

// **************************** GETTERS ****************************
export const getters = {
  isLoggedIn: state => !!state.token,

  user: state => state.user,

  cart: state => state.cart,

  order: state => state.order,

  successMessage(state) {
    return state.verificationSuccessMessage
  },

  errorMessage(state) {
    return state.verificationErrorMessage
  },

  cartTotal(state) {
    return state.cart.reduce((total, item) => {
      const price = item?.product?.price || 0
      const quantity = item?.quantity || 0
      return total + price * quantity
    }, 0)
  },

  cartCount(state) {
    return state.cart.reduce((count, item) => count + item?.quantity, 0)
  },

  isProductInCart: state => productId => {
    return state.cart.some(item => item?.product?._id === productId)
  }
}
