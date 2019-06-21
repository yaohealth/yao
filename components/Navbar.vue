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
        <nuxt-link v-if="loggedIn" @click.native="logout" to="/">Logout</nuxt-link>
        <nuxt-link v-if="!loggedIn" to="/login">Login</nuxt-link>
      </div>
      <nuxt-link to="/" class="logo">
        <img class="icon" src="~assets/logo1.png" alt="">
      </nuxt-link>
      <div class="right-menu">
        <nuxt-link :to="{name: 'results', query: { search:'*' } }">Booking</nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    computed: {
      loggedIn(){
        console.log(!!this.$store.state.auth.user)
        return !!this.$store.state.auth.user
      }
    },
    methods: {
      logout() {
        console.log('logout')
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
    grid-template-columns: 1fr auto 1fr;

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

  .left-menu {
    grid-column: 1;
    align-self: center;

    a {
      padding: 10px 0;
      margin-left: 15px;
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
      margin-left: 15px;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.5px;
    }
  }
</style>