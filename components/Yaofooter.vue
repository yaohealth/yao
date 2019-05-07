<template>
  <div class="footer">
    <v-footer dark>
      <v-card flat tile class="links   flex">
        <v-card-text>
          <strong>Follow us</strong>
          <a href="https://www.facebook.com/yaohealth"><fa class="customicon" :icon="['fab', 'facebook-f']"/></a>
          <a href="https://www.twitter.com/yaohealth"><fa class="customicon" :icon="['fab', 'twitter']"/></a>
        </v-card-text>

        <v-card-text class=" pt-0">
          <nuxt-link class="footerlink" to="/impressum">Impressum</nuxt-link>
          <nuxt-link class="footerlink" to="/kontakt">Kontakt</nuxt-link>
          <nuxt-link class="footerlink" to="/datenschutz">Datenschutz</nuxt-link>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="grey darken-3 justify-center">
          &copy;2019 — <strong>YAO</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>


<style scoped lang="scss">
  .links {
    background-color: rgba(51, 169, 181, 255);
    margin-top: 20vh;
  }

  .footer{
    margin-top: 12vh;
  }

  .customicon {
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
</style>