<template>
  <div class="nav-container">
    <nav>
      <input type="checkbox" id="nav-toggle">
      <div class="burgercontainer">
        <label for="nav-toggle" class="burger-menu">
          <v-icon>menu</v-icon>
        </label>
      </div>
<!--      <div class="left-menu">-->
<!--        <a href="https://blog.yao.health">Blog</a>-->
<!--      </div>-->
      <div class="left-menu">
        <nuxt-link v-if="!loggedIn" :to="localePath({name: 'login'})">Login</nuxt-link>
        <div v-if="loggedIn" class="text-xs-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon flat v-on="on">
                <v-icon color="#00afa4" class="settingsIcon">settings</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile>
                <v-list-tile-title>
                  <nuxt-link class="menu-item" :to="localePath({name: `admin-id`, params: {id}})">{{ $t('navbar.profile_settings')}}</nuxt-link>
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>
                  <nuxt-link class="menu-item" @click.native="logout" :to="localePath({name: 'index'})">Logout</nuxt-link>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </div>
      <nuxt-link to="/" class="logo">
        <img class="icon" src="~assets/logo1.png" alt="">
      </nuxt-link>
      <div class="right-menu">
        <nuxt-link :to="localePath({name: 'results', query: { search:'*' }})">{{ $t('navbar.booking')}}</nuxt-link>
      </div>
      <div class=" far-right-menu">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon flat v-on="on" class="menu-item">
              {{ $i18n.locale }}
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
                    v-for="locale in availableLocales"
                    :key="locale.code">
              <v-list-tile-title>
                <nuxt-link :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </nav>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        getUser: 'auth/getUser'
      }),
      loggedIn(){
        try {
          return !!this.getUser
        } catch (e) {
          return false
        }

      },
      id() {
        return (this.getUser || {}).id
      },
      availableLocales () {
        return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/reset')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav-container {
    width: 100%;
    z-index: 2;
  }

  #nav-toggle, .burger-menu {
    display: none;
  }

  @media only screen and (max-width: 800px) {
    .burger-menu {
      display: inline-block;

      md-icon {
        font-size: 26px;
      }
    }

    .left-menu {
      display: none;
    }

    .right-menu {
      display: none;
    }

    #nav-toggle:checked ~ .left-menu{
      display: grid;
      grid-row: 3;
      grid-column: 2;
      text-align: center;
    }

    #nav-toggle:checked ~ .right-menu{
      display: grid;
      grid-column: 2;
      grid-row: 4;
      text-align: center;
    }
  }

  .burgercontainer {
    display: flex;
  }

  .burger-menu {
    width: 40px;
    grid-column: 2;
    grid-row: 2;
    align-self: center;
    margin-left: 20px;
  }

  nav {
    max-width: 1720px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;

    a {
      color: #00afa4 !important;
      text-decoration: none !important;
      text-transform: uppercase;
      transition: .3s all ease-in-out !important;
    }

    a:hover {
      opacity: .7 !important;
    }
  }

  .menu-item {
    color: #00afa4 !important;
    text-decoration: none !important;
    text-transform: uppercase;
    transition: .3s all ease-in-out !important;
  }

  .menu-item:hover {
    opacity: .7 !important;
  }

  .left-menu {
    grid-column: 1;
    align-self: center;

    a {
      padding: 10px 0;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
  }

  .logo {
    grid-column: 2;
    padding: 2rem;

    .icon {
      height: 70px;
    }
  }

  .right-menu {
    grid-column: 3;
    align-self: center;

    a {
      padding: 10px 0;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
  }

  .far-right-menu {
    grid-column: 4;
    align-self: center;

    button {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
  }
</style>