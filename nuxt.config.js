import pkg from './package'
import qs from 'qs'
require('dotenv').config()

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
    { src: '~/plugins/vuetify'},
    { src: "~/plugins/authInit", mode: 'client'}

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
    'nuxt-material-design-icons',
    '@nuxtjs/dotenv',
    'nuxt-leaflet',
    '@nuxt/http',
    '@nuxtjs/proxy',
    ['@nuxtjs/google-analytics',
      {
        id: 'UA-131680679-4',
        dev: false
      }
    ],
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'English',
            code: 'en',
            file: 'en-US.js',
            iso: 'en-US'
          },
          {
            name: 'Deutsch',
            code: 'de',
            file: 'de-DE.js',
            iso: 'de-DE'
          }
        ],
        defaultLocale :'en',
        lazy: true,
        langDir: 'lang/',
        seo: false,
        parsePages: false,
        pages: {
          therapies: {
            en: '/therapies',
            de: '/therapien'
          },
          symptoms: {
            en: '/symptoms',
            de: '/symptome'
          },
          topics: {
            en: '/topics',
            de: '/themen'
          }
        }
      }
    ]
  ],
  router: {
    middleware: ['auth'],
    parseQuery: function (query) {
      return require('qs').parse(query)
    },
    stringifyQuery: function (query) {
      var r = require('qs').stringify(query, { encode: false })
      return r ? '?' + r : ''
    }
  },
  http: {
    baseURL: process.env.NODE_ENV === "production" ? process.env.YAOAPIPROD : process.env.YAOAPILOCAL
  },
  webfontloader: {
    google: {
      families: ['Fjalla One:400', 'Roboto:300']
    }
  },
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    transpile: [/^vuetify/],
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
