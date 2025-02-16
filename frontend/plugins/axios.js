import toast from '../helpers/toast'
export default function({ $axios, store, app }) {
  let token = ''
  if (window.localStorage.getItem('firstElectric') !== null) {
    token = JSON.parse(window.localStorage.getItem('firstElectric')).token
  } else if (store.state.token !== null) {
    token = store.state.token
  }

  // $axios.setHeader('Authorization', token)
  if (token) {
    $axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  $axios.defaults.headers.common['Content-Type'] = 'application/json'
  $axios.defaults.headers.common['Accept'] = 'application/json'

  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    if (
      error.config.hasOwnProperty('errorHandle') &&
      error.config.errorHandle === false
    ) {
      return Promise.reject(error)
    }

    if (code !== 200 && code !== 201 && code !== 204) {
      // toast.destroy()
      toast.error(error.response.data.message)
    }
  })
}
