export default function({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  var locale =
    route.query.lang || defaultLocale

  if (window.localStorage.getItem('firstElectric')) {
    locale = JSON.parse(window.localStorage.getItem('firstElectric')).locale
  } else {
    locale = route.query.lang || defaultLocale
  }

  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  //Mutate the store's locale once we understand which locale is being requested prior to each page render
  store.commit('SET_LANG', locale)

  // Set locale from the query string '?lang='**''
  app.i18n.locale = locale

  // app.i18n.locale = store.state.locale
}
