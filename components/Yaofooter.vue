<template>
  <v-footer>
    <v-container pa-0>
      <v-layout justify-center column>
        <v-flex class="links">
          <v-layout justify-center column pt-3>
            <v-flex text--white>
              <strong>Follow us</strong>
            </v-flex>
            <v-flex pb-5>
              <a href="https://www.twitter.com/yaohealth"><fa class="socialicon" :icon="['fab', 'twitter']"/></a>
              <a href="https://www.instagram.com/yaohealth"><fa class="socialicon" :icon="['fab', 'instagram']"/></a>
              <a href="https://www.facebook.com/yaohealth"><fa class="socialicon" :icon="['fab', 'facebook-f']"/></a>
            </v-flex>
            <v-flex>
              <nuxt-link class="footerlink" to="/impressum">Impressum</nuxt-link>
            </v-flex>
            <v-flex>
              <nuxt-link class="footerlink" to="/kontakt">Kontakt</nuxt-link>
            </v-flex>
            <v-flex pb-5>
              <nuxt-link class="footerlink" to="/datenschutz">Datenschutz</nuxt-link>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="grey darken-3" text-xs-center white--text xs12>
          &copy;2019 — <strong>YAO</strong>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>


<style lang="scss" scoped>
  $yaoGradient: radial-gradient(circle at center, #074f65 0, #00afa4 100%);

  .links {
    background-image: $yaoGradient;
    padding: 10px;
    display: flex;
    flex-flow: column;
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