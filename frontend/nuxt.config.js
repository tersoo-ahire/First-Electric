import colors from 'vuetify/es5/util/colors'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s || Clean, Safe, Renewable',
    title: 'First Electric',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0'
      },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-title',
        content: 'First Electric',
      },
      { name: 'name', content: 'First Electric' },
      { name: 'short_name', content: 'First Electric' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'renewable energy, solar power, inverter, solar, electricity, electric power, automation, ev services, power supply, solar panel, solar roofs, batteries, electric motors, electric vehicle'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js',
        integrity:
          'sha384-VcI6S+HIsE80FVM1jgbd6WDFhzKYA0PecD/LcIyMQpT4fMJdijBh0I7Iblaacawc',
        crossorigin: 'anonymous',
        defer: true,
      },
      {
        hid: 'cloudinary',
        src: 'https://product-gallery.cloudinary.com/all.js',
        defer: true
      }
    ]
  },

  loadingIndicator: '~/loading-indicator.html',

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#F8C422' },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss', 'aos/dist/aos.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/aos', ssr: false },
    '@/plugins/axios',
    '@/plugins/tawk',
    {
      src: '@/plugins/localStorage.js',
      ssr: false
    },
    {
      src: '@/plugins/vueCroppa.js',
      ssr: false
    },
    { src: '@/plugins/i18n', ssr: false },
    { src: '@/plugins/algolia', ssr: false },
    '@/plugins/filters',
    '@/plugins/facebookPixel',
  ],

  router: {
    middleware: ['i18n']
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/google-analytics'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    'nuxt-clipboard2',
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',
  ],

  googleAnalytics: {
    id: 'UA-181355493-1'
  },

  sitemap: {
    hostname: 'https://firstelectricco.com',
    exclude: ['/admin', '/admin/**']
  },

  webfontloader: {
    google: {
      families: ['Montserrat:400,500,600,700,900']
    }
  },

  manifest: {
    name: 'First Electric',
    short_name: 'First Electric',
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#F8C422',
          accent: '#333333',
          secondary: '#1E2632',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
}
