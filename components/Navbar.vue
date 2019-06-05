<template>
  <div class="nav-container">
    <nav>
      <input type="checkbox" id="nav-toggle">
      <div class="burgercontainer">
        <label for="nav-toggle" class="burger-menu">
          <v-icon>menu</v-icon>
        </label>
      </div>
      <div class="left-menu">
        <a class="links" href="https://blog.yao.health">Blog</a>
      </div>
      <nuxt-link to="/" class="logo">
        <img class="icon" src="~assets/logo1.png" alt="">
      </nuxt-link>
      <div class="right-menu">
        <nuxt-link class="links" :to="{name: 'results', query: { search:'*' } }">Booking</nuxt-link>
      </div>
    </nav>
  </div>
</template>

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
      color: rgba(51, 169, 181, 255) !important;
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