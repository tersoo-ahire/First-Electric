import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

const toast = {
  error: (message, title = 'Error') => {
    return iZtoast.error({
      title: title,
      message: message,
      position: 'topRight',
      maxWidth: 400,
      layout: 2,
      timeout: 15000,
      displayMode: 2,
      transitionIn: 'bounceInLeft',
      transitionInMobile: 'bounceInLeft'
    })
  },

  success: (message, title = 'Success') => {
    return iZtoast.success({
      title: title,
      message: message,
      position: 'topRight',
      timeout: 10000,
      maxWidth: 400,
      layout: 2
    })
  },

  info: (message, title = '') => {
    return iZtoast.info({
      title: title,
      message: message,
      position: 'topRight',
      maxWidth: 400,
      layout: 2
    })
  }
}

export default toast
