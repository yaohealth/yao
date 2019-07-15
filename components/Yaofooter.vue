<template>
  <v-footer class="footer">
    <v-container pa-0>
      <v-layout justify-center column>
        <v-flex class="links">
          <v-layout justify-center column pt-3>
            <v-flex text--white>
              <strong>Follow us</strong>
            </v-flex>
            <v-flex pb-5>
              <a><fa class="socialicon" :icon="['fab', 'twitter']"/></a>
              <a><fa class="socialicon" :icon="['fab', 'instagram']"/></a>
              <a><fa class="socialicon" :icon="['fab', 'facebook-f']"/></a>
            </v-flex>
            <v-flex>
              <nuxt-link class="footerlink" :to="localePath({name: 'impressum'})">Impressum</nuxt-link>
            </v-flex>
<!--            <v-flex>-->
<!--              <nuxt-link class="footerlink" to="/kontakt">Kontakt</nuxt-link>-->
<!--            </v-flex>-->
            <v-flex pb-5>
              <nuxt-link class="footerlink" :to="localePath({name: 'datenschutz'})">Datenschutz</nuxt-link>
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

  footer {
    height: 0px !important;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  * {
    font-family: Roboto;
    font-weight: 400;
  }

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
    transition: .3s all ease-in-out !important;
  }

  a:hover {
    opacity: .7 !important;
  }

  strong {
    color: white;
  }
</style>