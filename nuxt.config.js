import pkg from './package'
import qs from 'qs'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fjalla+One&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'assets/styles/font.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-tiny-slider.js', mode: 'client' },
    { src: '~/plugins/vuex-persist', mode: 'client' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-webfontloader',
    'nuxt-svg-loader',
    '@ax2/dayjs-module',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: ['far']
        }
        ]
    }],
    '@nuxtjs/vuetify',
    'nuxt-material-design-icons',
    '@nuxtjs/dotenv',
    'nuxt-leaflet',
    '@nuxt/http',
    '@nuxtjs/proxy'
  ],
  router: {
    parseQuery: function (query) {
      return require('qs').parse(query)
    },
    stringifyQuery: function (query) {
      var r = require('qs').stringify(query, { encode: false })
      return r ? '?' + r : ''
    }
  },
  webfontloader: {
    google: {
      families: ['Fjalla One:400']
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // should remove this for production
      // make it conditional
      config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
    }
  }
}
