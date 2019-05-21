<template>
  <v-footer>
    <v-layout justify-center row wrap>
      <v-flex class="links">
        <v-flex text--white>
          <strong>Follow us</strong>
          <a href="https://www.facebook.com/yaohealth"><fa class="socialicon" :icon="['fab', 'facebook-f']"/></a>
          <a href="https://www.twitter.com/yaohealth"><fa class="socialicon" :icon="['fab', 'twitter']"/></a>
        </v-flex>
        <v-flex>
          <nuxt-link class="footerlink" to="/impressum">Impressum</nuxt-link>
          <nuxt-link class="footerlink" to="/kontakt">Kontakt</nuxt-link>
          <nuxt-link class="footerlink" to="/datenschutz">Datenschutz</nuxt-link>
        </v-flex>
      </v-flex>


      <v-flex class="grey darken-3" text-xs-center white--text xs12>
        &copy;2019 — <strong>YAO</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>


<style lang="scss" scoped>
  .links {
    background-color: rgba(51, 169, 181, 255);
    padding: 10px;
  }

  .socialicon {
    font-size: 30px;
    margin: 0 10px;
  }

  .footerlink {
    margin: 0 20px
  }

  a {
    color: white !important;
    text-decoration: none !important;
    text-transform: uppercase;
    font-family: sans-serif;
    transition: .3s all ease-in-out !important;
  }

  a:hover {
    opacity: .7 !important;
  }

  strong {
    color: white;
  }
</style>