import pkg from './package'

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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuex-persist', mode: 'client' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@ax2/dayjs-module',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        }]
    }],
    '@nuxtjs/vuetify',
    'nuxt-material-design-icons',
    '@nuxtjs/dotenv',
    'nuxt-leaflet',
    '@nuxt/http',
    '@nuxtjs/proxy'
  ],
  http: {
    proxy: true // Can be also an object with default options
  },
  'proxy': {
    '/api/': { target: 'https://acuityscheduling.com/api/v1/', pathRewrite: {'^/api/': ''} }
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
